package com.carimport.quote;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carimport.calculation.CalculationEngineTest;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.InMemoryTariffCatalog;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.FuelType;
import com.carimport.fx.ExchangeRateService;
import com.carimport.geo.GeoService;
import com.carimport.geo.LocalGazetteer;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class SuggestionServiceTest {

    final CalculationEngineTest fixture = new CalculationEngineTest();

    SuggestionService service(GeoService geo) {
        ExchangeRateService rates = mock(ExchangeRateService.class);
        when(rates.latest()).thenReturn(CalculationEngineTest.FX);
        return new SuggestionService(fixture.engine(), new InMemoryTariffCatalog(), rates, geo);
    }

    @Test
    void ranksEveryPortDoorToDoorAndProposesTheRest() {
        GeoService geo = new GeoService(null, (origins, to) -> Optional.of(List.of(350, 1020)),
                new LocalGazetteer(new ObjectMapper()));
        CalculationRequest base = CalculationEngineTest.copartToGdynia(FuelType.PETROL, 2500);
        CalculationRequest toWarsaw = new CalculationRequest(base.originCountry(), base.auctionHouse(),
                base.titleType(), base.pickupZone(), null, base.bidPrice(), base.vehicleCategory(), base.fuelType(),
                base.engineCc(), base.productionYear(), false, base.condition(), base.shippingMethod(), "DEBRV", "PL",
                base.buyerType(), base.customsProcedure(), base.displayCurrency(), null, null, null, null, null, null,
                "Warszawa, Polska", 52.2297, 21.0122);

        SuggestionService.Suggestions s = service(geo).suggest(toWarsaw);

        assertThat(s.ports()).extracting(SuggestionService.PortSuggestion::code)
                .containsExactlyInAnyOrder("PLGDY", "DEBRV");
        assertThat(s.ports()).isSortedAccordingTo((a, b) -> a.total().compareTo(b.total()));
        assertThat(s.recommendedPort()).isEqualTo(s.ports().getFirst().code());
        SuggestionService.PortSuggestion gdynia = s.ports().stream().filter(p -> p.code().equals("PLGDY"))
                .findFirst().orElseThrow();
        assertThat(gdynia.distanceKm()).isEqualTo(350);
        assertThat(gdynia.distanceMethod()).isEqualTo(GeoService.Method.ROUTED);
        assertThat(s.deliveryMode()).isEqualTo(DeliveryMode.CAR_CARRIER);
        assertThat(s.repairEstimate()).isPositive();
        assertThat(s.insuranceEstimate()).isEqualByComparingTo("1200");
    }
}
