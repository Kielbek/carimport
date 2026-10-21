package com.carimport.report;

import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.QuoteRange;
import com.carimport.domain.Money;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Side-by-side view of the three scenarios for the report: one row per cost line (matched by code), amounts in the
 * display currency. Lines that exist only in some scenarios show as zero in the others.
 */
public record ScenarioTable(List<Row> rows, Map<CostCategory, Money[]> categoryTotals, Money[] totals) {

    public record Row(CostLine line, Money optimistic, Money average, Money pessimistic) {
    }

    public static ScenarioTable of(QuoteRange range) {
        CalculationResult avg = range.expected();
        Map<String, Row> rows = new LinkedHashMap<>();
        for (CalculationResult.Line l : avg.lines()) {
            rows.put(l.line().code(), new Row(l.line(), find(range.low(), l), l.display(), find(range.high(), l)));
        }
        for (CalculationResult r : List.of(range.low(), range.high())) {
            for (CalculationResult.Line l : r.lines()) {
                rows.computeIfAbsent(l.line().code(), c -> new Row(l.line(), find(range.low(), l),
                        Money.zero(l.display().currency()), find(range.high(), l)));
            }
        }
        Map<CostCategory, Money[]> categories = new EnumMap<>(CostCategory.class);
        for (CostCategory c : CostCategory.values()) {
            categories.put(c, new Money[] {range.low().totalsByCategory().get(c), avg.totalsByCategory().get(c),
                    range.high().totalsByCategory().get(c)});
        }
        return new ScenarioTable(new ArrayList<>(rows.values()), categories,
                new Money[] {range.low().total(), avg.total(), range.high().total()});
    }

    public List<Row> rowsOf(CostCategory category) {
        return rows.stream().filter(r -> r.line().category() == category).toList();
    }

    private static Money find(CalculationResult result, CalculationResult.Line like) {
        return result.lines().stream().filter(l -> l.line().code().equals(like.line().code())).map(CalculationResult.Line::display)
                .findFirst().orElse(Money.zero(like.display().currency()));
    }
}
