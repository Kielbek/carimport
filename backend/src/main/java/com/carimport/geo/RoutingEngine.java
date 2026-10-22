package com.carimport.geo;

import java.util.List;
import java.util.Optional;

/** Driving distances by road. */
public interface RoutingEngine {

    /**
     * Driving distance in km from each origin to the destination, in the order of {@code origins}; an element is null
     * when that pair has no route. Empty when the engine could not be asked at all.
     */
    Optional<List<Integer>> drivingKm(List<GeoPoint> origins, GeoPoint destination);
}
