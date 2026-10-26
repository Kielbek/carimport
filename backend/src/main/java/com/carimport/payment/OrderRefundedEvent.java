package com.carimport.payment;

import java.util.UUID;

/** A refund was recorded: {@code amountMinor} newly refunded; {@code full} = the whole price is back with the buyer. */
public record OrderRefundedEvent(UUID orderId, long amountMinor, boolean full) {
}
