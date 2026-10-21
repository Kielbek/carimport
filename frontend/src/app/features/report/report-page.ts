import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map, switchMap, take, takeWhile, timer } from 'rxjs';
import { CostCategory, FullReport, OrderStatus } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { MoneyPipe } from '../../core/format/money.pipe';
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
  imports: [TranslatePipe, MoneyPipe, RouterLink],
  template: `
    <main class="mx-auto max-w-4xl px-4 py-10">
      <a [routerLink]="['/', lang.current()]" class="text-sm text-indigo-600 hover:underline">← {{ 'report.back' | translate }}</a>

      @if (status() === 'REFUNDED') {
        <p class="mt-8 rounded-xl bg-slate-100 p-6">{{ 'report.refunded' | translate }}</p>
      } @else if (status() === 'EXPIRED') {
        <p class="mt-8 rounded-xl bg-rose-50 p-6 text-rose-700">{{ 'report.expired' | translate }}</p>
      } @else if (!unlocked()) {
        <div class="mt-16 text-center">
          <div class="mx-auto size-14 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p class="mt-4 font-semibold">{{ 'report.waiting' | translate }}</p>
        </div>
      }

      @if (report(); as r) {
        <header class="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-extrabold">{{ 'report.title' | translate }}</h1>
            <p class="text-sm text-slate-500">HS {{ r.result.hsCode }} · {{ r.result.route.departurePort }} → {{ r.result.route.euPortName }}</p>
          </div>
          <button type="button" class="cta-primary" [disabled]="status() !== 'READY'" (click)="download()">
            {{ status() === 'READY' ? ('report.download' | translate) : ('report.generating' | translate) }}
          </button>
        </header>

        <div class="mt-6 overflow-x-auto rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
          <table class="w-full text-sm">
            <thead class="bg-indigo-50 text-left text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
              <tr>
                <th class="p-3">{{ 'report.item' | translate }}</th>
                <th class="p-3 text-right">{{ 'report.base' | translate }}</th>
                <th class="p-3 text-right">{{ 'report.rate' | translate }}</th>
                <th class="p-3 text-right">{{ 'report.amount' | translate }}</th>
              </tr>
            </thead>
            <tbody>
              @for (c of categories; track c) {
                <tr class="bg-slate-50 font-semibold dark:bg-slate-800">
                  <td class="p-3" colspan="3">{{ 'category.' + c | translate }}</td>
                  <td class="p-3 text-right">{{ r.result.totalsByCategory[c].amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                </tr>
                @for (l of linesOf(c); track l.line.code) {
                  <tr class="border-t" [class.italic]="!l.line.includedInTotal" [class.text-slate-400]="!l.line.includedInTotal">
                    <td class="p-3">
                      {{ 'cost.' + l.line.code | translate }}
                      @if (l.line.original.currency !== r.result.displayCurrency) {
                        <span class="block text-xs text-slate-500">{{ l.line.original.amount | money: l.line.original.currency : lang.locale() : 2 }}</span>
                      }
                    </td>
                    <td class="p-3 text-right text-slate-500">
                      @if (l.line.taxBase) { {{ l.line.taxBase.amount | money: l.line.taxBase.currency : lang.locale() : 2 }} }
                    </td>
                    <td class="p-3 text-right text-slate-500">@if (l.line.rate !== null) { {{ (l.line.rate * 100).toFixed(2) }}% }</td>
                    <td class="p-3 text-right tabular-nums">{{ l.display.amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
                  </tr>
                }
              }
              <tr class="bg-indigo-700 text-lg font-bold text-white">
                <td class="p-4" colspan="3">{{ 'report.total' | translate }}</td>
                <td class="p-4 text-right">{{ r.result.total.amount | money: r.result.displayCurrency : lang.locale() : 2 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section class="mt-10 grid gap-6 sm:grid-cols-2">
          @for (stage of stages; track stage) {
            <div class="rounded-2xl border p-5">
              <h3 class="font-bold">{{ 'report.stage.' + stage | translate }}</h3>
              <ul class="mt-2 space-y-1 text-sm">
                @for (d of docsOf(stage); track d.key) {
                  <li>☐ {{ d.key | translate }}</li>
                }
              </ul>
            </div>
          }
        </section>
      }
    </main>
  `,
})
export class ReportPage implements OnInit {
  /** Bound from the route by withComponentInputBinding(). */
  readonly orderId = input.required<string>();

  protected readonly lang = inject(LanguageService);
  private readonly api = inject(CarImportApi);

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
