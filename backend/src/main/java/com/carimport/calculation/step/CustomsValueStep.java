package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import org.springframework.stereotype.Component;

/**
 * Customs value on CIF basis (Art. 70-71 UCC): transaction value + auction commission + all transport and insurance
 * costs up to the place where the goods enter the EU customs territory. Produces no cost line of its own.
 */
@Component
public class CustomsValueStep implements CalculationStep {

    @Override
    public int order() {
        return CUSTOMS_VALUE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        ctx.customsValue(ctx.sumOfCifComponents().rounded());
    }
}
