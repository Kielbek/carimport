package com.carimport.euimport;

import static org.assertj.core.api.Assertions.assertThat;

import com.carimport.calculation.CalculationEngineTest;
import com.carimport.calculation.CostLine;
import com.carimport.calculation.InMemoryTariffCatalog;
import com.carimport.domain.CurrencyCode;
import com.carimport.domain.DeliveryMode;
import com.carimport.domain.FuelType;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class EuImportServiceTest {

    final EuImportService service = new EuImportService(new InMemoryTariffCatalog(), null,
            Clock.fixed(Instant.parse("2026-10-21T10:00:00Z"), ZoneOffset.UTC));

    static EuImportRequest request(String from, String to, String price, boolean newVehicle, DeliveryMode mode) {
        return new EuImportRequest(from, to, new BigDecimal(price), CurrencyCode.EUR, CurrencyCode.PLN, 2019,
                FuelType.PETROL, 1600, null, null, null, null, newVehicle, mode, 1000, null, null, null);
    }

    static Optional<CostLine> line(EuImportResult r, String code) {
        return r.lines().stream().filter(l -> l.code().equals(code)).findFirst();
    }

    @Test
    void usedCarFromGermanyToPolandPaysExciseOnThePriceButNoVatOrDuty() {
        EuImportResult r = service.calculate(request("DE", "PL", "20000", false, null), CalculationEngineTest.FX);

        assertThat(line(r, "PURCHASE_PRICE").orElseThrow().amount().amount()).isEqualByComparingTo("85000.00");
        // 20,000 EUR x 4.25 = 85,000 PLN x 3.1 % (up to 2,000 cc)
        CostLine excise = line(r, "EXCISE_TAX").orElseThrow();
        assertThat(excise.original().amount()).isEqualByComparingTo("2635");
        assertThat(line(r, "EU_NEW_VEHICLE_VAT")).isEmpty();
        assertThat(r.lines()).noneMatch(l -> l.code().startsWith("CUSTOMS") || l.code().equals("INDIVIDUAL_APPROVAL"));
        // car carrier, PL tariff: 150 + 1,000 km x 3.00 PLN
        assertThat(line(r, "EU_TRANSPORT_CAR_CARRIER").orElseThrow().original().amount()).isEqualByComparingTo("3150");
        assertThat(r.warnings()).contains("warning.euImport.usedVatAtOrigin", "warning.pl.exciseDeclarationWithin14Days");
        assertThat(r.total().amount()).isEqualByComparingTo(
                r.lines().stream().map(l -> l.amount().amount()).reduce(BigDecimal.ZERO, BigDecimal::add));
    }

    @Test
    void newVehicleOwesTheDestinationsVat() {
        EuImportResult r = service.calculate(request("DE", "NL", "30000", true, null), CalculationEngineTest.FX);

        CostLine vat = line(r, "EU_NEW_VEHICLE_VAT").orElseThrow();
        assertThat(vat.original().amount()).isEqualByComparingTo("6300.00");
        assertThat(vat.rate()).isEqualByComparingTo("0.21");
        assertThat(r.warnings()).contains("warning.euImport.newVehicleVat");
    }

    @Test
    void selfDriveIsPricedWithExportPlatesAndWarned() {
        EuImportResult r = service.calculate(request("DE", "PL", "10000", false, DeliveryMode.SELF_DRIVE),
                CalculationEngineTest.FX);

        assertThat(line(r, "EU_TRANSPORT_SELF_DRIVE")).isPresent();
        assertThat(r.warnings()).contains("warning.euImport.exportPlates");
    }
}
