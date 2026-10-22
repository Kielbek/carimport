package com.carimport.geo;

import com.carimport.config.AppProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

/**
 * OSRM table service: one request returns the driving distance from every EU port to the buyer's address.
 * See https://project-osrm.org/docs/v5.24.0/api/#table-service
 */
public class OsrmRoutingEngine implements RoutingEngine {

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Table(String code, List<List<Double>> distances) {
    }

    private final RestClient http;

    public OsrmRoutingEngine(RestClient.Builder builder, AppProperties.Geo props) {
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory();
        factory.setReadTimeout(props.timeout());
        this.http = builder.clone()
                .baseUrl(props.routerUrl())
                .requestFactory(factory)
                .defaultHeader("User-Agent", props.userAgent())
                .build();
    }

    @Override
    public Optional<List<Integer>> drivingKm(List<GeoPoint> origins, GeoPoint destination) {
        List<GeoPoint> all = new ArrayList<>(origins);
        all.add(destination);
        String coordinates = all.stream()
                .map(p -> String.format(Locale.ROOT, "%.5f,%.5f", p.lon(), p.lat()))
                .collect(Collectors.joining(";"));
        String sources = IntStream.range(0, origins.size()).mapToObj(String::valueOf).collect(Collectors.joining(";"));
        Table table = http.get()
                .uri("/table/v1/driving/{coordinates}?sources={sources}&destinations={destination}&annotations=distance",
                        coordinates, sources, origins.size())
                .retrieve()
                .body(Table.class);
        if (table == null || !"Ok".equals(table.code()) || table.distances() == null
                || table.distances().size() != origins.size()) {
            return Optional.empty();
        }
        return Optional.of(table.distances().stream()
                .map(row -> row.isEmpty() || row.getFirst() == null ? null : (int) Math.round(row.getFirst() / 1000))
                .toList());
    }
}
