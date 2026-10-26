package com.carimport.admin;

import com.carimport.fx.ExchangeRateService;
import com.carimport.newsletter.NewsletterSubscriber;
import com.carimport.newsletter.NewsletterSubscriberRepository;
import com.carimport.payment.OrderRefunds;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.report.ReportGenerationService;
import com.carimport.report.ReportMailer;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Operator panel API (behind {@link AdminAuthFilter}): orders, re-delivery, re-generation, numbers, newsletter export. */
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private static final Logger log = LoggerFactory.getLogger(AdminController.class);
    private static final ZoneId ZONE = ZoneId.of("Europe/Warsaw");

    public record OrderRow(UUID id, String number, Instant createdAt, Instant paidAt, String status, String email,
                           String name, String locale, long amountMinor, String currency, Instant emailSentAt,
                           int emailAttempts, int generationAttempts, String paymentIntent, long refundedMinor,
                           Instant refundedAt, String refundReason, long refundableMinor) {

        static OrderRow of(ReportOrder o) {
            return new OrderRow(o.getId(), o.getNumber(), o.getCreatedAt(), o.getPaidAt(), o.getStatus().name(),
                    o.getEmail(), o.getFullName(), o.getLocale(), o.getAmountMinor(), o.getCurrency().name(),
                    o.getEmailSentAt(), o.getEmailAttempts(), o.getGenerationAttempts(), o.getStripePaymentIntentId(),
                    o.getRefundedMinor(), o.getRefundedAt(), o.getRefundReason(), o.refundableMinor());
        }
    }

    /** amountMinor null = everything still refundable; reason: requested_by_customer, duplicate or fraudulent. */
    public record RefundRequest(@jakarta.validation.constraints.Positive Long amountMinor, String reason,
                                @jakarta.validation.constraints.Size(max = 150) String note) {
    }

    public record OrderPage(List<OrderRow> orders, long total, int page, int pages) {
    }

    public record Revenue(String currency, long amountMinor, long orders) {
    }

    public record Stats(long ordersToday, long ordersWeek, long ordersMonth, List<Revenue> revenueMonth,
                        long failed, long pending, long newsletterConfirmed, long newsletterPending,
                        LocalDate fxDate, boolean mailEnabled) {
    }

    private final ReportOrderRepository orders;
    private final NewsletterSubscriberRepository subscribers;
    private final ReportMailer mailer;
    private final ReportGenerationService generator;
    private final OrderRefunds refunds;
    private final ExchangeRateService rates;
    private final Clock clock;

    public AdminController(ReportOrderRepository orders, NewsletterSubscriberRepository subscribers, ReportMailer mailer,
                           ReportGenerationService generator, ExchangeRateService rates, Clock clock,
                           OrderRefunds refunds) {
        this.refunds = refunds;
        this.orders = orders;
        this.subscribers = subscribers;
        this.mailer = mailer;
        this.generator = generator;
        this.rates = rates;
        this.clock = clock;
    }

    @GetMapping("/stats")
    public Stats stats() {
        Instant now = clock.instant();
        Instant today = LocalDate.now(clock.withZone(ZONE)).atStartOfDay(ZONE).toInstant();
        Instant month = LocalDate.now(clock.withZone(ZONE)).withDayOfMonth(1).atStartOfDay(ZONE).toInstant();
        List<Revenue> revenue = orders.revenueSince(month).stream()
                .map(r -> new Revenue(r[0].toString(), ((Number) r[1]).longValue(), ((Number) r[2]).longValue()))
                .toList();
        return new Stats(orders.countByCreatedAtAfter(today), orders.countByCreatedAtAfter(now.minus(7, ChronoUnit.DAYS)),
                orders.countByCreatedAtAfter(month), revenue, orders.countByStatus(ReportOrder.Status.FAILED),
                orders.countByStatus(ReportOrder.Status.PENDING),
                subscribers.countByStatus(NewsletterSubscriber.Status.CONFIRMED),
                subscribers.countByStatus(NewsletterSubscriber.Status.PENDING),
                rates.latest().effectiveDate(), mailer.enabled());
    }

    @GetMapping("/orders")
    public OrderPage orders(@RequestParam(required = false) String status, @RequestParam(required = false) String q,
                            @RequestParam(defaultValue = "0") int page) {
        ReportOrder.Status s = status == null || status.isBlank() ? null : ReportOrder.Status.valueOf(status);
        String query = q == null ? "" : q.trim().toLowerCase(Locale.ROOT);
        Page<ReportOrder> result = orders.search(s, query, PageRequest.of(Math.max(page, 0), 50));
        return new OrderPage(result.map(OrderRow::of).getContent(), result.getTotalElements(), result.getNumber(),
                result.getTotalPages());
    }

    /** Sends the report e-mail again (new personal link), e.g. after a typo fix or a lost message. */
    @PostMapping("/orders/{id}/resend")
    public OrderRow resend(@PathVariable UUID id) {
        mailer.resend(id);
        mailer.send(id);
        log.info("Admin: report e-mail of order {} sent again", id);
        return OrderRow.of(orders.findById(id).orElseThrow());
    }

    /**
     * Refunds through Stripe (all or part) and e-mails the buyer. A full refund revokes access to the report; a
     * partial one keeps it. Stripe errors (e.g. the payment is not refundable yet) come back as 502 with Stripe's message.
     */
    @PostMapping("/orders/{id}/refund")
    public ResponseEntity<?> refund(@PathVariable UUID id, @jakarta.validation.Valid @RequestBody RefundRequest request) {
        try {
            ReportOrder order = refunds.refund(id, request.amountMinor(), request.reason(), request.note());
            log.info("Admin: order {} refunded {} (total {})", id, request.amountMinor(), order.getRefundedMinor());
            return ResponseEntity.ok(OrderRow.of(order));
        } catch (com.stripe.exception.StripeException e) {
            log.warn("Admin: refund of order {} rejected by Stripe: {}", id, e.getMessage());
            ProblemDetail p = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_GATEWAY, "Stripe: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(p);
        }
    }

    /** Builds the PDF again after a failure (the e-mail follows automatically when it succeeds). */
    @PostMapping("/orders/{id}/regenerate")
    public OrderRow regenerate(@PathVariable UUID id) {
        generator.generate(id);
        log.info("Admin: report of order {} generated again", id);
        return OrderRow.of(orders.findById(id).orElseThrow());
    }

    /** Confirmed newsletter subscribers for a mailing tool (MailerLite, Brevo, ...): e-mail, language, unsubscribe link. */
    @GetMapping(value = "/newsletter.csv", produces = "text/csv")
    public ResponseEntity<String> newsletter(@RequestParam(defaultValue = "https://cargloapp.com") String site) {
        StringBuilder csv = new StringBuilder("email,language,confirmed_at,source,unsubscribe_url\n");
        for (NewsletterSubscriber s : subscribers.findByStatusOrderByConfirmedAtAsc(NewsletterSubscriber.Status.CONFIRMED)) {
            csv.append(cell(s.getEmail())).append(',').append(s.getLocale()).append(',')
                    .append(s.getConfirmedAt()).append(',').append(cell(s.getSource())).append(',')
                    .append(site).append('/').append(s.getLocale()).append("/newsletter#unsubscribe=")
                    .append(s.getUnsubscribeToken()).append('\n');
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"carglo-newsletter.csv\"")
                .contentType(new MediaType("text", "csv", java.nio.charset.StandardCharsets.UTF_8))
                .body(csv.toString());
    }

    /** CSV cell; a leading =, +, - or @ is neutralised so a spreadsheet does not run it as a formula. */
    static String cell(String value) {
        if (value == null) {
            return "";
        }
        String v = value.matches("^[=+\\-@].*") ? "'" + value : value;
        return v.contains(",") || v.contains("\"") ? "\"" + v.replace("\"", "\"\"") + "\"" : v;
    }
}
