import { Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs';
import { CostCategory } from '../../../core/api/api.models';
import { LanguageService } from '../../../core/i18n/language.service';
import { CountUpDirective } from '../../../shared/count-up.directive';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { CATEGORY_COLORS, CostDonut } from './cost-donut';

const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'];

/** Sticky free-tier result: animated range, donut, transit time, warnings and the two monetization CTAs. */
@Component({
  selector: 'app-live-result-panel',
  imports: [TranslatePipe, CountUpDirective, CostDonut, Icon],
  template: `
    <aside class="result-card" [class.result-card--loading]="store.loading()" aria-live="polite">
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{{ 'result.title' | translate }}</p>
        @if (store.loading()) { <span class="text-[11px] text-brand">{{ 'result.updating' | translate }}</span> }
      </div>

      @if (store.preview(); as p) {
        <div class="mt-3 flex flex-wrap items-baseline gap-x-2 text-[32px] font-extrabold leading-tight tracking-tight text-brand tabular-nums">
          <span [appCountUp]="p.rangeMin" [currency]="p.currency" [locale]="lang.locale()"></span>
          <span class="text-white/40">–</span>
          <span [appCountUp]="p.rangeMax" [currency]="p.currency" [locale]="lang.locale()"></span>
        </div>
        <p class="mt-1 text-[13px] text-white/55">{{ 'result.rangeHint' | translate }}</p>

        <div class="mt-6 grid grid-cols-[8.5rem_1fr] items-center gap-5">
          <app-cost-donut [shares]="p.sharePercent" [labels]="labels()" [ariaLabel]="'result.chart' | translate" />
          <ul class="space-y-2.5 text-sm">
            @for (c of categories; track c) {
              <li class="flex items-center justify-between gap-2">
                <span class="flex items-center gap-2 text-white/80"><span class="size-2.5 shrink-0 rounded-[2px]" [style.background]="colors[c]"></span>{{ labels()[c] }}</span>
                <span class="font-bold tabular-nums">{{ p.sharePercent[c] }}%</span>
              </li>
            }
          </ul>
        </div>

        <div class="mt-5 flex flex-wrap gap-2 text-xs text-white/75">
          <span class="inline-flex items-center gap-1.5 rounded-[3px] bg-white/8 px-2.5 py-1"><app-icon name="ship" [size]="14" />{{ 'result.transit' | translate: { days: p.transitDays } }}</span>
          <span class="inline-flex items-center gap-1.5 rounded-[3px] bg-white/8 px-2.5 py-1"><app-icon name="exchange" [size]="14" />{{ 'result.fx' | translate: { date: p.fxDate } }}</span>
          @if (p.exciseApplies) {
            <span class="inline-flex items-center gap-1.5 rounded-[3px] bg-white/8 px-2.5 py-1"><app-icon name="receipt" [size]="14" />{{ 'result.exciseIncluded' | translate }}</span>
          }
        </div>

        @for (w of p.warnings; track w) {
          <p class="mt-3 flex gap-2 rounded-[4px] border border-brand/30 bg-brand/10 px-3 py-2 text-xs leading-relaxed text-white/85" animate.enter="reveal-enter">
            <app-icon name="info" [size]="15" class="mt-px text-brand" /> {{ w | translate }}
          </p>
        }

        <div class="mt-6 border-t border-white/10 pt-6">
          <button type="button" class="btn btn-primary w-full" (click)="unlock.emit()">
            <app-icon name="lock" [size]="17" /> {{ 'result.unlock' | translate: { price: reportPrice() } }}
          </button>
          <ul class="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] text-white/65">
            @for (n of [1, 2, 3, 4]; track n) {
              <li class="flex items-center gap-1.5"><app-icon name="check" [size]="13" class="text-brand" />{{ 'result.paid' + n | translate }}</li>
            }
          </ul>
          <button type="button" class="btn mt-5 w-full border border-white/25 text-white hover:border-white/50 hover:bg-white/5" (click)="partner.emit()">
            <app-icon name="handshake" [size]="17" /> {{ 'result.partner' | translate }}
          </button>
        </div>
      } @else if (store.error(); as e) {
        <p class="mt-4 flex gap-2 rounded-[4px] bg-danger/20 p-3 text-sm"><app-icon name="warning" [size]="18" />{{ e.messageKey ? (e.messageKey | translate) : e.detail }}</p>
      } @else {
        <div class="mt-4 space-y-4" aria-hidden="true">
          <div class="h-10 w-4/5 animate-pulse rounded-[4px] bg-white/10"></div>
          <div class="h-32 w-32 animate-pulse rounded-full bg-white/10"></div>
          <div class="h-12 animate-pulse rounded-[4px] bg-white/10"></div>
        </div>
      }
    </aside>
  `,
  host: { ngSkipHydration: 'true' },
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

  protected readonly reportPrice = computed(() => {
    const c = this.store.state().displayCurrency;
    return c === 'PLN' ? '19 zł' : c === 'EUR' ? '4,99 €' : '$5.49';
  });
}
