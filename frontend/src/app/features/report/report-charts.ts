import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CalculationResult, CostCategory, CostLine } from '../../core/api/api.models';
import { MoneyPipe } from '../../core/format/money.pipe';
import { Icon } from '../../shared/icon/icon';

const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION', 'RISK'];
/** The brand's restrained palette (ink, graphite, gold, steel, mist; dark-mode steps in styles.css), as in the PDF. */
export const CATEGORY_COLOR: Record<CostCategory, string> = {
  VEHICLE: 'var(--cat-1)',
  TRANSPORT: 'var(--cat-2)',
  TAXES: 'var(--cat-3)',
  REGISTRATION: 'var(--cat-4)',
  RISK: 'var(--cat-5)',
};
const R = 78;
const C = 2 * Math.PI * R;
/** Surface gap between ring slices, in px along the ring. */
const GAP = 3;

interface Slice { category: CostCategory; amount: number; pct: number; dash: string; offset: number }
interface Tip { x: number; y: number; title: string; value: string }

/** Numbered section heading shared by the report page. */
@Component({
  selector: 'app-report-heading',
  host: { class: 'block' },
  template: `
    <h2 class="flex items-baseline gap-3 border-b border-fg pb-3 text-[22px] font-extrabold tracking-tight sm:text-2xl">
      <span class="text-sm font-extrabold tabular-nums text-brand-text">{{ no() }}</span><ng-content />
    </h2>
  `,
})
export class ReportHeading {
  readonly no = input.required<string>();
}

/**
 * The top of the bought report: a dark cover with the total, where it sits between the optimistic and the pessimistic
 * scenario and the key figures, then the cost structure (ring) and the largest items. Every mark has a hover state.
 */
