package com.carimport.vehicle;

import com.carimport.domain.FuelType;
import com.carimport.domain.VehicleCategory;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.Clock;
import java.time.Year;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * VIN → wizard data. The VIN itself gives the model year, make and check digit; NHTSA vPIC adds the specification;
 * the EPA database adds CO₂. Each source is optional: when one fails or does not know the car, the result keeps what
 * the others found and says what is missing, so the buyer knows which fields are still our proposals.
 */
@Service
public class VinService {

    private static final int CACHE_SIZE = 5_000;
    private static final Logger log = LoggerFactory.getLogger(VinService.class);
    private static final double KW_PER_HP = 0.7457;
    private static final double KG_PER_LB = 0.45359237;
    /** Curb weight is about three quarters of the gross vehicle weight rating for cars and light trucks. */
    private static final double CURB_SHARE_OF_GVWR = 0.75;
    private static final Pattern GVWR_KG = Pattern.compile("\\(([\\d,]+)\\s*-\\s*([\\d,]+)\\s*kg\\)");

    private final NhtsaVinClient nhtsa;
    private final EpaCo2Client epa;
    private final Clock clock;
    /** Bounded LRU: a VIN always decodes the same, and the public databases should not see repeated lookups. */
    private final Map<String, VinDecoding> cache = Collections.synchronizedMap(new LinkedHashMap<>(256, 0.75f, true) {
        @Override
        protected boolean removeEldestEntry(Map.Entry<String, VinDecoding> eldest) {
            return size() > CACHE_SIZE;
        }
    });

    public VinService(NhtsaVinClient nhtsa, EpaCo2Client epa, Clock clock) {
        this.nhtsa = nhtsa;
        this.epa = epa;
        this.clock = clock;
    }

    /** Empty when the text cannot be a VIN. Results that hit a network error are not cached. */
    public Optional<VinDecoding> decode(String raw) {
        return Vin.parse(raw).map(vin -> {
            VinDecoding cached = cache.get(vin.value());
            if (cached != null) {
                return cached;
            }
            VinDecoding fresh = decode(vin);
            if (!fresh.warnings().contains("vin.offline")) {
                cache.put(vin.value(), fresh);
            }
            return fresh;
        });
    }

    private VinDecoding decode(Vin vin) {
        List<String> warnings = new ArrayList<>();
        boolean checkOk = vin.checkDigitValid();
        if (!checkOk && vin.northAmerican()) {
            warnings.add("vin.checkDigit");
        }
        Integer year = vin.modelYear(Year.now(clock)).orElse(null);
        String make = vin.make().orElse(null);

        JsonNode found = null;
        try {
            found = nhtsa.decode(vin.value()).orElse(null);
        } catch (RuntimeException e) {
            log.warn("vPIC lookup failed for {}: {}", vin.wmi(), e.toString());
            warnings.add("vin.offline");
        }
        final JsonNode r = found;
        if (r == null || text(r, "Make") == null) {
            if (!warnings.contains("vin.offline")) {
                warnings.add("vin.notFound");
            }
            return new VinDecoding(vin.value(), "OFFLINE", checkOk, year, make, null, null, null, null, null, null,
                    null, null, null, null, null, null, vin.country().orElse(null), warnings);
        }

        year = integer(r, "ModelYear").orElse(year);
        make = titleCase(text(r, "Make"));
        String model = text(r, "Model");
        String trim = Optional.ofNullable(text(r, "Trim")).orElse(text(r, "Series"));
        String body = text(r, "BodyClass");
        FuelType fuel = fuel(r);
        Integer cc = integer(r, "DisplacementCC")
                .or(() -> decimal(r, "DisplacementL").map(l -> (int) Math.round(l * 1000)))
                .orElse(fuel != null && fuel.isZeroEmission() ? 0 : null);
        Integer cylinders = integer(r, "EngineCylinders").orElse(null);
        Integer kw = decimal(r, "EngineKW").map(k -> (int) Math.round(k))
                .or(() -> decimal(r, "EngineHP").map(hp -> (int) Math.round(hp * KW_PER_HP)))
                .orElse(null);

        Integer mass = decimal(r, "CurbWeightLB").map(lb -> (int) Math.round(lb * KG_PER_LB)).orElse(null);
        String massSource = mass != null ? "CURB" : null;
        if (mass == null) {
            mass = gvwrCurbEstimate(text(r, "GVWR")).orElse(null);
            massSource = mass != null ? "GVWR" : null;
        }

        Integer co2 = fuel != null && fuel.isZeroEmission() ? Integer.valueOf(0) : null;
        String co2Source = co2 != null ? "EPA" : null;
        if (co2 == null && year != null) {
            try {
                co2 = epa.co2Gkm(year, make, model, cc, cylinders).orElse(null);
                co2Source = co2 != null ? "EPA" : null;
            } catch (RuntimeException e) {
                log.warn("EPA lookup failed for {} {} {}: {}", year, make, model, e.toString());
            }
            if (co2 == null) {
                warnings.add("vin.noCo2");
            }
        }
        if (kw == null) {
            warnings.add("vin.noPower");
        }
        return new VinDecoding(vin.value(), "NHTSA", checkOk, year, make, model, trim, body, category(r), fuel, cc,
                cylinders, kw, co2, co2Source, mass, massSource, vin.country().orElse(null), warnings);
    }

