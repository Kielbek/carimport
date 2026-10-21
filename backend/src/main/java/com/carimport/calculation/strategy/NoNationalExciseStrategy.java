package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * Fallback for destinations without a modelled registration tax. Countries known to have none (DE, CZ, SK, ...)
 * pass silently; for the rest (e.g. NL BPM, AT NoVA, FR malus) the result carries a warning instead of a guess.
 */
@Component
public class NoNationalExciseStrategy implements ExciseStrategy {

    private static final Set<String> NO_REGISTRATION_TAX = Set.of("DE", "CZ", "SK", "LU");

    @Override
    public boolean supports(String destinationCountry) {
        return true;
    }

    @Override
    public boolean isFallback() {
        return true;
    }

    @Override
    public void apply(CalculationContext ctx) {
        if (!NO_REGISTRATION_TAX.contains(ctx.request().destinationCountry())) {
            ctx.warn("warning.registrationTax.notModelled");
        }
    }
}
