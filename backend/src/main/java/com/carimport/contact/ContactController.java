package com.carimport.contact;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/** The contact form on the site; rate-limited per client (RateLimitFilter, rule "contact"). */
@RestController
public class ContactController {

    public record ContactRequest(
            @NotBlank @Size(max = 120) String name,
            @Email @NotBlank @Size(max = 254) String email,
            @Pattern(regexp = "report|order|partner|other") String topic,
            @Size(max = 64) String order,
            @NotBlank @Size(min = 10, max = 5000) String message,
            @Pattern(regexp = "[a-z]{2}") String locale,
            /** Honeypot - hidden in the form, bots fill it. */
            @Size(max = 0) String website) {
    }

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    private final ContactMailer mailer;

    public ContactController(ContactMailer mailer) {
        this.mailer = mailer;
    }

    @PostMapping("/api/v1/contact")
    public ResponseEntity<?> send(@Valid @RequestBody ContactRequest request) {
        if (!mailer.enabled()) {
            return unavailable();
        }
        mailer.send(request);
        log.info("Contact message ({}, {}) delivered", request.topic(), request.locale());
        return ResponseEntity.accepted().build();
    }

    @ExceptionHandler(ContactMailer.ContactUnavailableException.class)
    ResponseEntity<ProblemDetail> mailFailed(ContactMailer.ContactUnavailableException e) {
        log.error("Contact message could not be sent: {}", e.getCause().toString());
        return unavailable();
    }

    private static ResponseEntity<ProblemDetail> unavailable() {
        ProblemDetail p = ProblemDetail.forStatus(HttpStatus.SERVICE_UNAVAILABLE);
        p.setProperty("messageKey", "contact.error");
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(p);
    }
}
