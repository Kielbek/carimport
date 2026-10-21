package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

/** Daily mid rate of a currency in PLN (NBP table A/B), with ECB as fallback source. */
@Entity
@Table(name = "exchange_rate",
        uniqueConstraints = @UniqueConstraint(columnNames = {"currency", "effective_date", "source"}))
public class ExchangeRate {

    public enum Source { NBP_A, NBP_B, ECB, DERIVED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @Column(name = "pln_per_unit", nullable = false, precision = 18, scale = 8)
    private BigDecimal plnPerUnit;

    @Column(name = "effective_date", nullable = false)
    private LocalDate effectiveDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 8)
    private Source source;

    /** NBP table number, e.g. "203/A/NBP/2026" - printed in the PDF as the legal FX reference. */
    @Column(name = "table_no", length = 32)
    private String tableNo;

    @Column(name = "fetched_at", nullable = false)
    private Instant fetchedAt = Instant.now();

    protected ExchangeRate() {
    }

    public ExchangeRate(CurrencyCode currency, BigDecimal plnPerUnit, LocalDate effectiveDate, Source source,
                        String tableNo) {
        this.currency = currency;
        this.plnPerUnit = plnPerUnit;
        this.effectiveDate = effectiveDate;
        this.source = source;
        this.tableNo = tableNo;
    }

    public CurrencyCode getCurrency() { return currency; }
    public BigDecimal getPlnPerUnit() { return plnPerUnit; }
    public LocalDate getEffectiveDate() { return effectiveDate; }
    public Source getSource() { return source; }
    public String getTableNo() { return tableNo; }
}
