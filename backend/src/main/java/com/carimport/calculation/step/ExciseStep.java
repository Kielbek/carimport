package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.strategy.ExciseStrategy;
import java.util.List;
import org.springframework.stereotype.Component;

/**
 * National excise / registration tax is owed in the country where the car will be registered - not where it was
 * cleared - so the strategy is selected by destination country.
 */
@Component
public class ExciseStep implements CalculationStep {

    private final List<ExciseStrategy> strategies;

    public ExciseStep(List<ExciseStrategy> strategies) {
        this.strategies = strategies;
    }

    @Override
    public int order() {
        return EXCISE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        String destination = ctx.request().destinationCountry();
        strategies.stream()
                .filter(s -> s.supports(destination))
                .min((a, b) -> Boolean.compare(a.isFallback(), b.isFallback()))
                .orElseThrow()
                .apply(ctx);
    }
}
