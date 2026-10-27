-- Reduced import VAT on collectors' items (CN 9705) that changed or was missing: Italy 5 % since 1 July 2025
-- (DL 95/2025), Malta 5 %, Sweden 12 %.
UPDATE eu_country_tax_profile SET collector_vat_rate = 0.05 WHERE country_code = 'IT';
UPDATE eu_country_tax_profile SET collector_vat_rate = 0.05 WHERE country_code = 'MT';
UPDATE eu_country_tax_profile SET collector_vat_rate = 0.12 WHERE country_code = 'SE';
