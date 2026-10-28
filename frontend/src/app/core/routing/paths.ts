import { Lang } from '../i18n/language.service';

export type Page = 'home' | 'calculator' | 'about' | 'privacy' | 'terms' | 'taxes' | 'method' | 'glossary' | 'contact' | 'vin' | 'vinCompare' | 'copart';

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
  /** VIN decoder and vehicle history check. */
  vin: {
    bg: 'proverka-vin', cs: 'kontrola-vin', da: 'vin-tjek', de: 'vin-abfrage', el: 'elegchos-vin', en: 'vin-check',
    es: 'comprobar-vin', et: 'vin-kontroll', fi: 'vin-tarkistus', fr: 'verifier-vin', hr: 'provjera-vin',
    hu: 'alvazszam-ellenorzes', it: 'controllo-vin', lt: 'vin-patikra', lv: 'vin-parbaude', nl: 'vin-check',
    pl: 'sprawdz-vin', pt: 'verificar-vin', ro: 'verificare-vin', sk: 'kontrola-vin', sl: 'preverjanje-vin',
    sv: 'vin-kontroll', uk: 'perevirka-vin',
  },
  /** Vehicle history report providers compared. */
  vinCompare: {
    bg: 'sravnenie-vin-dokladi', cs: 'srovnani-vin-reportu', da: 'vin-rapporter-sammenligning', de: 'fahrzeughistorie-vergleich',
    el: 'sygkrisi-anaforon-vin', en: 'vin-report-comparison', es: 'comparativa-informes-vin', et: 'vin-raportide-vordlus',
    fi: 'vin-raporttien-vertailu', fr: 'comparatif-rapports-vin', hr: 'usporedba-vin-izvjestaja', hu: 'alvazszam-jelentesek-osszehasonlitasa',
    it: 'confronto-report-vin', lt: 'vin-ataskaitu-palyginimas', lv: 'vin-atskaisu-salidzinajums', nl: 'vin-rapporten-vergelijken',
    pl: 'raporty-vin-porownanie', pt: 'comparacao-relatorios-vin', ro: 'comparatie-rapoarte-vin', sk: 'porovnanie-vin-reportov',
    sl: 'primerjava-vin-porocil', sv: 'vin-rapporter-jamforelse', uk: 'porivniannia-zvitiv-vin',
  },
  /** Buying at Copart from Europe. */
  copart: {
    bg: 'copart', cs: 'copart', da: 'copart', de: 'copart', el: 'copart', en: 'copart', es: 'copart', et: 'copart',
    fi: 'copart', fr: 'copart', hr: 'copart', hu: 'copart', it: 'copart', lt: 'copart', lv: 'copart', nl: 'copart',
    pl: 'copart', pt: 'copart', ro: 'copart', sk: 'copart', sl: 'copart', sv: 'copart', uk: 'copart',
  },
};

/** Absolute in-app path of a page in a given language, e.g. pathFor('calculator', 'de') -> '/de/rechner'. */
export function pathFor(page: Page, lang: Lang): string {
  return page === 'home' ? `/${lang}` : `/${lang}/${SLUGS[page][lang]}`;
}
