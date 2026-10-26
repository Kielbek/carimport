package com.carimport.payment;

import com.carimport.config.AppProperties;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Stripe stand-in for the end-to-end test (profile {@code e2e} only): a created session "pays" at once - its URL is
 * straight the success URL - and reading it back reports it paid with the order's exact amount. Never active in
 * production: the profile is set only by the CI job.
 */
@Component
@Primary
@Profile("e2e")
public class FakeStripeSessions extends StripeSessions {

    private static final Logger log = LoggerFactory.getLogger(FakeStripeSessions.class);

    private final Map<String, Session> sessions = new ConcurrentHashMap<>();

    public FakeStripeSessions(AppProperties props) {
        super(props);
        log.warn("FAKE STRIPE ACTIVE (profile e2e) - payments are simulated, never use this in production");
    }

    @Override
    public Session create(SessionCreateParams params, String idempotencyKey) {
        String id = "cs_e2e_" + UUID.randomUUID().toString().replace("-", "");
        var price = params.getLineItems().getFirst().getPriceData();
        Session s = new Session();
        s.setId(id);
        s.setClientReferenceId(params.getClientReferenceId());
        s.setAmountTotal(price.getUnitAmount());
        s.setCurrency(price.getCurrency());
        s.setPaymentStatus("paid");
        s.setStatus("complete");
        s.setPaymentIntent("pi_e2e_" + id.substring(7));
        s.setUrl(params.getSuccessUrl().replace("{CHECKOUT_SESSION_ID}", id));
        sessions.put(id, s);
        return s;
    }

    @Override
    public Session retrieve(String sessionId) {
        return sessions.get(sessionId);
    }
}
