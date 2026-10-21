package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import org.springframework.stereotype.Component;

@Component
public class PurchasePriceStep implements CalculationStep {

    public static final String CODE = "PURCHASE_PRICE";

    @Override
    public int order() {
        return PURCHASE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        Money bid = Money.of(ctx.request().bidPrice(), ctx.request().originCountry().currency());
        ctx.addCifComponent(CostLine.fee(CODE, CostCategory.VEHICLE, bid, ctx.toBase(bid)));
    }
}
