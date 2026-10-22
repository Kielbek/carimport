import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { EMPTY, Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { Place, PortRegion, PortSuggestion } from '../../../core/api/api.models';
import { CarImportApi } from '../../../core/api/carimport-api';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Flag } from '../../../shared/flag/flag';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { DELIVERY_MODES, EU_COUNTRIES } from '../calculator.options';
import { ProposalInput } from '../proposal-input';

const REGIONS: PortRegion[] = ['NORTH_SEA', 'BALTIC', 'ATLANTIC', 'WEST_MED', 'EAST_MED'];
const TOP = 5;

/**
 * Step 4 - only the delivery address has to be typed. Every EU port is priced door to door for that address and the
 * cheapest is selected; the distance from the port, the delivery mode and the per-km rate are proposals the user
 * can override.
 */
@Component({
  selector: 'app-step-destination',
  imports: [TranslatePipe, CountryNamePipe, LocalNumberPipe, Flag, Icon, ProposalInput],
  template: `
    <!-- delivery address -->
    <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_16rem]">
      <div class="relative min-w-0">
        <label class="label" for="address">{{ 'wizard.address' | translate }}</label>
        @if (s().destinationAddress; as addr) {
          <div class="input flex items-center gap-3" animate.enter="reveal-enter">
            <app-icon name="map-pin" [size]="18" class="shrink-0 text-brand-text" />
            <span class="min-w-0 flex-1 truncate font-semibold" [title]="addr">{{ addr }}</span>
            <button type="button" class="text-xs font-semibold text-brand-text hover:underline" (click)="clearAddress()">
              {{ 'wizard.addressChange' | translate }}
            </button>
          </div>
        } @else {
          <div class="relative">
            <app-icon name="search" [size]="18" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input id="address" type="text" autocomplete="off" class="input pl-11" role="combobox"
                   [attr.aria-expanded]="open()" aria-controls="address-list" aria-autocomplete="list"
                   [placeholder]="'wizard.addressPlaceholder' | translate" [value]="query()"
                   (input)="type($event)" (focus)="open.set(true)" (blur)="closeSoon()" (keydown)="key($event)" />
            @if (searching()) {
              <app-icon name="loader" [size]="18" class="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-muted" />
            }
          </div>
          @if (open() && places().length) {
            <ul id="address-list" role="listbox" class="absolute z-20 mt-1 w-full overflow-hidden rounded-[4px] border border-line bg-panel shadow-xl">
              @for (p of places(); track p.label; let i = $index) {
                <li role="option" [attr.aria-selected]="i === active()">
                  <button type="button" class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-panel-2"
                          [class.bg-panel-2]="i === active()" (mousedown)="pick(p)">
                    <app-flag [code]="p.countryCode" class="w-5 shrink-0" />
                    <span class="truncate">{{ p.label }}</span>
                  </button>
                </li>
              }
            </ul>
          }
        }
        <p class="mt-2 text-xs text-muted">{{ 'wizard.addressHint' | translate }}</p>
      </div>

      <div>
        <label class="label" for="dest">{{ 'wizard.destination' | translate }}</label>
        <div class="flex items-center gap-3">
          <app-flag [code]="s().destinationCountry" class="w-8 shrink-0" />
          <select id="dest" class="input" [value]="s().destinationCountry" (change)="country(value($event))">
            @for (c of countries(); track c.code) { <option [value]="c.code" [selected]="c.code === s().destinationCountry">{{ c.name }}</option> }
          </select>
        </div>
      </div>
    </div>

    <!-- EU port ranking -->
    <section class="mt-10">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 class="label !mb-1">{{ 'wizard.port' | translate }}</h3>
          <p class="text-xs text-muted">
            {{ (s().destinationAddress ? 'wizard.portRankingAddress' : 'wizard.portRankingCountry') | translate: { count: ranking().length } }}
          </p>
        </div>
        @if (store.portMode() === 'MANUAL') {
          <button type="button" class="btn btn-outline !px-3 !py-1.5 text-xs" (click)="store.useRecommendedPort()">
            <app-icon name="sparkles" [size]="14" /> {{ 'wizard.portAuto' | translate }}
          </button>
        }
      </div>

      @if (!ranking().length) {
        <div class="mt-4 flex items-center gap-3 rounded-[4px] border border-line p-5 text-sm text-muted">
          <app-icon name="loader" [size]="18" class="animate-spin" /> {{ 'wizard.portRankingLoading' | translate }}
        </div>
      } @else {
        <ol class="mt-4 divide-y divide-line overflow-hidden rounded-[4px] border border-line" [class.opacity-60]="store.suggestionsLoading()">
          @for (p of visible(); track p.code; let i = $index) {
            <li>
              <button type="button" class="grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-3 text-left transition hover:bg-panel-2 sm:grid-cols-[1.5rem_minmax(0,1fr)_7rem_6rem_9rem]"
                      [class.bg-brand/10]="p.code === s().euPortCode" [attr.aria-pressed]="p.code === s().euPortCode"
                      (click)="store.choosePort(p.code)">
                <span class="grid size-6 place-items-center rounded-full text-[11px] font-bold"
                      [class]="p.code === s().euPortCode ? 'bg-brand text-brand-ink' : 'border border-line text-muted'">
                  @if (p.code === s().euPortCode) { <app-icon name="check" [size]="12" [stroke]="3" /> } @else { {{ rank(p) }} }
                </span>
                <span class="flex min-w-0 items-center gap-2.5">
                  <app-flag [code]="p.countryCode" class="w-6 shrink-0" />
                  <span class="min-w-0">
                    <span class="block truncate font-semibold">{{ p.name }}</span>
                    <span class="block truncate text-xs text-muted">
                      {{ p.countryCode | countryName: lang.locale() }}
                      @if (p.code === best()) { · <span class="font-semibold text-brand-text">{{ 'wizard.portCheapest' | translate }}</span> }
                    </span>
                  </span>
                </span>
                <span class="hidden text-sm sm:block">
                  <app-icon [name]="p.distanceMethod === 'ROUTED' ? 'route' : 'navigation'" [size]="14" class="mr-1 inline text-muted" />
                  {{ p.distanceKm | localNumber: lang.locale() }} km
                </span>
                <span class="hidden text-sm text-muted sm:block">{{ p.daysMin }}–{{ p.daysMax }} {{ 'wizard.days' | translate }}</span>
                <span class="text-right">
                  <span class="block font-bold">≈ {{ p.total | localNumber: lang.locale() }} {{ currency() }}</span>
                  @if (p.code !== best()) {
                    <span class="block text-xs text-muted">+{{ p.total - bestTotal() | localNumber: lang.locale() }}</span>
                  }
                  <span class="block text-xs text-muted sm:hidden">{{ p.distanceKm | localNumber: lang.locale() }} km · {{ p.daysMin }}–{{ p.daysMax }} {{ 'wizard.days' | translate }}</span>
                </span>
              </button>
            </li>
          }
        </ol>

        @if (ranking().length > top) {
          <button type="button" class="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-text hover:underline" (click)="all.set(!all())">
            <app-icon name="chevron-down" [size]="16" class="transition" [class.rotate-180]="all()" />
            {{ (all() ? 'wizard.portsLess' : 'wizard.portsAll') | translate: { count: ranking().length } }}
          </button>
        }
        @if (all()) {
          <div class="mt-4 grid gap-5 sm:grid-cols-2" animate.enter="reveal-enter" animate.leave="reveal-leave">
            @for (g of groups(); track g.region) {
              <div>
                <h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-muted">{{ 'region.' + g.region | translate }}</h4>
                <ul class="space-y-1">
                  @for (p of g.ports; track p.code) {
                    <li>
                      <button type="button" class="flex w-full items-center gap-2.5 rounded-[4px] px-2 py-1.5 text-left text-sm hover:bg-panel-2"
                              [class.bg-brand/10]="p.code === s().euPortCode" (click)="store.choosePort(p.code)">
                        <app-flag [code]="p.countryCode" class="w-5 shrink-0" />
                        <span class="min-w-0 flex-1 truncate">{{ p.name }}</span>
                        <span class="text-xs text-muted">{{ p.distanceKm | localNumber: lang.locale() }} km</span>
                        <span class="w-24 text-right font-semibold">≈ {{ p.total | localNumber: lang.locale() }}</span>
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        }
        <p class="mt-3 text-xs text-muted">{{ 'wizard.portRankingNote' | translate }}</p>
      }
    </section>

    <!-- delivery -->
    <fieldset class="mt-10">
      <legend class="label">{{ 'wizard.delivery' | translate }}</legend>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        @for (m of modes; track m.code) {
          <button type="button" class="choice" [class.choice--active]="store.deliveryMode() === m.code"
                  [disabled]="m.code === 'SELF_DRIVE' && !store.isRunner()" [class.opacity-40]="m.code === 'SELF_DRIVE' && !store.isRunner()"
                  (click)="store.patch({ deliveryMode: m.code === store.proposedDeliveryMode() ? null : m.code, pricePerKm: null })">
            <span class="choice-check"><app-icon name="check" [size]="12" [stroke]="3" /></span>
            <app-icon [name]="m.icon" [size]="26" class="text-brand-text" />
            <span class="mt-2 font-semibold">{{ 'delivery.' + m.code | translate }}</span>
            <span class="text-xs text-muted">{{ 'deliveryHint.' + m.code | translate }}</span>
            @if (m.code === store.proposedDeliveryMode()) {
              <span class="badge mt-2 !bg-brand/15 !text-brand-text"><app-icon name="sparkles" [size]="12" /> {{ 'proposal.tag' | translate }}</span>
            }
          </button>
        }
      </div>
    </fieldset>

    @if (store.deliveryMode() !== 'PORT_PICKUP') {
      <div class="mt-6 grid gap-6 rounded-[4px] border border-line p-5 sm:grid-cols-2" animate.enter="reveal-enter" animate.leave="reveal-leave">
        <app-proposal-input inputId="km" label="wizard.distance" unit="km" [step]="10"
                            [hint]="s().destinationAddress ? (store.selectedPort()?.distanceMethod === 'ROUTED' ? 'wizard.distanceRouted' : 'wizard.distanceEstimated') : 'wizard.distanceTypical'"
                            [hintParams]="{ port: portName() }"
                            [value]="s().deliveryDistanceKm" [proposal]="store.proposedDistance()"
                            (changed)="store.patch({ deliveryDistanceKm: $event })" />
        <div>
          @if (store.roadRate(); as r) {
            <app-proposal-input inputId="rate" label="wizard.pricePerKm" [unit]="r.currency + '/km'" [step]="0.05"
                                hint="wizard.tariffShort"
                                [hintParams]="{ min: (r.perKmMin | localNumber: lang.locale()), max: (r.perKmMax | localNumber: lang.locale()), cur: r.currency, fixed: (r.fixedFee | localNumber: lang.locale()), minimum: (r.minimumCharge | localNumber: lang.locale()) }"
                                [value]="s().pricePerKm" [proposal]="midRate()"
                                (changed)="store.patch({ pricePerKm: $event })" />
          } @else {
            <span class="label">{{ 'wizard.pricePerKm' | translate }}</span>
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
  private readonly api = inject(CarImportApi);
  protected readonly s = this.store.state;
  protected readonly modes = DELIVERY_MODES;
  protected readonly top = TOP;

  // address search
  protected readonly query = signal('');
  protected readonly open = signal(false);
  protected readonly active = signal(0);
  protected readonly searching = signal(false);
  private readonly placeSearch: Observable<Place[]> = isPlatformBrowser(inject(PLATFORM_ID))
    ? toObservable(this.query).pipe(
        map((q) => q.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((q) => {
          if (q.length < 2) {
            return of([] as Place[]);
          }
          this.searching.set(true);
          return this.api.searchAddress(q).pipe(catchError(() => of([] as Place[])));
        }),
      )
    : EMPTY;
  protected readonly places = toSignal(this.placeSearch, { initialValue: [] as Place[] });

  // port ranking
  protected readonly all = signal(false);
  protected readonly ranking = computed(() => this.store.suggestions()?.ports ?? []);
  protected readonly best = computed(() => this.ranking()[0]?.code ?? null);
  protected readonly bestTotal = computed(() => this.ranking()[0]?.total ?? 0);
  protected readonly currency = computed(() => this.store.suggestions()?.currency ?? this.s().displayCurrency);
  /** Top 5, plus the selected port if it is further down. */
  protected readonly visible = computed(() => {
    const list = this.ranking();
    const top = list.slice(0, TOP);
    const selected = list.find((p) => p.code === this.s().euPortCode);
    return selected && !top.includes(selected) ? [...top, selected] : top;
  });
  protected readonly groups = computed(() =>
    REGIONS.map((region) => ({
      region,
      ports: this.ranking().filter((p) => p.region === region).sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((g) => g.ports.length),
  );
  protected readonly portName = computed(() => this.store.selectedPort()?.name ?? this.s().euPortCode);
  protected readonly midRate = computed(() => {
    const r = this.store.roadRate();
    return r ? Math.round(((r.perKmMin + r.perKmMax) / 2) * 100) / 100 : null;
  });

  protected readonly countries = computed(() => {
    const names = new Intl.DisplayNames([this.lang.locale()], { type: 'region' });
    return EU_COUNTRIES.map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) =>
      a.name.localeCompare(b.name, this.lang.locale()),
    );
  });

  constructor() {
    // the spinner stops whenever a new list arrives
    toObservable(this.places).subscribe(() => this.searching.set(false));
  }

  protected rank(p: PortSuggestion): number {
    return this.ranking().indexOf(p) + 1;
  }

  protected type(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
    this.active.set(0);
    this.open.set(true);
  }

  protected key(e: KeyboardEvent): void {
    const list = this.places();
    if (e.key === 'ArrowDown') {
      this.active.set(Math.min(this.active() + 1, list.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      this.active.set(Math.max(this.active() - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && list[this.active()]) {
      this.pick(list[this.active()]);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      this.open.set(false);
    }
  }

  protected pick(place: Place): void {
    this.store.setAddress(place);
    this.open.set(false);
    this.query.set('');
  }

  protected clearAddress(): void {
    this.store.setAddress(null);
  }

  protected closeSoon(): void {
    setTimeout(() => this.open.set(false), 150);
  }

  protected country(code: string): void {
    // an address in another country no longer applies
    if (this.s().destinationAddress) {
      this.store.setAddress(null);
    }
    this.store.patch({ destinationCountry: code, deliveryDistanceKm: null, pricePerKm: null, postImportServices: null });
  }

  protected value(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }
}
