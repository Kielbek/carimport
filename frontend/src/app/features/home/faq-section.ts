import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FAQ_COUNT } from '../../core/seo/seo.service';
import { Icon } from '../../shared/icon/icon';

/**
 * FAQ as native <details>: accessible, works without JavaScript and the answers are in the prerendered HTML (the same
 * texts feed the FAQPage JSON-LD in SeoService).
 */
@Component({
  selector: 'app-faq-section',
  imports: [TranslatePipe, Icon],
  template: `
    <section id="faq" class="site py-20">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p class="eyebrow">{{ 'faq.eyebrow' | translate }}</p>
          <h2 class="h-section mt-4">{{ 'faq.title' | translate }}</h2>
          <p class="lead mt-4 max-w-md">{{ 'faq.lead' | translate }}</p>
        </div>
        <div class="divide-y divide-line border-y border-line">
          @for (i of items; track i) {
            <details class="faq-item group" [open]="i === 1 && openFirst()">
              <summary>
                <h3 class="text-[17px] font-semibold">{{ 'faq.q' + i + '.q' | translate }}</h3>
                <app-icon name="chevron-down" class="faq-chevron text-muted transition duration-200" />
              </summary>
              <p class="pb-6 pr-10 leading-relaxed text-muted">{{ 'faq.q' + i + '.a' | translate }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  readonly openFirst = input(true);
  protected readonly items = Array.from({ length: FAQ_COUNT }, (_, i) => i + 1);
}
