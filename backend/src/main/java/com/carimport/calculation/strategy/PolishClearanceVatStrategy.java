package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import org.springframework.stereotype.Component;

/**
 * Gdynia / Gdańsk / inland clearance in PL: 23% (8% for collectors' items). When the car stays in Poland the excise is
 * paid together with duty and VAT on the customs declaration and is part of the VAT base.
 */
@Component
public class PolishClearanceVatStrategy extends AbstractClearanceVatStrategy {

    @Override
    public boolean supports(String clearanceCountry) {
        return "PL".equals(clearanceCountry);
    }

    @Override
    protected String localTaxName() {
        return "VAT z tytułu importu towarów";
    }

    @Override
    protected void afterVat(CalculationContext ctx) {
        if (!ctx.clearedInDestinationCountry()) {
            ctx.warn("warning.pl.clearedForOtherMemberState");
        }
    }
}
