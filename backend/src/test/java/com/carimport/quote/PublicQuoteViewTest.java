package com.carimport.quote;

import static org.assertj.core.api.Assertions.assertThat;

import com.carimport.calculation.CostCategory;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.util.EnumMap;
import java.util.Map;
import org.junit.jupiter.api.Test;

class PublicQuoteViewTest {

    @Test
    void freeResultGivesExactTaxesButOnlyRoundedEstimatesOfTransportAndTheDoorPrice() {
        var support = new com.carimport.calculation.CalculationEngineTest();
        var range = support.range(com.carimport.calculation.CalculationEngineTest.copartToGdynia(
                com.carimport.domain.FuelType.PETROL, 2500));
        TaxSummary t = PublicQuoteView.of(java.util.UUID.randomUUID(), range, "PL", java.time.Instant.now()).taxes();

        java.math.BigDecimal hundred = new java.math.BigDecimal("100");
        assertThat(t.transportToPort().remainder(hundred)).isZero();
        assertThat(t.delivery().remainder(hundred)).isZero();
        assertThat(t.totalWithCar().remainder(hundred)).isZero();
        assertThat(t.duty().amount()).isEqualByComparingTo("5183");          // exact, as in the engine test
        assertThat(t.estimateMin()).isLessThanOrEqualTo(t.totalWithCar());
        assertThat(t.estimateMax()).isGreaterThan(t.estimateMin());
    }

    @Test
    void sharesAlwaysSumToHundred() {
        Map<CostCategory, Money> totals = new EnumMap<>(CostCategory.class);
        totals.put(CostCategory.VEHICLE, Money.of("33333.33", CurrencyCode.PLN));
        totals.put(CostCategory.TRANSPORT, Money.of("33333.33", CurrencyCode.PLN));
        totals.put(CostCategory.TAXES, Money.of("33333.34", CurrencyCode.PLN));
        totals.put(CostCategory.REGISTRATION, Money.of("0", CurrencyCode.PLN));

        Map<CostCategory, Integer> shares = PublicQuoteView.shares(totals, Money.of("100000", CurrencyCode.PLN));

        assertThat(shares.values().stream().mapToInt(Integer::intValue).sum()).isEqualTo(100);
        assertThat(shares.get(CostCategory.REGISTRATION)).isZero();
    }

    @Test
    void rangeIsRoundedOutwardsToHundreds() {
        assertThat(PublicQuoteView.floorToStep(Money.of("62549.99", CurrencyCode.PLN))).isEqualByComparingTo("62500");
        assertThat(PublicQuoteView.ceilToStep(Money.of("67100.01", CurrencyCode.PLN))).isEqualByComparingTo("67200");
    }
}
