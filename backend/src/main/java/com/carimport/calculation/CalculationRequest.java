package com.carimport.calculation;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import com.carimport.geo.GeoPoint;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Year;
import java.util.Optional;
import java.util.Set;

/**
 * Wizard input. The bid is in the origin country's currency (USD for USA, JPY for Japan, ...); repair and insurance
 * estimates are in the display currency.
 *
 * Every optional field has a proposal: null means "use what the calculator proposes", so the user only overrides
 * what they know better.
 *
 * @param deliveryMode       port to home leg; null = car carrier for a runner, tow truck otherwise
 * @param deliveryDistanceKm road distance from the EU port; null = from the address coordinates, else typical for the
 *                           destination country
 * @param pricePerKm         own per-km price in the destination's tax currency; null = tariff
 * @param repairEstimate     null = proposed from the condition and title; 0 = no repairs
 * @param insuranceEstimate  null = typical first-year liability premium in the destination country; 0 = none
 * @param postImportServices optional after-import services to include (codes of selectable destination fees);
 *                           null = the recommended defaults
 * @param destinationAddress delivery address as picked from the address search (shown in the report)
 * @param co2Gkm             WLTP CO₂ g/km from the CoC / window sticker; null = estimated from fuel and displacement
 * @param powerKw            engine power; null = estimated from fuel and displacement
 * @param registrationTaxOwn the registration tax the buyer computed themselves (display currency), e.g. from an
 *                           official calculator; null = our estimate where the country is modelled
 */
public record CalculationRequest(
        @NotNull OriginCountry originCountry,
        @NotNull AuctionHouse auctionHouse,
        @NotNull TitleType titleType,
        @Pattern(regexp = "[A-Z*]{1,16}") String pickupZone,
        @Pattern(regexp = "[A-Z]{5}") String departurePort,
        @NotNull @DecimalMin("100") @DecimalMax("50000000") BigDecimal bidPrice,
        @NotNull VehicleCategory vehicleCategory,
        @NotNull FuelType fuelType,
        @Min(0) @Max(10000) int engineCc,
        @Min(1900) int productionYear,
        boolean historicOriginalCondition,
        @NotNull VehicleCondition condition,
        @NotNull ShippingMethod shippingMethod,
        @NotNull @Pattern(regexp = "[A-Z]{5}") String euPortCode,
        @NotNull @Pattern(regexp = "[A-Z]{2}") String destinationCountry,
        @NotNull BuyerType buyerType,
        @NotNull CustomsProcedure customsProcedure,
        @NotNull CurrencyCode displayCurrency,
        DeliveryMode deliveryMode,
        @Min(0) @Max(5000) Integer deliveryDistanceKm,
        @DecimalMin("0") @DecimalMax("100") BigDecimal pricePerKm,
        @DecimalMin("0") @DecimalMax("10000000") BigDecimal repairEstimate,
        @DecimalMin("0") @DecimalMax("1000000") BigDecimal insuranceEstimate,
        @Size(max = 30) Set<@Pattern(regexp = "[A-Z_]{2,48}") String> postImportServices,
        @Size(max = 200) String destinationAddress,
        @DecimalMin("-90") @DecimalMax("90") Double destinationLat,
        @DecimalMin("-180") @DecimalMax("180") Double destinationLon,
        @Min(0) @Max(900) Integer co2Gkm,
        @Min(1) @Max(1500) Integer powerKw,
        @DecimalMin("0") @DecimalMax("100000000") BigDecimal registrationTaxOwn) {

    public static final int HISTORIC_MIN_AGE = 30;

    public DeliveryMode effectiveDeliveryMode() {
        if (deliveryMode != null) {
            return deliveryMode;
        }
        return condition == null || condition == VehicleCondition.RUN_AND_DRIVE
                ? DeliveryMode.CAR_CARRIER : DeliveryMode.TOW_TRUCK;
    }

    /** Coordinates of the delivery address, if one was picked. */
    public Optional<GeoPoint> destinationPoint() {
        return destinationLat == null || destinationLon == null
                ? Optional.empty() : Optional.of(new GeoPoint(destinationLat, destinationLon));
    }

    /** The same car and buyer cleared in another port, with that port's door distance. */
    public CalculationRequest withPort(String port, Integer distanceKm) {
        return new CalculationRequest(originCountry, auctionHouse, titleType, pickupZone, departurePort, bidPrice,
                vehicleCategory, fuelType, engineCc, productionYear, historicOriginalCondition, condition,
                shippingMethod, port, destinationCountry, buyerType, customsProcedure, displayCurrency, deliveryMode,
                distanceKm, pricePerKm, repairEstimate, insuranceEstimate, postImportServices, destinationAddress,
                destinationLat, destinationLon, co2Gkm, powerKw, registrationTaxOwn);
    }

    /** The same request with repair, insurance and registration tax left to the calculator's proposal. */
    public CalculationRequest withProposedEstimates() {
        return new CalculationRequest(originCountry, auctionHouse, titleType, pickupZone, departurePort, bidPrice,
                vehicleCategory, fuelType, engineCc, productionYear, historicOriginalCondition, condition,
                shippingMethod, euPortCode, destinationCountry, buyerType, customsProcedure, displayCurrency,
                deliveryMode, deliveryDistanceKm, pricePerKm, null, null, postImportServices, destinationAddress,
                destinationLat, destinationLon, co2Gkm, powerKw, null);
    }

    public int effectiveCo2() {
        return co2Gkm != null ? co2Gkm : Proposals.co2(fuelType, engineCc, vehicleCategory);
    }

    public int effectivePowerKw() {
        return powerKw != null ? powerKw : Proposals.powerKw(fuelType, engineCc);
    }

    public boolean qualifiesAsHistoric(Year now) {
        return historicOriginalCondition
                && vehicleCategory != VehicleCategory.PICKUP_TRUCK
                && vehicleCategory != VehicleCategory.VAN
                && now.getValue() - productionYear >= HISTORIC_MIN_AGE;
    }

    @AssertTrue(message = "{validation.procedure4200.companyOnly}")
    @JsonIgnore
    public boolean isProcedureAllowedForBuyer() {
        return customsProcedure != CustomsProcedure.VAT_DEFERRED_4200 || buyerType == BuyerType.COMPANY;
    }

    @AssertTrue(message = "{validation.auctionHouse.notInOrigin}")
    @JsonIgnore
    public boolean isAuctionHouseAvailable() {
        return originCountry == null || auctionHouse == null || originCountry.supports(auctionHouse);
    }

    @AssertTrue(message = "{validation.engineCc.required}")
    @JsonIgnore
    public boolean isEngineCcConsistent() {
        return fuelType == null || fuelType.isZeroEmission() || engineCc > 0;
    }
}
