package com.carimport.calculation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.carimport.calculation.step.AuctionFeeStep;
import com.carimport.calculation.step.ConditionSurchargeStep;
import com.carimport.calculation.step.CustomsDutyStep;
import com.carimport.calculation.step.CustomsValueStep;
import com.carimport.calculation.step.DestinationFeesStep;
import com.carimport.calculation.step.ExciseStep;
import com.carimport.calculation.step.ImportVatStep;
import com.carimport.calculation.step.InlandTransportStep;
import com.carimport.calculation.step.InsuranceStep;
import com.carimport.calculation.step.IntraEuTransportStep;
import com.carimport.calculation.step.OceanFreightStep;
import com.carimport.calculation.step.PortClearanceStep;
import com.carimport.calculation.step.PurchasePriceStep;
import com.carimport.calculation.step.RoutePlanningStep;
import com.carimport.calculation.strategy.DealerPurchaseStrategy;
import com.carimport.calculation.strategy.DutchClearanceVatStrategy;
import com.carimport.calculation.strategy.GermanClearanceVatStrategy;
import com.carimport.calculation.strategy.NoNationalExciseStrategy;
import com.carimport.calculation.strategy.PolishClearanceVatStrategy;
import com.carimport.calculation.strategy.PolishExciseStrategy;
import com.carimport.calculation.strategy.ScheduleBasedAuctionFeeStrategy;
import com.carimport.calculation.strategy.StandardEuClearanceVatStrategy;
import com.carimport.domain.AuctionHouse;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import com.carimport.fx.FxRates;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

public class CalculationEngineTest {

    /** Round numbers make the expected values checkable with a pocket calculator. */
    static final FxRates FX = new FxRates(LocalDate.of(2026, 10, 20), "TEST", Map.of(
            CurrencyCode.USD, new BigDecimal("4.00"),
            CurrencyCode.EUR, new BigDecimal("4.25"),
            CurrencyCode.JPY, new BigDecimal("0.027")));

    final CalculationEngine engine = new CalculationEngine(
            List.of(new RoutePlanningStep(), new PurchasePriceStep(),
                    new AuctionFeeStep(List.of(new ScheduleBasedAuctionFeeStrategy(), new DealerPurchaseStrategy())),
                    new ConditionSurchargeStep(), new InlandTransportStep(), new OceanFreightStep(),
                    new InsuranceStep(new BigDecimal("0.015"), new BigDecimal("60")), new CustomsValueStep(),
                    new CustomsDutyStep(), new ExciseStep(List.of(new NoNationalExciseStrategy(),
                            new PolishExciseStrategy())),
                    new PortClearanceStep(),
                    new ImportVatStep(List.of(new StandardEuClearanceVatStrategy(), new GermanClearanceVatStrategy(),
                            new DutchClearanceVatStrategy(), new PolishClearanceVatStrategy())),
                    new IntraEuTransportStep(), new DestinationFeesStep()),
            new InMemoryTariffCatalog(),
            Clock.fixed(Instant.parse("2026-10-21T10:00:00Z"), ZoneOffset.UTC));

    public CalculationResult expected(CalculationRequest request) {
        return engine.calculate(request, Scenario.EXPECTED, FX);
    }

    public static CalculationRequest copartToGdynia(FuelType fuel, int cc) {
        return new CalculationRequest(OriginCountry.USA, AuctionHouse.COPART, TitleType.SALVAGE, "NJ", null,
                new BigDecimal("10000"), VehicleCategory.PASSENGER_CAR, fuel, cc, 2021, false,
                VehicleCondition.RUN_AND_DRIVE, ShippingMethod.CONTAINER_SHARED, "PLGDY", "PL", BuyerType.PRIVATE,
                CustomsProcedure.STANDARD_4000, CurrencyCode.PLN);
    }

    static CalculationRequest with(CalculationRequest r, String euPort, BuyerType buyer, CustomsProcedure procedure) {
        return new CalculationRequest(r.originCountry(), r.auctionHouse(), r.titleType(), r.pickupZone(),
                r.departurePort(), r.bidPrice(), r.vehicleCategory(), r.fuelType(), r.engineCc(), r.productionYear(),
                r.historicOriginalCondition(), r.condition(), r.shippingMethod(), euPort, r.destinationCountry(), buyer,
                procedure, r.displayCurrency());
    }

    static CostLine line(CalculationResult result, String code) {
        return result.lines().stream().map(CalculationResult.Line::line).filter(l -> l.code().equals(code))
                .findFirst().orElseThrow(() -> new AssertionError("No line " + code));
    }

