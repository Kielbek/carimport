package com.carimport.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Clock;
import java.util.List;
import java.util.Locale;
import org.hibernate.cfg.AvailableSettings;
import org.hibernate.type.format.jackson.JacksonJsonFormatMapper;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.cache.interceptor.SimpleKeyGenerator;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

@Configuration
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableConfigurationProperties(AppProperties.class)
public class ApplicationConfig implements WebMvcConfigurer {

    private final AppProperties props;

    public ApplicationConfig(AppProperties props) {
        this.props = props;
    }

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }

    /** JSON columns (quote snapshots) use the application's ObjectMapper - same modules and leniency as the API. */
    @Bean
    HibernatePropertiesCustomizer jsonFormatMapper(ObjectMapper objectMapper) {
        return props -> props.put(AvailableSettings.JSON_FORMAT_MAPPER, new JacksonJsonFormatMapper(objectMapper));
    }

    /** Plain-text e-mail bodies (templates/*.txt), next to Spring Boot's HTML resolver. */
    @Bean
    ITemplateResolver textTemplateResolver() {
        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("templates/");
        resolver.setTemplateMode(TemplateMode.TEXT);
        resolver.setCharacterEncoding("UTF-8");
        resolver.setResolvablePatterns(java.util.Set.of("*.txt"));
        resolver.setCheckExistence(true);
        resolver.setOrder(0);
        return resolver;
    }

    /** Cache key = method name + arguments, for caches shared by several methods. */
    @Bean
    KeyGenerator methodAwareKeyGenerator() {
        return (target, method, params) -> new SimpleKey(method.getName(), SimpleKeyGenerator.generateKey(params));
    }

    /** Bean Validation messages ({validation.*}) come from the same bundles as everything else. */
    @Bean
    LocalValidatorFactoryBean validator(MessageSource messageSource) {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(messageSource);
        return validator;
    }

    /** The Angular app sends its active language in Accept-Language (see the i18n interceptor). */
    @Bean
    LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver resolver = new AcceptHeaderLocaleResolver();
        List<Locale> locales = props.supportedLocales().stream().map(Locale::forLanguageTag).toList();
        resolver.setSupportedLocales(locales);
        resolver.setDefaultLocale(Locale.ENGLISH);
        return resolver;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(props.frontendUrl())
                .allowedMethods("GET", "POST");
    }
}
