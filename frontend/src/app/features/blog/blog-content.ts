import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { BLOG_LANGS } from './blog-index.generated';
import { BlogArticle } from './blog.models';

/**
 * Articles of one language as a lazy chunk (dynamic import of the JSON, like the translations) - identical in the
 * browser and during prerendering. A language without articles yet has an empty blog.
 */
export function loadArticles(lang: string): Promise<BlogArticle[]> {
  if (!BLOG_LANGS.includes(lang)) {
    return Promise.resolve([]);
  }
  return import(`../../../content/blog/${lang}.json`)
    .then((m) => (m.default as BlogArticle[]).slice().sort((a, b) => b.date.localeCompare(a.date)))
    .catch(() => []);
}

/** Route resolver: the router (and the prerenderer) waits for the articles before rendering the page. */
export const blogResolver: ResolveFn<BlogArticle[]> = () => loadArticles(inject(LanguageService).current());
