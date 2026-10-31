import { Component, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CostLine, DeliveryMode, EuImportResult, FuelType } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { isDisplayCurrency } from '../../core/currency/currencies';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { ArticleText } from '../../shared/article/article-text';
import { Icon } from '../../shared/icon/icon';
import { Select, SelectOption } from '../../shared/select/select';
import { EU_COUNTRIES } from '../calculator/calculator.options';
import { GUIDE_COUNTRIES } from '../guides/guide-data.generated';

const FUELS: FuelType[] = ['PETROL', 'DIESEL', 'LPG', 'HEV', 'PHEV', 'EV'];
const MODES: DeliveryMode[] = ['CAR_CARRIER', 'TOW_TRUCK', 'SELF_DRIVE'];
/** Lines whose label differs from the non-EU calculator's (no auction, no port). */
const OWN_LABELS = new Set(['PURCHASE_PRICE', 'EU_TRANSPORT_CAR_CARRIER', 'EU_TRANSPORT_TOW_TRUCK', 'EU_TRANSPORT_SELF_DRIVE',
  'EU_NEW_VEHICLE_VAT', 'INSURANCE_FIRST_YEAR']);
/** Warnings of the EU engine with their own text; the rest reuse the main calculator's. */
const OWN_WARNINGS = new Set(['warning.euImport.usedVatAtOrigin', 'warning.euImport.newVehicleVat',
  'warning.euImport.exportPlates', 'warning.euImport.ferry']);

/**
 * Cost of a car bought in another member state - no customs, no port: the road trip, VAT only for a new car, the
 * destination's excise or registration tax on the price and the registration fees. Free, no report.
 */
