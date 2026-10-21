package com.carimport.reference;

import com.carimport.domain.FuelType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * National excise / registration tax rate for passenger cars, keyed by destination country, fuel type and engine
 * displacement band. Poland: 3.1% / 18.6% for ICE, 1.55% / 9.3% for hybrids, 0% for EV.
 */
@Entity
@Table(name = "excise_rate", indexes = @Index(columnList = "country_code, fuel_type"))
public class ExciseRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_code", nullable = false, length = 2)
    private String countryCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", nullable = false, length = 16)
    private FuelType fuelType;

    /** Inclusive lower bound in cm3. */
    @Column(name = "cc_from", nullable = false)
    private int ccFrom;

    /** Inclusive upper bound in cm3; null = open ended. */
    @Column(name = "cc_to")
    private Integer ccTo;

    @Column(nullable = false, precision = 6, scale = 5)
    private BigDecimal rate;

    @Column(name = "legal_basis", length = 160)
    private String legalBasis;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_to")
    private LocalDate validTo;

    protected ExciseRate() {
    }

    public ExciseRate(String countryCode, FuelType fuelType, int ccFrom, Integer ccTo, BigDecimal rate) {
        this.countryCode = countryCode;
        this.fuelType = fuelType;
        this.ccFrom = ccFrom;
        this.ccTo = ccTo;
        this.rate = rate;
        this.validFrom = LocalDate.of(2000, 1, 1);
    }

    public boolean matches(int engineCc) {
        return engineCc >= ccFrom && (ccTo == null || engineCc <= ccTo);
    }

    public String getCountryCode() { return countryCode; }
    public FuelType getFuelType() { return fuelType; }
    public int getCcFrom() { return ccFrom; }
    public Integer getCcTo() { return ccTo; }
    public BigDecimal getRate() { return rate; }
    public String getLegalBasis() { return legalBasis; }
}
