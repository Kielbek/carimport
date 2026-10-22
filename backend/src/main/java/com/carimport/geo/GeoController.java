package com.carimport.geo;

import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.Locale;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Address autocomplete for the delivery address (EU only). */
@RestController
@RequestMapping("/api/v1/geo")
@Validated
public class GeoController {

    private final GeoService geo;

    public GeoController(GeoService geo) {
        this.geo = geo;
    }

    @GetMapping("/search")
    public List<Place> search(@RequestParam @Size(min = 2, max = 160) String q, Locale locale) {
        return geo.search(q, locale.getLanguage());
    }
}
