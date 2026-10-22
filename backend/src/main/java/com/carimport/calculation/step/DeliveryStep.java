package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCondition;
import com.carimport.geo.CountryCentres;
import com.carimport.geo.GeoPoint;
import com.carimport.geo.RoadDistance;
import com.carimport.reference.EuPort;
import com.carimport.reference.IntraEuTransportRate;
import com.carimport.reference.RoadTransportRate;
import java.math.BigDecimal;
import java.util.Optional;
import org.springframework.stereotype.Component;

/**
 * Port-to-home leg priced per km: cost = max(minimum charge, fixed fee + km x price/km). The distance is, in order:
 * the routed distance sent with the request, an estimate from the delivery address coordinates, the curated lane
 * distance, or an estimate to the destination country's population centre. The per-km price is the tariff band or
 * the user's own quote. Without a per-km tariff the flat port-to-country rate is used.
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
                : req.destinationPoint().flatMap(home -> estimate(ctx.euPort(), home))
                        .orElseGet(() -> typicalKm(ctx.euPort(), destination, lane)
                                .orElse(ctx.clearedInDestinationCountry() ? DOMESTIC_DEFAULT_KM : -1));
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

    /** Distance to the destination country without an address: the curated lane, else to its population centre. */
    public static Optional<Integer> typicalKm(EuPort port, String country, Optional<IntraEuTransportRate> lane) {
        return lane.map(IntraEuTransportRate::getDistanceKm).filter(d -> d > 0)
                .or(() -> CountryCentres.of(country).flatMap(centre -> estimate(port, centre)));
    }

    private static Optional<Integer> estimate(EuPort port, GeoPoint to) {
        return Optional.ofNullable(port.location()).map(from -> RoadDistance.estimateKm(from, to));
    }
}
