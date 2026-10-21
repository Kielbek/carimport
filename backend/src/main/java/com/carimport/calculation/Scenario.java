package com.carimport.calculation;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * The free tier shows a LOW-HIGH band; the paid report is the EXPECTED scenario. Bands come from forwarder price ranges
 * plus a currency stress (the buyer pays the auction days or weeks after the quote).
 */
public enum Scenario {
    LOW(new BigDecimal("0.985")),
    EXPECTED(BigDecimal.ONE),
    HIGH(new BigDecimal("1.025"));

    private final BigDecimal fxShift;

    Scenario(BigDecimal fxShift) {
        this.fxShift = fxShift;
    }

    public BigDecimal fxShift() {
        return fxShift;
    }

    public BigDecimal pick(BigDecimal min, BigDecimal max) {
        return switch (this) {
            case LOW -> min;
            case HIGH -> max;
            case EXPECTED -> min.add(max).divide(BigDecimal.TWO, 2, RoundingMode.HALF_UP);
        };
    }
}
