import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { Icon } from '../../shared/icon/icon';

/** Newsletter sign-up with explicit consent; the address joins the list only after the e-mailed link is opened. */
@Component({
  selector: 'app-newsletter-signup',
  imports: [ReactiveFormsModule, TranslatePipe, Icon],
  template: `
    <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start">
      <div>
        <h2 class="text-lg font-extrabold">{{ 'newsletter.title' | translate }}</h2>
        <p class="mt-1.5 max-w-xl text-sm text-muted">{{ 'newsletter.lead' | translate }}</p>
      </div>
      @if (sent()) {
        <p class="flex gap-2.5 rounded-[4px] bg-brand/10 p-4 text-sm font-semibold" role="status">
          <app-icon name="mail" [size]="18" class="mt-0.5 shrink-0 text-brand-text" /> {{ 'newsletter.sent' | translate }}
        </p>
      } @else {
        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-2.5">
          <div class="flex gap-2">
            <label class="sr-only" [for]="id + '-email'">{{ 'newsletter.email' | translate }}</label>
            <input [id]="id + '-email'" type="email" formControlName="email" autocomplete="email" class="input min-w-0 flex-1"
                   [placeholder]="'newsletter.email' | translate" />
            <button type="submit" class="btn btn-primary shrink-0" [disabled]="form.invalid || busy()">{{ 'newsletter.submit' | translate }}</button>
          </div>
          <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
            <input type="checkbox" formControlName="consent" class="checkbox" />
            <span>{{ 'newsletter.consent' | translate }}</span>
          </label>
          @if (failed()) {
            <p class="text-sm font-semibold text-danger" role="alert">{{ 'newsletter.error' | translate }}</p>
          }
        </form>
      }
    </div>
  `,
})
export class NewsletterSignup {
  private readonly api = inject(CarImportApi);
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  /** Where the form sits (footer, result, ...) - stored with the consent. */
  readonly source = input('footer');
  protected readonly id = 'nl-' + Math.random().toString(36).slice(2, 8);
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly failed = signal(false);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    consent: [false, Validators.requiredTrue],
    website: [''],
  });

  protected submit(): void {
    if (this.form.invalid || this.busy()) {
      return;
    }
    this.busy.set(true);
    this.failed.set(false);
    const v = this.form.getRawValue();
    this.api
      .newsletterSubscribe({ email: v.email.trim(), locale: this.lang.current(), source: this.source(), consent: v.consent, website: v.website })
      .subscribe({
        next: () => {
          this.sent.set(true);
          this.analytics.track('newsletter_signup');
        },
        error: () => {
          this.failed.set(true);
          this.busy.set(false);
        },
      });
  }
}
