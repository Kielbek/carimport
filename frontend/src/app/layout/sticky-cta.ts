import { Component, DestroyRef, Injectable, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../core/analytics/analytics.service';
import { LanguageService } from '../core/i18n/language.service';
import { PageContext } from '../core/routing/page-context';
import { pathFor } from '../core/routing/paths';
import { Icon } from '../shared/icon/icon';
import { CookieBanner } from './cookie-consent';
import { LanguagePickerState } from './language-picker';
import { NewsletterCard } from './newsletter-popup';

/** Content pages that get the button; the tools (calculator, EU import, taxes) and the legal pages do not. */
const PAGES = ['home', 'guide', 'blog', 'about', 'method', 'glossary', 'vin', 'copart'];

/** Shared state: whether the button is on screen and the calculator prefill of the current page. */
@Injectable({ providedIn: 'root' })
export class StickyCtaState {
  readonly visible = signal(false);
  /** Set by pages that know what the visitor is reading about (origin, destination, model, port). */
  readonly params = signal<Params>({});
}

/**
 * "Calculate import cost" pinned to the bottom of the screen on phones, once the visitor has scrolled past the first
 * screen of a content page. Steps aside for the language picker, the cookie banner and the newsletter card.
 */
@Component({
  selector: 'app-sticky-cta',
  imports: [RouterLink, TranslatePipe, Icon],
  template: `
    @if (enabled()) {
      <div class="h-20 md:hidden" aria-hidden="true"></div>
    }
    @if (show()) {
      <div class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
           animate.enter="reveal-enter" animate.leave="reveal-leave">
        <a [routerLink]="calculator()" [queryParams]="state.params()" (click)="clicked()"
           class="btn btn-primary w-full !py-3.5 text-base">
          <app-icon name="calculator" [size]="19" /> {{ 'home.final.cta' | translate }}
        </a>
      </div>
    }
  `,
})
export class StickyCta {
  protected readonly state = inject(StickyCtaState);
  private readonly page = inject(PageContext).page;
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  private readonly cookies = inject(CookieBanner).open;
  private readonly newsletter = inject(NewsletterCard).open;
  private readonly picker = inject(LanguagePickerState).open;
  private readonly scrolled = signal(false);

  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly enabled = computed(() => PAGES.includes(this.page() ?? ''));
  protected readonly show = computed(
    () => this.enabled() && this.scrolled() && !this.cookies() && !this.newsletter() && !this.picker(),
  );
  private readonly sync = effect(() => this.state.visible.set(this.show()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > window.innerHeight * 0.8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected clicked(): void {
    this.analytics.track('sticky_cta_click', { page: this.page() ?? '' });
  }
}
