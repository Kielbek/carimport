package com.carimport.geo;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.core.io.ClassPathResource;

/**
 * Built-in list of ~300 EU cities (all larger Polish towns, main cities elsewhere). Answers instantly and offline -
 * the fallback when the geocoder is not configured, down or rate-limited. Matching ignores case and diacritics, so
 * "lodz" finds Łódź.
 */
public class LocalGazetteer implements Geocoder {

    private record Entry(String name, String countryCode, double lat, double lon, String key) {
    }

    private final List<Entry> entries;

    public LocalGazetteer(ObjectMapper json) {
        try (InputStream in = new ClassPathResource("geo/eu-places.json").getInputStream()) {
            Object[][] rows = json.readValue(in, Object[][].class);
            this.entries = Arrays.stream(rows)
                    .map(r -> new Entry((String) r[0], (String) r[1], ((Number) r[2]).doubleValue(),
                            ((Number) r[3]).doubleValue(), normalize((String) r[0])))
                    .toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    public List<Place> search(String query, String language, int limit) {
        String q = normalize(query.split(",")[0]);
        if (q.isBlank()) {
            return List.of();
        }
        Locale locale = Locale.forLanguageTag(language);
        return entries.stream()
                .filter(e -> e.key().startsWith(q) || e.key().contains(" " + q) || e.key().contains("-" + q))
                .sorted(Comparator.comparing((Entry e) -> !e.key().startsWith(q)).thenComparing(e -> e.key().length()))
                .limit(limit)
                .map(e -> new Place(e.name() + ", " + Locale.of("", e.countryCode()).getDisplayCountry(locale),
                        e.countryCode(), e.lat(), e.lon()))
                .toList();
    }

    static String normalize(String s) {
        String folded = Normalizer.normalize(s.trim().toLowerCase(Locale.ROOT), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return folded.replace('ł', 'l').replace('ø', 'o').replace('æ', 'a').replace('ß', 's');
    }
}