    static VehicleCategory category(JsonNode r) {
        String type = upper(text(r, "VehicleType"));
        String body = upper(text(r, "BodyClass"));
        if (type.contains("MOTORCYCLE") || body.contains("MOTORCYCLE")) {
            return VehicleCategory.MOTORCYCLE;
        }
        if (body.contains("PICKUP")) {
            return VehicleCategory.PICKUP_TRUCK;
        }
        if (body.contains("VAN")) {
            return VehicleCategory.VAN;
        }
        if (body.contains("SPORT UTILITY") || body.contains("SUV") || body.contains("CROSSOVER")) {
            return VehicleCategory.SUV;
        }
        if (type.contains("TRUCK") && body.isEmpty()) {
            return VehicleCategory.PICKUP_TRUCK;
        }
        return type.isEmpty() && body.isEmpty() ? null : VehicleCategory.PASSENGER_CAR;
    }

    static FuelType fuel(JsonNode r) {
        String el = upper(text(r, "ElectrificationLevel"));
        String primary = upper(text(r, "FuelTypePrimary"));
        if (el.contains("BEV") || primary.equals("ELECTRIC")) {
            return FuelType.EV;
        }
        if (el.contains("PHEV")) {
            return FuelType.PHEV;
        }
        if (el.contains("MILD")) {
            return FuelType.MHEV;
        }
        if (el.contains("HEV")) {
            return FuelType.HEV;
        }
        if (primary.contains("HYDROGEN") || el.contains("FCEV")) {
            return FuelType.HYDROGEN;
        }
        if (primary.contains("DIESEL")) {
            return FuelType.DIESEL;
        }
        if (primary.contains("LIQUEFIED PETROLEUM") || primary.contains("LPG")) {
            return FuelType.LPG;
        }
        if (primary.contains("GASOLINE") || primary.contains("FLEXIBLE") || primary.contains("ETHANOL")) {
            return FuelType.PETROL;
        }
        return null;
    }

    /** "Class 2E: 6,001 - 7,000 lb (2,722 - 3,175 kg)" → 3/4 of the midpoint. */
    static Optional<Integer> gvwrCurbEstimate(String gvwr) {
        if (gvwr == null) {
            return Optional.empty();
        }
        Matcher m = GVWR_KG.matcher(gvwr);
        if (!m.find()) {
            return Optional.empty();
        }
        double lo = Double.parseDouble(m.group(1).replace(",", ""));
        double hi = Double.parseDouble(m.group(2).replace(",", ""));
        return Optional.of((int) (Math.round((lo + hi) / 2 * CURB_SHARE_OF_GVWR / 10.0) * 10));
    }

    private static String text(JsonNode r, String field) {
        String v = r.path(field).asText("").trim();
        return v.isEmpty() || v.equalsIgnoreCase("Not Applicable") ? null : v;
    }

    private static Optional<Double> decimal(JsonNode r, String field) {
        try {
            return Optional.ofNullable(text(r, field)).map(Double::parseDouble).filter(d -> d > 0);
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    private static Optional<Integer> integer(JsonNode r, String field) {
        return decimal(r, field).map(d -> (int) Math.round(d));
    }

    private static String upper(String s) {
        return s == null ? "" : s.toUpperCase(Locale.ROOT);
    }

    /** vPIC writes makes in capitals ("FORD", "MERCEDES-BENZ"). */
    private static String titleCase(String s) {
        if (s == null || s.length() <= 3) {
            return s;
        }
        StringBuilder b = new StringBuilder(s.length());
        boolean start = true;
        for (char c : s.toLowerCase(Locale.ROOT).toCharArray()) {
            b.append(start ? Character.toUpperCase(c) : c);
            start = !Character.isLetterOrDigit(c);
        }
        return b.toString();
    }
}
