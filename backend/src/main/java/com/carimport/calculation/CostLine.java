package com.carimport.calculation;

import com.carimport.domain.Money;
import java.math.BigDecimal;
import java.util.Map;

/**
 * A single, explainable cost position.
 *
 * @param code           stable i18n key suffix (frontend: {@code cost.<code>}, PDF: {@code messages_xx.properties})
 * @param original       amount in the currency it is invoiced in (e.g. USD for Copart, JPY for USS)
 * @param amount         amount converted to the calculation (tax) currency
 * @param taxBase        base the rate was applied to, for taxes and percentage fees
 * @param rate           applied rate as a fraction (0.186 = 18.6%)
 * @param includedInTotal false for informational lines (e.g. reverse-charge VAT under procedure 4200)
 * @param params         extra values for the translated label (HS code, engine size, port name, ...)
 */
public record CostLine(
        String code,
        CostCategory category,
        Money original,
        Money amount,
        Money taxBase,
        BigDecimal rate,
        boolean includedInTotal,
        Map<String, String> params) {

    public static CostLine fee(String code, CostCategory category, Money original, Money converted) {
        return new CostLine(code, category, original, converted, null, null, true, Map.of());
    }

    public static CostLine tax(String code, Money base, BigDecimal rate, Money amount, Map<String, String> params) {
        return new CostLine(code, CostCategory.TAXES, amount, amount, base, rate, true, params);
    }

    public CostLine informational() {
        return new CostLine(code, category, original, amount, taxBase, rate, false, params);
    }
}
