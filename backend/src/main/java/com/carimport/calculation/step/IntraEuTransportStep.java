package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import java.util.Map;
import org.springframework.stereotype.Component;

/** Car carrier from the EU port to the buyer's country. */
@Component
public class IntraEuTransportStep implements CalculationStep {

    public static final String CODE = "INTRA_EU_TRANSPORT";

    @Override
    public int order() {
        return INTRA_EU_TRANSPORT;
    }

    @Override
    public void apply(CalculationContext ctx) {
        String destination = ctx.request().destinationCountry();
        ctx.catalog().intraEuRate(ctx.euPort().getCode(), destination).ifPresentOrElse(rate -> {
            Money original = Money.of(ctx.pick(rate.getPriceMin(), rate.getPriceMax()), rate.getCurrency());
            ctx.add(new CostLine(CODE, CostCategory.TRANSPORT, original, ctx.toBase(original), null, null, true,
                    Map.of("from", ctx.euPort().getName(), "to", destination)));
        }, () -> ctx.warn("warning.intraEuTransport.notPriced"));
    }
}
