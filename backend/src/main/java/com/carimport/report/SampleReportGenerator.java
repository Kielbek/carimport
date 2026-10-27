package com.carimport.report;

import com.carimport.calculation.CalculationEngine;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.QuoteRange;
import com.carimport.domain.AuctionHouse;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import com.carimport.fx.ExchangeRateService;
import com.carimport.fx.FxRates;
import com.carimport.payment.ReportOrder;
import com.carimport.quote.Quote;
import com.carimport.quote.SuggestionService;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Builds the public example reports (frontend/public/samples/report-{lang}.pdf) with the real engine and reference
 * data: one car - a 2019 Ford Mustang GT bought at Copart - imported to the home country of each language, through the
 * cheapest port, in that country's currency, watermarked as a sample. Run when rates or templates change:
 * {@code java -jar app.jar --spring.profiles.active=samples --samples.dir=../frontend/public/samples}
 */
@Component
@Profile("samples")
public class SampleReportGenerator implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(SampleReportGenerator.class);

    /** language → country of registration and the buyer's name printed on the sample */
    private static final Map<String, String[]> SAMPLES = Map.ofEntries(
            Map.entry("bg", new String[] {"BG", "Иван Петров"}), Map.entry("cs", new String[] {"CZ", "Jan Novák"}),
            Map.entry("da", new String[] {"DK", "Lars Jensen"}), Map.entry("de", new String[] {"DE", "Max Mustermann"}),
            Map.entry("el", new String[] {"GR", "Γιώργος Παπαδόπουλος"}), Map.entry("en", new String[] {"IE", "John Murphy"}),
            Map.entry("es", new String[] {"ES", "Juan Pérez"}), Map.entry("et", new String[] {"EE", "Mart Tamm"}),
            Map.entry("fi", new String[] {"FI", "Matti Virtanen"}), Map.entry("fr", new String[] {"FR", "Jean Dupont"}),
            Map.entry("hr", new String[] {"HR", "Ivan Horvat"}), Map.entry("hu", new String[] {"HU", "Nagy László"}),
            Map.entry("it", new String[] {"IT", "Mario Rossi"}), Map.entry("lt", new String[] {"LT", "Jonas Kazlauskas"}),
            Map.entry("lv", new String[] {"LV", "Jānis Bērziņš"}), Map.entry("nl", new String[] {"NL", "Jan de Vries"}),
            Map.entry("pl", new String[] {"PL", "Jan Kowalski"}), Map.entry("pt", new String[] {"PT", "João Silva"}),
            Map.entry("ro", new String[] {"RO", "Andrei Popescu"}), Map.entry("sk", new String[] {"SK", "Peter Horváth"}),
            Map.entry("sl", new String[] {"SI", "Janez Novak"}), Map.entry("sv", new String[] {"SE", "Erik Johansson"}),
            Map.entry("uk", new String[] {"PL", "Олександр Коваленко"}));

    private static final Map<String, CurrencyCode> CURRENCY = Map.of("PL", CurrencyCode.PLN, "CZ", CurrencyCode.CZK,
            "DK", CurrencyCode.DKK, "HU", CurrencyCode.HUF, "RO", CurrencyCode.RON, "SE", CurrencyCode.SEK);

    private final CalculationEngine engine;
    private final SuggestionService suggestions;
    private final ExchangeRateService rates;
    private final PdfReportRenderer renderer;
    private final ConfigurableApplicationContext context;
    private final Path dir;

    public SampleReportGenerator(CalculationEngine engine, SuggestionService suggestions, ExchangeRateService rates,
                                 PdfReportRenderer renderer, ConfigurableApplicationContext context,
                                 @Value("${samples.dir:samples}") String dir) {
        this.engine = engine;
        this.suggestions = suggestions;
        this.rates = rates;
        this.renderer = renderer;
        this.context = context;
        this.dir = Path.of(dir);
    }

    @Override
    public void run(String... args) throws IOException {
        Files.createDirectories(dir);
        FxRates fx = rates.latest();
        Instant now = Instant.now();
        for (var e : SAMPLES.entrySet()) {
            String lang = e.getKey();
            String country = e.getValue()[0];
            CalculationRequest base = request(country, CURRENCY.getOrDefault(country, CurrencyCode.EUR), "DEBRV");
            String port = suggestions.suggest(base).recommendedPort();
            CalculationRequest request = request(country, base.displayCurrency(), port);
            QuoteRange range = engine.calculateRange(request, fx);
            Quote quote = new Quote(request, range, range.low().total().amount(),
                    range.high().total().amount(), lang, now, now.plusSeconds(3600));
            ReportOrder order = new ReportOrder(quote.getId(), "sample@cargloapp.com", e.getValue()[1], lang, 0,
                    request.displayCurrency(), "x".repeat(64), now);
            order.markPaid("sample", now);
            Path file = dir.resolve("report-" + lang + ".pdf");
            Files.write(file, renderer.render(order, quote, true));
            log.info("Sample {} → {} via {} ({} bytes)", lang, country, port, Files.size(file));
        }
        context.close();
    }

    private static CalculationRequest request(String country, CurrencyCode currency, String port) {
        return new CalculationRequest(OriginCountry.USA, AuctionHouse.COPART, TitleType.SALVAGE, "NJ", null,
                new BigDecimal("18000"), VehicleCategory.PASSENGER_CAR, FuelType.PETROL, 4951, 2019, false,
                VehicleCondition.RUN_AND_DRIVE, ShippingMethod.CONTAINER_SHARED, port, country, BuyerType.PRIVATE,
                CustomsProcedure.STANDARD_4000, currency, null, null, null, null, null, null, null, null, null,
                314, 343, null, 1720, null, "2019 Ford Mustang GT 5.0 V8", null);
    }
}
