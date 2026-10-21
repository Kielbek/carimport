package com.carimport.calculation.step;

import com.carimport.calculation.CalculationContext;
import com.carimport.calculation.CostCategory;
import com.carimport.calculation.CostLine;
import com.carimport.domain.Money;
import com.carimport.reference.EuPort;
import java.util.Map;
import org.springframework.stereotype.Component;

/**
 * Terminal handling / devanning and the customs agent's fee in the EU port. Unloading happens after the border, so it
 * is not part of the customs value, but it is an incidental cost included in the import-VAT base.
 */
@Component
public class PortClearanceStep implements CalculationStep {

    @Override
    public int order() {
        return PORT_CLEARANCE;
    }

    @Override
    public void apply(CalculationContext ctx) {
        EuPort port = ctx.euPort();
        Map<String, String> params = Map.of("port", port.getName());

        Money unloading = Money.of(port.getUnloadingFee(), port.getFeeCurrency());
        Money unloadingBase = ctx.toBase(unloading);
        ctx.add(new CostLine("PORT_UNLOADING", CostCategory.TRANSPORT, unloading, unloadingBase, null, null, true,
                params));
        ctx.addVatIncidentalCost(unloadingBase);

        Money agency = Money.of(port.getCustomsAgencyFee(), port.getFeeCurrency());
        ctx.add(new CostLine("CUSTOMS_AGENCY", CostCategory.TRANSPORT, agency, ctx.toBase(agency), null, null, true,
                params));
    }
}
