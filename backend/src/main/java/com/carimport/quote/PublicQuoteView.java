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
 * Free tier: the numbers anyone could work out on paper - customs duty, import VAT of the port country, the national
 * tax of the country of registration and the port fees, each with rate and country - plus the names of everything
 * else the full calculation includes. The door-to-door total, the three scenarios, transport and delivery, registration
 * and hidden costs are what the paid report sells, so they never leave the server unpaid.
 *
 * @param lockedItems names (cost.* codes) of the positions computed but only shown in the report, per category
 * @param risks       risk codes considered (names only)
 * @param lockedCount number of report lines that are hidden in the free result
 */
public record PublicQuoteView(
        UUID quoteId,
        CurrencyCode currency,
        TaxSummary taxes,
        String clearancePort,
        String clearanceCountry,
        String destinationCountry,
        Map<CostCategory, List<String>> lockedItems,
        List<String> risks,
        int lockedCount,
        int transitDays,
        LocalDate fxDate,
        Set<String> warnings,
        Instant expiresAt) {

    private static final BigDecimal ROUNDING_STEP = new BigDecimal("100");
    private static final Set<String> FREE_CODES = Set.of("CUSTOMS_DUTY", "IMPORT_VAT", "EXCISE_TAX", "PORT_UNLOADING",
            "CUSTOMS_AGENCY");

    public static PublicQuoteView of(UUID quoteId, QuoteRange range, String destinationCountry, Instant expiresAt) {
        CalculationResult expected = range.expected();
        String clearanceCountry = expected.lines().stream()
                .filter(l -> l.line().code().equals("IMPORT_VAT"))
                .map(l -> l.line().params().get("country"))
                .findFirst().orElse(destinationCountry);
        Map<CostCategory, List<String>> locked = new EnumMap<>(CostCategory.class);
        List<String> risks = new ArrayList<>();
        int lockedCount = 0;
        for (CalculationResult.Line l : expected.lines()) {
            if (l.line().category() == CostCategory.RISK) {
                risks.add(l.line().code());
                lockedCount++;
            } else if (l.line().includedInTotal() && !FREE_CODES.contains(l.line().code())
                    && !l.line().code().equals("PURCHASE_PRICE")) {
                locked.computeIfAbsent(l.line().category(), c -> new ArrayList<>()).add(l.line().code());
                lockedCount++;
            }
        }
        return new PublicQuoteView(
                quoteId,
                expected.displayCurrency(),
                TaxSummary.of(expected, clearanceCountry, destinationCountry),
                expected.route().euPortName(),
                clearanceCountry,
                destinationCountry,
                locked,
                risks,
                lockedCount,
                expected.route().transitDays(),
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
