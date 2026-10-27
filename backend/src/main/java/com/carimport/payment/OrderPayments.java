package com.carimport.payment;

import com.carimport.ops.OpsAlert;
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

    /** Paid, or nothing to pay because a promotion code covered the whole price. */
    public static boolean settled(Session session) {
        return "paid".equals(session.getPaymentStatus()) || "no_payment_required".equals(session.getPaymentStatus());
    }

    /** Call inside a transaction. */
    public void markPaid(Session session) {
        UUID orderId = UUID.fromString(session.getClientReferenceId());
        ReportOrder order = orders.findById(orderId)
                .orElseThrow(() -> new IllegalStateException("Unknown order " + orderId));
        // a promotion code lowers amount_total; together with the discount it must still make up the price
        long discount = session.getTotalDetails() == null || session.getTotalDetails().getAmountDiscount() == null
                ? 0 : session.getTotalDetails().getAmountDiscount();
        boolean amountOk = session.getAmountTotal() != null && discount >= 0
                && session.getAmountTotal() + discount == order.getAmountMinor();
        boolean currencyOk = order.getCurrency().name().equalsIgnoreCase(session.getCurrency());
        if (!amountOk || !currencyOk) {
            log.error("Order {} paid {} {} but expected {} {} - not unlocking", orderId, session.getAmountTotal(),
                    session.getCurrency(), order.getAmountMinor(), order.getCurrency());
            events.publishEvent(new OpsAlert("amount:" + orderId, "Payment amount mismatch for order " + order.getNumber(),
                    "Stripe session " + session.getId() + " paid " + session.getAmountTotal() + " " + session.getCurrency()
                            + ", the order expects " + order.getAmountMinor() + " " + order.getCurrency()
                            + ". The report was NOT unlocked. Check the session in the Stripe dashboard."));
            return;
        }
        String promotionCode = session.getDiscounts() == null ? null : session.getDiscounts().stream()
                .map(Session.Discount::getPromotionCode).filter(java.util.Objects::nonNull).findFirst().orElse(null);
        if (order.markPaid(session.getPaymentIntent(), discount, promotionCode, clock.instant())) {
            log.info("Order {} paid: {} {} (session {}{})", orderId, session.getAmountTotal(), session.getCurrency(),
                    session.getId(), discount > 0 ? ", discount " + discount + " with " + promotionCode : "");
            events.publishEvent(new ReportOrderPaidEvent(order.getId()));
        }
    }
}
