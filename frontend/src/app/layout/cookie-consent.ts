import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../core/i18n/language.service';
import { pathFor } from '../core/routing/paths';
import { Icon } from '../shared/icon/icon';

const KEY = 'carimport.consent';
export type Consent = 'all' | 'necessary';

/**
 * Cookie banner. Rendered only in the browser after hydration (prerendered HTML stays clean for crawlers), shown until
 * the visitor chooses. "Necessary only" is as prominent as "Accept all" (EDPB guidance).
 */
@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink, TranslatePipe, Icon],
  template: `
    @if (visible()) {
      <div role="dialog" aria-live="polite" [attr.aria-label]="'cookies.title' | translate" animate.leave="reveal-leave"
           class="reveal-enter fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[1240px] -translate-x-1/2 flex-col gap-4 rounded-[6px] border border-line bg-panel/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p class="flex gap-3 text-sm leading-relaxed text-fg/90">
          <app-icon name="cookie" [size]="22" class="mt-0.5 text-brand-text" />
          <span>{{ 'cookies.text' | translate }}
            <a [routerLink]="privacy()" class="font-semibold text-accent-text underline underline-offset-2">{{ 'footer.privacy' | translate }}</a>.</span>
        </p>
        <div class="flex shrink-0 gap-2">
          <button type="button" class="btn btn-ghost btn-sm border border-line" (click)="choose('necessary')">{{ 'cookies.necessary' | translate }}</button>
          <button type="button" class="btn btn-primary btn-sm" (click)="choose('all')">{{ 'cookies.accept' | translate }}</button>
        </div>
      </div>
    }
  `,
})
export class CookieConsent {
  private readonly lang = inject(LanguageService);
  protected readonly visible = signal(false);
  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));

  constructor() {
    afterNextRender(() => {
      try {
        this.visible.set(!localStorage.getItem(KEY));
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
    // analytics/marketing tags are loaded only after consent === 'all' (tag manager consent mode)
  }
}
