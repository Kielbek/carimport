package com.carimport.quote;

import com.carimport.calculation.CalculationRequest;
import jakarta.validation.Valid;
import java.util.Locale;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteController {

    private final QuoteService quotes;

    public QuoteController(QuoteService quotes) {
        this.quotes = quotes;
    }

    /** Called (debounced) on every wizard change. Rate-limited per IP at the gateway. */
    @PostMapping("/preview")
    public PublicQuoteView preview(@Valid @RequestBody CalculationRequest request) {
        return quotes.preview(request);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PublicQuoteView create(@Valid @RequestBody CalculationRequest request) {
        Locale locale = LocaleContextHolder.getLocale();
        return quotes.create(request, locale.getLanguage());
    }
}
