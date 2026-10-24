package com.carimport.calculation;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import com.carimport.reference.AuctionFeeTier;
import com.carimport.reference.AuctionFixedFee;
import com.carimport.reference.ConditionSurcharge;
import com.carimport.reference.CustomsTariff;
import com.carimport.reference.DestinationFee;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.geo.GeoPoint;
import com.carimport.reference.EuPort;
import com.carimport.reference.ExciseRate;
import com.carimport.reference.InlandTransportRate;
import com.carimport.reference.IntraEuTransportRate;
import com.carimport.reference.OceanFreightRate;
import com.carimport.reference.RiskFactor;
import com.carimport.reference.RoadTransportRate;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/** Small, hand-checkable subset of the production seed data. */
public class InMemoryTariffCatalog implements TariffCatalog {

    private final List<AuctionFeeTier> tiers = new ArrayList<>();
    private final List<AuctionFixedFee> fixed = new ArrayList<>();
    private final List<ConditionSurcharge> surcharges = new ArrayList<>();
    private final List<InlandTransportRate> inland = new ArrayList<>();
    private final List<OceanFreightRate> ocean = new ArrayList<>();
    private final List<IntraEuTransportRate> intraEu = new ArrayList<>();
    private final List<EuPort> ports = new ArrayList<>();
    private final List<EuCountryTaxProfile> taxes = new ArrayList<>();
    private final List<ExciseRate> excise = new ArrayList<>();
    private final List<CustomsTariff> tariffs = new ArrayList<>();
    private final List<DestinationFee> destinationFees = new ArrayList<>();
    private final List<RoadTransportRate> roadRates = new ArrayList<>();
    private final List<RiskFactor> risks = new ArrayList<>();

