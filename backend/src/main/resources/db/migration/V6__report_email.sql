-- E-mail with the report link: a second bearer token (only its hash is stored, like the checkout one) so the link
-- in the mailbox keeps working independently of the browser that paid; delivery state for retries.
ALTER TABLE report_order ADD COLUMN email_token_hash VARCHAR(64);
ALTER TABLE report_order ADD COLUMN email_sent_at TIMESTAMPTZ;
ALTER TABLE report_order ADD COLUMN email_attempts INT NOT NULL DEFAULT 0;
CREATE INDEX ix_order_email_pending ON report_order (status, email_sent_at);

-- Consent to the terms and to immediate delivery of digital content (waiver of the 14-day withdrawal right,
-- Art. 16(m) Directive 2011/83/EU): when and to which version of the terms.
ALTER TABLE report_order ADD COLUMN terms_accepted_at TIMESTAMPTZ;
ALTER TABLE report_order ADD COLUMN terms_version VARCHAR(20);
