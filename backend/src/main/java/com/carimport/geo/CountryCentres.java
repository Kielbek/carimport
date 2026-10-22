package com.carimport.geo;

import java.util.Map;
import java.util.Optional;

/**
 * Population-weighted reference point per EU country, used for the "typical" delivery distance before the user gives
 * an address. Mostly the capital; for PL, DE, NL and LT a more central city better represents the average buyer.
 */
public final class CountryCentres {

    private static final Map<String, GeoPoint> CENTRES = Map.ofEntries(
            Map.entry("AT", new GeoPoint(48.2082, 16.3738)),   // Wien
            Map.entry("BE", new GeoPoint(50.8503, 4.3517)),    // Bruxelles
            Map.entry("BG", new GeoPoint(42.6977, 23.3219)),   // Sofia
            Map.entry("HR", new GeoPoint(45.8150, 15.9819)),   // Zagreb
            Map.entry("CY", new GeoPoint(35.1856, 33.3823)),   // Lefkosia
            Map.entry("CZ", new GeoPoint(50.0755, 14.4378)),   // Praha
            Map.entry("DK", new GeoPoint(55.6761, 12.5683)),   // København
            Map.entry("EE", new GeoPoint(59.4370, 24.7536)),   // Tallinn
            Map.entry("FI", new GeoPoint(60.1699, 24.9384)),   // Helsinki
            Map.entry("FR", new GeoPoint(48.8566, 2.3522)),    // Paris
            Map.entry("DE", new GeoPoint(50.1109, 8.6821)),    // Frankfurt am Main
            Map.entry("GR", new GeoPoint(37.9838, 23.7275)),   // Athina
            Map.entry("HU", new GeoPoint(47.4979, 19.0402)),   // Budapest
            Map.entry("IE", new GeoPoint(53.3498, -6.2603)),   // Dublin
            Map.entry("IT", new GeoPoint(43.7696, 11.2558)),   // Firenze
            Map.entry("LV", new GeoPoint(56.9496, 24.1052)),   // Rīga
            Map.entry("LT", new GeoPoint(54.8985, 23.9036)),   // Kaunas
            Map.entry("LU", new GeoPoint(49.6116, 6.1319)),    // Luxembourg
            Map.entry("MT", new GeoPoint(35.8989, 14.5146)),   // Valletta
            Map.entry("NL", new GeoPoint(52.0907, 5.1214)),    // Utrecht
            Map.entry("PL", new GeoPoint(51.7592, 19.4560)),   // Łódź
            Map.entry("PT", new GeoPoint(38.7223, -9.1393)),   // Lisboa
            Map.entry("RO", new GeoPoint(44.4268, 26.1025)),   // București
            Map.entry("SK", new GeoPoint(48.1486, 17.1077)),   // Bratislava
            Map.entry("SI", new GeoPoint(46.0569, 14.5058)),   // Ljubljana
            Map.entry("ES", new GeoPoint(40.4168, -3.7038)),   // Madrid
            Map.entry("SE", new GeoPoint(59.3293, 18.0686)));  // Stockholm

    private CountryCentres() {
    }

    public static Optional<GeoPoint> of(String countryCode) {
        return Optional.ofNullable(countryCode == null ? null : CENTRES.get(countryCode));
    }
}
