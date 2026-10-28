import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, catchError, debounceTime, distinctUntilChanged, forkJoin, map, of, switchMap, tap, timer } from 'rxjs';
import {
  ApiProblem,
  AuctionHouse,
  CalculationRequest,
  DeliveryMode,
  OriginCountry,
  Place,
  PublicQuoteView,
  RouteOptions,
  Suggestions,
  VinDecoding,
} from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { DisplayCurrency, isDisplayCurrency } from '../../core/currency/currencies';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { LanguageService } from '../../core/i18n/language.service';
import { LanguageInfo } from '../../core/i18n/languages';
import { EXCISE_THRESHOLD_CC, ORIGINS } from './calculator.options';
import { ProgressPlan, randomPlan } from './calc-progress';

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;
export const LAST_INPUT_STEP = 5;
export const RESULT_STEP: WizardStep = 6;
export type WizardState = CalculationRequest;

/** World manufacturer prefixes (first VIN characters) of the origins with a 0 % duty for cars built there. */
const PREFERENTIAL_ORIGINS: Partial<Record<OriginCountry, RegExp>> = {
  USA: /^[145]/,
  CANADA: /^2/,
  JAPAN: /^J/,
  UK: /^S[A-M]/,
};

const DEFAULTS: WizardState = {
  originCountry: 'USA',
  auctionHouse: 'COPART',
  titleType: 'SALVAGE',
  pickupZone: 'NJ',
  departurePort: null,
  bidPrice: 12000,
  vehicleCategory: 'PASSENGER_CAR',
  fuelType: 'PETROL',
  engineCc: 1998,
  productionYear: new Date().getFullYear() - 4,
  historicOriginalCondition: false,
  condition: 'RUN_AND_DRIVE',
  shippingMethod: 'CONTAINER_SHARED',
  euPortCode: 'DEBRV',
  destinationCountry: 'PL',
  buyerType: 'PRIVATE',
  customsProcedure: 'STANDARD_4000',
  displayCurrency: 'PLN',
  deliveryMode: null,
  deliveryDistanceKm: null,
  pricePerKm: null,
  repairEstimate: null,
  insuranceEstimate: null,
  postImportServices: null,
  destinationAddress: null,
  destinationLat: null,
  destinationLon: null,
  co2Gkm: null,
  powerKw: null,
  registrationTaxOwn: null,
  massKg: null,
  vin: null,
  vehicleDescription: null,
  preferentialOrigin: null,
};
const STORAGE_KEY = 'carimport.wizard.v4';
const PORT_MODE_KEY = 'carimport.wizard.portMode';

/**
 * Wizard state and the detailed landed-cost calculation, built on signals:
 *
 *   state (signal) ──► request (computed) ──► calculate() on the last step ──► result (signal)
 *        │                    └──► client-side hints (excise threshold, delivery availability) - instant
 *        ├──► route key (origin, EU port, destination) ──► GET /reference/options ──► options (toSignal)
 *        ├──► suggestion key (all but the proposed fields), debounced ──► POST /quotes/suggestions ──► suggestions
 *        └──► persisted to sessionStorage (survives the Stripe cancel redirect)
 *
 * Nothing has to be typed: a null field means "use the calculator's proposal" (cheapest port for the address, road
 * distance from it, delivery mode for the condition, repair and insurance amounts). The inputs show the proposal and
 * typing in them overrides it; "use proposal" sets the field back to null.
 *
 * The free result has rounded scenario totals and item names only; amounts per line are in the paid report.
 */
@Injectable()
export class CalculatorStore {
  private readonly api = inject(CarImportApi);
  /** No API calls while prerendering: the static HTML shows the wizard, the browser fetches the data. */
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  readonly state = signal<WizardState>(restore(this.lang.info()));
  readonly step = signal<WizardStep>(1);
  readonly calculating = signal(false);
  /** The progress screen's random timeline; the result is not shown before it has run through. */
  readonly calcPlan = signal<ProgressPlan>(randomPlan());
  readonly result = signal<PublicQuoteView | null>(null);
  readonly error = signal<ApiProblem | null>(null);
  /** The calculated quote is the one bought as a report or attached to a partner lead. */
  readonly frozenQuote = this.result;

