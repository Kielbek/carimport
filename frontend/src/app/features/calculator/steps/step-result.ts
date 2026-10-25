import { Component, computed, inject, output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CostCategory, PublicQuoteView } from '../../../core/api/api.models';
import { reportPrice } from '../../../core/currency/currencies';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { AnalyticsService } from '../../../core/analytics/analytics.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DEPARTURE_PORTS } from '../calculator.options';

/**
 * Step 6 - the free result. Free: the taxes anyone could work out on paper (duty, import VAT of the port country,
 * national tax of the destination, port fees). Locked and blurred: the door-to-door total in three scenarios and every
 * other position - the server does not send those amounts, the blurred figures are placeholders. The purchase sits at
 * the top and, on phones, in a bar that is always visible.
 */
@Component({
  selector: 'app-step-result',
  imports: [TranslatePipe, Icon, CountryNamePipe],
  template: `
    @if (store.calculating()) {
      <div class="py-20 text-center">
        <div class="mx-auto size-12 animate-spin rounded-full border-4 border-line border-t-brand"></div>
        <p class="mt-5 font-semibold">{{ 'result.calculating' | translate }}</p>
      </div>
    } @else if (store.error(); as e) {
      <div class="rounded-[4px] bg-danger-soft p-5 text-danger">
        <p class="flex gap-2 font-semibold"><app-icon name="warning" [size]="18" />{{ e.messageKey ? (e.messageKey | translate) : e.detail }}</p>
        <button type="button" class="btn btn-outline mt-4" (click)="edit.emit(1)">{{ 'result.edit' | translate }}</button>
      </div>
    } @else if (store.result(); as r) {
      <!-- route summary -->
      <p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <span>{{ 'origin.' + s().originCountry | translate }}</span>
        <app-icon name="arrow-right" [size]="14" />
        <span>{{ departure() }}</span>
        <app-icon name="arrow-right" [size]="14" />
        <span>{{ r.clearancePort }}</span>
        <app-icon name="arrow-right" [size]="14" />
        <span>{{ s().destinationAddress ?? (r.destinationCountry | countryName: lang.locale()) }}</span>
      </p>

      <!-- the result: car to the door, before registration, repairs and risks - free -->
      <section class="mt-6 rounded-[6px] border-2 border-brand bg-panel p-6 sm:p-8" aria-labelledby="result-total">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="eyebrow">{{ 'result.freeEyebrow' | translate }}</p>
            <h3 id="result-total" class="mt-2 text-base font-bold text-fg/85">{{ 'result.totalWithCar' | translate }}</h3>
            <p class="mt-1 text-[clamp(2.2rem,6vw,3.2rem)] font-extrabold leading-none tabular-nums text-brand-text">
              <span class="mr-1 align-middle text-[0.45em] font-bold text-muted">{{ 'result.approx' | translate }}</span>{{ money(r.taxes.totalWithCar, r.currency) }}
            </p>
            @if (r.taxes.estimateMin != null && r.taxes.estimateMax != null) {
              <p class="mt-2 text-sm font-semibold text-fg/80">{{ 'result.span' | translate: { min: money(r.taxes.estimateMin, r.currency), max: money(r.taxes.estimateMax, r.currency) } }}</p>
            }
            <p class="mt-2 max-w-xl text-sm text-muted">{{ 'result.totalWithCarWhat' | translate }}</p>
          </div>
          <span class="badge !bg-success/15 !text-success">{{ 'result.freeBadge' | translate }}</span>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          @for (t of tiles(r); track t.key) {
            <div class="rounded-[4px] bg-panel-2 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.05em] text-muted">{{ t.label | translate: { port: r.clearancePort } }}</p>
              <p class="mt-1.5 text-xl font-extrabold tabular-nums">
                @if (t.estimate) { <span class="text-sm font-bold text-muted">{{ 'result.approx' | translate }}</span> }
                {{ money(t.amount, r.currency) }}
              </p>
            </div>
          }
        </div>

        <table class="mt-6 w-full text-[14px]">
          <tbody>
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'result.carPrice' | translate }}
                <span class="block text-xs text-muted">{{ 'result.carPriceWhat' | translate }}</span></td>
              <td class="py-2.5 text-right font-semibold tabular-nums">{{ money(r.taxes.carPrice, r.currency) }}</td>
            </tr>
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'portCost.transportToPort' | translate: { port: r.clearancePort } }}
                <span class="block text-xs text-muted">{{ 'portCost.transportToPortWhat' | translate }}</span></td>
              <td class="py-2.5 text-right font-semibold tabular-nums"><span class="text-xs text-muted">{{ 'result.approx' | translate }}</span> {{ money(r.taxes.transportToPort, r.currency) }}</td>
            </tr>
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'cost.CUSTOMS_DUTY' | translate }} <span class="text-muted">{{ pct(r.taxes.duty.rate) }}</span>
                <span class="block text-xs text-muted">{{ 'portCost.dutyWhere' | translate }}</span></td>
              <td class="py-2.5 text-right font-semibold tabular-nums">{{ money(r.taxes.duty.amount, r.currency) }}</td>
            </tr>
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'cost.IMPORT_VAT' | translate }} <span class="text-muted">{{ pct(r.taxes.vat.rate) }}</span>
                <span class="block text-xs text-muted">{{ 'portCost.vatWhere' | translate: { country: (r.taxes.vat.country | countryName: lang.locale()) } }}</span></td>
              <td class="py-2.5 text-right font-semibold tabular-nums">{{ money(r.taxes.vat.amount, r.currency) }}</td>
            </tr>
            @for (t of r.taxes.national; track t.code) {
              <tr class="border-b border-line">
                <td class="py-2.5 pr-3">{{ 'cost.' + t.code | translate }} <span class="text-muted">{{ pct(t.rate) }}</span>
                  <span class="block text-xs text-muted">{{ 'portCost.nationalWhere' | translate: { country: (t.country | countryName: lang.locale()) } }}</span></td>
                <td class="py-2.5 text-right font-semibold tabular-nums">{{ money(t.amount, r.currency) }}</td>
              </tr>
            }
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'portCost.portFees' | translate }}
                <span class="block text-xs text-muted">{{ 'portCost.portFeesWhat' | translate }}</span></td>
              <td class="py-2.5 text-right font-semibold tabular-nums">{{ money(r.taxes.portFees, r.currency) }}</td>
            </tr>
            <tr class="border-b border-line">
              <td class="py-2.5 pr-3">{{ 'portCost.delivery' | translate }}</td>
              <td class="py-2.5 text-right font-semibold tabular-nums"><span class="text-xs text-muted">{{ 'result.approx' | translate }}</span> {{ money(r.taxes.delivery, r.currency) }}</td>
            </tr>
            <tr>
              <td class="pt-3 font-extrabold">{{ 'result.totalWithCar' | translate }}</td>
              <td class="pt-3 text-right text-lg font-extrabold tabular-nums text-brand-text"><span class="text-xs text-muted">{{ 'result.approx' | translate }}</span> {{ money(r.taxes.totalWithCar, r.currency) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mt-3 text-xs text-muted">{{ 'result.estimateNote' | translate }}</p>
        <p class="mt-1 text-xs text-muted">{{ 'result.freeBase' | translate }}</p>
        @if (r.taxes.customsFxDate) {
          <p class="mt-1 text-xs text-muted">{{ 'result.customsFx' | translate: { date: r.taxes.customsFxDate } }}</p>
        }
      </section>

      <!-- the full cost: locked, right under the result -->
      <section class="theme-dark relative mt-6 overflow-hidden rounded-[4px] bg-panel p-6 text-fg sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-6">
          <div class="max-w-xl">
            <p class="eyebrow">{{ 'result.lockedEyebrow' | translate }}</p>
            <h3 class="mt-3 text-[26px] font-extrabold leading-tight">{{ 'result.lockedTitle' | translate }}</h3>
            <p class="mt-2 text-sm text-fg/75">{{ 'result.lockedLead' | translate: { count: r.lockedCount } }}</p>
          </div>
          <div class="w-full sm:w-auto">
            <button type="button" class="btn btn-primary w-full !py-3.5 text-base sm:w-auto" (click)="unlock.emit()">
              <app-icon name="lock" [size]="18" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
            </button>
            <p class="mt-2 text-center text-xs text-fg/60">{{ 'result.unlockNote' | translate }}</p>
            <p class="mt-3 text-center text-sm"><a [href]="'/samples/report-' + lang.current() + '.pdf'" target="_blank" rel="noopener" (click)="analytics.track('sample_report_opened')" class="text-brand inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"><app-icon name="document" [size]="15" /> {{ 'result.sample' | translate }}</a></p>
          </div>
        </div>
        <div class="mt-6 grid gap-3 sm:grid-cols-3" aria-hidden="true">
          @for (i of [0, 1, 2]; track i) {
            <div class="rounded-[4px] p-4" [class]="i === 1 ? 'bg-ink-2 ring-1 ring-brand' : 'border border-line'">
              <p class="text-[12px] font-semibold uppercase tracking-[0.06em]" [class]="i === 1 ? 'text-brand' : 'text-fg/60'">{{ 'scenario.' + i | translate }}</p>
              <p class="mt-2 select-none text-[28px] font-extrabold leading-none tabular-nums blur-[7px]">{{ fake(i + 7) }} {{ r.currency }}</p>
            </div>
          }
        </div>
        <ul class="mt-6 grid gap-2 text-sm text-fg/85 sm:grid-cols-2">
          @for (n of [1, 2, 3, 4, 5, 6]; track n) {
            <li class="flex gap-2.5"><app-icon name="check" [size]="16" class="mt-0.5 shrink-0 text-brand" />{{ 'result.reportItem' + n | translate }}</li>
          }
        </ul>
      </section>


      <!-- locked: everything else, by name only -->
      <section class="mt-10">
        <h3 class="text-lg font-extrabold">{{ 'result.lockedListTitle' | translate }}</h3>
        <div class="relative mt-4">
          <ul class="divide-y divide-line border-y border-line">
            @for (row of lockedRows().slice(0, 10); track row.code; let i = $index) {
              <li class="flex items-center justify-between gap-4 py-3 text-[15px]">
                <span class="flex items-center gap-2.5">
                  <app-icon name="lock" [size]="14" class="shrink-0 text-muted" />
                  {{ 'cost.' + row.code | translate }}
                  @if (row.risk) { <span class="badge">{{ 'result.riskTag' | translate }}</span> }
                </span>
                <span class="select-none font-bold tabular-nums blur-[6px]" aria-hidden="true">{{ fake(i) }} {{ r.currency }}</span>
              </li>
            }
            @if (lockedRows().length > 10) {
              <li class="flex items-center gap-2.5 py-3 text-[15px] font-semibold text-muted">
                <app-icon name="lock" [size]="14" /> {{ 'result.moreLocked' | translate: { count: lockedRows().length - 10 } }}
              </li>
            }
          </ul>
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent"></div>
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" class="btn btn-primary" (click)="unlock.emit()">
            <app-icon name="lock" [size]="17" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
          </button>
          <button type="button" class="btn btn-outline" (click)="partner.emit()">{{ 'result.partner' | translate }}</button>
        </div>
      </section>

      @if (r.warnings.length) {
        <section class="mt-10 space-y-2">
          @for (w of r.warnings; track w) {
            <p class="flex gap-2 rounded-[4px] border-l-2 border-brand bg-brand/8 px-4 py-3 text-sm"><app-icon name="info" [size]="16" class="mt-0.5 text-brand-text" />{{ w | translate }}</p>
          }
        </section>
      }
      <p class="mt-8 text-xs text-muted">{{ 'result.fx' | translate: { date: r.fxDate } }}</p>

      <!-- phones: the purchase always in reach -->
      <div class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 p-3 backdrop-blur md:hidden">
        <button type="button" class="btn btn-primary w-full" (click)="unlock.emit()">
          <app-icon name="lock" [size]="17" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
        </button>
      </div>
    }
  `,
})
export class StepResult {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly analytics = inject(AnalyticsService);
  private readonly translate = inject(TranslateService);
  protected readonly s = this.store.state;

