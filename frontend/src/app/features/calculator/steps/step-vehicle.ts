import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { CATEGORIES, EXCISE_THRESHOLD_CC, FUELS } from '../calculator.options';

const CC_MIN = 50;
const CC_MAX = 7000;

/** Step 2 - vehicle type, drivetrain, displacement slider with the live excise-threshold warning. */
@Component({
  selector: 'app-step-vehicle',
  imports: [TranslatePipe, LocalNumberPipe, Icon],
  template: `
    <fieldset>
      <legend class="label">{{ 'wizard.category' | translate }}</legend>
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-5">
        @for (c of categories; track c) {
          <button type="button" class="choice items-center !py-5 text-center" [class.choice--active]="s().vehicleCategory === c"
                  (click)="store.patch({ vehicleCategory: c })">
            <app-icon [name]="c" [size]="30" [stroke]="1.5" class="text-brand-text" />
            <span class="mt-1 text-sm font-semibold">{{ 'category.' + c | translate }}</span>
          </button>
        }
      </div>
    </fieldset>

    <fieldset class="mt-8">
      <legend class="label">{{ 'wizard.fuel' | translate }}</legend>
      <div class="grid grid-cols-4 gap-2 sm:grid-cols-8">
        @for (f of fuels; track f) {
          <button type="button" class="choice items-center !gap-2 !px-2 !py-3 text-center" [class.choice--active]="s().fuelType === f"
                  (click)="selectFuel(f)">
            <app-icon [name]="f" [size]="22" class="text-brand-text" />
            <span class="text-[12px] font-semibold leading-tight">{{ 'fuel.' + f | translate }}</span>
          </button>
        }
      </div>
    </fieldset>

    @if (store.needsEngineCc()) {
      <div class="mt-8 rounded-[6px] border p-5 transition-colors duration-500" animate.enter="reveal-enter" animate.leave="reveal-leave"
           [class]="store.exciseThresholdCrossed() ? 'border-danger bg-danger-soft' : 'border-line bg-panel-2'">
        <div class="flex items-baseline justify-between">
          <label class="label !mb-0" for="cc">{{ 'wizard.engineCc' | translate }}</label>
          <output for="cc" class="text-2xl font-extrabold tabular-nums">{{ s().engineCc | localNumber: lang.locale() }} cm³</output>
        </div>
        <input id="cc" type="range" [min]="ccMin" [max]="ccMax" step="1" class="cc-slider mt-5"
               [class.cc-slider--over]="store.exciseThresholdCrossed()" [style.--fill]="fill() + '%'"
               [value]="s().engineCc" (input)="store.patch({ engineCc: +$any($event.target).value })" />
        <div class="relative mt-1.5 h-4 text-[11px] text-muted">
          <span class="absolute -translate-x-1/2 whitespace-nowrap" [style.left.%]="thresholdPct">▲ {{ threshold | localNumber: lang.locale() }} cm³</span>
        </div>
        @if (store.indicativeExciseRate(); as rate) {
          <p class="mt-3"><span class="badge" [class.badge--danger]="store.exciseThresholdCrossed()">
            {{ 'wizard.exciseRate' | translate: { rate: rate | localNumber: lang.locale() } }}</span></p>
        }
        @if (store.exciseThresholdCrossed()) {
          <p class="shake mt-3 flex items-start gap-2 text-sm font-semibold text-danger" role="alert" animate.leave="reveal-leave">
            <app-icon name="warning" [size]="18" class="mt-px" />
            {{ 'wizard.exciseWarning' | translate: { from: 3.1 | localNumber: lang.locale(), to: 18.6 | localNumber: lang.locale() } }}
          </p>
        }
      </div>
    }

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <div>
        <label class="label" for="year">{{ 'wizard.year' | translate }}</label>
        <input id="year" type="number" class="input" min="1900" [max]="currentYear" [value]="s().productionYear"
               (input)="store.patch({ productionYear: +$any($event.target).value })" />
      </div>
      @if (store.canBeHistoric()) {
        <label class="flex cursor-pointer items-start gap-3 rounded-[6px] border border-brand/60 bg-brand/10 p-4"
               animate.enter="reveal-enter" animate.leave="reveal-leave">
          <input type="checkbox" class="checkbox" [checked]="s().historicOriginalCondition"
                 (change)="store.patch({ historicOriginalCondition: $any($event.target).checked })" />
          <span>
            <span class="flex items-center gap-2 font-semibold"><app-icon name="landmark" [size]="16" />{{ 'wizard.historic' | translate }}</span>
            <span class="mt-1 block text-xs text-muted">{{ 'wizard.historicHint' | translate }}</span>
          </span>
        </label>
      }
    </div>
  `,
})
export class StepVehicle {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;
  protected readonly categories = CATEGORIES;
  protected readonly fuels = FUELS;
  protected readonly threshold = EXCISE_THRESHOLD_CC;
  protected readonly ccMin = CC_MIN;
  protected readonly ccMax = CC_MAX;
  protected readonly thresholdPct = ((EXCISE_THRESHOLD_CC - CC_MIN) / (CC_MAX - CC_MIN)) * 100;
  protected readonly fill = computed(() => ((this.s().engineCc - CC_MIN) / (CC_MAX - CC_MIN)) * 100);
  protected readonly currentYear = new Date().getFullYear();

  protected selectFuel(f: (typeof FUELS)[number]): void {
    const electric = f === 'EV' || f === 'HYDROGEN';
    this.store.patch({ fuelType: f, engineCc: electric ? 0 : this.s().engineCc || 1598 });
  }
}
