import { Component, computed, inject, input, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CalculationResult, CostCategory, CostLine } from '../../core/api/api.models';
import { MoneyPipe } from '../../core/format/money.pipe';

const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION', 'RISK'];
/** Categorical slots in fixed order, one per category (light/dark values in styles.css). */
const COLOR: Record<CostCategory, string> = {
  VEHICLE: 'var(--cat-1)',
  TRANSPORT: 'var(--cat-2)',
  TAXES: 'var(--cat-3)',
  REGISTRATION: 'var(--cat-4)',
  RISK: 'var(--cat-5)',
};
const R = 74;
const C = 2 * Math.PI * R;
/** Surface gap between donut slices, in px along the ring. */
const GAP = 2.5;

interface Slice { category: CostCategory; amount: number; pct: number; dash: string; offset: number }
interface Tip { x: number; y: number; title: string; value: string }

/**
 * Charts on the bought report page: key figures, cost structure (donut), the scenarios as stacked bars, the largest
 * items and the timeline as a Gantt strip. Every mark has a hover tooltip and every chart sits next to its numbers.
 */
@Component({
  selector: 'app-report-charts',
  imports: [TranslatePipe, MoneyPipe],
  host: { class: 'block' },
  template: `
    <!-- key figures -->
    <section class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{{ 'report.charts.total' | translate }}</p>
        <p class="mt-2 text-[28px] font-extrabold leading-none tabular-nums text-brand-text">{{ main().total.amount | money: cur() : locale() }}</p>
      </div>
      <div class="card p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{{ 'report.charts.range' | translate }}</p>
        <p class="mt-2 text-xl font-extrabold tabular-nums">{{ low().total.amount | money: cur() : locale() }} – {{ high().total.amount | money: cur() : locale() }}</p>
      </div>
      <div class="card p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{{ 'report.charts.importCosts' | translate }}</p>
        <p class="mt-2 text-xl font-extrabold tabular-nums">{{ importCosts() | money: cur() : locale() }}</p>
        @if (importShare() !== null) {
          <p class="mt-1 text-sm text-muted">{{ 'report.charts.importShare' | translate: { pct: fmtPct(importShare()!) } }}</p>
        }
      </div>
      <div class="card p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{{ 'report.charts.leadTime' | translate }}</p>
        <p class="mt-2 text-xl font-extrabold tabular-nums">{{ main().timeline.totalMin }}–{{ main().timeline.totalMax }} {{ 'report.days' | translate }}</p>
      </div>
    </section>

    <section class="relative mt-5 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" (mouseleave)="tip.set(null)">
      <!-- cost structure -->
      <div class="card p-6">
        <h2 class="text-lg font-extrabold">{{ 'report.charts.structure' | translate }}</h2>
        <div class="mt-5 flex flex-col items-center gap-6 sm:flex-row lg:flex-col">
          <svg viewBox="0 0 180 180" class="size-48 shrink-0" role="img" [attr.aria-label]="'report.charts.structure' | translate">
            <g transform="rotate(-90 90 90)">
              @for (s of slices(); track s.category) {
                <circle cx="90" cy="90" [attr.r]="r" fill="none" [style.stroke]="color[s.category]"
                        [attr.stroke-width]="active() === s.category ? 22 : 18" [attr.stroke-dasharray]="s.dash"
                        [attr.stroke-dashoffset]="s.offset" class="cursor-pointer transition-[stroke-width] duration-150"
                        [style.opacity]="active() && active() !== s.category ? 0.45 : 1"
                        (mouseenter)="active.set(s.category)" (mouseleave)="active.set(null)" />
              }
            </g>
            @if (activeSlice(); as a) {
              <text x="90" y="84" text-anchor="middle" class="fill-[var(--muted)] text-[7.5px] font-semibold">{{ 'category.' + a.category | translate }}</text>
              <text x="90" y="101" text-anchor="middle" class="fill-[var(--fg)] text-[15px] font-extrabold">{{ fmtPct(a.pct) }}</text>
            } @else {
              <text x="90" y="84" text-anchor="middle" class="fill-[var(--muted)] text-[7.5px] font-semibold">{{ 'report.total' | translate }}</text>
              <text x="90" y="101" text-anchor="middle" class="fill-[var(--fg)] text-[13px] font-extrabold">{{ main().total.amount | money: cur() : locale() }}</text>
            }
          </svg>
          <ul class="w-full divide-y divide-line text-sm">
            @for (s of slices(); track s.category) {
              <li class="flex items-center gap-2.5 py-2 transition-colors" [class.bg-panel-2]="active() === s.category"
                  (mouseenter)="active.set(s.category)" (mouseleave)="active.set(null)">
                <span class="size-3 shrink-0 rounded-[3px]" [style.background]="color[s.category]"></span>
                <span class="min-w-0 flex-1">{{ 'category.' + s.category | translate }}</span>
                <span class="tabular-nums text-muted">{{ s.amount | money: cur() : locale() }}</span>
                <span class="w-14 text-right font-bold tabular-nums">{{ fmtPct(s.pct) }}</span>
              </li>
            }
          </ul>
        </div>
      </div>

      <div class="card p-6">
        @if (results().length === 3) {
          <h2 class="text-lg font-extrabold">{{ 'report.charts.scenarios' | translate }}</h2>
          <div class="mt-4 space-y-3">
            @for (res of results(); track $index; let i = $index) {
              <div class="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 text-sm">
                <span [class.font-bold]="i === 1">{{ 'scenario.' + i | translate }}</span>
                <div class="flex h-5">
                  @for (c of categories; track c) {
                    @if (res.totalsByCategory[c].amount > 0) {
                      <span class="h-full border-r-2 border-[var(--panel)] last:rounded-r-[4px] last:border-r-0 cursor-pointer"
                            [style.width.%]="res.totalsByCategory[c].amount / maxTotal() * 100" [style.background]="color[c]"
                            (mouseenter)="show($event, ['scenario.' + i, 'category.' + c], res.totalsByCategory[c].amount)"></span>
                    }
                  }
                </div>
                <span class="font-bold tabular-nums">{{ res.total.amount | money: cur() : locale() }}</span>
              </div>
            }
          </div>
          <div class="my-6 border-t border-line"></div>
        }

        <h2 class="text-lg font-extrabold">{{ 'report.charts.topItems' | translate }}</h2>
        <div class="mt-4 space-y-2.5">
          @for (it of topItems(); track it.line.code) {
            <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
              <span class="truncate" [title]="'cost.' + it.line.code | translate">{{ 'cost.' + it.line.code | translate }}</span>
              <div class="order-3 col-span-2 h-3.5 sm:order-none sm:col-span-1">
                <span class="block h-full cursor-pointer rounded-r-[4px]" [style.width.%]="it.amount / topMax() * 100" [style.background]="color[it.line.category]"
                      (mouseenter)="show($event, ['cost.' + it.line.code], it.amount)"></span>
              </div>
              <span class="order-2 whitespace-nowrap tabular-nums sm:order-none"><b>{{ it.amount | money: cur() : locale() }}</b>
                <span class="ml-1 text-xs text-muted">{{ fmtPct(it.amount / main().total.amount * 100) }}</span></span>
            </div>
          }
        </div>
        <p class="mt-5 text-xs text-muted">{{ 'report.charts.note' | translate: { cur: cur() } }}</p>
      </div>

      @if (tip(); as t) {
        <div class="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-[4px] border border-line bg-panel px-3 py-2 text-xs shadow-xl"
             [style.left.px]="t.x" [style.top.px]="t.y - 8">
          <span class="block text-muted">{{ t.title }}</span><b class="tabular-nums">{{ t.value }}</b>
        </div>
      }
    </section>

    <!-- timeline -->
    <section class="card mt-5 p-6">
      <h2 class="text-lg font-extrabold">{{ 'report.timeline' | translate }}: {{ main().timeline.totalMin }}–{{ main().timeline.totalMax }} {{ 'report.days' | translate }}</h2>
      <div class="mt-5 space-y-3">
        @for (g of gantt(); track g.code) {
          <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[minmax(0,15rem)_4.5rem_minmax(0,1fr)]">
            <span class="truncate">{{ 'timeline.' + g.code | translate }}</span>
            <span class="text-right tabular-nums text-muted">{{ g.min }}–{{ g.max }}</span>
            <div class="relative col-span-2 h-4 rounded-[4px] bg-panel-2 sm:col-span-1" [title]="g.min + '–' + g.max + ' ' + ('report.days' | translate)">
              <span class="absolute inset-y-0 rounded-l-[4px] bg-brand" [style.left.%]="g.offset" [style.width.%]="g.firm"></span>
              <span class="absolute inset-y-0 rounded-r-[4px] bg-brand/35" [style.left.%]="g.offset + g.firm" [style.width.%]="g.delay"></span>
            </div>
          </div>
        }
        <div class="grid gap-3 text-xs text-muted sm:grid-cols-[minmax(0,15rem)_4.5rem_minmax(0,1fr)]">
          <span class="hidden sm:block"></span><span class="hidden sm:block"></span>
          <div class="flex justify-between tabular-nums">
            @for (d of ticks(); track $index) { <span>{{ d }}</span> }
          </div>
        </div>
      </div>
      <p class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
        <span class="flex items-center gap-1.5"><span class="h-2.5 w-5 rounded-[2px] bg-brand"></span>{{ 'report.charts.firm' | translate }}</span>
        <span class="flex items-center gap-1.5"><span class="h-2.5 w-5 rounded-[2px] bg-brand/35"></span>{{ 'report.charts.delay' | translate }}</span>
        <span>{{ 'report.charts.axis' | translate }}</span>
      </p>
    </section>
  `,
})
export class ReportCharts {
  /** Optimistic / average / pessimistic, or just the average when the scenarios were not stored. */
  readonly results = input.required<CalculationResult[]>();
  readonly main = input.required<CalculationResult>();
  readonly locale = input.required<string>();

