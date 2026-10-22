package com.carimport.geo;

import com.carimport.config.AppProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

/**
 * Address search and port-to-door distances. External providers are optional: without them (or when they fail) the
 * built-in city list and the great-circle x detour-factor estimate keep the calculator working, and every distance
 * says whether it was routed or estimated.
 */
@Service
public class GeoService {

    private static final Logger log = LoggerFactory.getLogger(GeoService.class);

    /** How a distance was obtained. */
    public enum Method {
        ROUTED, ESTIMATED
    }

    public record Distance(int km, Method method) {
    }

    private final Geocoder geocoder;
    private final RoutingEngine router;
    private final LocalGazetteer gazetteer;

    @Autowired
    public GeoService(AppProperties props, RestClient.Builder http, ObjectMapper json) {
        this(isSet(props.geo().geocoderUrl()) ? new NominatimGeocoder(http, props.geo()) : null,
                isSet(props.geo().routerUrl()) ? new OsrmRoutingEngine(http, props.geo()) : null,
                new LocalGazetteer(json));
    }

    public GeoService(Geocoder geocoder, RoutingEngine router, LocalGazetteer gazetteer) {
        this.geocoder = geocoder;
        this.router = router;
        this.gazetteer = gazetteer;
    }

    @Cacheable(cacheNames = "geo", keyGenerator = "methodAwareKeyGenerator")
    public List<Place> search(String query, String language) {
        String q = query.strip();
        if (geocoder != null) {
            try {
                List<Place> found = geocoder.search(q, language, 6);
                if (!found.isEmpty()) {
                    return found;
                }
            } catch (RuntimeException e) {
                log.warn("Geocoder unavailable, using the built-in city list: {}", e.toString());
            }
        }
        return gazetteer.search(q, language, 6);
    }

    /** Road distance from each origin (EU port) to the address, in the order of {@code origins}. */
    @Cacheable(cacheNames = "geo", keyGenerator = "methodAwareKeyGenerator")
    public List<Distance> distances(List<GeoPoint> origins, GeoPoint destination) {
        Optional<List<Integer>> routed = Optional.empty();
        if (router != null && !origins.isEmpty()) {
            try {
                routed = router.drivingKm(origins, destination);
            } catch (RuntimeException e) {
                log.warn("Routing engine unavailable, estimating distances: {}", e.toString());
            }
        }
        List<Distance> result = new ArrayList<>(origins.size());
        for (int i = 0; i < origins.size(); i++) {
            Integer km = routed.isPresent() ? routed.get().get(i) : null;
            result.add(km != null
                    ? new Distance(km, Method.ROUTED)
                    : new Distance(RoadDistance.estimateKm(origins.get(i), destination), Method.ESTIMATED));
        }
        return result;
    }

    private static boolean isSet(String url) {
        return url != null && !url.isBlank();
    }
}
