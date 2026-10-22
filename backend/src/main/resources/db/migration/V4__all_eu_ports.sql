-- =====================================================================================================================
-- All EU sea ports that clear imported vehicles (RoRo terminals and container ports with car devanning), with
-- coordinates for the door-distance calculation. Landlocked AT, CZ, HU, LU and SK clear through these ports.
-- =====================================================================================================================

ALTER TABLE eu_port ADD COLUMN latitude DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE eu_port ADD COLUMN longitude DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE eu_port ADD COLUMN region VARCHAR(16) NOT NULL DEFAULT 'NORTH_SEA';
ALTER TABLE eu_port ALTER COLUMN name TYPE VARCHAR(80);

UPDATE eu_port SET latitude = 53.5520, longitude = 8.5780 WHERE code = 'DEBRV';
UPDATE eu_port SET latitude = 53.5390, longitude = 9.9700 WHERE code = 'DEHAM';
UPDATE eu_port SET latitude = 51.9500, longitude = 4.1400 WHERE code = 'NLRTM';
UPDATE eu_port SET latitude = 51.2800, longitude = 4.3300 WHERE code = 'BEANR';
UPDATE eu_port SET latitude = 54.5330, longitude = 18.5500, region = 'BALTIC' WHERE code = 'PLGDY';

