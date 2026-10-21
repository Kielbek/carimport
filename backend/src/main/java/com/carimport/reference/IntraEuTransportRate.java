package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import jakarta.persistence.*;
import java.math.BigDecimal;

/** Truck (laweta) from the EU port to the buyer's destination country after clearance. */
@Entity
@Table(name = "intra_eu_transport_rate",
        uniqueConstraints = @UniqueConstraint(columnNames = {"eu_port_code", "destination_country"}))
public class IntraEuTransportRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "eu_port_code", nullable = false, length = 5)
    private String euPortCode;

    @Column(name = "destination_country", nullable = false, length = 2)
    private String destinationCountry;

    @Column(name = "price_min", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMin;

    @Column(name = "price_max", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMax;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    /** Typical road distance from the port to the destination country's main population centre. */
    @Column(name = "distance_km", nullable = false)
    private int distanceKm;

    protected IntraEuTransportRate() {
    }

    public IntraEuTransportRate(String euPortCode, String destinationCountry, BigDecimal priceMin, BigDecimal priceMax,
                                CurrencyCode currency) {
        this.euPortCode = euPortCode;
        this.destinationCountry = destinationCountry;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.currency = currency;
    }

    public IntraEuTransportRate(String euPortCode, String destinationCountry, BigDecimal priceMin, BigDecimal priceMax,
                                CurrencyCode currency, int distanceKm) {
        this(euPortCode, destinationCountry, priceMin, priceMax, currency);
        this.distanceKm = distanceKm;
    }

    public String getEuPortCode() { return euPortCode; }
    public String getDestinationCountry() { return destinationCountry; }
    public BigDecimal getPriceMin() { return priceMin; }
    public BigDecimal getPriceMax() { return priceMax; }
    public CurrencyCode getCurrency() { return currency; }
    public int getDistanceKm() { return distanceKm; }
}
