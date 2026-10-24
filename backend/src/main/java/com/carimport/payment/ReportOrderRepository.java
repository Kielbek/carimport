package com.carimport.payment;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportOrderRepository extends JpaRepository<ReportOrder, UUID> {

    Optional<ReportOrder> findByStripeSessionId(String sessionId);

    Optional<ReportOrder> findByStripePaymentIntentId(String paymentIntentId);

    List<ReportOrder> findTop50ByStatusInAndPaidAtBeforeAndGenerationAttemptsLessThan(
            Collection<ReportOrder.Status> statuses, Instant paidBefore, int maxAttempts);

    /** Ready reports whose e-mail has not gone out yet (mail server down, node restarted). */
    List<ReportOrder> findTop50ByStatusAndEmailSentAtIsNullAndReadyAtBeforeAndEmailAttemptsLessThan(
            ReportOrder.Status status, Instant readyBefore, int maxAttempts);
}
