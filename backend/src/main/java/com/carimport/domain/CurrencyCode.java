package com.carimport.domain;

/** Origin currencies plus the non-euro EU currencies in which member states assess import taxes. */
public enum CurrencyCode {
    PLN, EUR, USD, CAD, JPY, AED, GBP, CZK, HUF, SEK, DKK, RON;

    /** Number of minor units used when rounding money in this currency (JPY and HUF have none in practice). */
    public int scale() {
        return this == JPY || this == HUF ? 0 : 2;
    }
}
