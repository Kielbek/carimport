import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { CalculatorStore } from '../calculator.store';
import { CATEGORIES, EXCISE_THRESHOLD_CC, FUELS } from '../calculator.options';

/** Step 2 - vehicle type, drivetrain, displacement slider with the live excise-threshold warning. */
@Component({
  selector: 'app-step-vehicle',
  imports: [TranslatePipe, LocalNumberPipe],
  template: `
    <section class="space-y-8">
      <div>
        <h3 class="step-label">{{ 'wizard.category' | translate }}</h3>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-5">
          @for (c of categories; track c.code) {
            <button type="button" class="choice-card group" [class.choice-card--active]="s().vehicleCategory === c.code"
                    (click)="store.patch({ vehicleCategory: c.code })">
              <span class="text-3xl transition-transform duration-300 group-hover:translate-x-1">{{ c.icon }}</span>
              <span class="mt-1 text-sm font-medium">{{ 'category.' + c.code | translate }}</span>
            </button>
          }
        </div>
      </div>

      <div>
        <h3 class="step-label">{{ 'wizard.fuel' | translate }}</h3>
        <div class="grid grid-cols-4 gap-2 sm:grid-cols-8">
          @for (f of fuels; track f.code) {
            <button type="button" class="choice-card !p-2" [class.choice-card--active]="s().fuelType === f.code"
                    (click)="store.patch({ fuelType: f.code, engineCc: f.code === 'EV' || f.code === 'HYDROGEN' ? 0 : s().engineCc || 1598 })">
              <span class="text-2xl">{{ f.icon }}</span>
              <span class="text-xs font-medium">{{ 'fuel.' + f.code | translate }}</span>
            </button>
          }
        </div>
      </div>

      @if (store.needsEngineCc()) {
        <div class="rounded-2xl border p-5 transition-colors duration-500"
             [class]="store.exciseThresholdCrossed() ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40' : 'border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/30'">
          <div class="flex items-baseline justify-between">
            <label class="step-label !mb-0" for="cc">{{ 'wizard.engineCc' | translate }}</label>
            <span class="text-2xl font-bold tabular-nums">{{ s().engineCc | localNumber: lang.locale() }} cm³</span>
          </div>
          <input id="cc" type="range" min="50" max="7000" step="1" class="cc-slider mt-4 w-full"
                 [class.cc-slider--over]="store.exciseThresholdCrossed()"
                 [value]="s().engineCc" (input)="store.patch({ engineCc: +$any($event.target).value })" />
          <div class="relative mt-1 h-4 text-[10px] text-slate-500">
            <span class="absolute -translate-x-1/2" [style.left.%]="thresholdPct">▲ {{ threshold | localNumber: lang.locale() }} cm³</span>
          </div>
          @if (store.indicativeExciseRate(); as rate) {
            <p class="mt-3 flex items-center gap-2 text-sm">
              <span class="badge" [class.badge--danger]="store.exciseThresholdCrossed()">
                {{ 'wizard.exciseRate' | translate: { rate: rate | localNumber: lang.locale() } }}
              </span>
            </p>
          }
          @if (store.exciseThresholdCrossed()) {
            <p class="excise-alert mt-3 text-sm font-semibold text-rose-700 dark:text-rose-300" role="alert">
              ⚠️ {{ 'wizard.exciseWarning' | translate: { from: 3.1 | localNumber: lang.locale(), to: 18.6 | localNumber: lang.locale() } }}
            </p>
          }
        </div>
      }

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label class="step-label" for="year">{{ 'wizard.year' | translate }}</label>
          <input id="year" type="number" class="input" min="1900" [max]="currentYear" [value]="s().productionYear"
                 (input)="store.patch({ productionYear: +$any($event.target).value })" />
        </div>
        @if (store.canBeHistoric()) {
          <label class="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:bg-amber-950/30">
            <input type="checkbox" class="mt-1 size-4 accent-amber-600" [checked]="s().historicOriginalCondition"
                   (change)="store.patch({ historicOriginalCondition: $any($event.target).checked })" />
            <span>
              <span class="font-semibold">🏛️ {{ 'wizard.historic' | translate }}</span>
              <span class="block text-xs text-slate-600 dark:text-slate-400">{{ 'wizard.historicHint' | translate }}</span>
            </span>
          </label>
        }
      </div>
    </section>
  `,
})
export class StepVehicle {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;
  protected readonly categories = CATEGORIES;
  protected readonly fuels = FUELS;
  protected readonly threshold = EXCISE_THRESHOLD_CC;
  protected readonly thresholdPct = ((EXCISE_THRESHOLD_CC - 50) / (7000 - 50)) * 100;
  protected readonly currentYear = new Date().getFullYear();
}
