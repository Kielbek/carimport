import { Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs';
import { CostCategory } from '../../../core/api/api.models';
import { LanguageService } from '../../../core/i18n/language.service';
import { CountUpDirective } from '../../../shared/count-up.directive';
import { CalculatorStore } from '../calculator.store';
import { CATEGORY_COLORS, CostDonut } from './cost-donut';

const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'];

/** Sticky free-tier result: animated range, donut, transit time, warnings and the two monetization CTAs. */
@Component({
  selector: 'app-live-result-panel',
  imports: [TranslatePipe, CountUpDirective, CostDonut],
  template: `
    <aside class="result-card" [class.result-card--loading]="store.loading()" aria-live="polite">
      <p class="text-xs font-semibold uppercase tracking-widest text-indigo-200">{{ 'result.title' | translate }}</p>

      @if (store.preview(); as p) {
        <div class="mt-3 flex flex-wrap items-baseline gap-x-2 text-3xl font-extrabold tabular-nums sm:text-4xl">
          <span [appCountUp]="p.rangeMin" [currency]="p.currency" [locale]="lang.locale()"></span>
          <span class="text-indigo-300">–</span>
          <span [appCountUp]="p.rangeMax" [currency]="p.currency" [locale]="lang.locale()"></span>
        </div>
        <p class="mt-1 text-sm text-indigo-200">{{ 'result.rangeHint' | translate }}</p>

        <div class="mt-6 grid grid-cols-[9rem_1fr] items-center gap-4">
          <app-cost-donut [shares]="p.sharePercent" [labels]="labels()" [ariaLabel]="'result.chart' | translate" />
          <ul class="space-y-2 text-sm">
            @for (c of categories; track c) {
              <li class="flex items-center justify-between gap-2">
                <span class="flex items-center gap-2">
                  <span class="size-2.5 rounded-full" [style.background]="colors[c]"></span>{{ labels()[c] }}
                </span>
                <span class="font-semibold tabular-nums">{{ p.sharePercent[c] }}%</span>
              </li>
            }
          </ul>
        </div>

        <div class="mt-5 flex flex-wrap gap-2 text-xs">
          <span class="pill">🚢 {{ 'result.transit' | translate: { days: p.transitDays } }}</span>
          <span class="pill">💱 {{ 'result.fx' | translate: { date: p.fxDate } }}</span>
          @if (p.exciseApplies) {
            <span class="pill">🧾 {{ 'result.exciseIncluded' | translate }}</span>
          }
        </div>

        @for (w of p.warnings; track w) {
          <p class="mt-3 rounded-lg bg-amber-400/15 px-3 py-2 text-xs text-amber-100">⚠️ {{ w | translate }}</p>
        }

        <div class="mt-6 space-y-3">
          <button type="button" class="cta-primary w-full" (click)="unlock.emit()">
            🔓 {{ 'result.unlock' | translate: { price: reportPrice() } }}
          </button>
          <ul class="grid grid-cols-2 gap-1 text-[11px] text-indigo-200">
            <li>✓ {{ 'result.paid1' | translate }}</li>
            <li>✓ {{ 'result.paid2' | translate }}</li>
            <li>✓ {{ 'result.paid3' | translate }}</li>
            <li>✓ {{ 'result.paid4' | translate }}</li>
          </ul>
          <button type="button" class="cta-secondary w-full" (click)="partner.emit()">
            🤝 {{ 'result.partner' | translate }}
          </button>
        </div>
      } @else if (store.error(); as e) {
        <p class="mt-4 rounded-lg bg-rose-500/20 p-3 text-sm">{{ e.messageKey ? (e.messageKey | translate) : e.detail }}</p>
      } @else {
        <div class="mt-4 space-y-3">
          <div class="h-10 w-3/4 animate-pulse rounded-lg bg-white/10"></div>
          <div class="h-36 animate-pulse rounded-full bg-white/10"></div>
        </div>
      }
    </aside>
  `,
})
export class LiveResultPanel {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  readonly unlock = output<void>();
  readonly partner = output<void>();

  protected readonly categories = CATEGORIES;
  protected readonly colors = CATEGORY_COLORS;

  /** Category labels re-resolved on every language change (feeds the chart legend/tooltips). */
  protected readonly labels = toSignal(
    this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.translate.stream(CATEGORIES.map((c) => `category.${c}`))),
      map((t: Record<string, string>) =>
        Object.fromEntries(CATEGORIES.map((c) => [c, t[`category.${c}`]])) as Record<CostCategory, string>,
      ),
    ),
    { initialValue: { VEHICLE: '', TRANSPORT: '', TAXES: '', REGISTRATION: '' } },
  );

  protected readonly reportPrice = computed(() =>
    this.store.state().displayCurrency === 'PLN' ? '19 zł' : this.store.state().displayCurrency === 'EUR' ? '4,99 €' : '$5.49',
  );
}
