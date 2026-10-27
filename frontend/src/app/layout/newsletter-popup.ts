import { afterNextRender, Component, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../core/analytics/analytics.service';
import { NewsletterSignup, newsletterState, snoozeNewsletter } from '../features/newsletter/newsletter-signup';
import { Icon } from '../shared/icon/icon';

const CONSENT_KEY = 'carimport.consent';
const SESSION_START = 'carimport.session-start';
const SESSION_SHOWN = 'carimport.newsletter-shown';
/** Time on the site (across pages) before the card may appear. */
const MIN_SECONDS = 30;
/** Share of the current page read, or a second page opened, shows real interest. */
const MIN_SCROLL = 0.4;
/** Leaving the tab with the mouse (desktop) is enough after this much time. */
const EXIT_INTENT_SECONDS = 10;
/** "Not now" / close hides it this long. */
const SNOOZE_DAYS = 30;

/** Whether the newsletter card sits in the bottom-right corner - the back-to-top button steps aside meanwhile. */
@Injectable({ providedIn: 'root' })
export class NewsletterCard {
  readonly open = signal(false);
}

/**
 * Newsletter invitation on the content pages (never in the calculator, checkout or report): a small card in the
 * corner, not a blocking modal - Google penalises interstitials that cover content on mobile. It appears once per
 * visit at most, only after the cookie choice, and only to an engaged visitor: 30 s on the site and 40 % of a page
 * read (or a second page), or the mouse leaving the window after 10 s. Closing it snoozes it for 30 days; signing up
 * (here or in the footer) ends it for good.
 */
@Component({
  selector: 'app-newsletter-popup',
  imports: [TranslatePipe, Icon, NewsletterSignup],
  template: `
    @if (open()) {
      <aside role="dialog" aria-modal="false" aria-labelledby="nl-pop-title" (keydown.escape)="dismiss()"
             animate.enter="reveal-enter" animate.leave="reveal-leave"
             class="fixed inset-x-3 bottom-3 z-40 rounded-[8px] border border-line bg-panel p-4 shadow-2xl sm:p-5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]">
        <button type="button" class="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-muted hover:bg-panel-2 hover:text-fg"
                [attr.aria-label]="'layout.close' | translate" (click)="dismiss()">
          <app-icon name="x" [size]="18" />
        </button>
        <div class="flex items-start gap-3 pr-8">
          <span class="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-text"><app-icon name="mail" [size]="20" /></span>
          <div>
            <h2 id="nl-pop-title" class="font-extrabold leading-snug">{{ 'newsletter.popupTitle' | translate }}</h2>
            <p class="mt-1 hidden text-sm text-muted sm:block">{{ 'newsletter.popupLead' | translate }}</p>
          </div>
        </div>
        <div class="mt-4">
          <app-newsletter-signup source="popup" [compact]="true" (subscribed)="subscribed()" />
        </div>
        @if (!done()) {
          <button type="button" class="mt-3 text-xs font-semibold text-muted underline hover:text-fg" (click)="dismiss()">
            {{ 'newsletter.later' | translate }}
          </button>
        }
      </aside>
    }
  `,
})
export class NewsletterPopup {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  protected readonly open = inject(NewsletterCard).open;
  protected readonly done = signal(false);
  /** Other pages opened after the first one in this visit of the shell. */
  private pagesSeen = 0;
  private maxScroll = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.notAskedRecently()) {
        return;
      }
      const start = this.sessionStart();
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.maxScroll = Math.max(this.maxScroll, max > 0 ? window.scrollY / max : 1);
      };
      const onLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !e.relatedTarget && this.seconds(start) >= EXIT_INTENT_SECONDS) {
          this.tryShow();
        }
      };
      let lastUrl = this.router.url;
      const timer = setInterval(() => {
        if (this.router.url !== lastUrl) {
          lastUrl = this.router.url;
          this.pagesSeen++;
          this.maxScroll = 0;
        }
        if (this.seconds(start) >= MIN_SECONDS && (this.maxScroll >= MIN_SCROLL || this.pagesSeen >= 1)) {
          this.tryShow();
        }
      }, 2000);
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('mouseout', onLeave);
      destroyRef.onDestroy(() => {
        clearInterval(timer);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('mouseout', onLeave);
      });
    });
  }

  protected dismiss(): void {
    if (!this.done()) {
      snoozeNewsletter(SNOOZE_DAYS);
      this.analytics.track('newsletter_popup_dismissed');
    }
    this.open.set(false);
  }

  protected subscribed(): void {
    this.done.set(true);
    setTimeout(() => this.open.set(false), 6000);
  }

  private tryShow(): void {
    if (this.open() || this.done() || !this.eligible() || !this.allowedHere()) {
      return;
    }
    try {
      sessionStorage.setItem(SESSION_SHOWN, '1');
    } catch {
      // shown again on the next page at worst
    }
    this.open.set(true);
    this.analytics.track('newsletter_popup_shown');
  }

  /** Cookie choice made, not signed up, not snoozed, not shown in this visit yet. */
  private eligible(): boolean {
    try {
      if (!localStorage.getItem(CONSENT_KEY) || sessionStorage.getItem(SESSION_SHOWN)) {
        return false;
      }
    } catch {
      return false;
    }
    return this.notAskedRecently();
  }

  /** Not signed up and not snoozed - the cookie choice may still come later in this visit. */
  private notAskedRecently(): boolean {
    const state = newsletterState();
    return state === null || (typeof state === 'number' && state < Date.now());
  }

  /** Not on the newsletter page itself, nor where the visitor is paying or reading a bought report. */
  private allowedHere(): boolean {
    return !/\/(newsletter|report|admin)(\/|$|\?|#)/.test(this.router.url);
  }

  private sessionStart(): number {
    try {
      const saved = Number(sessionStorage.getItem(SESSION_START));
      if (saved) {
        return saved;
      }
      const now = Date.now();
      sessionStorage.setItem(SESSION_START, String(now));
      return now;
    } catch {
      return Date.now();
    }
  }

  private seconds(since: number): number {
    return (Date.now() - since) / 1000;
  }
}
