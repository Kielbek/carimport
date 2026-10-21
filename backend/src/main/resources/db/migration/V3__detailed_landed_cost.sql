-- =====================================================================================================================
-- Detailed landed cost: per-km delivery, selectable after-import services, risks, lead times, stored scenarios.
-- Amounts are realistic SAMPLE values (2026) - verify before go-live, maintain via the admin panel.
-- =====================================================================================================================

ALTER TABLE quote ADD COLUMN range_json JSONB;

-- ---------- lead times from yard to export port ----------
ALTER TABLE inland_transport_rate ADD COLUMN days_min INT NOT NULL DEFAULT 5;
ALTER TABLE inland_transport_rate ADD COLUMN days_max INT NOT NULL DEFAULT 14;
UPDATE inland_transport_rate SET days_min = 4, days_max = 10 WHERE origin_country = 'CANADA';
UPDATE inland_transport_rate SET days_min = 7, days_max = 14 WHERE origin_country = 'JAPAN';
UPDATE inland_transport_rate SET days_min = 5, days_max = 10 WHERE origin_country = 'UAE';
UPDATE inland_transport_rate SET days_min = 2, days_max = 5 WHERE origin_country = 'UK';
UPDATE inland_transport_rate SET days_min = 3, days_max = 7 WHERE origin_country = 'USA' AND pickup_zone <> '*';

-- country-wide fallbacks so any departure port can be chosen
INSERT INTO inland_transport_rate (origin_country, pickup_zone, departure_port, price_min, price_max, non_running_surcharge, currency, days_min, days_max) VALUES
    ('USA', '*', 'USLAX', 600, 1400, 150, 'USD', 5, 14),
    ('CANADA', '*', 'CAMTR', 400, 900, 150, 'CAD', 4, 10);

-- ---------- typical distance port -> destination (km) ----------
ALTER TABLE intra_eu_transport_rate ADD COLUMN distance_km INT NOT NULL DEFAULT 0;
UPDATE intra_eu_transport_rate SET distance_km = CASE eu_port_code || '>' || destination_country
    WHEN 'DEBRV>PL' THEN 850 WHEN 'DEHAM>PL' THEN 750 WHEN 'NLRTM>PL' THEN 1150 WHEN 'BEANR>PL' THEN 1200
    WHEN 'PLGDY>PL' THEN 350 WHEN 'DEBRV>DE' THEN 450 WHEN 'DEHAM>DE' THEN 450 WHEN 'NLRTM>DE' THEN 500
    WHEN 'BEANR>DE' THEN 550 WHEN 'PLGDY>DE' THEN 750 WHEN 'NLRTM>NL' THEN 100 WHEN 'DEBRV>NL' THEN 350
    WHEN 'BEANR>NL' THEN 150 WHEN 'BEANR>BE' THEN 80 WHEN 'NLRTM>BE' THEN 120 WHEN 'DEBRV>CZ' THEN 750
    WHEN 'NLRTM>CZ' THEN 950 WHEN 'PLGDY>CZ' THEN 700 WHEN 'DEBRV>SK' THEN 1100 WHEN 'DEBRV>AT' THEN 1000
    WHEN 'DEBRV>FR' THEN 900 WHEN 'NLRTM>FR' THEN 500 WHEN 'DEBRV>LT' THEN 1250 WHEN 'PLGDY>LT' THEN 500
    WHEN 'DEBRV>IT' THEN 1300 WHEN 'DEBRV>ES' THEN 2000 ELSE 600 END;

