package com.carimport.ops;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Makes a broken SMTP setup visible: at startup logs whether e-mail is on and whether the server accepts the login
 * ({@code grep MAIL} in the API log), and sends a test message on demand from the admin panel.
 */
@Component
public class MailCheck {

    private static final Logger log = LoggerFactory.getLogger(MailCheck.class);

    public record Result(boolean ok, String message) {
    }

    private final ObjectProvider<JavaMailSender> sender;
    private final String host;
    private final String username;
    private final String from;
    private final String defaultTo;

    public MailCheck(ObjectProvider<JavaMailSender> sender, @Value("${spring.mail.host:}") String host,
                     @Value("${spring.mail.username:}") String username, @Value("${app.mail.from:}") String from,
                     @Value("${app.alerts.email:}") String alerts, @Value("${app.company.email:}") String contact) {
        this.sender = sender;
        this.host = host;
        this.username = username;
        this.from = from;
        this.defaultTo = StringUtils.hasText(alerts) ? alerts : contact;
    }

    @Async
    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        Result r = connect();
        if (r.ok()) {
            log.info("MAIL {}", r.message());
        } else {
            log.error("MAIL {}", r.message());
        }
    }

    /** Logs in to the SMTP server without sending anything. */
    public Result connect() {
        if (!StringUtils.hasText(host) || sender.getIfAvailable() == null) {
            return new Result(false, "e-mails are OFF: SMTP_HOST is empty in .env");
        }
        String where = host + " as " + (StringUtils.hasText(username) ? username : "(no SMTP_USERNAME)");
        if (!(sender.getIfAvailable() instanceof JavaMailSenderImpl impl)) {
            return new Result(true, "e-mails are on (" + where + ")");
        }
        try {
            impl.testConnection();
            return new Result(true, "SMTP login OK: " + where + ", sending from " + from);
        } catch (Exception e) {
            return new Result(false, "SMTP login FAILED: " + where + ": " + rootMessage(e) + hint(e));
        }
    }

    /** Sends a plain test message; to empty = ALERT_EMAIL or CONTACT_EMAIL. */
    public Result sendTest(String to) {
        Result connection = connect();
        if (!connection.ok()) {
            return connection;
        }
        String recipient = StringUtils.hasText(to) ? to.trim() : defaultTo;
        if (!StringUtils.hasText(recipient)) {
            return new Result(false, "no recipient: give an address or set CONTACT_EMAIL");
        }
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            if (StringUtils.hasText(from)) {
                m.setFrom(from);
            }
            m.setTo(recipient);
            m.setSubject("[Carglo] Test e-mail");
            m.setText("SMTP works: this message was sent by " + host + " from " + from + ".");
            sender.getObject().send(m);
            log.info("MAIL test e-mail sent to {}", recipient);
            return new Result(true, "sent to " + recipient + " - check the inbox and the spam folder");
        } catch (Exception e) {
            log.error("MAIL test e-mail to {} failed: {}", recipient, rootMessage(e));
            return new Result(false, "sending to " + recipient + " failed: " + rootMessage(e) + hint(e));
        }
    }

    private static String rootMessage(Throwable e) {
        Throwable t = e;
        while (t.getCause() != null && t.getCause() != t) {
            t = t.getCause();
        }
        return t == e ? String.valueOf(e.getMessage()) : e.getMessage() + " / " + t.getMessage();
    }

    private static String hint(Throwable e) {
        String m = rootMessage(e).toLowerCase(java.util.Locale.ROOT);
        if (m.contains("535") || m.contains("authentication") || m.contains("username and password")) {
            return " -> wrong SMTP_USERNAME/SMTP_PASSWORD (Gmail: full address and a 16-character app password,"
                    + " 2-step verification must be on)";
        }
        if (m.contains("timed out") || m.contains("connect") || m.contains("unknownhost")) {
            return " -> SMTP_HOST/SMTP_PORT unreachable (Gmail: smtp.gmail.com and 587)";
        }
        if (m.contains("553") || m.contains("sender") || m.contains("from")) {
            return " -> MAIL_FROM must be the same address as SMTP_USERNAME (Gmail)";
        }
        return "";
    }
}
