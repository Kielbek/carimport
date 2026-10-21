package com.carimport.reference;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.OriginCountry;
import jakarta.persistence.*;
import java.math.BigDecimal;

/** Flat per-lot fees charged by an auction regardless of price: gate fee, environmental fee, title handling, ... */
@Entity
@Table(name = "auction_fixed_fee")
public class AuctionFixedFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "auction_house", nullable = false, length = 32)
    private AuctionHouse auctionHouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "origin_country", nullable = false, length = 16)
    private OriginCountry originCountry;

    /** i18n key suffix, e.g. GATE_FEE -> cost.GATE_FEE. */
    @Column(nullable = false, length = 48)
    private String code;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    protected AuctionFixedFee() {
    }

    public AuctionFixedFee(AuctionHouse auctionHouse, OriginCountry originCountry, String code, BigDecimal amount,
                           CurrencyCode currency) {
        this.auctionHouse = auctionHouse;
        this.originCountry = originCountry;
        this.code = code;
        this.amount = amount;
        this.currency = currency;
    }

    public AuctionHouse getAuctionHouse() { return auctionHouse; }
    public OriginCountry getOriginCountry() { return originCountry; }
    public String getCode() { return code; }
    public BigDecimal getAmount() { return amount; }
    public CurrencyCode getCurrency() { return currency; }
}
