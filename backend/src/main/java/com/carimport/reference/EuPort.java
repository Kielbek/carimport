package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
import com.carimport.geo.GeoPoint;
import jakarta.persistence.*;
import java.math.BigDecimal;

/** EU port of entry where the customs clearance takes place. Its country decides the import VAT regime. */
@Entity
@Table(name = "eu_port")
public class EuPort {

    /** UN/LOCODE, e.g. DEBRV (Bremerhaven), NLRTM (Rotterdam), PLGDY (Gdynia). */
    @Id
    @Column(length = 5)
    private String code;

    @Column(nullable = false, length = 80)
    private String name;

    /** ISO 3166-1 alpha-2 country of clearance. */
    @Column(name = "country_code", nullable = false, length = 2)
    private String countryCode;

    /** Terminal handling + container unloading (devanning) per vehicle. */
    @Column(name = "unloading_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal unloadingFee;

    /** Customs agency fee (SAD/ATLAS declaration, T1 if needed). */
    @Column(name = "customs_agency_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal customsAgencyFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "fee_currency", nullable = false, length = 3)
    private CurrencyCode feeCurrency;

    @Column(nullable = false)
    private boolean supportsProcedure4200;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Region region = Region.NORTH_SEA;

    /** Sea area - decides which ocean lanes are cheap (Atlantic vs. Suez) and groups the port list. */
    public enum Region {
        NORTH_SEA, ATLANTIC, BALTIC, WEST_MED, EAST_MED
    }

    protected EuPort() {
    }

    public EuPort(String code, String name, String countryCode, BigDecimal unloadingFee, BigDecimal customsAgencyFee,
                  CurrencyCode feeCurrency, boolean supportsProcedure4200) {
        this.code = code;
        this.name = name;
        this.countryCode = countryCode;
        this.unloadingFee = unloadingFee;
        this.customsAgencyFee = customsAgencyFee;
        this.feeCurrency = feeCurrency;
        this.supportsProcedure4200 = supportsProcedure4200;
    }

    public EuPort(String code, String name, String countryCode, BigDecimal unloadingFee, BigDecimal customsAgencyFee,
                  CurrencyCode feeCurrency, boolean supportsProcedure4200, GeoPoint location, Region region) {
        this(code, name, countryCode, unloadingFee, customsAgencyFee, feeCurrency, supportsProcedure4200);
        this.latitude = location.lat();
        this.longitude = location.lon();
        this.region = region;
    }

    public String getCode() { return code; }
    public String getName() { return name; }
    public String getCountryCode() { return countryCode; }
    public BigDecimal getUnloadingFee() { return unloadingFee; }
    public BigDecimal getCustomsAgencyFee() { return customsAgencyFee; }
    public CurrencyCode getFeeCurrency() { return feeCurrency; }
    public boolean isSupportsProcedure4200() { return supportsProcedure4200; }
    public boolean isActive() { return active; }
    public Region getRegion() { return region; }

    /** Null for ports seeded without coordinates. */
    public GeoPoint location() {
        return latitude == 0 && longitude == 0 ? null : new GeoPoint(latitude, longitude);
    }
}
