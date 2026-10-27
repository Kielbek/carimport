package com.carimport.payment;

import com.stripe.exception.StripeException;
import com.stripe.model.Refund;
import com.stripe.param.RefundCreateParams;
import java.time.Clock;
import java.util.Set;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Refunds: started from the admin panel (through the Stripe API) or made directly in the Stripe dashboard (reported by
 * the charge.refunded webhook). Both paths record the refunded total Stripe reports, so a refund is counted - and the
 * buyer e-mailed - once, whichever arrives first.
 */
@Service
public class OrderRefunds {

    private static final Logger log = LoggerFactory.getLogger(OrderRefunds.class);
    /** Stripe's refund reasons. */
    public static final Set<String> REASONS = Set.of("requested_by_customer", "duplicate", "fraudulent");

    private final ReportOrderRepository orders;
    private final StripeSessions stripe;
    private final ApplicationEventPublisher events;
    private final Clock clock;

    public OrderRefunds(ReportOrderRepository orders, StripeSessions stripe, ApplicationEventPublisher events, Clock clock) {
        this.orders = orders;
        this.stripe = stripe;
        this.events = events;
        this.clock = clock;
    }

    /**
     * Refunds {@code amountMinor} (null = everything still refundable) through Stripe and records it.
     *
     * @throws IllegalArgumentException nothing to refund, or the amount is out of range
     */
    @Transactional
    public ReportOrder refund(UUID orderId, Long amountMinor, String reason, String note) throws StripeException {
        ReportOrder order = orders.findById(orderId).orElseThrow();
        long refundable = order.refundableMinor();
        long amount = amountMinor == null ? refundable : amountMinor;
        if (refundable <= 0 || amount <= 0 || amount > refundable) {
            throw new IllegalArgumentException("Nothing to refund or amount out of range (refundable " + refundable + ")");
        }
        String stripeReason = REASONS.contains(reason) ? reason : "requested_by_customer";
        long newTotal = order.getRefundedMinor() + amount;
        Refund refund = stripe.refund(RefundCreateParams.builder()
                .setPaymentIntent(order.getStripePaymentIntentId())
                .setAmount(amount)
                .setReason(RefundCreateParams.Reason.valueOf(stripeReason.toUpperCase()))
                .putMetadata("orderId", orderId.toString())
                .build(), "refund-" + orderId + "-" + newTotal);
        log.info("Order {} refund {} {} requested ({}): {}", orderId, amount, order.getCurrency(), stripeReason, refund.getStatus());
        apply(order, newTotal, note == null || note.isBlank() ? stripeReason : stripeReason + ": " + note);
        return order;
    }

    /** Records the refunded total Stripe reports; idempotent. Call inside a transaction. */
    public void apply(ReportOrder order, long refundedTotalMinor, String reason) {
        long before = order.getRefundedMinor();
        if (order.recordRefund(refundedTotalMinor, reason, clock.instant())) {
            boolean full = order.getRefundedMinor() >= order.paidMinor();
            log.info("Order {} refunded {} of {} {} ({})", order.getId(), order.getRefundedMinor(), order.paidMinor(),
                    order.getCurrency(), full ? "full, access revoked" : "partial, access kept");
            events.publishEvent(new OrderRefundedEvent(order.getId(), order.getRefundedMinor() - before, full));
        }
    }
}
