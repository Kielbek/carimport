import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { guidePath } from '../../core/routing/guide-paths';
import { MODEL_EU } from './model-data.generated';
import { GuideModel, ModelExample } from './model-types';

interface Part { key: string; label: string; amount: number; color: string }

/** Below this many years a car is not a "classic" for the notes. */
const CLASSIC_AGE = 30;
const CURRENT_YEAR = 2026;

/**
 * The detailed half of a model page: where the money goes (stacked bar), the total at other purchase prices, the
 * same car in every EU country and the things to check for this kind of car. All figures come from the generated
 * examples (real engine runs), so every page carries its own numbers rather than shared boilerplate.
 */
@Component({
  selector: 'app-model-details',
  imports: [RouterLink, TranslatePipe],
  host: { class: 'block' },
  template: `
    <!-- where the money goes -->
    <section class="mt-14">
      <h2 class="text-2xl font-extrabold">{{ 'guide.model.breakdownTitle' | translate: params() }}</h2>
      <div class="mt-5 flex h-4 overflow-hidden rounded-full" role="img" [attr.aria-label]="'guide.model.breakdownTitle' | translate: params()">
        @for (p of parts(); track p.key) {
          <span class="h-full border-r-2 border-bg last:border-r-0" [style.width.%]="p.amount / example().total * 100" [style.background]="p.color" [title]="p.label"></span>
        }
      </div>
      <ul class="mt-5 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
        @for (p of parts(); track p.key) {
          <li class="flex items-center gap-3 border-b border-line pb-2.5">
            <span class="size-2.5 shrink-0 rounded-[2px]" [style.background]="p.color"></span>
            <span class="min-w-0 flex-1">{{ p.label }}</span>
            <span class="tabular-nums text-muted">{{ money(p.amount) }}</span>
            <span class="w-12 text-right font-bold tabular-nums">{{ pct(p.amount / example().total * 100) }}</span>
          </li>
        }
      </ul>
    </section>

    <!-- other purchase prices -->
    <section class="mt-14">
      <h2 class="text-2xl font-extrabold">{{ 'guide.model.priceTitle' | translate: params() }}</h2>
      <p class="mt-3 max-w-3xl text-fg/85">{{ 'guide.model.priceLead' | translate: params() }}</p>
      <table class="mt-5 w-full max-w-2xl text-[15px]">
        <thead class="text-left text-[11px] uppercase tracking-[0.12em] text-muted">
          <tr class="border-b border-fg"><th class="pb-2 font-semibold">{{ 'guide.model.priceCol' | translate: params() }}</th><th class="pb-2 text-right font-semibold">{{ 'guide.model.totalCol' | translate: params() }}</th></tr>
        </thead>
        <tbody class="divide-y divide-line">
          @for (s of example().steps; track $index) {
            <tr [class.font-extrabold]="$index === 1">
              <td class="py-3 tabular-nums">{{ moneyIn(s[0], originCurrency()) }}@if ($index === 1) { <span class="ml-2 text-xs font-semibold text-brand-text">{{ 'guide.model.typical' | translate }}</span> }</td>
              <td class="py-3 text-right tabular-nums">≈ {{ money(s[1]) }}</td>
            </tr>
          }
        </tbody>
      </table>
    </section>

    <!-- the same car across the EU -->
    <section class="mt-14">
      <h2 class="text-2xl font-extrabold">{{ 'guide.model.euTitle' | translate: params() }}</h2>
      <p class="mt-3 max-w-3xl text-fg/85">{{ 'guide.model.euLead' | translate: euParams() }}</p>
      <ol class="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
        @for (c of eu(); track c.code; let i = $index) {
          <li class="grid grid-cols-[1.5rem_minmax(0,9rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-[4px] px-2 py-1.5 text-sm"
              [class.bg-brand/15]="c.code === destination()" [class.font-bold]="c.code === destination()">
            <span class="text-right text-xs tabular-nums text-muted">{{ c.unpriced ? '–' : c.rank }}</span>
            <a [routerLink]="countryLink(c.code)" class="truncate hover:text-brand-text hover:underline">{{ countryName(c.code) }}{{ c.unpriced ? ' *' : '' }}</a>
            <span class="h-2 rounded-full bg-panel-2"><span class="block h-full rounded-full" [class]="c.unpriced ? 'bg-line-strong' : 'bg-brand'" [style.width.%]="c.total / euMax() * 100"></span></span>
            <span class="text-right tabular-nums">{{ eur(c.total) }}</span>
          </li>
        }
      </ol>
      <p class="mt-4 text-xs text-muted">{{ 'guide.model.euNote' | translate }}</p>
    </section>

    <!-- what to check for this car -->
    @if (tips().length) {
      <section class="mt-14">
        <h2 class="text-2xl font-extrabold">{{ 'guide.model.tipsTitle' | translate: params() }}</h2>
        <ul class="mt-5 grid gap-4 md:grid-cols-2">
          @for (t of tips(); track t) {
            <li class="card p-5">
              <p class="font-bold">{{ 'guide.model.tips.' + t + '.title' | translate: params() }}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-fg/80">{{ 'guide.model.tips.' + t + '.text' | translate: params() }}</p>
            </li>
          }
        </ul>
      </section>
    }
  `,
})
export class ModelDetails {
  readonly model = input.required<GuideModel>();
  readonly example = input.required<ModelExample>();
  readonly params = input.required<Record<string, unknown>>();
  /** Country the page is priced for. */
  readonly destination = input.required<string>();
  readonly originCurrency = input.required<string>();

  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  protected readonly parts = computed<Part[]>(() => {
    this.lang.current();
    const e = this.example();
    const t = (k: string, p?: Record<string, unknown>) => this.translate.instant(k, p) as string;
    const list: Part[] = [
      { key: 'price', label: t('guide.model.table.price'), amount: e.price, color: 'var(--cat-1)' },
      { key: 'transport', label: t('guide.model.table.transport'), amount: e.transport, color: 'var(--cat-2)' },
      { key: 'duty', label: t('guide.model.table.duty'), amount: e.duty, color: 'var(--cat-3)' },
      { key: 'vat', label: t('guide.model.table.vat', this.params()), amount: e.vat, color: 'color-mix(in srgb, var(--cat-3) 55%, var(--panel))' },
      ...e.national.map((n) => ({ key: n.code, label: t(`cost.${n.code}`), amount: n.amount, color: 'var(--cat-4)' })),
      { key: 'registration', label: t('guide.model.table.registration'), amount: e.registration, color: 'var(--cat-5)' },
      { key: 'other', label: t('guide.model.table.other'), amount: e.other, color: 'var(--line)' },
    ];
    return list.filter((p) => p.amount > 0);
  });

