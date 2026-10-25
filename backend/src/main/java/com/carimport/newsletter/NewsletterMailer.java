package com.carimport.newsletter;

import com.carimport.config.AppProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Locale;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/** The double opt-in e-mail. Sent in the request: a failure reaches the form, which asks the user to try again. */
@Component
public class NewsletterMailer {

    private static final ClassPathResource LOGO = new ClassPathResource("mail/logo.png");

    private final ObjectProvider<JavaMailSender> sender;
    private final TemplateEngine templates;
    private final MessageSource messages;
    private final AppProperties props;
    private final String smtpHost;

    public NewsletterMailer(ObjectProvider<JavaMailSender> sender, TemplateEngine templates, MessageSource messages,
                            AppProperties props, @Value("${spring.mail.host:}") String smtpHost) {
        this.sender = sender;
        this.templates = templates;
        this.messages = messages;
        this.props = props;
        this.smtpHost = smtpHost;
    }

    public boolean enabled() {
        return StringUtils.hasText(smtpHost) && sender.getIfAvailable() != null;
    }

    void sendConfirmation(NewsletterSubscriber subscriber, String token, Locale locale) {
        // the token rides in the fragment: it never reaches a server log or a Referer header
        String link = props.frontendUrl() + "/" + locale.getLanguage() + "/newsletter#confirm=" + token;
        Context ctx = new Context(locale);
        ctx.setVariable("link", link);
        ctx.setVariable("company", props.company());
        try {
            MimeMessage message = sender.getObject().createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(props.mail().from());
            if (StringUtils.hasText(props.mail().replyTo())) {
                helper.setReplyTo(props.mail().replyTo());
            }
            helper.setTo(subscriber.getEmail());
            helper.setSubject(messages.getMessage("mail.newsletter.subject", null, locale));
            helper.setText(templates.process("mail/newsletter-confirm.txt", ctx),
                    templates.process("mail/newsletter-confirm", ctx));
            helper.addInline("logo", LOGO, "image/png");
            sender.getObject().send(message);
        } catch (MailException | MessagingException e) {
            throw new NewsletterUnavailableException(e);
        }
    }

    /** The confirmation could not be sent; the sign-up is rolled back and the form asks to try again. */
    public static class NewsletterUnavailableException extends RuntimeException {
        NewsletterUnavailableException(Throwable cause) {
            super("Newsletter confirmation could not be sent", cause);
        }
    }
}
