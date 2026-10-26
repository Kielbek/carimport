package com.carimport.report;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carimport.config.AppProperties;
import com.carimport.domain.CurrencyCode;
import com.carimport.payment.AccessTokens;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.quote.QuoteRepository;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeMessage;
import java.io.ByteArrayInputStream;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

class ReportMailerTest {

    private static final Instant NOW = Instant.parse("2026-10-24T10:00:00Z");

    /** Captures instead of connecting to an SMTP server; can be told to fail. */
    static class CapturingSender extends JavaMailSenderImpl {
        final List<MimeMessage> sent = new ArrayList<>();
        boolean fail;

        @Override
        public void send(MimeMessage message) {
            if (fail) {
                throw new MailSendException("SMTP down");
            }
            sent.add(message);
        }
    }

    private final ReportOrderRepository orders = mock(ReportOrderRepository.class);
    private final QuoteRepository quotes = mock(QuoteRepository.class);
    private final ReportStorage storage = mock(ReportStorage.class);
    private final CapturingSender smtp = new CapturingSender();
    private ReportOrder order;

    @BeforeEach
    void setUp() {
        order = new ReportOrder(UUID.randomUUID(), "jan@example.com", "Jan Kowalski", "pl", 1900, CurrencyCode.PLN,
                AccessTokens.hash("checkout-token"), NOW);
        order.acceptTerms("2026-10-24", NOW);
        order.markPaid("pi_1", NOW);
        order.markGenerating();
        order.markReady("reports/x.pdf", NOW);
        when(orders.findById(order.getId())).thenReturn(Optional.of(order));
        when(quotes.findById(any())).thenReturn(Optional.empty());
        when(storage.open("reports/x.pdf")).thenAnswer(i -> new ByteArrayInputStream("%PDF-1.7 test".getBytes()));
    }

    private ReportMailer mailer(String host) {
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
                new AppProperties.Mail("Carglo <cargloapp@gmail.com>", "cargloapp@gmail.com"),
                new AppProperties.Company("Carglo Sp. z o.o.", "ul. Testowa 1, 00-001 Warszawa", "NIP 1234567890",
                        "cargloapp@gmail.com"));
        return new ReportMailer(orders, quotes, storage, provider, engine, messages, props,
                Clock.fixed(NOW, ZoneOffset.UTC), host, event -> { });
    }

    @Test
    void sendsLocalizedMailWithPdfAndAPersonalLinkThatUnlocksTheReport() throws Exception {
        mailer("smtp.example.com").send(order.getId());

        assertThat(smtp.sent).hasSize(1);
        MimeMessage m = smtp.sent.getFirst();
        assertThat(m.getSubject()).isEqualTo("Twój raport kosztów importu auta jest gotowy");
        assertThat(m.getAllRecipients()[0].toString()).isEqualTo("jan@example.com");

        String body = bodies((Multipart) m.getContent());
        assertThat(body).contains("Dzień dobry Jan Kowalski", "Carglo Sp. z o.o.", "NIP 1234567890",
                "regulamin w wersji z dnia 2026-10-24",
                "import-report-" + order.getId() + ".pdf", "cid:logo", "Potwierdzenie zakupu",
                "Zamówienie nr " + order.getId().toString().substring(0, 8).toUpperCase());
        var raw = new java.io.ByteArrayOutputStream();
        m.writeTo(raw);
        assertThat(raw.toString()).contains("Content-ID: <logo>");   // the header logo travels inside the message
        Matcher link = Pattern.compile("https://cargloapp\\.com/pl/report/" + order.getId() + "#token=([A-Za-z0-9_-]{43})")
                .matcher(body);
        assertThat(link.find()).isTrue();
        assertThat(order.acceptsToken(link.group(1))).isTrue();
        assertThat(order.acceptsToken("checkout-token")).isTrue();   // the browser that paid keeps access
        assertThat(order.acceptsToken("guess")).isFalse();
        assertThat(order.getEmailSentAt()).isEqualTo(NOW);
    }

    @Test
    void isSentOnlyOnceAndNotAtAllWithoutSmtpHost() {
        ReportMailer off = mailer("");
        off.send(order.getId());
        assertThat(off.enabled()).isFalse();
        assertThat(smtp.sent).isEmpty();
        assertThat(order.getEmailAttempts()).isZero();

        ReportMailer on = mailer("smtp.example.com");
        on.send(order.getId());
        on.send(order.getId());
        assertThat(smtp.sent).hasSize(1);
    }

    @Test
    void failedDeliveryIsCountedAndLeftForTheRetry() {
        smtp.fail = true;
        mailer("smtp.example.com").send(order.getId());

        assertThat(order.getEmailSentAt()).isNull();
        assertThat(order.getEmailAttempts()).isEqualTo(1);
    }

    /** Text of all parts, plus attachment file names. */
    private static String bodies(Multipart mp) throws Exception {
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < mp.getCount(); i++) {
            var part = mp.getBodyPart(i);
            if (part.getFileName() != null) {
                b.append(part.getFileName()).append('\n');
            } else if (part.getContent() instanceof Multipart nested) {
                b.append(bodies(nested));
            } else {
                b.append(part.getContent()).append('\n');
            }
        }
        return b.toString();
    }
}
