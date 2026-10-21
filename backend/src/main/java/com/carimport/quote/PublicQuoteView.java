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
 * Free tier: rounded totals of the three scenarios, whole-percent category shares, the lead time, which positions are
 * included (names only) and which risks were considered (with probability). Deliberately carries no amounts per line,
 * rates or tax bases - those are what the paid report sells, so they never leave the server unpaid.
 */
public record PublicQuoteView(
        UUID quoteId,
        BigDecimal rangeMin,
        BigDecimal rangeMax,
        CurrencyCode currency,
        Scenarios scenarios,
        Map<CostCategory, Integer> sharePercent,
        Map<CostCategory, List<String>> includedItems,
        List<RiskInfo> risks,
        boolean exciseApplies,
        int transitDays,
        CalculationResult.Timeline timeline,
        int deliveryKm,
        LocalDate fxDate,
        Set<String> warnings,
        Instant expiresAt) {

    /** Optimistic is rounded down, pessimistic up, average to the nearest step. */
    public record Scenarios(BigDecimal optimistic, BigDecimal average, BigDecimal pessimistic) {
    }

    public record RiskInfo(String code, int probabilityPercent) {
    }

    private static final BigDecimal ROUNDING_STEP = new BigDecimal("100");

    public static PublicQuoteView of(UUID quoteId, QuoteRange range, Instant expiresAt) {
        CalculationResult expected = range.expected();
        Map<CostCategory, List<String>> items = new EnumMap<>(CostCategory.class);
        List<RiskInfo> risks = new ArrayList<>();
        for (CalculationResult.Line l : expected.lines()) {
            if (l.line().category() == CostCategory.RISK) {
                risks.add(new RiskInfo(l.line().code(), Integer.parseInt(l.line().params().get("probability"))));
            } else if (l.line().includedInTotal()) {
                items.computeIfAbsent(l.line().category(), c -> new ArrayList<>()).add(l.line().code());
            }
        }
        return new PublicQuoteView(
                quoteId,
                floorToStep(range.low().total()),
                ceilToStep(range.high().total()),
                expected.displayCurrency(),
                new Scenarios(floorToStep(range.low().total()), roundToStep(expected.total()),
                        ceilToStep(range.high().total())),
                shares(expected.totalsByCategory(), expected.total()),
                items,
                risks,
                expected.lines().stream().anyMatch(l -> l.line().code().equals("EXCISE_TAX") && !l.display().isZero()),
                expected.route().transitDays(),
                expected.timeline(),
                expected.deliveryKm(),
                expected.fxDate(),
                expected.warnings(),
                expiresAt);
    }

    public static BigDecimal roundToStep(Money money) {
        return money.amount().divide(ROUNDING_STEP, 0, RoundingMode.HALF_UP).multiply(ROUNDING_STEP);
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
