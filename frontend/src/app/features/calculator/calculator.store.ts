import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, linkedSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap, tap } from 'rxjs';
import {
  ApiProblem,
  AuctionHouse,
  CalculationRequest,
  OriginCountry,
  PublicQuoteView,
} from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { EXCISE_THRESHOLD_CC, ORIGINS } from './calculator.options';

export type WizardStep = 1 | 2 | 3;
export type WizardState = Omit<CalculationRequest, 'departurePort'>;

const DEFAULTS: WizardState = {
  originCountry: 'USA',
  auctionHouse: 'COPART',
  titleType: 'SALVAGE',
  pickupZone: 'NJ',
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
};
const STORAGE_KEY = 'carimport.wizard';

type PreviewState = { view: PublicQuoteView; error: null } | { view: null; error: ApiProblem };

/**
 * Wizard state + live pricing, built entirely on signals:
 *
 *   state (signal) ──► request (computed) ──► toObservable ─debounce─► POST /quotes/preview ─► preview (linkedSignal)
 *        │                    └──► client-side hints (excise threshold, 4200 eligibility) - instant, no round trip
 *        └──► persisted to sessionStorage (survives the Stripe cancel redirect)
 *
 * Exact amounts never exist on the client in the free tier; it only knows the band and the shares.
 */
@Injectable()
export class CalculatorStore {
  private readonly api = inject(CarImportApi);

  readonly state = signal<WizardState>(restore());
  readonly step = signal<WizardStep>(1);
  readonly loading = signal(false);
  /** Quote frozen on the server (needed for checkout and leads); reset whenever the inputs change. */
  readonly frozenQuote = signal<PublicQuoteView | null>(null);

  readonly request = computed<CalculationRequest>(() => ({ ...this.state(), departurePort: null }));

  readonly origin = computed(() => ORIGINS.find((o) => o.code === this.state().originCountry)!);
  readonly auctionHouses = computed(() => this.origin().auctions);
  readonly bidCurrency = computed(() => this.origin().currency);

  readonly vehicleAge = computed(() => new Date().getFullYear() - this.state().productionYear);
  readonly canBeHistoric = computed(() => this.vehicleAge() >= 30);
  readonly needsEngineCc = computed(() => !['EV', 'HYDROGEN'].includes(this.state().fuelType));

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

  readonly isValid = computed(() => {
    const s = this.state();
    return s.bidPrice >= 100 && (!this.needsEngineCc() || s.engineCc > 0) && s.productionYear >= 1900;
  });

  private readonly previewState = toSignal(
    toObservable(this.request).pipe(
      debounceTime(350),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(() => this.frozenQuote.set(null)),
      switchMap((req) => (this.isValid() ? this.fetchPreview(req) : of(null))),
    ),
    { initialValue: null },
  );

  /** Last successful preview - linkedSignal keeps the previous value on errors so the UI never flashes empty. */
  readonly preview = linkedSignal<PreviewState | null, PublicQuoteView | null>({
    source: this.previewState,
    computation: (current, previous) => current?.view ?? previous?.value ?? null,
  });
  readonly error = computed(() => this.previewState()?.error ?? null);

  patch(changes: Partial<WizardState>): void {
    this.state.update((s) => {
      const next = { ...s, ...changes };
      persist(next);
      return next;
    });
  }

  selectOrigin(origin: OriginCountry): void {
    const auctions = ORIGINS.find((o) => o.code === origin)!.auctions;
    const auctionHouse: AuctionHouse = auctions.includes(this.state().auctionHouse)
      ? this.state().auctionHouse
      : auctions[0];
    this.patch({ originCountry: origin, auctionHouse, pickupZone: null });
  }

  setBuyerType(buyerType: WizardState['buyerType']): void {
    this.patch({
      buyerType,
      customsProcedure: buyerType === 'COMPANY' ? this.state().customsProcedure : 'STANDARD_4000',
    });
  }

  goTo(step: WizardStep): void {
    this.step.set(step);
  }

  /** Persists the current inputs as a quote (idempotent per input set). */
  freeze(): Observable<PublicQuoteView> {
    const existing = this.frozenQuote();
    if (existing?.quoteId) {
      return of(existing);
    }
    return this.api.createQuote(this.request()).pipe(tap((q) => this.frozenQuote.set(q)));
  }

  private fetchPreview(req: CalculationRequest): Observable<PreviewState> {
    this.loading.set(true);
    return this.api.preview(req).pipe(
      map((view): PreviewState => ({ view, error: null })),
      catchError((e: HttpErrorResponse) =>
        of<PreviewState>({ view: null, error: (e.error as ApiProblem) ?? { status: e.status } }),
      ),
      finalize(() => this.loading.set(false)),
    );
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
