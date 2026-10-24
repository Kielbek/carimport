package com.carimport.quote;

import com.carimport.calculation.CalculationEngine;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.Proposals;
import com.carimport.calculation.Scenario;
import com.carimport.calculation.TariffCatalog;
import com.carimport.calculation.registration.RegistrationTaxes;
import com.carimport.calculation.step.RegistrationTaxStep;
import com.carimport.domain.DeliveryMode;
import com.carimport.fx.ExchangeRateService;
import com.carimport.fx.FxRates;
import com.carimport.geo.GeoPoint;
import com.carimport.geo.GeoService;
import com.carimport.reference.EuPort;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * The calculator's current proposal for everything the user does not have to type: the cheapest EU port for this car
 * and this delivery address (every port is priced door-to-door with the full engine), the road distance from each
 * port, the delivery mode, and the repair and insurance amounts.
 */
@Service
public class SuggestionService {

    /**
     * One EU port. Ranked by the full door-to-door cost (expected scenario), but only the free part is exposed: the
     * taxes and port fees of clearing there, the road distance and how much more it costs than the cheapest port.
     * The door-to-door total itself is what the paid report sells.
     *
     * @param extraVsBest door-to-door difference to the cheapest port, rounded to 10 (0 for the cheapest)
     */
    public record PortSuggestion(String code, String name, String countryCode, EuPort.Region region, double lat,
                                 double lon, Integer distanceKm, GeoService.Method distanceMethod, TaxSummary taxes,
                                 BigDecimal extraVsBest, int daysMin, int daysMax) {
    }

    private record Priced(EuPort port, GeoService.Distance distance, CalculationResult result) {
    }

    /**
     * @param registrationTax how the registration country's one-off tax is handled: EXCISE (Polish excise, always
     *                        computed), NONE (no such tax), ESTIMATED (our formula, see registrationTaxEstimate) or
     *                        OFFICIAL_CALCULATOR (the buyer types it from registrationTaxUrl)
     */
    public record Suggestions(String recommendedPort, List<PortSuggestion> ports, DeliveryMode deliveryMode,
                              BigDecimal repairEstimate, BigDecimal insuranceEstimate, String currency,
                              int co2Estimate, int powerKwEstimate, String registrationTax,
                              BigDecimal registrationTaxEstimate, String registrationTaxUrl) {
    }

    private final CalculationEngine engine;
    private final TariffCatalog catalog;
    private final ExchangeRateService rates;
    private final GeoService geo;

    public SuggestionService(CalculationEngine engine, TariffCatalog catalog, ExchangeRateService rates, GeoService geo) {
        this.engine = engine;
        this.catalog = catalog;
        this.rates = rates;
        this.geo = geo;
    }

    public Suggestions suggest(CalculationRequest request) {
        FxRates fx = rates.latest();
        List<EuPort> ports = catalog.ports().stream().filter(p -> p.location() != null).toList();
        List<GeoService.Distance> distances = request.destinationPoint()
                .map(home -> geo.distances(ports.stream().map(EuPort::location).toList(), home))
                .orElse(null);

        List<Priced> results = new ArrayList<>();
        for (int i = 0; i < ports.size(); i++) {
            EuPort port = ports.get(i);
            GeoService.Distance distance = distances == null ? null : distances.get(i);
            Integer km = distance == null ? null : distance.km();
            calculate(request.withPort(port.getCode(), km), fx).ifPresent(r -> results.add(new Priced(port, distance, r)));
        }
        results.sort(Comparator.comparing((Priced p) -> p.result().total().amount())
                .thenComparing(p -> p.result().timeline().totalMax()));
        BigDecimal cheapest = results.isEmpty() ? BigDecimal.ZERO : results.getFirst().result().total().amount();
        List<PortSuggestion> priced = results.stream().map(p -> new PortSuggestion(
                p.port().getCode(), p.port().getName(), p.port().getCountryCode(), p.port().getRegion(),
                p.port().location().lat(), p.port().location().lon(), p.result().deliveryKm(),
                p.distance() == null ? GeoService.Method.ESTIMATED : p.distance().method(),
                TaxSummary.of(p.result(), p.port().getCountryCode(), request.destinationCountry()),
                p.result().total().amount().subtract(cheapest).setScale(-1, RoundingMode.HALF_UP).max(BigDecimal.ZERO)
                        .setScale(0, RoundingMode.UNNECESSARY),
                p.result().timeline().totalMin(), p.result().timeline().totalMax())).toList();
        String best = priced.isEmpty() ? request.euPortCode() : priced.getFirst().code();

        PortSuggestion bestPort = priced.isEmpty() ? null : priced.getFirst();
        Optional<CalculationResult> proposal = calculate(request.withProposedEstimates()
                .withPort(best, bestPort == null ? null : bestPort.distanceKm()), fx);
        return new Suggestions(best, priced, request.withProposedEstimates().effectiveDeliveryMode(),
                proposal.map(r -> displayAmount(r, "REPAIR_ESTIMATE")).orElse(BigDecimal.ZERO),
                proposal.map(r -> displayAmount(r, "INSURANCE_FIRST_YEAR")).orElse(BigDecimal.ZERO),
                request.displayCurrency().name(),
                Proposals.co2(request.fuelType(), request.engineCc(), request.vehicleCategory()),
                Proposals.powerKw(request.fuelType(), request.engineCc()),
                registrationTaxMode(request.destinationCountry()),
                proposal.flatMap(r -> wholeAmount(r, RegistrationTaxStep.CODE)).orElse(null),
                RegistrationTaxes.OFFICIAL_CALCULATOR.get(request.destinationCountry()));
    }

    private static String registrationTaxMode(String country) {
        if ("PL".equals(country)) {
            return "EXCISE";
        }
        if (RegistrationTaxes.NONE.contains(country)) {
            return "NONE";
        }
        return RegistrationTaxes.modelled(country) ? "ESTIMATED" : "OFFICIAL_CALCULATOR";
    }

    private static Optional<BigDecimal> wholeAmount(CalculationResult result, String code) {
        return result.lines().stream()
                .filter(l -> l.line().code().equals(code) && l.display().amount() != null)
                .findFirst()
                .map(l -> l.display().amount().setScale(0, RoundingMode.HALF_UP));
    }

    private Optional<CalculationResult> calculate(CalculationRequest request, FxRates fx) {
        try {
            return Optional.of(engine.calculate(request, Scenario.EXPECTED, fx));
        } catch (CalculationException e) {
            return Optional.empty(); // no sailing to this port from the chosen origin
        }
    }

    private static BigDecimal displayAmount(CalculationResult result, String code) {
        return result.lines().stream()
                .filter(l -> l.line().code().equals(code))
                .map(l -> l.display().amount())
                .filter(Objects::nonNull)
                .findFirst()
                .map(a -> a.setScale(-1, RoundingMode.HALF_UP).max(BigDecimal.ZERO).setScale(0, RoundingMode.UNNECESSARY))
                .orElse(BigDecimal.ZERO);
    }
}
