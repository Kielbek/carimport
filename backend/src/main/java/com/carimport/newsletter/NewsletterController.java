package com.carimport.newsletter;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/** Newsletter sign-up (double opt-in), confirmation and unsubscribe; tokens travel in the body, never in URLs. */
@RestController
public class NewsletterController {

    public record SubscribeRequest(
            @Email @NotBlank @Size(max = 254) String email,
            @Pattern(regexp = "[a-z]{2}") String locale,
            @Pattern(regexp = "[a-z-]{1,32}") String source,
            @AssertTrue boolean consent,
            /** Honeypot - hidden in the form, bots fill it. */
            @Size(max = 0) String website) {
    }

    public record TokenRequest(@NotBlank @Size(max = 64) String token) {
    }

    private static final Logger log = LoggerFactory.getLogger(NewsletterController.class);

    private final NewsletterService newsletter;

    public NewsletterController(NewsletterService newsletter) {
        this.newsletter = newsletter;
    }

    @PostMapping("/api/v1/newsletter")
    public ResponseEntity<?> subscribe(@Valid @RequestBody SubscribeRequest request) {
        if (!newsletter.enabled()) {
            return unavailable();
        }
        newsletter.subscribe(request.email(), request.locale(), request.source());
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/api/v1/newsletter/confirm")
    public ResponseEntity<?> confirm(@Valid @RequestBody TokenRequest request) {
        return newsletter.confirm(request.token())
                .<ResponseEntity<?>>map(lang -> ResponseEntity.noContent().build())
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/v1/newsletter/unsubscribe")
    public ResponseEntity<Void> unsubscribe(@Valid @RequestBody TokenRequest request) {
        return newsletter.unsubscribe(request.token()) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @ExceptionHandler(NewsletterMailer.NewsletterUnavailableException.class)
    ResponseEntity<ProblemDetail> mailFailed(NewsletterMailer.NewsletterUnavailableException e) {
        log.warn("Newsletter confirmation e-mail failed: {}", e.getCause().toString());
        return unavailable();
    }

    private static ResponseEntity<ProblemDetail> unavailable() {
        ProblemDetail p = ProblemDetail.forStatus(HttpStatus.SERVICE_UNAVAILABLE);
        p.setProperty("messageKey", "newsletter.error");
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(p);
    }
}
