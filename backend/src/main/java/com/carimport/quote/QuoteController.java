package com.carimport.quote;

import com.carimport.calculation.CalculationRequest;
import com.carimport.newsletter.NewsletterService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Locale;
import java.util.UUID;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteController {

    /** website is a honeypot: people never see the field, bots fill it in. */
    public record EmailRequest(@NotNull UUID quoteId, @NotBlank @Email @Size(max = 254) String email,
                               boolean newsletter, @Size(max = 200) String website) {
    }

    private final QuoteService quotes;
    private final SuggestionService suggestions;
    private final EstimateMailer mailer;
    private final NewsletterService newsletter;

    public QuoteController(QuoteService quotes, SuggestionService suggestions, EstimateMailer mailer,
                           NewsletterService newsletter) {
        this.quotes = quotes;
        this.suggestions = suggestions;
        this.mailer = mailer;
        this.newsletter = newsletter;
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

    /** The wizard input of a saved quote - the link in the estimate e-mail reopens the calculator with it. */
    @GetMapping("/{id}/request")
    public ResponseEntity<CalculationRequest> request(@PathVariable UUID id) {
        return quotes.find(id).map(q -> ResponseEntity.ok(q.getRequest())).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Sends the free estimate to the given address (not stored), optionally signing it up for the newsletter with
     * the usual double opt-in. 404 unknown quote, 429 too many e-mails for one quote, 503 e-mail not available.
     */
    @PostMapping("/email")
    public ResponseEntity<Void> email(@Valid @RequestBody EmailRequest body) {
        if (body.website() != null && !body.website().isBlank()) {
            return ResponseEntity.accepted().build();
        }
        String locale = LocaleContextHolder.getLocale().getLanguage();
        HttpStatus status = switch (mailer.send(body.quoteId(), body.email().trim(), locale)) {
            case SENT -> HttpStatus.ACCEPTED;
            case UNKNOWN_QUOTE -> HttpStatus.NOT_FOUND;
            case LIMIT -> HttpStatus.TOO_MANY_REQUESTS;
            case UNAVAILABLE, FAILED -> HttpStatus.SERVICE_UNAVAILABLE;
        };
        if (status == HttpStatus.ACCEPTED && body.newsletter()) {
            newsletter.subscribe(body.email().trim(), locale, "estimate");
        }
        return ResponseEntity.status(status).build();
    }
}
