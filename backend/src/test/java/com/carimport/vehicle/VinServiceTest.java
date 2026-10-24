package com.carimport.vehicle;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.carimport.domain.FuelType;
import com.carimport.domain.VehicleCategory;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.ExpectedCount;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

/**
 * The stub responses have the shape of the real services: vPIC DecodeVinValues (one flat object of strings in
 * "Results") and fueleconomy.gov menus ("menuItem" as an array, or a single object) and vehicle records.
 */
class VinServiceTest {

    private static final String MUSTANG = "1FA6P8CF7K5100001";
    private static final String VPIC = """
            {"Count":1,"Message":"Results returned successfully","Results":[{
              "ErrorCode":"0","Make":"FORD","Model":"Mustang","ModelYear":"2019","Trim":"GT","Series":"",
              "BodyClass":"Coupe","VehicleType":"PASSENGER CAR","DisplacementCC":"4951.0","DisplacementL":"4.951",
              "EngineCylinders":"8","EngineHP":"460","EngineKW":"","FuelTypePrimary":"Gasoline",
              "ElectrificationLevel":"","GVWR":"Class 1D: 5,001 - 6,000 lb (2,268 - 2,722 kg)","CurbWeightLB":""}]}
            """;

    private MockRestServiceServer vpic;
    private MockRestServiceServer epa;
    private VinService service;

    @BeforeEach
    void setUp() {
        RestClient.Builder vpicBuilder = RestClient.builder().baseUrl("https://vpic.test/api");
        vpic = MockRestServiceServer.bindTo(vpicBuilder).build();
        RestClient.Builder epaBuilder = RestClient.builder().baseUrl("https://epa.test/ws/rest");
        epa = MockRestServiceServer.bindTo(epaBuilder).ignoreExpectOrder(true).build();
        service = new VinService(new NhtsaVinClient(vpicBuilder.build()), new EpaCo2Client(epaBuilder.build()),
                Clock.fixed(Instant.parse("2026-10-24T00:00:00Z"), ZoneOffset.UTC));
    }

    private static void json(MockRestServiceServer server, String url, String body) {
        server.expect(ExpectedCount.manyTimes(), requestTo(url)).andRespond(withSuccess(body, MediaType.APPLICATION_JSON));
    }

    @Test
    void fillsSpecificationFromVpicAndCo2FromEpa() {
        json(vpic, "https://vpic.test/api/vehicles/DecodeVinValues/" + MUSTANG + "?format=json", VPIC);
        json(epa, "https://epa.test/ws/rest/vehicle/menu/model?year=2019&make=Ford", """
                {"menuItem":[{"text":"Mustang","value":"Mustang"},{"text":"Mustang Bullitt","value":"Mustang Bullitt"},
                 {"text":"Mustang Convertible","value":"Mustang Convertible"},{"text":"Ranger","value":"Ranger"}]}""");
        json(epa, "https://epa.test/ws/rest/vehicle/menu/options?year=2019&make=Ford&model=Mustang", """
                {"menuItem":[{"text":"Auto (S10), 8 cyl, 5.0 L","value":"40581"},
                 {"text":"Man 6-spd, 8 cyl, 5.0 L","value":"40582"},
                 {"text":"Auto (S10), 4 cyl, 2.3 L, Turbo","value":"40583"}]}""");
        json(epa, "https://epa.test/ws/rest/vehicle/40581", "{\"co2TailpipeGpm\":494.0}");
        json(epa, "https://epa.test/ws/rest/vehicle/40582", "{\"co2TailpipeGpm\":518.0}");

        VinDecoding d = service.decode(MUSTANG).orElseThrow();

        assertThat(d.source()).isEqualTo("NHTSA");
        assertThat(d.description()).isEqualTo("2019 Ford Mustang GT");
        assertThat(d.vehicleCategory()).isEqualTo(VehicleCategory.PASSENGER_CAR);
        assertThat(d.fuelType()).isEqualTo(FuelType.PETROL);
        assertThat(d.engineCc()).isEqualTo(4951);
        assertThat(d.powerKw()).isEqualTo(343);                  // 460 hp
        assertThat(d.co2Gkm()).isEqualTo(314);                   // (494 + 518) / 2 g/mile, the 2.3 L is not averaged in
        assertThat(d.co2Source()).isEqualTo("EPA");
        assertThat(d.massKg()).isEqualTo(1870);                  // 3/4 of the GVWR class midpoint
        assertThat(d.massSource()).isEqualTo("GVWR");
        assertThat(d.warnings()).isEmpty();
    }

    @Test
    void electricCarsNeedNoCo2LookupAndSingleObjectMenusAreRead() {
        String tesla = "5YJ3E1EA8KF000001";
        json(vpic, "https://vpic.test/api/vehicles/DecodeVinValues/" + tesla + "?format=json", """
                {"Results":[{"Make":"TESLA","Model":"Model 3","ModelYear":"2019","BodyClass":"Sedan/Saloon",
                  "VehicleType":"PASSENGER CAR","FuelTypePrimary":"Electric","ElectrificationLevel":"BEV (Battery Electric Vehicle)",
                  "EngineHP":"","CurbWeightLB":"3838"}]}""");

        VinDecoding d = service.decode(tesla).orElseThrow();

        assertThat(d.fuelType()).isEqualTo(FuelType.EV);
        assertThat(d.co2Gkm()).isZero();
        assertThat(d.engineCc()).isZero();
        assertThat(d.massKg()).isEqualTo(1741);
        assertThat(d.massSource()).isEqualTo("CURB");
        assertThat(d.warnings()).containsExactly("vin.noPower");
        assertThat(EpaCo2Client.matchesEngine("Auto (A1)", 0, null)).isTrue();
    }

    @Test
    void whenTheDatabaseIsDownTheVinItselfStillGivesYearAndMake() {
        vpic.expect(requestTo("https://vpic.test/api/vehicles/DecodeVinValues/" + MUSTANG + "?format=json"))
                .andRespond(withServerError());

        VinDecoding d = service.decode(MUSTANG).orElseThrow();

        assertThat(d.source()).isEqualTo("OFFLINE");
        assertThat(d.modelYear()).isEqualTo(2019);
        assertThat(d.make()).isEqualTo("Ford");
        assertThat(d.manufacturedIn()).isEqualTo("US");
        assertThat(d.warnings()).containsExactly("vin.offline");
    }

    @Test
    void mistypedVinIsFlaggedAndGarbageIsRejected() {
        String typo = "1FA6P8CF8K5100001";
        json(vpic, "https://vpic.test/api/vehicles/DecodeVinValues/" + typo + "?format=json", "{\"Results\":[{\"Make\":\"\"}]}");

        assertThat(service.decode(typo).orElseThrow().warnings()).contains("vin.checkDigit", "vin.notFound");
        assertThat(service.decode("NOT A VIN")).isEmpty();
    }

    @Test
    void gvwrClassAndBodyMapping() {
        assertThat(VinService.gvwrCurbEstimate("Class 2E: 6,001 - 7,000 lb (2,722 - 3,175 kg)")).contains(2210);
        assertThat(VinService.gvwrCurbEstimate(null)).isEmpty();
        assertThat(EpaCo2Client.normalize("F-150 Pickup 2WD")).isEqualTo("f150pickup2wd");
    }
}