  /** AUTO = the EU port follows the cheapest proposal; MANUAL = the user picked one. */
  readonly portMode = signal<'AUTO' | 'MANUAL'>(restorePortMode());

  /** Inputs that change the proposals - the proposed fields themselves and the port are left out. */
  private readonly suggestionKey = computed(() => {
    const { euPortCode, deliveryDistanceKm, repairEstimate, insuranceEstimate, registrationTaxOwn, ...rest } = this.state();
    return JSON.stringify(rest);
  });

  readonly suggestionsLoading = signal(false);
  readonly suggestions = toSignal(
    (this.browser ? toObservable(this.suggestionKey) : EMPTY).pipe(
      debounceTime(350),
      distinctUntilChanged(),
      tap(() => this.suggestionsLoading.set(true)),
      switchMap(() => this.api.suggestions(untracked(() => this.state())).pipe(catchError(() => of(null)))),
      tap(() => this.suggestionsLoading.set(false)),
    ),
    { initialValue: null as Suggestions | null },
  );

  /** The selected port as priced in the ranking (distance from the address, door-to-door total). */
  readonly selectedPort = computed(() =>
    this.suggestions()?.ports.find((p) => p.code === this.state().euPortCode) ?? null,
  );

  readonly proposedDeliveryMode = computed<DeliveryMode>(() =>
    this.state().condition === 'RUN_AND_DRIVE' ? 'CAR_CARRIER' : 'TOW_TRUCK',
  );
  readonly deliveryMode = computed<DeliveryMode>(() => this.state().deliveryMode ?? this.proposedDeliveryMode());
  /** False between a currency switch and the refreshed proposals - old amounts must not show under the new code. */
  readonly suggestionsCurrent = computed(() => this.suggestions()?.currency === this.state().displayCurrency);
  readonly repairProposal = computed(() => (this.suggestionsCurrent() ? this.suggestions()!.repairEstimate : null));
  readonly insuranceProposal = computed(() =>
    this.suggestionsCurrent() ? this.suggestions()!.insuranceEstimate : null,
  );
  readonly registrationTaxProposal = computed(() =>
    this.suggestionsCurrent() ? (this.suggestions()!.registrationTaxEstimate ?? null) : null,
  );
  readonly co2Proposal = computed(() => this.suggestions()?.co2Estimate ?? null);
  readonly powerProposal = computed(() => this.suggestions()?.powerKwEstimate ?? null);
  readonly massProposal = computed(() => this.suggestions()?.massKgEstimate ?? null);

  /** Last VIN lookup in this visit: what was found, to show next to the filled fields. */
  readonly vinResult = signal<VinDecoding | null>(null);
  readonly vinLoading = signal(false);
  readonly vinError = signal<string | null>(null);

  /** What is sent: the user's overrides, and for the distance the routed one from the ranking. */
  readonly request = computed<CalculationRequest>(() => {
    const s = this.state();
    const routed = s.destinationLat != null ? this.selectedPort()?.distanceKm ?? null : null;
    return { ...s, deliveryDistanceKm: s.deliveryDistanceKm ?? routed };
  });

  readonly origin = computed(() => ORIGINS.find((o) => o.code === this.state().originCountry)!);
  readonly auctionHouses = computed(() => this.origin().auctions);
  readonly bidCurrency = computed(() => this.origin().currency);

  readonly vehicleAge = computed(() => new Date().getFullYear() - this.state().productionYear);
  readonly canBeHistoric = computed(() => this.vehicleAge() >= 30);
  readonly needsEngineCc = computed(() => !['EV', 'HYDROGEN'].includes(this.state().fuelType));
  readonly isRunner = computed(() => this.state().condition === 'RUN_AND_DRIVE');

  /** True when the slider sits above 2000 cm³ for a car that will pay Polish excise. */
  readonly exciseThresholdCrossed = computed(() => {
    const s = this.state();
    const passengerCar = ['PASSENGER_CAR', 'SUV', 'VAN'].includes(s.vehicleCategory);
    return s.destinationCountry === 'PL' && passengerCar && this.needsEngineCc() && s.engineCc > EXCISE_THRESHOLD_CC;
  });

