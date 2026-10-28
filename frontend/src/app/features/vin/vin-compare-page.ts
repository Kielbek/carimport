import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { ArticleText } from '../../shared/article/article-text';
import { Icon } from '../../shared/icon/icon';
import { VIN_PROVIDERS, VIN_PROVIDERS_CHECKED, VinProvider } from './vin-providers';

/** Vehicle history report providers side by side: coverage, US titles, photos, price, who each one suits. */
@Component({
  selector: 'app-vin-compare-page',
  imports: [RouterLink, TranslatePipe, ArticleText, Icon],
  template: `
    <article class="site max-w-4xl py-16">
      <p class="eyebrow">{{ 'vinCompare.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4 max-w-3xl">{{ 'vinCompare.title' | translate }}</h1>
      <p class="lead mt-4 max-w-3xl">{{ 'vinCompare.lead' | translate }}</p>
      <p class="mt-3 text-sm text-muted">{{ 'vinCompare.checked' | translate: { date: checked() } }}</p>

      <!-- quick verdict -->
      <section class="mt-8 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
        @for (v of verdicts; track v) {
          <div class="rounded-[6px] border-2 border-brand bg-panel p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-brand-text">{{ 'vinCompare.verdict.' + v + '.for' | translate }}</p>
            <p class="mt-1 font-extrabold">{{ 'vinCompare.verdict.' + v + '.pick' | translate }}</p>
            <p class="mt-1 text-sm text-fg/80">{{ 'vinCompare.verdict.' + v + '.why' | translate }}</p>
          </div>
        }
      </section>

      <!-- comparison table -->
      <section id="table" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinCompare.table.title' | translate }}</h2>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full min-w-[40rem] text-sm">
            <thead>
              <tr class="border-b-2 border-fg/80 text-left text-xs uppercase tracking-wide text-muted">
                <th scope="col" class="py-2 font-semibold">{{ 'vinCompare.table.service' | translate }}</th>
                <th scope="col" class="py-2 font-semibold">{{ 'vinCompare.table.regions' | translate }}</th>
                <th scope="col" class="py-2 font-semibold">{{ 'vinCompare.table.usTitles' | translate }}</th>
                <th scope="col" class="py-2 font-semibold">{{ 'vinCompare.table.photos' | translate }}</th>
                <th scope="col" class="py-2 text-right font-semibold">{{ 'vinCompare.table.price' | translate }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-line">
              @for (p of providers; track p.id) {
                <tr>
                  <th scope="row" class="py-2.5 pr-3 text-left"><a [href]="'#' + p.id" class="font-bold hover:text-brand-text hover:underline">{{ p.name }}</a></th>
                  <td class="py-2.5 pr-3">{{ regions(p) }}</td>
                  <td class="py-2.5 pr-3">{{ 'vinCompare.value.' + p.usTitles | translate }}</td>
                  <td class="py-2.5 pr-3">{{ 'vinCompare.value.' + p.photos | translate }}</td>
                  <td class="py-2.5 text-right tabular-nums">{{ p.price }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-xs text-muted">{{ 'vinCompare.table.note' | translate }}</p>
      </section>

      <!-- each provider -->
      <section id="providers" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinCompare.providers' | translate }}</h2>
        <div class="mt-4 space-y-4">
          @for (p of providers; track p.id) {
            <div [id]="p.id" class="scroll-mt-24 rounded-[8px] border border-line bg-panel p-5 sm:p-6">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-extrabold">{{ p.name }}</h3>
                  <p class="text-sm text-muted">{{ regions(p) }} · {{ p.price }}</p>
                </div>
                <a [href]="p.affiliateUrl ?? p.url" target="_blank" [attr.rel]="p.affiliateUrl ? 'sponsored nofollow noopener' : 'noopener'"
                   class="btn btn-outline" (click)="clicked(p)">
                  {{ 'vinCompare.visit' | translate: { name: p.name } }} <app-icon name="external-link" [size]="16" />
                </a>
              </div>
              <p class="mt-3 leading-relaxed text-fg/85">{{ 'vinCompare.p.' + p.id + '.desc' | translate }}</p>
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wide text-muted">{{ 'vinCompare.pros' | translate }}</p>
                  <app-article-text [text]="'vinCompare.p.' + p.id + '.pros' | translate" />
                </div>
                <div>
                  <p class="text-xs font-bold uppercase tracking-wide text-muted">{{ 'vinCompare.cons' | translate }}</p>
                  <app-article-text [text]="'vinCompare.p.' + p.id + '.cons' | translate" />
                </div>
              </div>
              <p class="mt-4 rounded-[4px] bg-brand/10 p-3 text-sm"><span class="font-bold">{{ 'vinCompare.bestFor' | translate }}</span> {{ 'vinCompare.p.' + p.id + '.best' | translate }}</p>
              @if (p.affiliateUrl) { <p class="mt-2 text-[11px] text-muted">{{ 'vinCta.label' | translate }}</p> }
            </div>
          }
        </div>
      </section>

      @for (s of sections; track s) {
        <section [id]="s" class="mt-12 max-w-3xl scroll-mt-24">
          <h2 class="text-xl font-extrabold">{{ 'vinCompare.' + s + '.title' | translate }}</h2>
          <app-article-text [text]="'vinCompare.' + s + '.text' | translate" />
        </section>
      }

      <section id="faq" class="mt-12 max-w-3xl scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinCompare.faq.title' | translate }}</h2>
        <div class="mt-4 divide-y divide-line border-y border-line">
          @for (n of faq; track n) {
            <details class="group py-4">
              <summary class="cursor-pointer list-none font-bold marker:hidden">
                <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ 'vinCompare.faq.q' + n | translate }}
              </summary>
              <p class="mt-2 leading-relaxed text-fg/85">{{ 'vinCompare.faq.a' + n | translate }}</p>
            </details>
          }
        </div>
      </section>

      <p class="mt-10 max-w-3xl text-xs text-muted">{{ 'vinCompare.disclaimer' | translate }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a [routerLink]="vin()" class="btn btn-primary">{{ 'vinCompare.decoder' | translate }}</a>
        <a [routerLink]="calculator()" class="btn btn-outline">{{ 'layout.cta' | translate }}</a>
      </div>
    </article>
  `,
})
export class VinComparePage {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  private readonly translate = inject(TranslateService);
  protected readonly providers = VIN_PROVIDERS;
  protected readonly verdicts = ['us', 'eu', 'budget'];
  protected readonly sections = ['how', 'free', 'read', 'choose'];
  protected readonly faq = [1, 2, 3, 4, 5, 6];
  protected readonly vin = computed(() => pathFor('vin', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly checked = computed(() =>
    new Intl.DateTimeFormat(this.lang.locale(), { month: 'long', year: 'numeric' }).format(new Date(VIN_PROVIDERS_CHECKED + '-15T12:00:00Z')),
  );

  protected regions(p: VinProvider): string {
    const names = new Intl.DisplayNames([this.lang.locale()], { type: 'region' });
    return p.regions.map((r) => (r === 'EU' ? (this.translate.instant('vinCompare.eu') as string) : (names.of(r) ?? r))).join(', ');
  }

  protected clicked(p: VinProvider): void {
    this.analytics.track('vin_partner_click', { placement: 'compare', partner: p.name, affiliate: p.affiliateUrl ? 1 : 0 });
  }
}
