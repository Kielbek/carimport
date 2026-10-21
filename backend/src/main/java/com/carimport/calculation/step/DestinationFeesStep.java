package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.Scenario;
import com.carimport.domain.Money;
import com.carimport.reference.DestinationFee;
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

/** Registration-related costs; estimated positions (e.g. lighting conversion) get a -15% / +25% band in LOW/HIGH. */
@Component
public class DestinationFeesStep implements CalculationStep {

    private static final BigDecimal ESTIMATE_LOW = new BigDecimal("0.85");
    private static final BigDecimal ESTIMATE_HIGH = new BigDecimal("1.25");

    @Override
    public int order() {
        return DESTINATION_FEES;
    }

    @Override
    public void apply(CalculationContext ctx) {
        for (DestinationFee fee : ctx.catalog().destinationFees(ctx.request().destinationCountry())) {
            if (!fee.appliesTo(ctx.request().originCountry())) {
                continue;
            }
            BigDecimal amount = fee.isEstimate() ? estimate(fee.getAmount(), ctx.scenario()) : fee.getAmount();
            Money original = Money.of(amount, fee.getCurrency());
            ctx.add(CostLine.fee(fee.getCode(), CostCategory.REGISTRATION, original, ctx.toBase(original)));
        }
    }

    private static BigDecimal estimate(BigDecimal amount, Scenario scenario) {
        return switch (scenario) {
            case LOW -> amount.multiply(ESTIMATE_LOW);
            case EXPECTED -> amount;
            case HIGH -> amount.multiply(ESTIMATE_HIGH);
        };
    }
}
