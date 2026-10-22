import { Lang } from '../i18n/language.service';

export type Page = 'home' | 'calculator' | 'about' | 'privacy';

/** Localized URL slugs - "/pl/kalkulator" ranks for Polish queries far better than "/pl/calculator". */
export const SLUGS: Record<Exclude<Page, 'home'>, Record<Lang, string>> = {
  calculator: { pl: 'kalkulator', en: 'calculator', de: 'rechner', uk: 'kalkuliator' },
  about: { pl: 'o-nas', en: 'about', de: 'ueber-uns', uk: 'pro-nas' },
  privacy: { pl: 'polityka-prywatnosci', en: 'privacy-policy', de: 'datenschutz', uk: 'polityka-konfidentsiinosti' },
};

/** Absolute in-app path of a page in a given language, e.g. pathFor('calculator', 'de') -> '/de/rechner'. */
export function pathFor(page: Page, lang: Lang): string {
  return page === 'home' ? `/${lang}` : `/${lang}/${SLUGS[page][lang]}`;
}
