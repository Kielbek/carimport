package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.EnumMap;
import java.util.Map;

/**
 * Immutable snapshot of exchange rates expressed against a single pivot currency (PLN, as published by NBP).
 * A whole calculation uses one snapshot so every line item is converted consistently, and the snapshot is persisted
 * with the quote so the paid PDF reproduces the free preview exactly.
 *
 * @param customs the rates customs applies this month (Art. 146 UCC-IA: those of the penultimate Wednesday of the
 *                previous month); null when not loaded - the customs value then uses these rates
 */
public record FxRates(LocalDate effectiveDate, String source, Map<CurrencyCode, BigDecimal> plnPerUnit,
                      FxRates customs) {

    public FxRates(LocalDate effectiveDate, String source, Map<CurrencyCode, BigDecimal> plnPerUnit) {
        this(effectiveDate, source, plnPerUnit, null);
    }

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

    /** Rates for the customs value: the customs snapshot when loaded, else these. */
    public FxRates forCustoms() {
        return customs != null ? customs : this;
    }

    public FxRates withCustoms(FxRates customsRates) {
        return new FxRates(effectiveDate, source, plnPerUnit, customsRates);
    }

    /**
     * The day whose rates customs applies during the month of {@code date}: the penultimate Wednesday of the previous
     * month (Art. 146 of Implementing Regulation (EU) 2015/2447).
     */
    public static LocalDate customsRateDay(LocalDate date) {
        LocalDate lastOfPrevious = date.withDayOfMonth(1).minusDays(1);
        LocalDate lastWednesday = lastOfPrevious.with(TemporalAdjusters.previousOrSame(DayOfWeek.WEDNESDAY));
        return lastWednesday.minusWeeks(1);
    }

    /** Stress scenario: the given currency becomes {@code factor} times more expensive (1.02 = +2%). */
    public FxRates withShift(CurrencyCode currency, BigDecimal factor) {
        if (currency == CurrencyCode.PLN) {
            return this;
        }
        EnumMap<CurrencyCode, BigDecimal> shifted = new EnumMap<>(plnPerUnit);
        shifted.put(currency, rate(currency).multiply(factor));
        // the customs rate is fixed for the month - a payment-time stress does not move it
        return new FxRates(effectiveDate, source + "+shift", shifted, customs);
    }

    private BigDecimal rate(CurrencyCode currency) {
        BigDecimal rate = plnPerUnit.get(currency);
        if (rate == null) {
            throw new IllegalStateException("No exchange rate for " + currency + " in snapshot " + effectiveDate);
        }
        return rate;
    }
}
