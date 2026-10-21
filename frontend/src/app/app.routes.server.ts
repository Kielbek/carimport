import { RenderMode, ServerRoute } from '@angular/ssr';
import { SUPPORTED_LANGS } from './core/i18n/language.service';
import { SLUGS } from './core/routing/paths';

const allLangs = async () => SUPPORTED_LANGS.map((lang) => ({ lang }));

/** Each localized slug is prerendered only for its own language: /pl/kalkulator, /en/calculator, ... */
const perLanguage = (slugs: Record<string, string>): ServerRoute[] =>
  SUPPORTED_LANGS.map((lang) => ({
    path: `:lang/${slugs[lang]}`,
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [{ lang }],
  }));

/**
 * Static output: public, indexable pages are prerendered to HTML at build time (fast, crawlable, CDN-friendly);
 * personal pages (report, quote links) and the language-detecting root render in the browser.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: allLangs },
  ...perLanguage(SLUGS.calculator),
  ...perLanguage(SLUGS.privacy),
  { path: '**', renderMode: RenderMode.Client },
];
