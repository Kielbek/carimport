import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { guidePath } from '../../core/routing/guide-paths';
import { pathFor } from '../../core/routing/paths';
import { SITE, contactEmail } from '../../core/site.config';
import { Flag } from '../../shared/flag/flag';
import { COUNTRY_FACTS } from '../guides/country-facts';
import { GUIDE_MODELS, MODEL_EU, MODEL_EXAMPLES, MODEL_EXAMPLES_DATE } from '../guides/model-data.generated';

/** The model the worked example and the EU table are priced for. */
const EXAMPLE_MODEL = 'ford-mustang';
/** Standard EU duty on passenger cars - the example car is not given a preferential rate. */
const DUTY_RATE = 0.1;

/** Countries whose registration tax only the official calculator gives (as RegistrationTaxes.OFFICIAL_CALCULATOR). */
const OFFICIAL_CALCULATORS: readonly [string, string][] = [
  ['CY', 'https://www.mof.gov.cy/mof/customs/customs.nsf'],
  ['GR', 'https://www.aade.gr'],
  ['HR', 'https://www.porezna-uprava.hr'],
  ['MT', 'https://www.transport.gov.mt'],
  ['RO', 'https://www.afm.ro/timbru_mediu_calculator.php'],
];

const SOURCES: readonly { key: string; name: string; url: string }[] = [
  { key: 'taric', name: 'TARIC', url: 'https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp' },
  { key: 'origin', name: 'Access2Markets', url: 'https://trade.ec.europa.eu/access-to-markets/en/home' },
  { key: 'eurlex', name: 'EUR-Lex', url: 'https://eur-lex.europa.eu' },
  { key: 'ecb', name: 'ECB', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' },
  { key: 'vat', name: 'Taxation and Customs Union', url: 'https://taxation-customs.ec.europa.eu' },
];

/**
 * Dated changes to the rules the calculator applies, newest first: the law (real effective dates) and our own update.
 * A month-only date ("2026-10") is shown as month and year.
 */
const CHANGES = ['2026-10', '2026-07-01', '2026-01-01', '2021-01-01', '2019-02-01', '2017-09-21'];

/** How the calculation works: a worked example, the rules, sources and limits - the trust page for search and buyers. */
@Component({
  selector: 'app-method-page',
  imports: [RouterLink, TranslatePipe, Flag],
  template: `
    <article class="site max-w-3xl py-16">
      <p class="eyebrow">{{ 'method.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4">{{ 'method.title' | translate }}</h1>
      <p class="lead mt-4">{{ 'method.lead' | translate }}</p>
      <p class="mt-3 text-sm text-muted">{{ 'method.updated' | translate: { date: date(reviewed) } }}</p>

      <nav class="mt-8 rounded-[6px] border border-line bg-panel p-5" [attr.aria-label]="'method.toc' | translate">
        <p class="text-sm font-bold">{{ 'method.toc' | translate }}</p>
        <ol class="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          @for (s of sections; track s; let i = $index) {
            <li><a [href]="'#' + s" class="text-fg/80 hover:text-brand-text hover:underline">{{ i + 1 }}. {{ 'method.' + s + '.title' | translate }}</a></li>
          }
        </ol>
      </nav>

      <!-- 1. the route, as a flow -->
      <section id="scope" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">1. {{ 'method.scope.title' | translate }}</h2>
        <ol class="mt-5 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-3">
          @for (n of flow; track n) {
            <li class="flex items-start gap-3 rounded-[6px] border border-line bg-panel p-3">
              <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-[#101011]">{{ n }}</span>
              <span>
                <span class="block text-sm font-bold">{{ 'method.flow.s' + n + '.title' | translate }}</span>
                <span class="block text-xs text-muted">{{ 'method.flow.s' + n + '.text' | translate }}</span>
              </span>
            </li>
          }
        </ol>
        @for (p of paragraphs('method.scope.text' | translate); track $index) {
          <p class="mt-4 leading-relaxed text-fg/85">{{ p }}</p>
        }
      </section>

      <!-- 2. worked example with the engine's own numbers -->
      @if (example(); as e) {
        <section id="example" class="mt-12 scroll-mt-24">
          <h2 class="text-xl font-extrabold">2. {{ 'method.example.title' | translate }}</h2>
          <p class="mt-3 leading-relaxed text-fg/85">{{ 'method.example.lead' | translate: e.params }}</p>
          <div class="mt-5 overflow-x-auto">
            <table class="w-full min-w-[30rem] text-[15px]">
              <thead>
                <tr class="border-b-2 border-fg/80 text-left text-xs uppercase tracking-wide text-muted">
                  <th scope="col" class="py-2 font-semibold">{{ 'method.example.colItem' | translate }}</th>
                  <th scope="col" class="py-2 font-semibold">{{ 'method.example.colFormula' | translate }}</th>
                  <th scope="col" class="py-2 text-right font-semibold">{{ 'method.example.colAmount' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-line">
                @for (r of e.rows; track r.key) {
                  <tr [class.font-extrabold]="r.strong" [class.bg-panel]="r.strong">
                    <th scope="row" class="py-2.5 pr-3 text-left font-[inherit]">{{ r.labelKey | translate }}</th>
                    <td class="py-2.5 pr-3 text-sm text-muted">{{ r.formula ? ('method.example.formulas.' + r.formula | translate: e.params) : '' }}</td>
                    <td class="py-2.5 text-right tabular-nums">{{ money(r.amount, e.currency) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <p class="mt-3 text-xs text-muted">{{ 'method.example.note' | translate: e.params }}</p>
        </section>
      }

      @for (s of textSections; track s.id) {
        <section [id]="s.id" class="mt-12 scroll-mt-24">
          <h2 class="text-xl font-extrabold">{{ s.n }}. {{ 'method.' + s.id + '.title' | translate }}</h2>
          @for (p of paragraphs('method.' + s.id + '.text' | translate: { email: email() }); track $index) {
            <p class="mt-3 leading-relaxed text-fg/85">{{ p }}</p>
          }

          @if (s.id === 'national') {
            <p class="mt-6 text-sm font-semibold">{{ 'method.national.tableLead' | translate: { model: modelName } }}</p>
            <div class="mt-3 overflow-x-auto">
              <table class="w-full min-w-[30rem] text-sm">
                <thead>
                  <tr class="border-b-2 border-fg/80 text-left text-xs uppercase tracking-wide text-muted">
                    <th scope="col" class="py-2 font-semibold">{{ 'method.national.colCountry' | translate }}</th>
                    <th scope="col" class="py-2 font-semibold">{{ 'method.national.colTax' | translate }}</th>
                    <th scope="col" class="py-2 text-right font-semibold">{{ 'method.national.colTotal' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-line">
                  @for (c of countries(); track c.code) {
                    <tr [class.bg-panel]="c.code === destination()" [class.font-bold]="c.code === destination()">
                      <td class="py-2 pr-3">
                        <a [routerLink]="countryLink(c.code)" class="inline-flex items-center gap-2 hover:text-brand-text hover:underline">
                          <app-flag [code]="c.code" class="w-5" />{{ c.name }}{{ c.unpriced ? ' *' : '' }}
                        </a>
                      </td>
                      <td class="py-2 pr-3 text-fg/80">{{ c.tax ?? ('method.national.none' | translate) }}</td>
                      <td class="py-2 text-right tabular-nums">{{ c.total === null ? '–' : money(c.total, 'EUR') }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <p class="mt-3 text-xs text-muted">* {{ 'method.national.unpriced' | translate }}</p>
            <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              @for (o of officialCalculators; track o[0]) {
                <li><a [href]="o[1]" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-brand-text">{{ countryName(o[0]) }}</a></li>
              }
            </ul>
          }

          @if (s.id === 'sources') {
            <ul class="mt-4 space-y-3">
              @for (src of sources; track src.key) {
                <li class="rounded-[6px] border border-line p-4">
                  <a [href]="src.url" target="_blank" rel="noopener" class="font-bold underline underline-offset-2 hover:text-brand-text">{{ src.name }}</a>
                  <p class="mt-1 text-sm text-fg/80">{{ 'method.sources.' + src.key | translate }}</p>
                </li>
              }
            </ul>
          }

          @if (s.id === 'changes') {
            <ol class="mt-4 border-l-2 border-line">
              @for (d of changes; track d) {
                <li class="relative pb-4 pl-5">
                  <span class="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-brand"></span>
                  <time [attr.datetime]="d" class="text-sm font-bold">{{ d.length === 7 ? month(d) : date(d) }}</time>
                  <p class="mt-1 text-sm text-fg/85">{{ 'method.changes.c' + d.replaceAll('-', '') | translate }}</p>
                </li>
              }
            </ol>
          }
        </section>
      }

      <section id="faq" class="mt-12 scroll-mt-24">
        <h2 class="text-xl font-extrabold">{{ sections.length }}. {{ 'method.faq.title' | translate }}</h2>
        <div class="mt-4 divide-y divide-line border-y border-line">
          @for (n of faq; track n) {
            <details class="group py-4">
              <summary class="cursor-pointer list-none font-bold marker:hidden">
                <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ 'method.faq.q' + n | translate }}
              </summary>
              <p class="mt-2 leading-relaxed text-fg/85">{{ 'method.faq.a' + n | translate }}</p>
            </details>
          }
        </div>
      </section>

      <div class="mt-12 flex flex-wrap gap-3">
        <a [routerLink]="calculator()" class="btn btn-primary">{{ 'layout.cta' | translate }}</a>
        <a [routerLink]="taxes()" class="btn btn-outline">{{ 'layout.taxes' | translate }}</a>
      </div>
    </article>
  `,
})
export class MethodPage {
  private readonly lang = inject(LanguageService);
  protected readonly flow = [1, 2, 3, 4, 5, 6];
  protected readonly faq = [1, 2, 3, 4, 5, 6];
  protected readonly textSections = [
    { id: 'duty', n: 3 },
    { id: 'vat', n: 4 },
    { id: 'national', n: 5 },
    { id: 'transport', n: 6 },
    { id: 'port', n: 7 },
    { id: 'sources', n: 8 },
    { id: 'changes', n: 9 },
    { id: 'limits', n: 10 },
    { id: 'independence', n: 11 },
  ];
  protected readonly sections = ['scope', 'example', ...this.textSections.map((s) => s.id), 'faq'];
  protected readonly sources = SOURCES;
  protected readonly changes = CHANGES;
  protected readonly officialCalculators = OFFICIAL_CALCULATORS;
  protected readonly email = computed(() => contactEmail(this.lang.current()));
  protected readonly reviewed = SITE.ratesReviewed;
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly taxes = computed(() => pathFor('taxes', this.lang.current()));
  protected readonly destination = computed(() => this.lang.info().country);

  private readonly model = GUIDE_MODELS.find((m) => m.id === EXAMPLE_MODEL)!;
  protected readonly modelName = `${this.model.make} ${this.model.model} (${this.model.year})`;

  /** The engine's example for the reader's country, split into the steps customs and the tax office apply. */
  protected readonly example = computed(() => {
    const e = MODEL_EXAMPLES[EXAMPLE_MODEL]?.[this.destination()];
    if (!e) {
      return null;
    }
    const customsValue = e.duty / DUTY_RATE;
    const vatBase = e.vat / e.vatRate;
    const toBorder = customsValue - e.price;
    const toDestination = vatBase - customsValue - e.duty;
    const restTransport = e.transport - toBorder - toDestination;
    type Row = { key: string; amount: number; formula?: string; strong?: boolean };
    const rows: Row[] = [
      { key: 'price', amount: e.price },
      { key: 'toBorder', amount: toBorder },
      { key: 'customsValue', amount: customsValue, formula: 'customsValue', strong: true },
      { key: 'duty', amount: e.duty, formula: 'duty' },
      { key: 'toDestination', amount: toDestination },
      { key: 'vatBase', amount: vatBase, formula: 'vatBase', strong: true },
      { key: 'vat', amount: e.vat, formula: 'vat' },
      ...e.national.map((n) => ({ key: 'cost.' + n.code, amount: n.amount, formula: 'national' })),
      { key: 'restTransport', amount: restTransport },
      { key: 'registration', amount: e.registration },
      ...(e.other > 0 ? [{ key: 'other', amount: e.other }] : []),
      { key: 'total', amount: e.total, formula: 'total', strong: true },
    ];
    return {
      currency: e.currency,
      rows: rows.map((r) => ({ ...r, labelKey: r.key.startsWith('cost.') ? r.key : 'method.example.rows.' + r.key })),
      params: {
        model: this.modelName,
        price: this.money(this.model.price, 'USD'),
        country: this.countryName(this.destination()),
        port: e.port,
        dutyRate: this.pct(DUTY_RATE),
        vatRate: this.pct(e.vatRate),
        date: this.date(MODEL_EXAMPLES_DATE),
      },
    };
  });

  /** Every EU country: its registration tax by local name and the example car's total there, in EUR. */
  protected readonly countries = computed(() => {
    const totals = MODEL_EU[EXAMPLE_MODEL] ?? {};
    return Object.keys(COUNTRY_FACTS)
      .map((code) => ({
        code,
        name: this.countryName(code),
        tax: COUNTRY_FACTS[code].registrationTax,
        total: totals[code]?.total ?? null,
        unpriced: totals[code]?.unpriced ?? false,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, this.lang.locale()));
  });

  protected paragraphs(text: string): string[] {
    return text.split('\n').filter((p) => p.trim());
  }

  protected countryLink(code: string): string {
    return guidePath({ section: 'countries', item: code }, this.lang.current());
  }

  protected countryName(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(code) ?? code;
  }

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  protected pct(rate: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'percent', maximumFractionDigits: 1 }).format(rate);
  }

  protected month(iso: string): string {
    return new Intl.DateTimeFormat(this.lang.locale(), { month: 'long', year: 'numeric' }).format(new Date(iso + '-15T12:00:00Z'));
  }

  protected date(iso: string): string {
    return new Intl.DateTimeFormat(this.lang.locale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso + 'T12:00:00Z'));
  }
}
