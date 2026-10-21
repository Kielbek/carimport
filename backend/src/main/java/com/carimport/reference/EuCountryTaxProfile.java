package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** VAT rates of an EU member state, versioned by validity date so historical quotes stay reproducible. */
@Entity
@Table(name = "eu_country_tax_profile",
        uniqueConstraints = @UniqueConstraint(columnNames = {"country_code", "valid_from"}))
public class EuCountryTaxProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_code", nullable = false, length = 2)
    private String countryCode;

    /** Currency in which the member state assesses and collects taxes. */
    @Enumerated(EnumType.STRING)
    @Column(name = "tax_currency", nullable = false, length = 3)
    private CurrencyCode taxCurrency;

    @Column(name = "standard_vat_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal standardVatRate;

    /** Reduced import VAT for collectors' items (HS 9705), e.g. DE 7%, PL 8%, NL 9%. */
    @Column(name = "collector_vat_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal collectorVatRate;

    /** Whether tax amounts are rounded to whole currency units (PL) or cents (DE/NL). */
    @Column(name = "round_to_whole_units", nullable = false)
    private boolean roundToWholeUnits;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_to")
    private LocalDate validTo;

    protected EuCountryTaxProfile() {
    }

    public EuCountryTaxProfile(String countryCode, CurrencyCode taxCurrency, BigDecimal standardVatRate,
                               BigDecimal collectorVatRate, boolean roundToWholeUnits) {
        this.countryCode = countryCode;
        this.taxCurrency = taxCurrency;
        this.standardVatRate = standardVatRate;
        this.collectorVatRate = collectorVatRate;
        this.roundToWholeUnits = roundToWholeUnits;
        this.validFrom = LocalDate.of(2000, 1, 1);
    }

    public String getCountryCode() { return countryCode; }
    public CurrencyCode getTaxCurrency() { return taxCurrency; }
    public BigDecimal getStandardVatRate() { return standardVatRate; }
    public BigDecimal getCollectorVatRate() { return collectorVatRate; }
    public boolean isRoundToWholeUnits() { return roundToWholeUnits; }
    public LocalDate getValidFrom() { return validFrom; }
    public LocalDate getValidTo() { return validTo; }
}
