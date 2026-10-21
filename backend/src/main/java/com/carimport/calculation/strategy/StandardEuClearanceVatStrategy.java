package com.carimport.calculation.strategy;

import org.springframework.stereotype.Component;

/** Any other member state: driven purely by {@code eu_country_tax_profile}. */
@Component
public class StandardEuClearanceVatStrategy extends AbstractClearanceVatStrategy {

    @Override
    public boolean supports(String clearanceCountry) {
        return true;
    }

    @Override
    public boolean isFallback() {
        return true;
    }

    @Override
    protected String localTaxName() {
        return "Import VAT";
    }
}
