import { GUIDE_COUNTRIES, GUIDE_PORTS } from '../../features/guides/guide-data.generated';
import { Lang, SUPPORTED_LANGS } from '../i18n/languages';
import { GuideSection } from './guide-paths';
import scope from './index-scope.json';

/**
 * Which guide pages a language offers to search engines. A new site with 23 parallel versions of every country and
 * port page reads as mass-produced to Google; each language keeps the countries it is spoken in (all of them for
 * English, Polish and Ukrainian) and the ports a reader there would actually use. The other pages stay on the site
 * for visitors (noindex, follow) and out of the sitemap.
 */
const COUNTRIES = scope.countries as Record<string, '*' | string[]>;

function countriesOf(lang: Lang): string[] | '*' {
  return COUNTRIES[lang] ?? '*';
}

const PORTS_OF = new Map<Lang, Set<string>>();
function portsOf(lang: Lang): Set<string> | '*' {
  const countries = countriesOf(lang);
  if (countries === '*') {
    return '*';
  }
  let ports = PORTS_OF.get(lang);
  if (!ports) {
    ports = new Set(GUIDE_PORTS.filter((p) => countries.includes(p.country)).map((p) => p.code));
    for (const c of GUIDE_COUNTRIES.filter((g) => countries.includes(g.code))) {
      c.nearest.slice(0, scope.nearestPorts).forEach((n) => ports!.add(n.code));
    }
    PORTS_OF.set(lang, ports);
  }
  return ports;
}

/** Whether this language's version of a guide page is meant for search engines. Hubs, origins and models always are. */
export function guideIndexable(section: GuideSection, item: string | null, lang: Lang): boolean {
  if (!item) {
    return true;
  }
  if (section === 'countries') {
    const c = countriesOf(lang);
    return c === '*' || c.includes(item);
  }
  if (section === 'ports') {
    const p = portsOf(lang);
    return p === '*' || p.has(item);
  }
  return true;
}

/** The languages whose version of a guide page is indexable (its hreflang set). */
export function guideLanguages(section: GuideSection, item: string | null): Lang[] {
  return SUPPORTED_LANGS.filter((l) => guideIndexable(section, item, l));
}
