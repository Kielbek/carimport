package com.carimport.calculation;

import com.carimport.calculation.step.CalculationStep;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import com.carimport.fx.FxRates;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * Orchestrates the landed-cost pipeline. Stateless and side-effect free: the same request, rates and reference data
 * always produce the same result, which is what lets us persist a quote and regenerate its PDF later.
 */
@Service
public class CalculationEngine {

    private final List<CalculationStep> steps;
    private final TariffCatalog catalog;
    private final Clock clock;

    public CalculationEngine(List<CalculationStep> steps, TariffCatalog catalog, Clock clock) {
        this.steps = steps.stream().sorted(Comparator.comparingInt(CalculationStep::order)).toList();
        this.catalog = catalog;
        this.clock = clock;
    }

    public CalculationResult calculate(CalculationRequest request, Scenario scenario, FxRates fx) {
        CalculationContext ctx = new CalculationContext(request, scenario, fx, catalog, LocalDate.now(clock));
        for (CalculationStep step : steps) {
            step.apply(ctx);
        }
        return toResult(ctx);
    }

    public QuoteRange calculateRange(CalculationRequest request, FxRates fx) {
        return new QuoteRange(
                calculate(request, Scenario.LOW, fx),
                calculate(request, Scenario.EXPECTED, fx),
                calculate(request, Scenario.HIGH, fx));
    }

    private static CalculationResult toResult(CalculationContext ctx) {
        CurrencyCode display = ctx.request().displayCurrency();
        List<CalculationResult.Line> lines = ctx.lines().stream()
                .map(l -> new CalculationResult.Line(l, ctx.fx().convert(l.amount(), display).rounded()))
                .toList();

        Map<CostCategory, Money> byCategory = new EnumMap<>(CostCategory.class);
        for (CostCategory c : CostCategory.values()) {
            byCategory.put(c, Money.zero(display));
        }
        for (CalculationResult.Line l : lines) {
            if (l.line().includedInTotal()) {
                byCategory.merge(l.line().category(), l.display(), Money::plus);
            }
        }
        Money total = byCategory.values().stream().reduce(Money.zero(display), Money::plus);

        Map<CurrencyCode, BigDecimal> rates = new EnumMap<>(CurrencyCode.class);
        rates.putAll(ctx.fx().plnPerUnit());

        CalculationContext.Route route = ctx.route();
        return new CalculationResult(
                ctx.scenario(),
                ctx.calculationDate(),
                ctx.baseCurrency(),
                display,
                ctx.fx().effectiveDate(),
                rates,
                lines,
                ctx.customsValue(),
                ctx.tariff().getHsCode(),
                ctx.tariff().getDutyRate(),
                ctx.historic(),
                new CalculationResult.RouteInfo(route.departurePort(), ctx.euPort().getCode(), ctx.euPort().getName(),
                        route.ocean().getTransitDays()),
                byCategory,
                total,
                ctx.warnings());
    }
}
