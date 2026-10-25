import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { Icon } from '../../shared/icon/icon';

type State = 'working' | 'confirmed' | 'unsubscribed' | 'invalid';

/**
 * Landing page of the newsletter links: #confirm=<token> (double opt-in) and #unsubscribe=<token>. The token is in the
 * fragment, so it never reaches a server log; it is removed from the address bar once read.
 */
@Component({
  selector: 'app-newsletter-page',
  imports: [TranslatePipe, Icon, RouterLink],
  template: `
    <section class="site max-w-xl py-20 text-center">
      <p class="eyebrow">{{ 'newsletter.confirmTitle' | translate }}</p>
      @switch (state()) {
        @case ('working') {
          <div class="mx-auto mt-8 size-10 animate-spin rounded-full border-4 border-line border-t-brand"></div>
          <p class="mt-4 text-muted">{{ 'newsletter.working' | translate }}</p>
        }
        @case ('confirmed') {
          <app-icon name="check" [size]="40" class="mx-auto mt-6 text-brand-text" />
          <h1 class="mt-4 text-2xl font-extrabold">{{ 'newsletter.confirmed' | translate }}</h1>
        }
        @case ('unsubscribed') {
          <h1 class="mt-6 text-2xl font-extrabold">{{ 'newsletter.unsubscribed' | translate }}</h1>
        }
        @default {
          <h1 class="mt-6 text-2xl font-extrabold">{{ 'newsletter.invalid' | translate }}</h1>
        }
      }
      @if (state() !== 'working') {
        <a [routerLink]="calculator()" class="btn btn-primary mt-8">{{ 'layout.cta' | translate }}</a>
      }
    </section>
  `,
})
export class NewsletterPage implements OnInit {
  private readonly api = inject(CarImportApi);
  private readonly router = inject(Router);
  private readonly lang = inject(LanguageService);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly state = signal<State>('working');
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));

  ngOnInit(): void {
    if (!this.browser) {
      return;
    }
    const params = new URLSearchParams(window.location.hash.slice(1));
    const confirm = params.get('confirm');
    const unsubscribe = params.get('unsubscribe');
    history.replaceState(history.state, '', window.location.pathname);
    if (confirm) {
      this.api.newsletterConfirm(confirm).subscribe({
        next: () => this.state.set('confirmed'),
        error: () => this.state.set('invalid'),
      });
    } else if (unsubscribe) {
      this.api.newsletterUnsubscribe(unsubscribe).subscribe({
        next: () => this.state.set('unsubscribed'),
        error: () => this.state.set('invalid'),
      });
    } else {
      this.state.set('invalid');
    }
  }
}
