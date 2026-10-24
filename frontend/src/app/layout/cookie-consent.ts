import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../core/analytics/analytics.service';
import { LanguageService } from '../core/i18n/language.service';
import { pathFor } from '../core/routing/paths';

const KEY = 'carimport.consent';
export type Consent = 'all' | 'necessary';

/**
 * Cookie banner. Rendered only in the browser after hydration (prerendered HTML stays clean for crawlers), shown until
 * the visitor chooses. "Necessary only" is as prominent as "Accept all" (EDPB guidance).
 */
@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink, TranslatePipe],
  template: `
    @if (visible()) {
      <div role="dialog" aria-live="polite" [attr.aria-label]="'cookies.title' | translate" animate.leave="reveal-leave"
           class="theme-dark reveal-enter fixed bottom-2 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[1260px] -translate-x-1/2 flex-col gap-4 rounded-[4px] bg-panel/97 px-5 py-5 text-fg shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-[850px] text-[14px] leading-[1.6] text-fg/90">
          {{ 'cookies.text' | translate }}
          <a [routerLink]="privacy()" class="text-brand underline underline-offset-2">{{ 'footer.privacy' | translate }}</a>.
        </p>
        <div class="flex shrink-0 gap-2">
          <button type="button" class="btn btn-sm border border-line px-5 text-fg/90 hover:border-brand" (click)="choose('necessary')">{{ 'cookies.necessary' | translate }}</button>
          <button type="button" class="btn btn-primary px-7" (click)="choose('all')">{{ 'cookies.accept' | translate }}</button>
        </div>
      </div>
    }
  `,
})
export class CookieConsent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  protected readonly visible = signal(false);
  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));

  constructor() {
    afterNextRender(() => {
      try {
        this.visible.set(!localStorage.getItem(KEY));
        this.analytics.init();
      } catch {
        this.visible.set(true);
      }
    });
  }

  protected choose(consent: Consent): void {
    try {
      localStorage.setItem(KEY, consent);
    } catch {
      // not persisted; banner returns next visit
    }
    this.visible.set(false);
    this.analytics.init(); // loads the analytics provider only when the choice was 'all'
  }
}
