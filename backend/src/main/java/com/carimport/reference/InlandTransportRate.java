package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.OriginCountry;
import jakarta.persistence.*;
import java.math.BigDecimal;

/** Towing / trucking from the auction yard zone (US state, Canadian province, Japanese prefecture) to the export port. */
@Entity
@Table(name = "inland_transport_rate",
        uniqueConstraints = @UniqueConstraint(columnNames = {"origin_country", "pickup_zone", "departure_port"}))
public class InlandTransportRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "origin_country", nullable = false, length = 16)
    private OriginCountry originCountry;

    /** E.g. "CA", "TX", "ON", "TOKYO", or "*" as a country-wide fallback. */
    @Column(name = "pickup_zone", nullable = false, length = 16)
    private String pickupZone;

    /** UN/LOCODE of the export port, e.g. USNWK, USSAV, USHOU, USLAX, CAHAL, JPYOK, AEJEA, GBSOU. */
    @Column(name = "departure_port", nullable = false, length = 5)
    private String departurePort;

    @Column(name = "price_min", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMin;

    @Column(name = "price_max", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceMax;

    /** Added when the vehicle is not runnable (winch truck instead of a carrier slot). */
    @Column(name = "non_running_surcharge", nullable = false, precision = 10, scale = 2)
    private BigDecimal nonRunningSurcharge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    protected InlandTransportRate() {
    }

    public InlandTransportRate(OriginCountry originCountry, String pickupZone, String departurePort, BigDecimal priceMin,
                               BigDecimal priceMax, BigDecimal nonRunningSurcharge, CurrencyCode currency) {
        this.originCountry = originCountry;
        this.pickupZone = pickupZone;
        this.departurePort = departurePort;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.nonRunningSurcharge = nonRunningSurcharge;
        this.currency = currency;
    }

    public OriginCountry getOriginCountry() { return originCountry; }
    public String getPickupZone() { return pickupZone; }
    public String getDeparturePort() { return departurePort; }
    public BigDecimal getPriceMin() { return priceMin; }
    public BigDecimal getPriceMax() { return priceMax; }
    public BigDecimal getNonRunningSurcharge() { return nonRunningSurcharge; }
    public CurrencyCode getCurrency() { return currency; }
}
