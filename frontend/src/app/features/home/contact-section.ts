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
    <section id="contact" class="site pb-4 pt-6">
      <div class="theme-dark grid gap-12 rounded-[4px] bg-panel p-8 text-fg sm:p-[30px] lg:grid-cols-[1fr_1fr] lg:p-[50px]">
        <div>
          <p class="eyebrow !text-[18px]">{{ 'home.contact.eyebrow' | translate }}</p>
          <h2 class="h-section mt-6"><span class="text-brand">{{ 'home.contact.title1' | translate }}</span> {{ 'home.contact.title2' | translate }}</h2>
          <p class="mt-8 font-bold">{{ 'home.contact.lead' | translate }}</p>
          <ul class="mt-6 space-y-3 text-sm text-fg/80">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex gap-3"><app-icon name="check" [size]="18" class="text-brand" />{{ 'home.contact.b' + n | translate }}</li>
            }
          </ul>
        </div>

        @if (sent()) {
          <div class="flex flex-col items-start justify-center" animate.enter="reveal-enter">
            <span class="grid size-14 place-items-center rounded-full bg-brand text-brand-ink"><app-icon name="check" [size]="28" [stroke]="2.5" /></span>
            <h3 class="mt-6 text-2xl font-extrabold">{{ 'lead.thanks' | translate }}</h3>
            <p class="mt-2 text-fg/80">{{ 'lead.thanksHint' | translate }}</p>
          </div>
        } @else {
          <form class="grid gap-x-8 gap-y-6 sm:grid-cols-2" [formGroup]="form" (ngSubmit)="submit()">
            <input class="input-line" formControlName="name" autocomplete="name" [placeholder]="'home.contact.name' | translate" [attr.aria-label]="'home.contact.name' | translate" />
            <input class="input-line" type="tel" formControlName="phone" autocomplete="tel" [placeholder]="'home.contact.phone' | translate" [attr.aria-label]="'home.contact.phone' | translate" />
            <input class="input-line" type="email" formControlName="email" autocomplete="email" [placeholder]="'home.contact.email' | translate" [attr.aria-label]="'home.contact.email' | translate" />
            <select class="input-line cursor-pointer" formControlName="originCountry" [attr.aria-label]="'home.contact.origin' | translate">
              @for (o of origins; track o) { <option [value]="o" class="bg-panel">{{ 'origin.' + o | translate }}</option> }
            </select>
            <input class="input-line sm:col-span-2" formControlName="message" [placeholder]="'home.contact.question' | translate" [attr.aria-label]="'home.contact.question' | translate" />
            <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <label class="mt-2 flex cursor-pointer items-start gap-3 text-[12px] leading-snug text-fg/80 sm:col-span-2">
              <input type="checkbox" class="checkbox" formControlName="consentDataTransfer" />
              <span>{{ 'lead.consentTransfer' | translate }} <a [routerLink]="privacy()" class="underline underline-offset-2">{{ 'footer.privacy' | translate }}</a></span>
            </label>
            @if (error()) { <p class="text-sm text-danger sm:col-span-2">{{ 'home.contact.error' | translate }}</p> }
            <button type="submit" class="btn btn-primary w-full font-semibold sm:col-span-2" [disabled]="form.invalid || busy()">{{ 'home.contact.submit' | translate }}</button>
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
