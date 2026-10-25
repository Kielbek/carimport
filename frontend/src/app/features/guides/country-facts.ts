/**
 * What a buyer meets after customs in each EU country, by its local (official) name - these are proper nouns, shown
 * untranslated in every language, so a reader can search for them. Only names, never rates: national registration
 * taxes change often and the calculator prices them where supported.
 */
export interface CountryFacts {
  /** One-off tax or fee at first registration, if the country has one. */
  registrationTax: string | null;
  /** Authority that registers the car. */
  authority: string;
  /** Roadworthiness / conformity inspection before registration. */
  inspection: string;
  /** Deadline to register an imported car, in days, where the law sets one. */
  deadlineDays: number | null;
}

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  AT: { registrationTax: 'NoVA (Normverbrauchsabgabe)', authority: 'Zulassungsstelle', inspection: 'Einzelgenehmigung / §57a-Begutachtung', deadlineDays: 30 },
  BE: { registrationTax: 'BIV / TMC (belasting op inverkeerstelling)', authority: 'DIV', inspection: 'Keuring / contrôle technique', deadlineDays: null },
  BG: { registrationTax: null, authority: 'КАТ – Пътна полиция', inspection: 'Годишен технически преглед', deadlineDays: 14 },
  HR: { registrationTax: 'PPMV (posebni porez na motorna vozila)', authority: 'MUP – registracija vozila', inspection: 'CVH – tehnički pregled', deadlineDays: null },
  CY: { registrationTax: 'Registration tax (CO₂-based)', authority: 'Τμήμα Οδικών Μεταφορών', inspection: 'ΜΟΤ / technical inspection', deadlineDays: null },
  CZ: { registrationTax: null, authority: 'Registr vozidel (obecní úřad ORP)', inspection: 'STK – evidenční kontrola', deadlineDays: null },
  DK: { registrationTax: 'Registreringsafgift', authority: 'Motorstyrelsen', inspection: 'Syn (registreringssyn)', deadlineDays: null },
  EE: { registrationTax: 'Registreerimistasu', authority: 'Transpordiamet', inspection: 'Registreerimiseelne ülevaatus', deadlineDays: null },
  FI: { registrationTax: 'Autovero', authority: 'Traficom / Vero', inspection: 'Rekisteröintikatsastus', deadlineDays: null },
  FR: { registrationTax: 'Taxe régionale + malus écologique', authority: 'ANTS (certificat d’immatriculation)', inspection: 'Réception à titre isolé (DREAL) / contrôle technique', deadlineDays: 30 },
  DE: { registrationTax: null, authority: 'Zulassungsstelle', inspection: 'HU / Vollgutachten §21 StVZO (TÜV, DEKRA)', deadlineDays: null },
  GR: { registrationTax: 'Τέλος ταξινόμησης', authority: 'Τελωνείο / Υπουργείο Μεταφορών', inspection: 'ΚΤΕΟ', deadlineDays: null },
  HU: { registrationTax: 'Regisztrációs adó', authority: 'Kormányablak / NAV', inspection: 'Forgalomba helyezés előtti vizsgálat', deadlineDays: null },
  IE: { registrationTax: 'VRT (Vehicle Registration Tax)', authority: 'Revenue / NCTS', inspection: 'VRT inspection, NCT', deadlineDays: 30 },
  IT: { registrationTax: 'IPT (imposta provinciale di trascrizione)', authority: 'Motorizzazione Civile / PRA', inspection: 'Revisione / omologazione', deadlineDays: 60 },
  LV: { registrationTax: null, authority: 'CSDD', inspection: 'Tehniskā apskate', deadlineDays: null },
  LT: { registrationTax: 'Registracijos mokestis', authority: 'Regitra', inspection: 'Techninė apžiūra', deadlineDays: null },
  LU: { registrationTax: null, authority: 'SNCA', inspection: 'Contrôle technique SNCA', deadlineDays: null },
  MT: { registrationTax: 'Registration tax', authority: 'Transport Malta', inspection: 'VRT (Vehicle Roadworthiness Test)', deadlineDays: null },
  NL: { registrationTax: 'BPM (belasting van personenauto’s en motorrijwielen)', authority: 'RDW', inspection: 'RDW-keuring (import)', deadlineDays: null },
  PL: { registrationTax: 'Akcyza (AKC-U/S)', authority: 'Wydział komunikacji', inspection: 'Badanie techniczne pojazdu sprowadzonego', deadlineDays: 30 },
  PT: { registrationTax: 'ISV (Imposto sobre Veículos)', authority: 'IMT', inspection: 'Inspeção tipo B', deadlineDays: 20 },
  RO: { registrationTax: null, authority: 'DRPCIV', inspection: 'RAR – omologare individuală', deadlineDays: 90 },
  SK: { registrationTax: 'Registračný poplatok', authority: 'Dopravný inšpektorát', inspection: 'Kontrola originality + STK', deadlineDays: 30 },
  SI: { registrationTax: 'DMV (davek na motorna vozila)', authority: 'Upravna enota', inspection: 'Tehnični pregled / ugotavljanje skladnosti', deadlineDays: null },
  ES: { registrationTax: 'Impuesto especial sobre determinados medios de transporte (IEDMT)', authority: 'DGT', inspection: 'ITV (homologación)', deadlineDays: 30 },
  SE: { registrationTax: null, authority: 'Transportstyrelsen', inspection: 'Registreringsbesiktning', deadlineDays: null },
};
