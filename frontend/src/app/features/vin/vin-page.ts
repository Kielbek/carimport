import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VinDecoding } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CountryNamePipe } from '../../core/format/country-name.pipe';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { ArticleText } from '../../shared/article/article-text';
import { Icon } from '../../shared/icon/icon';
import { VinCta } from '../../shared/vin-cta/vin-cta';
import { VinAnatomy } from './vin-anatomy';

/** First VIN character → country of manufacture (ISO 3779 regions most seen in imports to the EU). */
const FIRST_CHAR: readonly [string, string[]][] = [
  ['1, 4, 5', ['US']],
  ['2', ['CA']],
  ['3', ['MX']],
  ['J', ['JP']],
  ['K', ['KR']],
  ['L', ['CN']],
  ['S', ['GB']],
  ['W', ['DE']],
  ['V', ['FR', 'ES']],
  ['Z', ['IT']],
  ['Y', ['SE', 'FI']],
];

/** 10th VIN character → model year (the code repeats every 30 years). */
const YEARS: readonly [string, number][] = [
  ['F', 2015], ['G', 2016], ['H', 2017], ['J', 2018], ['K', 2019], ['L', 2020], ['M', 2021],
  ['N', 2022], ['P', 2023], ['R', 2024], ['S', 2025], ['T', 2026], ['V', 2027],
];

/** Countries whose cars can enter the EU at 0% duty with proof of origin. */
const PREFERENTIAL = ['US', 'CA', 'JP', 'GB'];

const FREE_SOURCES: readonly { key: string; name: string; url: string }[] = [
  { key: 'nicb', name: 'NICB VINCheck', url: 'https://www.nicb.org/vincheck' },
  { key: 'nhtsa', name: 'NHTSA Recalls', url: 'https://www.nhtsa.gov/recalls' },
  { key: 'nmvtis', name: 'NMVTIS', url: 'https://vehiclehistory.bja.ojp.gov' },
  { key: 'mot', name: 'GOV.UK – MOT history', url: 'https://www.gov.uk/check-mot-history' },
];

