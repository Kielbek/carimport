import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, filter, of, switchMap, take, takeWhile, tap, timer } from 'rxjs';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CalculationResult, CostCategory, CostLine, FullReport, OrderProgress, OrderStatus } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { LocalNumberPipe } from '../../core/format/local-number.pipe';
import { MoneyPipe } from '../../core/format/money.pipe';
import { pathFor } from '../../core/routing/paths';
import { Icon } from '../../shared/icon/icon';
import { LanguageService } from '../../core/i18n/language.service';
import { recallOrder, rememberOrder } from './order-tokens';
import { ReportCharts } from './report-charts';

const STAGES = ['PURCHASE', 'SHIPPING', 'CUSTOMS', 'REGISTRATION'] as const;
const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION', 'RISK'];

interface Row { code: string; line: CostLine; amounts: number[] }

/**
 * Stripe success_url lands here (and the link in the report e-mail). Coming back from Stripe the page asks the server
 * to check the payment with Stripe directly - the redirect itself is never proof - then follows the order through
 * payment → PDF → e-mail and shows the report with its download button.
 */
@Component({
  selector: 'app-report-page',
  imports: [TranslatePipe, MoneyPipe, LocalNumberPipe, RouterLink, Icon, ReportCharts],
  template: `
    <div class="site max-w-5xl py-12">
      <a [routerLink]="home()" class="link-arrow text-sm"><app-icon name="arrow-left" [size]="16" /> {{ 'report.back' | translate }}</a>

      @if (status() === 'REFUNDED') {
        <p class="card mt-8 p-6">{{ 'report.refunded' | translate }}</p>
      } @else if (status() === 'EXPIRED') {
        <p class="mt-8 rounded-[6px] bg-danger-soft p-6 text-danger">{{ 'report.expired' | translate }}</p>
      } @else if (!done()) {
        <!-- payment → PDF → e-mail, each step ticked off as it completes -->
        <section class="card mx-auto mt-12 max-w-xl p-7" aria-live="polite">
          <h1 class="text-xl font-extrabold">{{ 'report.progress.title' | translate }}</h1>
          <ol class="mt-6 space-y-4">
            @for (step of steps(); track step.key) {
              <li class="flex items-center gap-3">
                @if (step.state === 'done') {
                  <app-icon name="check-circle" [size]="22" class="shrink-0 text-success" />
                } @else if (step.state === 'active') {
                  <span class="size-[22px] shrink-0 animate-spin rounded-full border-[3px] border-line border-t-brand"></span>
                } @else {
                  <span class="size-[22px] shrink-0 rounded-full border-2 border-line"></span>
                }
                <span [class.text-muted]="step.state === 'todo'" [class.font-semibold]="step.state === 'active'">
                  {{ step.label | translate: { email: progress()?.emailTo ?? '' } }}
                </span>
              </li>
            }
          </ol>
          @if (slow()) {
            <p class="mt-6 rounded-[4px] bg-panel-2 p-4 text-sm">{{ 'report.progress.slow' | translate }}</p>
            <button type="button" class="btn btn-outline mt-4" (click)="reload()">{{ 'report.progress.refresh' | translate }}</button>
          }
        </section>
      }

      @if (done() && progress(); as p) {
        <section class="mt-8 flex flex-col items-start gap-4 rounded-[6px] border border-success/40 bg-success/10 p-6 sm:flex-row sm:items-center sm:justify-between"
                 animate.enter="reveal-enter">
          <div class="flex items-start gap-3">
            <app-icon name="check-circle" [size]="26" class="mt-0.5 shrink-0 text-success" />
            <div>
              <p class="text-lg font-extrabold">{{ 'report.progress.doneTitle' | translate }}</p>
              <p class="mt-1 text-sm text-fg/85">
                @if (p.emailSent) { {{ 'report.progress.emailSent' | translate: { email: p.emailTo } }} }
                @else { {{ 'report.progress.downloadBelow' | translate }} }
              </p>
            </div>
          </div>
          <button type="button" class="btn btn-primary shrink-0" (click)="download()">
            <app-icon name="download" [size]="18" /> {{ 'report.download' | translate }}
          </button>
        </section>
      }

      @if (shownReport(); as r) {
        <header class="mt-8 flex flex-wrap items-end justify-between gap-4" animate.enter="reveal-enter">
          <div>
            <p class="eyebrow">HS {{ r.result.hsCode }} · {{ r.result.route.departurePort }} → {{ r.result.route.euPortName }}</p>
            <h1 class="h-section mt-3">{{ 'report.title' | translate }}</h1>
          </div>
          <button type="button" class="btn btn-primary" [disabled]="status() !== 'READY'" (click)="download()">
            <app-icon name="download" [size]="18" />
            {{ status() === 'READY' ? ('report.download' | translate) : ('report.generating' | translate) }}
          </button>
        </header>

        <app-report-charts [results]="results()" [main]="r.result" [locale]="lang.locale()" animate.enter="reveal-enter" />

        <h2 class="mt-12 text-xl font-extrabold">{{ 'report.charts.breakdown' | translate }}</h2>
        <div class="card mt-4 overflow-x-auto">
          <table class="w-full min-w-[760px] text-sm">
            <thead class="bg-bg-soft text-left text-[12px] uppercase tracking-wider text-muted">
              <tr>
                <th class="px-5 py-3 font-semibold">{{ 'report.item' | translate }}</th>
                <th class="px-5 py-3 text-right font-semibold">{{ 'report.base' | translate }}</th>
                <th class="px-5 py-3 text-right font-semibold">{{ 'report.rate' | translate }}</th>
                @for (i of cols(); track i) { <th class="px-5 py-3 text-right font-semibold" [class.text-brand-text]="i === 1">{{ 'scenario.' + i | translate }}</th> }
              </tr>
            </thead>
            <tbody>
              @for (c of categories; track c) {
                @if (rowsOf(c).length) {
                  <tr class="border-t border-line bg-panel-2 font-semibold">
                    <td class="px-5 py-3" colspan="3">{{ 'category.' + c | translate }}</td>
                    @for (res of results(); track $index) {
                      <td class="px-5 py-3 text-right tabular-nums">{{ res.totalsByCategory[c].amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                    }
                  </tr>
                  @for (row of rowsOf(c); track row.code) {
                    <tr class="border-t border-line" [class.italic]="!row.line.includedInTotal" [class.text-muted]="!row.line.includedInTotal">
                      <td class="px-5 py-3">
                        {{ 'cost.' + row.code | translate }}
                        @if (row.line.params['km']) {
                          <span class="block text-xs text-muted">{{ row.line.params['km'] }} km × {{ row.line.params['perKm'] }} {{ row.line.params['currency'] }}/km + {{ row.line.params['fixed'] }} (min. {{ row.line.params['minimum'] }})</span>
                        }
                        @if (c === 'RISK') {
                          <span class="block text-xs text-muted">{{ 'report.riskDetail' | translate: { p: row.line.params['probability'], min: row.line.params['min'], max: row.line.params['max'], cur: row.line.params['currency'] } }}</span>
                        } @else if (row.line.original.currency !== r.result.displayCurrency) {
                          <span class="block text-xs text-muted">{{ row.line.original.amount | money: row.line.original.currency : lang.locale() : 2 }}</span>
                        }
                      </td>
                      <td class="px-5 py-3 text-right text-muted tabular-nums">
                        @if (row.line.taxBase) { {{ row.line.taxBase.amount | money: row.line.taxBase.currency : lang.locale() : 2 }} }
                      </td>
                      <td class="px-5 py-3 text-right text-muted tabular-nums">@if (row.line.rate !== null && c !== 'RISK') { {{ row.line.rate * 100 | localNumber: lang.locale() }}% }</td>
                      @for (amount of row.amounts; track $index) {
                        <td class="px-5 py-3 text-right tabular-nums" [class.font-semibold]="$index === 1 || cols().length === 1">{{ amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                      }
                    </tr>
                  }
                }
              }
              <tr class="bg-ink-2 text-white">
                <td class="p-4 text-base font-bold" colspan="3">{{ 'report.total' | translate }}</td>
                @for (res of results(); track $index) {
                  <td class="p-4 text-right text-lg font-extrabold tabular-nums" [class.text-brand]="$index === 1 || results().length === 1">{{ res.total.amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                }
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-xs text-muted">{{ 'report.scenarioMethod' | translate }}</p>

        <section class="mt-12">
          <h2 class="text-xl font-extrabold">{{ 'report.plan' | translate }}</h2>
          <ol class="mt-4 divide-y divide-line border-y border-line">
            @for (p of r.plan; track p.key; let i = $index) {
              <li class="grid gap-2 py-4 sm:grid-cols-[2rem_1fr_220px]">
                <span class="font-extrabold text-brand-text">{{ i + 1 }}</span>
                <span><span class="block font-semibold">{{ p.key + '.title' | translate }}</span><span class="mt-1 block text-sm text-muted">{{ p.key + '.text' | translate }}</span></span>
                <span class="text-sm font-medium">{{ p.deadline | translate }}</span>
              </li>
            }
          </ol>
        </section>

        <section class="mt-10 grid gap-5 sm:grid-cols-2">
          @for (stage of stages; track stage) {
            <div class="card p-6">
              <h2 class="flex items-center gap-2 font-extrabold"><app-icon name="list" [size]="18" class="text-brand-text" />{{ 'docStage.' + stage | translate }}</h2>
              <ul class="mt-4 space-y-2.5 text-sm">
                @for (d of docsOf(stage); track d.key) {
                  <li class="flex gap-2.5"><span class="mt-0.5 size-4 shrink-0 rounded-[3px] border border-line-strong"></span>{{ d.key | translate }}</li>
                }
              </ul>
            </div>
          }
        </section>
      }
    </div>
  `,
})
export class ReportPage implements OnInit {
  /** Bound from the route by withComponentInputBinding(). */
  readonly orderId = input.required<string>();

