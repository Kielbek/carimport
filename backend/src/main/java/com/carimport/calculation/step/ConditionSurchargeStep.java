package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.ConditionSurcharge;
import org.springframework.stereotype.Component;

/** Forklift / winch / extra lashing for vehicles that do not drive onto the truck or into the container. */
@Component
public class ConditionSurchargeStep implements CalculationStep {

    @Override
    public int order() {
        return CONDITION_SURCHARGES;
    }

    @Override
    public void apply(CalculationContext ctx) {
        if (!ctx.request().condition().needsForklift()) {
            return;
        }
        for (ConditionSurcharge s : ctx.catalog().conditionSurcharges(ctx.request().originCountry(),
                ctx.request().condition())) {
            Money original = Money.of(s.getAmount(), s.getCurrency());
            ctx.addCifComponent(CostLine.fee(s.getCode(), CostCategory.TRANSPORT, original, ctx.toBase(original)));
        }
    }
}
