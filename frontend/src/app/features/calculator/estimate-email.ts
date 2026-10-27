import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CarImportApi } from '../../core/api/carimport-api';
import { Icon } from '../../shared/icon/icon';
import { markNewsletterSubscribed } from '../newsletter/newsletter-signup';

/** "Send me this estimate": the free numbers and a link back to the same car, for visitors not buying yet. */
@Component({
  selector: 'app-estimate-email',
  imports: [ReactiveFormsModule, TranslatePipe, Icon],
  template: `
    <section class="mt-6 rounded-[6px] border border-line bg-panel p-5 sm:p-6" aria-labelledby="estimate-email-title">
      <div class="flex items-start gap-3">
        <span class="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-text"><app-icon name="mail" [size]="20" /></span>
        <div class="min-w-0 flex-1">
          <h3 id="estimate-email-title" class="font-extrabold">{{ 'result.email.title' | translate }}</h3>
          <p class="mt-1 text-sm text-muted">{{ 'result.email.lead' | translate }}</p>
          @if (sent()) {
            <p class="mt-4 flex gap-2 rounded-[4px] bg-brand/10 p-3 text-sm font-semibold" role="status">
              <app-icon name="check-circle" [size]="18" class="mt-0.5 shrink-0 text-brand-text" /> {{ 'result.email.sent' | translate }}
            </p>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()" class="mt-4 space-y-2.5">
              <div class="flex flex-col gap-2 sm:flex-row">
                <label class="sr-only" for="estimate-email">{{ 'newsletter.email' | translate }}</label>
                <input id="estimate-email" type="email" formControlName="email" autocomplete="email" class="input min-w-0 flex-1"
                       [placeholder]="'newsletter.email' | translate" />
                <button type="submit" class="btn btn-primary shrink-0" [disabled]="form.invalid || busy()">{{ 'result.email.submit' | translate }}</button>
              </div>
              <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
                <input type="checkbox" formControlName="newsletter" class="checkbox" />
                <span>{{ 'result.email.newsletter' | translate }}</span>
              </label>
              @if (error()) {
                <p class="text-sm font-semibold text-danger" role="alert">{{ error()! | translate }}</p>
              }
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class EstimateEmail {
  private readonly api = inject(CarImportApi);
  private readonly analytics = inject(AnalyticsService);
  readonly quoteId = input.required<string>();
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    newsletter: [false],
    website: [''],
  });

  protected submit(): void {
    if (this.form.invalid || this.busy()) {
      return;
    }
    this.busy.set(true);
    this.error.set(null);
    const v = this.form.getRawValue();
    this.api.emailEstimate({ quoteId: this.quoteId(), email: v.email.trim(), newsletter: v.newsletter, website: v.website })
      .subscribe({
        next: () => {
          this.sent.set(true);
          this.analytics.track('estimate_emailed', { newsletter: v.newsletter ? 1 : 0 });
          if (v.newsletter) {
            markNewsletterSubscribed();
          }
        },
        error: (e) => {
          this.error.set(e.status === 429 ? 'result.email.limit' : 'result.email.error');
          this.busy.set(false);
        },
      });
  }
}
