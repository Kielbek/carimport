package com.carimport.calculation;

import com.carimport.domain.AuctionHouse;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.ShippingMethod;
import com.carimport.domain.TitleType;
import com.carimport.domain.VehicleCategory;
import com.carimport.domain.VehicleCondition;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.time.Year;

/** Wizard input. Prices are in the origin country's currency (USD for USA, JPY for Japan, ...). */
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
        @NotNull CurrencyCode displayCurrency) {

    public static final int HISTORIC_MIN_AGE = 30;

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
