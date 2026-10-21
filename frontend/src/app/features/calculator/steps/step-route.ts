import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { CarImportApi } from '../../../core/api/carimport-api';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Flag } from '../../../shared/flag/flag';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { EU_COUNTRIES, FALLBACK_PORTS, ORIGINS, PICKUP_ZONES } from '../calculator.options';

/** Step 1 - where from, which auction, which EU port, where to register. */
@Component({
  selector: 'app-step-route',
  imports: [TranslatePipe, CountryNamePipe, Flag, Icon],
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

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <fieldset>
        <legend class="label">{{ 'wizard.auction' | translate }}</legend>
        <div class="flex flex-wrap gap-2">
          @for (a of store.auctionHouses(); track a) {
            <button type="button" class="chip" [class.chip--active]="s().auctionHouse === a" (click)="store.patch({ auctionHouse: a })">
              {{ 'auction.' + a | translate }}
            </button>
          }
        </div>
      </fieldset>
      @if (zones().length) {
        <div animate.enter="reveal-enter" animate.leave="reveal-leave">
          <label class="label" for="zone">{{ 'wizard.zone' | translate }}</label>
          <select id="zone" class="input" [value]="s().pickupZone ?? '*'" (change)="store.patch({ pickupZone: zoneValue($event) })">
            <option value="*">{{ 'wizard.zoneOther' | translate }}</option>
            @for (z of zones(); track z) { <option [value]="z">{{ z }}</option> }
          </select>
        </div>
      }
    </div>

    <fieldset class="mt-8">
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
        <select id="dest" class="input" [value]="s().destinationCountry" (change)="store.patch({ destinationCountry: value($event) })">
          @for (c of countries(); track c.code) { <option [value]="c.code">{{ c.name }}</option> }
        </select>
      </div>
    </div>
  `,
})
export class StepRoute {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;
  protected readonly origins = ORIGINS;
  protected readonly ports = isPlatformBrowser(inject(PLATFORM_ID))
    ? toSignal(inject(CarImportApi).ports().pipe(catchError(() => of(FALLBACK_PORTS))), { initialValue: FALLBACK_PORTS })
    : () => FALLBACK_PORTS;
  protected readonly zones = computed(() => PICKUP_ZONES[this.s().originCountry] ?? []);

  /** EU countries sorted by their localized name. */
  protected readonly countries = computed(() => {
    const names = new Intl.DisplayNames([this.lang.locale()], { type: 'region' });
    return EU_COUNTRIES.map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) =>
      a.name.localeCompare(b.name, this.lang.locale()),
    );
  });

  protected value(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }

  protected zoneValue(e: Event): string | null {
    const v = this.value(e);
    return v === '*' ? null : v;
  }
}