-- ---------- per-km road transport ----------
CREATE TABLE road_transport_rate (
    id               BIGSERIAL PRIMARY KEY,
    country_code     VARCHAR(2)     NOT NULL,
    mode             VARCHAR(16)    NOT NULL,
    price_per_km_min NUMERIC(8, 3)  NOT NULL,
    price_per_km_max NUMERIC(8, 3)  NOT NULL,
    fixed_fee        NUMERIC(10, 2) NOT NULL,
    minimum_charge   NUMERIC(10, 2) NOT NULL,
    currency         VARCHAR(3)     NOT NULL,
    CONSTRAINT uq_road_rate UNIQUE (country_code, mode)
);
-- SELF_DRIVE: per km = fuel, fixed = temporary plates + short-term liability insurance
INSERT INTO road_transport_rate (country_code, mode, price_per_km_min, price_per_km_max, fixed_fee, minimum_charge, currency) VALUES
    ('PL', 'CAR_CARRIER', 2.600, 3.400, 150, 600, 'PLN'),
    ('PL', 'TOW_TRUCK',   3.500, 4.800, 100, 400, 'PLN'),
    ('PL', 'SELF_DRIVE',  0.550, 0.800, 250,   0, 'PLN'),
    ('DE', 'CAR_CARRIER', 0.900, 1.300,  50, 250, 'EUR'),
    ('DE', 'TOW_TRUCK',   1.400, 2.000,  40, 180, 'EUR'),
    ('DE', 'SELF_DRIVE',  0.150, 0.220, 180,   0, 'EUR'),
    ('NL', 'CAR_CARRIER', 1.000, 1.400,  60, 250, 'EUR'),
    ('NL', 'TOW_TRUCK',   1.500, 2.100,  50, 200, 'EUR'),
    ('NL', 'SELF_DRIVE',  0.170, 0.240, 200,   0, 'EUR'),
    ('*',  'CAR_CARRIER', 1.000, 1.400,  60, 280, 'EUR'),
    ('*',  'TOW_TRUCK',   1.500, 2.100,  50, 200, 'EUR'),
    ('*',  'SELF_DRIVE',  0.170, 0.250, 200,   0, 'EUR');

-- ---------- after-import services: statutory vs. selectable ----------
ALTER TABLE destination_fee ADD COLUMN selectable BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE destination_fee ADD COLUMN default_selected BOOLEAN NOT NULL DEFAULT FALSE;

-- PL: replace the lump registration fee with the official breakdown
DELETE FROM destination_fee WHERE destination_country = 'PL' AND code IN ('REGISTRATION_FEE', 'TECHNICAL_INSPECTION');
UPDATE destination_fee SET selectable = TRUE, default_selected = TRUE
    WHERE destination_country = 'PL' AND code IN ('SWORN_TRANSLATION', 'US_LIGHTING_CONVERSION', 'RHD_HEADLIGHT_ADJUSTMENT');
UPDATE destination_fee SET selectable = TRUE, default_selected = TRUE
    WHERE destination_country = 'DE' AND code = 'US_LIGHTING_CONVERSION';
INSERT INTO destination_fee (destination_country, origin_country, code, amount, currency, estimate, selectable, default_selected) VALUES
    -- statutory (PL)
    ('PL', NULL, 'TECHNICAL_INSPECTION_IMPORT', 249, 'PLN', FALSE, FALSE, FALSE),
    ('PL', NULL, 'REG_TEMPORARY_PERMIT', 14, 'PLN', FALSE, FALSE, FALSE),
    ('PL', NULL, 'REG_TEMPORARY_PLATES', 30, 'PLN', FALSE, FALSE, FALSE),
    ('PL', NULL, 'REG_CERTIFICATE', 54.50, 'PLN', FALSE, FALSE, FALSE),
    ('PL', NULL, 'REG_PLATES', 80, 'PLN', FALSE, FALSE, FALSE),
    ('PL', NULL, 'REG_STICKER', 19, 'PLN', FALSE, FALSE, FALSE),
    -- selectable (PL)
    ('PL', 'USA', 'REAR_FOG_LIGHT', 450, 'PLN', TRUE, TRUE, TRUE),
    ('PL', 'CANADA', 'REAR_FOG_LIGHT', 450, 'PLN', TRUE, TRUE, TRUE),
    ('PL', 'USA', 'SPEEDOMETER_KMH', 600, 'PLN', TRUE, TRUE, FALSE),
    ('PL', 'UK', 'SPEEDOMETER_KMH', 600, 'PLN', TRUE, TRUE, FALSE),
    ('PL', NULL, 'SERVICE_INSPECTION', 1200, 'PLN', TRUE, TRUE, TRUE),
    ('PL', NULL, 'GEOMETRY_ALIGNMENT', 250, 'PLN', TRUE, TRUE, FALSE),
    ('PL', NULL, 'DETAILING', 700, 'PLN', TRUE, TRUE, FALSE),
    ('PL', NULL, 'EXPERT_VALUATION', 400, 'PLN', TRUE, TRUE, FALSE),
    -- selectable (DE)
    ('DE', NULL, 'SERVICE_INSPECTION', 350, 'EUR', TRUE, TRUE, TRUE),
    ('DE', NULL, 'GEOMETRY_ALIGNMENT', 90, 'EUR', TRUE, TRUE, FALSE);

