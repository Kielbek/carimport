package com.carimport.calculation;

/** Business failure with an i18n message key, mapped to HTTP 422 by the API layer. */
public class CalculationException extends RuntimeException {

    private final String messageKey;

    public CalculationException(String messageKey, String detail) {
        super(messageKey + ": " + detail);
        this.messageKey = messageKey;
    }

    public String getMessageKey() {
        return messageKey;
    }
}
