import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CarImportApi } from '../../core/api/carimport-api';
import { AuctionHouse, FuelType, OriginCountry, VehicleCategory } from '../../core/api/api.models';
import { LanguageService } from '../../core/i18n/language.service';
import { PageContext } from '../../core/routing/page-context';
import { pathFor } from '../../core/routing/paths';
import { CurrencyMenu } from '../../layout/currency-menu';
import { LanguageMenu } from '../../layout/language-menu';
import { Logo } from '../../layout/logo';
import { ThemeToggle } from '../../layout/theme-toggle';
import { Icon } from '../../shared/icon/icon';
import { AffiliateWidgets } from '../affiliates/affiliate-widgets';
import { PartnerLeadForm } from '../leads/partner-lead-form';
import { PaywallModal } from '../paywall/paywall-modal';
import { GUIDE_MODELS } from '../guides/model-data.generated';
import { CalculatorStore, LAST_INPUT_STEP, RESULT_STEP, WizardStep } from './calculator.store';
import { EU_COUNTRIES, ORIGINS } from './calculator.options';
import { StepAfterImport } from './steps/step-after-import';
import { StepCondition } from './steps/step-condition';
import { StepDestination } from './steps/step-destination';
import { StepOrigin } from './steps/step-origin';
import { StepResult } from './steps/step-result';
import { StepVehicle } from './steps/step-vehicle';

/**
 * Full-screen calculator (no site header/footer): six steps in one column, the detailed result at the end.
 */
@Component({
  selector: 'app-calculator-page',
  imports: [
    RouterLink, TranslatePipe, Icon, Logo, CurrencyMenu, LanguageMenu, ThemeToggle, StepOrigin, StepVehicle, StepCondition,
    StepDestination, StepAfterImport, StepResult, PaywallModal, PartnerLeadForm, AffiliateWidgets,
  ],
  providers: [CalculatorStore],
  template: `
    <div class="min-h-screen">
      <!-- minimal bar instead of the site header -->
      <div class="border-b border-line">
        <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5">
          <a [routerLink]="home()" class="min-w-0 shrink" [attr.aria-label]="'layout.home' | translate"><app-logo class="origin-left scale-[0.8] sm:scale-100" /></a>
          <div class="flex items-center gap-1 sm:gap-2">
            <app-currency-menu [value]="store.state().displayCurrency" (changed)="store.setDisplayCurrency($event)" />
            <app-language-menu [hrefFor]="page.hrefFor()" />
            <app-theme-toggle class="hidden sm:block" />
            <a [routerLink]="home()" class="grid size-9 sm:size-10 place-items-center text-fg/70 hover:text-fg" [attr.aria-label]="'layout.close' | translate">
              <app-icon name="x" [size]="20" />
            </a>
          </div>
        </div>
      </div>

      <main class="mx-auto max-w-5xl px-3 pb-20 pt-10 sm:px-5">
        <h1 class="h-section">{{ 'calc.title' | translate }}</h1>
        <p class="lead mt-3 max-w-2xl">{{ 'calc.lead' | translate }}</p>

        <ol class="mt-10 grid grid-cols-6 gap-2" [attr.aria-label]="'calc.progress' | translate">
          @for (st of steps; track st) {
            <li>
              <button type="button" class="group w-full text-left disabled:cursor-default" (click)="store.goTo(st)"
                      [disabled]="st === resultStep && !store.isValid()" [attr.aria-current]="store.step() === st ? 'step' : null">
                <span class="block h-1 rounded-full transition-all duration-500" [class]="store.step() >= st ? 'bg-brand' : 'bg-line'"></span>
                <span class="mt-2.5 flex items-center gap-2 text-[12px] font-semibold" [class]="store.step() === st ? 'text-fg' : 'text-muted group-hover:text-fg'">
                  <span class="grid size-5 shrink-0 place-items-center rounded-full text-[11px]"
                        [class]="store.step() > st ? 'bg-brand text-brand-ink' : store.step() === st ? 'border border-brand text-brand-text' : 'border border-line'">
                    @if (store.step() > st) { <app-icon name="check" [size]="12" [stroke]="3" /> } @else { {{ st }} }
                  </span>
                  <span class="hidden truncate md:inline">{{ 'wizard.step' + st | translate }}</span>
                </span>
              </button>
            </li>
          }
        </ol>

        <h2 class="mt-10 text-2xl font-extrabold">{{ store.step() }}. {{ 'wizard.step' + store.step() | translate }}</h2>
        <div class="mt-6">
          @switch (store.step()) {
            @case (1) { <app-step-origin class="step-enter" /> }
            @case (2) { <app-step-vehicle class="step-enter" /> }
            @case (3) { <app-step-condition class="step-enter" /> }
            @case (4) { <app-step-destination class="step-enter" /> }
            @case (5) { <app-step-after-import class="step-enter" /> }
            @case (6) { <app-step-result class="step-enter" (unlock)="openPaywall()" (partner)="lead.set(true)" (edit)="go(1 - store.step())" /> }
          }
        </div>

        <div class="mt-12 flex items-center justify-between border-t border-line pt-6">
          <button type="button" class="btn btn-ghost" [disabled]="store.step() === 1" (click)="go(-1)">
            <app-icon name="arrow-left" [size]="18" /> {{ 'wizard.back' | translate }}
          </button>
          @if (store.step() < lastInput) {
            <button type="button" class="btn btn-primary" (click)="go(1)">{{ 'wizard.next' | translate }} <app-icon name="arrow-right" [size]="18" /></button>
          } @else if (store.step() === lastInput) {
            <button type="button" class="btn btn-primary" [disabled]="!store.isValid()" (click)="go(1)">
              <app-icon name="calculator" [size]="18" /> {{ 'wizard.calculate' | translate }}
            </button>
          } @else {
            <button type="button" class="btn btn-outline" (click)="go(1 - store.step())">{{ 'result.edit' | translate }}</button>
          }
        </div>

        @if (store.step() === resultStep) { <app-affiliate-widgets /> }
      </main>
    </div>

    @if (paywall()) { <app-paywall-modal (closed)="paywall.set(false)" /> }
    @if (lead()) { <app-partner-lead-form (closed)="lead.set(false)" /> }
  `,
})
export class CalculatorPage implements OnInit {
  /** Deep links from the footer, home page and guides: ?from=USA, ?to=DE (destination), ?port=DEBRV (EU port), ?model=. */
  readonly from = input<string>();
  readonly to = input<string>();
  readonly port = input<string>();
  /** /result/:quoteId - from the estimate e-mail (reload the car) or the Stripe cancel_url (?cancelled=1). */
  readonly quoteId = input<string>();
  readonly cancelled = input<string>();
  /** ?model=ford-mustang from the model cost pages: the example car's data as the starting point. */
  readonly model = input<string>();