@Component({
  selector: 'app-report-charts',
  imports: [TranslatePipe, MoneyPipe, Icon, ReportHeading],
  host: { class: 'block' },
  template: `
    <!-- cover -->
    <section class="theme-dark relative overflow-hidden rounded-[10px] bg-[#101011] px-6 py-8 text-fg sm:px-10 sm:py-11">
      <div class="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/10 blur-3xl"></div>
      <div class="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{{ 'report.cover.eyebrow' | translate }} · {{ 'report.cover.order' | translate: { ref: reference() } }}</p>
          <h1 class="mt-3 text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight">{{ 'report.title' | translate }}</h1>
          <p class="mt-2 text-sm text-fg/60">{{ main().route.departurePort }} → {{ main().route.euPortName }} · HS {{ main().hsCode }} · {{ main().calculationDate }}</p>
        </div>
        <button type="button" class="btn btn-primary shrink-0" [disabled]="!ready()" (click)="download.emit()">
          <app-icon name="download" [size]="18" /> {{ ready() ? ('report.download' | translate) : ('report.generating' | translate) }}
        </button>
      </div>

      <div class="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">{{ 'report.charts.total' | translate }}</p>
          <p class="mt-2 text-[clamp(2.6rem,7vw,4.2rem)] font-extrabold leading-none tracking-tight tabular-nums text-brand">{{ main().total.amount | money: cur() : locale() }}</p>
        </div>
        @if (results().length === 3) {
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">{{ 'report.charts.rangeTitle' | translate }}</p>
            <div class="relative mt-4 h-[96px]">
              <div class="absolute top-0 w-36 -translate-x-1/2 text-center text-xs text-fg/50" [style.left.%]="gauge().label">{{ 'scenario.1' | translate }}<b class="block text-sm text-brand tabular-nums">{{ main().total.amount | money: cur() : locale() }}</b></div>
              <div class="absolute inset-x-0 top-[47px] h-[3px] rounded-full bg-white/15"></div>
              <div class="absolute left-0 top-10 h-[17px] w-px bg-white/40"></div>
              <div class="absolute right-0 top-10 h-[17px] w-px bg-white/40"></div>
              <div class="absolute top-10 size-[17px] -translate-x-1/2 rounded-full border-[3px] border-[#101011] bg-brand shadow-[0_0_0_4px_rgb(255_198_26/0.18)]"
                   [style.left.%]="gauge().position"></div>
              <div class="absolute left-0 top-[66px] text-xs text-fg/50">{{ 'scenario.0' | translate }}<b class="block text-sm text-fg tabular-nums">{{ low().total.amount | money: cur() : locale() }}</b></div>
              <div class="absolute right-0 top-[66px] text-right text-xs text-fg/50">{{ 'scenario.2' | translate }}<b class="block text-sm text-fg tabular-nums">{{ high().total.amount | money: cur() : locale() }}</b></div>
            </div>
          </div>
        }
      </div>

      <dl class="relative mt-10 grid gap-x-8 gap-y-6 border-t border-brand/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">{{ 'report.charts.importCosts' | translate }}</dt>
          <dd class="mt-1.5 text-xl font-bold tabular-nums">{{ importCosts() | money: cur() : locale() }}</dd>
          @if (importShare() !== null) { <dd class="mt-0.5 text-xs text-fg/50">{{ 'report.charts.importShare' | translate: { pct: fmtPct(importShare()!) } }}</dd> }
        </div>
        <div>
          <dt class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">{{ 'report.charts.taxes' | translate }}</dt>
          <dd class="mt-1.5 text-xl font-bold tabular-nums">{{ (main().totalsByCategory.TAXES?.amount ?? 0) | money: cur() : locale() }}</dd>
          <dd class="mt-0.5 text-xs text-fg/50">HS {{ main().hsCode }}</dd>
        </div>
        <div>
          <dt class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">{{ 'report.charts.leadTime' | translate }}</dt>
          <dd class="mt-1.5 text-xl font-bold tabular-nums">{{ main().timeline.totalMin }}–{{ main().timeline.totalMax }} {{ 'report.days' | translate }}</dd>
          <dd class="mt-0.5 text-xs text-fg/50">{{ main().deliveryKm }} km</dd>
        </div>
        <div>
          <dt class="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg/50">CIF</dt>
          <dd class="mt-1.5 text-xl font-bold tabular-nums">{{ main().customsValue.amount | money: main().customsValue.currency : locale() }}</dd>
          <dd class="mt-0.5 text-xs text-fg/50">{{ 'report.charts.fx' | translate: { date: main().fxDate } }}</dd>
        </div>
      </dl>
    </section>

    <!-- 01 structure -->
    <app-report-heading no="01" class="mt-14">{{ 'report.charts.structure' | translate }}</app-report-heading>
    <section class="relative mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" (mouseleave)="tip.set(null)">
      <div class="card p-6 sm:p-8">
        <svg viewBox="0 0 200 200" class="mx-auto block size-56" role="img" [attr.aria-label]="'report.charts.structure' | translate">
          <g transform="rotate(-90 100 100)">
            @for (s of slices(); track s.category) {
              <circle cx="100" cy="100" [attr.r]="r" fill="none" [style.stroke]="color[s.category]"
                      [attr.stroke-width]="active() === s.category ? 14 : 10" [attr.stroke-dasharray]="s.dash"
                      [attr.stroke-dashoffset]="s.offset" class="cursor-pointer transition-[stroke-width,opacity] duration-200"
                      [style.opacity]="active() && active() !== s.category ? 0.35 : 1"
                      (mouseenter)="active.set(s.category)" (mouseleave)="active.set(null)" />
            }
          </g>
          @if (activeSlice(); as a) {
            <text x="100" y="88" text-anchor="middle" class="fill-[var(--muted)] text-[7.5px] font-semibold uppercase tracking-[0.12em]">{{ 'category.' + a.category | translate }}</text>
            <text x="100" y="112" text-anchor="middle" class="fill-[var(--fg)] text-[22px] font-extrabold">{{ fmtPct(a.pct) }}</text>
            <text x="100" y="126" text-anchor="middle" class="fill-[var(--muted)] text-[8px]">{{ a.amount | money: cur() : locale() }}</text>
          } @else {
            <text x="100" y="88" text-anchor="middle" class="fill-[var(--muted)] text-[7.5px] font-semibold uppercase tracking-[0.12em]">{{ 'scenario.1' | translate }}</text>
            <text x="100" y="110" text-anchor="middle" class="fill-[var(--fg)] text-[17px] font-extrabold">{{ main().total.amount | money: cur() : locale() }}</text>
          }
        </svg>
        <ul class="mt-7 text-sm">
          @for (s of slices(); track s.category) {
            <li class="flex items-center gap-3 border-b border-line py-2.5 transition-colors last:border-0"
                [class.text-muted]="active() && active() !== s.category"
                (mouseenter)="active.set(s.category)" (mouseleave)="active.set(null)">
              <span class="size-2.5 shrink-0 rounded-[2px]" [style.background]="color[s.category]"></span>
              <span class="min-w-0 flex-1">{{ 'category.' + s.category | translate }}</span>
              <span class="tabular-nums text-muted">{{ s.amount | money: cur() : locale() }}</span>
              <span class="w-14 text-right font-bold tabular-nums">{{ fmtPct(s.pct) }}</span>
            </li>
          }
        </ul>
      </div>

      <div class="card p-6 sm:p-8">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{{ 'report.charts.topItems' | translate }}</p>
        <ul class="mt-5 space-y-4">
          @for (it of topItems(); track it.line.code) {
            <li class="cursor-default" (mouseenter)="show($event, ['cost.' + it.line.code, 'category.' + it.line.category], it.amount)">
              <div class="flex items-baseline justify-between gap-4 text-sm">
                <span class="min-w-0 truncate">{{ 'cost.' + it.line.code | translate }}</span>
                <span class="shrink-0 tabular-nums"><b>{{ it.amount | money: cur() : locale() }}</b>
                  <span class="ml-1.5 text-xs text-muted">{{ fmtPct(it.amount / main().total.amount * 100) }}</span></span>
              </div>
              <div class="mt-2 h-1.5 rounded-full bg-panel-2">
                <div class="h-full rounded-full" [style.width.%]="it.amount / topMax() * 100" [style.background]="color[it.line.category]"></div>
              </div>
            </li>
          }
        </ul>
        <p class="mt-7 text-xs text-muted">{{ 'report.charts.note' | translate: { cur: cur() } }}</p>
      </div>

      @if (tip(); as t) {
        <div class="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-[6px] bg-[#101011] px-3 py-2 text-xs text-white shadow-xl"
             [style.left.px]="t.x" [style.top.px]="t.y - 8">
          <span class="block text-white/60">{{ t.title }}</span><b class="tabular-nums">{{ t.value }}</b>
        </div>
      }
    </section>
  `,
})
export class ReportCharts {
  /** Optimistic / average / pessimistic, or just the average when the scenarios were not stored. */
  readonly results = input.required<CalculationResult[]>();
  readonly main = input.required<CalculationResult>();
  readonly locale = input.required<string>();
  readonly orderId = input.required<string>();
  /** The PDF can be downloaded. */
  readonly ready = input(false);
  readonly download = output<void>();

