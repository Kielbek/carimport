import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, catchError, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import {
  ApiProblem,
  AuctionHouse,
  CalculationRequest,
  OriginCountry,
  PublicQuoteView,
  RouteOptions,
} from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { EXCISE_THRESHOLD_CC, ORIGINS } from './calculator.options';

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;
export const LAST_INPUT_STEP = 5;
export const RESULT_STEP: WizardStep = 6;
export type WizardState = CalculationRequest;

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
  deliveryMode: 'CAR_CARRIER',
  deliveryDistanceKm: null,
  pricePerKm: null,
  repairEstimate: null,
  insuranceEstimate: null,
  postImportServices: null,
};
const STORAGE_KEY = 'carimport.wizard.v2';

/**
 * Wizard state and the detailed landed-cost calculation, built on signals:
 *
 *   state (signal) ──► request (computed) ──► calculate() on the last step ──► result (signal)
 *        │                    └──► client-side hints (excise threshold, delivery availability) - instant
 *        ├──► route key (origin, EU port, destination) ──► GET /reference/options ──► options (toSignal)
 *        └──► persisted to sessionStorage (survives the Stripe cancel redirect)
 *
 * The free result has rounded scenario totals and item names only; amounts per line are in the paid report.
 */
@Injectable()
export class CalculatorStore {
  private readonly api = inject(CarImportApi);
  /** No API calls while prerendering: the static HTML shows the wizard, the browser fetches the data. */
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly state = signal<WizardState>(restore());
  readonly step = signal<WizardStep>(1);
  readonly calculating = signal(false);
  readonly result = signal<PublicQuoteView | null>(null);
  readonly error = signal<ApiProblem | null>(null);
  /** The calculated quote is the one bought as a report or attached to a partner lead. */
  readonly frozenQuote = this.result;

  readonly request = computed<CalculationRequest>(() => ({ ...this.state() }));

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
  readonly roadRate = computed(() =>
    this.options()?.delivery.find((d) => d.mode === (this.state().deliveryMode ?? 'CAR_CARRIER')),
  );
  readonly effectiveDistance = computed(() => this.state().deliveryDistanceKm ?? this.options()?.typicalDistanceKm ?? null);

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
    // a non-runner cannot be driven home on temporary plates
    effect(() => {
      const runner = this.isRunner();
      untracked(() => {
        if (!runner && this.state().deliveryMode === 'SELF_DRIVE') {
          this.patch({ deliveryMode: 'TOW_TRUCK' });
        }
      });
    });
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
    this.patch({ originCountry: origin, auctionHouse, pickupZone: null, departurePort: null, bidPrice });
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
    this.api
      .createQuote(this.request())
      .pipe(
        map((view) => ({ view, error: null as ApiProblem | null })),
        catchError((e: HttpErrorResponse) => of({ view: null, error: (e.error as ApiProblem) ?? { status: e.status } })),
      )
      .subscribe(({ view, error }) => {
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

function restore(): WizardState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<WizardState>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function persist(state: WizardState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable - the wizard still works, it just won't survive a reload
  }
}
