package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.VehicleCondition;
import jakarta.persistence.*;
import java.math.BigDecimal;

/** Extra handling for damaged vehicles: forklift loading at the yard, winch truck, container lashing, ... */
@Entity
@Table(name = "condition_surcharge")
public class ConditionSurcharge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "origin_country", nullable = false, length = 16)
    private OriginCountry originCountry;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_condition", nullable = false, length = 16)
    private VehicleCondition condition;

    @Column(nullable = false, length = 48)
    private String code;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    protected ConditionSurcharge() {
    }

    public ConditionSurcharge(OriginCountry originCountry, VehicleCondition condition, String code, BigDecimal amount,
                              CurrencyCode currency) {
        this.originCountry = originCountry;
        this.condition = condition;
        this.code = code;
        this.amount = amount;
        this.currency = currency;
    }

    public OriginCountry getOriginCountry() { return originCountry; }
    public VehicleCondition getCondition() { return condition; }
    public String getCode() { return code; }
    public BigDecimal getAmount() { return amount; }
    public CurrencyCode getCurrency() { return currency; }
}
