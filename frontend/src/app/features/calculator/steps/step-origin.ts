import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Flag } from '../../../shared/flag/flag';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DEPARTURE_PORTS, ORIGINS, PICKUP_ZONES } from '../calculator.options';

/** Step 1 - where the car is bought and from which port it sails. */
@Component({
  selector: 'app-step-origin',
  imports: [TranslatePipe, Flag, Icon],
  template: `
    <fieldset>
      <legend class="label">{{ 'wizard.origin' | translate }}</legend>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
        @for (o of origins; track o.code) {
          <button type="button" class="choice items-center !gap-3 text-center" [class.choice--active]="s().originCountry === o.code"
                  (click)="store.selectOrigin(o.code)" [attr.aria-pressed]="s().originCountry === o.code">
            <span class="choice-check"><app-icon name="check" [size]="12" [stroke]="3" /></span>
            <app-flag [code]="o.code" class="w-12" />
            <span class="font-semibold leading-tight">{{ 'origin.' + o.code | translate }}</span>
            <span class="text-xs text-muted">{{ o.currency }}</span>
          </button>
        }
      </div>
    </fieldset>

    <fieldset class="mt-8">
      <legend class="label">{{ 'wizard.auction' | translate }}</legend>
      <div class="flex flex-wrap gap-2">
        @for (a of store.auctionHouses(); track a) {
          <button type="button" class="chip" [class.chip--active]="s().auctionHouse === a" (click)="store.patch({ auctionHouse: a })">
            {{ 'auction.' + a | translate }}
          </button>
        }
      </div>
    </fieldset>

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      @if (zones().length) {
        <div animate.enter="reveal-enter" animate.leave="reveal-leave">
          <label class="label" for="zone">{{ 'wizard.zone' | translate }}</label>
          <select id="zone" class="input" [value]="s().pickupZone ?? '*'" (change)="store.patch({ pickupZone: orNull($event, '*') })">
            <option value="*">{{ 'wizard.zoneOther' | translate }}</option>
            @for (z of zones(); track z.code) { <option [value]="z.code" [selected]="z.code === s().pickupZone">{{ z.name }} ({{ z.code }})</option> }
          </select>
        </div>
      }
      <div>
        <label class="label" for="departure">{{ 'wizard.departurePort' | translate }}</label>
        <select id="departure" class="input" [value]="s().departurePort ?? 'AUTO'" (change)="store.patch({ departurePort: orNull($event, 'AUTO') })">
          <option value="AUTO">{{ 'wizard.departureAuto' | translate }}</option>
          @for (p of departurePorts(); track p) { <option [value]="p" [selected]="p === s().departurePort">{{ portName(p) }}</option> }
        </select>
        <p class="mt-2 text-xs text-muted">{{ 'wizard.departureHint' | translate }}</p>
      </div>
    </div>
  `,
})
export class StepOrigin {
  protected readonly store = inject(CalculatorStore);
  protected readonly s = this.store.state;
  protected readonly origins = ORIGINS;
  protected readonly zones = computed(() => PICKUP_ZONES[this.s().originCountry]);
  protected readonly departurePorts = computed(() => this.store.options()?.departurePorts ?? []);

  protected portName(code: string): string {
    return DEPARTURE_PORTS[code] ?? code;
  }

  protected orNull(e: Event, empty: string): string | null {
    const v = (e.target as HTMLSelectElement).value;
    return v === empty ? null : v;
  }
}
