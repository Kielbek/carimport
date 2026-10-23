import { Component, computed, effect, inject, input, untracked } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { Lang } from '../../core/i18n/languages';
import { GuideRef, GuideSection, guidePath, resolveGuide } from '../../core/routing/guide-paths';
import { PageContext } from '../../core/routing/page-context';
import { pathFor } from '../../core/routing/paths';
import { SeoService } from '../../core/seo/seo.service';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { COUNTRY_FACTS } from './country-facts';
import {
  GUIDE_COUNTRIES,
  GUIDE_ORIGINS,
  GUIDE_PORTS,
  GuideCountry,
  GuideOrigin,
  GuidePort,
  ORIGIN_REGION_CODE,
} from './guide-data.generated';

const STEP_ICONS: IconName[] = ['banknote', 'NON_RUNNING', 'ship', 'landmark', 'route', 'document'];
const REGIONS = ['NORTH_SEA', 'BALTIC', 'ATLANTIC', 'WEST_MED', 'EAST_MED'] as const;

/**
 * The SEO guides, one component for all of them: three hubs (by origin, by EU country, by port) and the guide pages
 * of 5 origins x 27 countries x 43 ports, in every language. Text comes from the "guide" translations, facts from
 * guide-data.generated.ts (the same ports, rates and distances the calculator uses) and country-facts.ts.
 * Each language reads the guides from its home country's point of view (VAT, nearest ports, distances).
 */