  protected readonly lang = inject(LanguageService);
  private readonly api = inject(CarImportApi);
  private readonly analytics = inject(AnalyticsService);

  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly status = signal<OrderStatus | null>(null);
  protected readonly progress = signal<OrderProgress | null>(null);
  protected readonly slow = signal(false);
  /** The report is downloadable and, when e-mail is on, has been sent. */
  protected readonly done = computed(() => {
    const p = this.progress();
    return !!p && p.status === 'READY' && (p.emailSent || !p.mailEnabled);
  });
  /** The report appears once everything is done (or when it takes unusually long, so nothing stays hidden). */
  protected readonly shownReport = computed(() => (this.done() || this.slow() ? this.report() : null));
  protected readonly steps = computed(() => {
    const p = this.progress();
    const paid = this.unlocked();
    const ready = p?.status === 'READY';
    const list: { key: string; label: string; state: 'done' | 'active' | 'todo' }[] = [
      { key: 'pay', label: paid ? 'report.progress.paid' : 'report.progress.paying', state: paid ? 'done' : 'active' },
      {
        key: 'pdf',
        label: ready ? 'report.progress.ready' : 'report.progress.generating',
        state: ready ? 'done' : paid ? 'active' : 'todo',
      },
    ];
    if (p?.mailEnabled) {
      list.push({
        key: 'mail',
        label: p.emailSent ? 'report.progress.emailSent' : 'report.progress.emailSending',
        state: p.emailSent ? 'done' : ready ? 'active' : 'todo',
      });
    }
    return list;
  });
  protected readonly report = signal<FullReport | null>(null);
  protected readonly categories = CATEGORIES;
  protected readonly stages = STAGES;
  private token = '';

