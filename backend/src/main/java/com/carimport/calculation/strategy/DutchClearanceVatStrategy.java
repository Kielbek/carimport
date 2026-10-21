package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import org.springframework.stereotype.Component;

/** Rotterdam: invoer-btw 21% (9% for collectors' items). BPM for NL registration is not part of this engine yet. */
@Component
public class DutchClearanceVatStrategy extends AbstractClearanceVatStrategy {

    @Override
    public boolean supports(String clearanceCountry) {
        return "NL".equals(clearanceCountry);
    }

    @Override
    protected String localTaxName() {
        return "Invoer-btw";
    }

    @Override
    protected void afterVat(CalculationContext ctx) {
        if ("NL".equals(ctx.request().destinationCountry())) {
            ctx.warn("warning.nl.bpmNotIncluded");
        }
    }
}
