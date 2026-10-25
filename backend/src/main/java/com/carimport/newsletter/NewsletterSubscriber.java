package com.carimport.newsletter;

import com.carimport.payment.AccessTokens;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

/** One address on the newsletter list; see V8__newsletter.sql for the consent model. */
@Entity
@Table(name = "newsletter_subscriber")
public class NewsletterSubscriber {

    public enum Status { PENDING, CONFIRMED, UNSUBSCRIBED }

    @Id
    private UUID id;

    @Column(nullable = false, length = 254)
    private String email;

    @Column(nullable = false, length = 5)
    private String locale;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Status status;

    @Column(length = 32)
    private String source;

    @Column(name = "consent_version", nullable = false, length = 20)
    private String consentVersion;

    @Column(name = "confirm_token_hash", length = 64)
    private String confirmTokenHash;

    @Column(name = "unsubscribe_token", nullable = false, length = 64)
    private String unsubscribeToken;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "confirm_sent_at")
    private Instant confirmSentAt;

    @Column(name = "confirmed_at")
    private Instant confirmedAt;

    @Column(name = "unsubscribed_at")
    private Instant unsubscribedAt;

    protected NewsletterSubscriber() {
    }

    public NewsletterSubscriber(String email, String locale, String source, String consentVersion, Instant now) {
        this.id = UUID.randomUUID();
        this.email = email;
        this.locale = locale;
        this.source = source;
        this.consentVersion = consentVersion;
        this.status = Status.PENDING;
        this.unsubscribeToken = AccessTokens.generate();
        this.createdAt = now;
    }

    /**
     * A sign-up for an address that is pending or unsubscribed starts a new confirmation (the latest form's language,
     * source and consent text win). Returns the plain token for the link; only its hash is kept.
     */
    public String startConfirmation(String locale, String source, String consentVersion, Instant now) {
        this.locale = locale;
        this.source = source;
        this.consentVersion = consentVersion;
        this.status = Status.PENDING;
        this.confirmSentAt = now;
        String token = AccessTokens.generate();
        this.confirmTokenHash = AccessTokens.hash(token);
        return token;
    }

    public void confirm(Instant now) {
        status = Status.CONFIRMED;
        confirmedAt = now;
        confirmTokenHash = null;   // the link works once
        unsubscribedAt = null;
    }

    public void unsubscribe(Instant now) {
        status = Status.UNSUBSCRIBED;
        unsubscribedAt = now;
        confirmTokenHash = null;
    }

    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public String getLocale() { return locale; }
    public Status getStatus() { return status; }
    public String getUnsubscribeToken() { return unsubscribeToken; }
    public Instant getConfirmSentAt() { return confirmSentAt; }
}
