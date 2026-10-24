package com.carimport.calculation.registration;

import static org.assertj.core.api.Assertions.assertThat;

import com.carimport.domain.FuelType;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

/** Spot checks against the worked examples published by the tax authorities. */
class RegistrationTaxesTest {

    private static RegistrationTaxes.Input car(String country, FuelType fuel, int co2, int kw, int cc, int age,
                                               String value, String vat) {
        return new RegistrationTaxes.Input(country, fuel, co2, kw, cc, age, new BigDecimal(value), new BigDecimal(vat));
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
        assertThat(RegistrationTaxes.assess(car("HU", FuelType.PETROL, 175, 150, 2000, 3, "30000", "0.27"))).isEmpty();
        assertThat(RegistrationTaxes.OFFICIAL_CALCULATOR).containsKey("HU");
        assertThat(RegistrationTaxes.NONE).contains("DE", "CZ", "SE");
    }
}
