package com.carimport.calculation;

import com.carimport.domain.OriginCountry;
import com.carimport.vehicle.Vin;
import java.time.LocalDate;
import java.util.Optional;

/**
 * 0 % duty for a vehicle made in the country it is shipped from, when the buyer can prove that origin:
 * <ul>
 *   <li>USA - Regulation (EU) 2026/1455 (EU-US Joint Statement), 1 July 2026 - 31 December 2029; non-preferential US
 *   origin proven to customs (an invoice, "Made in USA" or a certificate of origin alone is not enough) and direct
 *   transport from the US;</li>
 *   <li>Canada - CETA, statement on origin by the exporter;</li>
 *   <li>Japan - EU-Japan EPA, car duty phased out to 0 % in 2026; statement on origin or importer's knowledge;</li>
 *   <li>United Kingdom - EU-UK TCA, statement on origin or importer's knowledge.</li>
 * </ul>
 * Cars from the UAE, and cars merely sold in one of these countries but built elsewhere, pay the full rate.
 */
public final class PreferentialDuty {

    public record Agreement(String code, String madeIn) {
    }

    private static final LocalDate US_FROM = LocalDate.of(2026, 7, 1);
    private static final LocalDate US_TO = LocalDate.of(2029, 12, 31);

    public static Optional<Agreement> available(OriginCountry origin, LocalDate date) {
        return Optional.ofNullable(switch (origin) {
            case USA -> date.isBefore(US_FROM) || date.isAfter(US_TO) ? null : new Agreement("EU_US_2026_1455", "US");
            case CANADA -> new Agreement("CETA", "CA");
            case JAPAN -> date.getYear() < 2026 ? null : new Agreement("EU_JP_EPA", "JP");
            case UK -> new Agreement("EU_UK_TCA", "GB");
            case UAE -> null;
        });
    }

    /** True when the VIN says the car was built in the agreement's country (the precondition, not the proof). */
    public static boolean vinMatches(Agreement agreement, String vin) {
        return Vin.parse(vin).flatMap(Vin::country).map(agreement.madeIn()::equals).orElse(false);
    }

    private PreferentialDuty() {
    }
}
