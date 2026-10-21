package com.carimport.report;

import com.carimport.calculation.CalculationRequest;
import com.carimport.domain.FuelType;
import com.carimport.domain.OriginCountry;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Ordered "what to do after the car arrives" plan with statutory deadlines, per destination country. Steps and
 * deadlines are i18n keys ({@code plan.step.*}, {@code plan.deadline.*}); costs of each step are in the breakdown.
 */
@Service
public class AfterImportPlanService {

    public record PlanStep(String key, String deadline) {
    }

    public List<PlanStep> plan(CalculationRequest req, String clearanceCountry) {
        List<PlanStep> steps = new ArrayList<>();
        steps.add(new PlanStep("plan.step.clearance", "plan.deadline.beforeRelease"));
        boolean northAmerican = req.originCountry() == OriginCountry.USA || req.originCountry() == OriginCountry.CANADA;
        switch (req.destinationCountry()) {
            case "PL" -> {
                if (!"PL".equals(clearanceCountry) && !req.fuelType().isZeroEmission()) {
                    steps.add(new PlanStep("plan.step.pl.excise", "plan.deadline.14days"));
                }
                if (req.fuelType().isZeroEmission()) {
                    steps.add(new PlanStep("plan.step.pl.exciseExemption", "plan.deadline.14days"));
                }
                steps.add(new PlanStep("plan.step.translations", "plan.deadline.beforeInspection"));
                if (northAmerican) {
                    steps.add(new PlanStep("plan.step.lighting", "plan.deadline.beforeInspection"));
                }
                steps.add(new PlanStep("plan.step.pl.inspection", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.pl.recycling", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.pl.registration", "plan.deadline.pl30days"));
                steps.add(new PlanStep("plan.step.insurance", "plan.deadline.fromRegistration"));
            }
            case "DE" -> {
                if (northAmerican) {
                    steps.add(new PlanStep("plan.step.lighting", "plan.deadline.beforeInspection"));
                }
                steps.add(new PlanStep("plan.step.de.approval", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.insurance", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.de.registration", "plan.deadline.none"));
            }
            default -> {
                steps.add(new PlanStep("plan.step.translations", "plan.deadline.beforeInspection"));
                steps.add(new PlanStep("plan.step.generic.inspection", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.generic.registrationTax", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.insurance", "plan.deadline.beforeRegistration"));
                steps.add(new PlanStep("plan.step.generic.registration", "plan.deadline.national"));
            }
        }
        if (req.fuelType() == FuelType.EV || req.fuelType() == FuelType.PHEV) {
            steps.add(new PlanStep("plan.step.evCharging", "plan.deadline.none"));
        }
        return steps;
    }
}
