package com.carimport.web.ratelimit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.LongSupplier;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Per-client request limits for the public API, in memory. The expensive endpoints get their own, tighter buckets:
 * port suggestions price every EU port with road routing, a quote runs the full engine three times, a VIN lookup
 * calls two outside databases, address search calls the geocoder. A client over the limit gets 429 with
 * Retry-After; normal use of the wizard (debounced) stays far below it.
 *
 * The client is the remote address as resolved by {@code server.forward-headers-strategy}; behind a load balancer the
 * proxy must set X-Forwarded-For. With several API nodes the limits apply per node - a gateway or Redis-backed limiter
 * is the next step at that scale.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 20) // after the forwarded-header filter, before everything else
public class RateLimitFilter extends OncePerRequestFilter {

    /** A rule: requests matching method + path prefix share one bucket per client. */
    record Rule(String name, String method, String pathPrefix, int burst, int perMinute) {

        boolean matches(String m, String path) {
            return (method == null || method.equals(m)) && path.startsWith(pathPrefix);
        }
    }

    static final List<Rule> RULES = List.of(
            new Rule("suggestions", "POST", "/api/v1/quotes/suggestions", 20, 40),
            new Rule("estimate-mail", "POST", "/api/v1/quotes/email", 3, 2),
            new Rule("quotes", "POST", "/api/v1/quotes", 10, 20),
            new Rule("vin", "GET", "/api/v1/vehicle/vin/", 5, 10),
            new Rule("geo", "GET", "/api/v1/geo/", 30, 60),
            new Rule("checkout", "POST", "/api/v1/reports/checkout", 5, 5),
            new Rule("leads", "POST", "/api/v1/leads", 3, 2),
            new Rule("newsletter", "POST", "/api/v1/newsletter", 5, 3),
            new Rule("admin", null, "/api/v1/admin/", 30, 30),
            new Rule("api", null, "/api/", 120, 300));

    private static final String WEBHOOK = "/api/v1/webhooks/";
    private static final long IDLE_NANOS = 15L * 60 * 1_000_000_000L;
    /** Memory guard against floods from many addresses: beyond this, start from empty buckets. */
    private static final int MAX_CLIENTS = 500_000;

    private final Map<String, TokenBucket> buckets = new ConcurrentHashMap<>();
    private final LongSupplier nanoTime;

    public RateLimitFilter() {
        this(System::nanoTime);
    }

    RateLimitFilter(LongSupplier nanoTime) {
        this.nanoTime = nanoTime;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Stripe retries webhooks from a few addresses; signature verification protects that endpoint
        return !path.startsWith("/api/") || path.startsWith(WEBHOOK) || "OPTIONS".equals(request.getMethod());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        String method = request.getMethod();
        Rule rule = RULES.stream().filter(r -> r.matches(method, path)).findFirst().orElseThrow();
        long now = nanoTime.getAsLong();
        if (buckets.size() > MAX_CLIENTS) {
            buckets.clear();
        }
        TokenBucket bucket = buckets.computeIfAbsent(rule.name() + '|' + request.getRemoteAddr(),
                k -> new TokenBucket(rule.burst(), rule.perMinute(), now));
        long retryAfter = bucket.tryConsume(now);
        if (retryAfter == 0) {
            chain.doFilter(request, response);
            return;
        }
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader("Retry-After", String.valueOf(retryAfter));
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        response.getWriter().write("{\"status\":429,\"title\":\"Too Many Requests\",\"messageKey\":\"error.rateLimited\","
                + "\"retryAfter\":" + retryAfter + "}");
    }

    /** Forget clients that have been quiet long enough for their bucket to be full again. */
    @Scheduled(fixedDelayString = "PT5M")
    void evictIdle() {
        long now = nanoTime.getAsLong();
        buckets.values().removeIf(b -> b.idle(now, IDLE_NANOS));
    }

    int size() {
        return buckets.size();
    }
}
