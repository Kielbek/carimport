import { Component, computed, effect, inject, input, untracked } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { LanguageService, isSupportedLang } from '../../core/i18n/language.service';
import { Lang } from '../../core/i18n/languages';
import { PageContext } from '../../core/routing/page-context';
import { pathFor } from '../../core/routing/paths';
import { SeoService } from '../../core/seo/seo.service';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { EuImportPage } from './eu-import-page';
import { EuRoute, EuRouteExample, EuRouteLine } from './eu-route-types';
import { EU_ROUTES, EU_ROUTES_DATE } from './eu-routes.generated';
import { EU_ROUTE_TEXTS, RouteTexts } from './eu-routes-content';

/** Lines with their own label in the EU calculator (no auction, no port). */
const OWN_LABELS = new Set(['PURCHASE_PRICE', 'EU_TRANSPORT_CAR_CARRIER', 'EU_TRANSPORT_TOW_TRUCK', 'EU_TRANSPORT_SELF_DRIVE',
  'EU_NEW_VEHICLE_VAT', 'INSURANCE_FIRST_YEAR']);
const MODES = ['CAR_CARRIER', 'TOW_TRUCK', 'SELF_DRIVE'] as const;
const NOT_TAXES = new Set(['PURCHASE_PRICE', 'INSURANCE_FIRST_YEAR']);
/** Engine notes shown on the page; the VAT rule has its own section. */
const SKIP_NOTES = new Set(['warning.euImport.usedVatAtOrigin']);
const OWN_WARNINGS = new Set(['warning.euImport.newVehicleVat', 'warning.euImport.exportPlates', 'warning.euImport.ferry']);

/**
 * A popular import route between two member states (/pl/import-auta-z-ue/niemcy-polska), in the destination's
 * language only: what the route costs for three typical cars (priced by the EU engine, tools/generate-eu-routes.mjs),
 * transport options, the destination's taxes, the VAT rule, FAQ and the calculator preset to the route.
 */