INSERT INTO eu_port (code, name, country_code, unloading_fee, customs_agency_fee, fee_currency, supports_procedure4200,
                     latitude, longitude, region) VALUES
    -- North Sea / Channel / Atlantic
    ('DEEMD', 'Emden', 'DE', 430, 250, 'EUR', TRUE, 53.3470, 7.1900, 'NORTH_SEA'),
    ('NLVLI', 'Vlissingen', 'NL', 410, 275, 'EUR', TRUE, 51.4430, 3.6000, 'NORTH_SEA'),
    ('NLAMS', 'Amsterdam', 'NL', 430, 275, 'EUR', TRUE, 52.4100, 4.8000, 'NORTH_SEA'),
    ('BEZEE', 'Zeebrugge', 'BE', 390, 250, 'EUR', TRUE, 51.3300, 3.2000, 'NORTH_SEA'),
    ('FRLEH', 'Le Havre', 'FR', 450, 290, 'EUR', TRUE, 49.4800, 0.1100, 'NORTH_SEA'),
    ('FRMTX', 'Saint-Nazaire (Montoir)', 'FR', 460, 290, 'EUR', TRUE, 47.3000, -2.1500, 'ATLANTIC'),
    ('IEDUB', 'Dublin', 'IE', 520, 320, 'EUR', TRUE, 53.3480, -6.2100, 'ATLANTIC'),
    ('ESBIO', 'Bilbao', 'ES', 420, 260, 'EUR', TRUE, 43.3500, -3.0400, 'ATLANTIC'),
    ('PTLEI', 'Leixões (Porto)', 'PT', 430, 260, 'EUR', TRUE, 41.1800, -8.7000, 'ATLANTIC'),
    ('PTLIS', 'Lisboa', 'PT', 440, 260, 'EUR', TRUE, 38.7000, -9.1200, 'ATLANTIC'),
    -- Baltic / Scandinavia
    ('PLGDN', 'Gdańsk', 'PL', 1250, 800, 'PLN', TRUE, 54.4000, 18.6700, 'BALTIC'),
    ('PLSZZ', 'Szczecin / Świnoujście', 'PL', 1250, 800, 'PLN', TRUE, 53.4300, 14.5700, 'BALTIC'),
    ('LTKLJ', 'Klaipėda', 'LT', 400, 250, 'EUR', TRUE, 55.7100, 21.1200, 'BALTIC'),
    ('LVRIX', 'Rīga', 'LV', 420, 260, 'EUR', TRUE, 56.9800, 24.0800, 'BALTIC'),
    ('EETLL', 'Tallinn (Muuga)', 'EE', 430, 260, 'EUR', TRUE, 59.5000, 24.9500, 'BALTIC'),
    ('FIHKO', 'Hanko', 'FI', 460, 290, 'EUR', TRUE, 59.8200, 22.9600, 'BALTIC'),
    ('FIHEL', 'Helsinki (Vuosaari)', 'FI', 480, 290, 'EUR', TRUE, 60.2100, 25.1900, 'BALTIC'),
    ('SEGOT', 'Göteborg', 'SE', 470, 300, 'EUR', TRUE, 57.6900, 11.8600, 'BALTIC'),
    ('SEMMA', 'Malmö', 'SE', 470, 300, 'EUR', TRUE, 55.6200, 12.9800, 'BALTIC'),
    ('DKAAR', 'Aarhus', 'DK', 460, 300, 'EUR', TRUE, 56.1500, 10.2300, 'BALTIC'),
    ('DKCPH', 'København', 'DK', 480, 300, 'EUR', TRUE, 55.7000, 12.6100, 'BALTIC'),
    -- Western Mediterranean
    ('ESALG', 'Algeciras', 'ES', 400, 260, 'EUR', TRUE, 36.1300, -5.4300, 'WEST_MED'),
    ('ESVLC', 'Valencia', 'ES', 390, 260, 'EUR', TRUE, 39.4400, -0.3200, 'WEST_MED'),
    ('ESBCN', 'Barcelona', 'ES', 410, 260, 'EUR', TRUE, 41.3500, 2.1600, 'WEST_MED'),
    ('FRFOS', 'Marseille-Fos', 'FR', 450, 290, 'EUR', TRUE, 43.4200, 4.8700, 'WEST_MED'),
    ('ITGOA', 'Genova', 'IT', 440, 280, 'EUR', TRUE, 44.4000, 8.9000, 'WEST_MED'),
    ('ITSPE', 'La Spezia', 'IT', 430, 280, 'EUR', TRUE, 44.1000, 9.8400, 'WEST_MED'),
    ('ITLIV', 'Livorno', 'IT', 420, 280, 'EUR', TRUE, 43.5600, 10.3000, 'WEST_MED'),
    ('ITGIT', 'Gioia Tauro', 'IT', 410, 280, 'EUR', TRUE, 38.4500, 15.9000, 'WEST_MED'),
    ('MTMAR', 'Marsaxlokk', 'MT', 480, 300, 'EUR', TRUE, 35.8300, 14.5400, 'WEST_MED'),
    -- Adriatic / Eastern Mediterranean / Black Sea
    ('ITTRS', 'Trieste', 'IT', 420, 280, 'EUR', TRUE, 45.6200, 13.7600, 'EAST_MED'),
    ('SIKOP', 'Koper', 'SI', 390, 250, 'EUR', TRUE, 45.5500, 13.7300, 'EAST_MED'),
    ('HRRJK', 'Rijeka', 'HR', 400, 250, 'EUR', TRUE, 45.3300, 14.4300, 'EAST_MED'),
    ('GRPIR', 'Piraeus', 'GR', 420, 270, 'EUR', TRUE, 37.9400, 23.6200, 'EAST_MED'),
    ('GRSKG', 'Thessaloniki', 'GR', 420, 270, 'EUR', TRUE, 40.6300, 22.9200, 'EAST_MED'),
    ('CYLMS', 'Limassol', 'CY', 450, 280, 'EUR', TRUE, 34.6500, 33.0200, 'EAST_MED'),
    ('ROCND', 'Constanța', 'RO', 380, 240, 'EUR', TRUE, 44.1600, 28.6500, 'EAST_MED'),
    ('BGVAR', 'Varna', 'BG', 380, 240, 'EUR', TRUE, 43.2000, 27.9100, 'EAST_MED');

ALTER TABLE eu_port ALTER COLUMN latitude DROP DEFAULT;
ALTER TABLE eu_port ALTER COLUMN longitude DROP DEFAULT;
ALTER TABLE eu_port ALTER COLUMN region DROP DEFAULT;

