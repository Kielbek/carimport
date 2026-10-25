package com.carimport.calculation.registration;

import static org.assertj.core.api.Assertions.assertThat;

import com.carimport.domain.FuelType;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

/** Spot checks against the worked examples published by the tax authorities. */
class RegistrationTaxesTest {

    private static RegistrationTaxes.Input car(String country, FuelType fuel, int co2, int kw, int cc, int age,
                                               String value, String vat) {
        return car(country, fuel, co2, kw, cc, 1400, age, value, vat);
    }

    private static RegistrationTaxes.Input car(String country, FuelType fuel, int co2, int kw, int cc, int kg, int age,
                                               String value, String vat) {
        return new RegistrationTaxes.Input(country, fuel, co2, kw, cc, kg, age, new BigDecimal(value),
                new BigDecimal(vat));
    }

    private static BigDecimal tax(RegistrationTaxes.Input in) {
        return RegistrationTaxes.assess(in).orElseThrow().amount();
    }

    @Test
    void dutchBpmMatchesBelastingdienstExampleForANewCar() {
        // 130 g/km: 2 727 + 30 × 181 = 8 157 €
        assertThat(tax(car("NL", FuelType.PETROL, 130, 110, 1500, 0, "30000", "0.21"))).isEqualByComparingTo("8157");
    }

    @Test
    void dutchBpmIsDepreciatedForUsedImportsAndHasADieselSurcharge() {
        BigDecimal used = tax(car("NL", FuelType.PETROL, 130, 110, 1500, 5, "30000", "0.21"));
        assertThat(used).isLessThan(new BigDecimal("8157")).isGreaterThan(new BigDecimal("2000"));
        BigDecimal diesel = tax(car("NL", FuelType.DIESEL, 130, 110, 1500, 0, "30000", "0.21"));
        assertThat(diesel).isEqualByComparingTo(String.valueOf(Math.round(8157 + 114.83 * 61)));
    }

    @Test
    void portugueseIsvMatchesPublishedExampleLessTheUsedCarReduction() {
        // new 1598 cm³, 139 g WLTP: 2 769.90 + 124.09 = 2 893.99 €; under a year old as a used import: −10 %
        assertThat(tax(car("PT", FuelType.PETROL, 139, 90, 1598, 0, "20000", "0.23")))
                .isEqualByComparingTo(String.valueOf(Math.round(2893.99 * 0.9)));
    }

    @Test
    void austrianNovaUsesCo2RateMalusAndDeduction() {
        // 175 g: (175 − 91) / 5 = 16.8 % of 30 000 = 5 040, malus 20 × 80 = 1 600, minus 350 → 6 290
        assertThat(tax(car("AT", FuelType.PETROL, 175, 150, 2000, 3, "30000", "0.2"))).isEqualByComparingTo("6290");
    }

    @Test
    void frenchWeightMalusIsMarginalByBand() {
        // same car at 1 400 kg and at 1 950 kg: 200×10 + 100×15 + 100×20 + 50×25 = 6 750 € more (new car)
        BigDecimal light = tax(car("FR", FuelType.PETROL, 150, 110, 2000, 1400, 0, "30000", "0.2"));
        BigDecimal heavy = tax(car("FR", FuelType.PETROL, 150, 110, 2000, 1950, 0, "30000", "0.2"));
        assertThat(heavy.subtract(light)).isEqualByComparingTo("6750");
    }

    @Test
    void slovakFeeIsPowerBandTimesEcologicalCoefficient() {
        // 96 kW → 90 €; a 2017 car (age 9, Euro 6b-c) × 0.45 = 40.50 € → 41
        assertThat(tax(car("SK", FuelType.PETROL, 150, 96, 1600, 9, "20000", "0.23"))).isEqualByComparingTo("41");
        // 343 kW → 1 000 €; a 2019 car (Euro 6d) × 0.40
        assertThat(tax(car("SK", FuelType.PETROL, 314, 343, 4951, 7, "20000", "0.23"))).isEqualByComparingTo("400");
        // never below 33 €; electric 33 €
        assertThat(tax(car("SK", FuelType.PETROL, 120, 70, 1200, 3, "20000", "0.23"))).isEqualByComparingTo("33");
        assertThat(tax(car("SK", FuelType.EV, 0, 300, 0, 1, "40000", "0.23"))).isEqualByComparingTo("33");
    }

    @Test
    void lithuanianTaxPerStartedTenGramsAbove130() {
        assertThat(tax(car("LT", FuelType.PETROL, 130, 100, 1500, 3, "20000", "0.21"))).isEqualByComparingTo("0");
        assertThat(tax(car("LT", FuelType.PETROL, 141, 100, 1500, 3, "20000", "0.21"))).isEqualByComparingTo("43");
        assertThat(tax(car("LT", FuelType.PETROL, 275, 300, 5000, 3, "20000", "0.21"))).isEqualByComparingTo("324");
        assertThat(tax(car("LT", FuelType.DIESEL, 165, 140, 2000, 3, "20000", "0.21"))).isEqualByComparingTo("173");
    }

    @Test
    void hungarianTaxDepreciatesWithAge() {
        // 90 kW (× 1.5), a 5-year-old car: 61-72 months → 59 % off: 47 000 × 1.5 × 0.41 = 28 905 Ft
        assertThat(tax(car("HU", FuelType.PETROL, 140, 90, 1600, 5, "8000000", "0.27"))).isEqualByComparingTo("28905");
        assertThat(tax(car("HU", FuelType.EV, 0, 200, 0, 1, "15000000", "0.27"))).isEqualByComparingTo("0");
    }

    @Test
    void latviaHasNoRegistrationTax() {
        assertThat(RegistrationTaxes.NONE).contains("LV");
        assertThat(RegistrationTaxes.assess(car("LV", FuelType.PETROL, 200, 150, 2000, 3, "20000", "0.21"))).isEmpty();
    }

    @Test
    void spanishIedmtBands() {
        assertThat(tax(car("ES", FuelType.PETROL, 120, 100, 1500, 2, "20000", "0.21"))).isEqualByComparingTo("0");
        assertThat(tax(car("ES", FuelType.PETROL, 175, 150, 2000, 2, "20000", "0.21"))).isEqualByComparingTo("1950");
    }

    @Test
    void zeroEmissionCarsPayNoCo2BasedTax() {
        assertThat(tax(car("AT", FuelType.EV, 0, 150, 0, 1, "40000", "0.2"))).isEqualByComparingTo("0");
        assertThat(tax(car("ES", FuelType.EV, 0, 150, 0, 1, "40000", "0.21"))).isEqualByComparingTo("0");
    }

    @Test
    void countriesWithoutTaxOrWithOfficialCalculatorAreNotEstimated() {
        assertThat(RegistrationTaxes.assess(car("DE", FuelType.PETROL, 175, 150, 2000, 3, "30000", "0.19"))).isEmpty();
        assertThat(RegistrationTaxes.assess(car("HR", FuelType.PETROL, 175, 150, 2000, 3, "30000", "0.25"))).isEmpty();
        assertThat(RegistrationTaxes.OFFICIAL_CALCULATOR).containsOnlyKeys("CY", "GR", "HR", "MT");
        assertThat(RegistrationTaxes.NONE).contains("DE", "CZ", "SE");
    }
}
