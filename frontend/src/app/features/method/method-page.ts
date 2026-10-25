import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { SITE } from '../../core/site.config';

/** How the calculation works: sources, assumptions and limits - the trust page for search and for buyers. */
@Component({
  selector: 'app-method-page',
  imports: [RouterLink, TranslatePipe],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'method.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'method.title' | translate }}</h1>
      <p class="lead mt-4">{{ 'method.lead' | translate }}</p>
      <p class="mt-3 text-sm text-muted">{{ 'method.updated' | translate: { date: reviewed } }}</p>
      @for (n of sections; track n) {
        <section class="mt-10">
          <h2 class="text-xl font-extrabold">{{ n }}. {{ 'method.s' + n + '.title' | translate }}</h2>
          @for (p of paragraphs('method.s' + n + '.text' | translate: { email: email }); track $index) {
            <p class="mt-3 leading-relaxed text-fg/85">{{ p }}</p>
          }
        </section>
      }
      <div class="mt-12 flex flex-wrap gap-3">
        <a [routerLink]="calculator()" class="btn btn-primary">{{ 'layout.cta' | translate }}</a>
        <a [routerLink]="taxes()" class="btn btn-outline">{{ 'layout.taxes' | translate }}</a>
      </div>
    </article>
  `,
})
export class MethodPage {
  private readonly lang = inject(LanguageService);
  protected readonly sections = [1, 2, 3, 4, 5, 6, 7];
  protected readonly email = SITE.email;
  protected readonly reviewed = SITE.ratesReviewed;
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly taxes = computed(() => pathFor('taxes', this.lang.current()));

  protected paragraphs(text: string): string[] {
    return text.split('\n').filter((p) => p.trim());
  }
}
