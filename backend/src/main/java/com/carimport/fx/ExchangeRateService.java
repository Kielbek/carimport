package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.EnumMap;
import java.util.Map;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExchangeRateService {

    public static final String CACHE = "fx-latest";

    private final ExchangeRateRepository repository;

    public ExchangeRateService(ExchangeRateRepository repository) {
        this.repository = repository;
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
        return new FxRates(oldest, "NBP", rates);
    }

    @CacheEvict(value = CACHE, allEntries = true)
    public void evict() {
        // invoked by the sync job after new rates are stored
    }
}
