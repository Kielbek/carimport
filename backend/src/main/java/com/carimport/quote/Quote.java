package com.carimport.quote;

import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CalculationResult;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Frozen calculation. The exact EXPECTED result (with the FX snapshot it used) is stored as JSON so that the PDF bought
 * an hour later shows exactly the numbers that sat behind the free range - even if rates or tariffs changed meanwhile.
 */
@Entity
@Table(name = "quote")
public class Quote {

    @Id
    private UUID id;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(nullable = false, length = 5)
    private String locale;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "request_json", nullable = false)
    private CalculationRequest request;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "result_json", nullable = false)
    private CalculationResult result;

    @Column(name = "range_min", nullable = false, precision = 14, scale = 2)
    private BigDecimal rangeMin;

    @Column(name = "range_max", nullable = false, precision = 14, scale = 2)
    private BigDecimal rangeMax;

    protected Quote() {
    }

    public Quote(CalculationRequest request, CalculationResult result, BigDecimal rangeMin, BigDecimal rangeMax,
                 String locale, Instant now, Instant expiresAt) {
        this.id = UUID.randomUUID();
        this.request = request;
        this.result = result;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.locale = locale;
        this.createdAt = now;
        this.expiresAt = expiresAt;
    }

    public boolean isExpired(Instant now) {
        return now.isAfter(expiresAt);
    }

    public UUID getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getExpiresAt() { return expiresAt; }
    public String getLocale() { return locale; }
    public CalculationRequest getRequest() { return request; }
    public CalculationResult getResult() { return result; }
    public BigDecimal getRangeMin() { return rangeMin; }
    public BigDecimal getRangeMax() { return rangeMax; }
}