@Component({
  selector: 'app-eu-route-page',
  imports: [RouterLink, TranslatePipe, Flag, Icon, EuImportPage],
  template: `
    @if (route(); as r) {
      @if (texts(); as t) {
        <article class="site max-w-5xl py-12 lg:py-16">
          <nav class="text-sm text-muted" [attr.aria-label]="'layout.breadcrumb' | translate">
            <a [routerLink]="home()" class="hover:text-fg">{{ 'layout.home' | translate }}</a>
            <span class="mx-1.5">›</span>
            <a [routerLink]="hub()" class="hover:text-fg">{{ 'layout.euImport' | translate }}</a>
            <span class="mx-1.5">›</span>
            <span class="text-fg/80">{{ name(r.from) }} → {{ name(r.to) }}</span>
          </nav>

          <header class="mt-6 flex items-start justify-between gap-6">
            <div class="max-w-3xl">
              <p class="eyebrow">{{ 'euImport.eyebrow' | translate }}</p>
              <h1 class="h-section mt-4">{{ fill(t.h1) }}</h1>
              <p class="lead mt-4">{{ fill(t.lead) }}</p>
            </div>
            <span class="hidden shrink-0 items-center gap-2 md:flex">
              <app-flag [code]="r.from" class="w-12" /><app-icon name="arrow-right" [size]="20" class="text-muted" /><app-flag [code]="r.to" class="w-12" />
            </span>
          </header>

          <dl class="mt-8 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-3">
            <div class="bg-bg p-5"><dt class="label !mb-1">{{ t.distance }}</dt><dd class="text-2xl font-extrabold">{{ num(r.km) }} km</dd></div>
            <div class="bg-bg p-5"><dt class="label !mb-1">{{ t.duty }}</dt><dd class="text-2xl font-extrabold text-brand-text">0 %</dd></div>
            <div class="bg-bg p-5"><dt class="label !mb-1">{{ t.taxesFor }}</dt><dd class="text-2xl font-extrabold">{{ money(taxesOf(r.examples[0]), r.currency) }}</dd></div>
          </dl>

          <section class="mt-12">
            <h2 class="text-2xl font-extrabold">{{ fill(t.examplesTitle) }}</h2>
            <div class="mt-5 overflow-x-auto">
              <table class="w-full min-w-[640px] text-[15px]">
                <thead class="text-left text-xs uppercase tracking-wide text-muted">
                  <tr class="border-b border-line">
                    <th class="py-2 pr-3 font-semibold">{{ t.colCar }}</th>
                    <th class="py-2 pr-3 text-right font-semibold">{{ t.colPrice }}</th>
                    <th class="py-2 pr-3 text-right font-semibold">{{ t.colTransport }}</th>
                    <th class="py-2 pr-3 text-right font-semibold">{{ t.colTaxes }}</th>
                    <th class="py-2 pr-3 text-right font-semibold">{{ insuranceLabel() }}</th>
                    <th class="py-2 text-right font-semibold">{{ t.colTotal }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-line">
                  @for (e of r.examples; track e.car) {
                    <tr>
                      <td class="py-3 pr-3 font-semibold">{{ carLabel(e) }}</td>
                      <td class="py-3 pr-3 text-right tabular-nums">{{ money(lineSum(e, ['PURCHASE_PRICE']), r.currency) }}</td>
                      <td class="py-3 pr-3 text-right tabular-nums">{{ money(transportOf(e), r.currency) }}</td>
                      <td class="py-3 pr-3 text-right tabular-nums">{{ money(taxesOf(e), r.currency) }}</td>
                      <td class="py-3 pr-3 text-right tabular-nums">{{ money(lineSum(e, ['INSURANCE_FIRST_YEAR']), r.currency) }}</td>
                      <td class="py-3 text-right font-extrabold tabular-nums text-brand-text">{{ money(e.total, r.currency) }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <p class="mt-3 text-xs text-muted">{{ fill(t.examplesNote) }}</p>
            @for (w of notes(); track w) {
              <p class="mt-3 flex gap-2 rounded-[4px] border-l-2 border-brand bg-brand/8 px-4 py-3 text-sm">
                <app-icon name="info" [size]="16" class="mt-0.5 shrink-0 text-brand-text" />{{ w }}
              </p>
            }
          </section>

          <div class="mt-12 grid gap-10 lg:grid-cols-2">
            <section>
              <h2 class="text-2xl font-extrabold">{{ fill(t.transportTitle) }}</h2>
              <p class="mt-3 leading-relaxed text-fg/90">{{ fill(t.transportText) }}</p>
              <ul class="mt-4 divide-y divide-line border-y border-line">
                @for (m of modes; track m) {
                  <li class="flex items-center justify-between gap-3 py-3">
                    <span>{{ 'euImport.mode.' + m | translate }}</span>
                    <span class="font-semibold tabular-nums">{{ money(r.transport[m], r.currency) }}</span>
                  </li>
                }
              </ul>
            </section>
            <section>
              <h2 class="text-2xl font-extrabold">{{ fill(t.taxesTitle) }}</h2>
              <p class="mt-3 leading-relaxed text-fg/90">{{ fill(t.taxesText) }}</p>
              <ul class="mt-4 divide-y divide-line border-y border-line">
                @for (l of taxLines(r.examples[0]); track l.code) {
                  <li class="flex items-center justify-between gap-3 py-3">
                    <span>{{ label(l) }}</span>
                    <span class="font-semibold tabular-nums">{{ money(l.amount, r.currency) }}</span>
                  </li>
                }
              </ul>
            </section>
          </div>

          <section class="mt-12 max-w-3xl">
            <h2 class="text-2xl font-extrabold">{{ t.vatTitle }}</h2>
            <p class="mt-3 leading-relaxed text-fg/90">{{ fill(t.vatText) }}</p>
          </section>

          <section class="mt-12">
            <h2 class="text-2xl font-extrabold">{{ fill(t.calcTitle) }}</h2>
            <div class="mt-5"><app-eu-import-page [embedded]="true" [presetFrom]="r.from" [presetTo]="r.to" /></div>
          </section>

          <section class="mt-12 max-w-3xl">
            <h2 class="text-2xl font-extrabold">{{ 'euImport.faq.title' | translate }}</h2>
            <div class="mt-4 divide-y divide-line border-y border-line">
              @for (f of faq(); track f.q) {
                <details class="group py-3">
                  <summary class="cursor-pointer list-none font-semibold">
                    <span class="mr-2 inline-block text-brand-text transition group-open:rotate-90">›</span>{{ f.q }}
                  </summary>
                  <p class="mt-2 leading-relaxed text-fg/85">{{ f.a }}</p>
                </details>
              }
            </div>
          </section>

          @if (others().length) {
            <nav class="mt-12" [attr.aria-label]="t.otherRoutes">
              <h2 class="label">{{ t.otherRoutes }}</h2>
              <ul class="mt-3 flex flex-wrap gap-2">
                @for (o of others(); track o.slug) {
                  <li><a [routerLink]="hub() + '/' + o.slug" class="chip"><app-flag [code]="o.from" class="w-5" /> {{ name(o.from) }} → {{ name(o.to) }}</a></li>
                }
              </ul>
            </nav>
          }
        </article>
      }
    }
  `,
})
export class EuRoutePage {
  /** URL segment after the EU import slug (route param). */
  readonly route$ = input<string>('', { alias: 'route' });

  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly pageContext = inject(PageContext);
  private readonly router = inject(Router);
  protected readonly modes = MODES;

