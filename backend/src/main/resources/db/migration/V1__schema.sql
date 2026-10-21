-- =====================================================================================================================
-- Reference data (tariffs). Versioned by valid_from/valid_to where the law changes over time.
-- =====================================================================================================================

CREATE TABLE eu_country_tax_profile (
    id                  BIGSERIAL PRIMARY KEY,
    country_code        VARCHAR(2)       NOT NULL,
    tax_currency        VARCHAR(3)    NOT NULL,
    standard_vat_rate   NUMERIC(5, 4) NOT NULL,
    collector_vat_rate  NUMERIC(5, 4) NOT NULL,
    round_to_whole_units BOOLEAN      NOT NULL DEFAULT FALSE,
    valid_from          DATE          NOT NULL,
    valid_to            DATE,
    CONSTRAINT uq_tax_profile UNIQUE (country_code, valid_from)
);

CREATE TABLE eu_port (
    code                   VARCHAR(5)     PRIMARY KEY,
    name                   VARCHAR(64)    NOT NULL,
    country_code           VARCHAR(2)        NOT NULL,
    unloading_fee          NUMERIC(10, 2) NOT NULL,
    customs_agency_fee     NUMERIC(10, 2) NOT NULL,
    fee_currency           VARCHAR(3)     NOT NULL,
    supports_procedure4200 BOOLEAN        NOT NULL,
    active                 BOOLEAN        NOT NULL DEFAULT TRUE
);

CREATE TABLE customs_tariff (
    id               BIGSERIAL PRIMARY KEY,
    vehicle_category VARCHAR(16),
    historic         BOOLEAN       NOT NULL DEFAULT FALSE,
    electric_only    BOOLEAN,
    cc_from          INT           NOT NULL DEFAULT 0,
    cc_to            INT,
    hs_code          VARCHAR(12)   NOT NULL,
    duty_rate        NUMERIC(5, 4) NOT NULL,
    description      VARCHAR(160)  NOT NULL
);

CREATE TABLE excise_rate (
    id           BIGSERIAL PRIMARY KEY,
    country_code VARCHAR(2)       NOT NULL,
    fuel_type    VARCHAR(16)   NOT NULL,
    cc_from      INT           NOT NULL,
    cc_to        INT,
    rate         NUMERIC(6, 5) NOT NULL,
    legal_basis  VARCHAR(160),
    valid_from   DATE          NOT NULL,
    valid_to     DATE
);
CREATE INDEX ix_excise_lookup ON excise_rate (country_code, fuel_type);

CREATE TABLE auction_fee_tier (
    id            BIGSERIAL PRIMARY KEY,
    auction_house VARCHAR(32)    NOT NULL,
    fee_type      VARCHAR(32)    NOT NULL,
    title_type    VARCHAR(16),
    price_from    NUMERIC(14, 2) NOT NULL,
    price_to      NUMERIC(14, 2),
    fixed_amount  NUMERIC(14, 2) NOT NULL DEFAULT 0,
    percentage    NUMERIC(7, 5)  NOT NULL DEFAULT 0,
    currency      VARCHAR(3)     NOT NULL,
    valid_from    DATE           NOT NULL,
    valid_to      DATE,
    CONSTRAINT ck_tier_range CHECK (price_to IS NULL OR price_to > price_from)
);
CREATE INDEX ix_fee_tier_lookup ON auction_fee_tier (auction_house, fee_type, title_type, price_from);

CREATE TABLE auction_fixed_fee (
    id             BIGSERIAL PRIMARY KEY,
    auction_house  VARCHAR(32)    NOT NULL,
    origin_country VARCHAR(16)    NOT NULL,
    code           VARCHAR(48)    NOT NULL,
    amount         NUMERIC(14, 2) NOT NULL,
    currency       VARCHAR(3)     NOT NULL
);

CREATE TABLE condition_surcharge (
    id                BIGSERIAL PRIMARY KEY,
    origin_country    VARCHAR(16)    NOT NULL,
    vehicle_condition VARCHAR(16)    NOT NULL,
    code              VARCHAR(48)    NOT NULL,
    amount            NUMERIC(14, 2) NOT NULL,
    currency          VARCHAR(3)     NOT NULL
);

CREATE TABLE inland_transport_rate (
    id                    BIGSERIAL PRIMARY KEY,
    origin_country        VARCHAR(16)    NOT NULL,
    pickup_zone           VARCHAR(16)    NOT NULL,
    departure_port        VARCHAR(5)     NOT NULL,
    price_min             NUMERIC(10, 2) NOT NULL,
    price_max             NUMERIC(10, 2) NOT NULL,
    non_running_surcharge NUMERIC(10, 2) NOT NULL DEFAULT 0,
    currency              VARCHAR(3)     NOT NULL,
    CONSTRAINT uq_inland UNIQUE (origin_country, pickup_zone, departure_port)
);

CREATE TABLE ocean_freight_rate (
    id             BIGSERIAL PRIMARY KEY,
    departure_port VARCHAR(5)     NOT NULL,
    eu_port_code   VARCHAR(5)     NOT NULL REFERENCES eu_port (code),
    method         VARCHAR(24)    NOT NULL,
    size_class     VARCHAR(16)    NOT NULL,
    price_min      NUMERIC(10, 2) NOT NULL,
    price_max      NUMERIC(10, 2) NOT NULL,
    currency       VARCHAR(3)     NOT NULL,
    transit_days   INT            NOT NULL,
    CONSTRAINT uq_ocean UNIQUE (departure_port, eu_port_code, method, size_class)
);

