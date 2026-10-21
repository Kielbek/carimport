package com.carimport.quote;

import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.QuoteRange;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Free tier: a rounded min-max band and whole-percent category shares. Deliberately carries no line items, rates or
 * exact amounts - those are what the paid report sells, so they never leave the server unpaid.
 */
public record PublicQuoteView(
        UUID quoteId,
        BigDecimal rangeMin,
        BigDecimal rangeMax,
        CurrencyCode currency,
        Map<CostCategory, Integer> sharePercent,
        boolean exciseApplies,
        int transitDays,
        LocalDate fxDate,
        Set<String> warnings,
        Instant expiresAt) {

    private static final BigDecimal ROUNDING_STEP = new BigDecimal("100");

    public static PublicQuoteView of(UUID quoteId, QuoteRange range, Instant expiresAt) {
        CalculationResult expected = range.expected();
        return new PublicQuoteView(
                quoteId,
                floorToStep(range.low().total()),
                ceilToStep(range.high().total()),
                expected.displayCurrency(),
                shares(expected.totalsByCategory(), expected.total()),
                expected.lines().stream().anyMatch(l -> l.line().code().equals("EXCISE_TAX") && !l.display().isZero()),
                expected.route().transitDays(),
                expected.fxDate(),
                expected.warnings(),
                expiresAt);
    }

    public static BigDecimal floorToStep(Money money) {
        return money.amount().divide(ROUNDING_STEP, 0, RoundingMode.FLOOR).multiply(ROUNDING_STEP);
    }

    public static BigDecimal ceilToStep(Money money) {
        return money.amount().divide(ROUNDING_STEP, 0, RoundingMode.CEILING).multiply(ROUNDING_STEP);
    }

    /** Largest-remainder rounding so the donut always adds up to exactly 100%. */
    static Map<CostCategory, Integer> shares(Map<CostCategory, Money> totals, Money total) {
        Map<CostCategory, Integer> result = new EnumMap<>(CostCategory.class);
        if (total.isZero()) {
            totals.keySet().forEach(c -> result.put(c, 0));
            return result;
        }
        record Part(CostCategory category, int floor, BigDecimal remainder) {
        }
        List<Part> parts = new ArrayList<>();
        int assigned = 0;
        for (var e : totals.entrySet()) {
            BigDecimal exact = e.getValue().amount().multiply(BigDecimal.valueOf(100))
                    .divide(total.amount(), 6, RoundingMode.HALF_UP);
            int floor = exact.setScale(0, RoundingMode.FLOOR).intValue();
            parts.add(new Part(e.getKey(), floor, exact.subtract(BigDecimal.valueOf(floor))));
            assigned += floor;
        }
        parts.sort(Comparator.comparing(Part::remainder).reversed());
        int missing = 100 - assigned;
        for (int i = 0; i < parts.size(); i++) {
            Part p = parts.get(i);
            result.put(p.category(), p.floor() + (i < missing ? 1 : 0));
        }
        return result;
    }
}
