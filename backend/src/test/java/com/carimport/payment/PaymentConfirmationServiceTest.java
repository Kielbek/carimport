package com.carimport.payment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.carimport.domain.CurrencyCode;
import com.stripe.exception.ApiConnectionException;
import com.stripe.model.checkout.Session;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEventPublisher;

class PaymentConfirmationServiceTest {

    private static final Instant NOW = Instant.parse("2026-10-25T10:00:00Z");

    private final ReportOrderRepository orders = mock(ReportOrderRepository.class);
    private final StripeSessions sessions = mock(StripeSessions.class);
    private final ApplicationEventPublisher events = mock(ApplicationEventPublisher.class);
    private final PaymentConfirmationService service = new PaymentConfirmationService(orders, sessions,
            new OrderPayments(orders, events, Clock.fixed(NOW, ZoneOffset.UTC)));
    private ReportOrder order;

    @BeforeEach
    void setUp() {
        order = new ReportOrder(UUID.randomUUID(), "jan@example.com", "Jan", "pl", 1900, CurrencyCode.PLN,
                AccessTokens.hash("t"), NOW);
        order.attachSession("cs_test_1");
        when(orders.findById(order.getId())).thenReturn(Optional.of(order));
    }

    private Session session(String paymentStatus, long amount, String currency) {
        Session s = new Session();
        s.setId("cs_test_1");
        s.setClientReferenceId(order.getId().toString());
        s.setPaymentStatus(paymentStatus);
        s.setStatus("complete");
        s.setAmountTotal(amount);
        s.setCurrency(currency);
        s.setPaymentIntent("pi_1");
        return s;
    }

    @Test
    void paidSessionUnlocksTheOrderWithoutWaitingForTheWebhook() throws Exception {
        when(sessions.retrieve("cs_test_1")).thenReturn(session("paid", 1900, "pln"));

        service.confirm(order.getId(), "cs_test_1");

        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PAID);
        verify(events).publishEvent(new ReportOrderPaidEvent(order.getId()));
    }

    @Test
    void foreignSessionOrWrongAmountNeverUnlocks() throws Exception {
        service.confirm(order.getId(), "cs_someone_else");
        verify(sessions, never()).retrieve(any());

        when(sessions.retrieve("cs_test_1")).thenReturn(session("paid", 100, "pln"));
        service.confirm(order.getId(), "cs_test_1");
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PENDING);
    }

    @Test
    void unpaidOrUnreachableStripeLeavesTheOrderPendingForTheWebhook() throws Exception {
        when(sessions.retrieve("cs_test_1")).thenReturn(session("unpaid", 1900, "pln"));
        service.confirm(order.getId(), "cs_test_1");
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PENDING);

        when(sessions.retrieve("cs_test_1")).thenThrow(new ApiConnectionException("down"));
        service.confirm(order.getId(), "cs_test_1");
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PENDING);
        verify(events, never()).publishEvent(any());
    }

    @Test
    void secondConfirmationAfterTheWebhookIsANoOp() throws Exception {
        order.markPaid("pi_1", NOW);
        service.confirm(order.getId(), "cs_test_1");
        verify(sessions, never()).retrieve(any());
    }

    private Session discounted(String paymentStatus, long paid, long discount) {
        Session s = session(paymentStatus, paid, "pln");
        Session.TotalDetails totals = new Session.TotalDetails();
        totals.setAmountDiscount(discount);
        s.setTotalDetails(totals);
        Session.Discount d = new Session.Discount();
        d.setPromotionCode("promo_FORUM20");
        s.setDiscounts(java.util.List.of(d));
        return s;
    }

    @Test
    void promotionCodeDiscountStillUnlocksAndIsRecorded() throws Exception {
        when(sessions.retrieve("cs_test_1")).thenReturn(discounted("paid", 1520, 380));

        service.confirm(order.getId(), "cs_test_1");

        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PAID);
        assertThat(order.getDiscountMinor()).isEqualTo(380);
        assertThat(order.paidMinor()).isEqualTo(1520);
        assertThat(order.getPromotionCode()).isEqualTo("promo_FORUM20");
        assertThat(order.refundableMinor()).isEqualTo(1520);
    }

    @Test
    void freeOrderFromAFullDiscountUnlocksButAMismatchDoesNot() throws Exception {
        when(sessions.retrieve("cs_test_1")).thenReturn(discounted("paid", 1000, 380));
        service.confirm(order.getId(), "cs_test_1");
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PENDING);

        when(sessions.retrieve("cs_test_1")).thenReturn(discounted("no_payment_required", 0, 1900));
        service.confirm(order.getId(), "cs_test_1");
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.PAID);
        assertThat(order.paidMinor()).isZero();
    }
}
