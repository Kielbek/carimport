import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { CarImportApi } from '../../../core/api/carimport-api';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Flag } from '../../../shared/flag/flag';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DELIVERY_MODES, EU_COUNTRIES, FALLBACK_PORTS } from '../calculator.options';

/** Step 4 - EU port of clearance, country of registration and the door delivery priced per km. */
@Component({
  selector: 'app-step-destination',
  imports: [TranslatePipe, CountryNamePipe, LocalNumberPipe, Flag, Icon],
  template: `
    <fieldset>
      <legend class="label">{{ 'wizard.port' | translate }}</legend>
      <div class="grid gap-3 sm:grid-cols-3">
        @for (p of ports(); track p.code) {
          <button type="button" class="choice" [class.choice--active]="s().euPortCode === p.code" (click)="store.patch({ euPortCode: p.code })">
            <span class="flex w-full items-center gap-3">
              <app-flag [code]="p.countryCode" class="w-7" />
              <span class="font-semibold">{{ p.name }}</span>
              <span class="badge ml-auto">VAT {{ p.vatRate * 100 }}%</span>
            </span>
            <span class="pl-10 text-xs text-muted">{{ p.countryCode | countryName: lang.locale() }}</span>
          </button>
        }
      </div>
    </fieldset>

    <div class="mt-8 max-w-sm">
      <label class="label" for="dest">{{ 'wizard.destination' | translate }}</label>
      <div class="flex items-center gap-3">
        <app-flag [code]="s().destinationCountry" class="w-9" />
        <select id="dest" class="input" [value]="s().destinationCountry" (change)="store.patch({ destinationCountry: value($event), deliveryDistanceKm: null, pricePerKm: null, postImportServices: null })">
          @for (c of countries(); track c.code) { <option [value]="c.code" [selected]="c.code === s().destinationCountry">{{ c.name }}</option> }
        </select>
      </div>
    </div>

    <fieldset class="mt-8">
      <legend class="label">{{ 'wizard.delivery' | translate }}</legend>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        @for (m of modes; track m.code) {
          <button type="button" class="choice" [class.choice--active]="mode() === m.code"
                  [disabled]="m.code === 'SELF_DRIVE' && !store.isRunner()" [class.opacity-40]="m.code === 'SELF_DRIVE' && !store.isRunner()"
                  (click)="store.patch({ deliveryMode: m.code, pricePerKm: null })">
            <span class="choice-check"><app-icon name="check" [size]="12" [stroke]="3" /></span>
            <app-icon [name]="m.icon" [size]="26" class="text-brand-text" />
            <span class="mt-2 font-semibold">{{ 'delivery.' + m.code | translate }}</span>
            <span class="text-xs text-muted">{{ 'deliveryHint.' + m.code | translate }}</span>
          </button>
        }
      </div>
    </fieldset>

    @if (mode() !== 'PORT_PICKUP') {
      <div class="mt-6 grid gap-6 rounded-[4px] border border-line p-5 sm:grid-cols-2" animate.enter="reveal-enter" animate.leave="reveal-leave">
        <div>
          <label class="label" for="km">{{ 'wizard.distance' | translate }}</label>
          <div class="relative">
            <input id="km" type="number" min="0" max="5000" class="input pr-14" [value]="store.effectiveDistance() ?? ''"
                   (input)="store.patch({ deliveryDistanceKm: num($event) })" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">km</span>
          </div>
          <p class="mt-2 text-xs text-muted">{{ 'wizard.distanceHint' | translate: { port: portName() } }}</p>
        </div>
        <div>
          <span class="label">{{ 'wizard.pricePerKm' | translate }}</span>
          @if (store.roadRate(); as r) {
            <p class="text-sm">
              {{ 'wizard.tariff' | translate: { min: (r.perKmMin | localNumber: lang.locale()), max: (r.perKmMax | localNumber: lang.locale()), cur: r.currency, fixed: (r.fixedFee | localNumber: lang.locale()), minimum: (r.minimumCharge | localNumber: lang.locale()) } }}
            </p>
            <label class="mt-3 flex cursor-pointer items-center gap-2.5 text-sm">
              <input type="checkbox" class="checkbox" [checked]="customRate()" (change)="toggleCustom($any($event.target).checked)" />
              {{ 'wizard.ownRate' | translate }}
            </label>
            @if (customRate()) {
              <div class="relative mt-3" animate.enter="reveal-enter">
                <input type="number" min="0" step="0.05" class="input pr-20" [value]="s().pricePerKm ?? r.perKmMax"
                       (input)="store.patch({ pricePerKm: num($event) })" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">{{ r.currency }}/km</span>
              </div>
            }
          } @else {
            <p class="text-sm text-muted">{{ 'wizard.tariffUnknown' | translate }}</p>
          }
        </div>
      </div>
    }
  `,
})
export class StepDestination {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;
  protected readonly modes = DELIVERY_MODES;
  protected readonly mode = computed(() => this.s().deliveryMode ?? 'CAR_CARRIER');
  protected readonly customRate = signal(this.s().pricePerKm != null);
  protected readonly ports = isPlatformBrowser(inject(PLATFORM_ID))
    ? toSignal(inject(CarImportApi).ports().pipe(catchError(() => of(FALLBACK_PORTS))), { initialValue: FALLBACK_PORTS })
    : () => FALLBACK_PORTS;
  protected readonly portName = computed(() => this.ports().find((p) => p.code === this.s().euPortCode)?.name ?? '');

  protected readonly countries = computed(() => {
    const names = new Intl.DisplayNames([this.lang.locale()], { type: 'region' });
    return EU_COUNTRIES.map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) =>
      a.name.localeCompare(b.name, this.lang.locale()),
    );
  });

  protected toggleCustom(on: boolean): void {
    this.customRate.set(on);
    this.store.patch({ pricePerKm: on ? (this.store.roadRate()?.perKmMax ?? null) : null });
  }

  protected value(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }

  protected num(e: Event): number | null {
    const v = (e.target as HTMLInputElement).value;
    return v === '' ? null : Number(v);
  }
}
