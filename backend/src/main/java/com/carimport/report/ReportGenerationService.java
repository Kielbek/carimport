package com.carimport.report;

import com.carimport.ops.OpsAlert;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.quote.QuoteRepository;
import java.time.Clock;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/** Renders, stores and marks a paid order's PDF. Invoked through {@link ReportGenerationTriggers}. */
@Service
public class ReportGenerationService {

    private static final Logger log = LoggerFactory.getLogger(ReportGenerationService.class);

    private final ReportOrderRepository orders;
    private final QuoteRepository quotes;
    private final PdfReportRenderer renderer;
    private final ReportStorage storage;
    private final Clock clock;
    private final ApplicationEventPublisher events;

    public ReportGenerationService(ReportOrderRepository orders, QuoteRepository quotes, PdfReportRenderer renderer,
                                   ReportStorage storage, Clock clock, ApplicationEventPublisher events) {
        this.events = events;
        this.orders = orders;
        this.quotes = quotes;
        this.renderer = renderer;
        this.storage = storage;
        this.clock = clock;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void generate(UUID orderId) {
        ReportOrder order = orders.findById(orderId).orElseThrow();
        if (!order.isUnlocked() || order.getStatus() == ReportOrder.Status.READY) {
            return;
        }
        order.markGenerating();
        try {
            var quote = quotes.findById(order.getQuoteId()).orElseThrow();
            byte[] pdf = renderer.render(order, quote);
            String key = storage.store("reports/" + order.getPaidAt().toString().substring(0, 7) + "/"
                    + order.getId() + ".pdf", pdf);
            order.markReady(key, clock.instant());
            events.publishEvent(new ReportReadyEvent(order.getId())); // e-mail goes out after this commits
            log.info("Report {} generated ({} bytes)", orderId, pdf.length);
        } catch (RuntimeException e) {
            log.error("Report {} generation failed (attempt {})", orderId, order.getGenerationAttempts(), e);
            order.markFailed();
            events.publishEvent(new OpsAlert("report-failed:" + orderId, "Report PDF failed for order " + order.getNumber(),
                    "The paid report of order " + orderId + " (" + order.getEmail() + ") could not be generated: " + e
                            + "\nThe buyer sees an error on the report page. Fix the cause, then press 'Generate again' "
                            + "in the admin panel or refund the payment in Stripe."));
        }
    }
}
