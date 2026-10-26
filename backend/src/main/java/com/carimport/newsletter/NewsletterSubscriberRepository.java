package com.carimport.newsletter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, UUID> {

    @Query("select s from NewsletterSubscriber s where lower(s.email) = lower(?1)")
    Optional<NewsletterSubscriber> findByEmail(String email);

    Optional<NewsletterSubscriber> findByConfirmTokenHash(String hash);

    Optional<NewsletterSubscriber> findByUnsubscribeToken(String token);

    List<NewsletterSubscriber> findByStatusOrderByConfirmedAtAsc(NewsletterSubscriber.Status status);

    long countByStatus(NewsletterSubscriber.Status status);
}