    @Test
    void fullChainForPetrolAbove2000ccClearedInGdynia() {
        CalculationResult r = engine.calculate(copartToGdynia(FuelType.PETROL, 2500), Scenario.EXPECTED, FX);

        assertThat(r.taxCurrency()).isEqualTo(CurrencyCode.PLN);
        // CIF: 40 000 bid + 4 760 auction fees (900+160+95+15+20 USD) + 600 inland + 5 800 ocean + 671.40 insurance
        assertThat(r.customsValue().amount()).isEqualByComparingTo("51831.40");
        // duty 10%, rounded to whole PLN
        assertThat(line(r, "CUSTOMS_DUTY").amount().amount()).isEqualByComparingTo("5183");
        // excise 18.6% of 57 014 PLN
        assertThat(line(r, "EXCISE_TAX").amount().amount()).isEqualByComparingTo("10605");
        // VAT 23% of CIF + duty + excise + port unloading (1 300) = 68 919.40
        CostLine vat = line(r, "IMPORT_VAT");
        assertThat(vat.taxBase().amount()).isEqualByComparingTo("68919.40");
        assertThat(vat.amount().amount()).isEqualByComparingTo("15851");
        assertThat(r.hsCode()).isEqualTo("8703");
        assertThat(r.route().departurePort()).isEqualTo("USNWK");
        // + agency 800, carrier 1 200, translation 350, inspection 300, registration 256.50, recycling 500, lights 1500
        assertThat(r.total().amount()).isEqualByComparingTo("89676.90");
        assertThat(r.total().currency()).isEqualTo(CurrencyCode.PLN);
    }

    @Test
    void exciseJumpsAt2001cc() {
        BigDecimal at2000 = line(engine.calculate(copartToGdynia(FuelType.PETROL, 2000), Scenario.EXPECTED, FX),
                "EXCISE_TAX").rate();
        BigDecimal at2001 = line(engine.calculate(copartToGdynia(FuelType.PETROL, 2001), Scenario.EXPECTED, FX),
                "EXCISE_TAX").rate();
        assertThat(at2000).isEqualByComparingTo("0.031");
        assertThat(at2001).isEqualByComparingTo("0.186");
    }

    @Test
    void hybridAndElectricRates() {
        assertThat(line(engine.calculate(copartToGdynia(FuelType.HEV, 2500), Scenario.EXPECTED, FX), "EXCISE_TAX")
                .rate()).isEqualByComparingTo("0.093");
        assertThat(line(engine.calculate(copartToGdynia(FuelType.PHEV, 1998), Scenario.EXPECTED, FX), "EXCISE_TAX")
                .amount().isZero()).isTrue();
        CalculationResult ev = engine.calculate(copartToGdynia(FuelType.EV, 0), Scenario.EXPECTED, FX);
        assertThat(line(ev, "EXCISE_TAX").amount().isZero()).isTrue();
        assertThat(ev.hsCode()).isEqualTo("870380");
    }

    @Test
    void clearanceInBremerhavenUsesGermanVatAndKeepsPolishExciseOutOfTheVatBase() {
        CalculationRequest req = with(copartToGdynia(FuelType.PETROL, 2500), "DEBRV", BuyerType.PRIVATE,
                CustomsProcedure.STANDARD_4000);
        CalculationResult r = engine.calculate(req, Scenario.EXPECTED, FX);

        assertThat(r.taxCurrency()).isEqualTo(CurrencyCode.EUR);
        CostLine vat = line(r, "IMPORT_VAT");
        assertThat(vat.rate()).isEqualByComparingTo("0.19");
        BigDecimal expectedBase = r.customsValue().amount()
                .add(line(r, "CUSTOMS_DUTY").amount().amount())
                .add(new BigDecimal("450")); // unloading in Bremerhaven
        assertThat(vat.taxBase().amount()).isEqualByComparingTo(expectedBase);
        assertThat(line(r, "EXCISE_TAX").params()).containsEntry("paidAt", "TAX_OFFICE");
        assertThat(r.warnings()).contains("warning.pl.exciseDeclarationWithin14Days");
    }

    @Test
    void historicCarIsDutyFreeWithReducedVat() {
        CalculationRequest base = copartToGdynia(FuelType.PETROL, 2500);
        CalculationRequest historic = new CalculationRequest(base.originCountry(), base.auctionHouse(),
                base.titleType(), base.pickupZone(), null, base.bidPrice(), base.vehicleCategory(), base.fuelType(),
                base.engineCc(), 1990, true, base.condition(), base.shippingMethod(), base.euPortCode(),
                base.destinationCountry(), base.buyerType(), base.customsProcedure(), base.displayCurrency());
        CalculationResult r = engine.calculate(historic, Scenario.EXPECTED, FX);

        assertThat(r.historic()).isTrue();
        assertThat(r.hsCode()).isEqualTo("970500");
        assertThat(line(r, "CUSTOMS_DUTY").amount().isZero()).isTrue();
        assertThat(line(r, "IMPORT_VAT").rate()).isEqualByComparingTo("0.08");
    }

