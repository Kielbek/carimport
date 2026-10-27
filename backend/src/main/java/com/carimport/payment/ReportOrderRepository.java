package com.carimport.payment;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ReportOrderRepository extends JpaRepository<ReportOrder, UUID> {

    Optional<ReportOrder> findByStripeSessionId(String sessionId);

    /** Admin list: newest first, optional status (null = all), search by e-mail or the start of the order id ('' = all). */
    @Query("""
            select o from ReportOrder o
            where (:status is null or o.status = :status)
              and (:q = '' or lower(o.email) like concat('%', :q, '%') or lower(cast(o.id as string)) like concat(:q, '%'))
            order by o.createdAt desc""")
    Page<ReportOrder> search(@Param("status") ReportOrder.Status status, @Param("q") String q, Pageable page);

    long countByCreatedAtAfter(Instant since);

    long countByStatus(ReportOrder.Status status);

    /** Net revenue per currency since a moment (fully refunded orders excluded, partial refunds deducted): [currency, sum, count]. */
    @Query("""
            select o.currency, sum(o.amountMinor - o.discountMinor - o.refundedMinor), count(o) from ReportOrder o
            where o.paidAt >= :since and o.status in (com.carimport.payment.ReportOrder.Status.PAID,
                com.carimport.payment.ReportOrder.Status.GENERATING, com.carimport.payment.ReportOrder.Status.READY,
                com.carimport.payment.ReportOrder.Status.FAILED)
            group by o.currency""")
    List<Object[]> revenueSince(@Param("since") Instant since);

    Optional<ReportOrder> findByStripePaymentIntentId(String paymentIntentId);

    List<ReportOrder> findTop50ByStatusInAndPaidAtBeforeAndGenerationAttemptsLessThan(
            Collection<ReportOrder.Status> statuses, Instant paidBefore, int maxAttempts);

    /** Ready reports whose e-mail has not gone out yet (mail server down, node restarted). */
    List<ReportOrder> findTop50ByStatusAndEmailSentAtIsNullAndReadyAtBeforeAndEmailAttemptsLessThan(
            ReportOrder.Status status, Instant readyBefore, int maxAttempts);
}