  private readonly translate = inject(TranslateService);
  protected readonly categories = CATEGORIES;
  protected readonly color = COLOR;
  protected readonly r = R;
  protected readonly active = signal<CostCategory | null>(null);
  protected readonly tip = signal<Tip | null>(null);

  protected readonly cur = computed(() => this.main().displayCurrency);
  protected readonly low = computed(() => this.results()[0]);
  protected readonly high = computed(() => this.results()[this.results().length - 1]);
  protected readonly maxTotal = computed(() => Math.max(...this.results().map((r) => r.total.amount), 1));

  private readonly vehicle = computed(() => this.main().totalsByCategory.VEHICLE?.amount ?? 0);
  protected readonly importCosts = computed(() => this.main().total.amount - this.vehicle());
  protected readonly importShare = computed(() => (this.vehicle() > 0 ? (this.importCosts() / this.vehicle()) * 100 : null));

  protected readonly slices = computed<Slice[]>(() => {
    const total = this.main().total.amount;
    const parts = CATEGORIES.map((c) => ({ c, amount: this.main().totalsByCategory[c]?.amount ?? 0 })).filter((p) => p.amount > 0);
    const gap = parts.length > 1 ? GAP : 0;
    let start = 0;
    return parts.map(({ c, amount }) => {
      const len = (amount / total) * C;
      const visible = Math.max(len - gap, 0.5);
      const slice = { category: c, amount, pct: (amount / total) * 100, dash: `${visible} ${C - visible}`, offset: -start };
      start += len;
      return slice;
    });
  });
  protected readonly activeSlice = computed(() => this.slices().find((s) => s.category === this.active()) ?? null);

