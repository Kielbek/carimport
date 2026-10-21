package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.EnumMap;
import java.util.Map;

/**
 * Immutable snapshot of exchange rates expressed against a single pivot currency (PLN, as published by NBP).
 * A whole calculation uses one snapshot so every line item is converted consistently, and the snapshot is persisted
 * with the quote so the paid PDF reproduces the free preview exactly.
 */
public record FxRates(LocalDate effectiveDate, String source, Map<CurrencyCode, BigDecimal> plnPerUnit) {

    private static final int SCALE = 10;

    public FxRates {
        EnumMap<CurrencyCode, BigDecimal> copy = new EnumMap<>(CurrencyCode.class);
        copy.putAll(plnPerUnit);
        copy.put(CurrencyCode.PLN, BigDecimal.ONE);
        plnPerUnit = Map.copyOf(copy);
    }

    public Money convert(Money money, CurrencyCode target) {
        if (money.currency() == target) {
            return money;
        }
        BigDecimal inPln = money.amount().multiply(rate(money.currency()));
        return Money.of(inPln.divide(rate(target), SCALE, RoundingMode.HALF_UP), target);
    }

    /** Cross rate: how many units of {@code quote} one unit of {@code base} buys. */
    public BigDecimal crossRate(CurrencyCode base, CurrencyCode quote) {
        return rate(base).divide(rate(quote), SCALE, RoundingMode.HALF_UP);
    }

    /** Stress scenario: the given currency becomes {@code factor} times more expensive (1.02 = +2%). */
    public FxRates withShift(CurrencyCode currency, BigDecimal factor) {
        if (currency == CurrencyCode.PLN) {
            return this;
        }
        EnumMap<CurrencyCode, BigDecimal> shifted = new EnumMap<>(plnPerUnit);
        shifted.put(currency, rate(currency).multiply(factor));
        return new FxRates(effectiveDate, source + "+shift", shifted);
    }

    private BigDecimal rate(CurrencyCode currency) {
        BigDecimal rate = plnPerUnit.get(currency);
        if (rate == null) {
            throw new IllegalStateException("No exchange rate for " + currency + " in snapshot " + effectiveDate);
        }
        return rate;
    }
}