-- ---------------------------------------------------------------------------------------------------------------------
-- Ocean freight to the new ports, derived from the Rotterdam lane of the same departure port:
--   price x factor, transit + delta days. Atlantic departures (USA, Canada, UK) get cheaper the closer the port is to
--   the North Sea range; Asian and Gulf departures (Japan, UAE) come through Suez, so the Mediterranean is cheaper and
--   faster for them. Baltic ports are served by feeder (transhipment) and cost more for everyone.
-- ---------------------------------------------------------------------------------------------------------------------
CREATE TEMPORARY TABLE port_lane_factor (
    eu_port_code VARCHAR(5) PRIMARY KEY,
    atlantic_factor NUMERIC(4, 3), atlantic_days INT,
    suez_factor NUMERIC(4, 3), suez_days INT
);
INSERT INTO port_lane_factor VALUES
    ('DEHAM', 1.040, 1, 1.000, 1), ('BEANR', 1.000, 0, 1.000, 0),
    ('DEEMD', 1.020, 1, 1.010, 1), ('NLVLI', 1.000, 0, 1.000, 0), ('NLAMS', 1.030, 1, 1.020, 1),
    ('BEZEE', 0.990, 0, 1.000, 0), ('FRLEH', 1.000, -1, 0.990, -1), ('FRMTX', 1.050, 0, 1.020, -1),
    ('IEDUB', 1.080, 1, 1.120, 3), ('ESBIO', 1.060, 0, 1.000, -3), ('PTLEI', 1.050, -1, 0.990, -4),
    ('PTLIS', 1.040, -2, 0.970, -5),
    ('PLGDN', 1.000, 0, 1.000, 0), ('PLSZZ', 1.120, 5, 1.120, 5), ('LTKLJ', 1.160, 6, 1.150, 6),
    ('LVRIX', 1.180, 7, 1.170, 7), ('EETLL', 1.200, 8, 1.190, 8), ('FIHKO', 1.180, 7, 1.180, 7),
    ('FIHEL', 1.220, 8, 1.200, 8), ('SEGOT', 1.100, 4, 1.100, 4), ('SEMMA', 1.130, 5, 1.120, 5),
    ('DKAAR', 1.100, 4, 1.090, 4), ('DKCPH', 1.120, 4, 1.100, 4),
    ('ESALG', 1.020, -2, 0.860, -10), ('ESVLC', 1.050, 0, 0.850, -9), ('ESBCN', 1.080, 1, 0.860, -8),
    ('FRFOS', 1.100, 2, 0.870, -8), ('ITGOA', 1.120, 3, 0.860, -8), ('ITSPE', 1.120, 3, 0.860, -8),
    ('ITLIV', 1.140, 3, 0.870, -8), ('ITGIT', 1.100, 2, 0.820, -10), ('MTMAR', 1.150, 3, 0.850, -10),
    ('ITTRS', 1.200, 5, 0.870, -7), ('SIKOP', 1.180, 5, 0.860, -7), ('HRRJK', 1.200, 5, 0.880, -7),
    ('GRPIR', 1.180, 4, 0.800, -12), ('GRSKG', 1.220, 5, 0.840, -10), ('CYLMS', 1.250, 6, 0.800, -13),
    ('ROCND', 1.250, 7, 0.870, -9), ('BGVAR', 1.270, 7, 0.890, -9);

INSERT INTO ocean_freight_rate (departure_port, eu_port_code, method, size_class, price_min, price_max, currency,
                                transit_days)
SELECT o.departure_port, f.eu_port_code, o.method, o.size_class,
       ROUND(o.price_min * CASE WHEN o.departure_port IN ('JPYOK', 'AEJEA') THEN f.suez_factor ELSE f.atlantic_factor END / 5) * 5,
       ROUND(o.price_max * CASE WHEN o.departure_port IN ('JPYOK', 'AEJEA') THEN f.suez_factor ELSE f.atlantic_factor END / 5) * 5,
       o.currency,
       GREATEST(5, o.transit_days + CASE WHEN o.departure_port IN ('JPYOK', 'AEJEA') THEN f.suez_days ELSE f.atlantic_days END)
FROM ocean_freight_rate o
         JOIN port_lane_factor f ON TRUE
WHERE o.eu_port_code = CASE WHEN f.eu_port_code = 'PLGDN' THEN 'PLGDY' ELSE 'NLRTM' END
ON CONFLICT (departure_port, eu_port_code, method, size_class) DO NOTHING;

DROP TABLE port_lane_factor;
