package com.carimport.calculation.registration;

import com.carimport.domain.FuelType;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * One-off national tax at first registration, by country of registration (Polish excise is {@code PolishExciseStrategy}
 * and is not repeated here). Each formula is the published schedule simplified to what the wizard knows - WLTP CO₂,
 * power, fuel, age and the customs value - so the result is an estimate: weight surcharges, regional variants and
 * special exemptions are left out and named in {@link Assessment#method()}.
 *
 * Three kinds of countries:
 * <ul>
 *   <li>{@link #NONE} - no registration tax at all (only the small statutory fees in destination_fee);</li>
 *   <li>modelled - {@link #assess} returns an amount;</li>
 *   <li>{@link #OFFICIAL_CALCULATOR} - a tax exists but its schedule is too detailed to estimate honestly from these
 *   inputs; the buyer types the amount from the official calculator.</li>
 * </ul>
 */
public final class RegistrationTaxes {

    /** What the formula needs; values are in the currency of the registration country. */
    public record Input(String country, FuelType fuel, int co2, int powerKw, int engineCc, int massKg, int ageYears,
                        BigDecimal netValue, BigDecimal vatRate) {

        /** Value including VAT - the base of the Nordic and Irish taxes. */
        BigDecimal grossValue() {
            return netValue.multiply(BigDecimal.ONE.add(vatRate));
        }
    }

    /** @param rate effective rate where the tax is a percentage of value, else null; method = how it was computed */
    public record Assessment(BigDecimal amount, BigDecimal rate, String method) {
    }

    /** LV: only the CSDD registration fee (~15-20 €) and the annual operation tax - no one-off tax at registration. */
    public static final Set<String> NONE = Set.of("BG", "CZ", "DE", "LU", "LV", "RO", "SE");

    /** Countries with a registration tax we do not estimate, with the official place to compute it. */
    /**
     * Countries whose tax depends on data the wizard cannot have or whose schedule could not be verified: HR (PPMV
     * value component from the new-car list price), GR (scale on the pre-depreciation retail value), CY (no published
     * schedule), MT (percentages of Transport Malta's own registration value and the car's length).
     */
    public static final Map<String, String> OFFICIAL_CALCULATOR = Map.of(
            "CY", "https://www.mof.gov.cy/mof/customs/customs.nsf",
            "GR", "https://www.aade.gr",
            "HR", "https://www.porezna-uprava.hr",
            "MT", "https://www.transport.gov.mt");

    public static Optional<Assessment> assess(Input in) {
        Assessment a = switch (in.country()) {
            case "AT" -> austria(in);
            case "BE" -> belgium(in);
            case "DK" -> denmark(in);
            case "EE" -> estonia(in);
            case "ES" -> spain(in);
            case "FI" -> finland(in);
            case "FR" -> france(in);
            case "IE" -> ireland(in);
            case "IT" -> italy(in);
            case "NL" -> netherlands(in);
            case "PT" -> portugal(in);
            case "SI" -> slovenia(in);
            case "SK" -> slovakia(in);
            case "LT" -> lithuania(in);
            case "HU" -> hungary(in);
            default -> null;
        };
        return Optional.ofNullable(a).map(x -> new Assessment(x.amount().setScale(0, RoundingMode.HALF_UP).max(BigDecimal.ZERO),
                x.rate(), x.method()));
    }

    public static boolean modelled(String country) {
        return switch (country) {
            case "AT", "BE", "DK", "EE", "ES", "FI", "FR", "HU", "IE", "IT", "LT", "NL", "PT", "SI", "SK" -> true;
            default -> false;
        };
    }

    /**
     * NoVA 2026: (CO₂ − 91) / 5 % of the net value, rounded to whole percent, max 80 %, malus 80 € per g above 155,
     * minus 350 €. The 91 g deduction drops by 3 g every 1 January (88 g in 2027).
     */
    static Assessment austria(Input in) {
        if (in.fuel().isZeroEmission()) {
            return new Assessment(BigDecimal.ZERO, BigDecimal.ZERO, "NOVA_ZERO_EMISSION");
        }
        double pct = Math.min(80, Math.max(0, Math.round((in.co2() - 91) / 5.0)));
        double tax = in.netValue().doubleValue() * pct / 100 + Math.max(0, in.co2() - 155) * 80.0 - 350;
        return new Assessment(bd(tax), bd(pct / 100), "NOVA_2026");
    }

    /**
     * Wallonia / Brussels taxe de mise en circulation by power, reduced 10 % a year down to 61.50 €. Flanders uses a
     * CO₂ formula instead - usually within the same order of magnitude for an average car.
     */
    static Assessment belgium(Input in) {
        int kw = in.powerKw();
        double base = kw <= 70 ? 61.5 : kw <= 85 ? 123 : kw <= 100 ? 495 : kw <= 110 ? 867 : kw <= 120 ? 1239
                : kw <= 155 ? 2478 : 4957;
        double factor = Math.max(0.1, 1 - 0.1 * Math.min(in.ageYears(), 15));
        return new Assessment(bd(Math.max(61.5, base * factor)), null, "BE_TMC_WAL_BRU");
    }

    /**
     * Registreringsafgift 2026 (DKK): 25 % / 85 % / 150 % value bands of the price incl. VAT, CO₂ supplement 294 / 587 /
     * 1 115 kr per g above 0 / 107 / 137 g, minus the 25 500 kr deduction.
     */
    static Assessment denmark(Input in) {
        double v = in.grossValue().doubleValue();
        double value = 0.25 * Math.min(v, 75_100) + 0.85 * clamp(v - 75_100, 0, 233_300 - 75_100)
                + 1.5 * Math.max(0, v - 233_300);
        int g = in.co2();
        double co2 = 294.0 * Math.min(g, 107) + 587.0 * clamp(g - 107, 0, 30) + 1115.0 * Math.max(0, g - 137);
        double tax = Math.max(0, value + co2 - 25_500);
        if (in.fuel().isZeroEmission()) {
            tax *= 0.4; // phase-in share for zero-emission cars
        }
        return new Assessment(bd(tax), null, "DK_REG_2026");
    }

    /**
     * Registreerimistasu: 300 € + 5 / 40 / 60 / 80 € per g in the 1-117 / 118-150 / 151-200 / 201+ bands + 4 € per kg
     * above 2 000 kg (2 400 kg for EVs), capped at 4 000 €, all scaled by age down to 0.2 at 15 years.
     */
    static Assessment estonia(Input in) {
        int g = in.co2();
        double co2 = 5.0 * Math.min(g, 117) + 40.0 * clamp(g - 117, 0, 33) + 60.0 * clamp(g - 150, 0, 50)
                + 80.0 * Math.max(0, g - 200);
        int massFrom = in.fuel().isZeroEmission() ? 2400 : in.fuel() == FuelType.PHEV ? 2200 : 2000;
        double mass = Math.min(4000, 4.0 * Math.max(0, in.massKg() - massFrom));
        double age = Math.max(0.2, 1 - 0.8 * Math.min(in.ageYears(), 15) / 15.0);
        return new Assessment(bd((300 + co2 + mass) * age), null, "EE_REG_2025");
    }

    /** IEDMT (Spain, mainland): 0 % up to 120 g, 4.75 % to 159 g, 9.75 % to 199 g, 14.75 % from 200 g. */
    static Assessment spain(Input in) {
        int g = in.co2();
        double pct = g <= 120 ? 0 : g < 160 ? 4.75 : g < 200 ? 9.75 : 14.75;
        return new Assessment(bd(in.netValue().doubleValue() * pct / 100), bd(pct / 100), "ES_IEDMT");
    }

    /** Autovero: CO₂-dependent % of the retail value incl. VAT (0 % at 0 g, ~9.5 % at 120 g, ~29.7 % at 200 g). */
    static Assessment finland(Input in) {
        double pct = interpolate(in.co2(), new double[][] {
                {0, 0}, {50, 3.9}, {100, 6.8}, {120, 9.5}, {145, 15.3}, {160, 20.0}, {200, 29.7}, {360, 48.9}});
        return new Assessment(bd(in.grossValue().doubleValue() * pct / 100), bd(pct / 100), "FI_AUTOVERO");
    }

    /**
     * France: malus CO₂ 2026 (from 108 g, 80 000 € cap above 191 g; minus 10 % for every started year of age) plus the
     * regional tax of ~55 € per fiscal horsepower (CV = CO₂/45 + (kW/40)^1.6; half for cars over 10 years).
     * Plus the 2026 weight malus: 10 / 15 / 20 / 25 / 30 € per kg in the 1 500 / 1 700 / 1 800 / 1 900 / 2 000 kg
     * bands (marginal), same age reduction; zero-emission cars are exempt.
     */
    static Assessment france(Input in) {
        double malus = in.fuel().isZeroEmission() ? 0 : interpolate(in.co2(), new double[][] {
                {107, 0}, {108, 50}, {113, 170}, {124, 450}, {131, 1074}, {140, 2205}, {150, 4279},
                {160, 7577}, {170, 12_460}, {180, 19_385}, {191, 30_000}, {192, 80_000}});
        double kg = in.massKg();
        double weight = in.fuel().isZeroEmission() ? 0
                : 10.0 * clamp(kg - 1500, 0, 200) + 15.0 * clamp(kg - 1700, 0, 100) + 20.0 * clamp(kg - 1800, 0, 100)
                + 25.0 * clamp(kg - 1900, 0, 100) + 30.0 * Math.max(0, kg - 2000);
        malus = (malus + weight) * Math.max(0, 1 - 0.1 * in.ageYears());
        double cv = Math.round(in.co2() / 45.0 + Math.pow(in.powerKw() / 40.0, 1.6));
        double regional = Math.max(1, cv) * 55 * (in.ageYears() > 10 ? 0.5 : 1);
        return new Assessment(bd(malus + regional), null, "FR_MALUS_2026");
    }

    /** VRT: 7-41 % of the open-market price incl. VAT by 20 WLTP CO₂ bands (NOx charge not included). */
    static Assessment ireland(Input in) {
        int g = in.co2();
        int[] upTo = {50, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 170, 190};
        double[] pct = {7, 9, 9.75, 10.5, 11.25, 12, 12.75, 13.5, 15.25, 16, 16.75, 17.5, 19.25, 20, 21.5, 25, 27.5, 30,
                35, 41};
        int band = 0;
        while (band < upTo.length && g > upTo[band]) {
            band++;
        }
        double rate = pct[band];
        double tax = in.grossValue().doubleValue() * rate / 100;
        if (in.fuel().isZeroEmission()) {
            tax = Math.max(0, tax - 5_000);
        }
        return new Assessment(bd(tax), bd(rate / 100), "IE_VRT");
    }

    /** IPT: 150.81 € up to 53 kW, else 3.5119 € per kW, with the usual +30 % provincial surcharge. */
    static Assessment italy(Input in) {
        double ipt = in.powerKw() <= 53 ? 150.81 : 3.5119 * in.powerKw();
        return new Assessment(bd(ipt * 1.3), null, "IT_IPT");
    }

    /**
     * BPM 2026: 687 € + per-gram bands (2 / 82 / 181 / 297 / 594 € above 0 / 77 / 100 / 139 / 155 g) plus the diesel
     * surcharge of 114.83 € per g above 69, reduced by the flat-rate depreciation table for used imports.
     */
    static Assessment netherlands(Input in) {
        int g = in.co2();
        double gross;
        if (g <= 77) {
            gross = 687 + 2.0 * g;
        } else if (g <= 100) {
            gross = 841 + 82.0 * (g - 77);
        } else if (g <= 139) {
            gross = 2_727 + 181.0 * (g - 100);
        } else if (g <= 155) {
            gross = 9_786 + 297.0 * (g - 139);
        } else {
            gross = 14_538 + 594.0 * (g - 155);
        }
        if (in.fuel() == FuelType.DIESEL) {
            gross += 114.83 * Math.max(0, g - 69);
        }
        if (in.fuel().isZeroEmission()) {
            gross = 687;
        }
        double depreciation = interpolate(in.ageYears() * 12, new double[][] {
                {0, 0}, {1, 12}, {3, 20}, {5, 27}, {9, 33}, {18, 42}, {30, 51}, {42, 57}, {54, 62}, {66, 67},
                {78, 72}, {90, 75}, {102, 78}, {114, 81}, {300, 97}});
        return new Assessment(bd(gross * (1 - depreciation / 100)), null, "NL_BPM_2026");
    }

    /**
     * ISV: cylinder component + WLTP CO₂ component (petrol or diesel table), +500 € for diesel, reduced by age
     * (10 % under a year up to 80 % over ten), minimum 100 €. Hybrids pay 60 % (plug-ins 25 %), EVs nothing.
     */
    static Assessment portugal(Input in) {
        if (in.fuel().isZeroEmission()) {
            return new Assessment(BigDecimal.ZERO, null, "PT_ISV");
        }
        int cc = in.engineCc();
        double cylinder = cc <= 1000 ? 1.09 * cc - 849.03 : cc <= 1250 ? 1.18 * cc - 850.69 : 5.61 * cc - 6_194.88;
        int g = in.co2();
        double env;
        if (in.fuel() == FuelType.DIESEL) {
            env = g <= 110 ? 1.72 * g - 11.50 : g <= 120 ? 18.96 * g - 1_906.19 : g <= 140 ? 65.04 * g - 7_360.85
                    : g <= 150 ? 127.40 * g - 16_080.57 : g <= 160 ? 160.81 * g - 21_176.06
                    : g <= 170 ? 221.69 * g - 30_962.48 : g <= 190 ? 274.08 * g - 39_976.39 : 282.35 * g - 41_291.42;
        } else {
            env = g <= 110 ? 0.44 * g - 43.02 : g <= 115 ? 1.10 * g - 115.80 : g <= 120 ? 1.38 * g - 147.79
                    : g <= 130 ? 5.27 * g - 619.17 : g <= 145 ? 6.38 * g - 762.73 : g <= 175 ? 41.54 * g - 5_819.56
                    : g <= 195 ? 51.38 * g - 7_247.39 : g <= 235 ? 193.01 * g - 34_190.52 : 233.81 * g - 41_910.96;
        }
        double tax = Math.max(0, cylinder) + env + (in.fuel() == FuelType.DIESEL ? 500 : 0);
        if (in.fuel() == FuelType.PHEV) {
            tax *= 0.25;
        } else if (in.fuel() == FuelType.HEV || in.fuel() == FuelType.MHEV) {
            tax *= 0.6;
        }
        int[] years = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        double[] cut = {10, 20, 28, 35, 43, 52, 60, 65, 70, 75};
        double reduction = 80;
        for (int i = 0; i < years.length; i++) {
            if (in.ageYears() < years[i]) {
                reduction = cut[i];
                break;
            }
        }
        return new Assessment(bd(Math.max(100, tax * (1 - reduction / 100))), null, "PT_ISV");
    }

    /** DMV: % of the value by CO₂ band, petrol 0.5-28 %, diesel 1-31 %. */
    static Assessment slovenia(Input in) {
        int g = in.co2();
        int[] upTo = {110, 120, 130, 150, 170, 190, 210, 230, 250};
        double[] petrol = {0.5, 1, 1.5, 3, 6, 9, 13, 18, 23, 28};
        double[] diesel = {1, 2, 3, 5, 8, 11, 15, 20, 25, 31};
        int band = 0;
        while (band < upTo.length && g > upTo[band]) {
            band++;
        }
        double rate = (in.fuel() == FuelType.DIESEL ? diesel : petrol)[band];
        return new Assessment(bd(in.netValue().doubleValue() * rate / 100), bd(rate / 100), "SI_DMV");
    }

    /**
     * Slovakia (fee item 65, Act 145/1995, since 1 July 2023): power band × ecological coefficient of the emission
     * class, at least 33 €; electric cars a flat 33 €. A car from outside the EU has no Euro class in its papers - the
     * class of its model year is used (6d from 2018, 6b-c 2015-17, 5 2011-14, 4 2006-10, 3 2001-05, 2 1997-2000).
     */
    static Assessment slovakia(Input in) {
        if (in.fuel().isZeroEmission()) {
            return new Assessment(bd(33), null, "SK_POPLATOK");
        }
        int kw = in.powerKw();
        double base = kw <= 80 ? 33 : kw <= 90 ? 60 : kw <= 100 ? 90 : kw <= 110 ? 120 : kw <= 125 ? 200
                : kw <= 140 ? 300 : kw <= 155 ? 500 : kw <= 170 ? 700 : kw <= 210 ? 900 : 1000;
        int age = in.ageYears();
        double ecological = in.fuel() == FuelType.PHEV ? 0.20
                : age >= 40 ? 0.10 : age <= 8 ? 0.40 : age <= 11 ? 0.45 : age <= 15 ? 0.50 : age <= 20 ? 0.60
                : age <= 25 ? 0.70 : age <= 29 ? 0.80 : 1.00;
        return new Assessment(bd(Math.max(33, base * ecological)), bd(ecological), "SK_POPLATOK");
    }

    /**
     * Lithuania (pollution tax at registration, 2026): nothing up to 130 g/km, then 21.63 € per started 10 g band
     * for petrol and hybrids, twice that for diesel, 90 % for gas; electric and plug-ins free.
     */
    static Assessment lithuania(Input in) {
        if (in.fuel().isZeroEmission() || in.fuel() == FuelType.PHEV) {
            return new Assessment(BigDecimal.ZERO, null, "LT_TARSA_2026");
        }
        int bands = (int) Math.ceil(Math.max(0, in.co2() - 130) / 10.0);
        double factor = in.fuel() == FuelType.DIESEL ? 2 : in.fuel() == FuelType.LPG ? 0.9 : 1;
        return new Assessment(bd(bands * 21.63 * factor), null, "LT_TARSA_2026");
    }

    /**
     * Hungary (since 1 March 2025, HUF): 47 000 Ft × a multiplier for power and environmental class × (1 − the
     * statutory depreciation for the months since first registration). Multipliers for the best class: 1 up to
     * 80 kW, 1.5 to 100, 2 to 120, 3 to 140, 4.5 to 180, 6 to 250, 9 above; older classes multiply them by 1.5 /
     * 6 / 12 / 24. The bands above 140 kW are an estimate; electric cars are exempt.
     */
    static Assessment hungary(Input in) {
        if (in.fuel().isZeroEmission()) {
            return new Assessment(BigDecimal.ZERO, null, "HU_REGADO_2026");
        }
        int kw = in.powerKw();
        double power = kw <= 80 ? 1 : kw <= 100 ? 1.5 : kw <= 120 ? 2 : kw <= 140 ? 3 : kw <= 180 ? 4.5
                : kw <= 250 ? 6 : 9;
        int age = in.ageYears();
        boolean hybrid = in.fuel() == FuelType.HEV || in.fuel() == FuelType.MHEV || in.fuel() == FuelType.PHEV;
        double environment = hybrid || age <= 11 ? 1 : age <= 15 ? 1.5 : age <= 20 ? 6 : age <= 25 ? 12 : 24;
        // only the model year is known - assume first registration in its middle
        double depreciation = 0.01 * interpolateSteps(age * 12 + 6, new int[] {
                0, 1, 3, 5, 7, 13, 19, 25, 31, 37, 49, 61, 73, 85, 97, 109, 121, 133, 145, 157, 169}, new double[] {
                0, 3, 8, 13, 18, 23, 28, 33, 38, 45, 53, 59, 65, 70, 74, 78, 81, 84, 86, 88, 90});
        return new Assessment(bd(47_000 * power * environment * (1 - depreciation)), null, "HU_REGADO_2026");
    }

    /** Step lookup: the value of the last threshold not above {@code x}. */
    private static double interpolateSteps(int x, int[] from, double[] value) {
        double v = value[0];
        for (int i = 0; i < from.length; i++) {
            if (x >= from[i]) {
                v = value[i];
            }
        }
        return v;
    }

    private static double clamp(double v, double min, double max) {
        return Math.max(min, Math.min(max, v));
    }

    /** Piecewise-linear lookup, flat beyond the last point. */
    static double interpolate(double x, double[][] points) {
        if (x <= points[0][0]) {
            return points[0][1];
        }
        for (int i = 1; i < points.length; i++) {
            if (x <= points[i][0]) {
                double[] a = points[i - 1];
                double[] b = points[i];
                return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
            }
        }
        return points[points.length - 1][1];
    }

    private static BigDecimal bd(double v) {
        return BigDecimal.valueOf(v);
    }

    private RegistrationTaxes() {
    }
}
