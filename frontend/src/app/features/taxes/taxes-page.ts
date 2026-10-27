import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CalculationRequest, FuelType, OriginCountry, TaxSummary } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { isDisplayCurrency } from '../../core/currency/currencies';
import { LanguageService } from '../../core/i18n/language.service';
import { guidePath } from '../../core/routing/guide-paths';
import { pathFor } from '../../core/routing/paths';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { Select, SelectOption } from '../../shared/select/select';
import { EU_COUNTRIES, ORIGINS } from '../calculator/calculator.options';
import { GUIDE_COUNTRIES } from '../guides/guide-data.generated';

const TAX_FUELS: FuelType[] = ['PETROL', 'DIESEL', 'LPG', 'HEV', 'PHEV', 'EV'];

/**
 * Free tax-only calculator for search traffic ("customs duty on a car from the USA", "excise calculator"): duty,
 * import VAT and the destination's registration / excise tax from the same engine as the full calculation, with typical
 * transport in the customs value. The door-to-door cost stays in the main calculator.
 */
@Component({
  selector: 'app-taxes-page',
  imports: [FormsModule, RouterLink, TranslatePipe, Flag, Icon, Select],
  template: `
    <article class="site max-w-5xl py-12 lg:py-16">
      <p class="eyebrow">{{ 'taxes.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4 max-w-3xl">{{ 'taxes.title' | translate }}</h1>
      <p class="lead mt-4 max-w-3xl">{{ 'taxes.lead' | translate }}</p>

      <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form class="card grid gap-4 p-6 sm:grid-cols-2" (ngSubmit)="calculate()">
          <div class="sm:col-span-2">
            <span class="label">{{ 'taxes.origin' | translate }}</span>
            <div class="flex flex-wrap gap-2">
              @for (o of origins; track o.code) {
                <button type="button" class="chip" [class.chip--active]="origin() === o.code" (click)="setOrigin(o.code)">
                  <app-flag [code]="o.code" class="w-5" /> {{ 'origin.' + o.code | translate }}
                </button>
              }
            </div>
          </div>
          <div>
            <label class="label" for="tx-price">{{ 'taxes.price' | translate: { currency: currency() } }}</label>
            <input id="tx-price" type="number" class="input" min="100" step="100" required [ngModel]="price()" (ngModelChange)="price.set($event)" name="price" />
          </div>
          <div>
            <label class="label" for="tx-year">{{ 'taxes.year' | translate }}</label>
            <input id="tx-year" type="number" class="input" min="1950" [max]="currentYear" required [ngModel]="year()" (ngModelChange)="year.set($event)" name="year" />
          </div>
          <div>
            <label class="label" for="tx-fuel">{{ 'taxes.fuel' | translate }}</label>
            <app-select inputId="tx-fuel" [title]="'taxes.fuel' | translate" [options]="fuelOptions()" [value]="fuel()"
                        (changed)="fuel.set($any($event))" />
          </div>
          @if (fuel() !== 'EV') {
            <div>
              <label class="label" for="tx-cc">{{ 'taxes.engine' | translate }}</label>
              <input id="tx-cc" type="number" class="input" min="50" max="10000" required [ngModel]="cc()" (ngModelChange)="cc.set($event)" name="cc" />
            </div>
          }
          <div>
            <label class="label" for="tx-kw">{{ 'taxes.power' | translate }} <span class="font-normal normal-case text-muted">({{ 'taxes.optional' | translate }})</span></label>
            <input id="tx-kw" type="number" class="input" min="1" max="1500" [ngModel]="kw()" (ngModelChange)="kw.set($event)" name="kw" />
          </div>
          @if (fuel() !== 'EV') {
            <div>
              <label class="label" for="tx-co2">{{ 'taxes.co2' | translate }} <span class="font-normal normal-case text-muted">({{ 'taxes.optional' | translate }})</span></label>
              <input id="tx-co2" type="number" class="input" min="0" max="900" [ngModel]="co2()" (ngModelChange)="co2.set($event)" name="co2" />
            </div>
          }
          <div class="sm:col-span-2">
            <label class="label" for="tx-dest">{{ 'taxes.destination' | translate }}</label>
            <app-select inputId="tx-dest" [title]="'taxes.destination' | translate" [options]="countryOptions()" [value]="destination()"
                        (changed)="destination.set($event)" />
          </div>
          <button type="submit" class="btn btn-primary sm:col-span-2" [disabled]="busy()">
            <app-icon name="calculator" [size]="18" /> {{ (busy() ? 'taxes.calculating' : 'taxes.submit') | translate }}
          </button>
        </form>

        <section class="rounded-[6px] border-2 border-brand bg-panel p-6" aria-live="polite">
          <h2 class="eyebrow">{{ 'taxes.resultTitle' | translate }}</h2>
          @if (result(); as r) {
            <table class="mt-4 w-full text-[15px]">
              <tbody class="divide-y divide-line border-y border-line">
                <tr><th scope="row" class="py-2.5 text-left font-normal">{{ 'taxes.duty' | translate: { rate: pct(r.taxes.duty.rate) } }}</th><td class="py-2.5 text-right tabular-nums">{{ money(r.taxes.duty.amount, r.currency) }}</td></tr>
                <tr><th scope="row" class="py-2.5 text-left font-normal">{{ 'taxes.vat' | translate: { rate: pct(r.taxes.vat.rate), country: countryName(r.taxes.vat.country) } }}</th><td class="py-2.5 text-right tabular-nums">{{ money(r.taxes.vat.amount, r.currency) }}</td></tr>
                @for (n of r.taxes.national; track n.code) {
                  <tr><th scope="row" class="py-2.5 text-left font-normal">{{ 'cost.' + n.code | translate }}</th><td class="py-2.5 text-right tabular-nums">{{ money(n.amount, r.currency) }}</td></tr>
                }
                @if (!r.taxes.national.length) {
                  <tr><th scope="row" class="py-2.5 text-left font-normal text-muted" colspan="2">{{ 'taxes.noNational' | translate: { country: countryName(destination()) } }}</th></tr>
                }
                <tr class="font-extrabold"><th scope="row" class="py-3 text-left">{{ 'taxes.total' | translate }}</th><td class="py-3 text-right text-lg tabular-nums text-brand-text">{{ money(taxTotal(r.taxes), r.currency) }}</td></tr>
              </tbody>
            </table>
            <p class="mt-3 text-xs text-muted">{{ 'taxes.note' | translate: { port: r.clearancePort } }}</p>
            <a [routerLink]="calculator()" [queryParams]="{ from: origin(), to: destination() }" class="btn btn-outline mt-5 w-full">
              {{ 'taxes.fullCost' | translate }} <app-icon name="arrow-right" [size]="16" />
            </a>
          } @else if (failed()) {
            <p class="mt-4 text-sm font-semibold text-danger" role="alert">{{ 'taxes.error' | translate }}</p>
          } @else {
            <p class="mt-4 text-sm text-muted">{{ 'taxes.empty' | translate }}</p>
          }
        </section>
      </div>

      <section class="mt-14 grid gap-10 lg:grid-cols-3">
        @for (n of [1, 2, 3]; track n) {
          <div>
            <h2 class="text-xl font-extrabold">{{ 'taxes.p' + n + 'Title' | translate }}</h2>
            <p class="mt-3 leading-relaxed text-fg/85">{{ 'taxes.p' + n | translate }}</p>
          </div>
        }
      </section>

      <section class="mt-14">
        <h2 class="text-xl font-extrabold">{{ 'taxes.countriesTitle' | translate }}</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          @for (c of countries(); track c.code) {
            <a [routerLink]="countryGuide(c.code)" class="chip"><app-flag [code]="c.code" class="w-5" /> {{ c.name }}</a>
          }
        </div>
        <p class="mt-8 text-sm"><a [routerLink]="method()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'layout.method' | translate }}</a></p>
      </section>
    </article>
  `,
})
export class TaxesPage {
  private readonly api = inject(CarImportApi);
  protected readonly lang = inject(LanguageService);

