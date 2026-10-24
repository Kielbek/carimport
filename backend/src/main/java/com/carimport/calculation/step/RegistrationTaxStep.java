package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationRequest;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.registration.RegistrationTaxes;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCategory;
import com.carimport.reference.EuCountryTaxProfile;
import java.math.BigDecimal;
import java.util.EnumSet;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * One-off registration tax of the country where the car will be registered (NoVA, BPM, malus, VRT, ISV, ...), paid at
 * home whatever the port. Poland is left to the excise step. The buyer's own figure wins; otherwise the
 * {@link RegistrationTaxes} estimate where the country is modelled, else a warning pointing to the official calculator.
 */
@Component
public class RegistrationTaxStep implements CalculationStep {

    public static final String CODE = "REGISTRATION_TAX";
    private static final Set<VehicleCategory> CARS =
            EnumSet.of(VehicleCategory.PASSENGER_CAR, VehicleCategory.SUV, VehicleCategory.VAN);

    @Override
    public int order() {
        return REGISTRATION_TAX;
    }

    @Override
    public void apply(CalculationContext ctx) {
        CalculationRequest req = ctx.request();
        String country = req.destinationCountry();
        if ("PL".equals(country) || RegistrationTaxes.NONE.contains(country)) {
            return;
        }
        if (req.registrationTaxOwn() != null) {
            Money own = Money.of(req.registrationTaxOwn(), req.displayCurrency());
            ctx.add(new CostLine(CODE, CostCategory.TAXES, own, ctx.toBase(own), null, null, true,
                    CalculationContext.params("country", country, "type", "USER")));
            return;
        }
        if (!CARS.contains(req.vehicleCategory()) || ctx.historic() || !RegistrationTaxes.modelled(country)) {
            ctx.warn("warning.registrationTax.notModelled");
            return;
        }
        EuCountryTaxProfile profile = ctx.catalog().taxProfile(country).orElse(null);
        CurrencyCode local = profile == null ? CurrencyCode.EUR : profile.getTaxCurrency();
        BigDecimal vat = profile == null ? new BigDecimal("0.21") : profile.getStandardVatRate();
        Money value = ctx.fx().convert(ctx.customsValue().plus(ctx.duty()), local);
        int age = Math.max(0, ctx.calculationDate().getYear() - req.productionYear());

        RegistrationTaxes.assess(new RegistrationTaxes.Input(country, req.fuelType(), req.effectiveCo2(),
                req.effectivePowerKw(), req.engineCc(), req.effectiveMassKg(), age, value.amount(), vat)).ifPresent(a -> {
            Money tax = Money.of(a.amount(), local);
            ctx.add(new CostLine(CODE, CostCategory.TAXES, tax, ctx.toBase(tax), value, a.rate(), true,
                    CalculationContext.params(
                            "country", country,
                            "type", "ESTIMATE",
                            "method", a.method(),
                            "co2", String.valueOf(req.effectiveCo2()),
                            "co2Proposed", String.valueOf(req.co2Gkm() == null),
                            "powerKw", String.valueOf(req.effectivePowerKw()),
                            "massKg", String.valueOf(req.effectiveMassKg()),
                            "ageYears", String.valueOf(age))));
        });
    }
}