  /** Indicative statutory PL excise rate shown next to the slider (the server computes the real one). */
  readonly indicativeExciseRate = computed<number | null>(() => {
    const s = this.state();
    if (s.destinationCountry !== 'PL' || !['PASSENGER_CAR', 'SUV', 'VAN'].includes(s.vehicleCategory)) {
      return null;
    }
    const cc = s.engineCc;
    switch (s.fuelType) {
      case 'EV':
      case 'HYDROGEN':
        return 0;
      case 'HEV':
      case 'MHEV':
        return cc <= 2000 ? 1.55 : cc <= 3500 ? 9.3 : 18.6;
      case 'PHEV':
        return cc <= 2000 ? 0 : cc <= 3500 ? 9.3 : 18.6;
      default:
        return cc <= 2000 ? 3.1 : 18.6;
    }
  });

  readonly procedure4200Available = computed(() => this.state().buyerType === 'COMPANY');
  /** Origins with 0 % duty for cars built there (EU-US deal, CETA, EU-Japan EPA, EU-UK TCA). */
  readonly preferentialAvailable = computed(() => PREFERENTIAL_ORIGINS[this.state().originCountry] !== undefined);
  /** The VIN's country of manufacture is the origin country - the precondition for the 0 % duty. */
  readonly vinMadeInOrigin = computed(() => {
    const vin = this.state().vin;
    const test = PREFERENTIAL_ORIGINS[this.state().originCountry];
    return !!vin && !!test && test.test(vin);
  });

  /** Only the inputs that change the route options - typing a price must not refetch. */
  private readonly routeKey = computed(
    () => `${this.state().originCountry}|${this.state().destinationCountry}|${this.state().euPortCode}`,
  );

  readonly options = toSignal(
    (this.browser ? toObservable(this.routeKey) : EMPTY).pipe(
      distinctUntilChanged(),
      switchMap((key) => {
        const [origin, destination, euPort] = key.split('|');
        return this.api.routeOptions(origin, destination, euPort).pipe(catchError(() => of(null)));
      }),
    ),
    { initialValue: null as RouteOptions | null },
  );

  readonly selectableServices = computed(() => (this.options()?.services ?? []).filter((s) => !s.statutory));
  readonly statutoryServices = computed(() => (this.options()?.services ?? []).filter((s) => s.statutory));
  readonly roadRate = computed(() => this.options()?.delivery.find((d) => d.mode === this.deliveryMode()));
  /** Distance the calculation uses: own value, else from the address (ranking), else typical for the country. */
  readonly proposedDistance = computed(
    () => this.selectedPort()?.distanceKm ?? this.options()?.typicalDistanceKm ?? null,
  );
  readonly effectiveDistance = computed(() => this.state().deliveryDistanceKm ?? this.proposedDistance());

  /** Services that will be included: the explicit choice, or the recommended defaults. */
  readonly chosenServices = computed(
    () =>
      new Set(
        this.state().postImportServices ?? this.selectableServices().filter((s) => s.defaultSelected).map((s) => s.code),
      ),
  );

  readonly isValid = computed(() => {
    const s = this.state();
    return s.bidPrice >= 100 && (!this.needsEngineCc() || s.engineCc > 0) && s.productionYear >= 1900;
  });

  constructor() {
    // a non-runner cannot be driven home on temporary plates - fall back to the proposal (tow truck)
    effect(() => {
      const runner = this.isRunner();
      untracked(() => {
        if (!runner && this.state().deliveryMode === 'SELF_DRIVE') {
          this.patch({ deliveryMode: null });
        }
      });
    });
    // the port follows the cheapest door-to-door proposal until the user picks one
    effect(() => {
      const best = this.suggestions()?.recommendedPort;
      untracked(() => {
        if (best && this.portMode() === 'AUTO' && best !== this.state().euPortCode) {
          this.patch({ euPortCode: best, deliveryDistanceKm: null });
          if (this.step() === RESULT_STEP) {
            this.calculate();
          }
        }
      });
    });
  }

