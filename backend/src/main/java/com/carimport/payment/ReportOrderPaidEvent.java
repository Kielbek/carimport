package com.carimport.payment;

import java.util.UUID;

/** Published inside the webhook transaction; the PDF is generated only after that transaction commits. */
public record ReportOrderPaidEvent(UUID orderId) {
}
