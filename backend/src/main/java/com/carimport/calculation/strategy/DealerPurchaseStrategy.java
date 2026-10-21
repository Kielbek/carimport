package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostLine;
import com.carimport.domain.AuctionHouse;
import java.util.List;
import org.springframework.stereotype.Component;

/** Purchase from a dealer or private seller: no auction premium, but the buyer should verify the export title. */
@Component
public class DealerPurchaseStrategy implements AuctionFeeStrategy {

    @Override
    public boolean supports(AuctionHouse house) {
        return house == AuctionHouse.DEALER;
    }

    @Override
    public List<CostLine> calculate(CalculationContext ctx) {
        ctx.warn("warning.dealer.verifyExportDocuments");
        return List.of();
    }
}
