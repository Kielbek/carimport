package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.strategy.AuctionFeeStrategy;
import java.util.List;
import org.springframework.stereotype.Component;

/** Delegates to the fee strategy of the selected auction house (Copart, IAAI, USS, dealer purchase, ...). */
@Component
public class AuctionFeeStep implements CalculationStep {

    private final List<AuctionFeeStrategy> strategies;

    public AuctionFeeStep(List<AuctionFeeStrategy> strategies) {
        this.strategies = strategies;
    }

    @Override
    public int order() {
        return AUCTION_FEES;
    }

    @Override
    public void apply(CalculationContext ctx) {
        AuctionFeeStrategy strategy = strategies.stream()
                .filter(s -> s.supports(ctx.request().auctionHouse()))
                .findFirst()
                .orElseThrow(() -> new CalculationException("error.auction.unsupported",
                        ctx.request().auctionHouse().name()));
        strategy.calculate(ctx).forEach(ctx::addCifComponent);
    }
}