@Component({
  selector: 'app-guide-page',
  imports: [RouterLink, TranslatePipe, Flag, Icon],
  template: `
    @if (ref(); as r) {
      <article class="site max-w-5xl py-10 lg:py-14">
        <nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" [attr.aria-label]="'layout.breadcrumb' | translate">
          @for (b of crumbs(); track b.path; let last = $last) {
            @if (last) { <span class="text-fg/80">{{ b.name }}</span> }
            @else { <a [routerLink]="b.path" class="hover:text-brand-text">{{ b.name }}</a><app-icon name="chevron-down" [size]="12" class="-rotate-90" /> }
          }
        </nav>

        @switch (r.section) {
          <!-- ===================== HUBS ===================== -->
          @case ('origins') {
            @if (!r.item) {
              <header class="mt-6 max-w-3xl">
                <p class="eyebrow">{{ 'guide.nav.title' | translate }}</p>
                <h1 class="h-section mt-4">{{ 'guide.hub.origins.title' | translate }}</h1>
                <p class="lead mt-4">{{ 'guide.hub.origins.lead' | translate }}</p>
              </header>
              <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                @for (o of origins; track o) {
                  <a [routerLink]="link({ section: 'origins', item: o })" class="card group flex flex-col p-6 transition hover:-translate-y-1">
                    <app-flag [code]="o" class="w-12" />
                    <h2 class="mt-5 text-xl font-extrabold leading-tight">{{ 'guide.origin.' + o + '.h1' | translate }}</h2>
                    <p class="mt-3 line-clamp-3 text-sm text-muted">{{ 'guide.origin.' + o + '.lead' | translate }}</p>
                    <span class="arrow-round ml-auto mt-auto"><app-icon name="arrow-long" [size]="22" /></span>
                  </a>
                }
              </div>
            } @else {
              <!-- ============ ORIGIN GUIDE ============ -->
              <header class="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <div class="max-w-3xl">
                  <h1 class="h-section">{{ 'guide.origin.' + r.item + '.h1' | translate }}</h1>
                  <p class="lead mt-4">{{ 'guide.origin.' + r.item + '.lead' | translate }}</p>
                </div>
                <app-flag [code]="r.item" class="hidden w-24 md:block" />
              </header>

              <dl class="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.origin.common.cost.duty' | translate }}</dt><dd class="text-sm font-semibold">{{ 'guide.origin.common.cost.dutyValue' | translate }}</dd></div>
                <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.origin.common.cost.vat' | translate }}</dt>
                  <dd class="text-sm font-semibold">
                    @if (home(); as h) { {{ 'guide.origin.common.cost.vatValue' | translate: { vat: pct(h.vat), country: countryName(h.code) } }} }
                    @else { {{ 'guide.origin.common.cost.vatRange' | translate }} }
                  </dd></div>
                <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.origin.common.cost.shipping' | translate }}</dt><dd class="text-sm font-semibold">{{ 'guide.origin.common.cost.shippingValue' | translate: sailing() }}</dd></div>
                <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.origin.common.cost.registration' | translate }}</dt>
                  <dd class="text-sm font-semibold">{{ homeFacts()?.registrationTax ?? ('guide.origin.common.cost.none' | translate) }}</dd></div>
              </dl>

              <div class="mt-12 grid gap-10 lg:grid-cols-2">
                <section><h2 class="text-2xl font-extrabold">{{ 'guide.origin.common.whyTitle' | translate }}</h2>
                  <p class="mt-4 leading-relaxed text-fg/90">{{ 'guide.origin.' + r.item + '.why' | translate }}</p></section>
                <section><h2 class="text-2xl font-extrabold">{{ 'guide.origin.common.auctionsTitle' | translate }}</h2>
                  <p class="mt-4 leading-relaxed text-fg/90">{{ 'guide.origin.' + r.item + '.auctions' | translate }}</p></section>
              </div>

              <section class="mt-14">
                <h2 class="text-2xl font-extrabold">{{ 'guide.origin.common.stepsTitle' | translate }}</h2>
                <ol class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  @for (n of [1, 2, 3, 4, 5, 6]; track n) {
                    <li class="card p-5">
                      <div class="flex items-center justify-between">
                        <app-icon [name]="stepIcons[n - 1]" [size]="30" [stroke]="1.5" class="text-brand-text" />
                        <span class="text-2xl font-extrabold text-line-strong">{{ n }}</span>
                      </div>
                      <h3 class="mt-4 font-extrabold">{{ 'guide.origin.common.step' + n + '.title' | translate }}</h3>
                      <p class="mt-2 text-sm leading-relaxed text-muted">{{ 'guide.origin.common.step' + n + '.text' | translate: sailing() }}</p>
                    </li>
                  }
                </ol>
              </section>

              <div class="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <section>
                  <h2 class="text-2xl font-extrabold">{{ 'guide.origin.common.portsTitle' | translate }}</h2>
                  <ul class="mt-5 divide-y divide-line border-y border-line">
                    @for (p of originPorts(); track p.port.code) {
                      <li>
                        <a [routerLink]="link({ section: 'ports', item: p.port.code })" class="flex items-center gap-3 py-3 hover:text-brand-text">
                          <app-flag [code]="p.port.country" class="w-6" />
                          <span class="flex-1 font-semibold">{{ p.port.name }}</span>
                          @if (p.km !== null) { <span class="text-sm text-muted">{{ num(p.km) }} km</span> }
                          <span class="w-24 text-right text-sm text-muted">{{ days(p.days) }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                  <p class="mt-3 text-xs text-muted">
                    @if (home(); as h) { {{ 'guide.origin.common.portsNote' | translate: { country: countryName(h.code) } }} }
                    @else { {{ 'guide.origin.common.portsNoteEu' | translate }} }
                  </p>
                </section>
                <section>
                  <h2 class="text-2xl font-extrabold">{{ 'guide.origin.common.docsTitle' | translate }}</h2>
                  <p class="mt-4 leading-relaxed text-fg/90">{{ 'guide.origin.' + r.item + '.docs' | translate }}</p>
                  <div class="mt-6 border-l-2 border-brand pl-4">
                    <p class="text-xs font-bold uppercase tracking-[0.08em] text-brand-text">{{ 'guide.origin.common.tipTitle' | translate }}</p>
                    <p class="mt-1 text-sm leading-relaxed">{{ 'guide.origin.' + r.item + '.tip' | translate }}</p>
                  </div>
                </section>
              </div>
            }
          }

          @case ('countries') {
            @if (!r.item) {
              <header class="mt-6 max-w-3xl">
                <p class="eyebrow">{{ 'guide.nav.title' | translate }}</p>
                <h1 class="h-section mt-4">{{ 'guide.hub.countries.title' | translate }}</h1>
                <p class="lead mt-4">{{ 'guide.hub.countries.lead' | translate }}</p>
              </header>
              <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                @for (c of countriesSorted(); track c.code) {
                  <li>
                    <a [routerLink]="link({ section: 'countries', item: c.code })"
                       class="flex items-center gap-3 rounded-[4px] border border-line p-4 transition hover:border-brand"
                       [class.!border-brand]="c.code === home()?.code">
                      <app-flag [code]="c.code" class="w-8" />
                      <span class="min-w-0 flex-1">
                        <span class="block truncate font-bold">{{ countryName(c.code) }}</span>
                        @if (c.code === home()?.code) { <span class="text-xs font-semibold text-brand-text">{{ 'guide.hub.countries.yours' | translate }}</span> }
                      </span>
                      <span class="text-sm font-semibold text-muted">VAT {{ pct(c.vat) }}%</span>
                    </a>
                  </li>
                }
              </ul>
            } @else {
              <!-- ============ COUNTRY GUIDE ============ -->
              @if (country(); as c) {
                <header class="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                  <div class="max-w-3xl">
                    <h1 class="h-section">{{ 'guide.country.h1' | translate: params() }}</h1>
                    <p class="lead mt-4">{{ 'guide.country.lead' | translate: params() }}</p>
                  </div>
                  <app-flag [code]="c.code" class="hidden w-24 md:block" />
                </header>

                <section class="mt-10">
                  <h2 class="sr-only">{{ 'guide.country.facts.title' | translate }}</h2>
                  <dl class="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.vat' | translate }}</dt><dd class="text-2xl font-extrabold text-brand-text">{{ pct(c.vat) }}%</dd></div>
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.currency' | translate }}</dt><dd class="text-lg font-bold">{{ c.currency }}</dd></div>
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.registrationTax' | translate }}</dt><dd class="font-semibold">{{ facts()?.registrationTax ?? ('guide.country.facts.noTax' | translate) }}</dd></div>
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.authority' | translate }}</dt><dd class="font-semibold">{{ facts()?.authority }}</dd></div>
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.inspection' | translate }}</dt><dd class="font-semibold">{{ facts()?.inspection }}</dd></div>
                    <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.country.facts.deadline' | translate }}</dt>
                      <dd class="font-semibold">
                        @if (facts()?.deadlineDays; as d) { {{ 'guide.country.facts.deadlineValue' | translate: { days: d } }} }
                        @else { {{ 'guide.country.facts.noDeadline' | translate }} }
                      </dd></div>
                  </dl>
                </section>

                <div class="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                  <section class="space-y-4 leading-relaxed text-fg/90">
                    <p>{{ 'guide.country.p1' | translate: params() }}</p>
                    <p>{{ 'guide.country.p2' | translate: params() }}</p>
                    <p>{{ 'guide.country.p3' | translate: params() }}</p>
                  </section>
                  <section>
                    <h2 class="text-2xl font-extrabold">{{ 'guide.country.portsTitle' | translate }}</h2>
                    <ul class="mt-5 divide-y divide-line border-y border-line">
                      @for (n of c.nearest; track n.code) {
                        <li>
                          <a [routerLink]="link({ section: 'ports', item: n.code })" class="flex items-center gap-3 py-3 hover:text-brand-text">
                            <app-flag [code]="portOf(n.code).country" class="w-6" />
                            <span class="flex-1 font-semibold">{{ portOf(n.code).name }}</span>
                            <span class="text-sm text-muted">{{ num(n.km) }} km</span>
                          </a>
                        </li>
                      }
                    </ul>
                    <p class="mt-3 text-xs text-muted">{{ 'guide.country.portsNote' | translate: params() }}</p>
                  </section>
                </div>

                <section class="mt-14">
                  <h2 class="text-2xl font-extrabold">{{ 'guide.country.originsTitle' | translate }}</h2>
                  <div class="mt-5 flex flex-wrap gap-3">
                    @for (o of origins; track o) {
                      <a [routerLink]="link({ section: 'origins', item: o })" class="chip"><app-flag [code]="o" class="w-5" /> {{ 'origin.' + o | translate }}</a>
                    }
                  </div>
                </section>
              }
            }
          }

          @case ('ports') {
            @if (!r.item) {
              <header class="mt-6 max-w-3xl">
                <p class="eyebrow">{{ 'guide.nav.title' | translate }}</p>
                <h1 class="h-section mt-4">{{ 'guide.hub.ports.title' | translate }}</h1>
                <p class="lead mt-4">{{ 'guide.hub.ports.lead' | translate: { count: ports.length } }}</p>
                @if (home(); as h) { <p class="mt-3 text-sm text-muted">{{ 'guide.hub.ports.sortedFrom' | translate: { country: countryName(h.code) } }}</p> }
              </header>
              <div class="mt-10 grid gap-8 md:grid-cols-2">
                @for (g of portGroups(); track g.region) {
                  <section>
                    <h2 class="text-xs font-bold uppercase tracking-[0.1em] text-muted">{{ 'region.' + g.region | translate }}</h2>
                    <ul class="mt-3 divide-y divide-line border-y border-line">
                      @for (p of g.ports; track p.code) {
                        <li>
                          <a [routerLink]="link({ section: 'ports', item: p.code })" class="flex items-center gap-3 py-2.5 hover:text-brand-text">
                            <app-flag [code]="p.country" class="w-6" />
                            <span class="min-w-0 flex-1 truncate font-semibold">{{ p.name }}</span>
                            <span class="text-xs text-muted">VAT {{ pct(vatOf(p.country)) }}%</span>
                            @if (home(); as h) { <span class="w-20 text-right text-sm text-muted">{{ num(p.distances[h.code]) }} km</span> }
                          </a>
                        </li>
                      }
                    </ul>
                  </section>
                }
              </div>
            } @else {
              <!-- ============ PORT GUIDE ============ -->
              @if (port(); as p) {
                <header class="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                  <div class="max-w-3xl">
                    <h1 class="h-section">{{ 'guide.port.h1' | translate: params() }}</h1>
                    <p class="lead mt-4">{{ 'guide.port.lead' | translate: params() }}</p>
                  </div>
                  <app-flag [code]="p.country" class="hidden w-24 md:block" />
                </header>

                <dl class="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                  <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.port.facts.country' | translate }}</dt>
                    <dd><a [routerLink]="link({ section: 'countries', item: p.country })" class="flex items-center gap-2 font-semibold hover:text-brand-text"><app-flag [code]="p.country" class="w-5" />{{ countryName(p.country) }}</a></dd></div>
                  <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.port.facts.vat' | translate }}</dt><dd class="text-2xl font-extrabold text-brand-text">{{ pct(vatOf(p.country)) }}%</dd></div>
                  <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.port.facts.unloading' | translate }}</dt><dd class="font-semibold">{{ money(p.unloading, p.feeCurrency) }} <span class="text-xs text-muted">{{ 'guide.port.facts.perCar' | translate }}</span></dd></div>
                  <div class="bg-bg p-5"><dt class="label !mb-1">{{ 'guide.port.facts.agency' | translate }}</dt><dd class="font-semibold">{{ money(p.agency, p.feeCurrency) }} <span class="text-xs text-muted">{{ 'guide.port.facts.perCar' | translate }}</span></dd></div>
                </dl>
                <p class="mt-3 text-xs text-muted">{{ 'guide.port.facts.region' | translate }}: {{ 'region.' + p.region | translate }}</p>

                <div class="mt-12 grid gap-10 lg:grid-cols-2">
                  <section>
                    <h2 class="text-2xl font-extrabold">{{ 'guide.port.sailingTitle' | translate: params() }}</h2>
                    <ul class="mt-5 divide-y divide-line border-y border-line">
                      @for (o of origins; track o) {
                        @if (p.days[o]; as d) {
                          <li>
                            <a [routerLink]="link({ section: 'origins', item: o })" class="flex items-center gap-3 py-3 hover:text-brand-text">
                              <app-flag [code]="o" class="w-6" />
                              <span class="flex-1 font-semibold">{{ 'origin.' + o | translate }}</span>
                              <span class="text-sm text-muted">{{ days(d) }}</span>
                            </a>
                          </li>
                        }
                      }
                    </ul>
                    <p class="mt-3 text-xs text-muted">{{ 'guide.port.sailingNote' | translate }}</p>
                  </section>
                  <section>
                    <h2 class="text-2xl font-extrabold">{{ 'guide.port.distancesTitle' | translate: params() }}</h2>
                    <ul class="mt-5 divide-y divide-line border-y border-line">
                      @for (d of portDistances(); track d.code) {
                        <li>
                          <a [routerLink]="link({ section: 'countries', item: d.code })" class="flex items-center gap-3 py-3 hover:text-brand-text"
                             [class.font-bold]="d.code === home()?.code">
                            <app-flag [code]="d.code" class="w-6" />
                            <span class="flex-1">{{ countryName(d.code) }}</span>
                            <span class="text-sm text-muted">{{ num(d.km) }} km</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </section>
                </div>

                <section class="mt-12 space-y-4 leading-relaxed text-fg/90">
                  <p>{{ 'guide.port.p1' | translate: params() }}</p>
                  <p>{{ 'guide.port.p2' | translate: params() }}</p>
                </section>

                <section class="mt-12">
                  <h2 class="text-2xl font-extrabold">{{ 'guide.port.alternativesTitle' | translate }}</h2>
                  <div class="mt-5 flex flex-wrap gap-3">
                    @for (a of alternatives(); track a.code) {
                      <a [routerLink]="link({ section: 'ports', item: a.code })" class="chip"><app-flag [code]="a.country" class="w-5" /> {{ a.name }}</a>
                    }
                  </div>
                </section>
              }
            }
          }
        }

        <!-- FAQ -->
        @if (faq().length) {
          <section class="mt-14">
            <h2 class="text-2xl font-extrabold">{{ 'faq.eyebrow' | translate }}</h2>
            <div class="mt-5 divide-y divide-line border-y border-line">
              @for (f of faq(); track f.q) {
                <details class="group py-4">
                  <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                    <h3>{{ f.q }}</h3>
                    <app-icon name="chevron-down" [size]="20" class="shrink-0 text-brand-text transition group-open:rotate-180" />
                  </summary>
                  <p class="mt-3 leading-relaxed text-fg/85">{{ f.a }}</p>
                </details>
              }
            </div>
          </section>
        }

        <!-- CTA -->
        <section class="theme-dark mt-14 flex flex-col items-start gap-6 rounded-[4px] bg-panel p-8 text-fg sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-[26px] font-extrabold leading-tight">{{ 'guide.cta.title' | translate }}</h2>
            <p class="mt-2 max-w-xl text-fg/85">{{ 'guide.cta.text' | translate }}</p>
          </div>
          <a [routerLink]="calculator()" [queryParams]="ctaParams()" class="btn btn-primary shrink-0">
            <app-icon name="calculator" [size]="18" /> {{ 'guide.cta.button' | translate }}
          </a>
        </section>

        <!-- related -->
        <nav class="mt-14" [attr.aria-label]="'guide.related' | translate">
          <h2 class="label">{{ 'guide.related' | translate }}</h2>
          <ul class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            @for (s of sections; track s) {
              <li><a [routerLink]="link({ section: s, item: null })" class="text-brand-text hover:underline">{{ 'guide.nav.' + s | translate }}</a></li>
            }
            @if (home(); as h) {
              <li><a [routerLink]="link({ section: 'countries', item: h.code })" class="text-brand-text hover:underline">{{ countryName(h.code) }}</a></li>
            }
            @for (o of origins; track o) {
              @if (o !== r.item) {
                <li><a [routerLink]="link({ section: 'origins', item: o })" class="hover:text-brand-text">{{ 'guide.origin.' + o + '.h1' | translate }}</a></li>
              }
            }
          </ul>
          <p class="mt-8 text-xs text-muted">{{ 'guide.disclaimer' | translate }}</p>
        </nav>
      </article>
    }
  `,
})
export class GuidePage {
  /** Route parameters (see app.routes.ts: guideMatcher). */
  readonly section = input<string>();
  readonly item = input<string>();

  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly pageContext = inject(PageContext);
  private readonly router = inject(Router);

