package com.carimport.vehicle;

import com.carimport.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * Tailpipe CO₂ from the US EPA fuel-economy database (fueleconomy.gov, free, no key). The VIN does not identify the
 * EPA record directly, so the lookup goes year + make → models whose name starts with the decoded model → engine
 * variants with the same displacement (and cylinder count) → their combined CO₂ in g/mile, averaged.
 */
@Component
public class EpaCo2Client {

    /** "Auto (S10), 8 cyl, 5.0 L" / "Man 6-spd, 4 cyl, 2.3 L, Turbo". */
    private static final Pattern ENGINE = Pattern.compile("(\\d+) cyl, (\\d+\\.\\d) L");
    private static final double METERS_PER_MILE = 1.609344;

    private final RestClient http;
    private final boolean enabled;

    /** For tests: a client already pointed at a stub server. */
    EpaCo2Client(RestClient http) {
        this.http = http;
        this.enabled = true;
    }

    @Autowired
    public EpaCo2Client(RestClient.Builder builder, AppProperties props) {
        AppProperties.Vehicle cfg = props.vehicle();
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory();
        factory.setReadTimeout(cfg.timeout());
        this.enabled = cfg.epaUrl() != null && !cfg.epaUrl().isBlank();
        this.http = builder.clone().baseUrl(enabled ? cfg.epaUrl() : "http://localhost").requestFactory(factory)
                .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("User-Agent", cfg.userAgent()).build();
    }

    /** Combined CO₂ in g/km, if a matching EPA record exists. */
    public Optional<Integer> co2Gkm(int year, String make, String model, Integer engineCc, Integer cylinders) {
        if (!enabled || make == null || model == null) {
            return Optional.empty();
        }
        String wanted = normalize(model);
        List<String> models = new ArrayList<>(items(menu("/vehicle/menu/model", year, make, null)).stream()
                .map(i -> i.path("value").asText())
                .filter(m -> normalize(m).startsWith(wanted))
                .toList());
        models.sort(Comparator.comparingInt(String::length)); // "Mustang" before "Mustang Convertible"
        for (String candidate : models.subList(0, Math.min(3, models.size()))) {
            List<String> ids = new ArrayList<>();
            for (JsonNode option : items(menu("/vehicle/menu/options", year, make, candidate))) {
                if (matchesEngine(option.path("text").asText(), engineCc, cylinders)) {
                    ids.add(option.path("value").asText());
                }
            }
            OptionalDouble gpm = ids.stream()
                    .map(id -> http.get().uri("/vehicle/{id}", id).retrieve().body(JsonNode.class))
                    .filter(v -> v != null && v.path("co2TailpipeGpm").asDouble(0) > 0)
                    .mapToDouble(v -> v.path("co2TailpipeGpm").asDouble())
                    .average();
            if (gpm.isPresent()) {
                return Optional.of((int) Math.round(gpm.getAsDouble() / METERS_PER_MILE));
            }
        }
        return Optional.empty();
    }

    private JsonNode menu(String path, int year, String make, String model) {
        return http.get().uri(b -> {
            b.path(path).queryParam("year", year).queryParam("make", make);
            if (model != null) {
                b.queryParam("model", model);
            }
            return b.build();
        }).retrieve().body(JsonNode.class);
    }

    /** {@code menuItem} is an array, a single object when there is one item, or missing when there is none. */
    private static List<JsonNode> items(JsonNode menu) {
        if (menu == null) {
            return List.of();
        }
        JsonNode item = menu.path("menuItem");
        if (item.isArray()) {
            List<JsonNode> list = new ArrayList<>();
            item.forEach(list::add);
            return list;
        }
        return item.isObject() ? List.of(item) : List.of();
    }

    static boolean matchesEngine(String text, Integer engineCc, Integer cylinders) {
        Matcher m = ENGINE.matcher(text);
        if (!m.find()) {
            return engineCc == null || engineCc == 0; // electric: "Auto (A1)"
        }
        boolean litres = engineCc == null
                || Math.abs(Double.parseDouble(m.group(2)) - engineCc / 1000.0) < 0.051;
        boolean cyl = cylinders == null || Integer.parseInt(m.group(1)) == cylinders;
        return litres && cyl;
    }

    static String normalize(String s) {
        return s.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", "");
    }
}
