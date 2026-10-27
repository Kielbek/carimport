import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageContext } from '../core/routing/page-context';
import { CookieConsent } from './cookie-consent';
import { NewsletterPopup } from './newsletter-popup';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

/** Site chrome (header, footer, cookie banner, newsletter invitation) for the content pages; the calculator runs full-screen without it. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SiteHeader, SiteFooter, CookieConsent, NewsletterPopup],
  template: `
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-brand focus:p-3 focus:text-brand-ink">Skip to content</a>
    <app-site-header [hrefFor]="page.hrefFor()" />
    <main id="main"><router-outlet /></main>
    <app-site-footer />
    <app-cookie-consent />
    <app-newsletter-popup />
  `,
})
export class Shell {
  protected readonly page = inject(PageContext);
}
