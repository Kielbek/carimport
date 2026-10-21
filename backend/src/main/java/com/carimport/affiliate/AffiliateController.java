package com.carimport.affiliate;

import com.carimport.config.AppProperties;
import java.net.URI;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Contextual affiliate widgets (FX exchange, leasing/credit, VIN history). Offers are configuration-driven and every
 * click goes through {@code /go/{id}} so we can attribute conversions (subId = quote id) and swap partners without a
 * frontend deploy. Links are rendered with rel="sponsored noopener".
 */
@RestController
@RequestMapping("/api/v1/affiliates")
public class AffiliateController {

    private static final Logger clicks = LoggerFactory.getLogger("affiliate.clicks");

    public record Offer(String id, String kind, String partner, String href) {
    }

    private final AppProperties props;

    public AffiliateController(AppProperties props) {
        this.props = props;
    }

    @GetMapping
    public List<Offer> offers(@RequestParam String origin, @RequestParam String country, @RequestParam String locale) {
        return props.affiliates().stream()
                .filter(o -> o.origins().isEmpty() || o.origins().contains(origin))
                .filter(o -> o.countries().isEmpty() || o.countries().contains(country))
                .filter(o -> o.locales().isEmpty() || o.locales().contains(locale))
                .sorted(Comparator.comparingInt(AppProperties.AffiliateOffer::priority))
                .map(o -> new Offer(o.id(), o.kind(), o.partner(), "/api/v1/affiliates/go/" + o.id()))
                .toList();
    }

    @GetMapping("/go/{id}")
    public ResponseEntity<Void> go(@PathVariable String id, @RequestParam(defaultValue = "en") String locale,
                                   @RequestParam(required = false) String subId) {
        AppProperties.AffiliateOffer offer = props.affiliates().stream()
                .filter(o -> o.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        clicks.info("click offer={} partner={} locale={} subId={}", id, offer.partner(), locale, subId);
        String url = offer.url()
                .replace("{locale}", locale.replaceAll("[^a-z]", ""))
                .replace("{subId}", subId == null ? "" : subId.replaceAll("[^A-Za-z0-9-]", ""));
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(url)).build();
    }
}
