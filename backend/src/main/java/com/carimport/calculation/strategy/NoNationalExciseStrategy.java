package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import org.springframework.stereotype.Component;

/**
 * Fallback for destinations without an excise that enters the import VAT base (only Poland has one). Their
 * registration taxes (NL BPM, AT NoVA, FR malus, ...) are priced by {@code RegistrationTaxStep}.
 */
@Component
public class NoNationalExciseStrategy implements ExciseStrategy {

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
        // nothing to add here
    }
}
