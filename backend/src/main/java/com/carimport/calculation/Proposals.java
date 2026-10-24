package com.carimport.calculation;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.FuelType;
import com.carimport.domain.Money;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import java.math.BigDecimal;
import java.util.Map;

/**
 * Starting values for the amounts only the buyer can know exactly. They are applied when the request leaves the field
 * empty and are always shown to the user as an editable proposal.
 */
public final class Proposals {

    /**
     * Typical repair cost as a share of the hammer price for auction cars, by condition (title adds cosmetic and
     * airbag/safety work that a salvage car almost always needs).
     */
    public static BigDecimal repairShare(VehicleCondition condition, TitleType title) {
        return switch (condition) {
            case RUN_AND_DRIVE -> title == TitleType.SALVAGE ? new BigDecimal("0.15") : BigDecimal.ZERO;
            case ENGINE_STARTS -> new BigDecimal("0.30");
            case NON_RUNNING -> new BigDecimal("0.40");
        };
    }

    /** First-year third-party liability premium for a newly registered import (median offer, private buyer). */
    private static final Map<String, Money> LIABILITY = Map.ofEntries(
            Map.entry("PL", Money.of(new BigDecimal("1200"), CurrencyCode.PLN)),
            Map.entry("CZ", Money.of(new BigDecimal("6500"), CurrencyCode.CZK)),
            Map.entry("SE", Money.of(new BigDecimal("4800"), CurrencyCode.SEK)),
            Map.entry("DK", Money.of(new BigDecimal("4200"), CurrencyCode.DKK)),
            Map.entry("HU", Money.of(new BigDecimal("110000"), CurrencyCode.HUF)),
            Map.entry("RO", Money.of(new BigDecimal("1400"), CurrencyCode.RON)),
            Map.entry("AT", Money.of(new BigDecimal("600"), CurrencyCode.EUR)),
            Map.entry("BE", Money.of(new BigDecimal("650"), CurrencyCode.EUR)),
            Map.entry("BG", Money.of(new BigDecimal("250"), CurrencyCode.EUR)),
            Map.entry("CY", Money.of(new BigDecimal("400"), CurrencyCode.EUR)),
            Map.entry("DE", Money.of(new BigDecimal("520"), CurrencyCode.EUR)),
            Map.entry("EE", Money.of(new BigDecimal("300"), CurrencyCode.EUR)),
            Map.entry("ES", Money.of(new BigDecimal("550"), CurrencyCode.EUR)),
            Map.entry("FI", Money.of(new BigDecimal("450"), CurrencyCode.EUR)),
            Map.entry("FR", Money.of(new BigDecimal("600"), CurrencyCode.EUR)),
            Map.entry("GR", Money.of(new BigDecimal("350"), CurrencyCode.EUR)),
            Map.entry("HR", Money.of(new BigDecimal("350"), CurrencyCode.EUR)),
            Map.entry("IE", Money.of(new BigDecimal("900"), CurrencyCode.EUR)),
            Map.entry("IT", Money.of(new BigDecimal("900"), CurrencyCode.EUR)),
            Map.entry("LT", Money.of(new BigDecimal("300"), CurrencyCode.EUR)),
            Map.entry("LU", Money.of(new BigDecimal("600"), CurrencyCode.EUR)),
            Map.entry("LV", Money.of(new BigDecimal("250"), CurrencyCode.EUR)),
            Map.entry("MT", Money.of(new BigDecimal("450"), CurrencyCode.EUR)),
            Map.entry("NL", Money.of(new BigDecimal("650"), CurrencyCode.EUR)),
            Map.entry("PT", Money.of(new BigDecimal("350"), CurrencyCode.EUR)),
            Map.entry("SI", Money.of(new BigDecimal("400"), CurrencyCode.EUR)),
            Map.entry("SK", Money.of(new BigDecimal("300"), CurrencyCode.EUR)));

    private static final Money LIABILITY_DEFAULT = Money.of(new BigDecimal("450"), CurrencyCode.EUR);

    public static Money liabilityInsurance(String destinationCountry) {
        return LIABILITY.getOrDefault(destinationCountry, LIABILITY_DEFAULT);
    }

    /**
     * Typical WLTP CO₂ when the buyer does not have the CoC figure: rises with displacement, SUVs and vans +12 %.
     * A 2.0 petrol lands near 175 g, a 5.0 V8 near 295 g, a 2.0 diesel near 155 g.
     */
    public static int co2(FuelType fuel, int engineCc, VehicleCategory category) {
        double g = switch (fuel) {
            case EV, HYDROGEN -> 0;
            case PHEV -> 35;
            case HEV -> 95 + engineCc * 0.02;
            case MHEV -> 110 + engineCc * 0.025;
            case DIESEL -> 85 + engineCc * 0.035;
            case LPG -> 0.9 * (95 + engineCc * 0.04);
            case PETROL -> 95 + engineCc * 0.04;
        };
        if (category == VehicleCategory.SUV || category == VehicleCategory.VAN || category == VehicleCategory.PICKUP_TRUCK) {
            g *= 1.12;
        }
        return (int) Math.round(g);
    }

    /** Typical power: about 75 kW per litre for combustion engines, 150 kW for an EV. */
    public static int powerKw(FuelType fuel, int engineCc) {
        if (fuel.isZeroEmission() || engineCc <= 0) {
            return 150;
        }
        int perLitre = fuel == FuelType.DIESEL ? 65 : 75;
        return Math.max(40, (int) Math.round(engineCc / 1000.0 * perLitre));
    }

    private Proposals() {
    }
}
