package com.carimport.reference;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.TitleType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * One row of an auction's sliding fee schedule, e.g. Copart "buyer fee, salvage title, 1000.00-1099.99 USD -> 325 USD".
 * A tier can be a fixed amount, a percentage of the hammer price, or both (percentage with a minimum).
 */
@Entity
@Table(name = "auction_fee_tier", indexes = @Index(columnList = "auction_house, fee_type, title_type, price_from"))
public class AuctionFeeTier {

    public enum FeeType { BUYER_FEE, VIRTUAL_BID_FEE, AGENT_COMMISSION }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "auction_house", nullable = false, length = 32)
    private AuctionHouse auctionHouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "fee_type", nullable = false, length = 32)
    private FeeType feeType;

    /** Null means the tier applies to every title type. */
    @Enumerated(EnumType.STRING)
    @Column(name = "title_type", length = 16)
    private TitleType titleType;

    @Column(name = "price_from", nullable = false, precision = 14, scale = 2)
    private BigDecimal priceFrom;

    /** Exclusive upper bound; null = open ended. */
    @Column(name = "price_to", precision = 14, scale = 2)
    private BigDecimal priceTo;

    @Column(name = "fixed_amount", nullable = false, precision = 14, scale = 2)
    private BigDecimal fixedAmount = BigDecimal.ZERO;

    /** Fraction of the hammer price, e.g. 0.0575. */
    @Column(name = "percentage", nullable = false, precision = 7, scale = 5)
    private BigDecimal percentage = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_to")
    private LocalDate validTo;

    protected AuctionFeeTier() {
    }

    public AuctionFeeTier(AuctionHouse auctionHouse, FeeType feeType, TitleType titleType, BigDecimal priceFrom,
                          BigDecimal priceTo, BigDecimal fixedAmount, BigDecimal percentage, CurrencyCode currency) {
        this.auctionHouse = auctionHouse;
        this.feeType = feeType;
        this.titleType = titleType;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.fixedAmount = fixedAmount;
        this.percentage = percentage;
        this.currency = currency;
        this.validFrom = LocalDate.of(2000, 1, 1);
    }

    public boolean matches(BigDecimal price, TitleType title) {
        boolean titleOk = titleType == null || titleType == title;
        boolean lowerOk = price.compareTo(priceFrom) >= 0;
        boolean upperOk = priceTo == null || price.compareTo(priceTo) < 0;
        return titleOk && lowerOk && upperOk;
    }

    public BigDecimal feeFor(BigDecimal price) {
        return fixedAmount.add(price.multiply(percentage));
    }

    public AuctionHouse getAuctionHouse() { return auctionHouse; }
    public FeeType getFeeType() { return feeType; }
    public TitleType getTitleType() { return titleType; }
    public BigDecimal getPriceFrom() { return priceFrom; }
    public BigDecimal getPriceTo() { return priceTo; }
    public CurrencyCode getCurrency() { return currency; }
}
