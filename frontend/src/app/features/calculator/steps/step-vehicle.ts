import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { CATEGORIES, EXCISE_THRESHOLD_CC, FUELS } from '../calculator.options';
import { ProposalInput } from '../proposal-input';

const CC_MIN = 50;
const CC_MAX = 7000;

/** Step 2 - vehicle type, drivetrain, displacement slider with the live excise-threshold warning. */
@Component({
  selector: 'app-step-vehicle',
  imports: [TranslatePipe, LocalNumberPipe, CountryNamePipe, Icon, ProposalInput],
  template: `
    <!-- VIN -->
    <section class="mb-9 rounded-[6px] border border-line bg-panel p-5">
      <label class="label" for="vin">{{ 'vin.label' | translate }}</label>
      <form class="flex flex-col gap-2 sm:flex-row" (submit)="$event.preventDefault(); store.lookupVin(vinInput.value)">
        <input #vinInput id="vin" class="input font-mono uppercase tracking-wider" maxlength="20" autocomplete="off"
               spellcheck="false" [placeholder]="'vin.placeholder' | translate" [value]="s().vin ?? ''"
               aria-describedby="vin-hint" />
        <button type="submit" class="btn btn-primary shrink-0" [disabled]="store.vinLoading()">
          @if (store.vinLoading()) { <app-icon name="loader" [size]="18" class="animate-spin" /> } @else { <app-icon name="search" [size]="18" /> }
          {{ 'vin.fill' | translate }}
        </button>
      </form>
      <p id="vin-hint" class="mt-2 text-xs text-muted">{{ 'vin.hint' | translate }}</p>

      @if (store.vinError(); as err) {
        <p class="mt-3 flex items-start gap-2 text-sm text-danger" role="alert"><app-icon name="warning" [size]="16" class="mt-0.5 shrink-0" /> {{ err | translate }}</p>
      }

      @if (store.vinResult(); as d) {
        <div class="mt-4 rounded-[4px] bg-panel-2 p-4" animate.enter="reveal-enter" aria-live="polite">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <p class="text-lg font-extrabold">{{ d.description || d.vin }}</p>
            <button type="button" class="text-xs font-semibold text-brand-text hover:underline" (click)="store.clearVin()">{{ 'vin.clear' | translate }}</button>
          </div>
          <p class="mt-1 text-sm text-muted">{{ (d.source === 'NHTSA' ? 'vin.filled' : 'vin.filledOffline') | translate }}</p>
          <dl class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
            @if (d.modelYear) { <div><dt class="text-xs text-muted">{{ 'wizard.year' | translate }}</dt><dd class="font-semibold">{{ d.modelYear }}</dd></div> }
            @if (d.vehicleCategory) { <div><dt class="text-xs text-muted">{{ 'wizard.category' | translate }}</dt><dd class="font-semibold">{{ 'category.' + d.vehicleCategory | translate }}</dd></div> }
            @if (d.fuelType) { <div><dt class="text-xs text-muted">{{ 'wizard.fuel' | translate }}</dt><dd class="font-semibold">{{ 'fuel.' + d.fuelType | translate }}</dd></div> }
            @if (d.engineCc) { <div><dt class="text-xs text-muted">{{ 'wizard.engineCc' | translate }}</dt><dd class="font-semibold">{{ d.engineCc | localNumber: lang.locale() }} cm³@if (d.cylinders) { · {{ d.cylinders }} cyl }</dd></div> }
            @if (d.powerKw) { <div><dt class="text-xs text-muted">{{ 'wizard.powerKw' | translate }}</dt><dd class="font-semibold">{{ d.powerKw }} kW</dd></div> }
            @if (d.co2Gkm != null) { <div><dt class="text-xs text-muted">CO₂</dt><dd class="font-semibold">{{ d.co2Gkm }} g/km <span class="text-xs font-normal text-muted">· {{ 'vin.co2Epa' | translate }}</span></dd></div> }
            @if (d.massKg) { <div><dt class="text-xs text-muted">{{ 'wizard.mass' | translate }}</dt><dd class="font-semibold">{{ d.massKg | localNumber: lang.locale() }} kg@if (d.massSource === 'GVWR') { <span class="text-xs font-normal text-muted"> · {{ 'vin.massGvwr' | translate }}</span> }</dd></div> }
            @if (d.manufacturedIn) { <div><dt class="text-xs text-muted">{{ 'vin.madeIn' | translate }}</dt><dd class="font-semibold">{{ d.manufacturedIn | countryName: lang.locale() }}</dd></div> }
          </dl>
          @for (w of d.warnings; track w) {
            <p class="mt-2 flex items-start gap-2 text-xs text-fg/85"><app-icon name="warning" [size]="14" class="mt-0.5 shrink-0 text-brand-text" /> {{ 'vin.w.' + w.replace('vin.', '') | translate }}</p>
          }
        </div>
      }
    </section>

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
        <div class="flex flex-wrap items-center justify-between gap-3">
          <label class="label !mb-0" for="cc">{{ 'wizard.engineCc' | translate }}</label>
          <div class="relative w-40">
            <input id="cc" type="number" inputmode="numeric" min="50" max="10000" step="1"
                   class="input !py-2 pr-14 text-right text-xl font-extrabold tabular-nums"
                   [value]="s().engineCc" (input)="typed($any($event.target).value)" (blur)="$any($event.target).value = s().engineCc" />
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">cm³</span>
          </div>
        </div>
        <input type="range" [min]="ccMin" [max]="ccMax" step="1" class="cc-slider mt-5" [attr.aria-label]="'wizard.engineCc' | translate"
               [class.cc-slider--over]="store.exciseThresholdCrossed()" [style.--fill]="fill() + '%'"
               [value]="s().engineCc" (input)="store.patch({ engineCc: +$any($event.target).value })" />
        @if (store.indicativeExciseRate() !== null) {
          <div class="relative mt-1.5 h-4 text-[11px] text-muted">
            <span class="absolute -translate-x-1/2 whitespace-nowrap" [style.left.%]="thresholdPct">▲ {{ threshold | localNumber: lang.locale() }} cm³</span>
          </div>
        }
        <!-- common displacements: a tap instead of dragging the slider to the exact value -->
        <div class="mt-4 flex flex-wrap gap-1.5" role="group" [attr.aria-label]="'wizard.ccPopular' | translate">
          @for (c of popularCc; track c.cc) {
            <button type="button" class="chip !px-3 !py-1.5 text-[13px]" [class.chip--active]="s().engineCc === c.cc"
                    [title]="(c.cc | localNumber: lang.locale()) + ' cm³'" (click)="store.patch({ engineCc: c.cc })">
              {{ litres(c.litres) }} {{ 'wizard.litre' | translate }}
            </button>
          }
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

    <!-- what registration taxes are based on -->
    <fieldset class="mt-8">
      <legend class="label">{{ 'wizard.specTitle' | translate }}</legend>
      <p class="-mt-1 mb-4 text-xs text-muted">{{ 'wizard.specLead' | translate }}</p>
      <div class="grid gap-5 sm:grid-cols-3">
        <app-proposal-input inputId="co2" label="wizard.co2" unit="g/km" [step]="1" hint="wizard.co2Hint"
                            [value]="s().co2Gkm" [proposal]="store.co2Proposal()"
                            (changed)="store.patch({ co2Gkm: $event })" />
        <app-proposal-input inputId="kw" label="wizard.powerKw" unit="kW" [step]="1" hint="wizard.powerKwHint"
                            [value]="s().powerKw" [proposal]="store.powerProposal()"
                            (changed)="store.patch({ powerKw: $event })" />
        <app-proposal-input inputId="mass" label="wizard.mass" unit="kg" [step]="10" hint="wizard.massHint"
                            [value]="s().massKg" [proposal]="store.massProposal()"
                            (changed)="store.patch({ massKg: $event })" />
      </div>
    </fieldset>
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

  /** Typical displacements behind the usual badges (2.0 is 1998 cm³ - below the Polish 2000 cm³ excise step). */
  protected readonly popularCc = [
    { litres: 1.0, cc: 999 }, { litres: 1.4, cc: 1395 }, { litres: 1.5, cc: 1498 }, { litres: 1.6, cc: 1598 },
    { litres: 2.0, cc: 1998 }, { litres: 2.5, cc: 2488 }, { litres: 3.0, cc: 2996 }, { litres: 3.5, cc: 3456 },
    { litres: 5.0, cc: 4951 }, { litres: 5.7, cc: 5654 }, { litres: 6.2, cc: 6162 },
  ];

  /** "1,6" / "1.6" - always one decimal, like the badge on the car. */
  protected litres(v: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v);
  }

  /** Typed value: applied once it is a plausible displacement, the field shows the stored one again on blur. */
  protected typed(raw: string): void {
    const cc = Math.round(Number(raw));
    if (Number.isFinite(cc) && cc >= 50 && cc <= 10000) {
      this.store.patch({ engineCc: cc });
    }
  }

  protected selectFuel(f: (typeof FUELS)[number]): void {
    const electric = f === 'EV' || f === 'HYDROGEN';
    this.store.patch({ fuelType: f, engineCc: electric ? 0 : this.s().engineCc || 1598 });
  }
}
