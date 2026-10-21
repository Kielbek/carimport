package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.OceanFreightRate;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class OceanFreightStep implements CalculationStep {

    public static final String CODE = "OCEAN_FREIGHT";

    @Override
    public int order() {
        return OCEAN_FREIGHT;
    }

    @Override
    public void apply(CalculationContext ctx) {
        OceanFreightRate rate = ctx.route().ocean();
        Money original = Money.of(ctx.pick(rate.getPriceMin(), rate.getPriceMax()), rate.getCurrency());
        ctx.addCifComponent(new CostLine(CODE, CostCategory.TRANSPORT, original, ctx.toBase(original), null, null,
                true, Map.of("from", rate.getDeparturePort(), "to", rate.getEuPortCode(),
                "method", rate.getMethod().name(), "transitDays", String.valueOf(rate.getTransitDays()))));
    }
}
