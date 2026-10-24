package com.carimport.vehicle;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Year;
import org.junit.jupiter.api.Test;

class VinTest {

    private static final Year NOW = Year.of(2026);

    @Test
    void parsesNormalisesAndRejectsImpossibleVins() {
        assertThat(Vin.parse(" 1hgcm8263-3a004352 ")).map(Vin::value).contains("1HGCM82633A004352");
        assertThat(Vin.parse("1HGCM82633A00435")).isEmpty();      // 16 characters
        assertThat(Vin.parse("1HGCM82633A0O4352")).isEmpty();     // letter O is never used
        assertThat(Vin.parse(null)).isEmpty();
    }

    @Test
    void checkDigitCatchesTypos() {
        assertThat(Vin.parse("1HGCM82633A004352").orElseThrow().checkDigitValid()).isTrue();
        assertThat(Vin.parse("1HGCM82633A004353").orElseThrow().checkDigitValid()).isFalse(); // last digit mistyped
    }

    @Test
    void modelYearUsesTheNorthAmericanCycleRule() {
        assertThat(Vin.parse("1HGCM82633A004352").orElseThrow().modelYear(NOW)).contains(2003); // 7th char digit
        assertThat(Vin.parse("1FA6P8CF7K5100001").orElseThrow().modelYear(NOW)).contains(2019); // 7th char letter
        assertThat(Vin.parse("WVWZZZ1KZAW000000").orElseThrow().modelYear(NOW)).contains(2010);
    }

    @Test
    void makeAndCountryFromTheManufacturerPrefix() {
        Vin ford = Vin.parse("1FA6P8CF7K5100001").orElseThrow();
        assertThat(ford.make()).contains("Ford");
        assertThat(ford.country()).contains("US");
        assertThat(ford.northAmerican()).isTrue();
        Vin vw = Vin.parse("WVWZZZ1KZAW000000").orElseThrow();
        assertThat(vw.make()).contains("Volkswagen");
        assertThat(vw.country()).contains("DE");
        assertThat(vw.northAmerican()).isFalse();
    }
}
