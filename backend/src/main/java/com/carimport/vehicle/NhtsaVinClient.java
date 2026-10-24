package com.carimport.vehicle;

import com.carimport.config.AppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * NHTSA vPIC - the US government VIN database (free, no key): make, model, trim, body, engine, fuel, power and weight
 * class for vehicles built for North America, and partial data for many others.
 * {@code GET /vehicles/DecodeVinValues/{vin}?format=json} returns one flat object of strings in {@code Results}.
 */
@Component
public class NhtsaVinClient {

    private final RestClient http;
    private final boolean enabled;

    /** For tests: a client already pointed at a stub server. */
    NhtsaVinClient(RestClient http) {
        this.http = http;
        this.enabled = true;
    }

    @Autowired
    public NhtsaVinClient(RestClient.Builder builder, AppProperties props) {
        AppProperties.Vehicle cfg = props.vehicle();
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory();
        factory.setReadTimeout(cfg.timeout());
        this.enabled = cfg.vpicUrl() != null && !cfg.vpicUrl().isBlank();
        this.http = builder.clone().baseUrl(enabled ? cfg.vpicUrl() : "http://localhost").requestFactory(factory)
                .defaultHeader("User-Agent", cfg.userAgent()).build();
    }

    /** The flat result object, or empty when the service is disabled or answered nothing usable. */
    public Optional<JsonNode> decode(String vin) {
        if (!enabled) {
            return Optional.empty();
        }
        JsonNode body = http.get()
                .uri(b -> b.path("/vehicles/DecodeVinValues/{vin}").queryParam("format", "json").build(vin))
                .retrieve()
                .body(JsonNode.class);
        if (body == null || !body.path("Results").isArray() || body.path("Results").isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(body.path("Results").get(0));
    }
}
