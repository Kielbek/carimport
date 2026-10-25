package com.carimport.fx;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

class FxRatesTest {

    @Test
    void customsRateDayIsThePenultimateWednesdayOfThePreviousMonth() {
        // September 2026 ends on a Wednesday (30th) - the penultimate one is the 23rd
        assertThat(FxRates.customsRateDay(LocalDate.of(2026, 10, 24))).isEqualTo(LocalDate.of(2026, 9, 23));
        assertThat(FxRates.customsRateDay(LocalDate.of(2026, 10, 1))).isEqualTo(LocalDate.of(2026, 9, 23));
        assertThat(FxRates.customsRateDay(LocalDate.of(2026, 11, 2))).isEqualTo(LocalDate.of(2026, 10, 21));
        assertThat(FxRates.customsRateDay(LocalDate.of(2026, 3, 15))).isEqualTo(LocalDate.of(2026, 2, 18));
    }
}
