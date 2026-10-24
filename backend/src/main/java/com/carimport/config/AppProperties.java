package com.carimport.config;

import com.carimport.domain.CurrencyCode;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        String frontendUrl,
        List<String> supportedLocales,
        Stripe stripe,
        Report report,
        List<AffiliateOffer> affiliates,
        Geo geo,
        Vehicle vehicle) {

    public record Stripe(String apiKey, String webhookSecret) {
    }

    /** Price per checkout currency in minor units, e.g. PLN: 1900, EUR: 499. */
    public record Report(Map<CurrencyCode, Long> priceMinor, String storageDir) {
    }

    /**
     * Address search and road routing. Defaults to the public OpenStreetMap services (Nominatim, OSRM); production
     * should point these at self-hosted instances or a commercial provider with the same API. Empty URL = disabled
     * (the built-in city list and the great-circle estimate are used instead).
     */
    public record Geo(String geocoderUrl, String routerUrl, String userAgent, Duration timeout) {

        public Geo {
            timeout = timeout == null ? Duration.ofSeconds(4) : timeout;
            userAgent = userAgent == null ? "carimport" : userAgent;
        }
    }

    /** VIN decoding (NHTSA vPIC) and CO₂ lookup (US EPA fueleconomy.gov); empty URL = that source is off. */
    public record Vehicle(String vpicUrl, String epaUrl, String userAgent, Duration timeout) {

        public Vehicle {
            timeout = timeout == null ? Duration.ofSeconds(6) : timeout;
            userAgent = userAgent == null ? "carimport" : userAgent;
        }
    }

    public Vehicle vehicle() {
        return vehicle == null ? new Vehicle(null, null, null, null) : vehicle;
    }

    public Geo geo() {
        return geo == null ? new Geo(null, null, null, null) : geo;
    }

    /**
     * An affiliate placement. {@code origins}/{@code countries} empty = everywhere. {@code url} may contain
     * {@code {locale}} and {@code {subId}} placeholders.
     */
    public record AffiliateOffer(String id, String kind, String partner, String url, List<String> origins,
                                 List<String> countries, List<String> locales, int priority) {
    }
}
