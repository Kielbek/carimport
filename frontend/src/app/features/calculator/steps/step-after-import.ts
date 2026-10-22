import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../shared/icon/icon';
import { CalculatorStore } from '../calculator.store';
import { ProposalInput } from '../proposal-input';

/** Step 5 - what has to happen before the car is registered: statutory items and optional services to tick. */
@Component({
  selector: 'app-step-after-import',
  imports: [TranslatePipe, Icon, ProposalInput],
  template: `
    <p class="text-sm text-muted">{{ 'wizard.afterImportLead' | translate }}</p>

    @if (store.statutoryServices().length) {
      <h3 class="label mt-7">{{ 'wizard.statutory' | translate }}</h3>
      <ul class="grid gap-2 sm:grid-cols-2">
        @for (svc of store.statutoryServices(); track svc.code) {
          <li class="flex items-start gap-3 rounded-[4px] bg-panel-2 px-4 py-3 text-sm">
            <app-icon name="lock" [size]="16" class="mt-0.5 text-muted" />
            <span>{{ 'cost.' + svc.code | translate }}</span>
          </li>
        }
      </ul>
    }

    @if (store.selectableServices().length) {
      <h3 class="label mt-8">{{ 'wizard.optional' | translate }}</h3>
      <div class="grid gap-2 sm:grid-cols-2">
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

    @if (!store.options()) {
      <p class="mt-6 text-sm text-muted">{{ 'wizard.optionsLoading' | translate }}</p>
    } @else if (!store.statutoryServices().length && !store.selectableServices().length) {
      <p class="mt-6 rounded-[4px] border border-line p-4 text-sm text-muted">{{ 'wizard.noServices' | translate }}</p>
    }

    <div class="mt-8 max-w-sm">
      <app-proposal-input inputId="ins" label="wizard.insurance" [unit]="s().displayCurrency" hint="wizard.insuranceHint"
                          [value]="s().insuranceEstimate" [proposal]="store.insuranceProposal()"
                          (changed)="store.patch({ insuranceEstimate: $event })" />
    </div>
  `,
})
export class StepAfterImport {
  protected readonly store = inject(CalculatorStore);
  protected readonly s = this.store.state;
}
