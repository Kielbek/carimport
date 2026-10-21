package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.RiskFactor;
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.stereotype.Component;

/**
 * Things that may go wrong on the way (port storage, customs inspection, hidden damage, title delays, ...).
 * <ul>
 *   <li>optimistic: nothing happens (0)</li>
 *   <li>average: expected value = probability x mid cost - what the risk "costs" across many imports</li>
 *   <li>pessimistic: the risk materialises at its upper bound</li>
 * </ul>
 * Every line carries its probability and full cost band so the report can explain the number.
 */
@Component
public class RiskStep implements CalculationStep {

    private static final BigDecimal HUNDRED = BigDecimal.valueOf(100);

    @Override
    public int order() {
        return RISKS;
    }

    @Override
    public void apply(CalculationContext ctx) {
        CalculationRequest req = ctx.request();
        Money bid = Money.of(req.bidPrice(), req.originCountry().currency());
        for (RiskFactor rf : ctx.catalog().riskFactors()) {
            if (!rf.appliesTo(req.originCountry(), req.condition(), req.titleType())) {
                continue;
            }
            Money min = bound(rf, bid, true);
            Money max = bound(rf, bid, false);
            Money amount = switch (ctx.scenario()) {
                case LOW -> Money.zero(max.currency());
                case EXPECTED -> min.plus(max).times(new BigDecimal("0.5")).times(rf.getProbability());
                case HIGH -> max;
            };
            ctx.add(new CostLine("RISK_" + rf.getCode(), CostCategory.RISK, amount.rounded(), ctx.toBase(amount).rounded(),
                    null, rf.getProbability(), true, CalculationContext.params(
                            "probability", rf.getProbability().multiply(HUNDRED).setScale(0, RoundingMode.HALF_UP).toPlainString(),
                            "min", ctx.toBase(min).rounded().amount().toPlainString(),
                            "max", ctx.toBase(max).rounded().amount().toPlainString(),
                            "currency", ctx.baseCurrency().name())));
        }
    }

    private static Money bound(RiskFactor rf, Money bid, boolean lower) {
        BigDecimal amount = lower ? rf.getAmountMin() : rf.getAmountMax();
        return switch (rf.getBasis()) {
            case FIXED -> Money.of(amount, rf.getCurrency());
            case PCT_OF_BID -> bid.times(amount);
            case PER_DAY -> Money.of(amount.multiply(BigDecimal.valueOf(lower ? rf.getDaysMin() : rf.getDaysMax())),
                    rf.getCurrency());
        };
    }
}
