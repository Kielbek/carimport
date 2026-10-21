package com.carimport.calculation;

/** LOW / EXPECTED / HIGH results of one request. */
public record QuoteRange(CalculationResult low, CalculationResult expected, CalculationResult high) {
}
