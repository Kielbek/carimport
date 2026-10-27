import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from '../site.config';

/** Funnel events - the same names in every provider, so reports stay comparable after a switch. */
export type AnalyticsEvent =
  | 'calculator_step'
  | 'vin_lookup'
  | 'quote_calculated'
  | 'paywall_opened'
  | 'sample_report_opened'
  | 'newsletter_signup'
  | 'newsletter_popup_shown'
  | 'newsletter_popup_dismissed'
  | 'checkout_started'
  | 'purchase'
  | 'partner_lead_sent';

const CONSENT_KEY = 'carimport.consent';

/**
 * Conversion analytics, loaded only in the browser, only when a provider is configured (SITE.analytics) and only after
 * the visitor accepted analytics cookies in the banner. Nothing is sent before that - events are dropped, not queued,
 * so a later consent does not leak earlier behaviour. No personal data (names, e-mails, VINs, addresses) is ever sent.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private loaded = false;

  /** Called once at startup and again when the visitor answers the cookie banner. */
  init(): void {
    if (!this.browser || this.loaded || !SITE.analytics.provider || !this.consented()) {
      return;
    }
    this.loaded = true;
    const { provider, id } = SITE.analytics;
    if (provider === 'plausible') {
      this.script(`https://plausible.io/js/script.manual.js`, { 'data-domain': id });
      const w = window as unknown as { plausible?: (...a: unknown[]) => void } & Record<string, unknown>;
      w['plausible'] = w['plausible'] ?? function (...args: unknown[]) {
        ((w['plausible'] as unknown as { q?: unknown[] }).q ??= []).push(args);
      };
    } else if (provider === 'ga4') {
      this.script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
      const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer ?? [];
      w.gtag = function () {
        // gtag expects the arguments object itself
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      };
      w.gtag('js', new Date());
      w.gtag('config', id, { send_page_view: false, anonymize_ip: true });
    }
    this.pageview();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.pageview());
  }

  track(event: AnalyticsEvent, props: Record<string, string | number> = {}): void {
    if (!this.loaded) {
      return;
    }
    const w = window as unknown as { plausible?: (e: string, o?: object) => void; gtag?: (...a: unknown[]) => void };
    if (SITE.analytics.provider === 'plausible') {
      w.plausible?.(event, { props });
    } else {
      w.gtag?.('event', event, props);
    }
  }

  private pageview(): void {
    // the report page carries its access token in the fragment - never send fragments or query strings
    const url = location.origin + location.pathname;
    const w = window as unknown as { plausible?: (e: string, o?: object) => void; gtag?: (...a: unknown[]) => void };
    if (SITE.analytics.provider === 'plausible') {
      w.plausible?.('pageview', { u: url });
    } else {
      w.gtag?.('event', 'page_view', { page_location: url, page_title: this.document.title });
    }
  }

  private consented(): boolean {
    try {
      return localStorage.getItem(CONSENT_KEY) === 'all';
    } catch {
      return false;
    }
  }

  private script(src: string, attrs: Record<string, string> = {}): void {
    const s = this.document.createElement('script');
    s.async = true;
    s.src = src;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    this.document.head.appendChild(s);
  }
}