  /**
   * Looks the VIN up and fills every field the sources state (category, fuel, displacement, year, power, CO₂, weight);
   * whatever they do not know stays as the calculator's proposal.
   */
  lookupVin(raw: string): void {
    const vin = raw.replace(/[\s-]/g, '').toUpperCase();
    this.vinError.set(null);
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
      this.vinError.set('vin.invalid');
      return;
    }
    this.vinLoading.set(true);
    this.api
      .decodeVin(vin)
      .pipe(
        map((d) => ({ d, err: null as string | null })),
        catchError((e: HttpErrorResponse) =>
          of({ d: null, err: e.status === 429 ? 'error.rateLimited' : e.status === 400 ? 'vin.invalid' : 'vin.w.offline' }),
        ),
      )
      .subscribe(({ d, err }) => {
        this.vinLoading.set(false);
        if (!d) {
          this.vinError.set(err);
          return;
        }
        this.vinResult.set(d);
        this.applyVin(d);
        this.analytics.track('vin_lookup', { source: d.source });
      });
  }

  private applyVin(d: VinDecoding): void {
    const s = this.state();
    const changes: Partial<WizardState> = { vin: d.vin, vehicleDescription: d.description || null };
    if (d.vehicleCategory) changes.vehicleCategory = d.vehicleCategory;
    if (d.fuelType) changes.fuelType = d.fuelType;
    if (d.engineCc != null) changes.engineCc = d.engineCc;
    if (d.modelYear) changes.productionYear = d.modelYear;
    // fields not stated go back to the proposal rather than keeping values typed for another car
    changes.powerKw = d.powerKw ?? (s.vin && s.vin !== d.vin ? null : s.powerKw);
    changes.co2Gkm = d.co2Gkm ?? (s.vin && s.vin !== d.vin ? null : s.co2Gkm);
    changes.massKg = d.massKg ?? (s.vin && s.vin !== d.vin ? null : s.massKg);
    this.patch(changes);
  }

  clearVin(): void {
    this.vinResult.set(null);
    this.vinError.set(null);
    this.patch({ vin: null, vehicleDescription: null });
  }

  choosePort(code: string): void {
    this.setPortMode('MANUAL');
    this.patch({ euPortCode: code, deliveryDistanceKm: null });
  }

  useRecommendedPort(): void {
    this.setPortMode('AUTO');
    const best = this.suggestions()?.recommendedPort;
    if (best) {
      this.patch({ euPortCode: best, deliveryDistanceKm: null });
    }
  }

  /** Delivery address from the search; the destination country follows the address. */
  setAddress(place: Place | null): void {
    if (!place) {
      this.patch({ destinationAddress: null, destinationLat: null, destinationLon: null, deliveryDistanceKm: null });
      return;
    }
    const countryChanged = place.countryCode !== this.state().destinationCountry;
    this.patch({
      destinationAddress: place.label,
      destinationLat: place.lat,
      destinationLon: place.lon,
      destinationCountry: place.countryCode,
      deliveryDistanceKm: null,
      ...(countryChanged ? { pricePerKm: null, postImportServices: null, registrationTaxOwn: null } : {}),
    });
  }

  /**
   * Result currency switch. Amounts the user typed (repair, insurance) are in the display currency, so they are
   * converted at the NBP rate rather than silently re-labelled; on the result step the quote is recalculated.
   */
  setDisplayCurrency(currency: DisplayCurrency): void {
    const s = this.state();
    if (currency === s.displayCurrency) {
      return;
    }
    const typed = s.repairEstimate != null || s.insuranceEstimate != null || s.registrationTaxOwn != null;
    const apply = (rate: number | null) => {
      const convert = (v: number | null) => (v == null || rate == null ? null : roundAmount(v * rate));
      this.patch({
        displayCurrency: currency,
        ...(typed
          ? {
              repairEstimate: convert(s.repairEstimate),
              insuranceEstimate: convert(s.insuranceEstimate),
              registrationTaxOwn: convert(s.registrationTaxOwn),
            }
          : {}),
      });
      if (this.step() === RESULT_STEP) {
        this.calculate();
      }
    };
    if (!typed || !this.browser) {
      apply(null);
      return;
    }
    this.api
      .fx()
      .pipe(catchError(() => of(null)))
      .subscribe((fx) => {
        const from = fx?.plnPerUnit[s.displayCurrency] ?? (s.displayCurrency === 'PLN' ? 1 : null);
        const to = fx?.plnPerUnit[currency] ?? (currency === 'PLN' ? 1 : null);
        // without rates the typed amounts go back to the proposals, which come in the new currency
        apply(from != null && to != null ? from / to : null);
      });
  }

  private setPortMode(mode: 'AUTO' | 'MANUAL'): void {
    this.portMode.set(mode);
    try {
      sessionStorage.setItem(PORT_MODE_KEY, mode);
    } catch {
      // storage unavailable
    }
  }

  patch(changes: Partial<WizardState>): void {
    this.state.update((s) => {
      const next = { ...s, ...changes };
      persist(next);
      return next;
    });
    this.result.set(null);
  }

  selectOrigin(origin: OriginCountry): void {
    const next = ORIGINS.find((o) => o.code === origin)!;
    const current = this.origin();
    const auctionHouse: AuctionHouse = next.auctions.includes(this.state().auctionHouse)
      ? this.state().auctionHouse
      : next.auctions[0];
    // 12 000 USD must not silently become 12 000 JPY
    const bidPrice = next.currency === current.currency ? this.state().bidPrice : next.typicalBid;
    this.patch({ originCountry: origin, auctionHouse, pickupZone: null, departurePort: null, bidPrice,
      preferentialOrigin: null });
  }

  setBuyerType(buyerType: WizardState['buyerType']): void {
    this.patch({
      buyerType,
      customsProcedure: buyerType === 'COMPANY' ? this.state().customsProcedure : 'STANDARD_4000',
    });
  }

  toggleService(code: string): void {
    const set = new Set(this.chosenServices());
    if (set.has(code)) {
      set.delete(code);
    } else {
      set.add(code);
    }
    this.patch({ postImportServices: [...set] });
  }

  goTo(step: WizardStep): void {
    this.step.set(step);
    this.analytics.track('calculator_step', { step });
    if (step === RESULT_STEP && !this.result()) {
      this.calculate();
    }
  }

  /** Runs the full calculation and stores it as a quote (needed for the report checkout and partner leads). */
  calculate(): void {
    if (!this.browser || !this.isValid()) {
      return;
    }
    this.calculating.set(true);
    this.error.set(null);
    const plan = randomPlan();
    this.calcPlan.set(plan);
    const quote = this.api.createQuote(this.request()).pipe(
      map((view) => ({ view, error: null as ApiProblem | null })),
      catchError((e: HttpErrorResponse) => of({ view: null, error: (e.error as ApiProblem) ?? { status: e.status } })),
    );
    forkJoin([quote, timer(plan.duration)])
      .pipe(map(([outcome]) => outcome))
      .subscribe(({ view, error }) => {
        if (view) {
          this.analytics.track('quote_calculated', { destination: view.destinationCountry, port: view.clearancePort });
        }
        this.result.set(view);
        this.error.set(error);
        this.calculating.set(false);
      });
  }

  /** The calculated quote, computing it first if needed. */
  freeze(): Observable<PublicQuoteView> {
    const existing = this.result();
    if (existing?.quoteId) {
      return of(existing);
    }
    return this.api.createQuote(this.request()).pipe(tap((q) => this.result.set(q)));
  }
}

/** Converted amounts are rounded like the proposals: to 10 units, or to 1 below 100. */
function roundAmount(v: number): number {
  return v >= 100 ? Math.round(v / 10) * 10 : Math.round(v);
}

function restorePortMode(): 'AUTO' | 'MANUAL' {
  try {
    return sessionStorage.getItem(PORT_MODE_KEY) === 'MANUAL' ? 'MANUAL' : 'AUTO';
  } catch {
    return 'AUTO';
  }
}

/** Saved wizard state, else defaults for the visitor's language: their country and currency. */
function restore(language: LanguageInfo): WizardState {
  const defaults: WizardState = {
    ...DEFAULTS,
    destinationCountry: language.country,
    displayCurrency: isDisplayCurrency(language.currency) ? language.currency : DEFAULTS.displayCurrency,
  };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const saved = raw ? (JSON.parse(raw) as Partial<WizardState>) : {};
    const merged = { ...defaults, ...saved };
    return isDisplayCurrency(merged.displayCurrency) ? merged : { ...merged, displayCurrency: defaults.displayCurrency };
  } catch {
    return defaults;
  }
}

function persist(state: WizardState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable - the wizard still works, it just won't survive a reload
  }
}