  /** Language of this page's own URL (stays put while a language switch is in flight). */
  private readonly urlLang = (() => {
    const route = inject(ActivatedRoute).pathFromRoot.find((r) => r.snapshot.paramMap.has('lang'));
    return route
      ? toSignal(route.paramMap.pipe(map((p) => p.get('lang'))), { initialValue: route.snapshot.paramMap.get('lang') })
      : () => null;
  })();
  private readonly pageLang = computed<Lang>(() => {
    const l = this.urlLang();
    return isSupportedLang(l) ? l : this.lang.current();
  });

  protected readonly route = computed<EuRoute | undefined>(() =>
    EU_ROUTES.find((r) => r.lang === this.pageLang() && r.slug === this.route$()));
  protected readonly texts = computed<RouteTexts | undefined>(() => EU_ROUTE_TEXTS[this.pageLang()]);
  protected readonly hub = computed(() => pathFor('euImport', this.pageLang()));
  protected readonly home = computed(() => pathFor('home', this.pageLang()));
  /** Other routes in this language, same destination first. */
  protected readonly others = computed(() => {
    const r = this.route();
    return r
      ? EU_ROUTES.filter((o) => o.lang === r.lang && o.slug !== r.slug).sort((a, b) => Number(b.to === r.to) - Number(a.to === r.to))
      : [];
  });
  protected readonly insuranceLabel = computed(() => {
    this.pageLang();
    return (this.translate.instant('euImport.cost.INSURANCE_FIRST_YEAR') as string).split(' – ')[0].split(' (')[0];
  });
  /** What the engine could not price (e.g. a registration tax not modelled yet) - said next to the numbers. */
  protected readonly notes = computed(() => {
    const r = this.route();
    if (!r) {
      return [];
    }
    return [...new Set(r.examples.flatMap((e) => e.warnings))]
      .filter((w) => !SKIP_NOTES.has(w))
      .map((w) => this.translate.instant(OWN_WARNINGS.has(w) ? w.replace('warning.euImport.', 'euImport.warning.') : w,
        { country: this.name(r.to) }) as string);
  });
  protected readonly faq = computed(() => {
    const t = this.texts();
    const r = this.route();
    if (!t || !r) {
      return [];
    }
    // the taxes answer quotes our figure: say so when part of the registration tax is not priced
    const missing = r.examples[0].warnings.includes('warning.registrationTax.notModelled')
      ? ' ' + (this.translate.instant('warning.registrationTax.notModelled') as string) : '';
    return t.faq.map((f, i) => ({ q: this.fill(f.q), a: this.fill(f.a) + (i === 1 ? missing : '') }));
  });

