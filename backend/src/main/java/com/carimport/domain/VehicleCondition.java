package com.carimport.domain;

public enum VehicleCondition {
    /** Starts and drives - no special handling. */
    RUN_AND_DRIVE,
    /** Engine starts but the vehicle cannot move under its own power. */
    ENGINE_STARTS,
    /** Salvage / heavy damage - forklift, winch and towing surcharges apply. */
    NON_RUNNING;

    public boolean needsForklift() {
        return this != RUN_AND_DRIVE;
    }
}