  protected readonly origins = GUIDE_ORIGINS;
  protected readonly ports = GUIDE_PORTS;
  protected readonly sections: GuideSection[] = ['origins', 'countries', 'ports'];
  protected readonly stepIcons = STEP_ICONS;

  protected readonly ref = computed(() => resolveGuide(this.lang.current(), this.section() ?? '', this.item() ?? null));

  /** The reader's home country (from the language); null for English and Ukrainian = the whole EU. */
  protected readonly home = computed(() => {
    const code = this.lang.info().home;
    return code ? GUIDE_COUNTRIES.find((c) => c.code === code)! : null;
  });
  protected readonly homeFacts = computed(() => {
    const h = this.home();
    return h ? COUNTRY_FACTS[h.code] : null;
  });

  protected readonly country = computed<GuideCountry | null>(() => {
    const r = this.ref();
    return r?.section === 'countries' && r.item ? GUIDE_COUNTRIES.find((c) => c.code === r.item)! : null;
  });
  protected readonly facts = computed(() => {
    const c = this.country();
    return c ? COUNTRY_FACTS[c.code] : null;
  });
  protected readonly port = computed<GuidePort | null>(() => {
    const r = this.ref();
    return r?.section === 'ports' && r.item ? this.portOf(r.item) : null;
  });

