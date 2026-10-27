package com.carimport.quote;

import com.carimport.calculation.CalculationRequest;
import com.carimport.config.AppProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * E-mails the free part of a quote to the visitor - the same numbers the result page shows (taxes, car, transport to
 * the port and the rounded door-to-door range), never the itemised report - with a link that reopens the calculator on
 * the same car. The address is not stored. At most {@link #PER_QUOTE} e-mails per quote.
 */
@Service
public class EstimateMailer {

    private static final Logger log = LoggerFactory.getLogger(EstimateMailer.class);
    private static final ClassPathResource LOGO = new ClassPathResource("mail/logo.png");
    static final int PER_QUOTE = 3;
    private static final Map<String, String> ISO = Map.of("USA", "US", "CANADA", "CA", "JAPAN", "JP", "UAE", "AE",
            "UK", "GB");

    /** Why an e-mail was not sent. */
    public enum Outcome { SENT, UNKNOWN_QUOTE, LIMIT, UNAVAILABLE, FAILED }

    private final QuoteService quotes;
    private final ObjectProvider<JavaMailSender> sender;
    private final TemplateEngine templates;
    private final MessageSource messages;
    private final AppProperties props;
    private final String smtpHost;
    private final Map<UUID, Integer> sentPerQuote = new ConcurrentHashMap<>();

    public EstimateMailer(QuoteService quotes, ObjectProvider<JavaMailSender> sender, TemplateEngine templates,
                          MessageSource messages, AppProperties props, @Value("${spring.mail.host:}") String smtpHost) {
        this.quotes = quotes;
        this.sender = sender;
        this.templates = templates;
        this.messages = messages;
        this.props = props;
        this.smtpHost = smtpHost;
    }

    public Outcome send(UUID quoteId, String email, String locale) {
        if (!StringUtils.hasText(smtpHost) || sender.getIfAvailable() == null) {
            return Outcome.UNAVAILABLE;
        }
        Quote quote = quotes.find(quoteId).orElse(null);
        if (quote == null) {
            return Outcome.UNKNOWN_QUOTE;
        }
        if (sentPerQuote.merge(quoteId, 1, Integer::sum) > PER_QUOTE) {
            return Outcome.LIMIT;
        }
        try {
            sender.getObject().send(compose(quote, email, locale));
            log.info("Estimate e-mail for quote {} sent ({})", quoteId, locale);
            return Outcome.SENT;
        } catch (MailException | MessagingException e) {
            sentPerQuote.merge(quoteId, -1, Integer::sum);
            log.warn("Estimate e-mail for quote {} failed: {}", quoteId, e.toString());
            return Outcome.FAILED;
        }
    }

    MimeMessage compose(Quote quote, String email, String language) throws MessagingException {
        Locale locale = Locale.forLanguageTag(language);
        CalculationRequest req = quote.getRequest();
        PublicQuoteView view = PublicQuoteView.of(quote.getId(), quote.getRange(), req.destinationCountry(),
                quote.getExpiresAt());
        TaxSummary t = view.taxes();
        NumberFormat money = NumberFormat.getCurrencyInstance(locale);
        money.setCurrency(Currency.getInstance(view.currency().name()));
        money.setMaximumFractionDigits(0);

        String car = StringUtils.hasText(req.vehicleDescription()) ? req.vehicleDescription()
                : req.productionYear() + " · " + req.engineCc() + " cm³";
        Context ctx = new Context(locale);
        ctx.setVariable("car", car);
        ctx.setVariable("origin", new Locale("", ISO.get(req.originCountry().name())).getDisplayCountry(locale));
        ctx.setVariable("port", view.clearancePort());
        ctx.setVariable("destination", new Locale("", req.destinationCountry()).getDisplayCountry(locale));
        ctx.setVariable("min", format(money, t.estimateMin()));
        ctx.setVariable("max", format(money, t.estimateMax()));
        ctx.setVariable("carPrice", format(money, t.carPrice()));
        ctx.setVariable("transport", format(money, t.transportToPort()));
        ctx.setVariable("taxes", format(money, t.total()));
        ctx.setVariable("locked", view.lockedCount());
        ctx.setVariable("link", props.frontendUrl() + "/" + language + "/result/" + quote.getId());
        ctx.setVariable("company", props.company());

        MimeMessage message = sender.getObject().createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(props.mail().from());
        if (StringUtils.hasText(props.mail().replyTo())) {
            helper.setReplyTo(props.mail().replyTo());
        }
        helper.setTo(email);
        helper.setSubject(messages.getMessage("mail.estimate.subject", new Object[] {car}, locale));
        helper.setText(templates.process("mail/estimate.txt", ctx), templates.process("mail/estimate", ctx));
        helper.addInline("logo", LOGO, "image/png");
        return message;
    }

    private static String format(NumberFormat money, BigDecimal amount) {
        return amount == null ? "–" : money.format(amount);
    }
}
