package com.carimport.payment;

import com.carimport.config.AppProperties;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Charge;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import java.time.Clock;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Verifies and applies Stripe webhooks. Guarantees:
 * <ul>
 *   <li>authenticity - HMAC signature + timestamp tolerance via {@link Webhook#constructEvent};</li>
 *   <li>idempotency - each event id is recorded once, order transitions are guarded;</li>
 *   <li>integrity - amount and currency charged must equal the server-side order price;</li>
 *   <li>decoupling - PDF generation starts from an after-commit event, never inside the webhook request.</li>
 * </ul>
 */
@Service
public class StripeWebhookService {

    private static final Logger log = LoggerFactory.getLogger(StripeWebhookService.class);

    private final AppProperties props;
    private final ReportOrderRepository orders;
    private final ProcessedWebhookEventRepository processed;
    private final ApplicationEventPublisher events;
    private final Clock clock;

    public StripeWebhookService(AppProperties props, ReportOrderRepository orders,
                                ProcessedWebhookEventRepository processed, ApplicationEventPublisher events,
                                Clock clock) {
        this.props = props;
        this.orders = orders;
        this.processed = processed;
        this.events = events;
        this.clock = clock;
    }

    public Event verify(String payload, String signatureHeader) throws SignatureVerificationException {
        return Webhook.constructEvent(payload, signatureHeader, props.stripe().webhookSecret());
    }

    @Transactional
    public void handle(Event event) {
        if (processed.existsById(event.getId())) {
            log.debug("Duplicate Stripe event {} ignored", event.getId());
            return;
        }
        processed.save(new ProcessedWebhookEvent(event.getId(), event.getType(), clock.instant()));

        switch (event.getType()) {
            case "checkout.session.completed" -> session(event).ifPresent(s -> {
                // card and BLIK are paid at this point; P24 may still be "unpaid" and settle asynchronously
                if ("paid".equals(s.getPaymentStatus())) {
                    markPaid(s);
                }
            });
            case "checkout.session.async_payment_succeeded" -> session(event).ifPresent(this::markPaid);
            case "checkout.session.async_payment_failed", "checkout.session.expired" -> session(event)
                    .flatMap(s -> orders.findByStripeSessionId(s.getId()))
                    .ifPresent(ReportOrder::markExpired);
            case "charge.refunded" -> object(event, Charge.class)
                    .flatMap(c -> orders.findByStripePaymentIntentId(c.getPaymentIntent()))
                    .ifPresent(ReportOrder::markRefunded);
            default -> log.debug("Unhandled Stripe event type {}", event.getType());
        }
    }

    private void markPaid(Session session) {
        UUID orderId = UUID.fromString(session.getClientReferenceId());
        ReportOrder order = orders.findById(orderId)
                .orElseThrow(() -> new IllegalStateException("Unknown order " + orderId));
        boolean amountOk = session.getAmountTotal() != null && session.getAmountTotal() == order.getAmountMinor();
        boolean currencyOk = order.getCurrency().name().equalsIgnoreCase(session.getCurrency());
        if (!amountOk || !currencyOk) {
            log.error("Order {} paid {} {} but expected {} {} - not unlocking", orderId, session.getAmountTotal(),
                    session.getCurrency(), order.getAmountMinor(), order.getCurrency());
            return;
        }
        if (order.markPaid(session.getPaymentIntent(), clock.instant())) {
            events.publishEvent(new ReportOrderPaidEvent(order.getId()));
        }
    }

    private static Optional<Session> session(Event event) {
        return object(event, Session.class);
    }

    /** Falls back to unsafe deserialization when the event's API version differs from the library's pinned one. */
    private static <T extends StripeObject> Optional<T> object(Event event, Class<T> type) {
        var deserializer = event.getDataObjectDeserializer();
        StripeObject obj = deserializer.getObject().orElseGet(() -> {
            try {
                return deserializer.deserializeUnsafe();
            } catch (Exception e) {
                log.warn("Cannot deserialize Stripe event {}", event.getId(), e);
                return null;
            }
        });
        return type.isInstance(obj) ? Optional.of(type.cast(obj)) : Optional.empty();
    }
}
