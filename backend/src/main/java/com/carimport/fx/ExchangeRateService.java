package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.util.EnumMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExchangeRateService {

    public static final String CACHE = "fx-latest";

    private final ExchangeRateRepository repository;
    private final Clock clock;

    public ExchangeRateService(ExchangeRateRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    /** Latest known rate for every supported currency, cached until the next sync evicts it. */
    @Cacheable(CACHE)
    @Transactional(readOnly = true)
    public FxRates latest() {
        Map<CurrencyCode, BigDecimal> rates = new EnumMap<>(CurrencyCode.class);
        LocalDate oldest = LocalDate.now();
        for (CurrencyCode currency : CurrencyCode.values()) {
            if (currency == CurrencyCode.PLN) {
                continue;
            }
            ExchangeRate rate = repository.findFirstByCurrencyOrderByEffectiveDateDesc(currency)
                    .orElseThrow(() -> new IllegalStateException("Exchange rate for " + currency + " not synced yet"));
            rates.put(currency, rate.getPlnPerUnit());
            if (rate.getEffectiveDate().isBefore(oldest)) {
                oldest = rate.getEffectiveDate();
            }
        }
        return new FxRates(oldest, "NBP", rates).withCustoms(customs(LocalDate.now(clock)).orElse(null));
    }

    /**
     * Rates of the customs rate day for {@code date} (see {@link FxRates#customsRateDay}); empty when the history
     * does not reach back that far for every currency.
     */
    Optional<FxRates> customs(LocalDate date) {
        LocalDate day = FxRates.customsRateDay(date);
        Map<CurrencyCode, BigDecimal> rates = new EnumMap<>(CurrencyCode.class);
        for (CurrencyCode currency : CurrencyCode.values()) {
            if (currency == CurrencyCode.PLN) {
                continue;
            }
            Optional<ExchangeRate> rate = repository
                    .findFirstByCurrencyAndEffectiveDateLessThanEqualOrderByEffectiveDateDesc(currency, day)
                    // weekly table B: accept the last quote within a week before the rate day
                    .filter(r -> !r.getEffectiveDate().isBefore(day.minusDays(7)));
            if (rate.isEmpty()) {
                return Optional.empty();
            }
            rates.put(currency, rate.get().getPlnPerUnit());
        }
        return Optional.of(new FxRates(day, "NBP-customs", rates));
    }

    @CacheEvict(value = CACHE, allEntries = true)
    public void evict() {
        // invoked by the sync job after new rates are stored
    }
}
