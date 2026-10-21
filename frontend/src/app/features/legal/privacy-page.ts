import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE } from '../../core/site.config';

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
          <p class="mt-3 leading-relaxed text-muted">{{ 'privacy.s' + n + '.text' | translate: { email: email } }}</p>
        </section>
      }
    </article>
  `,
})
export class PrivacyPage {
  protected readonly sections = [1, 2, 3, 4, 5, 6];
  protected readonly email = SITE.email;
}
