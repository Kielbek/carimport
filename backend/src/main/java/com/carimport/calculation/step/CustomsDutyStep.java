package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.PreferentialDuty;
import com.carimport.domain.FuelType;
import com.carimport.domain.Money;
import com.carimport.reference.CustomsTariff;
import java.math.BigDecimal;
import java.time.Year;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

/**
 * Classifies the vehicle (simplified TARIC) and applies the conventional duty to the customs value.
 * Collectors' vehicles (30+ years, original condition) go under HS 9705 with 0% duty and reduced VAT.
 */
@Component
public class CustomsDutyStep implements CalculationStep {

    public static final String CODE = "CUSTOMS_DUTY";

    @Override
    public int order() {
        return CUSTOMS_DUTY;
    }

    @Override
    public void apply(CalculationContext ctx) {
        CalculationRequest req = ctx.request();
        boolean historic = req.qualifiesAsHistoric(Year.from(ctx.calculationDate()));
        CustomsTariff tariff = classify(ctx, historic);
        ctx.tariff(tariff);
        ctx.historic(historic);
        if (historic) {
            ctx.warn("warning.historic.expertOpinionRequired");
        }

        BigDecimal rate = tariff.getDutyRate();
        Optional<PreferentialDuty.Agreement> agreement = historic || rate.signum() == 0 ? Optional.empty()
                : PreferentialDuty.available(req.originCountry(), ctx.calculationDate());
        boolean preferential = agreement.isPresent() && req.claimsPreferentialOrigin();
        if (preferential) {
            rate = BigDecimal.ZERO;
            ctx.warn(agreement.get().code().equals("EU_US_2026_1455")
                    ? "warning.duty.usOriginProof" : "warning.duty.preferentialOriginProof");
        } else if (agreement.isPresent() && PreferentialDuty.vinMatches(agreement.get(), req.vin())) {
            ctx.warn("warning.duty.preferentialPossible");
        }

        Money duty = ctx.roundTax(ctx.customsValue().percent(rate), ctx.clearanceTax());
        ctx.duty(duty);
        Map<String, String> params = new LinkedHashMap<>();
        params.put("hsCode", tariff.getHsCode());
        // the date is shown only when the month's customs rates were loaded, not when today's stood in for them
        if (ctx.fx().customs() != null) {
            params.put("customsFxDate", ctx.fx().customs().effectiveDate().toString());
        }
        if (preferential) {
            params.put("preference", agreement.get().code());
            params.put("standardRate", tariff.getDutyRate().toPlainString());
        }
        ctx.add(CostLine.tax(CODE, ctx.customsValue(), rate, duty, Map.copyOf(params)));
    }

    private static CustomsTariff classify(CalculationContext ctx, boolean historic) {
        CalculationRequest req = ctx.request();
        boolean electric = req.fuelType().isZeroEmission();
        return ctx.catalog().customsTariffs().stream()
                .filter(t -> t.isHistoric() == historic)
                .filter(t -> historic || t.getVehicleCategory() == req.vehicleCategory())
                .filter(t -> t.getElectricOnly() == null || t.getElectricOnly() == electric)
                .filter(t -> t.getDieselOnly() == null || t.getDieselOnly() == (req.fuelType() == FuelType.DIESEL))
                .filter(t -> req.engineCc() >= t.getCcFrom() && (t.getCcTo() == null || req.engineCc() <= t.getCcTo()))
                // a row bound to the drivetrain is more specific than a generic one
                .min(Comparator.comparing(t -> (t.getElectricOnly() == null ? 1 : 0) + (t.getDieselOnly() == null ? 1 : 0)))
                .orElseThrow(() -> new CalculationException("error.tariff.notFound",
                        req.vehicleCategory() + "/" + req.fuelType() + "/" + req.engineCc()));
    }
}
