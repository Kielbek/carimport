package com.carimport.reference;

import com.carimport.domain.CurrencyCode;
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

    @Column(nullable = false, length = 64)
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

    public String getCode() { return code; }
    public String getName() { return name; }
    public String getCountryCode() { return countryCode; }
    public BigDecimal getUnloadingFee() { return unloadingFee; }
    public BigDecimal getCustomsAgencyFee() { return customsAgencyFee; }
    public CurrencyCode getFeeCurrency() { return feeCurrency; }
    public boolean isSupportsProcedure4200() { return supportsProcedure4200; }
    public boolean isActive() { return active; }
}
