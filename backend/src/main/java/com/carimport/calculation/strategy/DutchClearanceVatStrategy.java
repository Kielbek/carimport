package com.carimport.calculation.strategy;

import org.springframework.stereotype.Component;

/** Rotterdam: invoer-btw 21% (9% for collectors' items). BPM for NL registration is priced by RegistrationTaxStep. */
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
}
