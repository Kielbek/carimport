package com.carimport.quote;

import com.carimport.calculation.CalculationEngine;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.Scenario;
import com.carimport.calculation.TariffCatalog;
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

    /** One EU port, priced door to door (expected scenario, rounded like the free result). */
    public record PortSuggestion(String code, String name, String countryCode, EuPort.Region region, double lat,
                                 double lon, Integer distanceKm, GeoService.Method distanceMethod, BigDecimal total,
                                 int daysMin, int daysMax) {
    }

    public record Suggestions(String recommendedPort, List<PortSuggestion> ports, DeliveryMode deliveryMode,
                              BigDecimal repairEstimate, BigDecimal insuranceEstimate, String currency) {
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

        List<PortSuggestion> priced = new ArrayList<>();
        for (int i = 0; i < ports.size(); i++) {
            EuPort port = ports.get(i);
            GeoService.Distance distance = distances == null ? null : distances.get(i);
            Integer km = distance == null ? null : distance.km();
            calculate(request.withPort(port.getCode(), km), fx).ifPresent(r -> priced.add(new PortSuggestion(
                    port.getCode(), port.getName(), port.getCountryCode(), port.getRegion(),
                    port.location().lat(), port.location().lon(), r.deliveryKm(),
                    distance == null ? GeoService.Method.ESTIMATED : distance.method(),
                    PublicQuoteView.roundToStep(r.total()), r.timeline().totalMin(), r.timeline().totalMax())));
        }
        priced.sort(Comparator.comparing(PortSuggestion::total).thenComparing(PortSuggestion::daysMax));
        String best = priced.isEmpty() ? request.euPortCode() : priced.getFirst().code();

        PortSuggestion bestPort = priced.isEmpty() ? null : priced.getFirst();
        Optional<CalculationResult> proposal = calculate(request.withProposedEstimates()
                .withPort(best, bestPort == null ? null : bestPort.distanceKm()), fx);
        return new Suggestions(best, priced, request.withProposedEstimates().effectiveDeliveryMode(),
                proposal.map(r -> displayAmount(r, "REPAIR_ESTIMATE")).orElse(BigDecimal.ZERO),
                proposal.map(r -> displayAmount(r, "INSURANCE_FIRST_YEAR")).orElse(BigDecimal.ZERO),
                request.displayCurrency().name());
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
