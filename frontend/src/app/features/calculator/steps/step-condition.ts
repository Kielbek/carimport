import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ShippingMethod } from '../../../core/api/api.models';
import { CalculatorStore } from '../calculator.store';
import { CONDITIONS } from '../calculator.options';

/** Step 3 - condition (forklift/winch surcharges), title, price, shipping, buyer and customs procedure. */
@Component({
  selector: 'app-step-condition',
  imports: [TranslatePipe],
  template: `
    <section class="space-y-8">
      <div>
        <h3 class="step-label">{{ 'wizard.condition' | translate }}</h3>
        <div class="grid gap-3 sm:grid-cols-3">
          @for (c of conditions; track c.code) {
            <button type="button" class="choice-card items-start text-left" [class.choice-card--active]="s().condition === c.code"
                    (click)="store.patch({ condition: c.code })">
              <span class="text-3xl">{{ c.icon }}</span>
              <span class="mt-1 font-semibold">{{ 'condition.' + c.code | translate }}</span>
              <span class="text-xs text-slate-500">{{ 'condition.' + c.code + '_HINT' | translate }}</span>
              @if (c.surcharge) {
                <span class="badge badge--warn mt-2">+ {{ 'wizard.forklift' | translate }}</span>
              }
            </button>
          }
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label class="step-label" for="price">{{ 'wizard.bid' | translate }}</label>
          <div class="relative">
            <input id="price" type="number" min="100" step="100" class="input pr-16 text-lg font-semibold"
                   [value]="s().bidPrice" (input)="store.patch({ bidPrice: +$any($event.target).value })" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">{{ store.bidCurrency() }}</span>
          </div>
        </div>
        @if (s().auctionHouse === 'COPART' || s().auctionHouse === 'IAAI') {
          <div>
            <span class="step-label">{{ 'wizard.title' | translate }}</span>
            <div class="flex gap-2">
              @for (t of titles; track t) {
                <button type="button" class="chip" [class.chip--active]="s().titleType === t" (click)="store.patch({ titleType: t })">
                  {{ 'title.' + t | translate }}
                </button>
              }
            </div>
          </div>
        }
      </div>

      <div>
        <span class="step-label">{{ 'wizard.shipping' | translate }}</span>
        <div class="flex flex-wrap gap-2">
          @for (m of shipping; track m) {
            <button type="button" class="chip" [class.chip--active]="s().shippingMethod === m" (click)="store.patch({ shippingMethod: m })">
              {{ 'shipping.' + m | translate }}
            </button>
          }
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <span class="step-label">{{ 'wizard.buyer' | translate }}</span>
          <div class="flex gap-2">
            <button type="button" class="chip" [class.chip--active]="s().buyerType === 'PRIVATE'" (click)="store.setBuyerType('PRIVATE')">
              👤 {{ 'buyer.PRIVATE' | translate }}
            </button>
            <button type="button" class="chip" [class.chip--active]="s().buyerType === 'COMPANY'" (click)="store.setBuyerType('COMPANY')">
              🏢 {{ 'buyer.COMPANY' | translate }}
            </button>
          </div>
        </div>
        <label class="flex items-start gap-3 rounded-xl border p-4 transition"
               [class.opacity-50]="!store.procedure4200Available()"
               [class.cursor-pointer]="store.procedure4200Available()">
          <input type="checkbox" class="mt-1 size-4 accent-indigo-600" [disabled]="!store.procedure4200Available()"
                 [checked]="s().customsProcedure === 'VAT_DEFERRED_4200'"
                 (change)="store.patch({ customsProcedure: $any($event.target).checked ? 'VAT_DEFERRED_4200' : 'STANDARD_4000' })" />
          <span>
            <span class="font-semibold">{{ 'wizard.procedure4200' | translate }}</span>
            <span class="block text-xs text-slate-600 dark:text-slate-400">{{ 'wizard.procedure4200Hint' | translate }}</span>
          </span>
        </label>
      </div>
    </section>
  `,
})
export class StepCondition {
  protected readonly store = inject(CalculatorStore);
  protected readonly s = this.store.state;
  protected readonly conditions = CONDITIONS;
  protected readonly titles = ['CLEAN', 'SALVAGE'] as const;
  protected readonly shipping: ShippingMethod[] = ['CONTAINER_SHARED', 'CONTAINER_EXCLUSIVE', 'RORO'];
}
