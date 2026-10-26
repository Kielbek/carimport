-- Goods vehicles <= 5 t (CN 8704 21 / 8704 31): 22 % only above 2 500 cm3 (diesel) or 2 800 cm3 (spark ignition),
-- 10 % up to these capacities (8704 21 91/99, 8704 31 91/99).
ALTER TABLE customs_tariff ADD COLUMN diesel_only BOOLEAN;

DELETE FROM customs_tariff WHERE vehicle_category = 'PICKUP_TRUCK' AND electric_only IS NULL;
INSERT INTO customs_tariff (vehicle_category, historic, electric_only, diesel_only, cc_from, cc_to, hs_code, duty_rate, description) VALUES
    ('PICKUP_TRUCK', FALSE, NULL, TRUE,  0,    2500, '870421', 0.10, 'Pickup / light truck <= 5 t GVW, diesel <= 2500 cm3'),
    ('PICKUP_TRUCK', FALSE, NULL, TRUE,  2501, NULL, '870421', 0.22, 'Pickup / light truck <= 5 t GVW, diesel > 2500 cm3'),
    ('PICKUP_TRUCK', FALSE, NULL, FALSE, 0,    2800, '870431', 0.10, 'Pickup / light truck <= 5 t GVW, petrol <= 2800 cm3'),
    ('PICKUP_TRUCK', FALSE, NULL, FALSE, 2801, NULL, '870431', 0.22, 'Pickup / light truck <= 5 t GVW, petrol > 2800 cm3');
