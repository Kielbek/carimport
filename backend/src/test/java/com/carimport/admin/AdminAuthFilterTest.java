package com.carimport.admin;

import static org.assertj.core.api.Assertions.assertThat;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.concurrent.atomic.AtomicBoolean;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class AdminAuthFilterTest {

    private static int status(AdminAuthFilter filter, String user, String pass, AtomicBoolean passed) throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/v1/admin/orders");
        if (user != null) {
            request.addHeader("Authorization", "Basic " + Base64.getEncoder()
                    .encodeToString((user + ":" + pass).getBytes(StandardCharsets.UTF_8)));
        }
        MockHttpServletResponse response = new MockHttpServletResponse();
        filter.doFilter(request, response, (req, res) -> passed.set(true));
        return response.getStatus();
    }

    @Test
    void withoutAPasswordTheAdminApiDoesNotExist() throws Exception {
        AtomicBoolean passed = new AtomicBoolean();
        assertThat(status(new AdminAuthFilter("admin", ""), "admin", "", passed)).isEqualTo(404);
        assertThat(passed).isFalse();
    }

    @Test
    void onlyTheConfiguredAccountGetsIn() throws Exception {
        AdminAuthFilter filter = new AdminAuthFilter("admin", "s3cret-long-password");
        AtomicBoolean passed = new AtomicBoolean();
        assertThat(status(filter, null, null, passed)).isEqualTo(401);
        assertThat(status(filter, "admin", "wrong", passed)).isEqualTo(401);
        assertThat(status(filter, "root", "s3cret-long-password", passed)).isEqualTo(401);
        assertThat(passed).isFalse();
        assertThat(status(filter, "admin", "s3cret-long-password", passed)).isEqualTo(200);
        assertThat(passed).isTrue();
    }

    @Test
    void publicEndpointsAreNotTouched() throws Exception {
        AdminAuthFilter filter = new AdminAuthFilter("admin", "s3cret-long-password");
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/v1/quotes");
        AtomicBoolean passed = new AtomicBoolean();
        filter.doFilter(request, new MockHttpServletResponse(), (req, res) -> passed.set(true));
        assertThat(passed).isTrue();
    }

    @Test
    void csvCellsCannotInjectSpreadsheetFormulas() {
        assertThat(AdminController.cell("jan@example.com")).isEqualTo("jan@example.com");
        assertThat(AdminController.cell("=HYPERLINK(\"x\")")).isEqualTo("\"'=HYPERLINK(\"\"x\"\")\"");
        assertThat(AdminController.cell("a,b")).isEqualTo("\"a,b\"");
    }
}
