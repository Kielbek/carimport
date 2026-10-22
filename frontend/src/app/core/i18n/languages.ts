/**
 * Every language the site is published in: the official language of each EU member state (Ireland and Malta are
 * served by English, an official language there) plus Ukrainian for the large Ukrainian community in the EU.
 * The language also picks the calculator's starting point: destination country and result currency.
 */
export interface LanguageInfo {
  /** ISO 639-1, used as the URL prefix: /pl, /de, ... */
  code: string;
  /** Short label for the switcher (country-style where users expect it, e.g. UA). */
  label: string;
  /** Name in the language itself. */
  native: string;
  /** BCP 47 locale for Intl number/date formatting. */
  locale: string;
  /** Open Graph locale. */
  og: string;
  /** Default destination country (ISO 3166-1). */
  country: string;
  /** Default result currency. */
  currency: string;
}

export const LANGUAGES = [
  { code: 'bg', label: 'BG', native: 'Български', locale: 'bg-BG', og: 'bg_BG', country: 'BG', currency: 'EUR' },
  { code: 'cs', label: 'CS', native: 'Čeština', locale: 'cs-CZ', og: 'cs_CZ', country: 'CZ', currency: 'CZK' },
  { code: 'da', label: 'DA', native: 'Dansk', locale: 'da-DK', og: 'da_DK', country: 'DK', currency: 'DKK' },
  { code: 'de', label: 'DE', native: 'Deutsch', locale: 'de-DE', og: 'de_DE', country: 'DE', currency: 'EUR' },
  { code: 'el', label: 'EL', native: 'Ελληνικά', locale: 'el-GR', og: 'el_GR', country: 'GR', currency: 'EUR' },
  { code: 'en', label: 'EN', native: 'English', locale: 'en-GB', og: 'en_GB', country: 'DE', currency: 'EUR' },
  { code: 'es', label: 'ES', native: 'Español', locale: 'es-ES', og: 'es_ES', country: 'ES', currency: 'EUR' },
  { code: 'et', label: 'ET', native: 'Eesti', locale: 'et-EE', og: 'et_EE', country: 'EE', currency: 'EUR' },
  { code: 'fi', label: 'FI', native: 'Suomi', locale: 'fi-FI', og: 'fi_FI', country: 'FI', currency: 'EUR' },
  { code: 'fr', label: 'FR', native: 'Français', locale: 'fr-FR', og: 'fr_FR', country: 'FR', currency: 'EUR' },
  { code: 'hr', label: 'HR', native: 'Hrvatski', locale: 'hr-HR', og: 'hr_HR', country: 'HR', currency: 'EUR' },
  { code: 'hu', label: 'HU', native: 'Magyar', locale: 'hu-HU', og: 'hu_HU', country: 'HU', currency: 'HUF' },
  { code: 'it', label: 'IT', native: 'Italiano', locale: 'it-IT', og: 'it_IT', country: 'IT', currency: 'EUR' },
  { code: 'lt', label: 'LT', native: 'Lietuvių', locale: 'lt-LT', og: 'lt_LT', country: 'LT', currency: 'EUR' },
  { code: 'lv', label: 'LV', native: 'Latviešu', locale: 'lv-LV', og: 'lv_LV', country: 'LV', currency: 'EUR' },
  { code: 'nl', label: 'NL', native: 'Nederlands', locale: 'nl-NL', og: 'nl_NL', country: 'NL', currency: 'EUR' },
  { code: 'pl', label: 'PL', native: 'Polski', locale: 'pl-PL', og: 'pl_PL', country: 'PL', currency: 'PLN' },
  { code: 'pt', label: 'PT', native: 'Português', locale: 'pt-PT', og: 'pt_PT', country: 'PT', currency: 'EUR' },
  { code: 'ro', label: 'RO', native: 'Română', locale: 'ro-RO', og: 'ro_RO', country: 'RO', currency: 'RON' },
  { code: 'sk', label: 'SK', native: 'Slovenčina', locale: 'sk-SK', og: 'sk_SK', country: 'SK', currency: 'EUR' },
  { code: 'sl', label: 'SL', native: 'Slovenščina', locale: 'sl-SI', og: 'sl_SI', country: 'SI', currency: 'EUR' },
  { code: 'sv', label: 'SV', native: 'Svenska', locale: 'sv-SE', og: 'sv_SE', country: 'SE', currency: 'SEK' },
  { code: 'uk', label: 'UA', native: 'Українська', locale: 'uk-UA', og: 'uk_UA', country: 'PL', currency: 'PLN' },
] as const satisfies readonly LanguageInfo[];

export type Lang = (typeof LANGUAGES)[number]['code'];

export const SUPPORTED_LANGS: readonly Lang[] = LANGUAGES.map((l) => l.code);

export const LANGUAGE_BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l])) as Record<Lang, LanguageInfo>;