  protected readonly topItems = computed(() =>
    this.main()
      .lines.filter((l) => l.line.includedInTotal && l.display.amount > 0)
      .map((l) => ({ line: l.line as CostLine, amount: l.display.amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8),
  );
  protected readonly topMax = computed(() => this.topItems()[0]?.amount || 1);

  protected readonly gantt = computed(() => {
    const t = this.main().timeline;
    const span = Math.max(t.totalMax, 1);
    let start = 0;
    return t.stages.map((s) => {
      const row = {
        code: s.code, min: s.minDays, max: s.maxDays,
        offset: (start / span) * 100, firm: (s.minDays / span) * 100, delay: ((s.maxDays - s.minDays) / span) * 100,
      };
      start += s.minDays;
      return row;
    });
  });
  protected readonly ticks = computed(() => {
    const max = this.main().timeline.totalMax;
    return [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
  });

  protected fmtPct(v: number): string {
    return new Intl.NumberFormat(this.locale(), { maximumFractionDigits: 1 }).format(v) + ' %';
  }

  protected show(e: MouseEvent, keys: string[], amount: number): void {
    const title = keys.map((k) => this.translate.instant(k)).join(' · ');
    const target = e.target as HTMLElement;
    const box = target.closest('section')!.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const value = new Intl.NumberFormat(this.locale(), { style: 'currency', currency: this.cur(), maximumFractionDigits: 0 }).format(amount);
    this.tip.set({ x: r.left + r.width / 2 - box.left, y: r.top - box.top, title, value });
  }
}
