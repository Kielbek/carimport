package com.carimport.report;

import java.util.UUID;

/** The PDF of a paid order is stored; the buyer can be told. */
public record ReportReadyEvent(UUID orderId) {
}
