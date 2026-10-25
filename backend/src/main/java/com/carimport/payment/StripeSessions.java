package com.carimport.payment;

import com.carimport.config.AppProperties;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import org.springframework.stereotype.Component;

/** Reads a Checkout Session from the Stripe API (a seam so tests need no network). */
@Component
public class StripeSessions {

    private final AppProperties props;

    public StripeSessions(AppProperties props) {
        this.props = props;
    }

    public Session retrieve(String sessionId) throws StripeException {
        return Session.retrieve(sessionId, RequestOptions.builder().setApiKey(props.stripe().apiKey()).build());
    }
}
