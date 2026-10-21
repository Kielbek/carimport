package com.carimport.web;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.OriginCountry;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.reference.EuCountryTaxProfileRepository;
import com.carimport.reference.EuPortRepository;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Static wizard options (cached by the CDN / browser for an hour). */
@RestController
@RequestMapping("/api/v1/reference")
public class ReferenceDataController {

    public record OriginOption(OriginCountry code, String currency, List<AuctionHouse> auctionHouses) {
    }

    public record PortOption(String code, String name, String countryCode, BigDecimal vatRate,
                             boolean supportsProcedure4200) {
    }

    private final EuPortRepository ports;
    private final EuCountryTaxProfileRepository taxes;

    public ReferenceDataController(EuPortRepository ports, EuCountryTaxProfileRepository taxes) {
        this.ports = ports;
        this.taxes = taxes;
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
                        p.isSupportsProcedure4200()))
                .toList();
        return ResponseEntity.ok().cacheControl(CacheControl.maxAge(Duration.ofHours(1))).body(body);
    }
}
