import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { REPORT_PRICE_MINOR, isDisplayCurrency } from '../currency/currencies';
import { LANGUAGE_BY_CODE, Lang, SUPPORTED_LANGS } from '../i18n/language.service';
import { Page, pathFor } from '../routing/paths';
import { SITE } from '../site.config';

export const FAQ_COUNT = 9;

export interface CustomPage {
  lang: Lang;
  title: string;
  description: string;
  /** Path of this page (canonical). */
  path: string;
  /** Path of the same page in another language (hreflang). */
  pathFor: (lang: Lang) => string;
  breadcrumbs: { name: string; path: string }[];
  faq: { q: string; a: string }[];
  /** schema.org entity the article is about (a Place, a Country, ...). */
  about?: Record<string, unknown>;
  /** Article headline if it differs from the <title>. */
  headline?: string;
  /** schema.org type of the main entity; default Article. */
  type?: 'Article' | 'BlogPosting' | 'CollectionPage';
  /** ISO date - published and modified (blog). */
  published?: string;
  /** Languages that have this page (hreflang); default all. */
  languages?: readonly Lang[];
}

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
    this.meta.updateTag({ property: 'og:locale', content: LANGUAGE_BY_CODE[lang].og });
    this.meta.updateTag({ property: 'og:image', content: SITE.url + SITE.ogImage });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setLinks(page, url);
    this.setJsonLd(page, lang, pageTitle, description, url, t);
  }

  /**
   * Data-driven pages (the SEO guides): the page supplies its own title, description, language alternates,
   * breadcrumb trail and FAQ; we add canonical, hreflang, Open Graph and an Article + FAQPage + BreadcrumbList graph.
   */
  applyCustom(page: CustomPage): void {
    const url = SITE.url + page.path;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large' });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: LANGUAGE_BY_CODE[page.lang].og });
    this.meta.updateTag({ property: 'og:image', content: SITE.url + SITE.ogImage });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.writeLinks(url, (l) => SITE.url + page.pathFor(l), page.languages);
    const graph: Record<string, unknown>[] = [
      ...this.baseGraph(page.lang),
      {
        '@type': 'BreadcrumbList',
        itemListElement: page.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: SITE.url + b.path,
        })),
      },
      {
        '@type': page.type ?? 'Article',
        headline: page.headline ?? page.title,
        ...(page.published ? { datePublished: page.published, dateModified: page.published } : {}),
        description: page.description,
        inLanguage: page.lang,
        mainEntityOfPage: url,
        image: SITE.url + SITE.ogImage,
        author: { '@id': `${SITE.url}/#org` },
        publisher: { '@id': `${SITE.url}/#org` },
        ...(page.about ? { about: page.about } : {}),
      },
    ];
    if (page.faq.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: page.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }
    this.writeJsonLd(graph);
  }

  /** Pages that must not be indexed (personal report, quote links). */
  noindex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex,nofollow' });
  }

  private setLinks(page: Page, canonical: string): void {
    this.writeLinks(canonical, (l) => SITE.url + pathFor(page, l));
  }

  private writeLinks(canonical: string, alternate: (lang: Lang) => string, langs: readonly Lang[] = SUPPORTED_LANGS): void {
    const head = this.document.head;
    head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    const add = (attrs: Record<string, string>) => {
      const link = this.document.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    };
    add({ rel: 'canonical', href: canonical });
    for (const l of langs) {
      add({ rel: 'alternate', hreflang: l, href: alternate(l) });
    }
    add({ rel: 'alternate', hreflang: 'x-default', href: alternate(langs.includes('en') ? 'en' : langs[0]) });
  }

  private setJsonLd(page: Page, lang: Lang, name: string, description: string, url: string, t: (k: string) => string) {
    const graph: Record<string, unknown>[] = this.baseGraph(lang);
    if (page === 'home' || page === 'calculator') {
      const own = LANGUAGE_BY_CODE[lang].currency;
      const currency = isDisplayCurrency(own) ? own : 'EUR';
      graph.push({
        '@type': 'WebApplication',
        name: t('seo.calculator.title'),
        url: SITE.url + pathFor('calculator', lang),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        inLanguage: lang,
        offers: [
          { '@type': 'Offer', price: '0', priceCurrency: currency, name: t('pricing.free.name') },
          {
            '@type': 'Offer',
            price: (REPORT_PRICE_MINOR[currency] / 100).toFixed(2),
            priceCurrency: currency,
            name: t('pricing.report.name'),
          },
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
    graph.push({
      '@type': page === 'about' ? 'AboutPage' : 'WebPage',
      url,
      name,
      description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE.url}/#website` },
      ...(page === 'about' ? { about: { '@id': `${SITE.url}/#org` } } : {}),
    });
    this.writeJsonLd(graph);
  }

  private baseGraph(lang: Lang): Record<string, unknown>[] {
    return [
      { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.name, url: SITE.url, email: SITE.email },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: lang,
        publisher: { '@id': `${SITE.url}/#org` },
      },
    ];
  }

  private writeJsonLd(graph: Record<string, unknown>[]): void {
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
