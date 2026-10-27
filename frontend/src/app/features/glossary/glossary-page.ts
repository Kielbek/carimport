import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { GLOSSARY_TERMS } from './glossary-terms';

/** Car-import terms explained in a sentence or two - a search entry point that leads on to the calculator. */
@Component({
  selector: 'app-glossary-page',
  imports: [RouterLink, TranslatePipe],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'glossary.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'glossary.title' | translate }}</h1>
      <p class="lead mt-4">{{ 'glossary.lead' | translate }}</p>

      <nav class="mt-8 flex flex-wrap gap-2" [attr.aria-label]="'glossary.eyebrow' | translate">
        @for (id of terms; track id) {
          <a [href]="here() + '#' + id" class="chip !py-1.5 text-sm">{{ 'glossary.terms.' + id + '.name' | translate }}</a>
        }
      </nav>

      <dl class="mt-10 divide-y divide-line border-y border-line">
        @for (id of terms; track id) {
          <div [id]="id" class="scroll-mt-24 py-6">
            <dt class="text-lg font-extrabold">{{ 'glossary.terms.' + id + '.name' | translate }}</dt>
            <dd class="mt-2 leading-relaxed text-fg/85">{{ 'glossary.terms.' + id + '.text' | translate }}</dd>
          </div>
        }
      </dl>

      <div class="mt-12 flex flex-wrap gap-3">
        <a [routerLink]="calculator()" class="btn btn-primary">{{ 'glossary.cta' | translate }}</a>
        <a [routerLink]="method()" class="btn btn-outline">{{ 'layout.method' | translate }}</a>
      </div>
    </article>
  `,
})
export class GlossaryPage {
  private readonly lang = inject(LanguageService);
  protected readonly terms = GLOSSARY_TERMS;
  protected readonly here = computed(() => pathFor('glossary', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly method = computed(() => pathFor('method', this.lang.current()));
}
