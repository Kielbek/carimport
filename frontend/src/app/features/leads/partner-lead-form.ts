import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of, switchMap } from 'rxjs';
import { CarImportApi } from '../../core/api/carimport-api';
import { CalculatorStore } from '../calculator/calculator.store';

/** B2B lead: hands the frozen quote to a verified import partner (GDPR consent is mandatory and explicit). */
@Component({
  selector: 'app-partner-lead-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="modal-backdrop" (click)="closed.emit()"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button type="button" class="absolute right-4 top-4 text-slate-400 hover:text-slate-700" (click)="closed.emit()" aria-label="Close">✕</button>
      @if (sent()) {
        <div class="py-8 text-center">
          <p class="text-5xl">🎉</p>
          <h2 class="mt-3 text-xl font-bold">{{ 'lead.thanks' | translate }}</h2>
          <p class="mt-1 text-sm text-slate-600">{{ 'lead.thanksHint' | translate }}</p>
        </div>
      } @else {
        <h2 id="lead-title" class="text-2xl font-bold">🤝 {{ 'lead.title' | translate }}</h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ 'lead.subtitle' | translate }}</p>
        <form class="mt-6 space-y-3" [formGroup]="form" (ngSubmit)="submit()">
          <input class="input" formControlName="name" [placeholder]="'lead.name' | translate" autocomplete="name" />
          <input class="input" type="email" formControlName="email" [placeholder]="'lead.email' | translate" autocomplete="email" />
          <input class="input" type="tel" formControlName="phone" [placeholder]="'lead.phone' | translate" autocomplete="tel" />
          <textarea class="input min-h-24" formControlName="message" [placeholder]="'lead.message' | translate"></textarea>
          <!-- honeypot: invisible to humans, bots fill it -->
          <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label class="flex items-start gap-2 text-xs"><input type="checkbox" formControlName="consentDataTransfer" class="mt-0.5" />
            <span>{{ 'lead.consentTransfer' | translate }}</span></label>
          <label class="flex items-start gap-2 text-xs"><input type="checkbox" formControlName="consentMarketing" class="mt-0.5" />
            <span>{{ 'lead.consentMarketing' | translate }}</span></label>
          <button type="submit" class="cta-primary w-full" [disabled]="form.invalid || busy()">{{ 'lead.submit' | translate }}</button>
        </form>
      }
    </div>
  `,
})
export class PartnerLeadForm {
  private readonly store = inject(CalculatorStore);
  private readonly api = inject(CarImportApi);
  readonly closed = output<void>();
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^\+?[0-9 ()-]{6,20}$/)],
    message: ['', Validators.maxLength(2000)],
    website: [''],
    consentDataTransfer: [false, Validators.requiredTrue],
    consentMarketing: [false],
  });

  protected submit(): void {
    this.busy.set(true);
    const s = this.store.state();
    this.store
      .freeze()
      .pipe(
        catchError(() => of(null)),
        switchMap((quote) =>
          this.api.submitLead({
            ...this.form.getRawValue(),
            phone: this.form.value.phone || null,
            quoteId: quote?.quoteId ?? null,
            destinationCountry: s.destinationCountry,
            originCountry: s.originCountry,
          }),
        ),
      )
      .subscribe({ next: () => this.sent.set(true), error: () => this.busy.set(false) });
  }
}
