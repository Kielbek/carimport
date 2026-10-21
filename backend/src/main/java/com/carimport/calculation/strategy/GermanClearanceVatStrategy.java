package com.carimport.calculation.strategy;

import org.springframework.stereotype.Component;

/** Bremerhaven / Hamburg: Einfuhrumsatzsteuer 19% (7% for collectors' items, §12(2) Nr.12 UStG). */
@Component
public class GermanClearanceVatStrategy extends AbstractClearanceVatStrategy {

    @Override
    public boolean supports(String clearanceCountry) {
        return "DE".equals(clearanceCountry);
    }

    @Override
    protected String localTaxName() {
        return "Einfuhrumsatzsteuer (EUSt)";
    }
}
