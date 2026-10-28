import { RenderMode, ServerRoute } from '@angular/ssr';
import { SUPPORTED_LANGS } from './core/i18n/language.service';
import { GUIDE_SECTIONS, GuideSection, itemSlug, itemsOf } from './core/routing/guide-paths';
import { SLUGS } from './core/routing/paths';
import { BLOG_INDEX } from './features/blog/blog-index.generated';

const allLangs = async () => SUPPORTED_LANGS.map((lang) => ({ lang }));

/**
 * Each localized slug is prerendered only for the languages that use it: /pl/kalkulator, /en/calculator, ...
 * Several languages can share a slug (kalkulator: pl, bg, hr, hu, sl) - they share one server route.
 */
const perLanguage = (slugs: Record<string, string>): ServerRoute[] =>
  [...new Set(Object.values(slugs))].map((slug) => ({
    path: `:lang/${slug}`,
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SUPPORTED_LANGS.filter((lang) => slugs[lang] === slug).map((lang) => ({ lang })),
  }));

/**
 * Every guide hub and guide page, prerendered only for the languages that use that section slug:
 * /pl/porty, /pl/porty/bremerhaven, /uk/porty/..., /en/ports/..., /fr/ports/...
 */
const guideSections = SUPPORTED_LANGS.flatMap((lang) =>
  (Object.keys(GUIDE_SECTIONS[lang]) as GuideSection[]).map((section) => ({ lang, section, slug: GUIDE_SECTIONS[lang][section] })),
);
const guides: ServerRoute[] = [...new Set(guideSections.map((g) => g.slug))].flatMap((slug): ServerRoute[] => {
  const users = guideSections.filter((g) => g.slug === slug);
  return [
    {
      path: `:lang/${slug}`,
      renderMode: RenderMode.Prerender,
      getPrerenderParams: async () => users.map(({ lang }) => ({ lang })),
    },
    {
      path: `:lang/${slug}/:item`,
      renderMode: RenderMode.Prerender,
      getPrerenderParams: async () =>
        users.flatMap(({ lang, section }) => itemsOf(section).map((item) => ({ lang, item: itemSlug(section, item, lang) }))),
    },
  ];
});

/** Blog list in every language (empty languages show a short note) and every article in the languages that have it. */
const blog: ServerRoute[] = [
  { path: ':lang/blog', renderMode: RenderMode.Prerender, getPrerenderParams: allLangs },
  {
    path: ':lang/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      Object.values(BLOG_INDEX).flatMap((versions) => Object.entries(versions).map(([lang, slug]) => ({ lang, slug }))),
  },
];

/**
 * Static output: public, indexable pages are prerendered to HTML at build time (fast, crawlable, CDN-friendly);
 * personal pages (report, quote links) and the language-detecting root render in the browser.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'admin', renderMode: RenderMode.Client },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: allLangs },
  ...perLanguage(SLUGS.calculator),
  ...perLanguage(SLUGS.about),
  ...perLanguage(SLUGS.privacy),
  ...perLanguage(SLUGS.terms),
  ...perLanguage(SLUGS.taxes),
  ...perLanguage(SLUGS.method),
  ...perLanguage(SLUGS.glossary),
  ...perLanguage(SLUGS.contact),
  ...perLanguage(SLUGS.vin),
  ...perLanguage(SLUGS.vinCompare),
  ...perLanguage(SLUGS.copart),
  ...guides,
  ...blog,
  { path: '**', renderMode: RenderMode.Client },
];
