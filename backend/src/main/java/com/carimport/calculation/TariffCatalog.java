package com.carimport.calculation;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.VehicleCondition;
import com.carimport.reference.AuctionFeeTier;
import com.carimport.reference.AuctionFixedFee;
import com.carimport.reference.ConditionSurcharge;
import com.carimport.reference.CustomsTariff;
import com.carimport.reference.DestinationFee;
import com.carimport.reference.EuCountryTaxProfile;
import com.carimport.reference.EuPort;
import com.carimport.reference.ExciseRate;
import com.carimport.reference.InlandTransportRate;
import com.carimport.reference.IntraEuTransportRate;
import com.carimport.reference.OceanFreightRate;
import java.util.List;
import java.util.Optional;

/**
 * Read-only port to all reference data the engine needs. The production adapter is backed by JPA + cache; unit tests
 * use an in-memory implementation, which keeps the engine free of any persistence concerns.
 */
public interface TariffCatalog {

    List<AuctionFeeTier> auctionFeeTiers(AuctionHouse house);

    List<AuctionFixedFee> auctionFixedFees(AuctionHouse house, OriginCountry origin);

    List<ConditionSurcharge> conditionSurcharges(OriginCountry origin, VehicleCondition condition);

    /** Inland rates for the pickup zone, falling back to the country-wide "*" zone. */
    List<InlandTransportRate> inlandRates(OriginCountry origin, String pickupZone);

    Optional<OceanFreightRate> oceanRate(String departurePort, String euPortCode, ShippingMethod method,
                                         OceanFreightRate.SizeClass sizeClass);

    Optional<IntraEuTransportRate> intraEuRate(String euPortCode, String destinationCountry);

    Optional<EuPort> port(String code);

    Optional<EuCountryTaxProfile> taxProfile(String countryCode);

    List<ExciseRate> exciseRates(String countryCode, FuelType fuelType);

    List<CustomsTariff> customsTariffs();

    List<DestinationFee> destinationFees(String countryCode);
}