-- ---------- risks on the way ----------
CREATE TABLE risk_factor (
    id                BIGSERIAL PRIMARY KEY,
    code              VARCHAR(48)    NOT NULL,
    origin_country    VARCHAR(16),
    vehicle_condition VARCHAR(16),
    title_type        VARCHAR(16),
    probability       NUMERIC(4, 3)  NOT NULL CHECK (probability BETWEEN 0 AND 1),
    basis             VARCHAR(16)    NOT NULL,
    amount_min        NUMERIC(12, 4) NOT NULL,
    amount_max        NUMERIC(12, 4) NOT NULL,
    days_min          INT,
    days_max          INT,
    currency          VARCHAR(3)
);
INSERT INTO risk_factor (code, origin_country, vehicle_condition, title_type, probability, basis, amount_min, amount_max, days_min, days_max, currency) VALUES
    ('PORT_STORAGE', NULL, NULL, NULL, 0.300, 'PER_DAY', 15, 35, 3, 10, 'EUR'),
    ('CUSTOMS_INSPECTION', NULL, NULL, NULL, 0.100, 'FIXED', 150, 400, NULL, NULL, 'EUR'),
    ('CUSTOMS_VALUE_CHALLENGE', NULL, NULL, NULL, 0.080, 'PCT_OF_BID', 0.005, 0.02, NULL, NULL, NULL),
    ('VESSEL_ROLLOVER', NULL, NULL, NULL, 0.100, 'FIXED', 50, 250, NULL, NULL, 'USD'),
    ('TRANSIT_DAMAGE_DEDUCTIBLE', NULL, NULL, NULL, 0.040, 'FIXED', 250, 1000, NULL, NULL, 'USD'),
    ('HIDDEN_DAMAGE', NULL, 'RUN_AND_DRIVE', NULL, 0.150, 'PCT_OF_BID', 0.01, 0.05, NULL, NULL, NULL),
    ('HIDDEN_DAMAGE', NULL, 'ENGINE_STARTS', NULL, 0.350, 'PCT_OF_BID', 0.05, 0.15, NULL, NULL, NULL),
    ('HIDDEN_DAMAGE', NULL, 'NON_RUNNING', NULL, 0.500, 'PCT_OF_BID', 0.08, 0.25, NULL, NULL, NULL),
    ('TITLE_DELAY', 'USA', NULL, NULL, 0.100, 'FIXED', 100, 400, NULL, NULL, 'USD'),
    ('TITLE_DELAY', 'CANADA', NULL, NULL, 0.100, 'FIXED', 120, 450, NULL, NULL, 'CAD'),
    ('EXPORT_DOCS_DELAY', 'JAPAN', NULL, NULL, 0.100, 'FIXED', 10000, 40000, NULL, NULL, 'JPY'),
    ('EXPORT_DOCS_DELAY', 'UAE', NULL, NULL, 0.100, 'FIXED', 300, 1200, NULL, NULL, 'AED');
