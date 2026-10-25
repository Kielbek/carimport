package com.carimport.newsletter;

import com.carimport.config.AppProperties;
import com.carimport.payment.AccessTokens;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Sign-up with double opt-in, confirmation and unsubscribe. The answer to a sign-up never tells whether the address
 * was already on the list (no address probing); a confirmed address gets no new e-mail, a pending one at most one
 * confirmation per {@link #RESEND_AFTER}.
 */
@Service
public class NewsletterService {

    private static final Logger log = LoggerFactory.getLogger(NewsletterService.class);
    static final Duration RESEND_AFTER = Duration.ofMinutes(10);
    /** Consent text version stored with each sign-up; bump with the wording of newsletter.consent. */
    static final String CONSENT_VERSION = "2026-10-25";

    private final NewsletterSubscriberRepository subscribers;
    private final NewsletterMailer mailer;
    private final AppProperties props;
    private final Clock clock;

    public NewsletterService(NewsletterSubscriberRepository subscribers, NewsletterMailer mailer, AppProperties props,
                             Clock clock) {
        this.subscribers = subscribers;
        this.mailer = mailer;
        this.props = props;
        this.clock = clock;
    }

    public boolean enabled() {
        return mailer.enabled();
    }

    @Transactional
    public void subscribe(String email, String locale, String source) {
        String address = email.trim();
        String lang = props.supportedLocales().contains(locale) ? locale : "en";
        Instant now = clock.instant();
        NewsletterSubscriber s = subscribers.findByEmail(address)
                .orElseGet(() -> subscribers.save(new NewsletterSubscriber(address, lang, source, CONSENT_VERSION, now)));
        if (s.getStatus() == NewsletterSubscriber.Status.CONFIRMED) {
            log.info("Newsletter sign-up for confirmed subscriber {} ignored", s.getId());
            return;
        }
        if (s.getConfirmSentAt() != null && s.getConfirmSentAt().plus(RESEND_AFTER).isAfter(now)
                && s.getStatus() == NewsletterSubscriber.Status.PENDING) {
            log.info("Newsletter confirmation for {} sent recently, not resent", s.getId());
            return;
        }
        String token = s.startConfirmation(lang, source, CONSENT_VERSION, now);
        mailer.sendConfirmation(s, token, Locale.forLanguageTag(lang));
        log.info("Newsletter sign-up {} ({}, {}), confirmation sent", s.getId(), lang, source);
    }

    /** @return the language of the subscriber, empty for an unknown or used link */
    @Transactional
    public Optional<String> confirm(String token) {
        return subscribers.findByConfirmTokenHash(AccessTokens.hash(token)).map(s -> {
            s.confirm(clock.instant());
            log.info("Newsletter subscriber {} confirmed", s.getId());
            return s.getLocale();
        });
    }

    @Transactional
    public boolean unsubscribe(String token) {
        return subscribers.findByUnsubscribeToken(token).map(s -> {
            if (s.getStatus() != NewsletterSubscriber.Status.UNSUBSCRIBED) {
                s.unsubscribe(clock.instant());
                log.info("Newsletter subscriber {} unsubscribed", s.getId());
            }
            return true;
        }).orElse(false);
    }
}
