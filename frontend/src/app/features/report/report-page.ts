import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map, switchMap, take, takeWhile, timer } from 'rxjs';
import { CostCategory, FullReport, OrderStatus } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { LocalNumberPipe } from '../../core/format/local-number.pipe';
import { MoneyPipe } from '../../core/format/money.pipe';
import { pathFor } from '../../core/routing/paths';
import { Icon } from '../../shared/icon/icon';
import { LanguageService } from '../../core/i18n/language.service';
import { recallOrder, rememberOrder } from './order-tokens';

const STAGES = ['PURCHASE', 'SHIPPING', 'CUSTOMS', 'REGISTRATION'] as const;
const CATEGORIES: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'];

/**
 * Stripe success_url lands here. The browser may arrive before the webhook, so the page polls the order status
 * (max ~90 s) and never trusts the redirect itself as proof of payment.
 */
@Component({
  selector: 'app-report-page',
  imports: [TranslatePipe, MoneyPipe, LocalNumberPipe, RouterLink, Icon],
  template: `
    <div class="site max-w-5xl py-12">
      <a [routerLink]="home()" class="link-arrow text-sm"><app-icon name="arrow-left" [size]="16" /> {{ 'report.back' | translate }}</a>

      @if (status() === 'REFUNDED') {
        <p class="card mt-8 p-6">{{ 'report.refunded' | translate }}</p>
      } @else if (status() === 'EXPIRED') {
        <p class="mt-8 rounded-[6px] bg-danger-soft p-6 text-danger">{{ 'report.expired' | translate }}</p>
      } @else if (!unlocked()) {
        <div class="mt-20 text-center">
          <div class="mx-auto size-12 animate-spin rounded-full border-4 border-line border-t-brand"></div>
          <p class="mt-5 font-semibold">{{ 'report.waiting' | translate }}</p>
        </div>
      }

      @if (report(); as r) {
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

        <div class="card mt-8 overflow-x-auto">
          <table class="w-full min-w-[640px] text-sm">
            <thead class="bg-bg-soft text-left text-[12px] uppercase tracking-wider text-muted">
              <tr>
                <th class="px-5 py-3 font-semibold">{{ 'report.item' | translate }}</th>
                <th class="px-5 py-3 text-right font-semibold">{{ 'report.base' | translate }}</th>
                <th class="px-5 py-3 text-right font-semibold">{{ 'report.rate' | translate }}</th>
                <th class="px-5 py-3 text-right font-semibold">{{ 'report.amount' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              @for (c of categories; track c) {
                <tr class="border-t border-line bg-panel-2 font-semibold">
                  <td class="px-5 py-3" colspan="3">{{ 'category.' + c | translate }}</td>
                  <td class="px-5 py-3 text-right tabular-nums">{{ r.result.totalsByCategory[c].amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                </tr>
                @for (l of linesOf(c); track l.line.code) {
                  <tr class="border-t border-line" [class.italic]="!l.line.includedInTotal" [class.text-muted]="!l.line.includedInTotal">
                    <td class="px-5 py-3">
                      {{ 'cost.' + l.line.code | translate }}
                      @if (l.line.original.currency !== r.result.displayCurrency) {
                        <span class="block text-xs text-muted">{{ l.line.original.amount | money: l.line.original.currency : lang.locale() : 2 }}</span>
                      }
                    </td>
                    <td class="px-5 py-3 text-right text-muted tabular-nums">
                      @if (l.line.taxBase) { {{ l.line.taxBase.amount | money: l.line.taxBase.currency : lang.locale() : 2 }} }
                    </td>
                    <td class="px-5 py-3 text-right text-muted tabular-nums">@if (l.line.rate !== null) { {{ l.line.rate * 100 | localNumber: lang.locale() }}% }</td>
                    <td class="px-5 py-3 text-right tabular-nums">{{ l.display.amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                  </tr>
                }
              }
              <tr class="bg-ink text-white">
                <td class="px-5 py-4 text-base font-bold" colspan="3">{{ 'report.total' | translate }}</td>
                <td class="px-5 py-4 text-right text-lg font-extrabold text-brand tabular-nums">{{ r.result.total.amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section class="mt-10 grid gap-5 sm:grid-cols-2">
          @for (stage of stages; track stage) {
            <div class="card p-6">
              <h2 class="flex items-center gap-2 font-extrabold"><app-icon name="list" [size]="18" class="text-accent-text" />{{ 'report.stage.' + stage | translate }}</h2>
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

  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly status = signal<OrderStatus | null>(null);
  protected readonly report = signal<FullReport | null>(null);
  protected readonly categories = CATEGORIES;
  protected readonly stages = STAGES;
  private token = '';

  protected readonly linesOf = (c: CostCategory) => this.report()?.result.lines.filter((l) => l.line.category === c) ?? [];
  protected readonly docsOf = (stage: string) => this.report()?.documents.filter((d) => d.stage === stage) ?? [];
  protected readonly unlocked = computed(() => ['PAID', 'GENERATING', 'READY', 'FAILED'].includes(this.status() ?? ''));

  ngOnInit(): void {
    // the token travels in the URL fragment (never sent to servers); move it to storage and clean the address bar
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const fromUrl = fragment.get('token');
    if (fromUrl) {
      rememberOrder(this.orderId(), fromUrl);
      history.replaceState(null, '', window.location.pathname);
    }
    this.token = fromUrl ?? recallOrder(this.orderId()) ?? '';

    timer(0, 2000)
      .pipe(
        take(45),
        switchMap(() => this.api.orderStatus(this.orderId(), this.token)),
        map((s) => s.status),
        takeWhile((s) => s !== 'READY' && s !== 'EXPIRED' && s !== 'REFUNDED', true),
      )
      .subscribe((s) => {
        this.status.set(s);
        if (this.unlocked() && !this.report()) {
          this.loadReport();
        }
      });
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

  private loadReport(): void {
    this.api
      .fullReport(this.orderId(), this.token)
      .pipe(filter(Boolean))
      .subscribe((r) => this.report.set(r));
  }
}
