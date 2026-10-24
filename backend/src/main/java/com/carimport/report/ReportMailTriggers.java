package com.carimport.report;

import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import java.time.Clock;
import java.time.Duration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/** Mails a report once it is stored, and retries deliveries that failed (mail server down, node restarted). */
@Component
public class ReportMailTriggers {

    private static final int MAX_ATTEMPTS = 6;

    private final ReportMailer mailer;
    private final ReportOrderRepository orders;
    private final Clock clock;

    public ReportMailTriggers(ReportMailer mailer, ReportOrderRepository orders, Clock clock) {
        this.mailer = mailer;
        this.orders = orders;
        this.clock = clock;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onReady(ReportReadyEvent event) {
        mailer.send(event.orderId());
    }

    @Scheduled(fixedDelayString = "PT5M", initialDelayString = "PT2M")
    public void retryUnsent() {
        if (!mailer.enabled()) {
            return;
        }
        orders.findTop50ByStatusAndEmailSentAtIsNullAndReadyAtBeforeAndEmailAttemptsLessThan(ReportOrder.Status.READY,
                        clock.instant().minus(Duration.ofMinutes(3)), MAX_ATTEMPTS)
                .forEach(o -> mailer.send(o.getId()));
    }
}
