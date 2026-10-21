package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;

/**
 * One stage of the landed-cost pipeline. Steps run in ascending {@link #order()}; the order mirrors the legal sequence
 * (customs value -> duty -> excise -> VAT), because every tax uses the previous ones as its base.
 */
public interface CalculationStep {

    int ROUTE = 10;
    int PURCHASE = 20;
    int AUCTION_FEES = 30;
    int CONDITION_SURCHARGES = 40;
    int INLAND_TRANSPORT = 50;
    int OCEAN_FREIGHT = 60;
    int INSURANCE = 70;
    int CUSTOMS_VALUE = 80;
    int CUSTOMS_DUTY = 90;
    int EXCISE = 100;
    int PORT_CLEARANCE = 110;
    int IMPORT_VAT = 120;
    int DELIVERY = 130;
    int DESTINATION_FEES = 140;
    int RISKS = 150;

    int order();

    void apply(CalculationContext ctx);
}
