package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/** Cargo insurance (ICC "A" / all risks) as a percentage of the insured value: price + auction fees, with a minimum. */
@Component
public class InsuranceStep implements CalculationStep {

    public static final String CODE = "CARGO_INSURANCE";
    private static final Set<String> INSURED_LINE_PREFIXES = Set.of(PurchasePriceStep.CODE, "AUCTION_");

    private final BigDecimal rate;
    private final Money minimum;

    public InsuranceStep(@Value("${app.insurance.rate:0.015}") BigDecimal rate,
                         @Value("${app.insurance.minimum-eur:60}") BigDecimal minimumEur) {
        this.rate = rate;
        this.minimum = Money.of(minimumEur, CurrencyCode.EUR);
    }

    @Override
    public int order() {
        return INSURANCE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        Money insured = ctx.lines().stream()
                .filter(l -> INSURED_LINE_PREFIXES.stream().anyMatch(p -> l.code().startsWith(p)))
                .map(CostLine::amount)
                .reduce(ctx.zero(), Money::plus);
        Money premium = insured.percent(rate);
        Money floor = ctx.toBase(minimum);
        Money amount = premium.compareTo(floor) < 0 ? floor : premium;
        ctx.addCifComponent(new CostLine(CODE, CostCategory.TRANSPORT, amount, amount, insured, rate, true,
                Map.of()));
    }
}
