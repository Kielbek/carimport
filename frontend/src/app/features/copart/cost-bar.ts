import { Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { ModelExample } from '../guides/model-types';

const TONES = ['var(--cat-1)', 'var(--cat-2)', 'var(--cat-3)', 'var(--cat-4)', '#e8a200', 'var(--cat-5)'];

/** The door-to-door cost of an example car as one stacked bar with a legend: where the money goes. */
@Component({
  selector: 'app-cost-bar',
  imports: [TranslatePipe],
  template: `
    <div class="mt-4 flex h-5 w-full overflow-hidden rounded-full" role="img" [attr.aria-label]="'copart.costbar.title' | translate">
      @for (p of parts(); track p.key) {
        <span class="h-full" [style.width.%]="p.share * 100" [style.background]="p.tone"></span>
      }
    </div>
    <ul class="mt-3 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
      @for (p of parts(); track p.key) {
        <li class="flex items-center gap-2">
          <span class="h-3 w-3 shrink-0 rounded-sm" [style.background]="p.tone"></span>
          <span class="min-w-0 flex-1 truncate">{{ 'copart.costbar.' + p.key | translate }}</span>
          <span class="tabular-nums text-muted">{{ money(p.amount) }}</span>
          <span class="w-10 text-right text-xs font-bold tabular-nums">{{ pct(p.share) }}</span>
        </li>
      }
    </ul>
  `,
})
export class CostBar {
  private readonly lang = inject(LanguageService);
  readonly example = input.required<ModelExample>();

  protected readonly parts = computed(() => {
    const e = this.example();
    const national = e.national.reduce((s, n) => s + n.amount, 0);
    const rows = [
      { key: 'price', amount: e.price },
      { key: 'transport', amount: e.transport },
      { key: 'duty', amount: e.duty },
      { key: 'vat', amount: e.vat },
      { key: 'national', amount: national },
      { key: 'registration', amount: e.registration + e.other },
    ].filter((r) => r.amount > 0);
    const sum = rows.reduce((s, r) => s + r.amount, 0);
    return rows.map((r, i) => ({ ...r, share: r.amount / sum, tone: TONES[i % TONES.length] }));
  });

  protected money(amount: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency: this.example().currency, maximumFractionDigits: 0 }).format(amount);
  }

  protected pct(share: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'percent', maximumFractionDigits: 0 }).format(share);
  }
}
