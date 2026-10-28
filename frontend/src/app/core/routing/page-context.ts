import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Lang, LanguageService } from '../i18n/language.service';
import { SeoService } from '../seo/seo.service';
import { Page, pathFor } from './paths';

const INDEXABLE: Page[] = ['home', 'calculator', 'about', 'privacy', 'terms', 'taxes', 'method', 'glossary', 'contact', 'vin', 'copart'];

/**
 * Tracks which page is shown (after every navigation) for SEO tags and the "same page in another language" links.
 * Lives at the root so pages with and without the site chrome (the full-screen calculator) are handled alike.
 */
@Injectable({ providedIn: 'root' })
export class PageContext {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly lang = inject(LanguageService);
  private readonly seo = inject(SeoService);

  /** Maps a language to the URL of the current page in that language. */
  readonly hrefFor = signal<(lang: Lang) => string>((l) => `/${l}`);

  start(destroyRef: DestroyRef): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed(destroyRef))
      .subscribe(() => this.onNavigated());
  }

  private onNavigated(): void {
    let leaf = this.route;
    while (leaf.firstChild) {
      leaf = leaf.firstChild;
    }
    const data = leaf.snapshot.data;
    const page = data['page'] as Page | 'report' | 'newsletter' | 'admin' | 'guide' | 'blog' | undefined;
    if (page === 'guide' || page === 'blog') {
      return; // guide and blog pages set their own head tags and language links
    }
    if (page && INDEXABLE.includes(page as Page) && !data['noindex']) {
      this.seo.apply(page as Page, this.lang.current());
      this.hrefFor.set((l) => pathFor(page as Page, l));
    } else {
      this.seo.noindex();
      const rest = this.router.url.split(/[?#]/)[0].split('/').slice(2).join('/');
      this.hrefFor.set((l) => `/${l}${rest ? '/' + rest : ''}`);
    }
  }
}
