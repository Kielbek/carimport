package com.carimport.report;

import com.carimport.payment.ReportOrder;
import com.carimport.quote.Quote;
import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;
import java.util.Locale;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * Thymeleaf (localized via #{...} message keys) -> XHTML -> PDF with OpenHTMLtoPDF. A bundled Unicode font
 * (DejaVu Sans) is required for Polish diacritics and Cyrillic (UA); the PDF base fonts cover Latin-1 only.
 */
@Component
public class PdfReportRenderer {

    private static final String FONT_REGULAR = "fonts/DejaVuSans.ttf";
    private static final String FONT_BOLD = "fonts/DejaVuSans-Bold.ttf";

    private final TemplateEngine templates;
    private final DocumentChecklistService checklist;
    private final AfterImportPlanService planner;

    public PdfReportRenderer(TemplateEngine templates, DocumentChecklistService checklist,
                             AfterImportPlanService planner) {
        this.templates = templates;
        this.checklist = checklist;
        this.planner = planner;
    }

    public byte[] render(ReportOrder order, Quote quote) {
        return render(order, quote, false);
    }

    /** @param sample watermark every page - the public example linked from the paywall */
    public byte[] render(ReportOrder order, Quote quote, boolean sample) {
        Locale locale = Locale.forLanguageTag(order.getLocale());
        Context ctx = new Context(locale);
        ctx.setVariable("sample", sample);
        ctx.setVariable("order", order);
        ctx.setVariable("quote", quote);
        ctx.setVariable("result", quote.getResult());
        ctx.setVariable("request", quote.getRequest());
        List<DocumentChecklistService.ChecklistItem> docs =
                checklist.checklist(quote.getRequest(), quote.getResult().historic());
        ctx.setVariable("documents", docs);
        ScenarioTable table = quote.getRange() != null ? ScenarioTable.of(quote.getRange()) : null;
        ctx.setVariable("table", table);
        ctx.setVariable("charts", ReportCharts.of(quote.getResult(), table));
        ctx.setVariable("plan", planner.plan(quote.getRequest(), quote.getResult().route().euPortCode().substring(0, 2)));
        String html = templates.process("report", ctx);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            registerFont(builder, FONT_REGULAR, 400);
            registerFont(builder, FONT_BOLD, 700);
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();
            return out.toByteArray();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private static void registerFont(PdfRendererBuilder builder, String path, int weight) {
        ClassPathResource font = new ClassPathResource(path);
        builder.useFont(() -> {
            try {
                return font.getInputStream();
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
        }, "Report Sans", weight, BaseRendererBuilder.FontStyle.NORMAL, true);
    }
}
