package com.carimport.web.ratelimit;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class RateLimitFilterTest {

    private final AtomicLong clock = new AtomicLong(1_000_000_000L);
    private final RateLimitFilter filter = new RateLimitFilter(clock::get);

    private int call(String method, String path, String ip) throws Exception {
        MockHttpServletRequest req = new MockHttpServletRequest(method, path);
        req.setRemoteAddr(ip);
        MockHttpServletResponse res = new MockHttpServletResponse();
        filter.doFilter(req, res, new MockFilterChain());
        return res.getStatus();
    }

    @Test
    void vinLookupsAreLimitedPerClientWithRetryAfter() throws Exception {
        for (int i = 0; i < 5; i++) {
            assertThat(call("GET", "/api/v1/vehicle/vin/1FA6P8CF7K5100001", "1.1.1.1")).isEqualTo(200);
        }
        MockHttpServletRequest req = new MockHttpServletRequest("GET", "/api/v1/vehicle/vin/1FA6P8CF7K5100001");
        req.setRemoteAddr("1.1.1.1");
        MockHttpServletResponse res = new MockHttpServletResponse();
        filter.doFilter(req, res, new MockFilterChain());
        assertThat(res.getStatus()).isEqualTo(429);
        assertThat(res.getHeader("Retry-After")).isEqualTo("6");      // 10 per minute = one every 6 s
        assertThat(res.getContentAsString()).contains("error.rateLimited");

        assertThat(call("GET", "/api/v1/vehicle/vin/1FA6P8CF7K5100001", "2.2.2.2")).isEqualTo(200); // other client
        assertThat(call("GET", "/api/v1/reference/ports", "1.1.1.1")).isEqualTo(200);             // other rule
    }

    @Test
    void tokensComeBackOverTime() throws Exception {
        for (int i = 0; i < 5; i++) {
            call("POST", "/api/v1/reports/checkout", "3.3.3.3");
        }
        assertThat(call("POST", "/api/v1/reports/checkout", "3.3.3.3")).isEqualTo(429);
        clock.addAndGet(12_000_000_000L);                                 // 5 per minute: one token per 12 s
        assertThat(call("POST", "/api/v1/reports/checkout", "3.3.3.3")).isEqualTo(200);
        assertThat(call("POST", "/api/v1/reports/checkout", "3.3.3.3")).isEqualTo(429);
    }

    @Test
    void webhooksAndNonApiPathsAreNotLimitedAndIdleClientsAreForgotten() throws Exception {
        for (int i = 0; i < 50; i++) {
            assertThat(call("POST", "/api/v1/webhooks/stripe", "4.4.4.4")).isEqualTo(200);
        }
        assertThat(call("GET", "/actuator/health", "4.4.4.4")).isEqualTo(200);
        call("POST", "/api/v1/leads", "5.5.5.5");
        assertThat(filter.size()).isEqualTo(1);
        clock.addAndGet(16L * 60 * 1_000_000_000L);
        filter.evictIdle();
        assertThat(filter.size()).isZero();
    }

    @Test
    void suggestionsAllowNormalWizardUse() throws Exception {
        // a user clicking through the wizard: 20 changes in quick succession all pass
        for (int i = 0; i < 20; i++) {
            assertThat(call("POST", "/api/v1/quotes/suggestions", "6.6.6.6")).isEqualTo(200);
        }
        assertThat(call("POST", "/api/v1/quotes/suggestions", "6.6.6.6")).isEqualTo(429);
    }
}
