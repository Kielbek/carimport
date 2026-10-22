package com.carimport.geo;

/**
 * Road distance estimate used when no routing engine answers: great-circle distance x detour factor. Across the
 * European motorway network the ratio of driving to straight-line distance is typically 1.2-1.3.
 */
public final class RoadDistance {

    public static final double DETOUR_FACTOR = 1.25;

    private RoadDistance() {
    }

    public static int estimateKm(GeoPoint from, GeoPoint to) {
        return (int) Math.round(from.distanceKm(to) * DETOUR_FACTOR);
    }
}
