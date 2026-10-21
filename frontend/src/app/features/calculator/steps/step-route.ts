import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { OriginCountry } from '../../../core/api/api.models';
import { CarImportApi } from '../../../core/api/carimport-api';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { CalculatorStore } from '../calculator.store';
import { EU_COUNTRIES, FALLBACK_PORTS, ORIGINS, PICKUP_ZONES } from '../calculator.options';

/** Step 1 - where from, which auction, which EU port, where to register. */
@Component({
  selector: 'app-step-route',
  imports: [TranslatePipe, CountryNamePipe],
  template: `
    <section class="space-y-8">
      <div>
        <h3 class="step-label">{{ 'wizard.origin' | translate }}</h3>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
          @for (o of origins; track o.code) {
            <button type="button" class="choice-card group" [class.choice-card--active]="s().originCountry === o.code"
                    (click)="store.selectOrigin(o.code)" [attr.aria-pressed]="s().originCountry === o.code">
              <span class="text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{{ o.flag }}</span>
              <span class="mt-2 font-semibold">{{ 'origin.' + o.code | translate }}</span>
              <span class="text-xs text-slate-500">{{ o.currency }}</span>
            </button>
          }
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 class="step-label">{{ 'wizard.auction' | translate }}</h3>
          <div class="flex flex-wrap gap-2">
            @for (a of store.auctionHouses(); track a) {
              <button type="button" class="chip" [class.chip--active]="s().auctionHouse === a"
                      (click)="store.patch({ auctionHouse: a })">{{ 'auction.' + a | translate }}</button>
            }
          </div>
        </div>
        @if (zones().length) {
          <div>
            <label class="step-label" for="zone">{{ 'wizard.zone' | translate }}</label>
            <select id="zone" class="input" [value]="s().pickupZone ?? '*'"
                    (change)="store.patch({ pickupZone: zoneValue($event) })">
              <option value="*">{{ 'wizard.zoneOther' | translate }}</option>
              @for (z of zones(); track z) {
                <option [value]="z">{{ z }}</option>
              }
            </select>
          </div>
        }
      </div>

      <div>
        <h3 class="step-label">{{ 'wizard.port' | translate }}</h3>
        <div class="grid gap-3 sm:grid-cols-3">
          @for (p of ports(); track p.code) {
            <button type="button" class="choice-card items-start text-left" [class.choice-card--active]="s().euPortCode === p.code"
                    (click)="store.patch({ euPortCode: p.code })">
              <span class="flex w-full items-center justify-between">
                <span class="font-semibold">⚓ {{ p.name }}</span>
                <span class="badge">VAT {{ p.vatRate * 100 }}%</span>
              </span>
              <span class="mt-1 text-xs text-slate-500">{{ p.countryCode | countryName: lang.locale() }}</span>
            </button>
          }
        </div>
      </div>

      <div class="max-w-sm">
        <label class="step-label" for="dest">{{ 'wizard.destination' | translate }}</label>
        <select id="dest" class="input" [value]="s().destinationCountry"
                (change)="store.patch({ destinationCountry: value($event) })">
          @for (c of countries; track c) {
            <option [value]="c">{{ c | countryName: lang.locale() }}</option>
          }
        </select>
      </div>
    </section>
  `,
})
export class StepRoute {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;
  protected readonly origins = ORIGINS;
  protected readonly countries = EU_COUNTRIES;
  protected readonly ports = toSignal(inject(CarImportApi).ports().pipe(catchError(() => of(FALLBACK_PORTS))), {
    initialValue: FALLBACK_PORTS,
  });
  protected readonly zones = computed(() => PICKUP_ZONES[this.s().originCountry as OriginCountry] ?? []);

  protected value(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }

  protected zoneValue(e: Event): string | null {
    const v = this.value(e);
    return v === '*' ? null : v;
  }
}
