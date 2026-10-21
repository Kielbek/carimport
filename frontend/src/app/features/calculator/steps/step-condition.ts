import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ShippingMethod } from '../../../core/api/api.models';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { CONDITIONS } from '../calculator.options';

/**
 * Step 3 - condition, price and title up front; shipping, buyer type and customs procedure live in a collapsible
 * "advanced" section with a one-line summary, because most users never need to change the defaults.
 */
@Component({
  selector: 'app-step-condition',
  imports: [TranslatePipe, Icon],
  template: `
    <fieldset>
      <legend class="label">{{ 'wizard.condition' | translate }}</legend>
      <div class="grid gap-3 sm:grid-cols-3">
        @for (c of conditions; track c.code) {
          <button type="button" class="choice" [class.choice--active]="s().condition === c.code" (click)="store.patch({ condition: c.code })">
            <span class="choice-check"><app-icon name="check" [size]="12" [stroke]="3" /></span>
            <app-icon [name]="c.code" [size]="26" class="text-accent-text" />
            <span class="mt-2 font-semibold">{{ 'condition.' + c.code | translate }}</span>
            <span class="text-xs text-muted">{{ 'condition.' + c.code + '_HINT' | translate }}</span>
            @if (c.surcharge) {
              <span class="badge mt-2 !whitespace-normal !bg-brand/15 !text-brand-text"><app-icon name="forklift" [size]="13" /> {{ 'wizard.forklift' | translate }}</span>
            }
          </button>
        }
      </div>
    </fieldset>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <div>
        <label class="label" for="price">{{ 'wizard.bid' | translate }}</label>
        <div class="relative">
          <input id="price" type="number" min="100" step="100" inputmode="numeric" class="input pr-16 text-lg font-bold"
                 [value]="s().bidPrice" (input)="store.patch({ bidPrice: +$any($event.target).value })" />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">{{ store.bidCurrency() }}</span>
        </div>
      </div>
      @if (hasTitleTypes()) {
        <fieldset animate.enter="reveal-enter" animate.leave="reveal-leave">
          <legend class="label">{{ 'wizard.title' | translate }}</legend>
          <div class="flex flex-wrap gap-2">
            @for (t of titles; track t) {
              <button type="button" class="chip" [class.chip--active]="s().titleType === t" (click)="store.patch({ titleType: t })">{{ 'title.' + t | translate }}</button>
            }
          </div>
        </fieldset>
      }
    </div>

    <div class="mt-8 rounded-[6px] border border-line">
      <button type="button" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" (click)="advanced.set(!advanced())"
              [attr.aria-expanded]="advanced()" aria-controls="advanced-options">
        <span>
          <span class="block font-semibold">{{ 'wizard.advanced' | translate }}</span>
          @if (!advanced()) {
            <span class="mt-0.5 block text-xs text-muted" animate.enter="reveal-enter">
              {{ 'shipping.' + s().shippingMethod | translate }} · {{ 'buyer.' + s().buyerType | translate }}
              @if (s().customsProcedure === 'VAT_DEFERRED_4200') { · 4200 }
            </span>
          }
        </span>
        <app-icon name="chevron-down" class="text-muted transition duration-200" [class.rotate-180]="advanced()" />
      </button>

      @if (advanced()) {
        <div id="advanced-options" class="space-y-7 border-t border-line px-5 py-6" animate.enter="reveal-enter" animate.leave="reveal-leave">
          <fieldset>
            <legend class="label">{{ 'wizard.shipping' | translate }}</legend>
            <div class="flex flex-wrap gap-2">
              @for (m of shipping; track m) {
                <button type="button" class="chip" [class.chip--active]="s().shippingMethod === m" (click)="store.patch({ shippingMethod: m })">
                  <app-icon [name]="m === 'RORO' ? 'ship' : 'container'" [size]="16" /> {{ 'shipping.' + m | translate }}
                </button>
              }
            </div>
          </fieldset>
          <fieldset>
            <legend class="label">{{ 'wizard.buyer' | translate }}</legend>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="chip" [class.chip--active]="s().buyerType === 'PRIVATE'" (click)="store.setBuyerType('PRIVATE')">
                <app-icon name="user" [size]="16" /> {{ 'buyer.PRIVATE' | translate }}
              </button>
              <button type="button" class="chip" [class.chip--active]="s().buyerType === 'COMPANY'" (click)="store.setBuyerType('COMPANY')">
                <app-icon name="building" [size]="16" /> {{ 'buyer.COMPANY' | translate }}
              </button>
            </div>
          </fieldset>
          @if (store.procedure4200Available()) {
            <label class="flex cursor-pointer items-start gap-3 rounded-[6px] border border-line bg-panel-2 p-4"
                   animate.enter="reveal-enter" animate.leave="reveal-leave">
              <input type="checkbox" class="checkbox" [checked]="s().customsProcedure === 'VAT_DEFERRED_4200'"
                     (change)="store.patch({ customsProcedure: $any($event.target).checked ? 'VAT_DEFERRED_4200' : 'STANDARD_4000' })" />
              <span>
                <span class="font-semibold">{{ 'wizard.procedure4200' | translate }}</span>
                <span class="mt-1 block text-xs text-muted">{{ 'wizard.procedure4200Hint' | translate }}</span>
              </span>
            </label>
          }
        </div>
      }
    </div>
  `,
})
export class StepCondition {
  protected readonly store = inject(CalculatorStore);
  protected readonly s = this.store.state;
  protected readonly conditions = CONDITIONS;
  protected readonly titles = ['CLEAN', 'SALVAGE'] as const;
  protected readonly shipping: ShippingMethod[] = ['CONTAINER_SHARED', 'CONTAINER_EXCLUSIVE', 'RORO'];
  protected readonly advanced = signal(false);
  /** Clean/salvage schedules only exist for the North-American style auctions. */
  protected readonly hasTitleTypes = computed(() => ['COPART', 'IAAI'].includes(this.s().auctionHouse));
}
