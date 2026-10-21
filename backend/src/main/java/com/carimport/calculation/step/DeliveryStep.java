package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCondition;
import com.carimport.reference.IntraEuTransportRate;
import com.carimport.reference.RoadTransportRate;
import java.math.BigDecimal;
import java.util.Optional;
import org.springframework.stereotype.Component;

/**
 * Port-to-home leg priced per km: cost = max(minimum charge, fixed fee + km x price/km). The distance is the user's
 * own (door address) or the typical distance for the country; the per-km price is the tariff band or the user's own
 * quote. Without a per-km tariff the flat port-to-country rate is used.
 */
@Component
public class DeliveryStep implements CalculationStep {

    /** Used when the car is cleared in the destination country and no lane distance is known. */
    static final int DOMESTIC_DEFAULT_KM = 300;

    @Override
    public int order() {
        return DELIVERY;
    }

    @Override
    public void apply(CalculationContext ctx) {
        CalculationRequest req = ctx.request();
        DeliveryMode mode = req.effectiveDeliveryMode();
        if (!mode.needsRoad()) {
            ctx.warn("warning.delivery.portPickup");
            return;
        }
        if (mode == DeliveryMode.SELF_DRIVE && req.condition() != VehicleCondition.RUN_AND_DRIVE) {
            ctx.warn("warning.delivery.selfDriveNotRunning");
        }
        String destination = req.destinationCountry();
        Optional<IntraEuTransportRate> lane = ctx.catalog().intraEuRate(ctx.euPort().getCode(), destination);
        int km = req.deliveryDistanceKm() != null ? req.deliveryDistanceKm()
                : lane.map(IntraEuTransportRate::getDistanceKm).filter(d -> d > 0)
                        .orElse(ctx.clearedInDestinationCountry() ? DOMESTIC_DEFAULT_KM : -1);
        Optional<RoadTransportRate> road = ctx.catalog().roadRate(destination, mode);

        if (road.isEmpty() || km < 0) {
            lane.ifPresentOrElse(rate -> {
                Money original = Money.of(ctx.pick(rate.getPriceMin(), rate.getPriceMax()), rate.getCurrency());
                ctx.add(new CostLine("INTRA_EU_TRANSPORT", CostCategory.TRANSPORT, original, ctx.toBase(original),
                        null, null, true, CalculationContext.params("from", ctx.euPort().getName(), "to", destination)));
            }, () -> ctx.warn("warning.intraEuTransport.notPriced"));
            ctx.deliveryKm(Math.max(km, 0));
            return;
        }

        RoadTransportRate rate = road.get();
        BigDecimal perKm = req.pricePerKm() != null ? req.pricePerKm()
                : ctx.pick(rate.getPricePerKmMin(), rate.getPricePerKmMax());
        BigDecimal cost = rate.getFixedFee().add(perKm.multiply(BigDecimal.valueOf(km))).max(rate.getMinimumCharge());
        Money original = Money.of(cost, rate.getCurrency());
        ctx.add(new CostLine("DELIVERY_" + mode.name(), CostCategory.TRANSPORT, original, ctx.toBase(original), null, null,
                true, CalculationContext.params(
                        "km", String.valueOf(km),
                        "perKm", perKm.stripTrailingZeros().toPlainString(),
                        "fixed", rate.getFixedFee().stripTrailingZeros().toPlainString(),
                        "minimum", rate.getMinimumCharge().stripTrailingZeros().toPlainString(),
                        "currency", rate.getCurrency().name(),
                        "from", ctx.euPort().getName(),
                        "customRate", String.valueOf(req.pricePerKm() != null))));
        ctx.deliveryKm(km);
    }
}
