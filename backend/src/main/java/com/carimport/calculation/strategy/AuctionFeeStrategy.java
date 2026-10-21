package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostLine;
import com.carimport.domain.AuctionHouse;
import java.util.List;

/** Computes the buyer-side fees of one auction house / purchase channel. All lines are part of the customs value. */
public interface AuctionFeeStrategy {

    boolean supports(AuctionHouse house);

    List<CostLine> calculate(CalculationContext ctx);
}
