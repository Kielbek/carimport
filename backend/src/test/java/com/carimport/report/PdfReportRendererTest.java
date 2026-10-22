package com.carimport.report;

import static org.assertj.core.api.Assertions.assertThat;

import com.carimport.calculation.CalculationEngineTest;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.QuoteRange;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.FuelType;
import com.carimport.payment.ReportOrder;
import com.carimport.quote.Quote;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.UUID;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

class PdfReportRendererTest {

    @ParameterizedTest
    @ValueSource(strings = {"bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "hr", "hu", "it", "lt", "lv", "nl",
            "pl", "pt", "ro", "sk", "sl", "sv", "uk"})
    void rendersLocalizedReport(String locale) throws Exception {
        ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
        messages.setBasename("i18n/messages");
        messages.setDefaultEncoding(StandardCharsets.UTF_8.name());
        messages.setFallbackToSystemLocale(false);
        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("templates/");
        resolver.setSuffix(".html");
        SpringTemplateEngine templates = new SpringTemplateEngine();
        templates.setTemplateResolver(resolver);
        templates.setTemplateEngineMessageSource(messages);

        CalculationEngineTest support = new CalculationEngineTest();
        CalculationRequest request = CalculationEngineTest.copartToGdynia(FuelType.PETROL, 2500);
        QuoteRange range = support.range(request);
        CalculationResult result = range.expected();
        Quote quote = new Quote(request, range, result.total().amount(), result.total().amount(), locale,
                Instant.now(), Instant.now().plusSeconds(3600));
        ReportOrder order = new ReportOrder(quote.getId(), "jan@example.com", "Jan Kowalski", locale, 1900,
                CurrencyCode.PLN, "x".repeat(64), Instant.now());
        order.markPaid("pi_1", Instant.now());

        byte[] pdf = new PdfReportRenderer(templates, new DocumentChecklistService(), new AfterImportPlanService())
                .render(order, quote);

        try (PDDocument doc = Loader.loadPDF(pdf)) {
            String text = new PDFTextStripper().getText(doc);
            assertThat(text).contains("Jan Kowalski").contains("8703");
            if (locale.equals("pl")) {
                assertThat(text).contains("Akcyza").contains("Razem koszt").contains("Pesymistyczny")
                        .contains("350 km").contains("Rejestracja w wydziale komunikacji");
            }
            if (locale.equals("uk")) {
                assertThat(text).contains("Акциз");
            }
        }
        assertThat(UUID.fromString(order.getId().toString())).isNotNull();
    }
}
