import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { DisplayCurrency } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { CalculatorStore } from '../calculator/calculator.store';
import { rememberOrder } from '../report/order-tokens';

/**
 * Paywall: collects the name printed on the report, freezes the quote and redirects to Stripe Checkout (card, BLIK,
 * Przelewy24). No card data ever touches our domain; the price is set server-side.
 */
@Component({
  selector: 'app-paywall-modal',
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="modal-backdrop" (click)="closed.emit()"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
      <button type="button" class="absolute right-4 top-4 text-slate-400 hover:text-slate-700" (click)="closed.emit()" aria-label="Close">✕</button>
      <h2 id="paywall-title" class="text-2xl font-bold">🔓 {{ 'paywall.title' | translate }}</h2>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ 'paywall.subtitle' | translate }}</p>

      <form class="mt-6 space-y-4" [formGroup]="form" (ngSubmit)="pay()">
        <div>
          <label class="step-label" for="fullName">{{ 'paywall.fullName' | translate }}</label>
          <input id="fullName" class="input" formControlName="fullName" autocomplete="name" />
        </div>
        <div>
          <label class="step-label" for="email">{{ 'paywall.email' | translate }}</label>
          <input id="email" type="email" class="input" formControlName="email" autocomplete="email" />
        </div>
        <div>
          <span class="step-label">{{ 'paywall.currency' | translate }}</span>
          <div class="flex gap-2">
            @for (c of currencies; track c.code) {
              <button type="button" class="chip" [class.chip--active]="form.value.currency === c.code"
                      (click)="form.patchValue({ currency: c.code })">{{ c.label }}</button>
            }
          </div>
          @if (form.value.currency === 'PLN') {
            <p class="mt-2 text-xs text-slate-500">{{ 'paywall.blikHint' | translate }}</p>
          }
        </div>
        <label class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input type="checkbox" formControlName="terms" class="mt-0.5 accent-indigo-600" />
          <span>{{ 'paywall.terms' | translate }}</span>
        </label>
        @if (error()) {
          <p class="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{{ error() }}</p>
        }
        <button type="submit" class="cta-primary w-full" [disabled]="form.invalid || busy()">
          {{ busy() ? ('paywall.redirecting' | translate) : ('paywall.pay' | translate) }}
        </button>
        <p class="text-center text-[11px] text-slate-500">🔒 {{ 'paywall.secure' | translate }}</p>
      </form>
    </div>
  `,
})
export class PaywallModal {
  private readonly store = inject(CalculatorStore);
  private readonly api = inject(CarImportApi);
  private readonly lang = inject(LanguageService);

  readonly closed = output<void>();
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly currencies: { code: DisplayCurrency; label: string }[] = [
    { code: 'PLN', label: '19 zł · BLIK' },
    { code: 'EUR', label: '4,99 €' },
    { code: 'USD', label: '$5.49' },
  ];

  protected readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    currency: [this.store.state().displayCurrency as DisplayCurrency],
    terms: [false, Validators.requiredTrue],
  });

  protected pay(): void {
    this.busy.set(true);
    this.error.set(null);
    const { fullName, email, currency } = this.form.getRawValue();
    this.store
      .freeze()
      .pipe(
        switchMap((quote) =>
          this.api.startCheckout({ quoteId: quote.quoteId!, email, fullName, currency, locale: this.lang.current() }),
        ),
      )
      .subscribe({
        next: (res) => {
          rememberOrder(res.orderId, res.accessToken);
          window.location.assign(res.checkoutUrl);
        },
        error: (e) => {
          this.busy.set(false);
          this.error.set(e?.error?.detail ?? 'Payment could not be started');
        },
      });
  }
}
