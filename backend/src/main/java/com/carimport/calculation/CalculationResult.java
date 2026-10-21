package com.carimport.calculation;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Full, exact breakdown. Never exposed by the free endpoints - see {@code PublicQuoteView}. */
public record CalculationResult(
        Scenario scenario,
        LocalDate calculationDate,
        CurrencyCode taxCurrency,
        CurrencyCode displayCurrency,
        LocalDate fxDate,
        Map<CurrencyCode, BigDecimal> fxRatesUsed,
        List<Line> lines,
        Money customsValue,
        String hsCode,
        BigDecimal dutyRate,
        boolean historic,
        RouteInfo route,
        Map<CostCategory, Money> totalsByCategory,
        Money total,
        Set<String> warnings,
        Timeline timeline,
        int deliveryKm) {

    /** A cost line plus its amount in the display currency. */
    public record Line(CostLine line, Money display) {
    }

    /** Door-to-registration lead time; stages are in order. */
    public record Timeline(List<Stage> stages, int totalMin, int totalMax) {
    }

    public record Stage(String code, int minDays, int maxDays) {
    }

    public record RouteInfo(String departurePort, String euPortCode, String euPortName, int transitDays) {
    }
}
