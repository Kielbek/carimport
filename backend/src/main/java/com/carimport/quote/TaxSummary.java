package com.carimport.quote;

import com.carimport.calculation.CalculationResult;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

/**
 * The "back of an envelope" part of a calculation, free for everyone: customs duty, import VAT (in the country of the
 * port), national tax of the country of registration and the port fees - each with its rate and country, rounded to
 * whole units in the display currency. Transport, delivery, registration, hidden costs and the scenario totals are
 * what the paid report adds, so they are not in here.
 *
 * @param duty     customs duty, rate 10% / 22% / ...; same in every EU port
 * @param vat      import VAT at the rate of the country where the car is cleared (rate 0 under procedure 4200)
 * @param national taxes owed in the country of registration whatever the port (e.g. Polish excise)
 * @param portFees terminal handling, devanning and customs agent in that port
 * @param total    sum of the above
 */
public record TaxSummary(Item duty, Item vat, List<Item> national, BigDecimal portFees, BigDecimal total) {

    /** One tax: code (cost.* key), rate as a fraction, the country that levies it, amount. */
    public record Item(String code, BigDecimal rate, String country, BigDecimal amount) {
    }

    private static final List<String> NATIONAL = List.of("EXCISE_TAX", "REGISTRATION_TAX");
    private static final List<String> PORT_FEES = List.of("PORT_UNLOADING", "CUSTOMS_AGENCY");

    public static TaxSummary of(CalculationResult result, String clearanceCountry, String destinationCountry) {
        Item duty = item(result, "CUSTOMS_DUTY", clearanceCountry)
                .orElse(new Item("CUSTOMS_DUTY", null, clearanceCountry, BigDecimal.ZERO));
        Item vat = item(result, "IMPORT_VAT", clearanceCountry)
                .orElse(new Item("IMPORT_VAT", null, clearanceCountry, BigDecimal.ZERO));
        List<Item> national = NATIONAL.stream().flatMap(c -> item(result, c, destinationCountry).stream())
                .filter(i -> i.amount().signum() > 0).toList();
        BigDecimal fees = sum(result, PORT_FEES);
        BigDecimal total = duty.amount().add(vat.amount()).add(fees)
                .add(national.stream().map(Item::amount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return new TaxSummary(duty, vat, national, fees, total);
    }

    private static Optional<Item> item(CalculationResult result, String code, String country) {
        return result.lines().stream()
                .filter(l -> l.line().code().equals(code) && l.line().includedInTotal())
                .findFirst()
                .map(l -> new Item(code, l.line().rate(), l.line().params().getOrDefault("country", country),
                        whole(l.display().amount())));
    }

    private static BigDecimal sum(CalculationResult result, List<String> codes) {
        return result.lines().stream()
                .filter(l -> codes.contains(l.line().code()))
                .map(l -> l.display().amount())
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(0, RoundingMode.HALF_UP);
    }

    private static BigDecimal whole(BigDecimal amount) {
        return amount.setScale(0, RoundingMode.HALF_UP);
    }
}
