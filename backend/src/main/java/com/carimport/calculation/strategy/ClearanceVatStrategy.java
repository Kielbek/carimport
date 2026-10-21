package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;

/** Import-VAT regime of the member state where the vehicle is released for free circulation. */
public interface ClearanceVatStrategy {

    boolean supports(String clearanceCountry);

    default boolean isFallback() {
        return false;
    }

    void apply(CalculationContext ctx);
}
