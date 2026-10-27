package com.carimport.report;

import com.carimport.config.AppProperties;
import com.carimport.payment.OrderRefundedEvent;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/** Tells the buyer, in their language, that money is on its way back (and whether the report stays available). */
@Component
public class RefundMailer {

    private static final Logger log = LoggerFactory.getLogger(RefundMailer.class);
    private static final ClassPathResource LOGO = new ClassPathResource("mail/logo.png");

    private final ReportOrderRepository orders;
    private final ObjectProvider<JavaMailSender> sender;
    private final TemplateEngine templates;
    private final MessageSource messages;
    private final AppProperties props;
    private final String smtpHost;

    public RefundMailer(ReportOrderRepository orders, ObjectProvider<JavaMailSender> sender, TemplateEngine templates,
                        MessageSource messages, AppProperties props, @Value("${spring.mail.host:}") String smtpHost) {
        this.orders = orders;
        this.sender = sender;
        this.templates = templates;
        this.messages = messages;
        this.props = props;
        this.smtpHost = smtpHost;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onRefund(OrderRefundedEvent event) {
        if (!StringUtils.hasText(smtpHost) || sender.getIfAvailable() == null) {
            return;
        }
        ReportOrder order = orders.findById(event.orderId()).orElseThrow();
        try {
            sender.getObject().send(compose(order, event));
            log.info("Refund e-mail for order {} sent", order.getId());
        } catch (MailException | MessagingException e) {
            log.warn("Refund e-mail for order {} failed: {}", order.getId(), e.toString());
        }
    }

    MimeMessage compose(ReportOrder order, OrderRefundedEvent event) throws MessagingException {
        Locale locale = Locale.forLanguageTag(order.getLocale());
        NumberFormat money = NumberFormat.getCurrencyInstance(locale);
        money.setCurrency(Currency.getInstance(order.getCurrency().name()));
        Context ctx = new Context(locale);
        ctx.setVariable("name", order.getFullName());
        ctx.setVariable("orderNo", order.getNumber());
        ctx.setVariable("amount", money.format(BigDecimal.valueOf(event.amountMinor(), 2)));
        ctx.setVariable("full", event.full());
        ctx.setVariable("company", props.company());

        MimeMessage message = sender.getObject().createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(props.mail().from());
        if (StringUtils.hasText(props.mail().replyTo(order.getLocale()))) {
            helper.setReplyTo(props.mail().replyTo(order.getLocale()));
        }
        helper.setTo(order.getEmail());
        helper.setSubject(messages.getMessage("mail.refund.subject", new Object[] {order.getNumber()}, locale));
        helper.setText(templates.process("mail/refund.txt", ctx), templates.process("mail/refund", ctx));
        helper.addInline("logo", LOGO, "image/png");
        return message;
    }
}
