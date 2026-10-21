package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Pulls NBP rates every working day shortly after publication (~12:15 CET) and once at night as a safety net.
 * AED is pegged to USD (3.6725) - when table B is stale or unavailable the rate is derived from USD.
 */
@Component
public class FxSyncJob {

    private static final Logger log = LoggerFactory.getLogger(FxSyncJob.class);
    static final BigDecimal AED_PER_USD = new BigDecimal("3.6725");

    private final NbpRateClient nbp;
    private final ExchangeRateRepository repository;
    private final ExchangeRateService rateService;

    public FxSyncJob(NbpRateClient nbp, ExchangeRateRepository repository, ExchangeRateService rateService) {
        this.nbp = nbp;
        this.repository = repository;
        this.rateService = rateService;
    }

    @Scheduled(cron = "${app.fx.cron:0 20 12,23 * * MON-FRI}", zone = "Europe/Warsaw")
    @Transactional
    public void sync() {
        List<ExchangeRate> fetched = new ArrayList<>(nbp.fetchTable("A"));
        try {
            fetched.addAll(nbp.fetchTable("B"));
        } catch (RuntimeException e) {
            log.warn("NBP table B unavailable, AED will be derived from the USD peg", e);
        }
        boolean hasAed = fetched.stream().anyMatch(r -> r.getCurrency() == CurrencyCode.AED);
        if (!hasAed) {
            fetched.stream().filter(r -> r.getCurrency() == CurrencyCode.USD).findFirst().ifPresent(usd ->
                    fetched.add(new ExchangeRate(CurrencyCode.AED,
                            usd.getPlnPerUnit().divide(AED_PER_USD, 8, RoundingMode.HALF_UP),
                            usd.getEffectiveDate(), ExchangeRate.Source.DERIVED, "USD-peg")));
        }
        int stored = 0;
        for (ExchangeRate rate : fetched) {
            if (!repository.existsByCurrencyAndEffectiveDateAndSource(rate.getCurrency(), rate.getEffectiveDate(),
                    rate.getSource())) {
                repository.save(rate);
                stored++;
            }
        }
        rateService.evict();
        log.info("FX sync finished: {} new rates stored", stored);
    }
}