/** VIN decoder and history-check guide: a free tool (our NHTSA/EPA lookup) plus how to read and check a VIN. */
@Component({
  selector: 'app-vin-page',
  imports: [RouterLink, TranslatePipe, CountryNamePipe, ArticleText, Icon, VinCta, VinAnatomy],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'vinPage.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'vinPage.title' | translate }}</h1>
      <p class="lead mt-4">{{ 'vinPage.lead' | translate }}</p>

      <!-- the free decoder -->
      <section class="mt-8 rounded-[8px] border-2 border-brand bg-panel p-5 sm:p-6">
        <h2 class="text-lg font-extrabold">{{ 'vinPage.tool.title' | translate }}</h2>
        <p class="mt-1 text-sm text-fg/80">{{ 'vinPage.tool.lead' | translate }}</p>
        <form class="mt-4 flex flex-col gap-2 sm:flex-row" (submit)="$event.preventDefault(); decode(vinInput.value)">
          <label class="sr-only" for="vin-check">VIN</label>
          <input #vinInput id="vin-check" class="input font-mono uppercase tracking-wider" maxlength="20" autocomplete="off"
                 spellcheck="false" [placeholder]="'vin.placeholder' | translate" />
          <button type="submit" class="btn btn-primary shrink-0" [disabled]="loading()">
            @if (loading()) { <app-icon name="loader" [size]="18" class="animate-spin" /> } @else { <app-icon name="search" [size]="18" /> }
            {{ 'vinPage.tool.button' | translate }}
          </button>
        </form>
        @if (error(); as err) {
          <p class="mt-3 text-sm font-semibold text-red-600 dark:text-red-400" role="alert">{{ err | translate }}</p>
        }
        @if (result(); as d) {
          <div class="mt-5 rounded-[6px] border border-line bg-bg p-4" aria-live="polite">
            <p class="font-mono text-xs text-muted">{{ d.vin }}</p>
            <p class="mt-1 text-lg font-extrabold">{{ title(d) }}</p>
            <dl class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              @if (d.modelYear) { <div><dt class="text-xs text-muted">{{ 'vinPage.tool.year' | translate }}</dt><dd class="font-semibold">{{ d.modelYear }}</dd></div> }
              @if (d.manufacturedIn) { <div><dt class="text-xs text-muted">{{ 'vin.madeIn' | translate }}</dt><dd class="font-semibold">{{ d.manufacturedIn | countryName: lang.locale() }}</dd></div> }
              @if (d.engineCc) { <div><dt class="text-xs text-muted">{{ 'vinPage.tool.engine' | translate }}</dt><dd class="font-semibold">{{ d.engineCc }} cm³{{ d.cylinders ? ' · ' + d.cylinders + ' cyl.' : '' }}</dd></div> }
              @if (d.powerKw) { <div><dt class="text-xs text-muted">{{ 'vinPage.tool.power' | translate }}</dt><dd class="font-semibold">{{ d.powerKw }} kW</dd></div> }
              @if (d.fuelType) { <div><dt class="text-xs text-muted">{{ 'vinPage.tool.fuel' | translate }}</dt><dd class="font-semibold">{{ 'fuel.' + d.fuelType | translate }}</dd></div> }
              @if (d.bodyClass) { <div><dt class="text-xs text-muted">{{ 'vinPage.tool.body' | translate }}</dt><dd class="font-semibold">{{ d.bodyClass }}</dd></div> }
              <div><dt class="text-xs text-muted">{{ 'vinPage.tool.check' | translate }}</dt>
                <dd class="font-semibold">{{ (d.checkDigitValid ? 'vinPage.tool.checkOk' : 'vinPage.tool.checkBad') | translate }}</dd></div>
            </dl>
            @if (preferential(); as c) {
              <p class="mt-4 flex items-start gap-2 rounded-[4px] bg-brand/10 p-3 text-sm">
                <app-icon name="info" [size]="16" class="mt-0.5 shrink-0 text-brand-text" />
                <span>{{ 'vinPage.tool.duty' | translate: { country: (c | countryName: lang.locale()) } }}
                  <a [routerLink]="method()" fragment="duty" class="font-semibold underline underline-offset-2">{{ 'vinPage.tool.dutyMore' | translate }}</a></span>
              </p>
            }
            @for (w of d.warnings; track w) {
              <p class="mt-2 flex items-start gap-2 text-xs text-fg/85"><app-icon name="warning" [size]="14" class="mt-0.5 shrink-0 text-brand-text" /> {{ 'vin.w.' + w.replace('vin.', '') | translate }}</p>
            }
            <div class="mt-4 flex flex-wrap gap-2">
              <a [routerLink]="calculator()" class="btn btn-outline">{{ 'vinPage.tool.calculate' | translate }}</a>
            </div>
          </div>
          <div class="mt-4"><app-vin-cta [vin]="d.vin" placement="vin_tool" /></div>
        }
        <p class="mt-3 text-xs text-muted">{{ 'vinPage.tool.note' | translate }}</p>
      </section>

      <section id="what" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinPage.what.title' | translate }}</h2>
        <app-article-text [text]="'vinPage.what.text' | translate" />
      </section>

      <section id="read" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinPage.read.title' | translate }}</h2>
        <app-article-text [text]="'vinPage.read.text' | translate" />
        <app-vin-anatomy />
        <table class="mt-5 w-full text-sm">
          <tbody class="divide-y divide-line border-y border-line">
            @for (r of positions; track r[0]) {
              <tr><th scope="row" class="w-24 py-2 pr-3 text-left font-mono font-bold">{{ r[0] }}</th><td class="py-2">{{ 'vinPage.read.' + r[1] | translate }}</td></tr>
            }
          </tbody>
        </table>
        <div class="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 class="font-bold">{{ 'vinPage.read.countryTitle' | translate }}</h3>
            <table class="mt-3 w-full text-sm">
              <tbody class="divide-y divide-line border-y border-line">
                @for (c of firstChars; track c[0]) {
                  <tr><th scope="row" class="w-20 py-1.5 pr-3 text-left font-mono font-bold">{{ c[0] }}</th>
                    <td class="py-1.5">{{ countries(c[1]) }}</td></tr>
                }
              </tbody>
            </table>
          </div>
          <div>
            <h3 class="font-bold">{{ 'vinPage.read.yearTitle' | translate }}</h3>
            <table class="mt-3 w-full text-sm">
              <tbody class="divide-y divide-line border-y border-line">
                @for (y of years; track y[0]) {
                  <tr><th scope="row" class="w-20 py-1.5 pr-3 text-left font-mono font-bold">{{ y[0] }}</th><td class="py-1.5 tabular-nums">{{ y[1] }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

      @for (s of sections; track s) {
        <section [id]="s" class="mt-12 scroll-mt-24">
          <h2 class="text-xl font-extrabold">{{ 'vinPage.' + s + '.title' | translate }}</h2>
          <app-article-text [text]="'vinPage.' + s + '.text' | translate" />
          @if (s === 'report') {
            <div class="mt-5"><app-vin-cta placement="vin_page" /></div>
            <p class="mt-3 text-sm"><a [routerLink]="compare()" class="font-semibold text-brand-text underline underline-offset-2">{{ 'vinPage.compareLink' | translate }}</a></p>
          }
          @if (s === 'free') {
            <ul class="mt-4 space-y-3">
              @for (f of freeSources; track f.key) {
                <li class="rounded-[6px] border border-line p-4">
                  <a [href]="f.url" target="_blank" rel="noopener" class="font-bold underline underline-offset-2 hover:text-brand-text">{{ f.name }}</a>
                  <p class="mt-1 text-sm text-fg/80">{{ 'vinPage.free.' + f.key | translate }}</p>
                </li>
              }
            </ul>
          }
        </section>
      }

      <section id="faq" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ 'vinPage.faq.title' | translate }}</h2>
        <div class="mt-4 divide-y divide-line border-y border-line">
          @for (n of faq; track n) {
            <details class="group py-4">
              <summary class="cursor-pointer list-none font-bold marker:hidden">
                <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ 'vinPage.faq.q' + n | translate }}
              </summary>
              <p class="mt-2 leading-relaxed text-fg/85">{{ 'vinPage.faq.a' + n | translate }}</p>
            </details>
          }
        </div>
      </section>

      <div class="mt-12 flex flex-wrap gap-3">
        <a [routerLink]="calculator()" class="btn btn-primary">{{ 'layout.cta' | translate }}</a>
        <a [routerLink]="copart()" class="btn btn-outline">{{ 'layout.copart' | translate }}</a>
      </div>
    </article>
  `,
})
export class VinPage {
  private readonly api = inject(CarImportApi);
  private readonly analytics = inject(AnalyticsService);
  protected readonly lang = inject(LanguageService);

  protected readonly positions: readonly [string, string][] = [
    ['1', 'p1'], ['2–3', 'p2'], ['4–8', 'p4'], ['9', 'p9'], ['10', 'p10'], ['11', 'p11'], ['12–17', 'p12'],
  ];
  protected readonly firstChars = FIRST_CHAR;
  protected readonly years = YEARS;
  protected readonly freeSources = FREE_SOURCES;
  protected readonly sections = ['report', 'free', 'flags', 'japan'];
  protected readonly faq = [1, 2, 3, 4, 5, 6];

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly result = signal<VinDecoding | null>(null);
  protected readonly preferential = computed(() => {
    const c = this.result()?.manufacturedIn;
    return c && PREFERENTIAL.includes(c) ? c : null;
  });

  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly method = computed(() => pathFor('method', this.lang.current()));
  protected readonly copart = computed(() => pathFor('copart', this.lang.current()));
  protected readonly compare = computed(() => pathFor('vinCompare', this.lang.current()));

  protected decode(raw: string): void {
    const vin = raw.replace(/[\s-]/g, '').toUpperCase();
    this.error.set(null);
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
      this.error.set('vin.invalid');
      return;
    }
    this.loading.set(true);
    this.api.decodeVin(vin).subscribe({
      next: (d) => {
        this.loading.set(false);
        this.result.set(d);
        this.analytics.track('vin_lookup', { source: d.source, placement: 'vin_page' });
      },
      error: (e: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(e.status === 429 ? 'error.rateLimited' : e.status === 400 ? 'vin.invalid' : 'vin.w.offline');
      },
    });
  }

  protected title(d: VinDecoding): string {
    return [d.modelYear, d.make, d.model, d.trim].filter(Boolean).join(' ') || d.vin;
  }

  protected countries(codes: string[]): string {
    const names = new Intl.DisplayNames([this.lang.locale()], { type: 'region' });
    return codes.map((c) => names.of(c) ?? c).join(', ');
  }
}
