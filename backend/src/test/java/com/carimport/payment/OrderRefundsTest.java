package com.carimport.payment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.carimport.domain.CurrencyCode;
import com.stripe.model.Refund;
import com.stripe.param.RefundCreateParams;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class OrderRefundsTest {

    private static final Instant NOW = Instant.parse("2026-10-26T10:00:00Z");

    private final ReportOrderRepository orders = mock(ReportOrderRepository.class);
    private final StripeSessions stripe = mock(StripeSessions.class);
    private final List<Object> events = new ArrayList<>();
    private final OrderRefunds refunds = new OrderRefunds(orders, stripe, events::add, Clock.fixed(NOW, ZoneOffset.UTC));
    private ReportOrder order;

    @BeforeEach
    void paidOrder() throws Exception {
        order = new ReportOrder(UUID.randomUUID(), "jan@example.com", "Jan", "pl", 1900, CurrencyCode.PLN, "h", NOW);
        order.markPaid("pi_1", NOW);
        order.markGenerating();
        order.markReady("reports/x.pdf", NOW);
        when(orders.findById(order.getId())).thenReturn(Optional.of(order));
        Refund refund = new Refund();
        refund.setStatus("succeeded");
        when(stripe.refund(any(), anyString())).thenReturn(refund);
    }

    @Test
    void fullRefundGoesThroughStripeRevokesAccessAndIsAnnouncedOnce() throws Exception {
        refunds.refund(order.getId(), null, "requested_by_customer", "wrong car");

        ArgumentCaptor<RefundCreateParams> params = ArgumentCaptor.forClass(RefundCreateParams.class);
        ArgumentCaptor<String> key = ArgumentCaptor.forClass(String.class);
        verify(stripe).refund(params.capture(), key.capture());
        assertThat(params.getValue().getPaymentIntent()).isEqualTo("pi_1");
        assertThat(params.getValue().getAmount()).isEqualTo(1900L);
        assertThat(key.getValue()).isEqualTo("refund-" + order.getId() + "-1900");

        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.REFUNDED);
        assertThat(order.isUnlocked()).isFalse();
        assertThat(order.getRefundReason()).isEqualTo("requested_by_customer: wrong car");
        assertThat(events).containsExactly(new OrderRefundedEvent(order.getId(), 1900, true));

        refunds.apply(order, 1900, "stripe");   // the webhook for the same refund arrives later
        assertThat(events).hasSize(1);
        assertThatThrownBy(() -> refunds.refund(order.getId(), null, null, null)).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void partialRefundKeepsTheReportAndADashboardRefundTopsItUp() throws Exception {
        refunds.refund(order.getId(), 900L, "requested_by_customer", null);
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.READY);
        assertThat(order.isUnlocked()).isTrue();
        assertThat(order.refundableMinor()).isEqualTo(1000);

        refunds.apply(order, 1900, "stripe");   // the rest refunded in the Stripe dashboard
        assertThat(order.getStatus()).isEqualTo(ReportOrder.Status.REFUNDED);
        assertThat(events).containsExactly(new OrderRefundedEvent(order.getId(), 900, false),
                new OrderRefundedEvent(order.getId(), 1000, true));
    }

    @Test
    void amountsBeyondWhatWasPaidAndUnpaidOrdersAreRejected() throws Exception {
        assertThatThrownBy(() -> refunds.refund(order.getId(), 2000L, null, null)).isInstanceOf(IllegalArgumentException.class);
        ReportOrder unpaid = new ReportOrder(UUID.randomUUID(), "a@b.c", "A", "en", 499, CurrencyCode.EUR, "h", NOW);
        when(orders.findById(unpaid.getId())).thenReturn(Optional.of(unpaid));
        assertThatThrownBy(() -> refunds.refund(unpaid.getId(), null, null, null)).isInstanceOf(IllegalArgumentException.class);
        verify(stripe, never()).refund(any(), anyString());
    }
}
