import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryNamePipe } from '../../../core/format/country-name.pipe';
import { LocalNumberPipe } from '../../../core/format/local-number.pipe';
import { LanguageService } from '../../../core/i18n/language.service';
import { Icon } from '../../../shared/icon/icon';
import { COUNTRY_FACTS, CountryFacts } from '../../guides/country-facts';
import { CalculatorStore } from '../calculator.store';
import { ProposalInput } from '../proposal-input';

/**
 * Step 5 - between the port and number plates, for the country of registration: what the buyer must do (registration
 * tax, statutory approval and fees, inspection, registration, insurance - in that order) and what they can do
 * (services ticked by default where almost every import needs them). The registration tax is priced here and can be
 * overridden; the statutory fees are listed with what they are for, their amounts are in the report.
 */
@Component({
  selector: 'app-step-after-import',
  imports: [TranslatePipe, LocalNumberPipe, Icon, ProposalInput],
  template: `
    <p class="text-sm text-muted">{{ 'wizard.afterImportLead' | translate }}</p>

    <!-- must do -->
    <h3 class="mt-7 flex items-center gap-2 text-lg font-extrabold">
      <app-icon name="check-circle" [size]="20" class="text-brand-text" />
      {{ 'after.mustTitle' | translate: { country: country() } }}
    </h3>
    <ol class="mt-4 space-y-3">
      <!-- 1. registration tax -->
      <li class="rounded-[4px] border border-line p-4">
        <div class="flex items-start gap-3">
          <span class="step-no">1</span>
          <div class="min-w-0 flex-1">
            <p class="font-bold">{{ facts()?.registrationTax ?? ('after.noRegTaxName' | translate) }}</p>
            @switch (mode()) {
              @case ('EXCISE') {
                <p class="mt-1 text-sm text-muted">{{ 'after.tax.EXCISE' | translate: { rate: (store.indicativeExciseRate() ?? 0 | localNumber: lang.locale()) } }}</p>
              }
              @case ('NONE') {
                <p class="mt-1 text-sm text-muted">{{ 'after.tax.NONE' | translate: { country: country() } }}</p>
              }
              @case ('ESTIMATED') {
                <p class="mt-1 text-sm text-muted">
                  {{ 'after.tax.ESTIMATED' | translate: { co2: co2(), kw: kw() } }}
                </p>
                <div class="mt-3 max-w-sm">
                  <app-proposal-input inputId="regtax" label="after.taxAmount" [unit]="s().displayCurrency" [step]="10"
                                      hint="after.taxOwnHint" [value]="s().registrationTaxOwn"
                                      [proposal]="store.registrationTaxProposal()"
                                      (changed)="store.patch({ registrationTaxOwn: $event })" />
                </div>
              }
              @case ('OFFICIAL_CALCULATOR') {
                <p class="mt-1 text-sm text-muted">{{ 'after.tax.OFFICIAL' | translate }}</p>
                @if (store.suggestions()?.registrationTaxUrl; as url) {
                  <a [href]="url" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline">
                    <app-icon name="external-link" [size]="14" /> {{ 'after.officialCalculator' | translate }}
                  </a>
                }
                <div class="mt-3 max-w-sm">
                  <app-proposal-input inputId="regtax" label="after.taxAmount" [unit]="s().displayCurrency" [step]="10"
                                      hint="after.taxTypeHint" [value]="s().registrationTaxOwn" [proposal]="null"
                                      (changed)="store.patch({ registrationTaxOwn: $event })" />
                </div>
              }
            }
          </div>
        </div>
      </li>

      <!-- 2. statutory approval and fees -->
      @for (svc of store.statutoryServices(); track svc.code; let i = $index) {
        <li class="rounded-[4px] border border-line p-4">
          <div class="flex items-start gap-3">
            <span class="step-no">{{ i + 2 }}</span>
            <div class="min-w-0 flex-1">
              <p class="flex flex-wrap items-center gap-x-2 font-bold">
                {{ 'cost.' + svc.code | translate }}
                <span class="badge"><app-icon name="lock" [size]="11" /> {{ 'after.amountInReport' | translate }}</span>
              </p>
              <p class="mt-1 text-sm text-muted">
                {{ 'serviceHint.' + svc.code | translate: { authority: facts()?.authority ?? '', inspection: facts()?.inspection ?? '' } }}
              </p>
            </div>
          </div>
        </li>
      }

      <!-- registration at the authority -->
      @if (facts(); as f) {
        <li class="rounded-[4px] border border-line p-4">
          <div class="flex items-start gap-3">
            <span class="step-no">{{ store.statutoryServices().length + 2 }}</span>
            <div class="min-w-0 flex-1">
              <p class="font-bold">{{ 'after.registerTitle' | translate: { authority: f.authority } }}</p>
              <p class="mt-1 text-sm text-muted">
                {{ 'after.registerText' | translate: { inspection: f.inspection } }}
                @if (f.deadlineDays) { <strong class="text-fg">{{ 'after.deadline' | translate: { days: f.deadlineDays } }}</strong> }
              </p>
            </div>
          </div>
        </li>
      }

      <!-- insurance -->
      <li class="rounded-[4px] border border-line p-4">
        <div class="flex items-start gap-3">
          <span class="step-no">{{ store.statutoryServices().length + (facts() ? 3 : 2) }}</span>
          <div class="min-w-0 flex-1 max-w-sm">
            <app-proposal-input inputId="ins" label="wizard.insurance" [unit]="s().displayCurrency" hint="wizard.insuranceHint"
                                [value]="s().insuranceEstimate" [proposal]="store.insuranceProposal()"
                                (changed)="store.patch({ insuranceEstimate: $event })" />
          </div>
        </div>
      </li>
    </ol>

    @if (!store.options()) {
      <p class="mt-6 text-sm text-muted">{{ 'wizard.optionsLoading' | translate }}</p>
    }

    <!-- can do -->
    @if (store.selectableServices().length) {
      <h3 class="mt-9 flex items-center gap-2 text-lg font-extrabold">
        <app-icon name="sparkles" [size]="20" class="text-brand-text" /> {{ 'after.canTitle' | translate }}
      </h3>
      <p class="mt-1 text-sm text-muted">{{ 'after.canLead' | translate }}</p>
      <div class="mt-4 grid gap-2 sm:grid-cols-2">
        @for (svc of store.selectableServices(); track svc.code) {
          <label class="flex cursor-pointer items-start gap-3 rounded-[4px] border px-4 py-3 text-sm transition"
                 [class]="store.chosenServices().has(svc.code) ? 'border-brand bg-brand/8' : 'border-line hover:border-line-strong'">
            <input type="checkbox" class="checkbox" [checked]="store.chosenServices().has(svc.code)" (change)="store.toggleService(svc.code)" />
            <span>
              <span class="font-medium">{{ 'cost.' + svc.code | translate }}</span>
              @if (svc.defaultSelected) { <span class="ml-1 text-xs text-brand-text">· {{ 'wizard.recommended' | translate }}</span> }
              <span class="mt-0.5 block text-xs text-muted">{{ 'serviceHint.' + svc.code | translate }}</span>
            </span>
          </label>
        }
      </div>
    }
  `,
  styles: `
    .step-no {
      display: inline-flex; flex-shrink: 0; align-items: center; justify-content: center;
      width: 1.75rem; height: 1.75rem; border-radius: 999px;
      background: var(--brand); color: #111; font-weight: 800; font-size: 0.85rem;
    }
  `,
})
export class StepAfterImport {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  protected readonly s = this.store.state;

  protected readonly facts = computed<CountryFacts | null>(() => COUNTRY_FACTS[this.s().destinationCountry] ?? null);
  protected readonly mode = computed(() => this.store.suggestions()?.registrationTax ?? 'ESTIMATED');
  protected readonly co2 = computed(() => this.s().co2Gkm ?? this.store.co2Proposal() ?? '–');
  protected readonly kw = computed(() => this.s().powerKw ?? this.store.powerProposal() ?? '–');
  private readonly countryName = new CountryNamePipe();
  protected readonly country = computed(() => this.countryName.transform(this.s().destinationCountry, this.lang.locale()));
}
