package com.carimport.lead;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Map;
import java.util.UUID;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LeadController {

    public record LeadRequest(
            UUID quoteId,
            @NotBlank @Size(max = 120) String name,
            @Email @NotBlank String email,
            @Pattern(regexp = "^\\+?[0-9 ()-]{6,20}$") String phone,
            @NotBlank @Pattern(regexp = "[A-Z]{2}") String destinationCountry,
            @NotBlank String originCountry,
            @Size(max = 2000) String message,
            @AssertTrue boolean consentDataTransfer,
            boolean consentMarketing,
            /** Honeypot - hidden in the form, bots fill it. */
            @Size(max = 0) String website) {
    }

    private final LeadService leads;

    public LeadController(LeadService leads) {
        this.leads = leads;
    }

    @PostMapping("/api/v1/leads")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, UUID> submit(@Valid @RequestBody LeadRequest request) {
        return Map.of("leadId", leads.submit(request, LocaleContextHolder.getLocale().getLanguage()));
    }
}