    @Nested
    class Procedure4200 {

        @Test
        void isRejectedForPrivateBuyers() {
            CalculationRequest req = with(copartToGdynia(FuelType.PETROL, 2500), "DEBRV", BuyerType.PRIVATE,
                    CustomsProcedure.VAT_DEFERRED_4200);
            assertThat(req.isProcedureAllowedForBuyer()).isFalse();
            assertThatThrownBy(() -> engine.calculate(req, Scenario.EXPECTED, FX))
                    .isInstanceOf(CalculationException.class);
        }

        @Test
        void defersVatToDestinationAsReverseCharge() {
            CalculationRequest req = with(copartToGdynia(FuelType.PETROL, 2500), "DEBRV", BuyerType.COMPANY,
                    CustomsProcedure.VAT_DEFERRED_4200);
            CalculationResult r = engine.calculate(req, Scenario.EXPECTED, FX);

            assertThat(line(r, "IMPORT_VAT").amount().isZero()).isTrue();
            CostLine reverse = line(r, "INTRA_EU_ACQUISITION_VAT");
            assertThat(reverse.includedInTotal()).isFalse();
            assertThat(reverse.rate()).isEqualByComparingTo("0.23");
            assertThat(reverse.original().currency()).isEqualTo(CurrencyCode.PLN);
        }

        @Test
        void isRejectedWhenClearedInTheDestinationCountry() {
            CalculationRequest req = with(copartToGdynia(FuelType.PETROL, 2500), "PLGDY", BuyerType.COMPANY,
                    CustomsProcedure.VAT_DEFERRED_4200);
            assertThatThrownBy(() -> engine.calculate(req, Scenario.EXPECTED, FX))
                    .isInstanceOf(CalculationException.class)
                    .hasMessageContaining("error.procedure4200.sameCountry");
        }
    }

    @Test
    void rangeIsOrdered() {
        QuoteRange range = engine.calculateRange(copartToGdynia(FuelType.PETROL, 2500), FX);
        assertThat(range.low().total()).isLessThan(range.expected().total());
        assertThat(range.expected().total()).isLessThan(range.high().total());
    }

    @Test
    void nonRunningVehicleGetsForkliftAndWinchSurcharges() {
        CalculationRequest base = copartToGdynia(FuelType.PETROL, 1800);
        CalculationRequest damaged = new CalculationRequest(base.originCountry(), base.auctionHouse(),
                base.titleType(), base.pickupZone(), null, base.bidPrice(), base.vehicleCategory(), base.fuelType(),
                base.engineCc(), base.productionYear(), false, VehicleCondition.NON_RUNNING, base.shippingMethod(),
                base.euPortCode(), base.destinationCountry(), base.buyerType(), base.customsProcedure(),
                base.displayCurrency());
        CalculationResult runner = engine.calculate(base, Scenario.EXPECTED, FX);
        CalculationResult nonRunner = engine.calculate(damaged, Scenario.EXPECTED, FX);

        assertThat(line(nonRunner, "FORKLIFT_LOADING").original().amount()).isEqualByComparingTo("50");
        // inland gets the +100 USD winch surcharge
        assertThat(line(nonRunner, "INLAND_TRANSPORT").original().amount()).isEqualByComparingTo("250");
        assertThat(nonRunner.customsValue()).isGreaterThan(runner.customsValue());
    }

    @Test
    void ussJapanFeesAreInYen() {
        CalculationRequest req = new CalculationRequest(OriginCountry.JAPAN, AuctionHouse.USS, TitleType.CLEAN, null,
                null, new BigDecimal("2000000"), VehicleCategory.PASSENGER_CAR, FuelType.HEV, 1800, 2019, false,
                VehicleCondition.RUN_AND_DRIVE, ShippingMethod.CONTAINER_SHARED, "PLGDY", "PL", BuyerType.PRIVATE,
                CustomsProcedure.STANDARD_4000, CurrencyCode.EUR);
        CalculationResult r = engine.calculate(req, Scenario.EXPECTED, FX);

        assertThat(line(r, "AUCTION_AGENT_COMMISSION").original().amount()).isEqualByComparingTo("80000");
        assertThat(line(r, "AUCTION_AGENT_COMMISSION").original().currency()).isEqualTo(CurrencyCode.JPY);
        assertThat(line(r, "EXCISE_TAX").rate()).isEqualByComparingTo("0.0155");
        assertThat(r.total().currency()).isEqualTo(CurrencyCode.EUR);
    }
}
