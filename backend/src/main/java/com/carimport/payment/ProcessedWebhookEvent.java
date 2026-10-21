package com.carimport.payment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

/** Stripe delivers at-least-once; the primary key on the event id makes processing idempotent. */
@Entity
@Table(name = "processed_webhook_event")
public class ProcessedWebhookEvent {

    @Id
    @Column(length = 255)
    private String id;

    @Column(nullable = false, length = 64)
    private String type;

    @Column(name = "processed_at", nullable = false)
    private Instant processedAt;

    protected ProcessedWebhookEvent() {
    }

    public ProcessedWebhookEvent(String id, String type, Instant processedAt) {
        this.id = id;
        this.type = type;
        this.processedAt = processedAt;
    }
}
