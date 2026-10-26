package com.carimport.admin;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * HTTP Basic protection of /api/v1/admin/** with the single operator account from ADMIN_USERNAME / ADMIN_PASSWORD.
 * Without a password the admin API does not exist (404). Credentials are compared in constant time; brute force is
 * slowed by the "admin" rate-limit rule. Use a long random password - the panel shows buyers' e-mail addresses.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 30) // after request logging and rate limiting
public class AdminAuthFilter extends OncePerRequestFilter {

    static final String PREFIX = "/api/v1/admin/";
    private static final Logger log = LoggerFactory.getLogger(AdminAuthFilter.class);

    private final byte[] expected;

    public AdminAuthFilter(@Value("${app.admin.username:admin}") String username,
                           @Value("${app.admin.password:}") String password) {
        this.expected = StringUtils.hasText(password)
                ? (username + ":" + password).getBytes(StandardCharsets.UTF_8) : null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith(PREFIX);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        if (expected == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        if (!authorized(request.getHeader("Authorization"))) {
            log.warn("Admin login rejected from {}", request.getRemoteAddr());
            // no WWW-Authenticate header: the panel's own form asks, not the browser's pop-up
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        chain.doFilter(request, response);
    }

    private boolean authorized(String header) {
        if (header == null || !header.startsWith("Basic ")) {
            return false;
        }
        try {
            byte[] given = Base64.getDecoder().decode(header.substring(6).trim());
            return MessageDigest.isEqual(given, expected);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
