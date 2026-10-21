package com.carimport.lead;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "lead")
public class Lead {

    public enum Status { NEW, ROUTED, ACCEPTED, REJECTED, WON, LOST }

    @Id
    private UUID id;

    @Column(name = "quote_id")
    private UUID quoteId;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 254)
    private String email;

    @Column(length = 32)
    private String phone;

    @Column(name = "destination_country", nullable = false, length = 2)
    private String destinationCountry;

    @Column(name = "origin_country", nullable = false, length = 16)
    private String originCountry;

    @Column(length = 2000)
    private String message;

    @Column(nullable = false, length = 5)
    private String locale;

    /** GDPR: explicit consent to pass the data to the partner is mandatory; marketing consent is separate. */
    @Column(name = "consent_data_transfer", nullable = false)
    private boolean consentDataTransfer;

    @Column(name = "consent_marketing", nullable = false)
    private boolean consentMarketing;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Status status = Status.NEW;

    @Column(name = "partner_id")
    private Long partnerId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected Lead() {
    }

    public Lead(UUID quoteId, String name, String email, String phone, String destinationCountry,
                String originCountry, String message, String locale, boolean consentDataTransfer,
                boolean consentMarketing, Instant now) {
        this.id = UUID.randomUUID();
        this.quoteId = quoteId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.destinationCountry = destinationCountry;
        this.originCountry = originCountry;
        this.message = message;
        this.locale = locale;
        this.consentDataTransfer = consentDataTransfer;
        this.consentMarketing = consentMarketing;
        this.createdAt = now;
    }

    public void routeTo(Partner partner) {
        this.partnerId = partner.getId();
        this.status = Status.ROUTED;
    }

    public UUID getId() { return id; }
    public String getDestinationCountry() { return destinationCountry; }
    public String getOriginCountry() { return originCountry; }
    public Status getStatus() { return status; }
}
