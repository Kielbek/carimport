import { Component, PendingTasks, effect, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { GuideOrigin } from './guide-data.generated';
import { ORIGIN_DEEP_LOADERS } from './origin-content';
import { DeepSection, ORIGIN_DEEP_REVIEWED } from './origin-content/types';

/**
 * The in-depth half of an origin guide: a table of contents and chapters on the market, buying, checking the car,
 * export and shipping, duty and origin, EU adaptation and common mistakes. The text of each language is a separate
 * chunk; the prerenderer waits for it (PendingTasks), so crawlers get the full article as static HTML.
 */
@Component({
  selector: 'app-origin-deep-guide',
  imports: [TranslatePipe],
  host: { class: 'block' },
  template: `
    @if (sections().length) {
      <section class="mt-16 border-t border-line pt-12">
        <h2 class="h-section !text-[clamp(1.6rem,3.2vw,2.2rem)]">{{ 'guide.origin.common.deepTitle' | translate: { from: ('guide.model.from.' + origin() | translate) } }}</h2>
        <p class="mt-2 text-sm text-muted">{{ 'guide.origin.common.deepReviewed' | translate: { date: reviewed } }}</p>

        <nav class="mt-6 rounded-[6px] border border-line bg-panel p-5" [attr.aria-label]="'guide.origin.common.deepToc' | translate">
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">{{ 'guide.origin.common.deepToc' | translate }}</p>
          <ol class="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            @for (s of sections(); track s.id; let i = $index) {
              <li><a [href]="'#' + s.id" class="flex gap-2.5 hover:text-brand-text"><span class="w-5 shrink-0 text-right font-bold tabular-nums text-brand-text">{{ i + 1 }}.</span>{{ s.title }}</a></li>
            }
          </ol>
        </nav>

        <div class="mt-10 max-w-3xl space-y-12">
          @for (s of sections(); track s.id; let i = $index) {
            <article [id]="s.id" class="scroll-mt-28">
              <h3 class="flex items-baseline gap-3 text-xl font-extrabold sm:text-2xl">
                <span class="text-base font-extrabold tabular-nums text-brand-text">{{ i + 1 }}.</span>{{ s.title }}
              </h3>
              <div class="mt-4 space-y-4 leading-relaxed text-fg/90">
                @for (p of s.paras; track $index) {
                  @if (isList(p)) {
                    <ul class="space-y-2.5">
                      @for (item of p; track $index) {
                        <li class="flex gap-3"><span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"></span><span>{{ item }}</span></li>
                      }
                    </ul>
                  } @else {
                    <p>{{ p }}</p>
                  }
                }
              </div>
            </article>
          }
        </div>
      </section>
    }
  `,
})
export class OriginDeepGuide {
  readonly origin = input.required<GuideOrigin>();

  private readonly lang = inject(LanguageService);
  private readonly pending = inject(PendingTasks);
  protected readonly sections = signal<DeepSection[]>([]);
  /** Review month in the reader's language, e.g. "październik 2026". */
  protected get reviewed(): string {
    return new Intl.DateTimeFormat(this.lang.locale(), { month: 'long', year: 'numeric' }).format(new Date(`${ORIGIN_DEEP_REVIEWED}-15`));
  }

  constructor() {
    effect(() => {
      const origin = this.origin();
      const load = ORIGIN_DEEP_LOADERS[this.lang.current()];
      if (!load) {
        this.sections.set([]);
        return;
      }
      const done = this.pending.add();
      load()
        .then((all) => this.sections.set(all[origin] ?? []))
        .finally(done);
    });
  }

  protected isList(p: string | string[]): p is string[] {
    return Array.isArray(p);
  }
}
