package com.carimport.web;

import com.carimport.calculation.CalculationException;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import com.carimport.ops.OpsAlert;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import com.carimport.web.logging.RequestLoggingFilter;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/** RFC 9457 problem details; {@code messageKey} lets the SPA translate, {@code detail} is pre-translated. */
@RestControllerAdvice
public class ApiExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

    private final MessageSource messages;
    private final ApplicationEventPublisher events;

    public ApiExceptionHandler(MessageSource messages, ApplicationEventPublisher events) {
        this.messages = messages;
        this.events = events;
    }

    @ExceptionHandler(CalculationException.class)
    public ProblemDetail calculation(CalculationException e) {
        Locale locale = LocaleContextHolder.getLocale();
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY,
                messages.getMessage(e.getMessageKey(), null, e.getMessageKey(), locale));
        problem.setProperty("messageKey", e.getMessageKey());
        return problem;
    }

    /** Field and class-level (@AssertTrue) violations, already translated by the MessageSource-backed validator. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail validation(MethodArgumentNotValidException e) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        Map<String, String> errors = new LinkedHashMap<>();
        e.getBindingResult().getFieldErrors().forEach(f -> errors.putIfAbsent(f.getField(), f.getDefaultMessage()));
        e.getBindingResult().getGlobalErrors().forEach(g -> errors.putIfAbsent(g.getObjectName(), g.getDefaultMessage()));
        problem.setDetail(String.join(" ", errors.values()));
        problem.setProperty("errors", errors);
        return problem;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail badRequest(IllegalArgumentException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    /**
     * Everything else. Spring's own errors (404, 405, 415, ...) keep their status; a real failure is logged with its
     * stack trace and the client gets only the request id to quote to support.
     */
    @ExceptionHandler(Exception.class)
    public ProblemDetail unexpected(Exception e) {
        if (e instanceof ErrorResponse known) {
            return known.getBody();
        }
        log.error("Unhandled error", e);
        String id = MDC.get(RequestLoggingFilter.MDC_KEY);
        events.publishEvent(new OpsAlert("unhandled:" + e.getClass().getName(), "Unhandled error: " + e.getClass().getSimpleName(),
                e + "\nRequest id " + id + " - search the API log for it to see the request and the stack trace."));
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problem.setProperty("requestId", MDC.get(RequestLoggingFilter.MDC_KEY));
        return problem;
    }
}