  /** The EU comparison, cheapest first; countries with an unestimated registration tax at the end. */
  protected readonly eu = computed(() => {
    const rows = Object.entries(MODEL_EU[this.model().id] ?? {}).map(([code, c]) => ({ code, ...c, rank: 0 }));
    const priced = rows.filter((r) => !r.unpriced).sort((a, b) => a.total - b.total);
    priced.forEach((r, i) => (r.rank = i + 1));
    return [...priced, ...rows.filter((r) => r.unpriced).sort((a, b) => a.total - b.total)];
  });
  protected readonly euMax = computed(() => Math.max(...this.eu().map((c) => c.total), 1));
  protected readonly euParams = computed(() => {
    const priced = this.eu().filter((c) => !c.unpriced);
    const cheapest = priced[0];
    const priciest = priced[priced.length - 1];
    return {
      ...this.params(),
      cheapest: cheapest ? this.countryName(cheapest.code) : '',
      cheapestTotal: cheapest ? this.eur(cheapest.total) : '',
      priciest: priciest ? this.countryName(priciest.code) : '',
      priciestTotal: priciest ? this.eur(priciest.total) : '',
    };
  });

  /** Notes that apply to this car: by origin, drive, body, age and emissions. */
  protected readonly tips = computed(() => {
    const m = this.model();
    const list: string[] = [];
    if (m.origin === 'USA' || m.origin === 'CANADA') {
      list.push('usaLights', 'usaTitle');
    }
    if (m.origin === 'JAPAN') {
      list.push('japanRhd', 'japanSheet');
    }
    if (m.origin === 'UAE') {
      list.push('uaeGcc');
    }
    if (m.fuel === 'EV') {
      list.push('ev');
    }
    if (m.category === 'PICKUP_TRUCK') {
      list.push('pickup');
    }
    if (CURRENT_YEAR - m.year >= CLASSIC_AGE) {
      list.push('classic');
    }
    if (m.co2 >= 250) {
      list.push('highCo2');
    }
    return list;
  });

  protected countryLink(code: string): string {
    return guidePath({ section: 'countries', item: code }, this.lang.current());
  }

  protected countryName(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(code) ?? code;
  }

  protected money(amount: number): string {
    return this.moneyIn(amount, this.example().currency);
  }

  protected eur(amount: number): string {
    return this.moneyIn(amount, 'EUR');
  }

  protected moneyIn(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  protected pct(v: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { maximumFractionDigits: 0 }).format(v) + ' %';
  }
}
