package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.strategy.ClearanceVatStrategy;
import java.util.List;
import org.springframework.stereotype.Component;

/** Import VAT is owed in the member state of clearance, so the strategy is selected by the EU port's country. */
@Component
public class ImportVatStep implements CalculationStep {

    private final List<ClearanceVatStrategy> strategies;

    public ImportVatStep(List<ClearanceVatStrategy> strategies) {
        this.strategies = strategies;
    }

    @Override
    public int order() {
        return IMPORT_VAT;
    }

    @Override
    public void apply(CalculationContext ctx) {
        String clearanceCountry = ctx.euPort().getCountryCode();
        strategies.stream()
                .filter(s -> s.supports(clearanceCountry))
                .min((a, b) -> Boolean.compare(a.isFallback(), b.isFallback()))
                .orElseThrow()
                .apply(ctx);
    }
}
