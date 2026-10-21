import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { Icon } from '../../shared/icon/icon';

/** "Describe the car you want" - becomes a B2B lead routed to a verified import partner (POST /api/v1/leads). */
@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, Icon],
  template: `
    <section id="contact" class="site pt-20">
      <div class="card grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p class="eyebrow">{{ 'home.contact.eyebrow' | translate }}</p>
          <h2 class="h-section mt-4"><span class="text-brand-text">{{ 'home.contact.title1' | translate }}</span> {{ 'home.contact.title2' | translate }}</h2>
          <p class="mt-5 font-semibold">{{ 'home.contact.lead' | translate }}</p>
          <ul class="mt-6 space-y-3 text-sm text-muted">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex gap-3"><app-icon name="check-circle" [size]="18" class="text-success" />{{ 'home.contact.b' + n | translate }}</li>
            }
          </ul>
        </div>

        @if (sent()) {
          <div class="flex flex-col items-center justify-center text-center" animate.enter="reveal-enter">
            <span class="grid size-14 place-items-center rounded-full bg-success text-white"><app-icon name="check" [size]="28" [stroke]="2.5" /></span>
            <h3 class="mt-5 text-xl font-extrabold">{{ 'lead.thanks' | translate }}</h3>
            <p class="mt-2 text-sm text-muted">{{ 'lead.thanksHint' | translate }}</p>
          </div>
        } @else {
          <form class="grid gap-x-6 gap-y-5 sm:grid-cols-2" [formGroup]="form" (ngSubmit)="submit()">
            <div><label class="label" for="c-name">{{ 'lead.name' | translate }}</label><input id="c-name" class="input" formControlName="name" autocomplete="name" /></div>
            <div><label class="label" for="c-phone">{{ 'lead.phone' | translate }}</label><input id="c-phone" type="tel" class="input" formControlName="phone" autocomplete="tel" /></div>
            <div><label class="label" for="c-email">{{ 'lead.email' | translate }}</label><input id="c-email" type="email" class="input" formControlName="email" autocomplete="email" /></div>
            <div>
              <label class="label" for="c-origin">{{ 'home.contact.origin' | translate }}</label>
              <select id="c-origin" class="input" formControlName="originCountry">
                @for (o of origins; track o) { <option [value]="o">{{ 'origin.' + o | translate }}</option> }
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="label" for="c-msg">{{ 'home.contact.message' | translate }}</label>
              <textarea id="c-msg" class="input min-h-28" formControlName="message" [placeholder]="'home.contact.placeholder' | translate"></textarea>
            </div>
            <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <label class="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted sm:col-span-2">
              <input type="checkbox" class="checkbox" formControlName="consentDataTransfer" />
              <span>{{ 'lead.consentTransfer' | translate }} <a [routerLink]="privacy()" class="text-accent-text underline">{{ 'footer.privacy' | translate }}</a></span>
            </label>
            @if (error()) { <p class="text-sm text-danger sm:col-span-2">{{ 'home.contact.error' | translate }}</p> }
            <button type="submit" class="btn btn-primary sm:col-span-2" [disabled]="form.invalid || busy()">
              {{ 'home.contact.submit' | translate }} <app-icon name="arrow-right" [size]="18" />
            </button>
          </form>
        }
      </div>
    </section>
  `,
})
export class ContactSection {
  private readonly api = inject(CarImportApi);
  private readonly lang = inject(LanguageService);
  protected readonly origins = ['USA', 'CANADA', 'JAPAN', 'UAE', 'UK'];
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal(false);
  protected readonly privacy = () => pathFor('privacy', this.lang.current());

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    phone: ['', Validators.pattern(/^\+?[0-9 ()-]{6,20}$/)],
    email: ['', [Validators.required, Validators.email]],
    originCountry: ['USA'],
    message: ['', Validators.maxLength(2000)],
    website: [''],
    consentDataTransfer: [false, Validators.requiredTrue],
  });

  protected submit(): void {
    this.busy.set(true);
    this.error.set(false);
    const v = this.form.getRawValue();
    this.api
      .submitLead({
        ...v,
        phone: v.phone || null,
        destinationCountry: this.lang.current() === 'de' ? 'DE' : 'PL',
        consentMarketing: false,
      })
      .subscribe({
        next: () => this.sent.set(true),
        error: () => {
          this.busy.set(false);
          this.error.set(true);
        },
      });
  }
}