  /** Optimistic / average / pessimistic when stored, otherwise just the average. */
  protected readonly results = computed<CalculationResult[]>(() => {
    const r = this.report();
    if (!r) {
      return [];
    }
    return r.scenarios ? [r.scenarios.low, r.scenarios.expected, r.scenarios.high] : [r.result];
  });
  protected readonly cols = computed(() => (this.results().length === 3 ? [0, 1, 2] : [1]));

  /** One row per cost code across scenarios (risk lines are zero in the optimistic one). */
  private readonly rows = computed<Row[]>(() => {
    const results = this.results();
    const byCode = new Map<string, CostLine>();
    results.forEach((res) => res.lines.forEach((l) => byCode.has(l.line.code) || byCode.set(l.line.code, l.line)));
    const main = this.report()?.result;
    main?.lines.forEach((l) => byCode.set(l.line.code, l.line));
    return [...byCode.entries()].map(([code, line]) => ({
      code,
      line,
      amounts: results.map((res) => res.lines.find((l) => l.line.code === code)?.display.amount ?? 0),
    }));
  });
  protected readonly rowsOf = (c: CostCategory) => this.rows().filter((r) => r.line.category === c);
  protected readonly docsOf = (stage: string) => this.report()?.documents.filter((d) => d.stage === stage) ?? [];
  /** One conversion per order, also when the page is reopened from the e-mail. */
  private trackPurchaseOnce(): void {
    const key = 'carimport.purchase.' + this.orderId();
    try {
      if (localStorage.getItem(key)) {
        return;
      }
      localStorage.setItem(key, '1');
    } catch {
      return;
    }
    this.analytics.track('purchase');
  }

