package com.carimport.payment;

import com.carimport.domain.CurrencyCode;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

/**
 * Purchase of the paid PDF report. There are no user accounts in the funnel: the buyer gets an unguessable access token
 * (only its SHA-256 hash is stored) that authorises status polling and the download.
 */
@Entity
@Table(name = "report_order")
public class ReportOrder {

    public enum Status { PENDING, PAID, GENERATING, READY, FAILED, EXPIRED, REFUNDED }

    @Id
    private UUID id;

    @Column(name = "quote_id", nullable = false)
    private UUID quoteId;

    @Column(nullable = false, length = 254)
    private String email;

    /** Printed on the report ("Raport imienny"). */
    @Column(name = "full_name", nullable = false, length = 120)
    private String fullName;

    @Column(nullable = false, length = 5)
    private String locale;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Status status = Status.PENDING;

    /** Price in minor units, fixed server-side; the webhook verifies Stripe charged exactly this. */
    @Column(name = "amount_minor", nullable = false)
    private long amountMinor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @Column(name = "access_token_hash", nullable = false, length = 64)
    private String accessTokenHash;

    @Column(name = "stripe_session_id", unique = true, length = 255)
    private String stripeSessionId;

    @Column(name = "stripe_payment_intent_id", length = 255)
    private String stripePaymentIntentId;

    @Column(name = "pdf_storage_key", length = 255)
    private String pdfStorageKey;

    @Column(name = "generation_attempts", nullable = false)
    private int generationAttempts;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "paid_at")
    private Instant paidAt;

    @Column(name = "ready_at")
    private Instant readyAt;

    @Version
    private long version;

    protected ReportOrder() {
    }

    public ReportOrder(UUID quoteId, String email, String fullName, String locale, long amountMinor,
                       CurrencyCode currency, String accessTokenHash, Instant now) {
        this.id = UUID.randomUUID();
        this.quoteId = quoteId;
        this.email = email;
        this.fullName = fullName;
        this.locale = locale;
        this.amountMinor = amountMinor;
        this.currency = currency;
        this.accessTokenHash = accessTokenHash;
        this.createdAt = now;
    }

    /** Idempotent: returns false when the order was already paid (duplicate or out-of-order webhook). */
    public boolean markPaid(String paymentIntentId, Instant now) {
        if (status != Status.PENDING && status != Status.EXPIRED) {
            return false;
        }
        status = Status.PAID;
        stripePaymentIntentId = paymentIntentId;
        paidAt = now;
        return true;
    }

    public void markGenerating() {
        status = Status.GENERATING;
        generationAttempts++;
    }

    public void markReady(String storageKey, Instant now) {
        status = Status.READY;
        pdfStorageKey = storageKey;
        readyAt = now;
    }

    public void markFailed() {
        status = Status.FAILED;
    }

    public void markExpired() {
        if (status == Status.PENDING) {
            status = Status.EXPIRED;
        }
    }

    public void markRefunded() {
        status = Status.REFUNDED;
    }

    public void attachSession(String sessionId) {
        this.stripeSessionId = sessionId;
    }

    public boolean isUnlocked() {
        return status == Status.PAID || status == Status.GENERATING || status == Status.READY
                || status == Status.FAILED;
    }

    public UUID getId() { return id; }
    public UUID getQuoteId() { return quoteId; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getLocale() { return locale; }
    public Status getStatus() { return status; }
    public long getAmountMinor() { return amountMinor; }
    public CurrencyCode getCurrency() { return currency; }
    public String getAccessTokenHash() { return accessTokenHash; }
    public String getStripeSessionId() { return stripeSessionId; }
    public String getPdfStorageKey() { return pdfStorageKey; }
    public int getGenerationAttempts() { return generationAttempts; }
    public Instant getPaidAt() { return paidAt; }
}
