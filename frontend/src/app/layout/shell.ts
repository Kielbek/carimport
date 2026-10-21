import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Lang, LanguageService } from '../core/i18n/language.service';
import { Page, pathFor } from '../core/routing/paths';
import { SeoService } from '../core/seo/seo.service';
import { CookieConsent } from './cookie-consent';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

const INDEXABLE: Page[] = ['home', 'calculator', 'privacy'];

/** Layout for every /:lang page. Also owns per-navigation SEO and the "same page in another language" mapping. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SiteHeader, SiteFooter, CookieConsent],
  template: `
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-brand focus:p-3 focus:text-brand-ink">Skip to content</a>
    <app-site-header [hrefFor]="hrefFor()" />
    <main id="main"><router-outlet /></main>
    <app-site-footer />
    <app-cookie-consent />
  `,
})
export class Shell {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly lang = inject(LanguageService);
  private readonly seo = inject(SeoService);

  /** Current page in any language - drives the language switcher links. */
  protected readonly hrefFor = signal<(lang: Lang) => string>((l) => `/${l}`);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.onNavigated());
  }

  private onNavigated(): void {
    let leaf = this.route;
    while (leaf.firstChild) {
      leaf = leaf.firstChild;
    }
    const data = leaf.snapshot.data;
    const page = data['page'] as Page | 'report' | undefined;
    const lang = this.lang.current();

    if (page && INDEXABLE.includes(page as Page) && !data['noindex']) {
      this.seo.apply(page as Page, lang);
      this.hrefFor.set((l) => pathFor(page as Page, l));
    } else {
      this.seo.noindex();
      const rest = this.router.url.split(/[?#]/)[0].split('/').slice(2).join('/');
      this.hrefFor.set((l) => `/${l}${rest ? '/' + rest : ''}`);
    }
  }
}
