package com.carimport.report;

import com.carimport.calculation.CalculationResult;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.Arc2D;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Line2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;

/**
 * Chart data for the PDF: cost structure (a thin ring, drawn as a PNG because the PDF renderer has no SVG), where the
 * expected cost sits between the optimistic and the pessimistic scenario, the largest cost items and the timeline as
 * a Gantt strip. Bars are plain HTML blocks with percentage widths; every chart sits next to its numbers, so nothing
 * is told by colour alone.
 */
public record ReportCharts(
        String donut,
        List<Slice> slices,
        Money total,
        Money importCosts,
        BigDecimal importShare,
        Money taxes,
        Gauge gauge,
        List<ItemBar> items,
        List<StageBar> stages) {

    /** The brand's restrained palette: ink, graphite, gold, steel and mist, told apart by lightness as well as hue. */
    static final Map<CostCategory, String> COLORS = new EnumMap<>(Map.of(
            CostCategory.VEHICLE, "#101011",
            CostCategory.TRANSPORT, "#5b5b63",
            CostCategory.TAXES, "#ffc000",
            CostCategory.REGISTRATION, "#a3a3ab",
            CostCategory.RISK, "#d9d9de"));

    private static final int TOP_ITEMS = 7;
    private static final int DONUT_PX = 720;

    public record Slice(CostCategory category, String color, Money amount, BigDecimal percent) {
    }

    /**
     * @param position where the expected total sits between the optimistic (0) and the pessimistic (100) one
     * @param label    the same, kept clear of the end labels so the three amounts never overlap
     */
    public record Gauge(Money low, Money expected, Money high, BigDecimal position, BigDecimal label) {
    }

    public record ItemBar(CostLine line, String color, Money amount, BigDecimal width, BigDecimal percent) {
    }

    /** Offset and widths as percent of the longest possible lead time: firm part (min days), then the possible delay. */
    public record StageBar(CalculationResult.Stage stage, BigDecimal offset, BigDecimal firm, BigDecimal delay) {
    }

    /** Colour of a category, for the keys in the cost table. */
    public static String color(CostCategory category) {
        return COLORS.get(category);
    }

    public static ReportCharts of(CalculationResult result, ScenarioTable table) {
        Money total = result.total();
        Map<CostCategory, Money> byCategory = result.totalsByCategory();
        List<Slice> slices = new ArrayList<>();
        for (CostCategory c : CostCategory.values()) {
            Money m = byCategory.get(c);
            if (m != null && m.amount().signum() > 0) {
                slices.add(new Slice(c, COLORS.get(c), m, percent(m.amount(), total.amount())));
            }
        }
        Money zero = Money.zero(total.currency());
        Money vehicle = byCategory.getOrDefault(CostCategory.VEHICLE, zero);
        Money importCosts = total.minus(vehicle);

        Gauge gauge = null;
        if (table != null) {
            Money low = table.totals()[0];
            Money high = table.totals()[2];
            BigDecimal spread = high.amount().subtract(low.amount());
            BigDecimal position = spread.signum() > 0
                    ? percent(table.totals()[1].amount().subtract(low.amount()), spread)
                    : BigDecimal.valueOf(50);
            BigDecimal label = position.max(BigDecimal.valueOf(16)).min(BigDecimal.valueOf(84));
            gauge = new Gauge(low, table.totals()[1], high, position, label);
        }

        List<CalculationResult.Line> top = result.lines().stream()
                .filter(l -> l.line().includedInTotal() && l.display().amount().signum() > 0)
                .sorted(Comparator.comparing((CalculationResult.Line l) -> l.display().amount()).reversed())
                .limit(TOP_ITEMS).toList();
        BigDecimal largest = top.isEmpty() ? BigDecimal.ONE : top.getFirst().display().amount();
        List<ItemBar> items = top.stream().map(l -> new ItemBar(l.line(), COLORS.get(l.line().category()), l.display(),
                percent(l.display().amount(), largest), percent(l.display().amount(), total.amount()))).toList();

        List<StageBar> stages = new ArrayList<>();
        int span = Math.max(1, result.timeline().totalMax());
        int start = 0;
        for (CalculationResult.Stage s : result.timeline().stages()) {
            stages.add(new StageBar(s, days(start, span), days(s.minDays(), span), days(s.maxDays() - s.minDays(), span)));
            start += s.minDays();
        }

        return new ReportCharts(slices.isEmpty() ? null : donut(slices), slices, total, importCosts,
                percent(importCosts.amount(), vehicle.amount()), byCategory.getOrDefault(CostCategory.TAXES, zero),
                gauge, items, stages);
    }

    /** Thin ring clockwise from 12 o'clock with a white gap between the slices; total and legend are HTML. */
    static String donut(List<Slice> slices) {
        BufferedImage img = new BufferedImage(DONUT_PX, DONUT_PX, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = img.createGraphics();
        try {
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
            double pad = 4;
            double size = DONUT_PX - 2 * pad;
            double sum = slices.stream().mapToDouble(s -> s.amount().amount().doubleValue()).sum();
            double angle = 90;
            List<Double> cuts = new ArrayList<>();
            for (Slice s : slices) {
                double extent = -360 * s.amount().amount().doubleValue() / sum;
                g.setColor(Color.decode(s.color()));
                g.fill(new Arc2D.Double(pad, pad, size, size, angle, extent, Arc2D.PIE));
                cuts.add(angle);
                angle += extent;
            }
            g.setColor(Color.WHITE);
            if (slices.size() > 1) {
                double c = DONUT_PX / 2.0;
                g.setStroke(new BasicStroke(6f));
                for (double a : cuts) {
                    double rad = Math.toRadians(a);
                    g.draw(new Line2D.Double(c, c, c + c * Math.cos(rad), c - c * Math.sin(rad)));
                }
            }
            double hole = size * 0.8;
            g.fill(new Ellipse2D.Double((DONUT_PX - hole) / 2, (DONUT_PX - hole) / 2, hole, hole));
        } finally {
            g.dispose();
        }
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            ImageIO.write(img, "png", out);
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(out.toByteArray());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private static BigDecimal percent(BigDecimal part, BigDecimal whole) {
        if (whole == null || whole.signum() <= 0) {
            return BigDecimal.ZERO;
        }
        return part.multiply(BigDecimal.valueOf(100)).divide(whole, 1, RoundingMode.HALF_UP);
    }

    private static BigDecimal days(int days, int span) {
        return percent(BigDecimal.valueOf(days), BigDecimal.valueOf(span));
    }
}