    public InMemoryTariffCatalog() {
        tier(AuctionHouse.COPART, AuctionFeeTier.FeeType.BUYER_FEE, TitleType.SALVAGE, "8000", "10000", "850", "0");
        tier(AuctionHouse.COPART, AuctionFeeTier.FeeType.BUYER_FEE, TitleType.SALVAGE, "10000", "15000", "900", "0");
        tier(AuctionHouse.COPART, AuctionFeeTier.FeeType.BUYER_FEE, TitleType.SALVAGE, "15000", null, "0", "0.075");
        tier(AuctionHouse.COPART, AuctionFeeTier.FeeType.VIRTUAL_BID_FEE, null, "8000", null, "160", "0");
        tiers.add(new AuctionFeeTier(AuctionHouse.USS, AuctionFeeTier.FeeType.BUYER_FEE, null, bd("0"), null,
                bd("10000"), BigDecimal.ZERO, CurrencyCode.JPY));
        tiers.add(new AuctionFeeTier(AuctionHouse.USS, AuctionFeeTier.FeeType.AGENT_COMMISSION, null, bd("1000000"),
                bd("3000000"), bd("80000"), BigDecimal.ZERO, CurrencyCode.JPY));
        fixed.add(new AuctionFixedFee(AuctionHouse.COPART, OriginCountry.USA, "GATE_FEE", bd("95"), CurrencyCode.USD));
        fixed.add(new AuctionFixedFee(AuctionHouse.COPART, OriginCountry.USA, "ENVIRONMENTAL_FEE", bd("15"),
                CurrencyCode.USD));
        fixed.add(new AuctionFixedFee(AuctionHouse.COPART, OriginCountry.USA, "TITLE_HANDLING_FEE", bd("20"),
                CurrencyCode.USD));
        surcharges.add(new ConditionSurcharge(OriginCountry.USA, VehicleCondition.NON_RUNNING, "FORKLIFT_LOADING",
                bd("50"), CurrencyCode.USD));

        inland.add(new InlandTransportRate(OriginCountry.USA, "NJ", "USNWK", bd("100"), bd("200"), bd("100"),
                CurrencyCode.USD));
        inland.add(new InlandTransportRate(OriginCountry.USA, "*", "USSAV", bd("450"), bd("900"), bd("150"),
                CurrencyCode.USD));
        inland.add(new InlandTransportRate(OriginCountry.JAPAN, "*", "JPYOK", bd("20000"), bd("60000"), bd("15000"),
                CurrencyCode.JPY));
        for (String eu : List.of("PLGDY", "DEBRV")) {
            ocean.add(new OceanFreightRate("USNWK", eu, ShippingMethod.CONTAINER_SHARED,
                    OceanFreightRate.SizeClass.SEDAN, bd("1300"), bd("1600"), CurrencyCode.USD, 21));
            ocean.add(new OceanFreightRate("USSAV", eu, ShippingMethod.CONTAINER_SHARED,
                    OceanFreightRate.SizeClass.SEDAN, bd("1400"), bd("1700"), CurrencyCode.USD, 23));
            ocean.add(new OceanFreightRate("JPYOK", eu, ShippingMethod.CONTAINER_SHARED,
                    OceanFreightRate.SizeClass.SEDAN, bd("1700"), bd("2200"), CurrencyCode.USD, 48));
        }

        ports.add(new EuPort("PLGDY", "Gdynia", "PL", bd("1300"), bd("800"), CurrencyCode.PLN, true,
                new GeoPoint(54.533, 18.55), EuPort.Region.BALTIC));
        ports.add(new EuPort("DEBRV", "Bremerhaven", "DE", bd("450"), bd("250"), CurrencyCode.EUR, true,
                new GeoPoint(53.552, 8.578), EuPort.Region.NORTH_SEA));
        intraEu.add(new IntraEuTransportRate("PLGDY", "PL", bd("800"), bd("1600"), CurrencyCode.PLN, 350));
        intraEu.add(new IntraEuTransportRate("DEBRV", "PL", bd("450"), bd("650"), CurrencyCode.EUR, 850));
        roadRates.add(new RoadTransportRate("PL", DeliveryMode.CAR_CARRIER, bd("2.60"), bd("3.40"), bd("150"), bd("600"),
                CurrencyCode.PLN));
        roadRates.add(new RoadTransportRate("PL", DeliveryMode.TOW_TRUCK, bd("3.50"), bd("4.50"), bd("100"), bd("400"),
                CurrencyCode.PLN));
        roadRates.add(new RoadTransportRate("PL", DeliveryMode.SELF_DRIVE, bd("0.60"), bd("0.80"), bd("250"), bd("0"),
                CurrencyCode.PLN));
        risks.add(new RiskFactor("PORT_STORAGE", null, null, null, bd("0.30"), RiskFactor.Basis.PER_DAY, bd("20"),
                bd("30"), 3, 10, CurrencyCode.EUR));
        risks.add(new RiskFactor("HIDDEN_DAMAGE", null, VehicleCondition.NON_RUNNING, null, bd("0.50"),
                RiskFactor.Basis.PCT_OF_BID, bd("0.08"), bd("0.25"), null, null, null));
        risks.add(new RiskFactor("TITLE_DELAY", OriginCountry.USA, null, null, bd("0.10"), RiskFactor.Basis.FIXED,
                bd("100"), bd("400"), null, null, CurrencyCode.USD));

        taxes.add(new EuCountryTaxProfile("PL", CurrencyCode.PLN, bd("0.23"), bd("0.08"), true));
        taxes.add(new EuCountryTaxProfile("DE", CurrencyCode.EUR, bd("0.19"), bd("0.07"), false));
        taxes.add(new EuCountryTaxProfile("NL", CurrencyCode.EUR, bd("0.21"), bd("0.09"), false));

        for (FuelType f : List.of(FuelType.PETROL, FuelType.DIESEL)) {
            excise.add(new ExciseRate("PL", f, 0, 2000, bd("0.031")));
            excise.add(new ExciseRate("PL", f, 2001, null, bd("0.186")));
        }
        excise.add(new ExciseRate("PL", FuelType.HEV, 0, 2000, bd("0.0155")));
        excise.add(new ExciseRate("PL", FuelType.HEV, 2001, 3500, bd("0.093")));
        excise.add(new ExciseRate("PL", FuelType.PHEV, 0, 2000, bd("0")));
        excise.add(new ExciseRate("PL", FuelType.EV, 0, null, bd("0")));

        tariffs.add(new CustomsTariff(VehicleCategory.PASSENGER_CAR, false, null, 0, null, "8703", bd("0.10"), "car"));
        tariffs.add(new CustomsTariff(VehicleCategory.PASSENGER_CAR, false, true, 0, null, "870380", bd("0.10"), "ev"));
        tariffs.add(new CustomsTariff(VehicleCategory.PICKUP_TRUCK, false, null, 0, null, "870421", bd("0.22"), "pickup"));
        tariffs.add(new CustomsTariff(null, true, null, 0, null, "970500", bd("0"), "historic"));

        destinationFees.add(new DestinationFee("PL", null, "SWORN_TRANSLATION", bd("350"), CurrencyCode.PLN, true, true,
                true));
        destinationFees.add(new DestinationFee("PL", null, "TECHNICAL_INSPECTION", bd("300"), CurrencyCode.PLN, true));
        destinationFees.add(new DestinationFee("PL", null, "GEOMETRY_ALIGNMENT", bd("250"), CurrencyCode.PLN, true, true,
                false));
        destinationFees.add(new DestinationFee("PL", null, "REGISTRATION_FEE", bd("256.50"), CurrencyCode.PLN, false));
        destinationFees.add(new DestinationFee("PL", null, "RECYCLING_FEE", bd("500"), CurrencyCode.PLN, false));
        destinationFees.add(new DestinationFee("PL", OriginCountry.USA, "US_LIGHTING_CONVERSION", bd("1500"),
                CurrencyCode.PLN, true, true, true));
    }

