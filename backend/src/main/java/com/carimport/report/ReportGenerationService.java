package com.carimport.report;

import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.quote.QuoteRepository;
import java.time.Clock;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public ReportGenerationService(ReportOrderRepository orders, QuoteRepository quotes, PdfReportRenderer renderer,
                                   ReportStorage storage, Clock clock) {
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
            // e-mail with the deep link is sent here (Spring Mail / transactional e-mail provider)
            log.info("Report {} generated ({} bytes)", orderId, pdf.length);
        } catch (RuntimeException e) {
            log.error("Report {} generation failed (attempt {})", orderId, order.getGenerationAttempts(), e);
            order.markFailed();
        }
    }
}
