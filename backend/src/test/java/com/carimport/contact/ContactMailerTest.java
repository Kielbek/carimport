package com.carimport.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carimport.config.AppProperties;
import jakarta.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

class ContactMailerTest {

    static class CapturingSender extends JavaMailSenderImpl {
        final List<MimeMessage> sent = new ArrayList<>();

        @Override
        public void send(MimeMessage message) {
            sent.add(message);
        }
    }

    private final CapturingSender smtp = new CapturingSender();

    private ContactMailer mailer(String host) {
        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = mock(ObjectProvider.class);
        when(provider.getIfAvailable()).thenReturn(smtp);
        when(provider.getObject()).thenReturn(smtp);
        AppProperties props = new AppProperties("https://cargloapp.com", List.of("pl"), null, null, List.of(), null, null,
                new AppProperties.Mail("Carglo <kontakt@cargloapp.com>", "kontakt@cargloapp.com", "cargloapp.com"),
                new AppProperties.Company("Carglo", "", "", "owner@example.com"));
        return new ContactMailer(provider, props, host);
    }

    @Test
    void deliversTheMessageToTheOperatorWithTheVisitorAsReplyTo() throws Exception {
        mailer("smtp.example.com").send(new ContactController.ContactRequest("Anna\nNowak", "anna@example.com", "order",
                "AB12CD34", "Nie dostałam maila z raportem, proszę o pomoc.", "pl", ""));

        assertThat(smtp.sent).hasSize(1);
        MimeMessage m = smtp.sent.getFirst();
        assertThat(m.getAllRecipients()[0].toString()).isEqualTo("owner@example.com");
        assertThat(m.getReplyTo()[0].toString()).contains("anna@example.com");
        assertThat(m.getSubject()).isEqualTo("[Carglo] order (pl) – Anna Nowak");   // no header injection via the name
        assertThat(m.getContent().toString()).contains("AB12CD34", "Nie dostałam maila z raportem");
    }

    @Test
    void isOffWithoutSmtp() {
        assertThat(mailer("").enabled()).isFalse();
        assertThat(mailer("smtp.example.com").enabled()).isTrue();
    }
}
