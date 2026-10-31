package com.carimport.euimport;

import com.carimport.calculation.Proposals;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.FuelType;
import com.carimport.domain.VehicleCategory;
import com.carimport.geo.EuCountries;
import com.carimport.geo.GeoPoint;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.util.Optional;

/**
 * A car bought in one member state and registered in another: no customs, no port - only the road trip, the VAT rule
 * for new vehicles and the destination's registration taxes and fees.
 *
 * @param newVehicle         a "new means of transport" (Art. 2(2)(b) VAT Directive: at most 6 months or 6,000 km) -
 *                           VAT is then due in the destination country on the net price
 * @param deliveryMode       CAR_CARRIER, TOW_TRUCK or SELF_DRIVE (export/temporary plates); null = car carrier
 * @param distanceKm         road distance from the seller to the buyer; null = from the address, else between the
 *                           two countries' population centres
 * @param registrationTaxOwn the buyer's own figure for the registration tax (display currency); null = our estimate
 */
public record EuImportRequest(
        @NotNull @Pattern(regexp = "[A-Z]{2}") String originCountry,
        @NotNull @Pattern(regexp = "[A-Z]{2}") String destinationCountry,
        @NotNull @DecimalMin("100") @DecimalMax("50000000") BigDecimal price,
        @NotNull CurrencyCode priceCurrency,
        @NotNull CurrencyCode displayCurrency,
        @Min(1950) int productionYear,
        @NotNull FuelType fuelType,
        @Min(0) @Max(10000) int engineCc,
        VehicleCategory vehicleCategory,
        @Min(1) @Max(1500) Integer powerKw,
        @Min(0) @Max(900) Integer co2Gkm,
        @Min(50) @Max(10000) Integer massKg,
        boolean newVehicle,
        DeliveryMode deliveryMode,
        @Min(0) @Max(6000) Integer distanceKm,
        @DecimalMin("-90") @DecimalMax("90") Double destinationLat,
        @DecimalMin("-180") @DecimalMax("180") Double destinationLon,
        @DecimalMin("0") @DecimalMax("100000000") BigDecimal registrationTaxOwn) {

    public VehicleCategory category() {
        return vehicleCategory == null ? VehicleCategory.PASSENGER_CAR : vehicleCategory;
    }

    public DeliveryMode mode() {
        return deliveryMode == null || deliveryMode == DeliveryMode.PORT_PICKUP ? DeliveryMode.CAR_CARRIER : deliveryMode;
    }

    public int effectiveCo2() {
        return co2Gkm != null ? co2Gkm : Proposals.co2(fuelType, engineCc, category());
    }

    public int effectivePowerKw() {
        return powerKw != null ? powerKw : Proposals.powerKw(fuelType, engineCc);
    }

    public int effectiveMassKg() {
        return massKg != null ? massKg : Proposals.massKg(category(), fuelType, engineCc);
    }

    public Optional<GeoPoint> destinationPoint() {
        return destinationLat == null || destinationLon == null
                ? Optional.empty() : Optional.of(new GeoPoint(destinationLat, destinationLon));
    }

    @AssertTrue(message = "{validation.euImport.countries}")
    @JsonIgnore
    public boolean isIntraEu() {
        return originCountry == null || destinationCountry == null
                || (EuCountries.CODES.contains(originCountry) && EuCountries.CODES.contains(destinationCountry)
                && !originCountry.equals(destinationCountry));
    }

    @AssertTrue(message = "{validation.engineCc.required}")
    @JsonIgnore
    public boolean isEngineCcConsistent() {
        return fuelType == null || fuelType.isZeroEmission() || engineCc > 0;
    }
}
