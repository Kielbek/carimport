import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of, switchMap } from 'rxjs';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CarImportApi } from '../../core/api/carimport-api';
import { Icon } from '../../shared/icon/icon';
import { CalculatorStore } from '../calculator/calculator.store';

/** B2B lead: hands the frozen quote to a verified import partner (GDPR consent is mandatory and explicit). */
@Component({
  selector: 'app-partner-lead-form',
  imports: [ReactiveFormsModule, TranslatePipe, Icon],
  template: `
    <div class="overlay" (click)="closed.emit()"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button type="button" class="absolute right-4 top-4 text-muted hover:text-fg" (click)="closed.emit()" [attr.aria-label]="'layout.close' | translate">
        <app-icon name="x" [size]="20" />
      </button>
      @if (sent()) {
        <div class="py-8 text-center" animate.enter="reveal-enter">
          <span class="mx-auto grid size-14 place-items-center rounded-full bg-success text-white"><app-icon name="check" [size]="28" [stroke]="2.5" /></span>
          <h2 class="mt-5 text-xl font-extrabold">{{ 'lead.thanks' | translate }}</h2>
          <p class="mt-2 text-sm text-muted">{{ 'lead.thanksHint' | translate }}</p>
        </div>
      } @else {
        <span class="grid size-12 place-items-center rounded-[6px] bg-accent text-white"><app-icon name="handshake" [size]="24" /></span>
        <h2 id="lead-title" class="mt-5 text-2xl font-extrabold">{{ 'lead.title' | translate }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ 'lead.subtitle' | translate }}</p>
        <form class="mt-6 space-y-3" [formGroup]="form" (ngSubmit)="submit()">
          <input class="input" formControlName="name" [placeholder]="'lead.name' | translate" autocomplete="name" />
          <input class="input" type="email" formControlName="email" [placeholder]="'lead.email' | translate" autocomplete="email" />
          <input class="input" type="tel" formControlName="phone" [placeholder]="'lead.phone' | translate" autocomplete="tel" />
          <textarea class="input min-h-24" formControlName="message" [placeholder]="'lead.message' | translate"></textarea>
          <!-- honeypot: invisible to humans, bots fill it -->
          <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted"><input type="checkbox" formControlName="consentDataTransfer" class="checkbox" />
            <span>{{ 'lead.consentTransfer' | translate }}</span></label>
          <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted"><input type="checkbox" formControlName="consentMarketing" class="checkbox" />
            <span>{{ 'lead.consentMarketing' | translate }}</span></label>
          <button type="submit" class="btn btn-primary w-full" [disabled]="form.invalid || busy()">{{ 'lead.submit' | translate }}</button>
        </form>
      }
    </div>
  `,
})
export class PartnerLeadForm {
  private readonly store = inject(CalculatorStore);
  private readonly api = inject(CarImportApi);
  private readonly analytics = inject(AnalyticsService);
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
      .subscribe({
        next: () => {
          this.sent.set(true);
          this.analytics.track('partner_lead_sent');
        },
        error: () => this.busy.set(false),
      });
  }
}
