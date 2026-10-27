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

    /** Taken off by a Stripe promotion code at checkout; the buyer paid amountMinor - discountMinor. */
    @Column(name = "discount_minor", nullable = false)
    private long discountMinor;

    /** Stripe id of the promotion code used (promo_...), if any. */
    @Column(name = "promotion_code", length = 64)
    private String promotionCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @Column(name = "access_token_hash", nullable = false, length = 64)
    private String accessTokenHash;

    @Column(name = "stripe_session_id", unique = true, length = 255)
    private String stripeSessionId;

    @Column(name = "stripe_payment_intent_id", length = 255)
    private String stripePaymentIntentId;

    /** Total refunded so far, in minor units, as Stripe reports it (0 = none). */
    @Column(name = "refunded_minor", nullable = false)
    private long refundedMinor;

    @Column(name = "refunded_at")
    private Instant refundedAt;

    @Column(name = "refund_reason", length = 200)
    private String refundReason;

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

    /** Hash of the token in the e-mailed link; the checkout token stays valid alongside it. */
    @Column(name = "email_token_hash", length = 64)
    private String emailTokenHash;

    @Column(name = "email_sent_at")
    private Instant emailSentAt;

    @Column(name = "email_attempts", nullable = false)
    private int emailAttempts;

    /** Consent to the terms and to delivery before the withdrawal period ends, with the terms version. */
    @Column(name = "terms_accepted_at")
    private Instant termsAcceptedAt;

    @Column(name = "terms_version", length = 20)
    private String termsVersion;

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
        return markPaid(paymentIntentId, 0, null, now);
    }

    /** As {@link #markPaid(String, Instant)}, recording a promotion-code discount. */
    public boolean markPaid(String paymentIntentId, long discountMinor, String promotionCode, Instant now) {
        if (status != Status.PENDING && status != Status.EXPIRED) {
            return false;
        }
        this.discountMinor = Math.max(0, Math.min(discountMinor, amountMinor));
        this.promotionCode = promotionCode;
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

    /**
     * Records the refunded total reported by Stripe. Idempotent: a total that is not higher than the recorded one
     * changes nothing (returns false). Refunding the whole price revokes access (status REFUNDED); a partial refund
     * - a goodwill gesture - keeps the report available.
     */
    public boolean recordRefund(long refundedTotalMinor, String reason, Instant now) {
        if (refundedTotalMinor <= refundedMinor) {
            return false;
        }
        refundedMinor = Math.min(refundedTotalMinor, paidMinor());
        refundedAt = now;
        if (reason != null && !reason.isBlank()) {
            refundReason = reason.length() > 200 ? reason.substring(0, 200) : reason;
        }
        if (refundedMinor >= paidMinor()) {
            status = Status.REFUNDED;
        }
        return true;
    }

    /** Paid and not refunded in full - what can still be refunded. */
    public long refundableMinor() {
        boolean paid = status == Status.PAID || status == Status.GENERATING || status == Status.READY
                || status == Status.FAILED;
        return paid && stripePaymentIntentId != null ? paidMinor() - refundedMinor : 0;
    }

    /** What the buyer actually paid: the price less any promotion-code discount. */
    public long paidMinor() {
        return amountMinor - discountMinor;
    }

    public void attachSession(String sessionId) {
        this.stripeSessionId = sessionId;
    }

    public void acceptTerms(String version, Instant now) {
        this.termsVersion = version;
        this.termsAcceptedAt = now;
    }

    /** Either the token from the checkout redirect or the one from the e-mail. */
    public boolean acceptsToken(String token) {
        return AccessTokens.matches(token, accessTokenHash)
                || (emailTokenHash != null && AccessTokens.matches(token, emailTokenHash));
    }

    /** Called before each delivery attempt; returns the plain token for the link (a new one each attempt). */
    public String issueEmailToken() {
        String token = AccessTokens.generate();
        emailTokenHash = AccessTokens.hash(token);
        emailAttempts++;
        return token;
    }

    public void markEmailSent(Instant now) {
        emailSentAt = now;
    }

    public boolean isUnlocked() {
        return status == Status.PAID || status == Status.GENERATING || status == Status.READY
                || status == Status.FAILED;
    }

    public Instant getEmailSentAt() { return emailSentAt; }
    public Instant getTermsAcceptedAt() { return termsAcceptedAt; }
    public String getTermsVersion() { return termsVersion; }
    public int getEmailAttempts() { return emailAttempts; }
    public UUID getId() { return id; }
    public UUID getQuoteId() { return quoteId; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getLocale() { return locale; }
    public Status getStatus() { return status; }
    public long getAmountMinor() { return amountMinor; }
    public long getDiscountMinor() { return discountMinor; }
    public String getPromotionCode() { return promotionCode; }
    public CurrencyCode getCurrency() { return currency; }
    public String getAccessTokenHash() { return accessTokenHash; }
    public String getStripeSessionId() { return stripeSessionId; }
    public String getPdfStorageKey() { return pdfStorageKey; }
    public int getGenerationAttempts() { return generationAttempts; }
    public Instant getPaidAt() { return paidAt; }
    public Instant getReadyAt() { return readyAt; }
    public Instant getCreatedAt() { return createdAt; }
    public String getStripePaymentIntentId() { return stripePaymentIntentId; }
    public long getRefundedMinor() { return refundedMinor; }
    public Instant getRefundedAt() { return refundedAt; }
    public String getRefundReason() { return refundReason; }

    /** Admin "send again": the next delivery goes out as if it were the first (fresh link, attempts reset). */
    public void resetEmailDelivery() {
        emailSentAt = null;
        emailAttempts = 0;
    }

    /** Short order number shown to the buyer (e-mail, Stripe receipt, admin panel). */
    public String getNumber() { return id.toString().substring(0, 8).toUpperCase(); }
}
