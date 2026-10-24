package com.carimport.vehicle;

import com.carimport.domain.FuelType;
import com.carimport.domain.VehicleCategory;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * What a VIN lookup found, ready to fill the wizard. Every field may be null - only what the sources actually state
 * is filled in, nothing is guessed here (the calculator's own proposals cover the gaps).
 *
 * @param source      NHTSA when the vPIC database knew the VIN, else OFFLINE (only what the VIN itself encodes)
 * @param co2Gkm      combined tailpipe CO₂ from the US EPA label, converted from g/mile; close to, not equal to WLTP
 * @param co2Source   EPA when co2Gkm is set
 * @param massKg      curb weight; from the stated curb weight, or estimated from the GVWR class when only that is known
 * @param massSource  CURB or GVWR
 * @param warnings    message keys: vin.checkDigit (probable typo), vin.notFound, vin.noCo2, vin.offline, ...
 */
public record VinDecoding(String vin, String source, boolean checkDigitValid, Integer modelYear, String make,
                          String model, String trim, String bodyClass, VehicleCategory vehicleCategory,
                          FuelType fuelType, Integer engineCc, Integer cylinders, Integer powerKw, Integer co2Gkm,
                          String co2Source, Integer massKg, String massSource, String manufacturedIn,
                          List<String> warnings) {

    /** "2019 Ford Mustang GT" - what the report shows as the vehicle. */
    @JsonProperty
    public String description() {
        StringBuilder b = new StringBuilder();
        for (Object part : new Object[] {modelYear, make, model, trim}) {
            if (part != null && !part.toString().isBlank()) {
                b.append(b.isEmpty() ? "" : " ").append(part);
            }
        }
        return b.toString();
    }
}
