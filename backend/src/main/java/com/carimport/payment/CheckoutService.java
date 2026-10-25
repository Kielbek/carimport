package com.carimport.payment;

import com.carimport.config.AppProperties;
import com.carimport.domain.CurrencyCode;
import com.carimport.quote.Quote;
import com.carimport.quote.QuoteRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionCreateParams;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Creates a Stripe Checkout Session for the report. The amount is decided here from configuration - never by the
 * client - and Stripe hosts the payment page (card, BLIK, Przelewy24), which keeps us out of PCI scope.
 */
@Service
public class CheckoutService {

    private static final Logger log = LoggerFactory.getLogger(CheckoutService.class);

    public record CheckoutResult(UUID orderId, String accessToken, String checkoutUrl) {
    }

    private final AppProperties props;
    private final QuoteRepository quotes;
    private final ReportOrderRepository orders;
    private final MessageSource messages;
    private final Clock clock;

    public CheckoutService(AppProperties props, QuoteRepository quotes, ReportOrderRepository orders,
                           MessageSource messages, Clock clock) {
        this.props = props;
        this.quotes = quotes;
        this.orders = orders;
        this.messages = messages;
        this.clock = clock;
    }

    @Transactional
    public CheckoutResult startCheckout(UUID quoteId, String email, String fullName, String locale,
                                        CurrencyCode currency, String termsVersion) throws StripeException {
        Instant now = clock.instant();
        Quote quote = quotes.findById(quoteId)
                .filter(q -> !q.isExpired(now))
                .orElseThrow(() -> new IllegalArgumentException("Quote missing or expired: " + quoteId));
        Long price = props.report().priceMinor().get(currency);
        if (price == null) {
            throw new IllegalArgumentException("Report is not sold in " + currency);
        }

        String token = AccessTokens.generate();
        ReportOrder created = new ReportOrder(quote.getId(), email, fullName, locale, price, currency,
                AccessTokens.hash(token), now);
        created.acceptTerms(termsVersion, now);
        ReportOrder order = orders.save(created);

        String returnBase = props.frontendUrl() + "/" + locale + "/report/" + order.getId();
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .addAllPaymentMethodType(paymentMethods(currency))
                .setCustomerEmail(email)
                .setClientReferenceId(order.getId().toString())
                .putMetadata("orderId", order.getId().toString())
                .putMetadata("quoteId", quote.getId().toString())
                .setLocale(stripeLocale(locale))
                .setExpiresAt(now.plus(Duration.ofMinutes(30)).getEpochSecond())
                // the token travels in the URL fragment, so it is never sent to any server or logged by proxies
                .setSuccessUrl(returnBase + "?session_id={CHECKOUT_SESSION_ID}#token=" + token)
                .setCancelUrl(props.frontendUrl() + "/" + locale + "/result/" + quote.getId() + "?cancelled=1")
                .setPaymentIntentData(SessionCreateParams.PaymentIntentData.builder()
                        .putMetadata("orderId", order.getId().toString())
                        .build())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency(currency.name().toLowerCase())
                                .setUnitAmount(price)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(messages.getMessage("report.product.name", null,
                                                Locale.forLanguageTag(locale)))
                                        .build())
                                .build())
                        .build())
                .build();

        RequestOptions options = RequestOptions.builder()
                .setApiKey(props.stripe().apiKey())
                .setIdempotencyKey("checkout-" + order.getId())
                .build();
        Session session = Session.create(params, options);
        order.attachSession(session.getId());
        log.info("Order {} created for quote {}: {} {} ({}), session {}", order.getId(), quote.getId(), price, currency,
                locale, session.getId());
        return new CheckoutResult(order.getId(), token, session.getUrl());
    }

    /** BLIK and Przelewy24 only settle in PLN (P24 also EUR); cards work everywhere. */
    static List<SessionCreateParams.PaymentMethodType> paymentMethods(CurrencyCode currency) {
        return switch (currency) {
            case PLN -> List.of(SessionCreateParams.PaymentMethodType.CARD,
                    SessionCreateParams.PaymentMethodType.BLIK,
                    SessionCreateParams.PaymentMethodType.P24);
            case EUR -> List.of(SessionCreateParams.PaymentMethodType.CARD,
                    SessionCreateParams.PaymentMethodType.P24);
            default -> List.of(SessionCreateParams.PaymentMethodType.CARD);
        };
    }

    /** Stripe Checkout speaks every site language except Ukrainian, which falls back to the browser language. */
    private static SessionCreateParams.Locale stripeLocale(String locale) {
        return switch (locale) {
            case "bg" -> SessionCreateParams.Locale.BG;
            case "cs" -> SessionCreateParams.Locale.CS;
            case "da" -> SessionCreateParams.Locale.DA;
            case "de" -> SessionCreateParams.Locale.DE;
            case "el" -> SessionCreateParams.Locale.EL;
            case "en" -> SessionCreateParams.Locale.EN;
            case "es" -> SessionCreateParams.Locale.ES;
            case "et" -> SessionCreateParams.Locale.ET;
            case "fi" -> SessionCreateParams.Locale.FI;
            case "fr" -> SessionCreateParams.Locale.FR;
            case "hr" -> SessionCreateParams.Locale.HR;
            case "hu" -> SessionCreateParams.Locale.HU;
            case "it" -> SessionCreateParams.Locale.IT;
            case "lt" -> SessionCreateParams.Locale.LT;
            case "lv" -> SessionCreateParams.Locale.LV;
            case "nl" -> SessionCreateParams.Locale.NL;
            case "pl" -> SessionCreateParams.Locale.PL;
            case "pt" -> SessionCreateParams.Locale.PT;
            case "ro" -> SessionCreateParams.Locale.RO;
            case "sk" -> SessionCreateParams.Locale.SK;
            case "sl" -> SessionCreateParams.Locale.SL;
            case "sv" -> SessionCreateParams.Locale.SV;
            default -> SessionCreateParams.Locale.AUTO;
        };
    }
}
