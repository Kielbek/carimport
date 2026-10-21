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
