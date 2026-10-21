package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.DeliveryMode;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Per-km price of the port-to-home leg in a destination country: cost = max(minimum, fixed + km x price per km).
 * For SELF_DRIVE the per-km part is fuel and the fixed part is temporary plates + short-term insurance.
 * Country "*" is the EU-wide fallback.
 */
@Entity
@Table(name = "road_transport_rate", uniqueConstraints = @UniqueConstraint(columnNames = {"country_code", "mode"}))
public class RoadTransportRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_code", nullable = false, length = 2)
    private String countryCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private DeliveryMode mode;

    @Column(name = "price_per_km_min", nullable = false, precision = 8, scale = 3)
    private BigDecimal pricePerKmMin;

    @Column(name = "price_per_km_max", nullable = false, precision = 8, scale = 3)
    private BigDecimal pricePerKmMax;

    @Column(name = "fixed_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal fixedFee;

    @Column(name = "minimum_charge", nullable = false, precision = 10, scale = 2)
    private BigDecimal minimumCharge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    protected RoadTransportRate() {
    }

    public RoadTransportRate(String countryCode, DeliveryMode mode, BigDecimal pricePerKmMin, BigDecimal pricePerKmMax,
                             BigDecimal fixedFee, BigDecimal minimumCharge, CurrencyCode currency) {
        this.countryCode = countryCode;
        this.mode = mode;
        this.pricePerKmMin = pricePerKmMin;
        this.pricePerKmMax = pricePerKmMax;
        this.fixedFee = fixedFee;
        this.minimumCharge = minimumCharge;
        this.currency = currency;
    }

    public String getCountryCode() { return countryCode; }
    public DeliveryMode getMode() { return mode; }
    public BigDecimal getPricePerKmMin() { return pricePerKmMin; }
    public BigDecimal getPricePerKmMax() { return pricePerKmMax; }
    public BigDecimal getFixedFee() { return fixedFee; }
    public BigDecimal getMinimumCharge() { return minimumCharge; }
    public CurrencyCode getCurrency() { return currency; }
}
