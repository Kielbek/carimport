package com.carimport.reference;

import com.carimport.domain.VehicleCategory;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Simplified TARIC lookup: vehicle category (+ optional displacement band / EV flag) -> HS code and conventional duty.
 * Examples: 8703 passenger car 10%, 8704 pickup 22%, 8711 motorcycle 6-8%, 9705 collectors' item 0%.
 */
@Entity
@Table(name = "customs_tariff")
public class CustomsTariff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_category", length = 16)
    private VehicleCategory vehicleCategory;

    /** True for the collectors' item row (9705); matched before anything else when the vehicle qualifies. */
    @Column(nullable = false)
    private boolean historic;

    /** Null = any drivetrain; true = only BEV/FCEV. */
    @Column(name = "electric_only")
    private Boolean electricOnly;

    /** Null = any fuel; true = only diesel (compression ignition); false = only spark ignition. 8704 splits on it. */
    @Column(name = "diesel_only")
    private Boolean dieselOnly;

    @Column(name = "cc_from", nullable = false)
    private int ccFrom;

    @Column(name = "cc_to")
    private Integer ccTo;

    @Column(name = "hs_code", nullable = false, length = 12)
    private String hsCode;

    @Column(name = "duty_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal dutyRate;

    @Column(nullable = false, length = 160)
    private String description;

    protected CustomsTariff() {
    }

    public CustomsTariff(VehicleCategory vehicleCategory, boolean historic, Boolean electricOnly, int ccFrom,
                         Integer ccTo, String hsCode, BigDecimal dutyRate, String description) {
        this.vehicleCategory = vehicleCategory;
        this.historic = historic;
        this.electricOnly = electricOnly;
        this.ccFrom = ccFrom;
        this.ccTo = ccTo;
        this.hsCode = hsCode;
        this.dutyRate = dutyRate;
        this.description = description;
    }

    /** A non-historic row bound to diesel (true) or spark ignition (false). */
    public static CustomsTariff byFuel(VehicleCategory vehicleCategory, boolean dieselOnly, int ccFrom, Integer ccTo,
                                       String hsCode, BigDecimal dutyRate, String description) {
        CustomsTariff t = new CustomsTariff(vehicleCategory, false, null, ccFrom, ccTo, hsCode, dutyRate, description);
        t.dieselOnly = dieselOnly;
        return t;
    }

    public VehicleCategory getVehicleCategory() { return vehicleCategory; }
    public boolean isHistoric() { return historic; }
    public Boolean getElectricOnly() { return electricOnly; }
    public Boolean getDieselOnly() { return dieselOnly; }
    public int getCcFrom() { return ccFrom; }
    public Integer getCcTo() { return ccTo; }
    public String getHsCode() { return hsCode; }
    public BigDecimal getDutyRate() { return dutyRate; }
    public String getDescription() { return description; }
}
