import { Component, DestroyRef, computed, effect, inject, output, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CostCategory } from '../../../core/api/api.models';
import { reportPrice } from '../../../core/currency/currencies';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { AnalyticsService } from '../../../core/analytics/analytics.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { EstimateEmail } from '../estimate-email';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DEPARTURE_PORTS } from '../calculator.options';
import { SITE } from '../../../core/site.config';

/**
 * Step 6 - the free result. Free: the taxes anyone could work out on paper (duty, import VAT of the port country,
 * national tax of the destination, port fees). Locked and blurred: the door-to-door total in three scenarios and every
 * other position - the server does not send those amounts, the blurred figures are placeholders. The purchase sits at
 * the top and, on phones, in a bar that is always visible.
 */
@Component({
  selector: 'app-step-result',
  imports: [TranslatePipe, Icon, CountryNamePipe, EstimateEmail],
  template: `
    @if (store.calculating()) {
      <!-- skeleton of the result while the quote is calculated -->
      <div aria-busy="true">
        <!-- progress of the calculation, stage by stage -->
        <section class="card mb-6 p-6 sm:p-7" aria-live="polite">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="eyebrow">{{ 'result.progress.eyebrow' | translate }}</p>
              <p class="mt-2 text-lg font-extrabold">{{ 'result.calculating' | translate }}</p>
            </div>
            <p class="text-[34px] font-extrabold leading-none tabular-nums text-brand-text">{{ progress() }}%</p>
          </div>
          <div class="mt-4 h-2 overflow-hidden rounded-full bg-panel-2" role="progressbar" aria-valuemin="0" aria-valuemax="100" [attr.aria-valuenow]="progress()">
            <div class="h-full rounded-full bg-brand" [style.width.%]="progress()"></div>
          </div>
          <ol class="mt-5 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            @for (n of calcStages; track n; let i = $index) {
              @let state = stageState(i);
              <li class="flex items-center gap-2.5" [class.text-muted]="state === 'todo'">
                @if (state === 'done') {
                  <app-icon name="check-circle" [size]="18" class="shrink-0 text-success" />
                } @else if (state === 'active') {
                  <span class="size-[18px] shrink-0 animate-spin rounded-full border-[2.5px] border-line border-t-brand"></span>
                } @else {
                  <span class="size-[18px] shrink-0 rounded-full border-2 border-line"></span>
                }
                <span [class.font-semibold]="state === 'active'">{{ 'result.progress.s' + n | translate }}</span>
              </li>
            }
          </ol>
        </section>
        <div class="flex flex-wrap gap-3" aria-hidden="true">
          @for (w of [16, 28, 24, 20]; track $index) { <span class="skel h-4" [style.width.mm]="w"></span> }
        </div>
        <div class="mt-5 overflow-hidden rounded-[6px] border-2 border-line bg-panel" aria-hidden="true">
          <div class="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
            <div>
              <span class="skel h-3 w-24"></span>
              <span class="skel mt-4 h-5 w-48"></span>
              <span class="skel mt-3 h-12 w-64 max-w-full"></span>
              <span class="skel mt-4 h-4 w-56"></span>
              <span class="skel mt-4 h-3 w-full max-w-xl"></span>
              <span class="skel mt-2 h-3 w-3/4 max-w-md"></span>
            </div>
            <div class="rounded-[4px] bg-panel-2/60 p-5">
              <span class="skel h-5 w-44"></span>
              <span class="skel mt-3 h-3 w-full"></span>
              <span class="skel mt-2 h-3 w-4/5"></span>
              <span class="skel mt-4 h-12 w-full"></span>
              <span class="skel mx-auto mt-3 h-3 w-40"></span>
              <span class="skel mx-auto mt-2 h-3 w-48"></span>
            </div>
          </div>
          <div class="grid gap-3 border-t border-line px-6 py-6 sm:grid-cols-3 sm:px-7">
            @for (i of [0, 1, 2]; track i) {
              <div class="rounded-[4px] border border-line p-4"><span class="skel h-3 w-24"></span><span class="skel mt-3 h-7 w-36"></span></div>
            }
          </div>
        </div>
        <span class="skel mt-10 h-5 w-64" aria-hidden="true"></span>
        <ul class="mt-4 divide-y divide-line border-y border-line" aria-hidden="true">
          @for (w of [52, 40, 64, 46, 58, 36]; track $index) {
            <li class="flex items-center justify-between gap-4 py-3.5"><span class="skel h-4" [style.width.mm]="w"></span><span class="skel h-4 w-20"></span></li>
          }
        </ul>
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

      <!-- the result and the purchase in one card, above the fold: one rough number, the detail is what is sold -->
      <section class="mt-5 overflow-hidden rounded-[6px] border-2 border-brand bg-panel" aria-labelledby="result-total">
        <div class="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <p class="eyebrow">{{ 'result.freeEyebrow' | translate }}</p>
            <h3 id="result-total" class="mt-2 text-base font-bold text-fg/85">{{ 'result.totalWithCar' | translate }}</h3>
            <p class="mt-1 text-[clamp(2.2rem,6vw,3.2rem)] font-extrabold leading-none tabular-nums text-brand-text">
              <span class="mr-1 align-middle text-[0.45em] font-bold text-muted">{{ 'result.approx' | translate }}</span>{{ money(r.taxes.totalWithCar, r.currency) }}
            </p>
            @if (r.taxes.estimateMin != null && r.taxes.estimateMax != null) {
              <p class="mt-2 text-sm font-semibold text-fg/80">{{ 'result.span' | translate: { min: money(r.taxes.estimateMin, r.currency), max: money(r.taxes.estimateMax, r.currency) } }}</p>
            }
            <p class="mt-3 max-w-xl text-sm text-muted">{{ 'result.minimalNote' | translate }}</p>
          </div>
          <div class="rounded-[4px] bg-panel-2 p-5">
            <p class="font-extrabold leading-snug">{{ 'result.lockedTitle' | translate }}</p>
            <p class="mt-1 text-xs text-muted">{{ 'result.lockedLead' | translate: { count: r.lockedCount } }}</p>
            <button type="button" class="btn btn-primary mt-4 w-full !py-3.5 text-base" (click)="unlock.emit()">
              <app-icon name="lock" [size]="18" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
            </button>
            <p class="mt-2 text-center text-xs text-muted">{{ 'result.unlockNote' | translate }}</p>
            <p class="mt-2 flex items-center justify-center gap-1.5 text-center text-xs font-semibold"><app-icon name="shield" [size]="14" class="text-brand-text" /> {{ 'result.guarantee' | translate }}</p>
            <p class="mt-2 text-center text-sm"><a [href]="'/samples/report-' + lang.current() + '.pdf'" target="_blank" rel="noopener" (click)="analytics.track('sample_report_opened')" class="text-brand-text inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"><app-icon name="document" [size]="15" /> {{ 'result.sample' | translate }}</a></p>
          </div>
        </div>

        <!-- what the report adds, blurred -->
        <div class="theme-dark bg-panel px-6 py-6 text-fg sm:px-7">
          <div class="grid gap-3 sm:grid-cols-3" aria-hidden="true">
            @for (i of [0, 1, 2]; track i) {
              <div class="rounded-[4px] p-4" [class]="i === 1 ? 'bg-ink-2 ring-1 ring-brand' : 'border border-line'">
                <p class="text-[12px] font-semibold uppercase tracking-[0.06em]" [class]="i === 1 ? 'text-brand' : 'text-fg/60'">{{ 'scenario.' + i | translate }}</p>
                <p class="mt-2 select-none text-[26px] font-extrabold leading-none tabular-nums blur-[7px]">{{ fake(i + 7) }} {{ r.currency }}</p>
              </div>
            }
          </div>
          <ul class="mt-5 grid gap-2 text-sm text-fg/85 sm:grid-cols-2">
            @for (n of [1, 2, 3, 4, 5, 6]; track n) {
              <li class="flex gap-2.5"><app-icon name="check" [size]="16" class="mt-0.5 shrink-0 text-brand" />{{ 'result.reportItem' + n | translate }}</li>
            }
          </ul>
        </div>
      </section>

      @if (r.quoteId) {
        <app-estimate-email [quoteId]="r.quoteId" />
      }

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
          @if (partners) {
            <button type="button" class="btn btn-outline" (click)="partner.emit()">{{ 'result.partner' | translate }}</button>
          }
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
  protected readonly partners = SITE.partners;

  /** What the engine works through, shown ticking off while the quote is calculated. */
  protected readonly calcStages = [1, 2, 3, 4, 5, 6];
  protected readonly progress = signal(0);

  constructor() {
    let frame = 0;
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(frame));
    effect(() => {
      cancelAnimationFrame(frame);
      if (!this.store.calculating() || typeof requestAnimationFrame === 'undefined') {
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        // eases to 99% over the minimum duration; the result replaces the screen when the server has answered
        const t = Math.min((now - start) / CalculatorStore.CALC_MIN_MS, 1);
        this.progress.set(Math.min(99, Math.round(100 * (1 - Math.pow(1 - t, 2.2)))));
        if (this.store.calculating()) {
          frame = requestAnimationFrame(tick);
        }
      };
      this.progress.set(0);
      frame = requestAnimationFrame(tick);
    });
  }

  protected stageState(i: number): 'done' | 'active' | 'todo' {
    const per = 100 / this.calcStages.length;
    const p = this.progress();
    return p >= (i + 1) * per ? 'done' : p >= i * per ? 'active' : 'todo';
  }

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

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }
}
