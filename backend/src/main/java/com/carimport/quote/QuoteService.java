package com.carimport.quote;

import com.carimport.calculation.CalculationEngine;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.QuoteRange;
import com.carimport.fx.ExchangeRateService;
import com.carimport.fx.FxRates;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuoteService {

    /** A quote's FX snapshot is honoured for 48h; afterwards the wizard asks the user to recalculate. */
    static final Duration VALIDITY = Duration.ofHours(48);

    private final CalculationEngine engine;
    private final ExchangeRateService rates;
    private final QuoteRepository repository;
    private final Clock clock;

    public QuoteService(CalculationEngine engine, ExchangeRateService rates, QuoteRepository repository, Clock clock) {
        this.engine = engine;
        this.rates = rates;
        this.repository = repository;
        this.clock = clock;
    }

    /** Live preview for the wizard - nothing is stored. */
    public PublicQuoteView preview(CalculationRequest request) {
        QuoteRange range = engine.calculateRange(request, rates.latest());
        return PublicQuoteView.of(null, range, null);
    }

    /** Freezes the calculation so it can be bought as a report or attached to a partner lead. */
    @Transactional
    public PublicQuoteView create(CalculationRequest request, String locale) {
        FxRates fx = rates.latest();
        QuoteRange range = engine.calculateRange(request, fx);
        Instant now = clock.instant();
        Quote quote = new Quote(request, range,
                PublicQuoteView.floorToStep(range.low().total()),
                PublicQuoteView.ceilToStep(range.high().total()),
                locale, now, now.plus(VALIDITY));
        repository.save(quote);
        return PublicQuoteView.of(quote.getId(), range, quote.getExpiresAt());
    }

    @Transactional(readOnly = true)
    public Optional<Quote> find(UUID id) {
        return repository.findById(id);
    }
}
