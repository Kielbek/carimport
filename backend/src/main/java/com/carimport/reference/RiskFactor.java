package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCondition;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Something that can go wrong between the auction and the registration office, with an empirical probability and a
 * cost band. Filters (origin, condition, title) narrow where it applies; null = everywhere.
 * <ul>
 *   <li>FIXED: amountMin..amountMax in {@code currency}</li>
 *   <li>PCT_OF_BID: amountMin..amountMax are fractions of the hammer price (origin currency)</li>
 *   <li>PER_DAY: amount per day x daysMin..daysMax</li>
 * </ul>
 */
@Entity
@Table(name = "risk_factor")
public class RiskFactor {

    public enum Basis { FIXED, PCT_OF_BID, PER_DAY }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 48)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(name = "origin_country", length = 16)
    private OriginCountry originCountry;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_condition", length = 16)
    private VehicleCondition condition;

    @Enumerated(EnumType.STRING)
    @Column(name = "title_type", length = 16)
    private TitleType titleType;

    /** Fraction 0..1. */
    @Column(nullable = false, precision = 4, scale = 3)
    private BigDecimal probability;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Basis basis;

    @Column(name = "amount_min", nullable = false, precision = 12, scale = 4)
    private BigDecimal amountMin;

    @Column(name = "amount_max", nullable = false, precision = 12, scale = 4)
    private BigDecimal amountMax;

    @Column(name = "days_min")
    private Integer daysMin;

    @Column(name = "days_max")
    private Integer daysMax;

    /** Null for PCT_OF_BID (uses the bid currency). */
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private CurrencyCode currency;

    protected RiskFactor() {
    }

    public RiskFactor(String code, OriginCountry originCountry, VehicleCondition condition, TitleType titleType,
                      BigDecimal probability, Basis basis, BigDecimal amountMin, BigDecimal amountMax, Integer daysMin,
                      Integer daysMax, CurrencyCode currency) {
        this.code = code;
        this.originCountry = originCountry;
        this.condition = condition;
        this.titleType = titleType;
        this.probability = probability;
        this.basis = basis;
        this.amountMin = amountMin;
        this.amountMax = amountMax;
        this.daysMin = daysMin;
        this.daysMax = daysMax;
        this.currency = currency;
    }

    public boolean appliesTo(OriginCountry origin, VehicleCondition cond, TitleType title) {
        return (originCountry == null || originCountry == origin)
                && (condition == null || condition == cond)
                && (titleType == null || titleType == title);
    }

    public String getCode() { return code; }
    public OriginCountry getOriginCountry() { return originCountry; }
    public VehicleCondition getCondition() { return condition; }
    public TitleType getTitleType() { return titleType; }
    public BigDecimal getProbability() { return probability; }
    public Basis getBasis() { return basis; }
    public BigDecimal getAmountMin() { return amountMin; }
    public BigDecimal getAmountMax() { return amountMax; }
    public Integer getDaysMin() { return daysMin; }
    public Integer getDaysMax() { return daysMax; }
    public CurrencyCode getCurrency() { return currency; }
}
