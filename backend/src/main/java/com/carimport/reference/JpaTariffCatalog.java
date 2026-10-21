package com.carimport.reference;

import com.carimport.calculation.TariffCatalog;
import com.carimport.domain.AuctionHouse;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.VehicleCondition;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * JPA adapter of {@link TariffCatalog}. Reference tables are tiny and change rarely (admin panel / Flyway), so every
 * lookup is cached; the admin API evicts {@value #CACHE} after edits. Entities have no lazy associations, so cached
 * detached instances are safe to share. All methods share one cache, so keys must include the method name -
 * otherwise {@code taxProfile("PL")} and {@code destinationFees("PL")} would collide.
 */
@Component
@Transactional(readOnly = true)
@CacheConfig(cacheNames = JpaTariffCatalog.CACHE, keyGenerator = "methodAwareKeyGenerator")
public class JpaTariffCatalog implements TariffCatalog {

    public static final String CACHE = "tariffs";

    private final AuctionFeeTierRepository feeTiers;
    private final AuctionFixedFeeRepository fixedFees;
    private final ConditionSurchargeRepository surcharges;
    private final InlandTransportRateRepository inland;
    private final OceanFreightRateRepository ocean;
    private final IntraEuTransportRateRepository intraEu;
    private final EuPortRepository ports;
    private final EuCountryTaxProfileRepository taxProfiles;
    private final ExciseRateRepository excise;
    private final CustomsTariffRepository tariffs;
    private final DestinationFeeRepository destinationFees;

    public JpaTariffCatalog(AuctionFeeTierRepository feeTiers, AuctionFixedFeeRepository fixedFees,
                            ConditionSurchargeRepository surcharges, InlandTransportRateRepository inland,
                            OceanFreightRateRepository ocean, IntraEuTransportRateRepository intraEu,
                            EuPortRepository ports, EuCountryTaxProfileRepository taxProfiles,
                            ExciseRateRepository excise, CustomsTariffRepository tariffs,
                            DestinationFeeRepository destinationFees) {
        this.feeTiers = feeTiers;
        this.fixedFees = fixedFees;
        this.surcharges = surcharges;
        this.inland = inland;
        this.ocean = ocean;
        this.intraEu = intraEu;
        this.ports = ports;
        this.taxProfiles = taxProfiles;
        this.excise = excise;
        this.tariffs = tariffs;
        this.destinationFees = destinationFees;
    }

    @Override
    @Cacheable
    public List<AuctionFeeTier> auctionFeeTiers(AuctionHouse house) {
        return feeTiers.findByAuctionHouse(house).stream()
                .sorted(Comparator.comparing(AuctionFeeTier::getPriceFrom))
                .toList();
    }

    @Override
    @Cacheable
    public List<AuctionFixedFee> auctionFixedFees(AuctionHouse house, OriginCountry origin) {
        return fixedFees.findByAuctionHouseAndOriginCountry(house, origin);
    }

    @Override
    @Cacheable
    public List<ConditionSurcharge> conditionSurcharges(OriginCountry origin, VehicleCondition condition) {
        return surcharges.findByOriginCountryAndCondition(origin, condition);
    }

    @Override
    @Cacheable
    public List<InlandTransportRate> inlandRates(OriginCountry origin, String pickupZone) {
        if (pickupZone != null) {
            List<InlandTransportRate> zoned = inland.findByOriginCountryAndPickupZoneIn(origin, List.of(pickupZone));
            if (!zoned.isEmpty()) {
                return zoned;
            }
        }
        return inland.findByOriginCountryAndPickupZoneIn(origin, List.of("*"));
    }

    @Override
    @Cacheable
    public Optional<OceanFreightRate> oceanRate(String departurePort, String euPortCode, ShippingMethod method,
                                                OceanFreightRate.SizeClass sizeClass) {
        return ocean.findByDeparturePortAndEuPortCodeAndMethodAndSizeClass(departurePort, euPortCode, method,
                sizeClass);
    }

    @Override
    @Cacheable
    public Optional<IntraEuTransportRate> intraEuRate(String euPortCode, String destinationCountry) {
        return intraEu.findByEuPortCodeAndDestinationCountry(euPortCode, destinationCountry);
    }

    @Override
    @Cacheable
    public Optional<EuPort> port(String code) {
        return ports.findById(code).filter(EuPort::isActive);
    }

    @Override
    @Cacheable
    public Optional<EuCountryTaxProfile> taxProfile(String countryCode) {
        LocalDate today = LocalDate.now();
        return taxProfiles.findByCountryCodeOrderByValidFromDesc(countryCode).stream()
                .filter(p -> !p.getValidFrom().isAfter(today))
                .filter(p -> p.getValidTo() == null || !p.getValidTo().isBefore(today))
                .findFirst();
    }

    @Override
    @Cacheable
    public List<ExciseRate> exciseRates(String countryCode, FuelType fuelType) {
        return excise.findByCountryCodeAndFuelType(countryCode, fuelType);
    }

    @Override
    @Cacheable
    public List<CustomsTariff> customsTariffs() {
        return tariffs.findAll();
    }

    @Override
    @Cacheable
    public List<DestinationFee> destinationFees(String countryCode) {
        return destinationFees.findByDestinationCountry(countryCode);
    }
}