  protected readonly store = inject(CalculatorStore);
  protected readonly page = inject(PageContext);
  private readonly lang = inject(LanguageService);
  protected readonly home = computed(() => pathFor('home', this.lang.current()));

  protected readonly steps: WizardStep[] = [1, 2, 3, 4, 5, 6];
  protected readonly lastInput = LAST_INPUT_STEP;
  protected readonly resultStep = RESULT_STEP;
  protected readonly paywall = signal(false);
  private readonly analytics = inject(AnalyticsService);
  private readonly api = inject(CarImportApi);
  private readonly platform = inject(PLATFORM_ID);

  protected openPaywall(): void {
    this.paywall.set(true);
    this.analytics.track('paywall_opened');
  }
  protected readonly lead = signal(false);

  ngOnInit(): void {
    this.reopenSavedQuote();
    const from = this.from();
    if (from && ORIGINS.some((o) => o.code === from)) {
      this.store.selectOrigin(from as OriginCountry);
    }
    const to = this.to();
    if (to && (EU_COUNTRIES as readonly string[]).includes(to)) {
      this.store.setAddress(null);
      this.store.patch({ destinationCountry: to, pricePerKm: null, postImportServices: null });
    }
    const model = GUIDE_MODELS.find((m) => m.id === this.model());
    if (model) {
      this.store.selectOrigin(model.origin as OriginCountry);
      this.store.patch({
        auctionHouse: model.auction as AuctionHouse,
        pickupZone: model.zone,
        bidPrice: model.price,
        titleType: 'CLEAN',
        condition: 'RUN_AND_DRIVE',
        vehicleCategory: model.category as VehicleCategory,
        fuelType: model.fuel as FuelType,
        engineCc: model.cc,
        productionYear: model.year,
        powerKw: model.kw,
        co2Gkm: model.co2,
        massKg: model.kg,
        vin: null,
        vehicleDescription: `${model.year} ${model.make} ${model.model}`,
      });
    }
    const port = this.port();
    if (port && /^[A-Z]{5}$/.test(port)) {
      this.store.choosePort(port);
    }
  }

  /**
   * The link in the estimate e-mail: load that car into the wizard and recalculate with today's rates. The Stripe
   * cancel return keeps its own session state instead.
   */
  private reopenSavedQuote(): void {
    const id = this.quoteId();
    if (!id || this.cancelled() || !isPlatformBrowser(this.platform) || this.store.result()?.quoteId === id) {
      return;
    }
    this.api.quoteRequest(id).subscribe({
      next: (request) => {
        this.store.patch(request);
        this.store.goTo(RESULT_STEP);
      },
      error: () => {
        // unknown or deleted quote: the wizard simply starts from its saved or default state
      },
    });
  }

  protected go(delta: number): void {
    this.store.goTo((this.store.step() + delta) as WizardStep);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
