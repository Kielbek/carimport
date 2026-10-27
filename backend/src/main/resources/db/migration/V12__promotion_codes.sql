-- Stripe promotion codes: what the code took off and which code it was
ALTER TABLE report_order ADD COLUMN discount_minor BIGINT NOT NULL DEFAULT 0;
ALTER TABLE report_order ADD COLUMN promotion_code VARCHAR(64);