  protected readonly origins = ORIGINS;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly origin = signal<OriginCountry>('USA');
  protected readonly price = signal(15000);
  protected readonly year = signal(this.currentYear - 5);
  protected readonly fuel = signal<FuelType>('PETROL');
  protected readonly cc = signal(1998);
  protected readonly kw = signal<number | null>(null);
  protected readonly co2 = signal<number | null>(null);
  protected readonly destination = signal(this.lang.info().country);

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);
  protected readonly result = signal<{ taxes: TaxSummary; currency: string; clearancePort: string } | null>(null);

  protected readonly currency = computed(() => ORIGINS.find((o) => o.code === this.origin())!.currency);
  protected readonly countries = computed(() =>
    [...EU_COUNTRIES]
      .map((code) => ({ code, name: this.countryName(code) }))
      .sort((a, b) => a.name.localeCompare(b.name, this.lang.locale())),
  );
  protected readonly countryOptions = computed<SelectOption[]>(() =>
    this.countries().map((c) => ({ value: c.code, label: c.name, flag: c.code })),
  );
  private readonly fuelLabels = toSignal(inject(TranslateService).stream(TAX_FUELS.map((f) => 'fuel.' + f)),
    { initialValue: {} as Record<string, string> });
  protected readonly fuelOptions = computed<SelectOption[]>(() =>
    TAX_FUELS.map((f) => ({ value: f, label: this.fuelLabels()['fuel.' + f] ?? f })),
  );
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly method = computed(() => pathFor('method', this.lang.current()));

  protected setOrigin(code: OriginCountry): void {
    if (code !== this.origin()) {
      this.origin.set(code);
      this.price.set(ORIGINS.find((o) => o.code === code)!.typicalBid);
    }
  }

  protected calculate(): void {
    const dest = this.destination();
    const country = GUIDE_COUNTRIES.find((c) => c.code === dest)!;
    // clearance in the country itself when it has a port, else at its nearest port by road
    const port = country.nearest.find((p) => p.code.startsWith(dest))?.code ?? country.nearest[0].code;
    const display = isDisplayCurrency(country.currency) ? country.currency : 'EUR';
    const ev = this.fuel() === 'EV';
    const request: CalculationRequest = {
      originCountry: this.origin(),
      auctionHouse: ORIGINS.find((o) => o.code === this.origin())!.auctions[0],
      titleType: 'CLEAN',
      pickupZone: null,
      departurePort: null,
      bidPrice: Number(this.price()),
      vehicleCategory: 'PASSENGER_CAR',
      fuelType: this.fuel(),
      engineCc: ev ? 0 : Number(this.cc()),
      productionYear: Number(this.year()),
      historicOriginalCondition: false,
      condition: 'RUN_AND_DRIVE',
      shippingMethod: 'CONTAINER_SHARED',
      euPortCode: port,
      destinationCountry: dest,
      buyerType: 'PRIVATE',
      customsProcedure: 'STANDARD_4000',
      displayCurrency: display,
      deliveryMode: null,
      deliveryDistanceKm: null,
      pricePerKm: null,
      repairEstimate: 0,
      insuranceEstimate: null,
      postImportServices: null,
      destinationAddress: null,
      destinationLat: null,
      destinationLon: null,
      co2Gkm: ev ? 0 : (this.co2() || null),
      powerKw: this.kw() || null,
      registrationTaxOwn: null,
      massKg: null,
      vin: null,
      vehicleDescription: null,
    };
    this.busy.set(true);
    this.failed.set(false);
    this.api.preview(request).subscribe({
      next: (r) => {
        this.result.set({ taxes: r.taxes, currency: r.currency, clearancePort: r.clearancePort });
        this.busy.set(false);
      },
      error: () => {
        this.result.set(null);
        this.failed.set(true);
        this.busy.set(false);
      },
    });
  }

  protected taxTotal(t: TaxSummary): number {
    return t.duty.amount + t.vat.amount + t.national.reduce((s, n) => s + n.amount, 0);
  }

  protected countryGuide(code: string): string {
    return guidePath({ section: 'countries', item: code }, this.lang.current());
  }

  protected countryName(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(code) ?? code;
  }

  protected pct(rate: number | null): string {
    return rate == null ? '' : new Intl.NumberFormat(this.lang.locale(), { maximumFractionDigits: 1 }).format(rate * 100);
  }

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }
}
