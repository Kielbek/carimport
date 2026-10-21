import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DisplayCurrency, OriginCountry } from '../../core/api/api.models';
import { MoneyPipe } from '../../core/format/money.pipe';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { Icon } from '../../shared/icon/icon';
import { AffiliateWidgets } from '../affiliates/affiliate-widgets';
import { FaqSection } from '../home/faq-section';
import { PartnerLeadForm } from '../leads/partner-lead-form';
import { PaywallModal } from '../paywall/paywall-modal';
import { CalculatorStore, WizardStep } from './calculator.store';
import { ORIGINS } from './calculator.options';
import { LiveResultPanel } from './result/live-result-panel';
import { StepCondition } from './steps/step-condition';
import { StepRoute } from './steps/step-route';
import { StepVehicle } from './steps/step-vehicle';

/** Calculator page: three-step wizard with progress, sticky live result, monetization modals and an SEO FAQ. */
@Component({
  selector: 'app-calculator-page',
  imports: [
    RouterLink, TranslatePipe, MoneyPipe, Icon, StepRoute, StepVehicle, StepCondition, LiveResultPanel, PaywallModal,
    PartnerLeadForm, AffiliateWidgets, FaqSection,
  ],
  providers: [CalculatorStore],
  template: `
    <div class="border-b border-line bg-bg-soft">
      <div class="site py-10">
        <nav class="text-xs text-muted" [attr.aria-label]="'layout.breadcrumb' | translate">
          <a [routerLink]="home()" class="hover:text-fg">{{ 'layout.home' | translate }}</a> <span class="mx-1.5">/</span>
          <span class="text-fg">{{ 'layout.calculator' | translate }}</span>
        </nav>
        <div class="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 class="h-section">{{ 'calc.title' | translate }}</h1>
            <p class="lead mt-3 max-w-2xl">{{ 'calc.lead' | translate }}</p>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <span class="text-muted">{{ 'calc.currency' | translate }}</span>
            <select class="input !w-auto !py-2" [value]="store.state().displayCurrency" (change)="store.patch({ displayCurrency: $any($event.target).value })">
              @for (c of currencies; track c) { <option [value]="c">{{ c }}</option> }
            </select>
          </label>
        </div>
      </div>
    </div>

    <div class="site grid gap-8 pb-28 pt-10 lg:grid-cols-[1fr_380px] lg:pb-10">
      <div>
        <ol class="grid grid-cols-3 gap-3" [attr.aria-label]="'calc.progress' | translate">
          @for (st of steps; track st) {
            <li>
              <button type="button" class="group w-full text-left" (click)="store.goTo(st)" [attr.aria-current]="store.step() === st ? 'step' : null">
                <span class="block h-1 rounded-full transition-all duration-500" [class]="store.step() >= st ? 'bg-brand' : 'bg-line'"></span>
                <span class="mt-2.5 flex items-center gap-2 text-[13px] font-semibold" [class]="store.step() === st ? 'text-fg' : 'text-muted group-hover:text-fg'">
                  <span class="grid size-5 place-items-center rounded-full text-[11px]" [class]="store.step() > st ? 'bg-success text-white' : store.step() === st ? 'bg-brand text-brand-ink' : 'border border-line'">
                    @if (store.step() > st) { <app-icon name="check" [size]="12" [stroke]="3" /> } @else { {{ st }} }
                  </span>
                  <span class="hidden sm:inline">{{ 'wizard.step' + st | translate }}</span>
                </span>
              </button>
            </li>
          }
        </ol>

        <div class="card mt-6 p-5 sm:p-7">
          @switch (store.step()) {
            @case (1) { <app-step-route class="step-enter" /> }
            @case (2) { <app-step-vehicle class="step-enter" /> }
            @case (3) { <app-step-condition class="step-enter" /> }
          }
          <div class="mt-10 flex items-center justify-between border-t border-line pt-6">
            <button type="button" class="btn btn-ghost" [disabled]="store.step() === 1" (click)="go(-1)">
              <app-icon name="arrow-left" [size]="18" /> {{ 'wizard.back' | translate }}
            </button>
            @if (store.step() < 3) {
              <button type="button" class="btn btn-primary" (click)="go(1)">{{ 'wizard.next' | translate }} <app-icon name="arrow-right" [size]="18" /></button>
            } @else {
              <button type="button" class="btn btn-primary" (click)="paywall.set(true)"><app-icon name="lock" [size]="17" /> {{ 'wizard.finish' | translate }}</button>
            }
          </div>
        </div>

        <app-affiliate-widgets />
      </div>

      <div id="result" class="scroll-mt-28 lg:sticky lg:top-24 lg:self-start">
        <app-live-result-panel (unlock)="paywall.set(true)" (partner)="lead.set(true)" />
      </div>
    </div>

    <app-faq-section [openFirst]="false" />

    <!-- mobile: the result sits below the wizard, so keep the live range in view -->
    @if (store.preview(); as p) {
      <a href="#result" class="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-[6px] bg-ink px-4 py-3 text-white shadow-2xl lg:hidden"
         animate.enter="reveal-enter">
        <span class="text-[11px] uppercase tracking-wider text-white/60">{{ 'result.short' | translate }}</span>
        <span class="font-extrabold tabular-nums text-brand">{{ p.rangeMin | money: p.currency : lang.locale() }} – {{ p.rangeMax | money: p.currency : lang.locale() }}</span>
      </a>
    }

    @if (paywall()) { <app-paywall-modal (closed)="paywall.set(false)" /> }
    @if (lead()) { <app-partner-lead-form (closed)="lead.set(false)" /> }
  `,
})
export class CalculatorPage implements OnInit {
  /** ?from=USA deep link (footer, home country cards). */
  readonly from = input<string>();

  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly home = computed(() => pathFor('home', this.lang.current()));

  protected readonly steps: WizardStep[] = [1, 2, 3];
  protected readonly currencies: DisplayCurrency[] = ['PLN', 'EUR', 'USD'];
  protected readonly paywall = signal(false);
  protected readonly lead = signal(false);

  ngOnInit(): void {
    const from = this.from();
    if (from && ORIGINS.some((o) => o.code === from)) {
      this.store.selectOrigin(from as OriginCountry);
    }
  }

  protected go(delta: 1 | -1): void {
    this.store.goTo((this.store.step() + delta) as WizardStep);
  }
}
