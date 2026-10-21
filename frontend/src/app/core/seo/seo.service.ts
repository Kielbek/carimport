import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Lang, SUPPORTED_LANGS } from '../i18n/language.service';
import { Page, pathFor } from '../routing/paths';
import { SITE } from '../site.config';

const OG_LOCALES: Record<Lang, string> = { pl: 'pl_PL', en: 'en_GB', de: 'de_DE', uk: 'uk_UA' };
export const FAQ_COUNT = 8;

/**
 * Per-page head management for search engines and social previews: title, description, canonical, hreflang
 * alternates (+ x-default), Open Graph / Twitter and JSON-LD. Runs during prerendering, so crawlers get it as static
 * HTML without executing JavaScript.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);

  apply(page: Page, lang: Lang, indexable = true): void {
    const t = (key: string) => this.translate.instant(key) as string;
    const pageTitle = t(`seo.${page}.title`);
    const description = t(`seo.${page}.description`);
    const url = SITE.url + pathFor(page, lang);

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[lang] });
    this.meta.updateTag({ property: 'og:image', content: SITE.url + SITE.ogImage });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setLinks(page, url);
    this.setJsonLd(page, lang, pageTitle, description, url, t);
  }

  /** Pages that must not be indexed (personal report, quote links). */
  noindex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex,nofollow' });
  }

  private setLinks(page: Page, canonical: string): void {
    const head = this.document.head;
    head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    const add = (attrs: Record<string, string>) => {
      const link = this.document.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    };
    add({ rel: 'canonical', href: canonical });
    for (const l of SUPPORTED_LANGS) {
      add({ rel: 'alternate', hreflang: l, href: SITE.url + pathFor(page, l) });
    }
    add({ rel: 'alternate', hreflang: 'x-default', href: SITE.url + pathFor(page, 'en') });
  }

  private setJsonLd(page: Page, lang: Lang, name: string, description: string, url: string, t: (k: string) => string) {
    const graph: Record<string, unknown>[] = [
      { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.name, url: SITE.url, email: SITE.email },
      { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, inLanguage: lang, publisher: { '@id': `${SITE.url}/#org` } },
    ];
    if (page === 'home' || page === 'calculator') {
      graph.push({
        '@type': 'WebApplication',
        name: t('seo.calculator.title'),
        url: SITE.url + pathFor('calculator', lang),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        inLanguage: lang,
        offers: [
          { '@type': 'Offer', price: '0', priceCurrency: 'PLN', name: t('pricing.free.name') },
          { '@type': 'Offer', price: '19.00', priceCurrency: 'PLN', name: t('pricing.report.name') },
        ],
      });
    }
    if (page === 'home') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
          '@type': 'Question',
          name: t(`faq.q${i + 1}.q`),
          acceptedAnswer: { '@type': 'Answer', text: t(`faq.q${i + 1}.a`) },
        })),
      });
    } else {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url + pathFor('home', lang) },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      });
    }
    graph.push({ '@type': 'WebPage', url, name, description, inLanguage: lang, isPartOf: { '@id': `${SITE.url}/#website` } });

    let script = this.document.head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }
}