  readonly unlock = output<void>();
  readonly partner = output<void>();
  readonly edit = output<number>();

  /** Every locked position (transport, delivery, registration, ...) and the risks, names only. */
  protected readonly lockedRows = computed(() => {
    const r = this.store.result();
    if (!r) {
      return [];
    }
    const order: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'];
    return [
      ...order.flatMap((c) => (r.lockedItems[c] ?? []).map((code) => ({ code, risk: false }))),
      ...r.risks.map((code) => ({ code, risk: true })),
    ];
  });

  protected readonly departure = computed(() => {
    const code = this.s().departurePort;
    return code ? (DEPARTURE_PORTS[code] ?? code) : this.translate.instant('result.cheapestPort');
  });

  protected readonly reportPrice = computed(() => reportPrice(this.s().displayCurrency, this.lang.locale()));

  /** A plausible-looking blurred figure - the real amounts are never sent to the browser before payment. */
  protected fake(seed: number): string {
    const n = 1000 + ((seed * 7919 + 3571) % 89) * 211;
    return new Intl.NumberFormat(this.lang.locale()).format(seed > 6 ? n * 7 : n);
  }

  protected pct(rate: number | null): string {
    return rate == null ? '' : new Intl.NumberFormat(this.lang.locale(), { style: 'percent', maximumFractionDigits: 2 }).format(rate);
  }

  /** The four parts of the total, as tiles above the detailed rows. */
  protected tiles(r: PublicQuoteView): { key: string; label: string; amount: number; estimate: boolean }[] {
    return [
      { key: 'car', label: 'result.tileCar', amount: r.taxes.carPrice, estimate: false },
      { key: 'transport', label: 'result.tileTransport', amount: r.taxes.transportToPort, estimate: true },
      { key: 'taxes', label: 'result.tileTaxes', amount: r.taxes.total, estimate: false },
      { key: 'delivery', label: 'result.tileDelivery', amount: r.taxes.delivery, estimate: true },
    ];
  }

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }
}
