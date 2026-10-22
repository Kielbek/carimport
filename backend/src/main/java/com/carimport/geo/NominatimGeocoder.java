package com.carimport.geo;

import com.carimport.config.AppProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

/**
 * Nominatim (OpenStreetMap) search API, restricted to EU countries. The public instance allows ~1 request/s with an
 * identifying User-Agent, which is why the frontend debounces and {@link GeoService} caches.
 * See https://nominatim.org/release-docs/latest/api/Search/
 */
public class NominatimGeocoder implements Geocoder {

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Result(String display_name, String lat, String lon, Map<String, String> address) {
    }

    private static final String COUNTRIES = EuCountries.CODES.stream().map(c -> c.toLowerCase(Locale.ROOT))
            .sorted().collect(Collectors.joining(","));

    private final RestClient http;

    public NominatimGeocoder(RestClient.Builder builder, AppProperties.Geo props) {
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory();
        factory.setReadTimeout(props.timeout());
        this.http = builder.clone()
                .baseUrl(props.geocoderUrl())
                .requestFactory(factory)
                .defaultHeader("User-Agent", props.userAgent())
                .build();
    }

    @Override
    public List<Place> search(String query, String language, int limit) {
        Result[] results = http.get()
                .uri(b -> b.path("/search")
                        .queryParam("q", query)
                        .queryParam("format", "jsonv2")
                        .queryParam("addressdetails", 1)
                        .queryParam("limit", limit)
                        .queryParam("countrycodes", COUNTRIES)
                        .queryParam("accept-language", language)
                        .build())
                .retrieve()
                .body(Result[].class);
        if (results == null) {
            return List.of();
        }
        return Arrays.stream(results)
                .filter(r -> r.address() != null && r.address().get("country_code") != null)
                .map(r -> new Place(r.display_name(), r.address().get("country_code").toUpperCase(Locale.ROOT),
                        Double.parseDouble(r.lat()), Double.parseDouble(r.lon())))
                .toList();
    }
}
