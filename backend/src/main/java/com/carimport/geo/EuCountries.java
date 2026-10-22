package com.carimport.geo;

import java.util.Set;

/** EU member states (ISO 3166-1 alpha-2) - the possible destination countries. */
public final class EuCountries {

    public static final Set<String> CODES = Set.of("AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE",
            "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE");

    private EuCountries() {
    }
}
