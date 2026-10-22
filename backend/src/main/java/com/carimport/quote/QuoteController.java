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
    private final SuggestionService suggestions;

    public QuoteController(QuoteService quotes, SuggestionService suggestions) {
        this.quotes = quotes;
        this.suggestions = suggestions;
    }

    /**
     * Proposals for the fields the user does not have to fill in: every EU port priced door to door for this car and
     * address (cheapest first), road distances, delivery mode, repair and insurance amounts.
     */
    @PostMapping("/suggestions")
    public SuggestionService.Suggestions suggestions(@Valid @RequestBody CalculationRequest request) {
        return suggestions.suggest(request);
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
