package com.carimport.domain;

import java.util.Set;

/** Third countries vehicles are imported from. */
public enum OriginCountry {
    USA(CurrencyCode.USD, Set.of(AuctionHouse.COPART, AuctionHouse.IAAI, AuctionHouse.DEALER)),
    CANADA(CurrencyCode.CAD, Set.of(AuctionHouse.COPART, AuctionHouse.IAAI, AuctionHouse.DEALER)),
    JAPAN(CurrencyCode.JPY, Set.of(AuctionHouse.USS, AuctionHouse.DEALER)),
    UAE(CurrencyCode.AED, Set.of(AuctionHouse.COPART, AuctionHouse.EMIRATES_AUCTION, AuctionHouse.DEALER)),
    UK(CurrencyCode.GBP, Set.of(AuctionHouse.COPART, AuctionHouse.IAAI, AuctionHouse.DEALER));

    private final CurrencyCode currency;
    private final Set<AuctionHouse> auctionHouses;

    OriginCountry(CurrencyCode currency, Set<AuctionHouse> auctionHouses) {
        this.currency = currency;
        this.auctionHouses = auctionHouses;
    }

    public CurrencyCode currency() {
        return currency;
    }

    public boolean supports(AuctionHouse house) {
        return auctionHouses.contains(house);
    }
}
