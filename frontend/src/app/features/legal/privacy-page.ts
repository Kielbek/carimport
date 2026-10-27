import { Component, computed, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { SITE, contactEmail } from '../../core/site.config';

/** Privacy policy (GDPR information clause). Text lives in the translation files; legal review required before launch. */
@Component({
  selector: 'app-privacy-page',
  imports: [TranslatePipe],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'privacy.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'privacy.title' | translate }}</h1>
      @for (n of sections; track n) {
        <section class="mt-10">
          <h2 class="text-xl font-extrabold">{{ 'privacy.s' + n + '.title' | translate }}</h2>
          <p class="mt-3 leading-relaxed text-muted">{{ 'privacy.s' + n + '.text' | translate: { email: email(), seller: seller() } }}</p>
        </section>
      }
    </article>
  `,
})
export class PrivacyPage {
  protected readonly sections = [1, 2, 3, 4, 5, 6, 7];
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);
  protected readonly email = computed(() => contactEmail(this.lang.current()));

  /** The controller: name and address of the seller (tax ID only when there is one). */
  protected seller(): string {
    this.lang.current();
    const c = SITE.company;
    const tax = c.taxId ? `${this.translate.instant('terms.taxIdLabel')} ${c.taxId}` : '';
    return [c.name, c.address, tax].filter(Boolean).join(', ');
  }
}