@Component({
  selector: 'app-eu-import-page',
  imports: [FormsModule, RouterLink, TranslatePipe, Icon, Select, ArticleText],
  template: `
    <article class="site max-w-5xl py-12 lg:py-16">
      <p class="eyebrow">{{ 'euImport.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4 max-w-3xl">{{ 'euImport.title' | translate }}</h1>
      <p class="lead mt-4 max-w-3xl">{{ 'euImport.lead' | translate }}</p>

      <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form class="card grid grid-cols-[minmax(0,1fr)] content-start gap-4 p-5 sm:grid-cols-2 sm:p-6" (ngSubmit)="calculate()">
          <div>
            <label class="label" for="eu-from">{{ 'euImport.origin' | translate }}</label>
            <app-select inputId="eu-from" [title]="'euImport.origin' | translate" [options]="originOptions()" [value]="origin()"
                        (changed)="origin.set($event)" />
          </div>
          <div>
            <label class="label" for="eu-to">{{ 'euImport.destination' | translate }}</label>
            <app-select inputId="eu-to" [title]="'euImport.destination' | translate" [options]="destinationOptions()" [value]="destination()"
                        (changed)="setDestination($event)" />
          </div>
          <div>
            <label class="label" for="eu-price">{{ 'euImport.price' | translate }}</label>
            <input id="eu-price" type="number" class="input" min="100" step="100" required [ngModel]="price()"
                   (ngModelChange)="price.set($event)" name="price" />
          </div>
          <div>
            <label class="label" for="eu-cur">{{ 'euImport.currency' | translate }}</label>
            <app-select inputId="eu-cur" [title]="'euImport.currency' | translate" [options]="currencyOptions()" [value]="currency()"
                        (changed)="currency.set($event)" />
          </div>
          <div>
            <label class="label" for="eu-year">{{ 'euImport.year' | translate }}</label>
            <input id="eu-year" type="number" class="input" min="1950" [max]="currentYear" required [ngModel]="year()"
                   (ngModelChange)="year.set($event)" name="year" />
          </div>
          <div>
            <label class="label" for="eu-fuel">{{ 'euImport.fuel' | translate }}</label>
            <app-select inputId="eu-fuel" [title]="'euImport.fuel' | translate" [options]="fuelOptions()" [value]="fuel()"
                        (changed)="fuel.set($any($event))" />
          </div>
          @if (fuel() !== 'EV') {
            <div>
              <label class="label" for="eu-cc">{{ 'euImport.engine' | translate }}</label>
              <input id="eu-cc" type="number" class="input" min="50" max="10000" required [ngModel]="cc()" (ngModelChange)="cc.set($event)" name="cc" />
            </div>
          }
          <div>
            <label class="label" for="eu-kw">{{ 'euImport.power' | translate }} <span class="font-normal normal-case text-muted">({{ 'euImport.optional' | translate }})</span></label>
            <input id="eu-kw" type="number" class="input" min="1" max="1500" [ngModel]="kw()" (ngModelChange)="kw.set($event)" name="kw" />
          </div>
          @if (fuel() !== 'EV') {
            <div>
              <label class="label" for="eu-co2">{{ 'euImport.co2' | translate }} <span class="font-normal normal-case text-muted">({{ 'euImport.optional' | translate }})</span></label>
              <input id="eu-co2" type="number" class="input" min="0" max="900" [ngModel]="co2()" (ngModelChange)="co2.set($event)" name="co2" />
            </div>
          }
          <div class="sm:col-span-2">
            <span class="label">{{ 'euImport.transportLabel' | translate }}</span>
            <div class="flex flex-wrap gap-2">
              @for (m of modes; track m) {
                <button type="button" class="chip" [class.chip--active]="mode() === m" (click)="mode.set(m)">{{ 'euImport.mode.' + m | translate }}</button>
              }
            </div>
          </div>
          <label class="flex items-start gap-3 text-sm sm:col-span-2">
            <input type="checkbox" class="mt-1" [ngModel]="newVehicle()" (ngModelChange)="newVehicle.set($event)" name="newVehicle" />
            <span><span class="font-semibold">{{ 'euImport.newVehicle' | translate }}</span><br><span class="text-muted">{{ 'euImport.newVehicleHint' | translate }}</span></span>
          </label>
          <button type="submit" class="btn btn-primary justify-center sm:col-span-2" [disabled]="busy()">
            <app-icon name="calculator" [size]="18" /> {{ (busy() ? 'euImport.calculating' : 'euImport.submit') | translate }}
          </button>
        </form>

        <section class="rounded-[6px] border-2 border-brand bg-panel p-5 sm:p-6" aria-live="polite">
          <h2 class="eyebrow">{{ 'euImport.resultTitle' | translate }}</h2>
          @if (result(); as r) {
            <p class="mt-2 text-sm text-muted">{{ 'euImport.route' | translate: { from: countryName(origin()), to: countryName(destination()), km: r.distanceKm } }}</p>
            <table class="mt-4 w-full text-[15px]">
              <tbody class="divide-y divide-line border-y border-line">
                @for (l of r.lines; track l.code) {
                  <tr>
                    <th scope="row" class="py-2.5 pr-3 text-left font-normal">{{ label(l) }}</th>
                    <td class="py-2.5 text-right tabular-nums">{{ money(l.amount.amount, r.currency) }}</td>
                  </tr>
                }
                <tr class="font-extrabold">
                  <th scope="row" class="py-3 text-left">{{ 'euImport.total' | translate }}</th>
                  <td class="py-3 text-right text-lg tabular-nums text-brand-text">{{ money(r.total.amount, r.currency) }}</td>
                </tr>
              </tbody>
            </table>
            @if (r.warnings.length) {
              <ul class="mt-4 space-y-2 text-sm">
                @for (w of r.warnings; track w) {
                  <li class="flex gap-2"><app-icon name="info" [size]="16" class="mt-0.5 shrink-0 text-brand-text" /><span>{{ warning(w) | translate: { country: countryName(destination()) } }}</span></li>
                }
              </ul>
            }
            <p class="mt-4 text-xs text-muted">{{ 'euImport.note' | translate }}</p>
          } @else if (failed()) {
            <p class="mt-4 text-sm font-semibold text-danger" role="alert">{{ 'euImport.error' | translate }}</p>
          } @else {
            <p class="mt-4 text-sm text-muted">{{ 'euImport.empty' | translate }}</p>
          }
          <p class="mt-5 border-t border-line pt-4 text-sm">
            {{ 'euImport.nonEu' | translate }}
            <a [routerLink]="calculator()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'euImport.nonEuLink' | translate }}</a>
          </p>
        </section>
      </div>

      @for (s of sections; track s) {
        <section class="mt-12 max-w-3xl">
          <h2 class="text-xl font-extrabold">{{ 'euImport.' + s + '.title' | translate }}</h2>
          <app-article-text [text]="'euImport.' + s + '.text' | translate" />
        </section>
      }

      <section id="faq" class="mt-12 max-w-3xl scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'euImport.faq.title' | translate }}</h2>
        <div class="mt-4 divide-y divide-line border-y border-line">
          @for (n of faq; track n) {
            <details class="group py-3">
              <summary class="cursor-pointer list-none font-semibold">
                <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ 'euImport.faq.q' + n | translate }}
              </summary>
              <p class="mt-2 leading-relaxed text-fg/85">{{ 'euImport.faq.a' + n | translate }}</p>
            </details>
          }
        </div>
      </section>
    </article>
  `,
})
export class EuImportPage {
  private readonly api = inject(CarImportApi);
  private readonly translate = inject(TranslateService);
  protected readonly lang = inject(LanguageService);

