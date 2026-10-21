package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.AuctionHouse;
import com.carimport.domain.Money;
import com.carimport.reference.AuctionFeeTier;
import com.carimport.reference.AuctionFixedFee;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * Copart / IAAI / USS / Emirates Auction all publish sliding fee schedules: for each fee type the tier matching the
 * hammer price (and title type) applies, plus flat per-lot fees (gate, environmental, title handling, recycling).
 * Schedules change a few times a year, so they live in the database, not in code.
 */
@Component
public class ScheduleBasedAuctionFeeStrategy implements AuctionFeeStrategy {

    private static final Set<AuctionHouse> SUPPORTED =
            EnumSet.of(AuctionHouse.COPART, AuctionHouse.IAAI, AuctionHouse.USS, AuctionHouse.EMIRATES_AUCTION);

    @Override
    public boolean supports(AuctionHouse house) {
        return SUPPORTED.contains(house);
    }

    @Override
    public List<CostLine> calculate(CalculationContext ctx) {
        var req = ctx.request();
        List<AuctionFeeTier> tiers = ctx.catalog().auctionFeeTiers(req.auctionHouse());
        if (tiers.isEmpty()) {
            throw new CalculationException("error.auction.noSchedule", req.auctionHouse().name());
        }
        // a schedule is published in one currency (Copart/IAAI: USD); lots in CA/UK are matched by converted price
        Money bid = Money.of(req.bidPrice(), req.originCountry().currency());
        BigDecimal price = ctx.fx().convert(bid, tiers.getFirst().getCurrency()).amount();
        List<CostLine> lines = new ArrayList<>();
        for (AuctionFeeTier.FeeType type : AuctionFeeTier.FeeType.values()) {
            tiers.stream()
                    .filter(t -> t.getFeeType() == type && t.matches(price, req.titleType()))
                    .findFirst()
                    .ifPresent(tier -> {
                        Money fee = Money.of(tier.feeFor(price), tier.getCurrency());
                        lines.add(new CostLine("AUCTION_" + type.name(), CostCategory.VEHICLE, fee, ctx.toBase(fee),
                                null, null, true, Map.of("auction", req.auctionHouse().name(),
                                "titleType", req.titleType().name())));
                    });
        }
        for (AuctionFixedFee fixed : ctx.catalog().auctionFixedFees(req.auctionHouse(), req.originCountry())) {
            Money fee = Money.of(fixed.getAmount(), fixed.getCurrency());
            lines.add(new CostLine("AUCTION_" + fixed.getCode(), CostCategory.VEHICLE, fee, ctx.toBase(fee), null,
                    null, true, Map.of("auction", req.auctionHouse().name())));
        }
        return lines;
    }
}
