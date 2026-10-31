package com.carimport.euimport;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CalculationException;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.Proposals;
import com.carimport.calculation.TariffCatalog;
import com.carimport.calculation.registration.RegistrationTaxes;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.Money;
import com.carimport.domain.VehicleCategory;
import com.carimport.fx.ExchangeRateService;
import com.carimport.fx.FxRates;
import com.carimport.geo.CountryCentres;
import com.carimport.geo.GeoPoint;
import com.carimport.geo.RoadDistance;
import com.carimport.reference.DestinationFee;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.reference.ExciseRate;
import com.carimport.reference.RoadTransportRate;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 * Landed cost of a car bought in another member state. Free movement of goods means no duty and no customs; a used
 * car carries the VAT of the country it was bought in (or none, from a private seller or under the margin scheme), so
 * only a new vehicle owes VAT at home. What remains is the road trip, the destination's one-off registration tax or
 * excise (assessed on the price paid, as for an intra-Community acquisition) and the registration fees.
 */
@Service
public class EuImportService {

    private static final Set<VehicleCategory> CARS =
            EnumSet.of(VehicleCategory.PASSENGER_CAR, VehicleCategory.SUV, VehicleCategory.VAN);
    /** Statutory fees that only apply to cars from outside the EU (no EU type approval). */
    private static final Set<String> NON_EU_ONLY = Set.of("INDIVIDUAL_APPROVAL", "COC_CERTIFICATE");
    /** Islands: the road estimate leaves out the ferry. */
    private static final Set<String> ISLANDS = Set.of("CY", "MT", "IE");
    private static final BigDecimal HALF = new BigDecimal("0.5");

    private final TariffCatalog catalog;
    private final ExchangeRateService rates;
    private final Clock clock;

    public EuImportService(TariffCatalog catalog, ExchangeRateService rates, Clock clock) {
        this.catalog = catalog;
        this.rates = rates;
        this.clock = clock;
    }

    public EuImportResult calculate(EuImportRequest req) {
        return calculate(req, rates.latest());
    }

    EuImportResult calculate(EuImportRequest req, FxRates fx) {
        CurrencyCode display = req.displayCurrency();
        String dest = req.destinationCountry();
        EuCountryTaxProfile profile = catalog.taxProfile(dest)
                .orElseThrow(() -> new CalculationException("error.taxProfile.missing", dest));
        CurrencyCode local = profile.getTaxCurrency();
        List<CostLine> lines = new ArrayList<>();
        Set<String> warnings = new LinkedHashSet<>();

        Money price = Money.of(req.price(), req.priceCurrency());
        lines.add(line("PURCHASE_PRICE", CostCategory.VEHICLE, price, fx, display, null, null, Map.of()));

        int km = distance(req);
        transport(req, km, fx, display, lines, warnings);

        Money priceLocal = fx.convert(price, local).rounded();
        if (req.newVehicle()) {
            Money vat = priceLocal.percent(profile.getStandardVatRate()).rounded();
            lines.add(line("EU_NEW_VEHICLE_VAT", CostCategory.TAXES, vat, fx, display, priceLocal,
                    profile.getStandardVatRate(), CalculationContext.params("country", dest)));
            warnings.add("warning.euImport.newVehicleVat");
        } else {
            warnings.add("warning.euImport.usedVatAtOrigin");
        }

        int age = Math.max(0, LocalDate.now(clock).getYear() - req.productionYear());
        if ("PL".equals(dest)) {
            polishExcise(req, priceLocal, fx, display, lines, warnings);
        } else {
            registrationTax(req, dest, profile, priceLocal, age, fx, display, lines, warnings);
        }

        for (DestinationFee fee : catalog.destinationFees(dest)) {
            if (fee.getOriginCountry() != null || NON_EU_ONLY.contains(fee.getCode())) {
                continue;
            }
            if (fee.isSelectable() && !(fee.isDefaultSelected() && "SWORN_TRANSLATION".equals(fee.getCode()))) {
                continue;
            }
            Money amount = Money.of(fee.getAmount(), fee.getCurrency());
            lines.add(line(fee.getCode(), CostCategory.REGISTRATION, amount, fx, display, null, null,
                    Map.of("type", fee.isSelectable() ? "OPTIONAL" : "STATUTORY", "estimate", String.valueOf(fee.isEstimate()))));
        }
        Money insurance = Proposals.liabilityInsurance(dest);
        if (!insurance.isZero()) {
            lines.add(line("INSURANCE_FIRST_YEAR", CostCategory.REGISTRATION, insurance, fx, display, null, null,
                    Map.of("type", "PROPOSED", "estimate", "true")));
        }
        if (ISLANDS.contains(dest) || ISLANDS.contains(req.originCountry())) {
            warnings.add("warning.euImport.ferry");
        }

        Map<CostCategory, Money> byCategory = new EnumMap<>(CostCategory.class);
        for (CostCategory c : CostCategory.values()) {
            byCategory.put(c, Money.zero(display));
        }
        for (CostLine l : lines) {
            byCategory.merge(l.category(), l.amount(), Money::plus);
        }
        Money total = byCategory.values().stream().reduce(Money.zero(display), Money::plus);
        return new EuImportResult(display, fx.effectiveDate(), List.copyOf(lines), byCategory, total, km,
                profile.getStandardVatRate(), warnings);
    }

