package com.carimport.domain;

public enum FuelType {
    PETROL, DIESEL, LPG, HEV, MHEV, PHEV, EV, HYDROGEN;

    public boolean isCombustionOnly() {
        return this == PETROL || this == DIESEL || this == LPG;
    }

    public boolean isZeroEmission() {
        return this == EV || this == HYDROGEN;
    }
}
