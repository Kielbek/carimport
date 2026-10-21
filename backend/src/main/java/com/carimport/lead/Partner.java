package com.carimport.lead;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

/** Verified import company receiving leads for a commission (fixed fee per accepted lead or % of the deal). */
@Entity
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(name = "contact_email", nullable = false, length = 254)
    private String contactEmail;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "partner_destination", joinColumns = @JoinColumn(name = "partner_id"))
    @Column(name = "country_code", length = 2)
    private Set<String> destinationCountries;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "partner_origin", joinColumns = @JoinColumn(name = "partner_id"))
    @Column(name = "origin_country", length = 16)
    private Set<String> originCountries;

    @Column(name = "fee_per_lead", nullable = false, precision = 10, scale = 2)
    private BigDecimal feePerLead;

    @Column(nullable = false)
    private boolean verified;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "last_lead_at")
    private Instant lastLeadAt;

    protected Partner() {
    }

    public boolean serves(String destination, String origin) {
        return active && verified && destinationCountries.contains(destination) && originCountries.contains(origin);
    }

    public void leadAssigned(Instant now) {
        this.lastLeadAt = now;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getContactEmail() { return contactEmail; }
    public BigDecimal getFeePerLead() { return feePerLead; }
    public Instant getLastLeadAt() { return lastLeadAt; }
}
