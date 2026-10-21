import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DisplayCurrency, OriginCountry } from '../../core/api/api.models';
import { LanguageService } from '../../core/i18n/language.service';
import { PageContext } from '../../core/routing/page-context';
import { pathFor } from '../../core/routing/paths';
import { LanguageMenu } from '../../layout/language-menu';
import { Logo } from '../../layout/logo';
import { ThemeToggle } from '../../layout/theme-toggle';
import { Icon } from '../../shared/icon/icon';
import { AffiliateWidgets } from '../affiliates/affiliate-widgets';
import { PartnerLeadForm } from '../leads/partner-lead-form';
import { PaywallModal } from '../paywall/paywall-modal';
import { CalculatorStore, LAST_INPUT_STEP, RESULT_STEP, WizardStep } from './calculator.store';
import { ORIGINS } from './calculator.options';
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
    RouterLink, TranslatePipe, Icon, Logo, LanguageMenu, ThemeToggle, StepOrigin, StepVehicle, StepCondition,
    StepDestination, StepAfterImport, StepResult, PaywallModal, PartnerLeadForm, AffiliateWidgets,
  ],
  providers: [CalculatorStore],
  template: `
    <div class="min-h-screen">
      <!-- minimal bar instead of the site header -->
      <div class="border-b border-line">
        <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <a [routerLink]="home()" [attr.aria-label]="'layout.home' | translate"><app-logo class="scale-[0.8] origin-left" /></a>
          <div class="flex items-center gap-2">
            <select class="input !w-auto !py-1.5 text-sm" [value]="store.state().displayCurrency" [attr.aria-label]="'calc.currency' | translate"
                    (change)="store.patch({ displayCurrency: $any($event.target).value })">
              @for (c of currencies; track c) { <option [value]="c" [selected]="c === store.state().displayCurrency">{{ c }}</option> }
            </select>
            <app-language-menu [hrefFor]="page.hrefFor()" />
            <app-theme-toggle />
            <a [routerLink]="home()" class="grid size-10 place-items-center text-fg/70 hover:text-fg" [attr.aria-label]="'layout.close' | translate">
              <app-icon name="x" [size]="20" />
            </a>
          </div>
        </div>
      </div>

      <main class="mx-auto max-w-5xl px-5 pb-20 pt-10">
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
            @case (6) { <app-step-result class="step-enter" (unlock)="paywall.set(true)" (partner)="lead.set(true)" (edit)="go(1 - store.step())" /> }
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
  /** ?from=USA deep link (footer, home page). */
  readonly from = input<string>();

  protected readonly store = inject(CalculatorStore);
  protected readonly page = inject(PageContext);
  private readonly lang = inject(LanguageService);
  protected readonly home = computed(() => pathFor('home', this.lang.current()));

  protected readonly steps: WizardStep[] = [1, 2, 3, 4, 5, 6];
  protected readonly lastInput = LAST_INPUT_STEP;
  protected readonly resultStep = RESULT_STEP;
  protected readonly currencies: DisplayCurrency[] = ['PLN', 'EUR', 'USD'];
  protected readonly paywall = signal(false);
  protected readonly lead = signal(false);

  ngOnInit(): void {
    const from = this.from();
    if (from && ORIGINS.some((o) => o.code === from)) {
      this.store.selectOrigin(from as OriginCountry);
    }
  }

  protected go(delta: number): void {
    this.store.goTo((this.store.step() + delta) as WizardStep);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
