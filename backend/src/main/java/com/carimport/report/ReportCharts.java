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
 * Chart data for the PDF: cost structure (donut, drawn as a PNG because the PDF renderer has no SVG), the three
 * scenarios as stacked bars, the largest cost items and the timeline as a Gantt strip. Bars are plain HTML blocks
 * with percentage widths; every chart sits next to its numbers, so nothing is told by colour alone.
 */
public record ReportCharts(
        String donut,
        List<Slice> slices,
        Money total,
        Money importCosts,
        BigDecimal importShare,
        List<ScenarioBar> scenarios,
        List<ItemBar> items,
        List<StageBar> stages) {

    /** Categorical colours in fixed order (one per category), validated for colour-blind separation. */
    static final Map<CostCategory, String> COLORS = new EnumMap<>(Map.of(
            CostCategory.VEHICLE, "#2a78d6",
            CostCategory.TRANSPORT, "#eb6834",
            CostCategory.TAXES, "#1baf7a",
            CostCategory.REGISTRATION, "#eda100",
            CostCategory.RISK, "#e87ba4"));

    private static final int TOP_ITEMS = 7;
    private static final int DONUT_PX = 600;

    public record Slice(CostCategory category, String color, Money amount, BigDecimal percent) {
    }

    public record Segment(String color, BigDecimal width) {
    }

    /** @param rest empty space after the bar, as percent of the longest bar (the pessimistic total) */
    public record ScenarioBar(int scenario, Money total, BigDecimal rest, List<Segment> segments) {
    }

    public record ItemBar(CostLine line, String color, Money amount, BigDecimal width, BigDecimal percent) {
    }

    /** Offset and widths as percent of the longest possible lead time: firm part (min days), then the possible delay. */
    public record StageBar(CalculationResult.Stage stage, BigDecimal offset, BigDecimal firm, BigDecimal delay) {
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
        Money vehicle = byCategory.getOrDefault(CostCategory.VEHICLE, Money.zero(total.currency()));
        Money importCosts = total.minus(vehicle);

        List<ScenarioBar> scenarios = new ArrayList<>();
        if (table != null) {
            BigDecimal longest = max(table.totals()[0].amount(), table.totals()[1].amount(), table.totals()[2].amount());
            for (int i = 0; i < 3; i++) {
                List<Segment> segments = new ArrayList<>();
                for (CostCategory c : CostCategory.values()) {
                    BigDecimal v = table.categoryTotals().get(c)[i].amount();
                    if (v.signum() > 0) {
                        segments.add(new Segment(COLORS.get(c), percent(v, longest)));
                    }
                }
                BigDecimal sum = segments.stream().map(Segment::width).reduce(BigDecimal.ZERO, BigDecimal::add);
                scenarios.add(new ScenarioBar(i, table.totals()[i], BigDecimal.valueOf(100).subtract(sum), segments));
            }
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
                percent(importCosts.amount(), vehicle.amount()), scenarios, items, stages);
    }

    /** Ring chart clockwise from 12 o'clock with a thin white gap between the slices; the legend is HTML. */
    static String donut(List<Slice> slices) {
        BufferedImage img = new BufferedImage(DONUT_PX, DONUT_PX, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = img.createGraphics();
        try {
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
            double pad = 6;
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
                g.setStroke(new BasicStroke(7f));
                for (double a : cuts) {
                    double rad = Math.toRadians(a);
                    g.draw(new Line2D.Double(c, c, c + c * Math.cos(rad), c - c * Math.sin(rad)));
                }
            }
            double hole = size * 0.58;
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

    private static BigDecimal max(BigDecimal... values) {
        BigDecimal m = BigDecimal.ZERO;
        for (BigDecimal v : values) {
            m = m.max(v);
        }
        return m;
    }
}
