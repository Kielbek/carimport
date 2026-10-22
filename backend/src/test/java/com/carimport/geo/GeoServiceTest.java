package com.carimport.geo;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class GeoServiceTest {

    static final GeoPoint GDYNIA = new GeoPoint(54.533, 18.55);
    static final GeoPoint BREMERHAVEN = new GeoPoint(53.552, 8.578);
    static final GeoPoint WARSZAWA = new GeoPoint(52.2297, 21.0122);

    final LocalGazetteer gazetteer = new LocalGazetteer(new ObjectMapper());

    @Test
    void gazetteerIgnoresCaseAndDiacritics() {
        List<Place> found = gazetteer.search("lodz", "pl", 5);

        assertThat(found).isNotEmpty();
        assertThat(found.getFirst().label()).isEqualTo("Łódź, Polska");
        assertThat(found.getFirst().countryCode()).isEqualTo("PL");
        assertThat(gazetteer.search("Gorzów", "en", 5).getFirst().label()).isEqualTo("Gorzów Wielkopolski, Poland");
    }

    @Test
    void fallsBackToTheGazetteerWhenTheGeocoderFails() {
        Geocoder down = (q, lang, limit) -> {
            throw new IllegalStateException("429 Too Many Requests");
        };
        GeoService geo = new GeoService(down, null, gazetteer);

        assertThat(geo.search("Krak", "pl")).extracting(Place::label).contains("Kraków, Polska");
    }

    @Test
    void usesRoutedDistancesAndEstimatesTheGaps() {
        RoutingEngine router = (origins, to) -> Optional.of(Arrays.asList(347, null));
        GeoService geo = new GeoService(null, router, gazetteer);

        List<GeoService.Distance> d = geo.distances(List.of(GDYNIA, BREMERHAVEN), WARSZAWA);

        assertThat(d.get(0)).isEqualTo(new GeoService.Distance(347, GeoService.Method.ROUTED));
        assertThat(d.get(1).method()).isEqualTo(GeoService.Method.ESTIMATED);
        assertThat(d.get(1).km()).isEqualTo(RoadDistance.estimateKm(BREMERHAVEN, WARSZAWA)).isBetween(950, 1150);
    }

    @Test
    void estimatesEverythingWithoutARoutingEngine() {
        GeoService geo = new GeoService(null, (origins, to) -> {
            throw new IllegalStateException("timeout");
        }, gazetteer);

        assertThat(geo.distances(List.of(GDYNIA), WARSZAWA))
                .containsExactly(new GeoService.Distance(RoadDistance.estimateKm(GDYNIA, WARSZAWA),
                        GeoService.Method.ESTIMATED));
    }
}
