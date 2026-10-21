package com.carimport.domain;

/** How the car gets from the EU port to the buyer's address. */
public enum DeliveryMode {
    /** Buyer collects at the port (own transport arranged separately). */
    PORT_PICKUP,
    /** Shared car carrier (autotransporter) - cheapest per km for runners. */
    CAR_CARRIER,
    /** Dedicated tow truck (laweta) - required for non-runners. */
    TOW_TRUCK,
    /** Drive home on temporary plates with short-term insurance (runners only). */
    SELF_DRIVE;

    public boolean needsRoad() {
        return this != PORT_PICKUP;
    }
}
