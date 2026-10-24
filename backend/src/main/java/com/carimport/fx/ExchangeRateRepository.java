package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {

    Optional<ExchangeRate> findFirstByCurrencyOrderByEffectiveDateDesc(CurrencyCode currency);

    Optional<ExchangeRate> findFirstByCurrencyAndEffectiveDateLessThanEqualOrderByEffectiveDateDesc(
            CurrencyCode currency, LocalDate date);

    boolean existsByCurrencyAndEffectiveDate(CurrencyCode currency, LocalDate date);

    boolean existsByCurrencyAndEffectiveDateAndSource(CurrencyCode currency, LocalDate date, ExchangeRate.Source source);
}
