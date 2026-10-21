package com.carimport.report;

import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderPaidEvent;
import com.carimport.payment.ReportOrderRepository;
import java.time.Clock;
import java.time.Duration;
import java.util.EnumSet;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * Starts PDF generation after a payment commits. Async + after-commit means the webhook answers Stripe in milliseconds
 * and a rendering error can never roll back the "paid" state. The sweeper retries orders that got stuck because the
 * node died between commit and rendering (a lightweight transactional-outbox substitute).
 */
@Component
public class ReportGenerationTriggers {

    private static final int MAX_ATTEMPTS = 5;

    private final ReportGenerationService generator;
    private final ReportOrderRepository orders;
    private final Clock clock;

    public ReportGenerationTriggers(ReportGenerationService generator, ReportOrderRepository orders, Clock clock) {
        this.generator = generator;
        this.orders = orders;
        this.clock = clock;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onPaid(ReportOrderPaidEvent event) {
        generator.generate(event.orderId());
    }

    @Scheduled(fixedDelayString = "PT2M", initialDelayString = "PT1M")
    public void retryStuck() {
        orders.findTop50ByStatusInAndPaidAtBeforeAndGenerationAttemptsLessThan(
                        EnumSet.of(ReportOrder.Status.PAID, ReportOrder.Status.GENERATING, ReportOrder.Status.FAILED),
                        clock.instant().minus(Duration.ofMinutes(2)), MAX_ATTEMPTS)
                .forEach(o -> generator.generate(o.getId()));
    }
}
