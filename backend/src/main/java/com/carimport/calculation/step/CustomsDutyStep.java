package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.CustomsTariff;
import java.time.Year;
import java.util.Comparator;
import java.util.Map;
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

        Money duty = ctx.roundTax(ctx.customsValue().percent(tariff.getDutyRate()), ctx.clearanceTax());
        ctx.duty(duty);
        ctx.add(CostLine.tax(CODE, ctx.customsValue(), tariff.getDutyRate(), duty,
                Map.of("hsCode", tariff.getHsCode())));
    }

    private static CustomsTariff classify(CalculationContext ctx, boolean historic) {
        CalculationRequest req = ctx.request();
        boolean electric = req.fuelType().isZeroEmission();
        return ctx.catalog().customsTariffs().stream()
                .filter(t -> t.isHistoric() == historic)
                .filter(t -> historic || t.getVehicleCategory() == req.vehicleCategory())
                .filter(t -> t.getElectricOnly() == null || t.getElectricOnly() == electric)
                .filter(t -> req.engineCc() >= t.getCcFrom() && (t.getCcTo() == null || req.engineCc() <= t.getCcTo()))
                // a row bound to the drivetrain is more specific than a generic one
                .min(Comparator.comparing(t -> t.getElectricOnly() == null ? 1 : 0))
                .orElseThrow(() -> new CalculationException("error.tariff.notFound",
                        req.vehicleCategory() + "/" + req.fuelType() + "/" + req.engineCc()));
    }
}
