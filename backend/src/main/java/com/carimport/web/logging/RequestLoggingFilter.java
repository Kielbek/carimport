package com.carimport.web.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * One access-log line per API call (method, path, status, duration, client) under the logger {@code access}, and a
 * request id in the MDC so every line the request writes can be found with one grep. The id comes from nginx
 * (X-Request-Id, also in its access log) or is generated, and is echoed back in the response.
 *
 * Query strings are never logged - the Stripe return carries the checkout session id there. Health checks are
 * skipped to keep the log readable.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10) // before the rate limiter, so 429s are logged too
public class RequestLoggingFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-Request-Id";
    public static final String MDC_KEY = "requestId";
    private static final Pattern VALID_ID = Pattern.compile("[A-Za-z0-9-]{8,64}");
    private static final Logger access = LoggerFactory.getLogger("access");

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getRequestURI().startsWith("/actuator/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String id = request.getHeader(HEADER);
        if (id == null || !VALID_ID.matcher(id).matches()) {
            id = UUID.randomUUID().toString().replace("-", "");
        }
        MDC.put(MDC_KEY, id);
        response.setHeader(HEADER, id);
        long start = System.nanoTime();
        try {
            chain.doFilter(request, response);
        } finally {
            long ms = (System.nanoTime() - start) / 1_000_000;
            int status = response.getStatus();
            if (status >= 500) {
                access.warn("{} {} {} {}ms {}", request.getMethod(), request.getRequestURI(), status, ms,
                        request.getRemoteAddr());
            } else {
                access.info("{} {} {} {}ms {}", request.getMethod(), request.getRequestURI(), status, ms,
                        request.getRemoteAddr());
            }
            MDC.remove(MDC_KEY);
        }
    }
}