  private readonly translate = inject(TranslateService);
  protected readonly color = CATEGORY_COLOR;
  protected readonly r = R;
  protected readonly active = signal<CostCategory | null>(null);
  protected readonly tip = signal<Tip | null>(null);

  protected readonly reference = computed(() => this.orderId().slice(0, 8).toUpperCase());
  protected readonly cur = computed(() => this.main().displayCurrency);
  protected readonly low = computed(() => this.results()[0]);
  protected readonly high = computed(() => this.results()[this.results().length - 1]);
  /** Where the expected total sits between the optimistic and the pessimistic one; the label stays clear of the ends. */
  protected readonly gauge = computed(() => {
    const lo = this.low().total.amount;
    const spread = this.high().total.amount - lo;
    const position = spread > 0 ? ((this.main().total.amount - lo) / spread) * 100 : 50;
    return { position, label: Math.min(86, Math.max(14, position)) };
  });

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
      const visible = Math.max(len - gap, 0.6);
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

  protected fmtPct(v: number): string {
    return new Intl.NumberFormat(this.locale(), { maximumFractionDigits: 1 }).format(v) + ' %';
  }

  protected show(e: MouseEvent, keys: string[], amount: number): void {
    const target = e.currentTarget as HTMLElement;
    const box = target.closest('section')!.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const title = keys.map((k) => this.translate.instant(k)).join(' · ');
    const value = new Intl.NumberFormat(this.locale(), { style: 'currency', currency: this.cur(), maximumFractionDigits: 0 }).format(amount);
    this.tip.set({ x: r.left + r.width / 2 - box.left, y: r.top - box.top, title, value });
  }
}

/** The timeline as a Gantt strip: the firm part of each stage in gold, the possible delay lighter. */
@Component({
  selector: 'app-report-timeline',
  imports: [TranslatePipe],
  host: { class: 'block' },
  template: `
    <div class="card p-6 sm:p-8">
      <div class="space-y-4">
        @for (g of gantt(); track g.code) {
          <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 text-sm sm:grid-cols-[minmax(0,15rem)_4.5rem_minmax(0,1fr)]">
            <span class="truncate">{{ 'timeline.' + g.code | translate }}</span>
            <span class="text-right tabular-nums text-muted">{{ g.min }}–{{ g.max }}</span>
            <div class="relative col-span-2 h-2.5 rounded-full bg-panel-2 sm:col-span-1" [title]="g.min + '–' + g.max + ' ' + ('report.days' | translate)">
              <span class="absolute inset-y-0 rounded-l-full bg-brand" [style.left.%]="g.offset" [style.width.%]="g.firm"></span>
              <span class="absolute inset-y-0 rounded-r-full bg-brand/30" [style.left.%]="g.offset + g.firm" [style.width.%]="g.delay"></span>
            </div>
          </div>
        }
        <div class="grid gap-4 text-xs text-muted sm:grid-cols-[minmax(0,15rem)_4.5rem_minmax(0,1fr)]">
          <span class="hidden sm:block"></span><span class="hidden sm:block"></span>
          <div class="flex justify-between tabular-nums">
            @for (d of ticks(); track $index) { <span>{{ d }}</span> }
          </div>
        </div>
      </div>
      <p class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted">
        <span class="flex items-center gap-2"><span class="h-2 w-5 rounded-full bg-brand"></span>{{ 'report.charts.firm' | translate }}</span>
        <span class="flex items-center gap-2"><span class="h-2 w-5 rounded-full bg-brand/30"></span>{{ 'report.charts.delay' | translate }}</span>
        <span>{{ 'report.charts.axis' | translate }}</span>
      </p>
    </div>
  `,
})
export class ReportTimeline {
  readonly result = input.required<CalculationResult>();

  protected readonly gantt = computed(() => {
    const t = this.result().timeline;
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
    const max = this.result().timeline.totalMax;
    return [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
  });
}
