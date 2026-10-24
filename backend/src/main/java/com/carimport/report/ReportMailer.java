package com.carimport.report;

import com.carimport.config.AppProperties;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.quote.QuoteRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.InputStream;
import java.time.Clock;
import java.util.Locale;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * Sends the buyer their report: the PDF as an attachment and a personal link to the online version, in the language
 * they bought in. The link carries its own bearer token (hash stored on the order), so the mailbox keeps access even
 * when the browser that paid is gone. Without an SMTP host (spring.mail.host) nothing is sent - the report page still
 * works as before.
 */
@Service
public class ReportMailer {

    private static final Logger log = LoggerFactory.getLogger(ReportMailer.class);

    private final ReportOrderRepository orders;
    private final QuoteRepository quotes;
    private final ReportStorage storage;
    private final ObjectProvider<JavaMailSender> sender;
    private final TemplateEngine templates;
    private final MessageSource messages;
    private final AppProperties props;
    private final Clock clock;
    private final String smtpHost;

    public ReportMailer(ReportOrderRepository orders, QuoteRepository quotes, ReportStorage storage,
                        ObjectProvider<JavaMailSender> sender, TemplateEngine templates, MessageSource messages,
                        AppProperties props, Clock clock, @Value("${spring.mail.host:}") String smtpHost) {
        this.orders = orders;
        this.quotes = quotes;
        this.storage = storage;
        this.sender = sender;
        this.templates = templates;
        this.messages = messages;
        this.props = props;
        this.clock = clock;
        this.smtpHost = smtpHost;
    }

    public boolean enabled() {
        return StringUtils.hasText(smtpHost) && sender.getIfAvailable() != null;
    }

    /** Idempotent: an order is mailed once; a failed attempt is retried by {@link ReportMailTriggers}. */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void send(UUID orderId) {
        if (!enabled()) {
            return;
        }
        ReportOrder order = orders.findById(orderId).orElseThrow();
        if (order.getStatus() != ReportOrder.Status.READY || order.getEmailSentAt() != null) {
            return;
        }
        String token = order.issueEmailToken();
        try {
            sender.getObject().send(compose(order, token));
            order.markEmailSent(clock.instant());
            log.info("Report e-mail for order {} sent", orderId);
        } catch (MailException | MessagingException | IOException e) {
            log.warn("Report e-mail for order {} failed (attempt {}): {}", orderId, order.getEmailAttempts(),
                    e.toString());
        }
    }

    MimeMessage compose(ReportOrder order, String token) throws MessagingException, IOException {
        Locale locale = Locale.forLanguageTag(order.getLocale());
        String link = props.frontendUrl() + "/" + order.getLocale() + "/report/" + order.getId() + "#token=" + token;
        String vehicle = quotes.findById(order.getQuoteId())
                .map(q -> q.getRequest().vehicleDescription()).orElse(null);

        Context ctx = new Context(locale);
        ctx.setVariable("name", order.getFullName());
        ctx.setVariable("link", link);
        ctx.setVariable("vehicle", vehicle);
        ctx.setVariable("company", props.company());
        // confirmation of the withdrawal-right waiver on a durable medium (Art. 8(7)(b) Directive 2011/83/EU)
        ctx.setVariable("termsVersion", order.getTermsVersion());

        MimeMessage message = sender.getObject().createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(props.mail().from());
        if (StringUtils.hasText(props.mail().replyTo())) {
            helper.setReplyTo(props.mail().replyTo());
        }
        helper.setTo(order.getEmail());
        helper.setSubject(messages.getMessage("mail.report.subject", null, locale));
        helper.setText(templates.process("mail/report.txt", ctx), templates.process("mail/report", ctx));
        try (InputStream pdf = storage.open(order.getPdfStorageKey())) {
            helper.addAttachment("import-report-" + order.getId() + ".pdf", new ByteArrayResource(pdf.readAllBytes()),
                    "application/pdf");
        }
        return message;
    }
}
