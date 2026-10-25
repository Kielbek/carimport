-- Newsletter with double opt-in: an address is CONFIRMED only after the link in the confirmation e-mail is opened
-- (proof of consent: when, to which text version, from which form). Only the hash of the confirmation token is
-- stored; the unsubscribe token is kept in clear because every newsletter must carry it in its link.
CREATE TABLE newsletter_subscriber (
    id                  UUID PRIMARY KEY,
    email               VARCHAR(254) NOT NULL,
    locale              VARCHAR(5)   NOT NULL,
    status              VARCHAR(16)  NOT NULL,
    source              VARCHAR(32),
    consent_version     VARCHAR(20)  NOT NULL,
    confirm_token_hash  VARCHAR(64),
    unsubscribe_token   VARCHAR(64)  NOT NULL,
    created_at          TIMESTAMPTZ  NOT NULL,
    confirm_sent_at     TIMESTAMPTZ,
    confirmed_at        TIMESTAMPTZ,
    unsubscribed_at     TIMESTAMPTZ
);
CREATE UNIQUE INDEX ux_newsletter_email ON newsletter_subscriber (lower(email));
CREATE UNIQUE INDEX ux_newsletter_unsubscribe ON newsletter_subscriber (unsubscribe_token);
CREATE INDEX ix_newsletter_confirm ON newsletter_subscriber (confirm_token_hash);

-- The demo partner from V2 must not receive real enquiries; partners are added when contracts exist.
UPDATE partner SET active = FALSE WHERE contact_email = 'leads@partner.example';
