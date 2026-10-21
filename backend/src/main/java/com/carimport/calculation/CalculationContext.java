package com.carimport.calculation;

import com.carimport.domain.CurrencyCode;
import com.carimport.domain.Money;
import com.carimport.fx.FxRates;
import com.carimport.reference.CustomsTariff;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.reference.EuPort;
import com.carimport.reference.InlandTransportRate;
import com.carimport.reference.OceanFreightRate;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Mutable state passed through the pipeline. Each step appends {@link CostLine}s and may publish intermediate values
 * (customs value, duty, excise) consumed by later steps.
 */
public final class CalculationContext {

    public record Route(String departurePort, InlandTransportRate inland, OceanFreightRate ocean) {
    }

    private final CalculationRequest request;
    private final Scenario scenario;
    private final FxRates fx;
    private final TariffCatalog catalog;
    private final LocalDate calculationDate;
    private final EuPort euPort;
    private final EuCountryTaxProfile clearanceTax;
    private final List<CostLine> lines = new ArrayList<>();
    private final Set<String> warnings = new LinkedHashSet<>();
    private final Set<String> cifLineCodes = new LinkedHashSet<>();

    private Route route;
    private Money customsValue;
    private CustomsTariff tariff;
    private Money duty;
    private Money excise;
    private Money vatIncidentalCosts;
    private boolean historic;

    public CalculationContext(CalculationRequest request, Scenario scenario, FxRates fx, TariffCatalog catalog,
                              LocalDate calculationDate) {
        this.request = request;
        this.scenario = scenario;
        this.fx = fx.withShift(request.originCountry().currency(), scenario.fxShift());
        this.catalog = catalog;
        this.calculationDate = calculationDate;
        this.euPort = catalog.port(request.euPortCode())
                .orElseThrow(() -> new CalculationException("error.port.unknown", request.euPortCode()));
        this.clearanceTax = catalog.taxProfile(euPort.getCountryCode())
                .orElseThrow(() -> new CalculationException("error.taxProfile.missing", euPort.getCountryCode()));
    }

    /** Currency of the member state where customs clearance happens; all taxes are assessed in it. */
    public CurrencyCode baseCurrency() {
        return clearanceTax.getTaxCurrency();
    }

    public Money toBase(Money money) {
        return fx.convert(money, baseCurrency());
    }

    public Money zero() {
        return Money.zero(baseCurrency());
    }

    public void add(CostLine line) {
        lines.add(line);
    }

    /** Adds a pre-border cost that is part of the customs value (CIF). */
    public void addCifComponent(CostLine line) {
        lines.add(line);
        cifLineCodes.add(line.code());
    }

    public Money sumOfCifComponents() {
        return lines.stream()
                .filter(l -> cifLineCodes.contains(l.code()))
                .map(CostLine::amount)
                .reduce(zero(), Money::plus);
    }

    public BigDecimal pick(BigDecimal min, BigDecimal max) {
        return scenario.pick(min, max);
    }

    public void warn(String messageKey) {
        warnings.add(messageKey);
    }

    public Money roundTax(Money tax, EuCountryTaxProfile profile) {
        return profile.isRoundToWholeUnits() ? tax.roundedToWholeUnits() : tax.rounded();
    }

    public CalculationRequest request() { return request; }
    public Scenario scenario() { return scenario; }
    public FxRates fx() { return fx; }
    public TariffCatalog catalog() { return catalog; }
    public LocalDate calculationDate() { return calculationDate; }
    public EuPort euPort() { return euPort; }
    public EuCountryTaxProfile clearanceTax() { return clearanceTax; }
    public List<CostLine> lines() { return Collections.unmodifiableList(lines); }
    public Set<String> warnings() { return Collections.unmodifiableSet(warnings); }

    public Route route() { return route; }
    public void route(Route route) { this.route = route; }
    public Money customsValue() { return customsValue; }
    public void customsValue(Money customsValue) { this.customsValue = customsValue; }
    public CustomsTariff tariff() { return tariff; }
    public void tariff(CustomsTariff tariff) { this.tariff = tariff; }
    public Money duty() { return duty == null ? zero() : duty; }
    public void duty(Money duty) { this.duty = duty; }
    public Money excise() { return excise == null ? zero() : excise; }
    public void excise(Money excise) { this.excise = excise; }
    public boolean historic() { return historic; }
    public void historic(boolean historic) { this.historic = historic; }

    /** Costs after the EU border up to the first place of destination (Art. 86(1)(b) VAT Directive). */
    public Money vatIncidentalCosts() { return vatIncidentalCosts == null ? zero() : vatIncidentalCosts; }
    public void addVatIncidentalCost(Money cost) { this.vatIncidentalCosts = vatIncidentalCosts().plus(cost); }

    public boolean clearedInDestinationCountry() {
        return euPort.getCountryCode().equals(request.destinationCountry());
    }

    /** Builds an ordered, immutable label-parameter map from key/value pairs. */
    public static Map<String, String> params(String... kv) {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        for (int i = 0; i + 1 < kv.length; i += 2) {
            map.put(kv[i], kv[i + 1]);
        }
        return Collections.unmodifiableMap(map);
    }
}
