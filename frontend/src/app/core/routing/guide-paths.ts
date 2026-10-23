import { COUNTRY_SLUGS, GUIDE_PORTS, GuideOrigin, ORIGIN_SLUGS } from '../../features/guides/guide-data.generated';
import { Lang, SUPPORTED_LANGS } from '../i18n/languages';

export type GuideSection = 'origins' | 'countries' | 'ports';

/**
 * Localized section slugs of the SEO guides, per language:
 *   /pl/import-auta/stany-zjednoczone, /pl/kraje-ue/niemcy, /pl/porty/bremerhaven
 */
export const GUIDE_SECTIONS: Record<Lang, Record<GuideSection, string>> = {
  bg: { origins: 'vnos-na-kola', countries: 'strani-es', ports: 'pristanishta' },
  cs: { origins: 'dovoz-auta', countries: 'zeme-eu', ports: 'pristavy' },
  da: { origins: 'bilimport', countries: 'eu-lande', ports: 'havne' },
  de: { origins: 'auto-import', countries: 'eu-laender', ports: 'haefen' },
  el: { origins: 'eisagogi-autokinitou', countries: 'chores-ee', ports: 'limania' },
  en: { origins: 'car-import', countries: 'eu-countries', ports: 'ports' },
  es: { origins: 'importar-coche', countries: 'paises-ue', ports: 'puertos' },
  et: { origins: 'auto-import', countries: 'el-riigid', ports: 'sadamad' },
  fi: { origins: 'auton-tuonti', countries: 'eu-maat', ports: 'satamat' },
  fr: { origins: 'importer-voiture', countries: 'pays-ue', ports: 'ports' },
  hr: { origins: 'uvoz-automobila', countries: 'zemlje-eu', ports: 'luke' },
  hu: { origins: 'auto-import', countries: 'eu-orszagok', ports: 'kikotok' },
  it: { origins: 'importare-auto', countries: 'paesi-ue', ports: 'porti' },
  lt: { origins: 'automobilio-importas', countries: 'es-salys', ports: 'uostai' },
  lv: { origins: 'auto-imports', countries: 'es-valstis', ports: 'ostas' },
  nl: { origins: 'auto-importeren', countries: 'eu-landen', ports: 'havens' },
  pl: { origins: 'import-auta', countries: 'kraje-ue', ports: 'porty' },
  pt: { origins: 'importar-carro', countries: 'paises-ue', ports: 'portos' },
  ro: { origins: 'import-auto', countries: 'tari-ue', ports: 'porturi' },
  sk: { origins: 'dovoz-auta', countries: 'krajiny-eu', ports: 'pristavy' },
  sl: { origins: 'uvoz-avtomobila', countries: 'drzave-eu', ports: 'pristanisca' },
  sv: { origins: 'importera-bil', countries: 'eu-lander', ports: 'hamnar' },
  uk: { origins: 'import-avto', countries: 'krainy-yes', ports: 'porty' },
};

export interface GuideRef {
  section: GuideSection;
  /** Origin (USA, ...), country code (DE, ...) or port code (DEBRV, ...); null = the section's hub page. */
  item: string | null;
}

/** Path of a guide in a language, e.g. ({ section: 'ports', item: 'DEBRV' }, 'de') -> /de/haefen/bremerhaven. */
export function guidePath(ref: GuideRef, lang: Lang): string {
  const base = `/${lang}/${GUIDE_SECTIONS[lang][ref.section]}`;
  return ref.item ? `${base}/${itemSlug(ref.section, ref.item, lang)}` : base;
}

export function itemSlug(section: GuideSection, item: string, lang: Lang): string {
  switch (section) {
    case 'origins':
      return ORIGIN_SLUGS[lang][item as GuideOrigin];
    case 'countries':
      return COUNTRY_SLUGS[lang][item];
    case 'ports':
      return GUIDE_PORTS.find((p) => p.code === item)!.slug;
  }
}

/** Reverse lookup of a URL: which guide is /{lang}/{section}/{slug}? null if none. */
export function resolveGuide(lang: Lang, sectionSlug: string, slug: string | null): GuideRef | null {
  const section = (Object.keys(GUIDE_SECTIONS[lang]) as GuideSection[]).find(
    (s) => GUIDE_SECTIONS[lang][s] === sectionSlug,
  );
  if (!section) {
    return null;
  }
  if (!slug) {
    return { section, item: null };
  }
  const item = itemsOf(section).find((i) => itemSlug(section, i, lang) === slug);
  return item ? { section, item } : null;
}

export function itemsOf(section: GuideSection): string[] {
  switch (section) {
    case 'origins':
      return Object.keys(ORIGIN_SLUGS['en']);
    case 'countries':
      return Object.keys(COUNTRY_SLUGS['en']);
    case 'ports':
      return GUIDE_PORTS.map((p) => p.code);
  }
}

/** Every section slug in every language - for the router's URL matcher. */
export const ALL_SECTION_SLUGS = new Set(SUPPORTED_LANGS.flatMap((l) => Object.values(GUIDE_SECTIONS[l])));
