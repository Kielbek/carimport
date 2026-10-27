import { Component, computed, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { DisplayCurrency } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { DISPLAY_CURRENCIES, reportPrice } from '../../core/currency/currencies';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { CalculatorStore } from '../calculator/calculator.store';
import { rememberOrder } from '../report/order-tokens';

/**
 * Paywall: collects the name printed on the report, freezes the quote and redirects to Stripe Checkout (card, BLIK,
 * Przelewy24). No card data ever touches our domain; the price is set server-side.
 */
@Component({
  selector: 'app-paywall-modal',
  imports: [ReactiveFormsModule, TranslatePipe, Icon],
  template: `
    <div class="overlay" (click)="closed.emit()"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
      <button type="button" class="absolute right-4 top-4 text-muted hover:text-fg" (click)="closed.emit()" [attr.aria-label]="'layout.close' | translate">
        <app-icon name="x" [size]="20" />
      </button>
      <span class="grid size-12 place-items-center rounded-[6px] bg-brand text-brand-ink"><app-icon name="document" [size]="24" /></span>
      <h2 id="paywall-title" class="mt-5 text-2xl font-extrabold">{{ 'paywall.title' | translate }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted">{{ 'paywall.subtitle' | translate }}</p>
      <p class="mt-2 text-sm"><a [href]="'/samples/report-' + lang.current() + '.pdf'" target="_blank" rel="noopener" (click)="analytics.track('sample_report_opened')" class="text-brand-text inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"><app-icon name="document" [size]="15" /> {{ 'result.sample' | translate }}</a></p>

      <form class="mt-6 space-y-4" [formGroup]="form" (ngSubmit)="pay()">
        <div>
          <label class="label" for="fullName">{{ 'paywall.fullName' | translate }}</label>
          <input id="fullName" class="input" formControlName="fullName" autocomplete="name" />
        </div>
        <div>
          <label class="label" for="email">{{ 'paywall.email' | translate }}</label>
          <input id="email" type="email" class="input" formControlName="email" autocomplete="email" />
        </div>
        <div>
          <span class="label">{{ 'paywall.currency' | translate }}</span>
          <div class="flex flex-wrap gap-2">
            @for (c of currencies(); track c.code) {
              <button type="button" class="chip" [class.chip--active]="form.value.currency === c.code"
                      (click)="form.patchValue({ currency: c.code })">{{ c.label }}</button>
            }
          </div>
          <p class="mt-2 text-xs text-muted">{{ (form.value.currency === 'PLN' ? 'paywall.blikHint' : 'paywall.methodsHint') | translate }}</p>
        </div>
        <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input type="checkbox" formControlName="terms" class="checkbox" />
          <span>
            {{ 'paywall.terms' | translate }}
            <a [href]="termsUrl()" target="_blank" rel="noopener" class="font-semibold text-brand-text underline underline-offset-2">{{ 'paywall.termsLink' | translate }}</a>
          </span>
        </label>
        @if (error()) {
          <p class="rounded-[4px] bg-danger-soft p-3 text-sm text-danger">{{ error()! | translate }}</p>
        }
        <button type="submit" class="btn btn-primary w-full" [disabled]="form.invalid || busy()">
          {{ busy() ? ('paywall.redirecting' | translate) : ('paywall.pay' | translate) }}
        </button>
        <p class="flex items-start gap-2 rounded-[4px] bg-brand/10 p-3 text-xs leading-relaxed"><app-icon name="shield" [size]="16" class="mt-px shrink-0 text-brand-text" /> {{ 'paywall.guarantee' | translate }}</p>
        <p class="text-center text-xs text-muted">{{ 'paywall.promoHint' | translate }}</p>
        <p class="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted"><app-icon name="lock" [size]="12" /> {{ 'paywall.secure' | translate }}</p>
      </form>
    </div>
  `,
})
export class PaywallModal {
  private readonly store = inject(CalculatorStore);
  private readonly api = inject(CarImportApi);
  protected readonly lang = inject(LanguageService);
  protected readonly analytics = inject(AnalyticsService);

  readonly closed = output<void>();
  protected readonly termsUrl = computed(() => pathFor('terms', this.lang.current()));
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  /** The result currency first, then the euro, then the rest - each labelled with its price. */
  protected readonly currencies = computed(() => {
    const first = this.store.state().displayCurrency;
    const order = [first, ...DISPLAY_CURRENCIES.filter((c) => c !== first)];
    return order.map((code) => ({ code, label: reportPrice(code, this.lang.locale()) }));
  });

  protected readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    currency: [this.store.state().displayCurrency as DisplayCurrency],
    terms: [false, Validators.requiredTrue],
  });

  protected pay(): void {
    this.busy.set(true);
    this.analytics.track('checkout_started', { currency: this.form.getRawValue().currency });
    this.error.set(null);
    const { fullName, email, currency } = this.form.getRawValue();
    this.store
      .freeze()
      .pipe(
        switchMap((quote) =>
          this.api.startCheckout({
            quoteId: quote.quoteId!,
            email,
            fullName,
            currency,
            locale: this.lang.current(),
            termsAccepted: true,
            termsVersion: SITE.termsVersion,
          }),
        ),
      )
      .subscribe({
        next: (res) => {
          rememberOrder(res.orderId, res.accessToken);
          window.location.assign(res.checkoutUrl);
        },
        error: (e) => {
          this.busy.set(false);
          this.error.set(e?.status === 429 ? 'error.rateLimited' : (e?.error?.detail ?? 'paywall.startFailed'));
        },
      });
  }
}
