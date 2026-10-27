package com.carimport.payment;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Confirms a payment when the buyer comes back from Stripe, by asking Stripe for the Checkout Session - so the report
 * does not wait for the webhook (late, retried, or not configured). The redirect itself proves nothing: only a session
 * that belongs to this order and that Stripe reports as paid unlocks it.
 */
@Service
public class PaymentConfirmationService {

    private static final Logger log = LoggerFactory.getLogger(PaymentConfirmationService.class);

    private final ReportOrderRepository orders;
    private final StripeSessions sessions;
    private final OrderPayments payments;

    public PaymentConfirmationService(ReportOrderRepository orders, StripeSessions sessions, OrderPayments payments) {
        this.orders = orders;
        this.sessions = sessions;
        this.payments = payments;
    }

    @Transactional
    public void confirm(UUID orderId, String sessionId) {
        ReportOrder order = orders.findById(orderId).orElseThrow();
        if (order.isUnlocked() || sessionId == null || !sessionId.equals(order.getStripeSessionId())) {
            return;
        }
        Session session;
        try {
            session = sessions.retrieve(sessionId);
        } catch (StripeException e) {
            log.warn("Stripe session {} of order {} could not be read: {}", sessionId, orderId, e.getMessage());
            return; // the webhook or the next poll will settle it
        }
        if (!orderId.toString().equals(session.getClientReferenceId())) {
            log.error("Session {} does not belong to order {}", sessionId, orderId);
            return;
        }
        if (OrderPayments.settled(session)) {
            payments.markPaid(session);
        } else if ("expired".equals(session.getStatus())) {
            order.markExpired();
        }
        // "unpaid" with status "complete": a delayed method (e.g. bank transfer) - the webhook will finish it
    }
}
