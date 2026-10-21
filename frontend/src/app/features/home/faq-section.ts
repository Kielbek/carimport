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
    <section id="faq" class="border-t border-line py-20">
      <div class="site">
        <p class="text-[17px] uppercase tracking-[0.02em]">{{ 'faq.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5">{{ 'faq.title' | translate }}</h2>
        <div class="mx-auto mt-10 max-w-[850px]">
          @for (i of items; track i) {
            <details class="faq-item border-b border-line last:border-brand/70" [open]="i === 1 && openFirst()">
              <summary>
                <h3>{{ 'faq.q' + i + '.q' | translate }}</h3>
                <app-icon name="chevron-down" [size]="24" [stroke]="1.5" class="faq-chevron shrink-0 text-brand-text transition duration-200" />
              </summary>
              <p class="px-5 pb-7 pr-14 text-[15px] leading-relaxed text-fg/80">{{ 'faq.q' + i + '.a' | translate }}</p>
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
