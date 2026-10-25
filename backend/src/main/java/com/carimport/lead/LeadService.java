package com.carimport.lead;

import java.time.Clock;
import java.time.Instant;
import java.util.Comparator;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Stores the lead and routes it round-robin (least recently served) among verified partners covering the route.
 * Unrouted leads stay NEW and show up in the back-office queue.
 */
@Service
public class LeadService {

    private static final Logger log = LoggerFactory.getLogger(LeadService.class);

    private final LeadRepository leads;
    private final PartnerRepository partners;
    private final Clock clock;

    public LeadService(LeadRepository leads, PartnerRepository partners, Clock clock) {
        this.leads = leads;
        this.partners = partners;
        this.clock = clock;
    }

    @Transactional
    public UUID submit(LeadController.LeadRequest req, String locale) {
        Instant now = clock.instant();
        Lead lead = new Lead(req.quoteId(), req.name(), req.email(), req.phone(), req.destinationCountry(),
                req.originCountry(), req.message(), locale, req.consentDataTransfer(), req.consentMarketing(), now);
        partners.findByActiveTrueAndVerifiedTrue().stream()
                .filter(p -> p.serves(lead.getDestinationCountry(), lead.getOriginCountry()))
                .min(Comparator.comparing(Partner::getLastLeadAt, Comparator.nullsFirst(Comparator.naturalOrder())))
                .ifPresent(p -> {
                    lead.routeTo(p);
                    p.leadAssigned(now);
                    // partner notification (e-mail / partner webhook) is published as an event here
                });
        UUID id = leads.save(lead).getId();
        // no name, e-mail or phone in the log - the lead row has them
        log.info("Lead {} {} -> {}, partner {}", id, lead.getOriginCountry(), lead.getDestinationCountry(),
                lead.getPartnerId() == null ? "none" : lead.getPartnerId());
        return id;
    }
}
