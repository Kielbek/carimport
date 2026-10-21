package com.carimport.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/** Immutable monetary amount. Arithmetic keeps full precision; call {@link #rounded()} at presentation boundaries. */
public record Money(BigDecimal amount, CurrencyCode currency) implements Comparable<Money> {

    public Money {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(currency, "currency");
    }

    public static Money of(String amount, CurrencyCode currency) {
        return new Money(new BigDecimal(amount), currency);
    }

    public static Money of(BigDecimal amount, CurrencyCode currency) {
        return new Money(amount, currency);
    }

    public static Money zero(CurrencyCode currency) {
        return new Money(BigDecimal.ZERO, currency);
    }

    public Money plus(Money other) {
        requireSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
    }

    public Money minus(Money other) {
        requireSameCurrency(other);
        return new Money(amount.subtract(other.amount), currency);
    }

    public Money times(BigDecimal factor) {
        return new Money(amount.multiply(factor), currency);
    }

    /** Applies a percentage rate expressed as a fraction, e.g. 0.186 for 18.6%. */
    public Money percent(BigDecimal rate) {
        return times(rate);
    }

    public Money rounded() {
        return new Money(amount.setScale(currency.scale(), RoundingMode.HALF_UP), currency);
    }

    /** Polish tax law (Ordynacja podatkowa art. 63) rounds tax liabilities to full złoty. */
    public Money roundedToWholeUnits() {
        return new Money(amount.setScale(0, RoundingMode.HALF_UP), currency);
    }

    @JsonIgnore
    public boolean isZero() {
        return amount.signum() == 0;
    }

    private void requireSameCurrency(Money other) {
        if (other.currency != currency) {
            throw new IllegalArgumentException("Currency mismatch: " + currency + " vs " + other.currency);
        }
    }

    @Override
    public int compareTo(Money o) {
        requireSameCurrency(o);
        return amount.compareTo(o.amount);
    }

    @Override
    public String toString() {
        return rounded().amount.toPlainString() + " " + currency;
    }
}
