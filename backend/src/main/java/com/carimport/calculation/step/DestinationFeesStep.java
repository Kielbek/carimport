package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.Proposals;
import com.carimport.calculation.Scenario;
import com.carimport.domain.Money;
import com.carimport.reference.DestinationFee;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * Everything between the port and a registered car: statutory fees (always), optional services the user ticked
 * (lighting conversion, inspection, translations, ...) and repairs and insurance - the user's own amounts, or the
 * calculator's {@link Proposals} when left empty. Estimated and proposed positions get a -15% / +25% band in the
 * optimistic/pessimistic scenarios.
 */
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
        CalculationRequest req = ctx.request();
        Set<String> chosen = req.postImportServices();
        for (DestinationFee fee : ctx.catalog().destinationFees(req.destinationCountry())) {
            if (!fee.appliesTo(req.originCountry())) {
                continue;
            }
            if (fee.isSelectable() && !(chosen == null ? fee.isDefaultSelected() : chosen.contains(fee.getCode()))) {
                continue;
            }
            BigDecimal amount = fee.isEstimate() ? estimate(fee.getAmount(), ctx.scenario()) : fee.getAmount();
            Money original = Money.of(amount, fee.getCurrency());
            ctx.add(new CostLine(fee.getCode(), CostCategory.REGISTRATION, original, ctx.toBase(original), null, null,
                    true, Map.of("type", fee.isSelectable() ? "OPTIONAL" : "STATUTORY",
                    "estimate", String.valueOf(fee.isEstimate()))));
        }
        if (req.repairEstimate() == null) {
            BigDecimal share = Proposals.repairShare(req.condition(), req.titleType());
            Money bid = ctx.toBase(Money.of(req.bidPrice(), req.originCountry().currency()));
            proposed(ctx, "REPAIR_ESTIMATE", Money.of(bid.amount().multiply(share).setScale(-1, RoundingMode.HALF_UP),
                    bid.currency()));
        } else {
            userAmount(ctx, "REPAIR_ESTIMATE", req.repairEstimate());
        }
        if (req.insuranceEstimate() == null) {
            proposed(ctx, "INSURANCE_FIRST_YEAR", Proposals.liabilityInsurance(req.destinationCountry()));
        } else {
            userAmount(ctx, "INSURANCE_FIRST_YEAR", req.insuranceEstimate());
        }
    }

    private static void proposed(CalculationContext ctx, String code, Money proposal) {
        if (proposal.amount().signum() == 0) {
            return;
        }
        Money original = Money.of(estimate(proposal.amount(), ctx.scenario()), proposal.currency());
        ctx.add(new CostLine(code, CostCategory.REGISTRATION, original, ctx.toBase(original), null, null, true,
                Map.of("type", "PROPOSED", "estimate", "true")));
    }

    private static void userAmount(CalculationContext ctx, String code, BigDecimal amount) {
        if (amount == null || amount.signum() == 0) {
            return;
        }
        Money original = Money.of(amount, ctx.request().displayCurrency());
        ctx.add(new CostLine(code, CostCategory.REGISTRATION, original, ctx.toBase(original), null, null, true,
                Map.of("type", "USER")));
    }

    private static BigDecimal estimate(BigDecimal amount, Scenario scenario) {
        return switch (scenario) {
            case LOW -> amount.multiply(ESTIMATE_LOW);
            case EXPECTED -> amount;
            case HIGH -> amount.multiply(ESTIMATE_HIGH);
        };
    }
}
