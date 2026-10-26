package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCategory;
import com.carimport.reference.ExciseRate;
import java.util.EnumSet;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * Polish excise on passenger cars (ustawa o podatku akcyzowym, art. 100-109): base = customs value + duty, converted to
 * PLN, rate depends on fuel type and displacement, the tax is rounded to whole złoty. Only CN 8703 (and collectors' cars
 * under 9705) are subject to it - pickups (8704) and motorcycles (8711) are not.
 */
@Component
public class PolishExciseStrategy implements ExciseStrategy {

    public static final String CODE = "EXCISE_TAX";
    private static final Set<VehicleCategory> PASSENGER_CARS =
            EnumSet.of(VehicleCategory.PASSENGER_CAR, VehicleCategory.SUV, VehicleCategory.VAN);

    @Override
    public boolean supports(String destinationCountry) {
        return "PL".equals(destinationCountry);
    }

    @Override
    public void apply(CalculationContext ctx) {
        var req = ctx.request();
        if (!PASSENGER_CARS.contains(req.vehicleCategory())) {
            if (req.vehicleCategory() == VehicleCategory.PICKUP_TRUCK) {
                ctx.warn("warning.pl.pickupMayBeReclassified");
            }
            return;
        }
        if (ctx.historic()) {
            // a collectors' item (CN 9705) is not a passenger car of CN 8703, so it is outside the Polish excise
            ctx.warn("warning.pl.historicNoExcise");
            return;
        }
        ExciseRate rate = ctx.catalog().exciseRates("PL", req.fuelType()).stream()
                .filter(r -> r.matches(req.engineCc()))
                .findFirst()
                .orElseThrow(() -> new CalculationException("error.excise.rateNotFound",
                        "PL/" + req.fuelType() + "/" + req.engineCc()));

        Money basePln = ctx.fx().convert(ctx.customsValue().plus(ctx.duty()), CurrencyCode.PLN).roundedToWholeUnits();
        Money excisePln = basePln.percent(rate.getRate()).roundedToWholeUnits();
        Money exciseInBase = ctx.fx().convert(excisePln, ctx.baseCurrency()).rounded();
        ctx.excise(exciseInBase);
        ctx.add(new CostLine(CODE, CostCategory.TAXES, excisePln, exciseInBase, basePln, rate.getRate(), true,
                CalculationContext.params(
                        "country", "PL",
                        "fuelType", req.fuelType().name(),
                        "engineCc", String.valueOf(req.engineCc()),
                        "paidAt", ctx.clearedInDestinationCountry() ? "CUSTOMS" : "TAX_OFFICE")));
        if (!ctx.clearedInDestinationCountry()) {
            ctx.warn("warning.pl.exciseDeclarationWithin14Days");
        }
    }
}
