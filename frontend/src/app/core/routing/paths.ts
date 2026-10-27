import { Lang } from '../i18n/language.service';

export type Page = 'home' | 'calculator' | 'about' | 'privacy' | 'terms' | 'taxes' | 'method' | 'glossary' | 'contact';

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
  terms: {
    bg: 'obshti-usloviya', cs: 'obchodni-podminky', da: 'handelsbetingelser', de: 'agb', el: 'oroi-xrisis',
    en: 'terms', es: 'condiciones', et: 'tingimused', fi: 'kayttoehdot', fr: 'cgv', hr: 'uvjeti', hu: 'aszf',
    it: 'termini', lt: 'taisykles', lv: 'noteikumi', nl: 'voorwaarden', pl: 'regulamin', pt: 'termos',
    ro: 'termeni', sk: 'obchodne-podmienky', sl: 'pogoji', sv: 'villkor', uk: 'umovy',
  },
  /** Customs duty, VAT and national tax calculator. */
  taxes: {
    bg: 'kalkulator-mito-dds', cs: 'kalkulacka-cla', da: 'told-beregner', de: 'zollrechner', el: 'ypologismos-dasmon',
    en: 'import-tax-calculator', es: 'calculadora-aranceles', et: 'tollimaksu-kalkulaator', fi: 'tullilaskuri',
    fr: 'calcul-droits-douane', hr: 'kalkulator-carine', hu: 'vamkalkulator', it: 'calcolo-dazi',
    lt: 'muito-skaiciuokle', lv: 'muitas-kalkulators', nl: 'invoerrechten-berekenen', pl: 'kalkulator-cla-i-akcyzy',
    pt: 'calculadora-impostos-importacao', ro: 'calculator-taxe-import', sk: 'kalkulacka-cla',
    sl: 'kalkulator-carine', sv: 'tullkalkylator', uk: 'kalkuliator-myta',
  },
  /** How we calculate: sources, assumptions, limits. */
  method: {
    bg: 'metodologiya', cs: 'jak-pocitame', da: 'saadan-beregner-vi', de: 'methodik', el: 'methodologia',
    en: 'methodology', es: 'metodologia', et: 'metoodika', fi: 'menetelma', fr: 'methodologie', hr: 'metodologija',
    hu: 'modszertan', it: 'metodologia', lt: 'metodika', lv: 'metodologija', nl: 'methodologie', pl: 'jak-liczymy',
    pt: 'metodologia', ro: 'metodologie', sk: 'ako-pocitame', sl: 'metodologija', sv: 'metod', uk: 'metodolohiia',
  },
  /** Import terms explained: CIF, TARIC, titles, VAT, procedure 4200, ... */
  glossary: {
    bg: 'rechnik', cs: 'slovnik', da: 'ordliste', de: 'glossar', el: 'glossari', en: 'glossary', es: 'glosario',
    et: 'sonastik', fi: 'sanasto', fr: 'glossaire', hr: 'pojmovnik', hu: 'fogalomtar', it: 'glossario', lt: 'zodynas',
    lv: 'vardnica', nl: 'woordenlijst', pl: 'slownik', pt: 'glossario', ro: 'glosar', sk: 'slovnik', sl: 'slovar',
    sv: 'ordlista', uk: 'slovnyk',
  },
  /** Contact form. */
  contact: {
    bg: 'kontakti', cs: 'kontakt', da: 'kontakt', de: 'kontakt', el: 'epikoinonia', en: 'contact', es: 'contacto',
    et: 'kontakt', fi: 'yhteystiedot', fr: 'contact', hr: 'kontakt', hu: 'kapcsolat', it: 'contatti', lt: 'kontaktai',
    lv: 'kontakti', nl: 'contact', pl: 'kontakt', pt: 'contacto', ro: 'contact', sk: 'kontakt', sl: 'kontakt',
    sv: 'kontakt', uk: 'kontakty',
  },
};

/** Absolute in-app path of a page in a given language, e.g. pathFor('calculator', 'de') -> '/de/rechner'. */
export function pathFor(page: Page, lang: Lang): string {
  return page === 'home' ? `/${lang}` : `/${lang}/${SLUGS[page][lang]}`;
}
