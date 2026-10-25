import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { SITE } from '../../core/site.config';

/**
 * Terms of service for the free calculator and the paid report (consumer sale of digital content). Text lives in the
 * translation files, the seller's details in SITE.company. Legal review required before launch.
 */
@Component({
  selector: 'app-terms-page',
  imports: [RouterLink, TranslatePipe],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'terms.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'terms.title' | translate }}</h1>
      <p class="mt-4 text-sm text-muted">{{ 'terms.version' | translate: params() }}</p>
      @for (n of sections; track n) {
        <section class="mt-10" [id]="'s' + n">
          <h2 class="text-xl font-extrabold">{{ n }}. {{ 'terms.s' + n + '.title' | translate }}</h2>
          @for (p of paragraphs('terms.s' + n + '.text' | translate: params()); track $index) {
            <p class="mt-3 leading-relaxed text-fg/85">{{ p }}</p>
          }
        </section>
      }
      <p class="mt-12 text-sm text-muted">
        <a [routerLink]="privacy()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'footer.privacy' | translate }}</a>
      </p>
    </article>
  `,
})
export class TermsPage {
  private readonly lang = inject(LanguageService);
  protected readonly sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));
  private readonly translate = inject(TranslateService);
  /** "Name, address[, tax ID …][, registry]" - the optional parts only when filled in. */
  protected readonly params = computed(() => {
    this.lang.current();
    const c = SITE.company;
    const tax = c.taxId ? `${this.translate.instant('terms.taxIdLabel')} ${c.taxId}` : '';
    return {
      seller: [c.name, c.address, tax, c.registry].filter(Boolean).join(', '),
      email: SITE.email,
      site: SITE.url.replace('https://', ''),
      version: SITE.termsVersion,
    };
  });

  /** Each line of a section is its own paragraph. */
  protected paragraphs(text: string): string[] {
    return text.split('\n').filter((p) => p.trim());
  }
}
