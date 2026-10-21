package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.ShippingMethod;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Ocean freight from an export port to an EU port. Stored as a min/max band because forwarder quotes fluctuate weekly;
 * the free tier shows the band, the paid report uses the expected (mid) value.
 */
@Entity
@Table(name = "ocean_freight_rate",
        uniqueConstraints = @UniqueConstraint(columnNames = {"departure_port", "eu_port_code", "method", "size_class"}))
public class OceanFreightRate {

    public enum SizeClass { MOTORCYCLE, SEDAN, SUV, OVERSIZE }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "departure_port", nullable = false, length = 5)
    private String departurePort;

    @Column(name = "eu_port_code", nullable = false, length = 5)
    private String euPortCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24)
    private ShippingMethod method;

    @Enumerated(EnumType.STRING)
    @Column(name = "size_class", nullable = false, length = 16)
    private SizeClass sizeClass;

    @Column(name = "price_min", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMin;

    @Column(name = "price_max", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMax;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @Column(name = "transit_days", nullable = false)
    private int transitDays;

    protected OceanFreightRate() {
    }

    public OceanFreightRate(String departurePort, String euPortCode, ShippingMethod method, SizeClass sizeClass,
                            BigDecimal priceMin, BigDecimal priceMax, CurrencyCode currency, int transitDays) {
        this.departurePort = departurePort;
        this.euPortCode = euPortCode;
        this.method = method;
        this.sizeClass = sizeClass;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.currency = currency;
        this.transitDays = transitDays;
    }

    public String getDeparturePort() { return departurePort; }
    public String getEuPortCode() { return euPortCode; }
    public ShippingMethod getMethod() { return method; }
    public SizeClass getSizeClass() { return sizeClass; }
    public BigDecimal getPriceMin() { return priceMin; }
    public BigDecimal getPriceMax() { return priceMax; }
    public CurrencyCode getCurrency() { return currency; }
    public int getTransitDays() { return transitDays; }
}
