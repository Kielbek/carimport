package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.Scenario;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCategory;
import com.carimport.reference.InlandTransportRate;
import com.carimport.reference.OceanFreightRate;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

/**
 * Chooses the export port: of all ports reachable from the pickup zone that have a sailing to the selected EU port,
 * take the one with the lowest expected inland + ocean cost. The choice is scenario-independent so LOW/HIGH bands
 * describe the same route.
 */
@Component
public class RoutePlanningStep implements CalculationStep {

    @Override
    public int order() {
        return ROUTE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        CalculationRequest req = ctx.request();
        OceanFreightRate.SizeClass size = sizeClass(req.vehicleCategory());
        List<InlandTransportRate> inland = inlandCandidates(ctx, req);

        record Candidate(CalculationContext.Route route, Money expectedCost) {
        }

        Optional<Candidate> best = inland.stream()
                .filter(r -> req.departurePort() == null || req.departurePort().equals(r.getDeparturePort()))
                .flatMap(r -> ctx.catalog()
                        .oceanRate(r.getDeparturePort(), req.euPortCode(), req.shippingMethod(), size)
                        .map(o -> new CalculationContext.Route(r.getDeparturePort(), r, o))
                        .stream())
                .map(route -> new Candidate(route, expectedCost(ctx, route)))
                .min(Comparator.comparing(Candidate::expectedCost));

        ctx.route(best.map(Candidate::route).orElseThrow(() -> new CalculationException("error.route.unavailable",
                req.originCountry() + "/" + req.pickupZone() + " -> " + req.euPortCode())));
    }

    /**
     * Zone-specific rates first; country-wide "*" rates fill in the ports the zone has no own rate for, so a buyer in
     * New Jersey can still choose to ship from Savannah.
     */
    private static List<InlandTransportRate> inlandCandidates(CalculationContext ctx, CalculationRequest req) {
        List<InlandTransportRate> zoned = ctx.catalog().inlandRates(req.originCountry(), req.pickupZone());
        List<InlandTransportRate> fallback = ctx.catalog().inlandRates(req.originCountry(), "*");
        Map<String, InlandTransportRate> byPort = new LinkedHashMap<>();
        zoned.forEach(r -> byPort.put(r.getDeparturePort(), r));
        fallback.forEach(r -> byPort.putIfAbsent(r.getDeparturePort(), r));
        return List.copyOf(byPort.values());
    }

    private static Money expectedCost(CalculationContext ctx, CalculationContext.Route route) {
        Money inland = Money.of(Scenario.EXPECTED.pick(route.inland().getPriceMin(), route.inland().getPriceMax()),
                route.inland().getCurrency());
        Money ocean = Money.of(Scenario.EXPECTED.pick(route.ocean().getPriceMin(), route.ocean().getPriceMax()),
                route.ocean().getCurrency());
        return ctx.toBase(inland).plus(ctx.toBase(ocean));
    }

    public static OceanFreightRate.SizeClass sizeClass(VehicleCategory category) {
        return switch (category) {
            case MOTORCYCLE -> OceanFreightRate.SizeClass.MOTORCYCLE;
            case PASSENGER_CAR -> OceanFreightRate.SizeClass.SEDAN;
            case SUV, VAN -> OceanFreightRate.SizeClass.SUV;
            case PICKUP_TRUCK -> OceanFreightRate.SizeClass.OVERSIZE;
        };
    }
}