    private static int distance(EuImportRequest req) {
        if (req.distanceKm() != null) {
            return req.distanceKm();
        }
        Optional<GeoPoint> from = CountryCentres.of(req.originCountry());
        Optional<GeoPoint> to = req.destinationPoint().or(() -> CountryCentres.of(req.destinationCountry()));
        return from.isPresent() && to.isPresent() ? RoadDistance.estimateKm(from.get(), to.get()) : 1000;
    }

    private void transport(EuImportRequest req, int km, FxRates fx, CurrencyCode display, List<CostLine> lines,
                           Set<String> warnings) {
        DeliveryMode mode = req.mode();
        Optional<RoadTransportRate> road = catalog.roadRate(req.destinationCountry(), mode);
        if (road.isEmpty()) {
            warnings.add("warning.intraEuTransport.notPriced");
            return;
        }
        RoadTransportRate rate = road.get();
        BigDecimal perKm = rate.getPricePerKmMin().add(rate.getPricePerKmMax()).multiply(HALF);
        BigDecimal cost = rate.getFixedFee().add(perKm.multiply(BigDecimal.valueOf(km))).max(rate.getMinimumCharge())
                .setScale(-1, RoundingMode.HALF_UP);
        Money original = Money.of(cost, rate.getCurrency());
        lines.add(line("EU_TRANSPORT_" + mode.name(), CostCategory.TRANSPORT, original, fx, display, null, null,
                CalculationContext.params(
                        "km", String.valueOf(km),
                        "from", req.originCountry(),
                        "to", req.destinationCountry(),
                        "perKm", perKm.stripTrailingZeros().toPlainString(),
                        "fixed", rate.getFixedFee().stripTrailingZeros().toPlainString(),
                        "currency", rate.getCurrency().name())));
        if (mode == DeliveryMode.SELF_DRIVE) {
            warnings.add("warning.euImport.exportPlates");
        }
    }

    private void polishExcise(EuImportRequest req, Money priceLocal, FxRates fx, CurrencyCode display,
                              List<CostLine> lines, Set<String> warnings) {
        if (!CARS.contains(req.category())) {
            return;
        }
        ExciseRate rate = catalog.exciseRates("PL", req.fuelType()).stream()
                .filter(r -> r.matches(req.engineCc()))
                .findFirst()
                .orElseThrow(() -> new CalculationException("error.excise.rateNotFound",
                        "PL/" + req.fuelType() + "/" + req.engineCc()));
        Money base = fx.convert(priceLocal, CurrencyCode.PLN).roundedToWholeUnits();
        Money excise = base.percent(rate.getRate()).roundedToWholeUnits();
        lines.add(line("EXCISE_TAX", CostCategory.TAXES, excise, fx, display, base, rate.getRate(),
                CalculationContext.params("country", "PL", "fuelType", req.fuelType().name(),
                        "engineCc", String.valueOf(req.engineCc()), "paidAt", "TAX_OFFICE")));
        warnings.add("warning.pl.exciseDeclarationWithin14Days");
    }

    private static void registrationTax(EuImportRequest req, String dest, EuCountryTaxProfile profile, Money priceLocal,
                                        int age, FxRates fx, CurrencyCode display, List<CostLine> lines,
                                        Set<String> warnings) {
        if (RegistrationTaxes.NONE.contains(dest)) {
            return;
        }
        if (req.registrationTaxOwn() != null) {
            Money own = Money.of(req.registrationTaxOwn(), display);
            lines.add(line("REGISTRATION_TAX", CostCategory.TAXES, own, fx, display, null, null,
                    CalculationContext.params("country", dest, "type", "USER")));
            return;
        }
        if (!CARS.contains(req.category()) || !RegistrationTaxes.modelled(dest)) {
            warnings.add("warning.registrationTax.notModelled");
            return;
        }
        RegistrationTaxes.assess(new RegistrationTaxes.Input(dest, req.fuelType(), req.effectiveCo2(),
                req.effectivePowerKw(), req.engineCc(), req.effectiveMassKg(), age, priceLocal.amount(),
                profile.getStandardVatRate())).ifPresent(a -> {
            Money tax = Money.of(a.amount(), priceLocal.currency());
            lines.add(line("REGISTRATION_TAX", CostCategory.TAXES, tax, fx, display, priceLocal, a.rate(),
                    CalculationContext.params(
                            "country", dest,
                            "type", "ESTIMATE",
                            "method", a.method(),
                            "co2", String.valueOf(req.effectiveCo2()),
                            "co2Proposed", String.valueOf(req.co2Gkm() == null),
                            "powerKw", String.valueOf(req.effectivePowerKw()),
                            "massKg", String.valueOf(req.effectiveMassKg()),
                            "ageYears", String.valueOf(age))));
        });
    }

    private static CostLine line(String code, CostCategory category, Money original, FxRates fx, CurrencyCode display,
                                 Money taxBase, BigDecimal rate, Map<String, String> params) {
        return new CostLine(code, category, original, fx.convert(original, display).rounded(), taxBase, rate, true,
                params);
    }
}
