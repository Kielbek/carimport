package com.carimport.ops;

import com.carimport.fx.ExchangeRateService;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * E-mails operational alerts to {@code app.alerts.email} (ALERT_EMAIL, default: the contact address), at most once
 * per key and {@link #THROTTLE}, off the request thread. Every alert is also logged as {@code ERROR ALERT ...} so it
 * shows in the logs when SMTP is not configured. Checks the exchange rates once a day.
 */
@Service
public class AlertService {

    private static final Logger log = LoggerFactory.getLogger(AlertService.class);
    static final Duration THROTTLE = Duration.ofMinutes(30);
    /** NBP publishes on working days; four calendar days without a new table means the sync is broken. */
    static final int FX_STALE_DAYS = 4;

    private final ObjectProvider<JavaMailSender> sender;
    private final ExchangeRateService rates;
    private final Clock clock;
    private final String to;
    private final String from;
    private final String smtpHost;
    private final Map<String, Instant> lastSent = new ConcurrentHashMap<>();
    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

    public AlertService(ObjectProvider<JavaMailSender> sender, ExchangeRateService rates, Clock clock,
                        @Value("${app.alerts.email:}") String to,
                        @Value("${app.company.email:}") String contact,
                        @Value("${app.mail.from:}") String from,
                        @Value("${spring.mail.host:}") String smtpHost) {
        this.sender = sender;
        this.rates = rates;
        this.clock = clock;
        this.to = StringUtils.hasText(to) ? to : contact;
        this.from = from;
        this.smtpHost = smtpHost;
    }

    @EventListener
    public void on(OpsAlert alert) {
        Instant now = clock.instant();
        Instant previous = lastSent.get(alert.key());
        if (previous != null && previous.plus(THROTTLE).isAfter(now)) {
            return;
        }
        lastSent.put(alert.key(), now);
        log.error("ALERT {}: {}", alert.subject(), alert.details());
        if (!StringUtils.hasText(smtpHost) || !StringUtils.hasText(to) || sender.getIfAvailable() == null) {
            return;
        }
        executor.submit(() -> {
            try {
                SimpleMailMessage m = new SimpleMailMessage();
                if (StringUtils.hasText(from)) {
                    m.setFrom(from);
                }
                m.setTo(to);
                m.setSubject("[Carglo] " + alert.subject());
                m.setText(alert.details() + "\n\n" + now + "\nAlerts for the same problem are sent at most every "
                        + THROTTLE.toMinutes() + " minutes.");
                sender.getObject().send(m);
            } catch (RuntimeException e) {
                log.warn("Alert e-mail could not be sent: {}", e.toString());
            }
        });
    }

    /** Daily: the newest stored NBP table must be recent, else every quote uses old rates. */
    @Scheduled(cron = "${app.alerts.fx-cron:0 0 9 * * *}", zone = "Europe/Warsaw")
    public void checkExchangeRates() {
        LocalDate latest = rates.latest().effectiveDate();
        LocalDate today = LocalDate.now(clock.withZone(ZoneId.of("Europe/Warsaw")));
        if (latest.plusDays(FX_STALE_DAYS).isBefore(today)) {
            on(new OpsAlert("fx-stale", "Exchange rates are stale (" + latest + ")",
                    "The newest NBP table in the database is from " + latest + ". Quotes use these old rates.\n"
                            + "Check the API log for 'FX sync' warnings and whether api.nbp.pl is reachable from the server."));
        }
    }
}
