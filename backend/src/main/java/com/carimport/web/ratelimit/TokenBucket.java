package com.carimport.web.ratelimit;

/**
 * Classic token bucket: {@code capacity} requests at once, refilled continuously at {@code perMinute}. Synchronized -
 * one bucket belongs to one client and one rule, so contention is negligible. Times are {@link System#nanoTime()}.
 */
final class TokenBucket {

    private final int capacity;
    private final double refillPerNano;
    private double tokens;
    private long refilledAt;
    private long usedAt;

    TokenBucket(int capacity, int perMinute, long now) {
        this.capacity = capacity;
        this.refillPerNano = perMinute / 60e9;
        this.tokens = capacity;
        this.refilledAt = now;
        this.usedAt = now;
    }

    /** @return 0 when the request may go ahead, else the whole seconds until a token is back */
    synchronized long tryConsume(long now) {
        refill(now);
        usedAt = now;
        if (tokens >= 1) {
            tokens -= 1;
            return 0;
        }
        return Math.max(1, (long) Math.ceil((1 - tokens) / refillPerNano / 1e9));
    }

    /** Full again and unused for {@code idleNanos} - forgetting it changes nothing for the client. */
    synchronized boolean idle(long now, long idleNanos) {
        refill(now);
        return tokens >= capacity && now - usedAt >= idleNanos;
    }

    private void refill(long now) {
        long elapsed = now - refilledAt;
        if (elapsed > 0) {
            tokens = Math.min(capacity, tokens + elapsed * refillPerNano);
            refilledAt = now;
        }
    }
}
