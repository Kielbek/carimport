package com.carimport.report;

import com.carimport.calculation.CalculationRequest;
import com.carimport.domain.BuyerType;
import com.carimport.domain.CustomsProcedure;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import com.carimport.domain.TitleType;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/** Paid-tier checklist of documents for clearance and registration. Returns i18n keys ({@code doc.*}). */
@Service
public class DocumentChecklistService {

    public record ChecklistItem(String key, Stage stage) {
    }

    public enum Stage { PURCHASE, SHIPPING, CUSTOMS, REGISTRATION }

    public List<ChecklistItem> checklist(CalculationRequest req, boolean historic) {
        List<ChecklistItem> items = new ArrayList<>();
        items.add(new ChecklistItem("doc.invoice", Stage.PURCHASE));
        items.add(new ChecklistItem(ownershipDocument(req), Stage.PURCHASE));
        if (req.titleType() == TitleType.SALVAGE) {
            items.add(new ChecklistItem("doc.salvageTitleRepairEvidence", Stage.PURCHASE));
        }

        items.add(new ChecklistItem("doc.billOfLading", Stage.SHIPPING));
        items.add(new ChecklistItem("doc.transportInvoices", Stage.SHIPPING));
        items.add(new ChecklistItem("doc.insurancePolicy", Stage.SHIPPING));
        if (req.originCountry() == OriginCountry.USA) {
            items.add(new ChecklistItem("doc.usExportAesItn", Stage.SHIPPING));
        }

        items.add(new ChecklistItem("doc.customsDeclarationSad", Stage.CUSTOMS));
        items.add(new ChecklistItem("doc.eoriNumber", Stage.CUSTOMS));
        items.add(new ChecklistItem("doc.customsPowerOfAttorney", Stage.CUSTOMS));
        if (req.customsProcedure() == CustomsProcedure.VAT_DEFERRED_4200) {
            items.add(new ChecklistItem("doc.procedure4200VatIdAndProofOfTransport", Stage.CUSTOMS));
        }
        if (historic) {
            items.add(new ChecklistItem("doc.historicExpertOpinion", Stage.CUSTOMS));
        }

        if ("PL".equals(req.destinationCountry())) {
            if (!req.fuelType().isZeroEmission()) {
                items.add(new ChecklistItem("doc.pl.exciseDeclarationAkcUs", Stage.REGISTRATION));
            } else {
                items.add(new ChecklistItem("doc.pl.exciseExemptionConfirmation", Stage.REGISTRATION));
            }
            items.add(new ChecklistItem("doc.pl.recyclingFeeConfirmation", Stage.REGISTRATION));
            items.add(new ChecklistItem("doc.swornTranslation", Stage.REGISTRATION));
        }
        items.add(new ChecklistItem("doc.vatPaymentProof", Stage.REGISTRATION));
        items.add(new ChecklistItem("doc.technicalInspection", Stage.REGISTRATION));
        if (req.fuelType() == FuelType.EV || req.fuelType() == FuelType.PHEV) {
            items.add(new ChecklistItem("doc.evChargingPortAdapterNote", Stage.REGISTRATION));
        }
        if (req.buyerType() == BuyerType.COMPANY) {
            items.add(new ChecklistItem("doc.companyRegistryExtract", Stage.REGISTRATION));
        }
        items.add(new ChecklistItem("doc.registrationApplication", Stage.REGISTRATION));
        return items;
    }

    private static String ownershipDocument(CalculationRequest req) {
        return switch (req.originCountry()) {
            case USA, CANADA -> "doc.ownership.title";
            case JAPAN -> "doc.ownership.japanExportCertificate";
            case UAE -> "doc.ownership.uaeExportCertificate";
            case UK -> "doc.ownership.v5c";
        };
    }
}
