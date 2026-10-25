package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
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

    private final Clock clock;

    public FxSyncJob(NbpRateClient nbp, ExchangeRateRepository repository, ExchangeRateService rateService,
                     Clock clock) {
        this.clock = clock;
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
        int stored = store(fetched);
        rateService.evict();
        log.info("FX sync finished: {} new rates stored", stored);
    }

    /**
     * Makes sure the rates customs applies this month are stored - the day lies in the previous month, so a fresh
     * database (or one that missed that day) fetches that table from NBP's archive. Runs at startup and after each sync.
     */
    @EventListener(ApplicationReadyEvent.class)
    @Scheduled(cron = "${app.fx.cron:0 20 12,23 * * MON-FRI}", zone = "Europe/Warsaw")
    @Transactional
    public void ensureCustomsRateDay() {
        LocalDate day = FxRates.customsRateDay(LocalDate.now(clock));
        if (repository.existsByCurrencyAndEffectiveDate(CurrencyCode.USD, day)) {
            return;
        }
        try {
            List<ExchangeRate> fetched = new ArrayList<>(nbp.fetchTable("A", day));
            fetched.addAll(nbp.fetchTable("B", day));
            int stored = store(fetched);
            rateService.evict();
            log.info("Customs rate day {}: {} rates stored", day, stored);
        } catch (RuntimeException e) {
            log.warn("Customs rate day {} could not be fetched - customs value uses the latest rates", day, e);
        }
    }

    private int store(List<ExchangeRate> fetched) {
        int stored = 0;
        for (ExchangeRate rate : fetched) {
            if (!repository.existsByCurrencyAndEffectiveDateAndSource(rate.getCurrency(), rate.getEffectiveDate(),
                    rate.getSource())) {
                repository.save(rate);
                stored++;
            }
        }
        return stored;
    }
}
