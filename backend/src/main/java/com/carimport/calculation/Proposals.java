package com.carimport.calculation;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import com.carimport.domain.TitleType;
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
    private static final Map<String, Money> LIABILITY = Map.of(
            "PL", Money.of(new BigDecimal("1200"), CurrencyCode.PLN),
            "DE", Money.of(new BigDecimal("520"), CurrencyCode.EUR),
            "NL", Money.of(new BigDecimal("650"), CurrencyCode.EUR),
            "CZ", Money.of(new BigDecimal("6500"), CurrencyCode.CZK),
            "SE", Money.of(new BigDecimal("4800"), CurrencyCode.SEK),
            "DK", Money.of(new BigDecimal("4200"), CurrencyCode.DKK),
            "HU", Money.of(new BigDecimal("110000"), CurrencyCode.HUF),
            "RO", Money.of(new BigDecimal("1400"), CurrencyCode.RON));

    private static final Money LIABILITY_DEFAULT = Money.of(new BigDecimal("450"), CurrencyCode.EUR);

    public static Money liabilityInsurance(String destinationCountry) {
        return LIABILITY.getOrDefault(destinationCountry, LIABILITY_DEFAULT);
    }

    private Proposals() {
    }
}
