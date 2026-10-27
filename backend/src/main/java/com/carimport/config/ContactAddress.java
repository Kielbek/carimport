package com.carimport.config;

import java.util.Map;

/**
 * The contact address in the reader's language - kontakt@, contact@, contacto@ ... - all delivered to one mailbox
 * (aliases of it at the mail host). Keep in step with CONTACT_LOCAL in frontend/src/app/core/site.config.ts.
 */
public final class ContactAddress {

    private static final Map<String, String> LOCAL = Map.ofEntries(
            Map.entry("en", "contact"), Map.entry("fr", "contact"), Map.entry("nl", "contact"), Map.entry("ro", "contact"),
            Map.entry("pl", "kontakt"), Map.entry("de", "kontakt"), Map.entry("cs", "kontakt"), Map.entry("sk", "kontakt"),
            Map.entry("sv", "kontakt"), Map.entry("da", "kontakt"), Map.entry("hr", "kontakt"), Map.entry("sl", "kontakt"),
            Map.entry("et", "kontakt"), Map.entry("uk", "kontakt"), Map.entry("bg", "kontakt"),
            Map.entry("es", "contacto"), Map.entry("pt", "contacto"), Map.entry("it", "contatti"),
            Map.entry("hu", "kapcsolat"), Map.entry("lt", "kontaktai"), Map.entry("lv", "kontakti"),
            Map.entry("fi", "yhteys"), Map.entry("el", "epikoinonia"));

    private ContactAddress() {
    }

    /** e.g. ("cargloapp.com", "de") → kontakt@cargloapp.com; unknown languages get contact@. */
    public static String of(String domain, String language) {
        String lang = language == null ? "en" : language.toLowerCase(java.util.Locale.ROOT);
        int dash = lang.indexOf('-');
        if (dash > 0) {
            lang = lang.substring(0, dash);
        }
        return LOCAL.getOrDefault(lang, "contact") + "@" + domain;
    }
}
