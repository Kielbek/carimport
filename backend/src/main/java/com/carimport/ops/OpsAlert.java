package com.carimport.ops;

/**
 * Something the operator must look at (a report that failed, an e-mail that keeps failing, a wrong payment amount,
 * an unhandled error, stale exchange rates). Published as an application event; {@link AlertService} e-mails it.
 *
 * @param key     identity for throttling: the same key is e-mailed at most once per {@link AlertService#THROTTLE}
 * @param subject one line, goes into the e-mail subject
 * @param details what happened and what to do, plain text
 */
public record OpsAlert(String key, String subject, String details) {
}