CREATE TABLE intra_eu_transport_rate (
    id                  BIGSERIAL PRIMARY KEY,
    eu_port_code        VARCHAR(5)     NOT NULL REFERENCES eu_port (code),
    destination_country VARCHAR(2)        NOT NULL,
    price_min           NUMERIC(10, 2) NOT NULL,
    price_max           NUMERIC(10, 2) NOT NULL,
    currency            VARCHAR(3)     NOT NULL,
    CONSTRAINT uq_intra_eu UNIQUE (eu_port_code, destination_country)
);

CREATE TABLE destination_fee (
    id                  BIGSERIAL PRIMARY KEY,
    destination_country VARCHAR(2)        NOT NULL,
    origin_country      VARCHAR(16),
    code                VARCHAR(48)    NOT NULL,
    amount              NUMERIC(10, 2) NOT NULL,
    currency            VARCHAR(3)     NOT NULL,
    estimate            BOOLEAN        NOT NULL DEFAULT FALSE
);

CREATE TABLE exchange_rate (
    id             BIGSERIAL PRIMARY KEY,
    currency       VARCHAR(3)     NOT NULL,
    pln_per_unit   NUMERIC(18, 8) NOT NULL,
    effective_date DATE           NOT NULL,
    source         VARCHAR(8)     NOT NULL,
    table_no       VARCHAR(32),
    fetched_at     TIMESTAMPTZ    NOT NULL,
    CONSTRAINT uq_fx UNIQUE (currency, effective_date, source)
);
CREATE INDEX ix_fx_latest ON exchange_rate (currency, effective_date DESC);

-- =====================================================================================================================
-- Transactional data
-- =====================================================================================================================

CREATE TABLE quote (
    id          UUID PRIMARY KEY,
    created_at  TIMESTAMPTZ    NOT NULL,
    expires_at  TIMESTAMPTZ    NOT NULL,
    locale      VARCHAR(5)     NOT NULL,
    request_json JSONB         NOT NULL,
    result_json  JSONB         NOT NULL,
    range_min   NUMERIC(14, 2) NOT NULL,
    range_max   NUMERIC(14, 2) NOT NULL
);

CREATE TABLE report_order (
    id                       UUID PRIMARY KEY,
    quote_id                 UUID         NOT NULL REFERENCES quote (id),
    email                    VARCHAR(254) NOT NULL,
    full_name                VARCHAR(120) NOT NULL,
    locale                   VARCHAR(5)   NOT NULL,
    status                   VARCHAR(16)  NOT NULL,
    amount_minor             BIGINT       NOT NULL,
    currency                 VARCHAR(3)   NOT NULL,
    access_token_hash        VARCHAR(64)     NOT NULL,
    stripe_session_id        VARCHAR(255) UNIQUE,
    stripe_payment_intent_id VARCHAR(255),
    pdf_storage_key          VARCHAR(255),
    generation_attempts      INT          NOT NULL DEFAULT 0,
    created_at               TIMESTAMPTZ  NOT NULL,
    paid_at                  TIMESTAMPTZ,
    ready_at                 TIMESTAMPTZ,
    version                  BIGINT       NOT NULL DEFAULT 0
);
CREATE INDEX ix_order_status ON report_order (status, paid_at);
CREATE INDEX ix_order_pi ON report_order (stripe_payment_intent_id);

CREATE TABLE processed_webhook_event (
    id           VARCHAR(255) PRIMARY KEY,
    type         VARCHAR(64)  NOT NULL,
    processed_at TIMESTAMPTZ  NOT NULL
);

CREATE TABLE partner (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(120)   NOT NULL,
    contact_email VARCHAR(254)   NOT NULL,
    fee_per_lead  NUMERIC(10, 2) NOT NULL,
    verified      BOOLEAN        NOT NULL DEFAULT FALSE,
    active        BOOLEAN        NOT NULL DEFAULT TRUE,
    last_lead_at  TIMESTAMPTZ
);

CREATE TABLE partner_destination (
    partner_id   BIGINT  NOT NULL REFERENCES partner (id) ON DELETE CASCADE,
    country_code VARCHAR(2) NOT NULL,
    PRIMARY KEY (partner_id, country_code)
);

CREATE TABLE partner_origin (
    partner_id     BIGINT      NOT NULL REFERENCES partner (id) ON DELETE CASCADE,
    origin_country VARCHAR(16) NOT NULL,
    PRIMARY KEY (partner_id, origin_country)
);

CREATE TABLE lead (
    id                    UUID PRIMARY KEY,
    quote_id              UUID REFERENCES quote (id),
    name                  VARCHAR(120)  NOT NULL,
    email                 VARCHAR(254)  NOT NULL,
    phone                 VARCHAR(32),
    destination_country   VARCHAR(2)       NOT NULL,
    origin_country        VARCHAR(16)   NOT NULL,
    message               VARCHAR(2000),
    locale                VARCHAR(5)    NOT NULL,
    consent_data_transfer BOOLEAN       NOT NULL,
    consent_marketing     BOOLEAN       NOT NULL,
    status                VARCHAR(16)   NOT NULL,
    partner_id            BIGINT REFERENCES partner (id),
    created_at            TIMESTAMPTZ   NOT NULL
);
