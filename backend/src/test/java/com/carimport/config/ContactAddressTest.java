package com.carimport.config;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class ContactAddressTest {

    @Test
    void picksTheWordForContactInTheReadersLanguage() {
        assertThat(ContactAddress.of("cargloapp.com", "pl")).isEqualTo("kontakt@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", "en")).isEqualTo("contact@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", "es")).isEqualTo("contacto@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", "it")).isEqualTo("contatti@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", "pt-PT")).isEqualTo("contacto@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", "xx")).isEqualTo("contact@cargloapp.com");
        assertThat(ContactAddress.of("cargloapp.com", null)).isEqualTo("contact@cargloapp.com");
    }

    @Test
    void mailFallsBackToTheFixedReplyToWithoutAContactDomain() {
        assertThat(new AppProperties.Mail("x", "a@b.c", null).replyTo("de")).isEqualTo("a@b.c");
        assertThat(new AppProperties.Mail("x", "a@b.c", "cargloapp.com").replyTo("de")).isEqualTo("kontakt@cargloapp.com");
    }
}
