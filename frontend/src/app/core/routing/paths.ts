import { Lang } from '../i18n/language.service';

export type Page = 'home' | 'calculator' | 'about' | 'privacy';

/** Localized URL slugs - "/pl/kalkulator" ranks for Polish queries far better than "/pl/calculator". */
export const SLUGS: Record<Exclude<Page, 'home'>, Record<Lang, string>> = {
  calculator: {
    bg: 'kalkulator', cs: 'kalkulacka', da: 'beregner', de: 'rechner', el: 'ypologistis', en: 'calculator',
    es: 'calculadora', et: 'kalkulaator', fi: 'laskuri', fr: 'calculateur', hr: 'kalkulator', hu: 'kalkulator',
    it: 'calcolatore', lt: 'skaiciuokle', lv: 'kalkulators', nl: 'calculator', pl: 'kalkulator', pt: 'calculadora',
    ro: 'calculator', sk: 'kalkulacka', sl: 'kalkulator', sv: 'kalkylator', uk: 'kalkuliator',
  },
  about: {
    bg: 'za-nas', cs: 'o-nas', da: 'om-os', de: 'ueber-uns', el: 'schetika', en: 'about', es: 'sobre-nosotros',
    et: 'meist', fi: 'meista', fr: 'a-propos', hr: 'o-nama', hu: 'rolunk', it: 'chi-siamo', lt: 'apie-mus',
    lv: 'par-mums', nl: 'over-ons', pl: 'o-nas', pt: 'sobre-nos', ro: 'despre-noi', sk: 'o-nas', sl: 'o-nas',
    sv: 'om-oss', uk: 'pro-nas',
  },
  privacy: {
    bg: 'poveritelnost', cs: 'ochrana-osobnich-udaju', da: 'privatlivspolitik', de: 'datenschutz', el: 'aporrito',
    en: 'privacy-policy', es: 'privacidad', et: 'privaatsus', fi: 'tietosuoja', fr: 'confidentialite',
    hr: 'privatnost', hu: 'adatvedelem', it: 'privacy', lt: 'privatumas', lv: 'privatums', nl: 'privacy',
    pl: 'polityka-prywatnosci', pt: 'privacidade', ro: 'confidentialitate', sk: 'ochrana-sukromia', sl: 'zasebnost',
    sv: 'integritet', uk: 'polityka-konfidentsiinosti',
  },
};

/** Absolute in-app path of a page in a given language, e.g. pathFor('calculator', 'de') -> '/de/rechner'. */
export function pathFor(page: Page, lang: Lang): string {
  return page === 'home' ? `/${lang}` : `/${lang}/${SLUGS[page][lang]}`;
}
