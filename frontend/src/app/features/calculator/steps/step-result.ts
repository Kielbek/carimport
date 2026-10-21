import { Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs';
import { CostCategory } from '../../../core/api/api.models';
import { LanguageService } from '../../../core/i18n/language.service';
import { CountUpDirective } from '../../../shared/count-up.directive';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DEPARTURE_PORTS, FALLBACK_PORTS } from '../calculator.options';
import { CATEGORY_COLORS, CostDonut } from '../result/cost-donut';

const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION', 'RISK'];

/**
 * Step 6 - the free result: three scenarios, structure, lead time, everything included (names), risks considered
 * (with probability), then the paid report and the partner CTA. Amounts per line are only in the paid report.
 */
@Component({
  selector: 'app-step-result',
  imports: [TranslatePipe, CountUpDirective, Icon, CostDonut],
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
        <span>{{ euPort() }}</span>
        <app-icon name="arrow-right" [size]="14" />
        <span>{{ s().destinationCountry }}</span>
        @if (r.deliveryKm) { <span>· {{ r.deliveryKm }} km</span> }
      </p>

      <!-- scenarios -->
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        @for (sc of scenarios; track sc.key; let i = $index) {
          <div class="rounded-[4px] p-6" [class]="i === 1 ? 'bg-ink-2 text-white ring-1 ring-brand' : 'border border-line'">
            <p class="text-[13px] font-semibold uppercase tracking-[0.06em]" [class]="i === 1 ? 'text-brand' : 'text-muted'">{{ 'scenario.' + i | translate }}</p>
            <p class="mt-3 text-[30px] font-extrabold leading-none tabular-nums" [class.text-brand]="i === 1">
              <span [appCountUp]="r.scenarios[sc.key]" [currency]="r.currency" [locale]="lang.locale()"></span>
            </p>
            <p class="mt-3 text-xs leading-relaxed" [class]="i === 1 ? 'text-white/70' : 'text-muted'">{{ 'scenarioHint.' + i | translate }}</p>
          </div>
        }
      </div>

      <!-- structure + timeline -->
      <div class="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h3 class="text-lg font-extrabold">{{ 'result.structure' | translate }}</h3>
          <div class="mt-5 grid grid-cols-[8rem_1fr] items-center gap-6">
            <app-cost-donut [shares]="r.sharePercent" [labels]="labels()" [ariaLabel]="'result.chart' | translate" />
            <ul class="space-y-2.5 text-sm">
              @for (c of categories; track c) {
                <li class="flex items-center justify-between gap-2">
                  <span class="flex items-center gap-2"><span class="size-2.5 shrink-0 rounded-[2px]" [style.background]="colors[c]"></span>{{ labels()[c] }}</span>
                  <span class="font-bold tabular-nums">{{ r.sharePercent[c] }}%</span>
                </li>
              }
            </ul>
          </div>
        </section>
        <section>
          <h3 class="text-lg font-extrabold">{{ 'result.timeline' | translate: { min: r.timeline.totalMin, max: r.timeline.totalMax } }}</h3>
          <ol class="mt-5 space-y-3">
            @for (st of r.timeline.stages; track st.code) {
              <li>
                <div class="flex justify-between text-sm"><span>{{ 'timeline.' + st.code | translate }}</span>
                  <span class="font-semibold tabular-nums">{{ st.minDays }}–{{ st.maxDays }} {{ 'report.days' | translate }}</span></div>
                <div class="mt-1.5 h-1.5 rounded-full bg-line">
                  <div class="h-full rounded-full bg-brand" [style.width.%]="(st.maxDays / r.timeline.totalMax) * 100"></div>
                </div>
              </li>
            }
          </ol>
        </section>
      </div>

      <!-- included -->
      <section class="mt-12">
        <h3 class="text-lg font-extrabold">{{ 'result.included' | translate }}</h3>
        <div class="mt-5 grid gap-6 md:grid-cols-2">
          @for (c of itemCategories(); track c) {
            <div>
              <p class="label">{{ 'category.' + c | translate }}</p>
              <ul class="space-y-1.5 text-sm">
                @for (code of r.includedItems[c]; track code) {
                  <li class="flex gap-2"><app-icon name="check" [size]="16" class="mt-0.5 text-brand-text" />{{ 'cost.' + code | translate }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </section>

      <!-- risks -->
      @if (r.risks.length) {
        <section class="mt-12">
          <h3 class="text-lg font-extrabold">{{ 'result.risks' | translate }}</h3>
          <p class="mt-2 text-sm text-muted">{{ 'result.risksLead' | translate }}</p>
          <ul class="mt-5 divide-y divide-line border-y border-line">
            @for (risk of r.risks; track risk.code) {
              <li class="grid gap-2 py-4 sm:grid-cols-[1fr_180px] sm:items-center">
                <div>
                  <p class="font-semibold">{{ 'cost.' + risk.code | translate }}</p>
                  <p class="mt-0.5 text-xs text-muted">{{ 'riskInfo.' + risk.code | translate }}</p>
                </div>
                <div>
                  <div class="flex justify-between text-xs"><span class="text-muted">{{ 'result.probability' | translate }}</span><span class="font-bold">{{ risk.probabilityPercent }}%</span></div>
                  <div class="mt-1 h-1.5 rounded-full bg-line"><div class="h-full rounded-full bg-brand" [style.width.%]="risk.probabilityPercent"></div></div>
                </div>
              </li>
            }
          </ul>
        </section>
      }

      @if (r.warnings.length) {
        <section class="mt-10 space-y-2">
          @for (w of r.warnings; track w) {
            <p class="flex gap-2 rounded-[4px] border-l-2 border-brand bg-brand/8 px-4 py-3 text-sm"><app-icon name="info" [size]="16" class="mt-0.5 text-brand-text" />{{ w | translate }}</p>
          }
        </section>
      }

      <!-- paid report -->
      <section class="theme-dark mt-12 grid gap-8 rounded-[4px] bg-panel p-7 text-fg sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p class="eyebrow">{{ 'result.reportEyebrow' | translate }}</p>
          <h3 class="mt-4 text-[28px] font-extrabold leading-tight">{{ 'result.reportTitle' | translate }}</h3>
          <ul class="mt-6 space-y-2.5 text-sm text-fg/85">
            @for (n of [1, 2, 3, 4, 5, 6]; track n) {
              <li class="flex gap-3"><app-icon name="check" [size]="18" class="text-brand" />{{ 'result.reportItem' + n | translate }}</li>
            }
          </ul>
        </div>
        <div class="space-y-3">
          <button type="button" class="btn btn-primary w-full" (click)="unlock.emit()">
            <app-icon name="lock" [size]="17" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
          </button>
          <button type="button" class="btn btn-outline w-full" (click)="partner.emit()">{{ 'result.partner' | translate }}</button>
          <p class="pt-2 text-center text-xs text-fg/60">{{ 'result.fx' | translate: { date: r.fxDate } }}</p>
        </div>
      </section>
    }
  `,
})
export class StepResult {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  protected readonly s = this.store.state;

  readonly unlock = output<void>();
  readonly partner = output<void>();
  readonly edit = output<number>();

  protected readonly categories = CATEGORIES;
  protected readonly colors = CATEGORY_COLORS;
  protected readonly scenarios = [{ key: 'optimistic' }, { key: 'average' }, { key: 'pessimistic' }] as const;

  protected readonly itemCategories = computed(() =>
    (['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'] as CostCategory[]).filter(
      (c) => this.store.result()?.includedItems[c]?.length,
    ),
  );
  protected readonly departure = computed(() => {
    const code = this.s().departurePort;
    return code ? (DEPARTURE_PORTS[code] ?? code) : this.translate.instant('result.cheapestPort');
  });
  protected readonly euPort = computed(() => FALLBACK_PORTS.find((p) => p.code === this.s().euPortCode)?.name ?? this.s().euPortCode);

  protected readonly labels = toSignal(
    this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.translate.stream(CATEGORIES.map((c) => `category.${c}`))),
      map((t: Record<string, string>) =>
        Object.fromEntries(CATEGORIES.map((c) => [c, t[`category.${c}`]])) as Record<CostCategory, string>,
      ),
    ),
    { initialValue: { VEHICLE: '', TRANSPORT: '', TAXES: '', REGISTRATION: '', RISK: '' } },
  );

  protected readonly reportPrice = computed(() => {
    const c = this.s().displayCurrency;
    return c === 'PLN' ? '19 zł' : c === 'EUR' ? '4,99 €' : '$5.49';
  });
}
