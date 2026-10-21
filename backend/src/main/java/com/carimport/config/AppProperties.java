package com.carimport.config;

import com.carimport.domain.CurrencyCode;
import java.util.List;
import java.util.Map;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        String frontendUrl,
        List<String> supportedLocales,
        Stripe stripe,
        Report report,
        List<AffiliateOffer> affiliates) {

    public record Stripe(String apiKey, String webhookSecret) {
    }

    /** Price per checkout currency in minor units, e.g. PLN: 1900, EUR: 499. */
    public record Report(Map<CurrencyCode, Long> priceMinor, String storageDir) {
    }

    /**
     * An affiliate placement. {@code origins}/{@code countries} empty = everywhere. {@code url} may contain
     * {@code {locale}} and {@code {subId}} placeholders.
     */
    public record AffiliateOffer(String id, String kind, String partner, String url, List<String> origins,
                                 List<String> countries, List<String> locales, int priority) {
    }
}
