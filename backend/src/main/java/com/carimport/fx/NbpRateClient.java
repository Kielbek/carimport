package com.carimport.fx;

import com.carimport.domain.CurrencyCode;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

/**
 * NBP Web API client. Table A (daily) covers USD, CAD, JPY, GBP, EUR; AED is only quoted in table B (weekly, Wednesdays).
 * See https://api.nbp.pl
 */
@Component
public class NbpRateClient {

    record NbpRate(String code, BigDecimal mid) {
    }

    record NbpTable(String table, String no, LocalDate effectiveDate, List<NbpRate> rates) {
    }

    private final RestClient http;

    public NbpRateClient(RestClient.Builder builder) {
        this.http = builder.baseUrl("https://api.nbp.pl/api").build();
    }

    public List<ExchangeRate> fetchTable(String table) {
        return toRates(http.get()
                .uri("/exchangerates/tables/{table}?format=json", table)
                .retrieve()
                .body(NbpTable[].class));
    }

    /** The table published on {@code date}; empty when there was none (holiday, or table B on another weekday). */
    public List<ExchangeRate> fetchTable(String table, LocalDate date) {
        try {
            return toRates(http.get()
                    .uri("/exchangerates/tables/{table}/{date}?format=json", table, date)
                    .retrieve()
                    .body(NbpTable[].class));
        } catch (HttpClientErrorException.NotFound e) {
            return List.of();
        }
    }

    private static List<ExchangeRate> toRates(NbpTable[] response) {
        if (response == null || response.length == 0) {
            return List.of();
        }
        NbpTable t = response[0];
        ExchangeRate.Source source = "A".equals(t.table()) ? ExchangeRate.Source.NBP_A : ExchangeRate.Source.NBP_B;
        return t.rates().stream()
                .filter(r -> isSupported(r.code()))
                .map(r -> new ExchangeRate(CurrencyCode.valueOf(r.code()), r.mid(), t.effectiveDate(), source, t.no()))
                .toList();
    }

    private static boolean isSupported(String code) {
        for (CurrencyCode c : CurrencyCode.values()) {
            if (c.name().equals(code) && c != CurrencyCode.PLN) {
                return true;
            }
        }
        return false;
    }
}
