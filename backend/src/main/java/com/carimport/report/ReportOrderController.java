package com.carimport.report;

import com.carimport.calculation.CalculationResult;
import com.carimport.domain.CurrencyCode;
import com.carimport.payment.AccessTokens;
import com.carimport.payment.CheckoutService;
import com.carimport.payment.ReportOrder;
import com.carimport.payment.ReportOrderRepository;
import com.carimport.quote.QuoteRepository;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * Paywall API. The access token is sent as {@code Authorization: Bearer <token>} (the SPA reads it from the success URL
 * fragment), so it never ends up in access logs.
 */
@RestController
@RequestMapping("/api/v1/reports")
public class ReportOrderController {

    public record CheckoutRequest(@NotNull UUID quoteId, @Email @NotBlank String email,
                                  @NotBlank @Size(max = 120) String fullName, @NotNull CurrencyCode currency,
                                  @NotBlank String locale) {
    }

    public record CheckoutResponse(UUID orderId, String accessToken, String checkoutUrl) {
    }

    public record OrderStatus(UUID orderId, ReportOrder.Status status, boolean downloadable) {
    }

    public record FullReport(CalculationResult result, List<DocumentChecklistService.ChecklistItem> documents) {
    }

    private final CheckoutService checkout;
    private final ReportOrderRepository orders;
    private final QuoteRepository quotes;
    private final ReportStorage storage;
    private final DocumentChecklistService checklist;

    public ReportOrderController(CheckoutService checkout, ReportOrderRepository orders, QuoteRepository quotes,
                                 ReportStorage storage, DocumentChecklistService checklist) {
        this.checkout = checkout;
        this.orders = orders;
        this.quotes = quotes;
        this.storage = storage;
        this.checklist = checklist;
    }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(@Valid @RequestBody CheckoutRequest req) throws StripeException {
        var result = checkout.startCheckout(req.quoteId(), req.email(), req.fullName(), req.locale(), req.currency());
        return new CheckoutResponse(result.orderId(), result.accessToken(), result.checkoutUrl());
    }

    /** Polled by the success page until READY (the redirect from Stripe can beat the webhook). */
    @GetMapping("/orders/{id}")
    public OrderStatus status(@PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        ReportOrder order = authorize(id, auth);
        return new OrderStatus(order.getId(), order.getStatus(), order.getStatus() == ReportOrder.Status.READY);
    }

    /** Unlocked, exact breakdown rendered in the app (same data as the PDF). */
    @GetMapping("/orders/{id}/full")
    public FullReport full(@PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        ReportOrder order = authorize(id, auth);
        if (!order.isUnlocked()) {
            throw new ResponseStatusException(HttpStatus.PAYMENT_REQUIRED);
        }
        var quote = quotes.findById(order.getQuoteId()).orElseThrow();
        return new FullReport(quote.getResult(), checklist.checklist(quote.getRequest(), quote.getResult().historic()));
    }

    @GetMapping("/orders/{id}/pdf")
    public ResponseEntity<InputStreamResource> pdf(@PathVariable UUID id,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        ReportOrder order = authorize(id, auth);
        if (order.getStatus() != ReportOrder.Status.READY) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Report not ready");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename("import-report-" + order.getId() + ".pdf").build().toString())
                .header(HttpHeaders.CACHE_CONTROL, "private, no-store")
                .body(new InputStreamResource(storage.open(order.getPdfStorageKey())));
    }

    private ReportOrder authorize(UUID id, String authorization) {
        String token = authorization != null && authorization.startsWith("Bearer ")
                ? authorization.substring(7) : null;
        return orders.findById(id)
                .filter(o -> AccessTokens.matches(token, o.getAccessTokenHash()))
                // same response for "missing" and "wrong token" - no order enumeration
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
