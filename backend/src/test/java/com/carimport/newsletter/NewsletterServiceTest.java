package com.carimport.newsletter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carimport.config.AppProperties;
import com.carimport.payment.AccessTokens;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class NewsletterServiceTest {

    private static final Instant NOW = Instant.parse("2026-10-25T10:00:00Z");

    private final List<NewsletterSubscriber> rows = new ArrayList<>();
    private final List<String> sentTokens = new ArrayList<>();
    private final List<Locale> sentLocales = new ArrayList<>();
    private final NewsletterSubscriberRepository repo = mock(NewsletterSubscriberRepository.class);
    private final NewsletterMailer mailer = mock(NewsletterMailer.class);
    private Clock clock = Clock.fixed(NOW, ZoneOffset.UTC);

    @BeforeEach
    void inMemoryRepository() {
        when(repo.save(any())).thenAnswer(i -> {
            rows.add(i.getArgument(0));
            return i.getArgument(0);
        });
        when(repo.findByEmail(anyString())).thenAnswer(i -> rows.stream()
                .filter(r -> r.getEmail().equalsIgnoreCase(i.getArgument(0))).findFirst());
        when(repo.findByConfirmTokenHash(anyString())).thenAnswer(i -> rows.stream()
                .filter(r -> i.getArgument(0).equals(hashOf(r))).findFirst());
        when(repo.findByUnsubscribeToken(anyString())).thenAnswer(i -> rows.stream()
                .filter(r -> r.getUnsubscribeToken().equals(i.getArgument(0))).findFirst());
        when(mailer.enabled()).thenReturn(true);
        doAnswer(i -> {
            sentTokens.add(i.getArgument(1));
            sentLocales.add(i.getArgument(2));
            return null;
        }).when(mailer).sendConfirmation(any(), anyString(), any());
    }

    /** The entity keeps only the hash; read it through the field the repository would query. */
    private static String hashOf(NewsletterSubscriber s) {
        try {
            var f = NewsletterSubscriber.class.getDeclaredField("confirmTokenHash");
            f.setAccessible(true);
            return (String) f.get(s);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException(e);
        }
    }

    private NewsletterService service() {
        AppProperties props = new AppProperties("https://cargloapp.com", List.of("pl", "en", "de"), null, null,
                List.of(), null, null, null, null);
        return new NewsletterService(repo, mailer, props, clock);
    }

    @Test
    void doubleOptInConfirmsOnceWithTheMailedLink() {
        service().subscribe(" Jan@Example.com ", "pl", "footer");

        assertThat(rows).singleElement().satisfies(r -> {
            assertThat(r.getEmail()).isEqualTo("Jan@Example.com");
            assertThat(r.getStatus()).isEqualTo(NewsletterSubscriber.Status.PENDING);
            assertThat(hashOf(r)).isEqualTo(AccessTokens.hash(sentTokens.getFirst()));
        });
        assertThat(sentLocales).containsExactly(Locale.forLanguageTag("pl"));

        assertThat(service().confirm(sentTokens.getFirst())).contains("pl");
        assertThat(rows.getFirst().getStatus()).isEqualTo(NewsletterSubscriber.Status.CONFIRMED);
        assertThat(service().confirm(sentTokens.getFirst())).isEmpty();   // used
        assertThat(service().confirm("guess")).isEmpty();
    }

    @Test
    void repeatedSignUpsDoNotSpamOrRevealTheAddress() {
        service().subscribe("jan@example.com", "pl", "footer");
        service().subscribe("JAN@example.com", "pl", "footer");          // pending, sent a minute ago
        assertThat(sentTokens).hasSize(1);

        clock = Clock.fixed(NOW.plus(Duration.ofMinutes(11)), ZoneOffset.UTC);
        service().subscribe("jan@example.com", "de", "footer");          // lost the mail: new link, new language
        assertThat(sentTokens).hasSize(2);
        assertThat(service().confirm(sentTokens.get(0))).isEmpty();      // the old link no longer works
        assertThat(service().confirm(sentTokens.get(1))).contains("de");

        service().subscribe("jan@example.com", "pl", "footer");          // confirmed: nothing is sent
        assertThat(sentTokens).hasSize(2);
        assertThat(rows).hasSize(1);
    }

    @Test
    void unsubscribeWorksWithTheTokenAndASignUpAfterwardsNeedsAFreshConfirmation() {
        service().subscribe("jan@example.com", "xx", "footer");
        assertThat(sentLocales).containsExactly(Locale.ENGLISH);         // unsupported language -> English
        service().confirm(sentTokens.getFirst());
        String unsubscribe = rows.getFirst().getUnsubscribeToken();

        assertThat(service().unsubscribe(unsubscribe)).isTrue();
        assertThat(rows.getFirst().getStatus()).isEqualTo(NewsletterSubscriber.Status.UNSUBSCRIBED);
        assertThat(service().unsubscribe(unsubscribe)).isTrue();          // idempotent
        assertThat(service().unsubscribe("nope")).isFalse();

        service().subscribe("jan@example.com", "en", "footer");
        assertThat(rows.getFirst().getStatus()).isEqualTo(NewsletterSubscriber.Status.PENDING);
        assertThat(sentTokens).hasSize(2);
        assertThat(Optional.of(rows.getFirst().getUnsubscribeToken())).contains(unsubscribe);   // stable per address
    }
}
