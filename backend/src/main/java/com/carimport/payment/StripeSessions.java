package com.carimport.payment;

import com.carimport.config.AppProperties;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Component;

/** Creates and reads Checkout Sessions through the Stripe API - the seam that tests and the e2e profile replace. */
@Component
public class StripeSessions {

    private final AppProperties props;

    public StripeSessions(AppProperties props) {
        this.props = props;
    }

    public Session create(SessionCreateParams params, String idempotencyKey) throws StripeException {
        return Session.create(params, RequestOptions.builder()
                .setApiKey(props.stripe().apiKey())
                .setIdempotencyKey(idempotencyKey)
                .build());
    }

    public Session retrieve(String sessionId) throws StripeException {
        return Session.retrieve(sessionId, RequestOptions.builder().setApiKey(props.stripe().apiKey()).build());
    }
}