  protected readonly currentYear = new Date().getFullYear();
  protected readonly modes = MODES;
  protected readonly sections = ['vat', 'transport', 'taxes', 'documents'];
  protected readonly faq = [1, 2, 3, 4, 5, 6];

  protected readonly destination = signal(this.lang.info().country);
  protected readonly origin = signal(this.destination() === 'DE' ? 'NL' : 'DE');
  protected readonly price = signal(15000);
  protected readonly currency = signal('EUR');
  protected readonly year = signal(this.currentYear - 5);
  protected readonly fuel = signal<FuelType>('PETROL');
  protected readonly cc = signal(1598);
  protected readonly kw = signal<number | null>(null);
  protected readonly co2 = signal<number | null>(null);
  protected readonly mode = signal<DeliveryMode>('CAR_CARRIER');
  protected readonly newVehicle = signal(false);

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);
  protected readonly result = signal<EuImportResult | null>(null);

  private readonly countries = computed(() =>
    [...EU_COUNTRIES]
      .map((code) => ({ code, name: this.countryName(code) }))
      .sort((a, b) => a.name.localeCompare(b.name, this.lang.locale())),
  );
  protected readonly originOptions = computed<SelectOption[]>(() =>
    this.countries().filter((c) => c.code !== this.destination()).map((c) => ({ value: c.code, label: c.name, flag: c.code })),
  );
  protected readonly destinationOptions = computed<SelectOption[]>(() =>
    this.countries().map((c) => ({ value: c.code, label: c.name, flag: c.code })),
  );
  /** EUR plus the local currencies of both countries (a Swedish car is priced in SEK, a Polish buyer thinks in PLN). */
  protected readonly currencyOptions = computed<SelectOption[]>(() => {
    const codes = new Set(['EUR', this.localCurrency(this.origin()), this.localCurrency(this.destination())]);
    return [...codes].filter(isDisplayCurrency).map((c) => ({ value: c, label: c }));
  });
  private readonly fuelLabels = toSignal(this.translate.stream(FUELS.map((f) => 'fuel.' + f)),
    { initialValue: {} as Record<string, string> });
  protected readonly fuelOptions = computed<SelectOption[]>(() =>
    FUELS.map((f) => ({ value: f, label: this.fuelLabels()['fuel.' + f] ?? f })),
  );
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      afterNextRender(() => this.calculate());
    }
  }

  protected setDestination(code: string): void {
    this.destination.set(code);
    if (this.origin() === code) {
      this.origin.set(code === 'DE' ? 'NL' : 'DE');
    }
  }

  protected calculate(): void {
    const dest = this.destination();
    const local = this.localCurrency(dest);
    const ev = this.fuel() === 'EV';
    this.busy.set(true);
    this.failed.set(false);
    this.api.euImport({
      originCountry: this.origin(),
      destinationCountry: dest,
      price: Number(this.price()),
      priceCurrency: this.currency(),
      displayCurrency: isDisplayCurrency(local) ? local : 'EUR',
      productionYear: Number(this.year()),
      fuelType: this.fuel(),
      engineCc: ev ? 0 : Number(this.cc()),
      vehicleCategory: 'PASSENGER_CAR',
      powerKw: this.kw() || null,
      co2Gkm: ev ? 0 : (this.co2() || null),
      massKg: null,
      newVehicle: this.newVehicle(),
      deliveryMode: this.mode(),
      distanceKm: null,
      destinationLat: null,
      destinationLon: null,
      registrationTaxOwn: null,
    }).subscribe({
      next: (r) => {
        this.result.set(r);
        this.busy.set(false);
      },
      error: () => {
        this.result.set(null);
        this.failed.set(true);
        this.busy.set(false);
      },
    });
  }

  protected label(l: CostLine): string {
    const key = OWN_LABELS.has(l.code) ? 'euImport.cost.' + l.code : 'cost.' + l.code;
    return this.translate.instant(key, { ...l.params, rate: this.pct(l.rate) });
  }

  protected warning(key: string): string {
    return OWN_WARNINGS.has(key) ? key.replace('warning.euImport.', 'euImport.warning.') : key;
  }

  protected localCurrency(code: string): string {
    return GUIDE_COUNTRIES.find((c) => c.code === code)?.currency ?? 'EUR';
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
