package com.carimport.ops;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.carimport.fx.ExchangeRateService;
import com.carimport.fx.FxRates;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

class AlertServiceTest {

    private static final Instant NOW = Instant.parse("2026-10-26T08:00:00Z");

    private final JavaMailSender smtp = mock(JavaMailSender.class);
    private final ExchangeRateService rates = mock(ExchangeRateService.class);

    @SuppressWarnings("unchecked")
    private AlertService service(Instant now) {
        ObjectProvider<JavaMailSender> provider = mock(ObjectProvider.class);
        when(provider.getIfAvailable()).thenReturn(smtp);
        when(provider.getObject()).thenReturn(smtp);
        return new AlertService(provider, rates, Clock.fixed(now, ZoneOffset.UTC), "ops@example.com",
                "contact@example.com", "Carglo <cargloapp@gmail.com>", "smtp.example.com");
    }

    @Test
    void mailsAnAlertOnceAndThrottlesRepeats() {
        AlertService alerts = service(NOW);
        alerts.on(new OpsAlert("report-failed:1", "Report PDF failed", "details"));
        alerts.on(new OpsAlert("report-failed:1", "Report PDF failed", "details"));   // same problem, same half hour
        alerts.on(new OpsAlert("report-failed:2", "Report PDF failed", "details"));

        ArgumentCaptor<SimpleMailMessage> mail = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(smtp, timeout(2000).times(2)).send(mail.capture());
        assertThat(mail.getValue().getTo()).containsExactly("ops@example.com");
        assertThat(mail.getValue().getSubject()).isEqualTo("[Carglo] Report PDF failed");
    }

    @Test
    void warnsWhenTheNewestExchangeRatesAreDaysOld() {
        when(rates.latest()).thenReturn(new FxRates(LocalDate.parse("2026-10-20"), "NBP", Map.of()));
        service(NOW).checkExchangeRates();
        verify(smtp, timeout(2000).times(1)).send(any(SimpleMailMessage.class));

        when(rates.latest()).thenReturn(new FxRates(LocalDate.parse("2026-10-23"), "NBP", Map.of()));   // Friday's table on Monday
        JavaMailSender before = smtp;
        service(NOW).checkExchangeRates();
        verify(before, timeout(500).times(1)).send(any(SimpleMailMessage.class));
    }
}