  /** Sailing days of an origin to the EU (all ports), for the step and cost texts. */
  protected readonly sailing = computed(() => {
    const r = this.ref();
    const all = GUIDE_PORTS.map((p) => p.days[r?.item as GuideOrigin]).filter((d): d is [number, number] => !!d);
    return all.length ? { min: Math.min(...all.map((d) => d[0])), max: Math.max(...all.map((d) => d[1])) } : { min: 0, max: 0 };
  });

  /** Ports for an origin guide: nearest to the home country (with km) or the fastest from that origin. */
  protected readonly originPorts = computed(() => {
    const origin = this.ref()?.item as GuideOrigin;
    const home = this.home();
    const withDays = GUIDE_PORTS.filter((p) => p.days[origin]);
    const list = home
      ? [...withDays].sort((a, b) => a.distances[home.code] - b.distances[home.code])
      : [...withDays].sort((a, b) => a.days[origin]![0] - b.days[origin]![0]);
    return list.slice(0, 6).map((port) => ({ port, days: port.days[origin]!, km: home ? port.distances[home.code] : null }));
  });

  protected readonly countriesSorted = computed(() => {
    const home = this.home()?.code;
    return [...GUIDE_COUNTRIES].sort(
      (a, b) => Number(b.code === home) - Number(a.code === home) || this.countryName(a.code).localeCompare(this.countryName(b.code), this.lang.locale()),
    );
  });

