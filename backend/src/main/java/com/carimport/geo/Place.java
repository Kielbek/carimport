package com.carimport.geo;

/** A geocoded address or locality. {@code countryCode} is ISO 3166-1 alpha-2, upper case. */
public record Place(String label, String countryCode, double lat, double lon) {

    public GeoPoint point() {
        return new GeoPoint(lat, lon);
    }
}
