package com.carimport.i18n;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.core.io.ClassPathResource;
import org.yaml.snakeyaml.Yaml;

/**
 * Every language the site is published in must have a complete backend bundle (PDF report, validation errors), with
 * the same MessageFormat arguments as the English source - otherwise the report would silently mix in English.
 */
class I18nCoverageTest {

    private static final Pattern ARG = Pattern.compile("\\{\\d+}");

    @SuppressWarnings("unchecked")
    static Stream<String> supportedLocales() throws IOException {
        try (InputStream in = new ClassPathResource("application.yml").getInputStream()) {
            Map<String, Object> yaml = new Yaml().load(in);
            Map<String, Object> app = (Map<String, Object>) yaml.get("app");
            return ((List<String>) app.get("supported-locales")).stream().filter(l -> !l.equals("en"));
        }
    }

    @ParameterizedTest
    @MethodSource("supportedLocales")
    void bundleIsCompleteWithMatchingArguments(String locale) throws IOException {
        Properties english = load("i18n/messages.properties");
        Properties translated = load("i18n/messages_" + locale + ".properties");

        assertThat(translated.stringPropertyNames()).containsExactlyInAnyOrderElementsOf(english.stringPropertyNames());
        for (String key : english.stringPropertyNames()) {
            assertThat(arguments(translated.getProperty(key))).as(locale + ": " + key)
                    .isEqualTo(arguments(english.getProperty(key)));
            assertThat(translated.getProperty(key)).as(locale + ": " + key).isNotBlank();
        }
    }

    private static List<String> arguments(String message) {
        Matcher m = ARG.matcher(message);
        return m.results().map(r -> r.group()).sorted().collect(Collectors.toList());
    }

    private static Properties load(String path) throws IOException {
        Properties p = new Properties();
        try (InputStreamReader r = new InputStreamReader(new ClassPathResource(path).getInputStream(),
                StandardCharsets.UTF_8)) {
            p.load(r);
        }
        return p;
    }
}
