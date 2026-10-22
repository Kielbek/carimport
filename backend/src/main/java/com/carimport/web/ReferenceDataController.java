package com.carimport.web;

import com.carimport.calculation.TariffCatalog;
import com.carimport.calculation.step.DeliveryStep;
import com.carimport.domain.AuctionHouse;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.OriginCountry;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.reference.EuCountryTaxProfileRepository;
import com.carimport.reference.EuPort;
import com.carimport.reference.EuPortRepository;
import com.carimport.reference.InlandTransportRate;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Static wizard options (cached by the CDN / browser for an hour). */
@RestController
@RequestMapping("/api/v1/reference")
public class ReferenceDataController {

    public record OriginOption(OriginCountry code, String currency, List<AuctionHouse> auctionHouses) {
    }

    public record PortOption(String code, String name, String countryCode, BigDecimal vatRate,
                             boolean supportsProcedure4200, EuPort.Region region, Double lat, Double lon) {
    }

    public record ServiceOption(String code, boolean statutory, boolean defaultSelected) {
    }

    public record RoadOption(DeliveryMode mode, BigDecimal perKmMin, BigDecimal perKmMax, BigDecimal fixedFee,
                             BigDecimal minimumCharge, String currency) {
    }

    /** Wizard options for one route: what can be ticked after import, per-km tariffs, typical distance, ports. */
    public record RouteOptions(List<String> departurePorts, List<ServiceOption> services, List<RoadOption> delivery,
                               Integer typicalDistanceKm) {
    }

    private final EuPortRepository ports;
    private final EuCountryTaxProfileRepository taxes;
    private final TariffCatalog catalog;

    public ReferenceDataController(EuPortRepository ports, EuCountryTaxProfileRepository taxes, TariffCatalog catalog) {
        this.ports = ports;
        this.taxes = taxes;
        this.catalog = catalog;
    }

    /** Amounts of after-import services are not exposed here - they are part of the paid report. */
    @GetMapping("/options")
    public RouteOptions options(@RequestParam OriginCountry origin, @RequestParam String destination,
                                @RequestParam String euPort) {
        List<String> departurePorts = catalog.inlandRates(origin, "*").stream()
                .map(InlandTransportRate::getDeparturePort).distinct().toList();
        List<ServiceOption> services = catalog.destinationFees(destination).stream()
                .filter(f -> f.appliesTo(origin))
                .map(f -> new ServiceOption(f.getCode(), !f.isSelectable(), f.isDefaultSelected()))
                .toList();
        List<RoadOption> delivery = Arrays.stream(DeliveryMode.values())
                .filter(DeliveryMode::needsRoad)
                .flatMap(m -> catalog.roadRate(destination, m).stream())
                .map(r -> new RoadOption(r.getMode(), r.getPricePerKmMin(), r.getPricePerKmMax(), r.getFixedFee(),
                        r.getMinimumCharge(), r.getCurrency().name()))
                .toList();
        Integer km = catalog.port(euPort)
                .flatMap(p -> DeliveryStep.typicalKm(p, destination, catalog.intraEuRate(euPort, destination)))
                .orElse(euPort.startsWith(destination) ? 300 : null);
        return new RouteOptions(departurePorts, services, delivery, km);
    }

    @GetMapping("/origins")
    public ResponseEntity<List<OriginOption>> origins() {
        List<OriginOption> body = Arrays.stream(OriginCountry.values())
                .map(o -> new OriginOption(o, o.currency().name(),
                        Arrays.stream(AuctionHouse.values()).filter(o::supports).toList()))
                .toList();
        return ResponseEntity.ok().cacheControl(CacheControl.maxAge(Duration.ofHours(1))).body(body);
    }

    @GetMapping("/ports")
    public ResponseEntity<List<PortOption>> ports() {
        List<PortOption> body = ports.findByActiveTrueOrderByName().stream()
                .map(p -> new PortOption(p.getCode(), p.getName(), p.getCountryCode(),
                        taxes.findByCountryCodeOrderByValidFromDesc(p.getCountryCode()).stream()
                                .findFirst().map(EuCountryTaxProfile::getStandardVatRate).orElse(null),
                        p.isSupportsProcedure4200(), p.getRegion(),
                        p.location() == null ? null : p.location().lat(),
                        p.location() == null ? null : p.location().lon()))
                .toList();
        return ResponseEntity.ok().cacheControl(CacheControl.maxAge(Duration.ofHours(1))).body(body);
    }
}
