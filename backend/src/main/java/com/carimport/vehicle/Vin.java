package com.carimport.vehicle;

import java.time.Year;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * What a VIN tells without any database (ISO 3779 / 49 CFR 565): the manufacturer prefix (WMI), the region it was
 * built for, the model year (10th character) and - for vehicles built for North America, where it is mandatory -
 * whether the check digit (9th character) is right, which catches most typos.
 */
public record Vin(String value) {

    private static final String WEIGHTS = "8765432X098765432";
    private static final String YEAR_CODES = "ABCDEFGHJKLMNPRSTVWXY123456789";

    /** Upper case without spaces and dashes; null if it cannot be a 17-character VIN (I, O and Q are never used). */
    public static Optional<Vin> parse(String raw) {
        if (raw == null) {
            return Optional.empty();
        }
        String v = raw.replaceAll("[\\s-]", "").toUpperCase(Locale.ROOT);
        return v.matches("[A-HJ-NPR-Z0-9]{17}") ? Optional.of(new Vin(v)) : Optional.empty();
    }

    public String wmi() {
        return value.substring(0, 3);
    }

    /** Built for the US, Canada or Mexico market - the check digit is mandatory and NHTSA has the full data. */
    public boolean northAmerican() {
        char c = value.charAt(0);
        return c >= '1' && c <= '5';
    }

    public boolean checkDigitValid() {
        int sum = 0;
        for (int i = 0; i < 17; i++) {
            char w = WEIGHTS.charAt(i);
            sum += transliterate(value.charAt(i)) * (w == 'X' ? 10 : w - '0');
        }
        int r = sum % 11;
        return value.charAt(8) == (r == 10 ? 'X' : (char) ('0' + r));
    }

    /**
     * Model year from the 10th character. The code repeats every 30 years; North American VINs tell the cycle by the
     * 7th character (a digit = 1980-2009, a letter = 2010-2039), elsewhere the latest year not in the future wins.
     */
    public Optional<Integer> modelYear(Year now) {
        int idx = YEAR_CODES.indexOf(value.charAt(9));
        if (idx < 0) {
            return Optional.empty();
        }
        int older = 1980 + idx;
        int newer = older + 30;
        if (northAmerican()) {
            return Optional.of(Character.isDigit(value.charAt(6)) ? older : newer);
        }
        return Optional.of(newer <= now.getValue() + 1 ? newer : older);
    }

    /** ISO 3166 code of the country of manufacture, by the first two characters. */
    public Optional<String> country() {
        char a = value.charAt(0);
        char b = value.charAt(1);
        return Optional.ofNullable(switch (a) {
            case '1', '4', '5' -> "US";
            case '2' -> "CA";
            case '3' -> "MX";
            case 'J' -> "JP";
            case 'K' -> b >= 'L' && b <= 'R' ? "KR" : null;
            case 'L' -> "CN";
            case 'S' -> b <= 'M' ? "GB" : b <= 'T' ? "DE" : null;
            case 'T' -> b <= 'H' ? "CH" : b <= 'P' ? "CZ" : b <= 'V' ? "HU" : null;
            case 'V' -> b <= 'E' ? "AT" : b <= 'R' ? "FR" : b <= 'W' ? "ES" : null;
            case 'W' -> "DE";
            case 'Y' -> b <= 'E' ? "BE" : b <= 'K' ? "FI" : b <= 'V' ? "SE" : null;
            case 'Z' -> b <= 'R' ? "IT" : null;
            case 'U' -> b >= 'U' ? "RO" : null;
            default -> null;
        });
    }

    /** Make by the manufacturer prefix, for the most common import brands. */
    public Optional<String> make() {
        String m = MAKES.get(wmi());
        return Optional.ofNullable(m != null ? m : MAKES.get(value.substring(0, 2)));
    }

    private static int transliterate(char c) {
        if (Character.isDigit(c)) {
            return c - '0';
        }
        return "12345678 12345 7 923456789".charAt(c - 'A') - '0';
    }

    private static final Map<String, String> MAKES = Map.ofEntries(
            Map.entry("1FA", "Ford"), Map.entry("1FM", "Ford"), Map.entry("1FT", "Ford"), Map.entry("1FD", "Ford"),
            Map.entry("2FM", "Ford"), Map.entry("3FA", "Ford"), Map.entry("1LN", "Lincoln"), Map.entry("5LM", "Lincoln"),
            Map.entry("1G1", "Chevrolet"), Map.entry("1GC", "Chevrolet"), Map.entry("1GN", "Chevrolet"),
            Map.entry("2G1", "Chevrolet"), Map.entry("3GN", "Chevrolet"), Map.entry("1GT", "GMC"),
            Map.entry("1GK", "GMC"), Map.entry("1G6", "Cadillac"), Map.entry("1GY", "Cadillac"),
            Map.entry("1C3", "Chrysler"), Map.entry("2C3", "Chrysler"), Map.entry("1C4", "Jeep"),
            Map.entry("1J4", "Jeep"), Map.entry("1C6", "Ram"), Map.entry("3C6", "Ram"), Map.entry("2C4", "Dodge"),
            Map.entry("1B3", "Dodge"), Map.entry("2B3", "Dodge"), Map.entry("5YJ", "Tesla"), Map.entry("7SA", "Tesla"),
            Map.entry("4T1", "Toyota"), Map.entry("5TD", "Toyota"), Map.entry("5TF", "Toyota"), Map.entry("2T1", "Toyota"),
            Map.entry("JTD", "Toyota"), Map.entry("JTE", "Toyota"), Map.entry("JTM", "Toyota"), Map.entry("JTH", "Lexus"),
            Map.entry("2T2", "Lexus"), Map.entry("1HG", "Honda"), Map.entry("2HG", "Honda"), Map.entry("5FN", "Honda"),
            Map.entry("JHM", "Honda"), Map.entry("19U", "Acura"), Map.entry("1N4", "Nissan"), Map.entry("JN1", "Nissan"),
            Map.entry("5N1", "Nissan"), Map.entry("JF1", "Subaru"), Map.entry("4S4", "Subaru"), Map.entry("JM1", "Mazda"),
            Map.entry("5NP", "Hyundai"), Map.entry("KMH", "Hyundai"), Map.entry("5XY", "Kia"), Map.entry("KNA", "Kia"),
            Map.entry("WBA", "BMW"), Map.entry("WBS", "BMW M"), Map.entry("5UX", "BMW"), Map.entry("WDD", "Mercedes-Benz"),
            Map.entry("WDC", "Mercedes-Benz"), Map.entry("W1K", "Mercedes-Benz"), Map.entry("W1N", "Mercedes-Benz"),
            Map.entry("4JG", "Mercedes-Benz"), Map.entry("WAU", "Audi"), Map.entry("WA1", "Audi"),
            Map.entry("WVW", "Volkswagen"), Map.entry("WVG", "Volkswagen"), Map.entry("1VW", "Volkswagen"),
            Map.entry("3VW", "Volkswagen"), Map.entry("WP0", "Porsche"), Map.entry("WP1", "Porsche"),
            Map.entry("SAL", "Land Rover"), Map.entry("SAJ", "Jaguar"), Map.entry("YV1", "Volvo"), Map.entry("YV4", "Volvo"),
            Map.entry("ZFF", "Ferrari"), Map.entry("ZAR", "Alfa Romeo"), Map.entry("ZHW", "Lamborghini"),
            Map.entry("SCF", "Aston Martin"), Map.entry("SCB", "Bentley"), Map.entry("SBM", "McLaren"));
}
