-- Refunds (full or partial, from the admin panel or straight in the Stripe dashboard): the refunded total as
-- Stripe reports it, when, and why. A full refund also sets status REFUNDED and revokes access to the report.
ALTER TABLE report_order ADD COLUMN refunded_minor BIGINT NOT NULL DEFAULT 0;
ALTER TABLE report_order ADD COLUMN refunded_at TIMESTAMPTZ;
ALTER TABLE report_order ADD COLUMN refund_reason VARCHAR(200);
