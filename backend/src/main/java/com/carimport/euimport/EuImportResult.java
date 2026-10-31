package com.carimport.euimport;

import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Cost of bringing a car from one member state to another, every line in the display currency.
 *
 * @param distanceKm road distance the transport was priced for
 * @param vatRate    the destination's standard VAT rate (applied only to a new vehicle)
 */
public record EuImportResult(
        CurrencyCode currency,
        LocalDate fxDate,
        List<CostLine> lines,
        Map<CostCategory, Money> byCategory,
        Money total,
        int distanceKm,
        java.math.BigDecimal vatRate,
        Set<String> warnings) {
}
