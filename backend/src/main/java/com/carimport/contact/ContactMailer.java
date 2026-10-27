package com.carimport.contact;

import com.carimport.config.AppProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Delivers a contact-form message to the operator (CONTACT_EMAIL) with the visitor as Reply-To, so answering is one
 * click in the mail client. Nothing is sent to the visitor: the form cannot be used to mail third parties.
 */
@Component
public class ContactMailer {

    private final ObjectProvider<JavaMailSender> sender;
    private final AppProperties props;
    private final String smtpHost;

    public ContactMailer(ObjectProvider<JavaMailSender> sender, AppProperties props,
                         @Value("${spring.mail.host:}") String smtpHost) {
        this.sender = sender;
        this.props = props;
        this.smtpHost = smtpHost;
    }

    public boolean enabled() {
        return StringUtils.hasText(smtpHost) && sender.getIfAvailable() != null
                && StringUtils.hasText(props.company().email());
    }

    void send(ContactController.ContactRequest r) {
        try {
            MimeMessage message = sender.getObject().createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom(props.mail().from());
            helper.setTo(props.company().email());
            helper.setReplyTo(r.email().trim(), r.name().trim());
            helper.setSubject("[Carglo] " + r.topic() + " (" + r.locale() + ") – " + oneLine(r.name()));
            StringBuilder body = new StringBuilder()
                    .append("Od / From: ").append(oneLine(r.name())).append(" <").append(r.email().trim()).append(">\n")
                    .append("Temat / Topic: ").append(r.topic()).append('\n')
                    .append("Język / Language: ").append(r.locale()).append('\n');
            if (StringUtils.hasText(r.order())) {
                body.append("Zamówienie / Order: ").append(oneLine(r.order())).append('\n');
            }
            body.append("\n").append(r.message().trim()).append("\n\n— ")
                    .append("Odpowiedz na tego maila, a odpowiedź trafi prosto do nadawcy.\n");
            helper.setText(body.toString());
            sender.getObject().send(message);
        } catch (MailException | MessagingException | java.io.UnsupportedEncodingException e) {
            throw new ContactUnavailableException(e);
        }
    }

    private static String oneLine(String s) {
        return s.replaceAll("[\\r\\n]+", " ").trim();
    }

    /** The message could not be delivered; the form asks the visitor to write directly. */
    public static class ContactUnavailableException extends RuntimeException {
        ContactUnavailableException(Throwable cause) {
            super("Contact message could not be sent", cause);
        }
    }
}
