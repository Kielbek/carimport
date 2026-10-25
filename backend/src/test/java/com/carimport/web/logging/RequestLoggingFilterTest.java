package com.carimport.web.logging;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class RequestLoggingFilterTest {

    private final RequestLoggingFilter filter = new RequestLoggingFilter();

    @Test
    void keepsTheProxyRequestIdForTheWholeRequestAndEchoesIt() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/v1/quotes");
        request.addHeader(RequestLoggingFilter.HEADER, "0a1b2c3d4e5f60718293a4b5c6d7e8f9");
        MockHttpServletResponse response = new MockHttpServletResponse();
        AtomicReference<String> seen = new AtomicReference<>();

        filter.doFilter(request, response, (req, res) -> seen.set(MDC.get(RequestLoggingFilter.MDC_KEY)));

        assertThat(seen.get()).isEqualTo("0a1b2c3d4e5f60718293a4b5c6d7e8f9");
        assertThat(response.getHeader(RequestLoggingFilter.HEADER)).isEqualTo(seen.get());
        assertThat(MDC.get(RequestLoggingFilter.MDC_KEY)).isNull();   // nothing leaks to the next request on the thread
    }

    @Test
    void replacesAMissingOrForgedIdWithAGeneratedOne() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/v1/geo/search");
        request.addHeader(RequestLoggingFilter.HEADER, "bad id\n[fake log line]");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilter(request, response, (req, res) -> { });

        assertThat(response.getHeader(RequestLoggingFilter.HEADER)).matches("[0-9a-f]{32}");
    }
}
