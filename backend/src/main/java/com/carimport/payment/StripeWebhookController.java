package com.carimport.payment;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * Receives the raw body as a String - the signature is computed over the exact bytes, so the payload must not be
 * re-serialized by Jackson before verification. The endpoint is public but useless without the signing secret.
 */
@RestController
public class StripeWebhookController {

    private final StripeWebhookService service;

    public StripeWebhookController(StripeWebhookService service) {
        this.service = service;
    }

    @PostMapping("/api/v1/webhooks/stripe")
    public ResponseEntity<Void> receive(@RequestBody String payload,
                                        @RequestHeader("Stripe-Signature") String signature) {
        Event event;
        try {
            event = service.verify(payload, signature);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().build();
        }
        service.handle(event);
        return ResponseEntity.ok().build();
    }
}