  protected readonly unlocked = computed(() => ['PAID', 'GENERATING', 'READY', 'FAILED'].includes(this.status() ?? ''));

  ngOnInit(): void {
    // the token travels in the URL fragment (never sent to servers); move it to storage and clean the address bar
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    const fromUrl = fragment.get('token');
    if (fromUrl) {
      rememberOrder(this.orderId(), fromUrl);
    }
    if (fromUrl || sessionId) {
      history.replaceState(null, '', window.location.pathname);
    }
    this.token = fromUrl ?? recallOrder(this.orderId()) ?? '';

    // back from Stripe: have the server check the payment with Stripe now instead of waiting for the webhook
    const first = sessionId
      ? this.api.confirmOrder(this.orderId(), this.token, sessionId).pipe(catchError(() => of(null)))
      : of(null);
    first.subscribe((p) => {
      if (p) {
        this.apply(p);
      }
      this.poll();
    });
  }

  protected reload(): void {
    this.slow.set(false);
    this.poll();
  }

  /** Every 2 s for up to 3 minutes, until the PDF is ready and the e-mail is out (or e-mail is off). */
  private poll(): void {
    timer(0, 2000)
      .pipe(
        take(90),
        switchMap(() => this.api.orderStatus(this.orderId(), this.token).pipe(catchError(() => of(null)))),
        filter((p): p is OrderProgress => p !== null),
        tap((p) => this.apply(p)),
        takeWhile((p) => !this.finished(p), true),
      )
      .subscribe({ complete: () => this.slow.set(!this.done()) });
  }

  private apply(p: OrderProgress): void {
    this.progress.set(p);
    this.status.set(p.status);
    if (this.unlocked()) {
      this.trackPurchaseOnce();
    }
    if (this.unlocked() && !this.report() && !this.loadingReport) {
      this.loadReport();
    }
  }

  private finished(p: OrderProgress): boolean {
    return ['EXPIRED', 'REFUNDED'].includes(p.status) || (p.status === 'READY' && (p.emailSent || !p.mailEnabled));
  }

  protected download(): void {
    this.api.reportPdf(this.orderId(), this.token).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `import-report-${this.orderId()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  private loadingReport = false;

  private loadReport(): void {
    this.loadingReport = true;
    this.api
      .fullReport(this.orderId(), this.token)
      .pipe(filter(Boolean))
      .subscribe((r) => this.report.set(r));
  }
}
