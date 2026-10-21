package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.OriginCountry;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Post-arrival costs in the destination country: sworn translation, first technical inspection, registration,
 * recycling fee, lighting conversion for North-American vehicles, ...
 */
@Entity
@Table(name = "destination_fee")
public class DestinationFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "destination_country", nullable = false, length = 2)
    private String destinationCountry;

    /** Null = applies to imports from every origin. */
    @Enumerated(EnumType.STRING)
    @Column(name = "origin_country", length = 16)
    private OriginCountry originCountry;

    @Column(nullable = false, length = 48)
    private String code;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    /** Estimates (e.g. lighting conversion) widen the price range; statutory fees do not. */
    @Column(nullable = false)
    private boolean estimate;

    /** Optional after-import service the user can switch on/off; statutory fees are never selectable. */
    @Column(nullable = false)
    private boolean selectable;

    /** Whether a selectable service is included when the user has not chosen explicitly. */
    @Column(name = "default_selected", nullable = false)
    private boolean defaultSelected;

    protected DestinationFee() {
    }

    public DestinationFee(String destinationCountry, OriginCountry originCountry, String code, BigDecimal amount,
                          CurrencyCode currency, boolean estimate) {
        this.destinationCountry = destinationCountry;
        this.originCountry = originCountry;
        this.code = code;
        this.amount = amount;
        this.currency = currency;
        this.estimate = estimate;
    }

    public DestinationFee(String destinationCountry, OriginCountry originCountry, String code, BigDecimal amount,
                          CurrencyCode currency, boolean estimate, boolean selectable, boolean defaultSelected) {
        this(destinationCountry, originCountry, code, amount, currency, estimate);
        this.selectable = selectable;
        this.defaultSelected = defaultSelected;
    }

    public boolean appliesTo(OriginCountry origin) {
        return originCountry == null || originCountry == origin;
    }

    public String getDestinationCountry() { return destinationCountry; }
    public OriginCountry getOriginCountry() { return originCountry; }
    public String getCode() { return code; }
    public BigDecimal getAmount() { return amount; }
    public CurrencyCode getCurrency() { return currency; }
    public boolean isEstimate() { return estimate; }
    public boolean isSelectable() { return selectable; }
    public boolean isDefaultSelected() { return defaultSelected; }
}
