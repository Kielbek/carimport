import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { guidePath } from '../../core/routing/guide-paths';
import { pathFor } from '../../core/routing/paths';
import { ArticleText } from '../../shared/article/article-text';
import { VinCta } from '../../shared/vin-cta/vin-cta';
import { CopartFlow } from './copart-flow';
import { CostBar } from './cost-bar';
import { LotCard } from './lot-card';
import { GUIDE_MODELS, MODEL_EXAMPLES } from '../guides/model-data.generated';

/** The car whose door-to-door cost illustrates the guide (priced by the engine for the reader's country). */
const EXAMPLE_MODEL = 'ford-mustang';

/** Buying at Copart from Europe: accounts and brokers, fees, titles, checks, shipping and the full cost. */
@Component({
  selector: 'app-copart-page',
  imports: [RouterLink, TranslatePipe, ArticleText, VinCta, CopartFlow, CostBar, LotCard],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'copart.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'copart.title' | translate }}</h1>
      <p class="lead mt-4">{{ 'copart.lead' | translate }}</p>

      <nav class="mt-8 rounded-[6px] border border-line bg-panel p-5" [attr.aria-label]="'method.toc' | translate">
        <p class="text-sm font-bold">{{ 'method.toc' | translate }}</p>
        <ol class="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          @for (s of sections; track s; let i = $index) {
            <li><a [href]="'#' + s" class="text-fg/80 hover:text-brand-text hover:underline">{{ i + 1 }}. {{ 'copart.' + s + '.title' | translate }}</a></li>
          }
          <li><a href="#faq" class="text-fg/80 hover:text-brand-text hover:underline">{{ sections.length + 1 }}. {{ 'copart.faq.title' | translate }}</a></li>
        </ol>
      </nav>

      @for (s of sections; track s; let i = $index) {
        <section [id]="s" class="mt-12 scroll-mt-24">
          <h2 class="text-xl font-extrabold">{{ i + 1 }}. {{ 'copart.' + s + '.title' | translate }}</h2>
          @if (s === 'what') {
            <app-lot-card />
          }
          <app-article-text [text]="'copart.' + s + '.text' | translate" />
          @if (s === 'account') { <app-copart-flow /> }
          @if (s === 'titles') {
            <p class="mt-3 text-sm"><a [routerLink]="vin()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'copart.titles.link' | translate }}</a></p>
          }
          @if (s === 'inspect') {
            <div class="mt-5"><app-vin-cta placement="copart" /></div>
            <p class="mt-3 text-sm"><a [routerLink]="compare()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'vinPage.compareLink' | translate }}</a></p>
          }
          @if (s === 'shipping') {
            <p class="mt-3 text-sm"><a [routerLink]="usaGuide()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'copart.shipping.link' | translate }}</a></p>
          }
          @if (s === 'cost' && example(); as e) {
            <div class="mt-5 rounded-[6px] border-2 border-brand bg-panel p-5">
              <p class="text-sm">{{ 'copart.cost.example' | translate: e }}</p>
              <p class="mt-2 text-3xl font-extrabold tabular-nums text-brand-text">≈ {{ e.total }}</p>
              <app-cost-bar [example]="e.raw" />
              <div class="mt-4 flex flex-wrap gap-2">
                <a [routerLink]="calculator()" class="btn btn-primary">{{ 'layout.cta' | translate }}</a>
                <a [routerLink]="modelPage()" class="btn btn-outline">{{ 'copart.cost.breakdown' | translate }}</a>
              </div>
            </div>
          }
        </section>
      }

      <section id="faq" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ sections.length + 1 }}. {{ 'copart.faq.title' | translate }}</h2>
        <div class="mt-4 divide-y divide-line border-y border-line">
          @for (n of faq; track n) {
            <details class="group py-4">
              <summary class="cursor-pointer list-none font-bold marker:hidden">
                <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ 'copart.faq.q' + n | translate }}
              </summary>
              <p class="mt-2 leading-relaxed text-fg/85">{{ 'copart.faq.a' + n | translate }}</p>
            </details>
          }
        </div>
      </section>

      <p class="mt-10 text-xs text-muted">{{ 'copart.disclaimer' | translate }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a [routerLink]="calculator()" class="btn btn-primary">{{ 'layout.cta' | translate }}</a>
        <a [routerLink]="vin()" class="btn btn-outline">{{ 'layout.vin' | translate }}</a>
      </div>
    </article>
  `,
})
export class CopartPage {
  private readonly lang = inject(LanguageService);
  protected readonly sections = [
    'what', 'europe', 'account', 'listing', 'bidding', 'fees', 'titles', 'inspect', 'payment', 'shipping', 'repair', 'cost', 'mistakes',
  ];
  protected readonly faq = [7, 1, 2, 3, 4, 5, 6];

  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly vin = computed(() => pathFor('vin', this.lang.current()));
  protected readonly compare = computed(() => pathFor('vinCompare', this.lang.current()));
  protected readonly usaGuide = computed(() => guidePath({ section: 'origins', item: 'USA' }, this.lang.current()));
  protected readonly modelPage = computed(() => guidePath({ section: 'models', item: EXAMPLE_MODEL }, this.lang.current()));
  protected readonly countryName = computed(
    () => new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(this.lang.info().country) ?? '',
  );

  /** The engine's door-to-door total for the example car in the reader's country. */
  protected readonly example = computed(() => {
    const e = MODEL_EXAMPLES[EXAMPLE_MODEL]?.[this.lang.info().country];
    const m = GUIDE_MODELS.find((x) => x.id === EXAMPLE_MODEL);
    if (!e || !m) {
      return null;
    }
    const money = (amount: number, currency: string) =>
      new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
    return {
      model: `${m.make} ${m.model} (${m.year})`,
      price: money(m.price, 'USD'),
      country: this.countryName(),
      total: money(e.total, e.currency),
      raw: e,
    };
  });
}
