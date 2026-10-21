package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;

/** National excise / registration tax of the destination member state. */
public interface ExciseStrategy {

    boolean supports(String destinationCountry);

    /** Fallback strategies are used only when no country-specific strategy matches. */
    default boolean isFallback() {
        return false;
    }

    void apply(CalculationContext ctx);
}