  protected readonly portGroups = computed(() => {
    const home = this.home()?.code;
    return REGIONS.map((region) => ({
      region,
      ports: GUIDE_PORTS.filter((p) => p.region === region).sort((a, b) =>
        home ? a.distances[home] - b.distances[home] : a.name.localeCompare(b.name),
      ),
    }));
  });

  /** Eight nearest EU countries by road from the port, the home country always included. */
  protected readonly portDistances = computed(() => {
    const p = this.port();
    if (!p) {
      return [];
    }
    const sorted = Object.entries(p.distances).map(([code, km]) => ({ code, km })).sort((a, b) => a.km - b.km);
    const top = sorted.slice(0, 8);
    const home = this.home()?.code;
    const homeRow = sorted.find((d) => d.code === home);
    return homeRow && !top.includes(homeRow) ? [...top, homeRow] : top;
  });

  protected readonly alternatives = computed(() => {
    const p = this.port();
    if (!p) {
      return [];
    }
    return GUIDE_PORTS.filter((o) => o.code !== p.code)
      .map((o) => ({ ...o, d: Math.hypot(o.lat - p.lat, (o.lon - p.lon) * Math.cos((p.lat * Math.PI) / 180)) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 6);
  });

  /** Placeholder values for country and port texts. */
  protected readonly params = computed<Record<string, unknown>>(() => {
    const c = this.country();
    if (c) {
      const f = COUNTRY_FACTS[c.code];
      return { country: this.countryName(c.code), vat: this.pct(c.vat), authority: f.authority, inspection: f.inspection };
    }
    const p = this.port();
    if (p) {
      return {
        port: p.name,
        country: this.countryName(p.country),
        vat: this.pct(this.vatOf(p.country)),
        unloading: this.money(p.unloading, p.feeCurrency),
        agency: this.money(p.agency, p.feeCurrency),
      };
    }
    return {};
  });

  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly ctaParams = computed(() => {
    const r = this.ref();
    if (!r?.item) {
      return {};
    }
    return r.section === 'origins' ? { from: r.item } : r.section === 'countries' ? { to: r.item } : { port: r.item };
  });

  protected readonly crumbs = computed(() => {
    const r = this.ref();
    const lang = this.lang.current();
    if (!r) {
      return [];
    }
    const t = (k: string, p?: Record<string, unknown>) => this.translate.instant(k, p) as string;
    const list = [
      { name: t('layout.home'), path: pathFor('home', lang) },
      { name: t(`guide.nav.${r.section}`), path: guidePath({ section: r.section, item: null }, lang) },
    ];
    if (r.item) {
      list.push({ name: this.itemName(r), path: guidePath(r, lang) });
    }
    return list;
  });

  protected readonly faq = computed(() => {
    const r = this.ref();
    if (!r?.item) {
      return [];
    }
    const t = (k: string) => this.translate.instant(k, { ...this.params(), ...this.sailing() }) as string;
    const pair = (base: string) => ({ q: t(`${base}.q`), a: t(`${base}.a`) });
    switch (r.section) {
      case 'origins':
        return [
          pair(`guide.origin.${r.item}.faq1`),
          pair(`guide.origin.${r.item}.faq2`),
          pair('guide.origin.common.faqPorts'),
          pair('guide.origin.common.faqBinding'),
        ];
      case 'countries':
        return [pair('guide.country.faq1'), pair('guide.country.faq2'), pair('guide.origin.common.faqPorts')];
      case 'ports':
        return [pair('guide.port.faq1'), pair('guide.port.faq2'), pair('guide.origin.common.faqBinding')];
    }
  });

  constructor() {
    // head tags, language links; unknown guide URLs go to the home page
    effect(() => {
      const r = this.ref();
      const lang = this.lang.current();
      untracked(() => (r ? this.applySeo(r, lang) : void this.router.navigateByUrl(pathFor('home', lang))));
    });
  }

  private applySeo(r: GuideRef, lang: Lang): void {
    const t = (k: string, p?: Record<string, unknown>) => this.translate.instant(k, p) as string;
    const p = { ...this.params(), count: GUIDE_PORTS.length };
    const [title, description] = !r.item
      ? [t(`guide.hub.${r.section}.metaTitle`, p), t(`guide.hub.${r.section}.metaDescription`, p)]
      : r.section === 'origins'
        ? [t(`guide.origin.${r.item}.metaTitle`), t(`guide.origin.${r.item}.metaDescription`)]
        : r.section === 'countries'
          ? [t('guide.country.metaTitle', p), t('guide.country.metaDescription', p)]
          : [t('guide.port.metaTitle', p), t('guide.port.metaDescription', p)];
    const about =
      r.section === 'countries' && r.item
        ? { '@type': 'Country', name: this.countryName(r.item) }
        : r.section === 'ports' && r.item
          ? {
              '@type': 'Place',
              name: this.port()!.name,
              geo: { '@type': 'GeoCoordinates', latitude: this.port()!.lat, longitude: this.port()!.lon },
            }
          : undefined;
    this.seo.applyCustom({
      lang,
      title,
      description,
      path: guidePath(r, lang),
      pathFor: (l) => guidePath(r, l),
      breadcrumbs: this.crumbs(),
      faq: this.faq(),
      about,
    });
    this.pageContext.hrefFor.set((l) => guidePath(r, l));
  }

  protected link(ref: GuideRef): string {
    return guidePath(ref, this.lang.current());
  }

  protected itemName(r: GuideRef): string {
    switch (r.section) {
      case 'origins':
        return this.translate.instant(`origin.${r.item}`) as string;
      case 'countries':
        return this.countryName(r.item!);
      case 'ports':
        return this.portOf(r.item!).name;
    }
  }

  protected countryName(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(ORIGIN_REGION_CODE[code as GuideOrigin] ?? code) ?? code;
  }

  protected portOf(code: string): GuidePort {
    return GUIDE_PORTS.find((p) => p.code === code)!;
  }

  protected vatOf(country: string): number {
    return GUIDE_COUNTRIES.find((c) => c.code === country)?.vat ?? 0;
  }

  /** "12–13 days", or "42 days" when the range is a single value. */
  protected days([min, max]: [number, number]): string {
    const text = this.translate.instant('guide.port.days', { min, max }) as string;
    return min === max ? text.replace(new RegExp(`^${min}\\s*[–-]\\s*${max}`), String(min)) : text;
  }

  protected pct(rate: number): string {
    return new Intl.NumberFormat(this.lang.locale(), { maximumFractionDigits: 1 }).format(rate * 100);
  }

  protected num(value: number): string {
    return new Intl.NumberFormat(this.lang.locale()).format(value);
  }

  protected money(amount: number, currency: string): string {
    return new Intl.NumberFormat(this.lang.locale(), { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }
}
