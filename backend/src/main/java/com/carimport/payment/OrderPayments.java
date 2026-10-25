package com.carimport.payment;

import com.stripe.model.checkout.Session;
import java.time.Clock;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

/**
 * Unlocks an order from a paid Checkout Session - shared by the webhook and the confirmation on the return from
 * Stripe, whichever comes first; the second is a no-op. The charged amount and currency must equal the order's.
 */
@Component
public class OrderPayments {

    private static final Logger log = LoggerFactory.getLogger(OrderPayments.class);

    private final ReportOrderRepository orders;
    private final ApplicationEventPublisher events;
    private final Clock clock;

    public OrderPayments(ReportOrderRepository orders, ApplicationEventPublisher events, Clock clock) {
        this.orders = orders;
        this.events = events;
        this.clock = clock;
    }

    /** Call inside a transaction. */
    public void markPaid(Session session) {
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
            log.info("Order {} paid: {} {} (session {})", orderId, session.getAmountTotal(), session.getCurrency(),
                    session.getId());
            events.publishEvent(new ReportOrderPaidEvent(order.getId()));
        }
    }
}
