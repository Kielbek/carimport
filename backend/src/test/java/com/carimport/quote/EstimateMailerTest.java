package com.carimport.quote;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carimport.calculation.CalculationEngineTest;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.QuoteRange;
import com.carimport.config.AppProperties;
import com.carimport.domain.FuelType;
import jakarta.mail.BodyPart;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

class EstimateMailerTest {

    private static final Instant NOW = Instant.parse("2026-10-27T10:00:00Z");

    /** Captures instead of connecting to an SMTP server. */
    static class CapturingSender extends JavaMailSenderImpl {
        final List<MimeMessage> sent = new ArrayList<>();

        @Override
        public void send(MimeMessage message) {
            sent.add(message);
        }
    }

    private final CapturingSender smtp = new CapturingSender();
    private final QuoteService quotes = mock(QuoteService.class);
    private final Quote quote;

    EstimateMailerTest() {
        CalculationRequest request = CalculationEngineTest.copartToGdynia(FuelType.PETROL, 2500);
        QuoteRange range = new CalculationEngineTest().range(request);
        quote = new Quote(request, range, BigDecimal.ONE, BigDecimal.TEN, "pl", NOW, NOW.plusSeconds(3600));
        when(quotes.find(quote.getId())).thenReturn(Optional.of(quote));
    }

    private EstimateMailer mailer() {
        ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
        messages.setBasename("i18n/messages");
        messages.setDefaultEncoding("UTF-8");
        messages.setFallbackToSystemLocale(false);
        ClassLoaderTemplateResolver html = new ClassLoaderTemplateResolver();
        html.setPrefix("templates/");
        html.setSuffix(".html");
        html.setCharacterEncoding("UTF-8");
        html.setOrder(1);
        ClassLoaderTemplateResolver text = new ClassLoaderTemplateResolver();
        text.setPrefix("templates/");
        text.setTemplateMode(TemplateMode.TEXT);
        text.setCharacterEncoding("UTF-8");
        text.setResolvablePatterns(Set.of("*.txt"));
        text.setOrder(0);
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.addTemplateResolver(text);
        engine.addTemplateResolver(html);
        engine.setTemplateEngineMessageSource(messages);
        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = mock(ObjectProvider.class);
        when(provider.getIfAvailable()).thenReturn(smtp);
        when(provider.getObject()).thenReturn(smtp);
        AppProperties props = new AppProperties("https://cargloapp.com", List.of("pl"), null, null, List.of(), null, null,
                new AppProperties.Mail("Carglo <cargloapp@gmail.com>", "cargloapp@gmail.com", null),
                new AppProperties.Company("Carglo", "", "", "cargloapp@gmail.com"));
        return new EstimateMailer(quotes, provider, engine, messages, props, "smtp.example.com");
    }

    @Test
    void sendsTheFreeNumbersAndALinkBackButNeverTheReport() throws Exception {
        assertThat(mailer().send(quote.getId(), "jan@example.com", "pl")).isEqualTo(EstimateMailer.Outcome.SENT);

        MimeMessage m = smtp.sent.getFirst();
        assertThat(m.getSubject()).startsWith("Twoja wycena importu:");
        assertThat(m.getAllRecipients()[0].toString()).isEqualTo("jan@example.com");
        String body = bodies((Multipart) m.getContent());
        assertThat(body).contains("https://cargloapp.com/pl/result/" + quote.getId(), "Gdynia", "Otwórz wycenę",
                "Cło, VAT i podatki").doesNotContain("PDF\n%");
    }

    @Test
    void unknownQuoteAndTooManyMailsAreRefused() {
        EstimateMailer mailer = mailer();
        assertThat(mailer.send(UUID.randomUUID(), "a@example.com", "pl")).isEqualTo(EstimateMailer.Outcome.UNKNOWN_QUOTE);
        for (int i = 0; i < EstimateMailer.PER_QUOTE; i++) {
            assertThat(mailer.send(quote.getId(), "a@example.com", "pl")).isEqualTo(EstimateMailer.Outcome.SENT);
        }
        assertThat(mailer.send(quote.getId(), "a@example.com", "pl")).isEqualTo(EstimateMailer.Outcome.LIMIT);
    }

    @ParameterizedTest
    @ValueSource(strings = {"bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "hr", "hu", "it", "lt", "lv", "nl",
            "pl", "pt", "ro", "sk", "sl", "sv", "uk"})
    void rendersInEveryLanguageWithoutMissingKeys(String lang) throws Exception {
        mailer().send(quote.getId(), "a@example.com", lang);
        MimeMessage m = smtp.sent.getFirst();
        String body = bodies((Multipart) m.getContent());
        assertThat(m.getSubject()).doesNotContain("??", "{0}");
        assertThat(body).doesNotContain("??", "{0}", "''");
    }

    private static String bodies(Multipart mp) throws Exception {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < mp.getCount(); i++) {
            BodyPart p = mp.getBodyPart(i);
            if (p.getContent() instanceof Multipart inner) {
                sb.append(bodies(inner));
            } else if (p.getContent() instanceof String s) {
                sb.append(s);
            }
        }
        return sb.toString();
    }
}