    private void tier(AuctionHouse house, AuctionFeeTier.FeeType type, TitleType title, String from, String to,
                      String fixedAmount, String pct) {
        tiers.add(new AuctionFeeTier(house, type, title, bd(from), to == null ? null : bd(to), bd(fixedAmount),
                bd(pct), CurrencyCode.USD));
    }

    private static BigDecimal bd(String s) {
        return new BigDecimal(s);
    }

    @Override
    public List<AuctionFeeTier> auctionFeeTiers(AuctionHouse house) {
        return tiers.stream().filter(t -> t.getAuctionHouse() == house).toList();
    }

    @Override
    public List<AuctionFixedFee> auctionFixedFees(AuctionHouse house, OriginCountry origin) {
        return fixed.stream().filter(f -> f.getAuctionHouse() == house && f.getOriginCountry() == origin).toList();
    }

    @Override
    public List<ConditionSurcharge> conditionSurcharges(OriginCountry origin, VehicleCondition condition) {
        return surcharges.stream().filter(s -> s.getOriginCountry() == origin && s.getCondition() == condition)
                .toList();
    }

    @Override
    public List<InlandTransportRate> inlandRates(OriginCountry origin, String pickupZone) {
        List<InlandTransportRate> zoned = inland.stream()
                .filter(r -> r.getOriginCountry() == origin && r.getPickupZone().equals(pickupZone)).toList();
        return zoned.isEmpty()
                ? inland.stream().filter(r -> r.getOriginCountry() == origin && r.getPickupZone().equals("*")).toList()
                : zoned;
    }

    @Override
    public Optional<OceanFreightRate> oceanRate(String departurePort, String euPortCode, ShippingMethod method,
                                                OceanFreightRate.SizeClass sizeClass) {
        return ocean.stream().filter(o -> o.getDeparturePort().equals(departurePort)
                && o.getEuPortCode().equals(euPortCode) && o.getMethod() == method
                && o.getSizeClass() == sizeClass).findFirst();
    }

    @Override
    public Optional<IntraEuTransportRate> intraEuRate(String euPortCode, String destinationCountry) {
        return intraEu.stream().filter(r -> r.getEuPortCode().equals(euPortCode)
                && r.getDestinationCountry().equals(destinationCountry)).findFirst();
    }

    @Override
    public List<EuPort> ports() {
        return List.copyOf(ports);
    }

    @Override
    public Optional<EuPort> port(String code) {
        return ports.stream().filter(p -> p.getCode().equals(code)).findFirst();
    }

    @Override
    public Optional<EuCountryTaxProfile> taxProfile(String countryCode) {
        return taxes.stream().filter(t -> t.getCountryCode().equals(countryCode)).findFirst();
    }

    @Override
    public List<ExciseRate> exciseRates(String countryCode, FuelType fuelType) {
        return excise.stream().filter(e -> e.getCountryCode().equals(countryCode) && e.getFuelType() == fuelType)
                .toList();
    }

    @Override
    public List<CustomsTariff> customsTariffs() {
        return tariffs;
    }

    @Override
    public List<DestinationFee> destinationFees(String countryCode) {
        return destinationFees.stream().filter(d -> d.getDestinationCountry().equals(countryCode)).toList();
    }

    @Override
    public Optional<RoadTransportRate> roadRate(String countryCode, DeliveryMode mode) {
        return roadRates.stream().filter(r -> r.getCountryCode().equals(countryCode) && r.getMode() == mode).findFirst();
    }

    @Override
    public List<RiskFactor> riskFactors() {
        return risks;
    }
}
