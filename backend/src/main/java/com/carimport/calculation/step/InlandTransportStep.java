package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.InlandTransportRate;
import java.math.BigDecimal;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class InlandTransportStep implements CalculationStep {

    public static final String CODE = "INLAND_TRANSPORT";

    @Override
    public int order() {
        return INLAND_TRANSPORT;
    }

    @Override
    public void apply(CalculationContext ctx) {
        InlandTransportRate rate = ctx.route().inland();
        BigDecimal price = ctx.pick(rate.getPriceMin(), rate.getPriceMax());
        if (ctx.request().condition().needsForklift()) {
            price = price.add(rate.getNonRunningSurcharge());
        }
        Money original = Money.of(price, rate.getCurrency());
        ctx.addCifComponent(new CostLine(CODE, CostCategory.TRANSPORT, original, ctx.toBase(original), null, null,
                true, Map.of("from", rate.getPickupZone(), "to", rate.getDeparturePort())));
    }
}