  constructor() {
    effect(() => {
      const r = this.route();
      const t = this.texts();
      const lang = this.pageLang();
      untracked(() => {
        if (!r || !t) {
          void this.router.navigateByUrl(pathFor('euImport', lang));
          return;
        }
        const path = `${pathFor('euImport', lang)}/${r.slug}`;
        this.seo.applyCustom({
          lang,
          title: this.fill(t.title) + ' | Carglo',
          headline: this.fill(t.h1),
          description: this.fill(t.description),
          path,
          pathFor: () => path,
          languages: [lang],
          breadcrumbs: [
            { name: this.translate.instant('layout.home') as string, path: pathFor('home', lang) },
            { name: this.translate.instant('layout.euImport') as string, path: pathFor('euImport', lang) },
            { name: `${this.name(r.from)} → ${this.name(r.to)}`, path },
          ],
          faq: this.faq(),
          modified: EU_ROUTES_DATE,
        });
        // other languages have no page for this route: the language menu leads to their EU import calculator
        this.pageContext.hrefFor.set((l) => (l === lang ? path : pathFor('euImport', l)));
      });
    });
  }

  /** Fills {from}, {to}, {km}, {year}, ... in a template of the destination's language. */
  protected fill(template: string): string {
    const r = this.route();
    const t = this.texts();
    if (!r || !t) {
      return template;
    }
    const petrol = r.examples[0];
    const values: Record<string, string> = {
      from: t.from[r.from] ?? this.name(r.from),
      to: t.to[r.to] ?? this.name(r.to),
      origin: this.name(r.from),
      destination: this.name(r.to),
      km: this.num(r.km),
      year: EU_ROUTES_DATE.slice(0, 4),
      date: this.date(r.fxDate),
      currency: r.currency,
      carrier: this.money(r.transport.CAR_CARRIER, r.currency),
      tow: this.money(r.transport.TOW_TRUCK, r.currency),
      self: this.money(r.transport.SELF_DRIVE, r.currency),
      taxes: this.money(this.taxesOf(petrol), r.currency),
      total: this.money(petrol.total, r.currency),
      car: this.carLabel(petrol),
    };
    return template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);
  }

  protected name(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(code) ?? code;
  }

  protected carLabel(e: EuRouteExample): string {
    const fuel = this.translate.instant('fuel.' + e.fuel) as string;
    const engine = e.cc ? ` ${(e.cc / 1000).toFixed(1)}` : '';
    return `${fuel}${engine} · ${e.year} · ${e.kw} kW`;
  }

  protected lineSum(e: EuRouteExample, codes: string[]): number {
    return e.lines.filter((l) => codes.includes(l.code)).reduce((s, l) => s + l.amount, 0);
  }

  protected transportOf(e: EuRouteExample): number {
    return e.lines.filter((l) => l.code.startsWith('EU_TRANSPORT_')).reduce((s, l) => s + l.amount, 0);
  }

  /** Taxes and fees of the registration (not the car, the trip or the insurance estimate). */
  protected taxLines(e: EuRouteExample): EuRouteLine[] {
    return e.lines.filter((l) => !NOT_TAXES.has(l.code) && !l.code.startsWith('EU_TRANSPORT_') && l.amount > 0);
  }

  protected taxesOf(e: EuRouteExample): number {
    return this.taxLines(e).reduce((s, l) => s + l.amount, 0);
  }

  protected label(l: EuRouteLine): string {
    const key = OWN_LABELS.has(l.code) ? 'euImport.cost.' + l.code : 'cost.' + l.code;
    const rate = l.rate == null ? '' : new Intl.NumberFormat(this.lang.locale(), { maximumFractionDigits: 1 }).format(l.rate * 100);
    return this.translate.instant(key, { ...l.params, rate }) as string;
  }

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  protected num(n: number): string {
    return new Intl.NumberFormat(this.lang.locale()).format(n);
  }

  private date(iso: string): string {
    return new Intl.DateTimeFormat(this.lang.locale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso + 'T12:00:00Z'));
  }
}
