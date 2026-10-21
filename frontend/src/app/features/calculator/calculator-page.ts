import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DisplayCurrency } from '../../core/api/api.models';
import { MoneyPipe } from '../../core/format/money.pipe';
import { LanguageService, SUPPORTED_LANGS } from '../../core/i18n/language.service';
import { AffiliateWidgets } from '../affiliates/affiliate-widgets';
import { PartnerLeadForm } from '../leads/partner-lead-form';
import { PaywallModal } from '../paywall/paywall-modal';
import { CalculatorStore, WizardStep } from './calculator.store';
import { LiveResultPanel } from './result/live-result-panel';
import { StepCondition } from './steps/step-condition';
import { StepRoute } from './steps/step-route';
import { StepVehicle } from './steps/step-vehicle';

/** Wizard shell: header (language + currency), three steps with progress, sticky live result. */
@Component({
  selector: 'app-calculator-page',
  imports: [TranslatePipe, MoneyPipe, StepRoute, StepVehicle, StepCondition, LiveResultPanel, PaywallModal, PartnerLeadForm, AffiliateWidgets],
  providers: [CalculatorStore],
  template: `
    <header class="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <span class="text-lg font-extrabold tracking-tight">🚢 Car<span class="text-indigo-600">Import</span>.eu</span>
        <div class="flex items-center gap-2">
          <select class="input !w-auto !py-1.5 text-sm" [value]="store.state().displayCurrency" aria-label="Currency"
                  (change)="store.patch({ displayCurrency: $any($event.target).value })">
            @for (c of currencies; track c) { <option [value]="c">{{ c }}</option> }
          </select>
          <nav class="flex rounded-full bg-slate-100 p-1 text-xs font-semibold dark:bg-slate-800" aria-label="Language">
            @for (l of langs; track l) {
              <button type="button" class="rounded-full px-2.5 py-1 uppercase transition"
                      [class]="lang.current() === l ? 'bg-white shadow text-indigo-700 dark:bg-slate-950' : 'text-slate-500'"
                      (click)="switchLang(l)">{{ l === 'uk' ? 'ua' : l }}</button>
            }
          </nav>
        </div>
      </div>
    </header>

    <main class="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-8 lg:grid-cols-[1fr_24rem] lg:pb-8">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">{{ 'app.headline' | translate }}</h1>
        <p class="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{{ 'app.tagline' | translate }}</p>

        <ol class="mt-8 grid grid-cols-3 gap-2" aria-label="Progress">
          @for (st of steps; track st) {
            <li>
              <button type="button" class="w-full text-left" (click)="store.goTo(st)">
                <span class="block h-1.5 rounded-full transition-all duration-500"
                      [class]="store.step() >= st ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'"></span>
                <span class="mt-2 block text-xs font-semibold" [class.text-indigo-600]="store.step() === st">
                  {{ st }}. {{ 'wizard.step' + st | translate }}
                </span>
              </button>
            </li>
          }
        </ol>

        <div class="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          @switch (store.step()) {
            @case (1) { <app-step-route class="step-enter" /> }
            @case (2) { <app-step-vehicle class="step-enter" /> }
            @case (3) { <app-step-condition class="step-enter" /> }
          }
          <div class="mt-8 flex justify-between">
            <button type="button" class="cta-ghost" [disabled]="store.step() === 1" (click)="prev()">← {{ 'wizard.back' | translate }}</button>
            @if (store.step() < 3) {
              <button type="button" class="cta-primary" (click)="next()">{{ 'wizard.next' | translate }} →</button>
            } @else {
              <button type="button" class="cta-primary" (click)="paywall.set(true)">🔓 {{ 'wizard.finish' | translate }}</button>
            }
          </div>
        </div>

        <app-affiliate-widgets />
      </div>

      <div id="result" class="scroll-mt-20 lg:sticky lg:top-20 lg:self-start">
        <app-live-result-panel (unlock)="paywall.set(true)" (partner)="lead.set(true)" />
      </div>
    </main>

    <!-- mobile: the result panel sits below the wizard, so keep the live range always in view -->
    @if (store.preview(); as p) {
      <a href="#result" class="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-indigo-700/95 px-4 py-3 text-white shadow-2xl backdrop-blur lg:hidden">
        <span class="text-xs text-indigo-200">{{ 'result.title' | translate }}</span>
        <span class="font-bold tabular-nums">{{ p.rangeMin | money: p.currency : lang.locale() }} – {{ p.rangeMax | money: p.currency : lang.locale() }}</span>
      </a>
    }

    @if (paywall()) { <app-paywall-modal (closed)="paywall.set(false)" /> }
    @if (lead()) { <app-partner-lead-form (closed)="lead.set(false)" /> }
  `,
})
export class CalculatorPage {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  private readonly router = inject(Router);

  protected readonly steps: WizardStep[] = [1, 2, 3];
  protected readonly langs = SUPPORTED_LANGS;
  protected readonly currencies: DisplayCurrency[] = ['PLN', 'EUR', 'USD'];
  protected readonly paywall = signal(false);
  protected readonly lead = signal(false);

  protected next(): void {
    this.store.goTo((this.store.step() + 1) as WizardStep);
  }

  protected prev(): void {
    this.store.goTo((this.store.step() - 1) as WizardStep);
  }

  /** Language lives in the URL; navigating re-runs the guard, which switches translations. */
  protected switchLang(l: string): void {
    const rest = this.router.url.split('/').slice(2).join('/');
    this.router.navigateByUrl(`/${l}${rest ? '/' + rest : ''}`);
  }
}
