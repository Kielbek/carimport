package com.carimport.calculation.strategy;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.Money;
import com.carimport.reference.EuCountryTaxProfile;
import java.math.BigDecimal;
import java.time.Year;
import java.util.Map;

/**
 * Template method for import VAT (Art. 85-86 VAT Directive):
 * <pre>
 * base = customs value + duty + excise levied in the clearance state + incidental costs to the first destination
 * VAT  = base x rate (standard, or reduced for collectors' items)
 * </pre>
 * Procedure 4200 replaces the import VAT by an exempt import followed by an intra-EU supply; VAT is then self-assessed
 * by the VAT-registered buyer in the destination state (reverse charge) and is shown as an informational line.
 */
public abstract class AbstractClearanceVatStrategy implements ClearanceVatStrategy {

    public static final String IMPORT_VAT = "IMPORT_VAT";
    public static final String REVERSE_CHARGE_VAT = "INTRA_EU_ACQUISITION_VAT";

    @Override
    public final void apply(CalculationContext ctx) {
        EuCountryTaxProfile profile = ctx.clearanceTax();
        Money base = vatBase(ctx);
        if (ctx.request().customsProcedure() == CustomsProcedure.VAT_DEFERRED_4200) {
            applyProcedure4200(ctx, base);
        } else {
            BigDecimal rate = ctx.historic() ? profile.getCollectorVatRate() : profile.getStandardVatRate();
            Money vat = ctx.roundTax(base.percent(rate), profile);
            ctx.add(CostLine.tax(IMPORT_VAT, base, rate, vat, Map.of(
                    "country", profile.getCountryCode(), "localName", localTaxName())));
            warnAboutNewMeansOfTransport(ctx);
        }
        afterVat(ctx);
    }

    /** Excise counts only when it is levied by the clearance state itself (car cleared where it will be registered). */
    protected Money vatBase(CalculationContext ctx) {
        Money base = ctx.customsValue().plus(ctx.duty()).plus(ctx.vatIncidentalCosts());
        if (ctx.clearedInDestinationCountry()) {
            base = base.plus(ctx.excise());
        }
        return base.rounded();
    }

    /** Name of the tax on the local customs documents, printed in the PDF next to the translated label. */
    protected abstract String localTaxName();

    protected boolean allowsProcedure4200() {
        return true;
    }

    /** Hook for country-specific notes. */
    protected void afterVat(CalculationContext ctx) {
    }

    private void applyProcedure4200(CalculationContext ctx, Money base) {
        var req = ctx.request();
        if (req.buyerType() != BuyerType.COMPANY) {
            throw new CalculationException("validation.procedure4200.companyOnly", req.buyerType().name());
        }
        if (!allowsProcedure4200() || !ctx.euPort().isSupportsProcedure4200()) {
            throw new CalculationException("error.procedure4200.notAvailableInPort", ctx.euPort().getCode());
        }
        if (ctx.clearedInDestinationCountry()) {
            throw new CalculationException("error.procedure4200.sameCountry", req.destinationCountry());
        }
        ctx.add(CostLine.tax(IMPORT_VAT, base, BigDecimal.ZERO, ctx.zero(), Map.of(
                "country", ctx.clearanceTax().getCountryCode(), "localName", localTaxName(), "procedure", "4200")));

        EuCountryTaxProfile destination = ctx.catalog().taxProfile(req.destinationCountry())
                .orElseThrow(() -> new CalculationException("error.taxProfile.missing", req.destinationCountry()));
        Money destBase = ctx.fx().convert(base, destination.getTaxCurrency());
        Money destVat = ctx.roundTax(destBase.percent(destination.getStandardVatRate()), destination);
        ctx.add(new CostLine(REVERSE_CHARGE_VAT, CostCategory.TAXES, destVat, ctx.toBase(destVat).rounded(), destBase,
                destination.getStandardVatRate(), false,
                Map.of("country", destination.getCountryCode(), "mechanism", "REVERSE_CHARGE")));
        ctx.warn("warning.procedure4200.reverseChargeDeductible");
    }

    /**
     * A "new means of transport" (<= 6 months or <= 6000 km) is taxed with VAT in the destination state even for
     * private buyers, so import VAT paid in another member state is not final.
     */
    private static void warnAboutNewMeansOfTransport(CalculationContext ctx) {
        int age = Year.from(ctx.calculationDate()).getValue() - ctx.request().productionYear();
        if (!ctx.clearedInDestinationCountry() && age <= 0) {
            ctx.warn("warning.newMeansOfTransport.vatInDestination");
        }
    }
}
