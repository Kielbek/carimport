import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryNamePipe } from '../../core/format/country-name.pipe';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { BlogArticle } from '../blog/blog.models';
import { FaqSection } from './faq-section';
import { WorldMap } from './world-map';

interface Benefit { key: string; icon: IconName; highlight?: boolean }
interface CostGroup { key: string; icon: IconName; items: number }

/**
 * Landing page, prerendered per language. Carglo is a calculator only - it neither sells nor imports cars - so
 * the page sells the calculation: instant, independent, complete, and ends every section with a way into it.
 */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslatePipe, CountryNamePipe, Flag, Icon, WorldMap, FaqSection],
  template: `
    <!-- HERO: follows the light/dark theme -->
    <section class="hero relative isolate overflow-hidden text-fg">
      <div class="site relative grid min-h-[660px] items-center gap-6 pb-10 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:pb-44">
        <div class="relative z-10 max-w-[600px]">
          <p class="eyebrow">{{ 'home.hero.eyebrow' | translate }}</p>
          <h1 class="h-display mt-5">
            <span class="block text-brand-text">{{ 'home.hero.title1' | translate }}</span>
            <span class="block">{{ 'home.hero.title2' | translate }}</span>
          </h1>
          <p class="mt-7 max-w-[540px] text-[16px] leading-[1.5] text-fg/95">{{ 'home.hero.lead' | translate }}</p>
          <ul class="mt-6 space-y-2 text-[14px] text-fg/90">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex items-start gap-2.5"><app-icon name="check" [size]="18" [stroke]="2.5" class="mt-0.5 shrink-0 text-brand-text" />{{ 'home.hero.point' + n | translate }}</li>
            }
          </ul>
          <div class="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a [routerLink]="calculator()" class="btn btn-primary"><app-icon name="calculator" [size]="18" /> {{ 'home.hero.cta' | translate }}</a>
            <a routerLink="." fragment="what" class="link-arrow text-[15px]">{{ 'home.hero.secondary' | translate }} <app-icon name="arrow-long" [size]="26" [stroke]="1.5" /></a>
          </div>
        </div>

        <div class="relative -mx-3 sm:-mx-5 lg:-mr-24 lg:ml-0">
          <img class="hero-car w-full" src="/images/hero-car-1600.webp"
               srcset="/images/hero-car-900.webp 900w, /images/hero-car-1600.webp 1600w"
               sizes="(min-width: 1024px) 60vw, 100vw" width="1600" height="835" fetchpriority="high" decoding="async"
               [alt]="'home.hero.visual' | translate" />
        </div>

        <!-- facts band: claim on the left, three facts in a frosted panel on the right -->
        <div class="flex flex-col gap-5 lg:absolute lg:inset-x-5 lg:bottom-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div class="shrink-0">
            <p class="text-[17px] font-bold leading-snug">{{ 'home.strip.brand.title' | translate }}<br>{{ 'home.strip.brand.text' | translate }}</p>
            <span class="mt-3 block h-px w-14 bg-fg/40" aria-hidden="true"></span>
          </div>
          <dl class="grid rounded-[10px] bg-[var(--hero-facts-bg)] px-6 py-4 shadow-[var(--hero-facts-shadow)] backdrop-blur-xl sm:grid-cols-3 sm:px-10 sm:py-6 lg:mr-[calc(50%-50vw)] lg:min-w-[720px] lg:rounded-r-none lg:pr-[max(2.5rem,calc(50vw-50%+2.5rem))]">
            @for (k of strip; track k; let first = $first) {
              <div class="py-3 sm:px-8 sm:py-0" [class]="first ? 'sm:pl-0' : 'border-t border-line sm:border-l sm:border-t-0'">
                <dt class="text-[16px] font-bold">{{ 'home.strip.' + k + '.title' | translate }}</dt>
                <dd class="mt-1 text-[13px] text-fg/70">{{ 'home.strip.' + k + '.text' | translate }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section id="why" class="site py-16">
      <p class="eyebrow">{{ 'home.why.eyebrow' | translate }}</p>
      <h2 class="h-section mt-5 max-w-4xl">{{ 'home.why.title' | translate }}</h2>
      <p class="mt-4 max-w-3xl text-[16px] text-fg/90">{{ 'home.why.lead' | translate }}</p>

      <div class="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        <a [routerLink]="calculator()" class="group relative min-h-[312px] overflow-hidden rounded-[4px] bg-ink sm:col-span-2">
          <img src="/images/mercedes_image.webp" width="1200" height="760" loading="lazy" decoding="async"
               [alt]="'home.why.preview.alt' | translate"
               class="absolute inset-0 h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/10"></div>
          <div class="absolute bottom-5 left-6 right-6 text-white">
            <span class="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{{ 'home.why.preview.tag' | translate }}</span>
            <h3 class="mt-2 text-2xl font-bold">{{ 'home.why.preview.title' | translate }}</h3>
            <p class="mt-1 text-sm text-white/90">{{ 'home.why.preview.text' | translate }}</p>
          </div>
        </a>

        @for (b of benefits; track b.key; let i = $index) {
          <a [routerLink]="calculator()"
             class="group relative flex flex-col rounded-[4px] p-5 transition duration-200 hover:-translate-y-1"
             [class]="(i < 2 ? 'min-h-[312px] ' : 'min-h-[250px] ') + (b.highlight ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'border border-card-border bg-panel hover:bg-panel-2')">
            <div class="flex items-center justify-between gap-3">
              <app-icon [name]="b.icon" [size]="44" [stroke]="1.5" [class]="b.highlight ? 'text-[#b38600]' : 'text-brand-text'" />
              <span class="text-right text-[15px] uppercase tracking-[0.08em]" [class]="b.highlight ? 'text-[#b38600]' : 'text-brand-text'">{{ 'home.why.' + b.key + '.tag' | translate }}</span>
            </div>
            <h3 class="font-extrabold leading-tight" [class]="i < 2 ? 'mt-9 text-[20px]' : 'mt-8 text-xl'">{{ 'home.why.' + b.key + '.title' | translate }}</h3>
            <p class="mt-3 text-[14px] leading-[1.4]" [class]="b.highlight ? 'text-neutral-700' : 'text-fg/85'">{{ 'home.why.' + b.key + '.text' | translate }}</p>
            <span class="arrow-round ml-auto mt-auto"><app-icon name="arrow-long" [size]="22" /></span>
          </a>
        }
      </div>
    </section>

    <!-- WHAT WE COUNT -->
    <section id="what" class="border-t border-line py-16">
      <div class="site">
        <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="eyebrow">{{ 'home.what.eyebrow' | translate }}</p>
            <h2 class="h-section mt-5 max-w-3xl">{{ 'home.what.title' | translate }}</h2>
            <p class="mt-4 max-w-3xl text-[16px] text-fg/90">{{ 'home.what.lead' | translate }}</p>
          </div>
          <a [routerLink]="calculator()" class="btn btn-outline self-start lg:self-end">{{ 'home.what.cta' | translate }}</a>
        </div>
        <div class="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          @for (g of costGroups; track g.key) {
            <div class="bg-bg p-6">
              <app-icon [name]="g.icon" [size]="32" [stroke]="1.5" class="text-brand-text" />
              <h3 class="mt-5 text-lg font-extrabold">{{ 'home.what.' + g.key + '.title' | translate }}</h3>
              <ul class="mt-4 space-y-2.5 text-[14px] text-fg/85">
                @for (n of range(g.items); track n) {
                  <li class="flex items-start gap-2.5"><app-icon name="check" [size]="16" class="mt-0.5 shrink-0 text-brand-text" />{{ 'home.what.' + g.key + '.i' + n | translate }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- COMPARISON -->
    <section id="compare" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.compare.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'home.compare.title' | translate }}</h2>
        <div class="mt-9 overflow-x-auto">
          <table class="w-full min-w-[640px] text-[15px]">
            <caption class="sr-only">{{ 'home.compare.title' | translate }}</caption>
            <thead>
              <tr class="border-b border-line text-left text-[12px] uppercase tracking-[0.06em] text-muted">
                <th class="py-3 pr-4 font-semibold"></th>
                <th class="w-36 py-3 text-center font-semibold">{{ 'home.compare.self' | translate }}</th>
                <th class="w-36 py-3 text-center font-semibold">{{ 'home.compare.broker' | translate }}</th>
                <th class="w-36 bg-brand/10 py-3 text-center font-semibold text-brand-text">Carglo</th>
              </tr>
            </thead>
            <tbody>
              @for (r of compareRows; track r.n) {
                <tr class="border-b border-line">
                  <td class="py-4 pr-4 font-medium">{{ 'home.compare.r' + r.n | translate }}</td>
                  <td class="text-center">@switch (r.self) { @case ('yes') { <app-icon name="check" [size]="20" class="inline text-success" /> } @case ('part') { <span class="text-muted">~</span> } @default { <app-icon name="x" [size]="18" class="inline text-muted" /> } }</td>
                  <td class="text-center">@switch (r.broker) { @case ('yes') { <app-icon name="check" [size]="20" class="inline text-success" /> } @case ('part') { <span class="text-muted">~</span> } @default { <app-icon name="x" [size]="18" class="inline text-muted" /> } }</td>
                  <td class="bg-brand/10 text-center"><app-icon name="check" [size]="20" [stroke]="2.5" class="inline text-brand-text" /></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-xs text-muted">{{ 'home.compare.note' | translate }}</p>
      </div>
    </section>

    <!-- ROUTES MAP -->
    <section id="countries" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.map.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'home.map.title' | translate }}</h2>
        <p class="mt-4 max-w-2xl text-[16px] text-fg/90">{{ 'home.map.lead' | translate }}</p>
        <app-world-map class="mt-10" />
      </div>
    </section>

    <!-- NUMBERS -->
    <section class="border-t border-line py-20">
      <div class="site grid gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p class="text-[17px] uppercase tracking-[0.02em]">{{ 'home.numbers.eyebrow' | translate }}</p>
          <h2 class="h-section mt-5 max-w-xl">{{ 'home.numbers.title' | translate }}</h2>
          <span class="mt-6 block h-px w-36 bg-brand"></span>
        </div>
        <dl class="grid grid-cols-2">
          @for (n of [1, 2, 3, 4]; track n; let i = $index) {
            <div class="py-6" [class]="(i % 2 ? 'border-l border-line pl-8' : 'pr-8') + (i < 2 ? ' border-b border-line pt-0' : ' pb-0')">
              <dt class="text-[48px] font-extrabold leading-none text-brand-text sm:text-[58px]">{{ 'home.numbers.n' + n + '.value' | translate }}</dt>
              <dd class="mt-3 text-[15px] leading-snug text-muted">{{ 'home.numbers.n' + n + '.label' | translate }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.how.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'home.how.title' | translate }}</h2>
        <ol class="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          @for (s of steps; track s.key; let i = $index) {
            <li class="card flex min-h-[230px] flex-col p-5">
              <div class="flex items-center justify-between">
                <app-icon [name]="s.icon" [size]="40" [stroke]="1.5" class="text-brand-text" />
                <span class="text-[16px] uppercase tracking-[0.08em] text-brand-text">{{ 'home.how.step' | translate }} {{ i + 1 }}</span>
              </div>
              <h3 class="mt-8 text-xl font-extrabold">{{ 'home.how.' + s.key + '.title' | translate }}</h3>
              <p class="mt-3 text-[14px] leading-[1.4] text-fg/85">{{ 'home.how.' + s.key + '.text' | translate }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- COSTS + PORTS -->
    <section id="costs" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.costs.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-4xl">{{ 'home.costs.title' | translate }}</h2>
        <p class="mt-4 max-w-3xl text-[16px] text-fg/90">{{ 'home.costs.lead' | translate }}</p>
        <div class="mt-9 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          @for (c of costs; track c.key; let i = $index) {
            <article class="card p-5">
              <div class="flex items-center justify-between">
                <app-icon [name]="c.icon" [size]="36" [stroke]="1.5" class="text-brand-text" />
                <span class="text-[28px] font-extrabold text-line-strong">{{ i + 1 }}</span>
              </div>
              <h3 class="mt-6 text-lg font-extrabold">{{ 'home.costs.' + c.key + '.title' | translate }}</h3>
              <p class="mt-3 border-l-2 border-brand pl-3 text-[13px] font-medium leading-relaxed">{{ 'home.costs.' + c.key + '.formula' | translate }}</p>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ 'home.costs.' + c.key + '.text' | translate }}</p>
            </article>
          }
        </div>

        <div class="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h3 class="text-[26px] font-extrabold leading-tight">{{ 'home.ports.title' | translate }}</h3>
            <p class="mt-4 leading-relaxed text-muted">{{ 'home.ports.text' | translate }}</p>
          </div>
          <table class="w-full text-[15px]">
            <caption class="sr-only">{{ 'home.ports.title' | translate }}</caption>
            <thead class="text-left text-[12px] uppercase tracking-[0.06em] text-muted">
              <tr class="border-b border-line"><th class="py-3 font-semibold">{{ 'home.ports.port' | translate }}</th><th class="py-3 font-semibold">{{ 'home.ports.country' | translate }}</th><th class="py-3 text-right font-semibold">VAT</th></tr>
            </thead>
            <tbody>
              @for (p of ports(); track p.name) {
                <tr class="border-b border-line">
                  <td class="py-4 font-bold">{{ p.name }}</td>
                  <td class="py-4"><span class="flex items-center gap-2.5"><app-flag [code]="p.country" class="w-5" />{{ p.country | countryName: lang.locale() }}</span></td>
                  <td class="py-4 text-right text-lg font-extrabold text-brand-text">{{ p.vat }}%</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.pricing.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5">{{ 'home.pricing.title' | translate }}</h2>
        <div class="mt-9 grid gap-7 lg:grid-cols-3">
          @for (plan of plans; track plan.key) {
            <article class="card flex flex-col p-7" [style.box-shadow]="plan.featured ? 'inset 0 0 0 1px var(--brand)' : null">
              <div class="flex items-center justify-between">
                <span class="text-[16px] uppercase tracking-[0.08em] text-brand-text">{{ 'pricing.' + plan.key + '.name' | translate }}</span>
                @if (plan.featured) { <span class="badge badge--brand">{{ 'pricing.popular' | translate }}</span> }
              </div>
              <p class="mt-6 text-[34px] font-extrabold leading-none">{{ 'pricing.' + plan.key + '.price' | translate }}</p>
              <ul class="mt-7 flex-1 space-y-3 text-[14px]">
                @for (n of [1, 2, 3, 4]; track n) {
                  <li class="flex gap-3"><app-icon name="check" [size]="18" class="text-brand-text" />{{ 'pricing.' + plan.key + '.f' + n | translate }}</li>
                }
              </ul>
              @if (plan.key === 'partner') {
                <a [href]="'mailto:' + partnerMail" class="btn btn-outline mt-8">{{ 'pricing.partner.cta' | translate }}</a>
              } @else {
                <a [routerLink]="calculator()" class="btn mt-8" [class]="plan.featured ? 'btn-primary' : 'btn-outline'">{{ 'pricing.' + plan.key + '.cta' | translate }}</a>
                @if (plan.featured) {
                  <p class="mt-3 text-center text-sm"><a [href]="'/samples/report-' + lang.current() + '.pdf'" target="_blank" rel="noopener" (click)="analytics.track('sample_report_opened')" class="text-brand-text inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"><app-icon name="document" [size]="15" /> {{ 'result.sample' | translate }}</a></p>
                }
              }
            </article>
          }
        </div>
      </div>
    </section>

    <!-- FROM THE BLOG -->
    @if (latest().length) {
      <section id="blog" class="border-t border-line py-16">
        <div class="site">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="eyebrow">{{ 'blog.latest' | translate }}</p>
              <h2 class="h-section mt-5 max-w-3xl">{{ 'blog.latestLead' | translate }}</h2>
            </div>
            <a [routerLink]="blog()" class="link-arrow text-[15px]">{{ 'blog.more' | translate }} <app-icon name="arrow-long" [size]="26" [stroke]="1.5" /></a>
          </div>
          <div class="mt-9 grid gap-7 md:grid-cols-3">
            @for (a of latest(); track a.id) {
              <a [routerLink]="blog() + '/' + a.slug" class="card group flex flex-col p-6 transition hover:-translate-y-1">
                <span class="text-xs font-semibold uppercase tracking-[0.08em] text-brand-text">{{ 'blog.category.' + a.category | translate }}</span>
                <h3 class="mt-4 text-xl font-extrabold leading-tight">{{ a.title }}</h3>
                <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{{ a.description }}</p>
                <span class="mt-auto pt-6 text-xs text-muted">{{ 'blog.minutes' | translate: { n: a.minutes } }}</span>
              </a>
            }
          </div>
        </div>
      </section>
    }

    <app-faq-section />

    <!-- FINAL CTA -->
    <section class="site pb-4 pt-6">
      <div class="theme-dark relative grid items-center gap-8 overflow-hidden rounded-[4px] bg-panel p-8 text-fg sm:p-10 lg:grid-cols-[1fr_1fr] lg:p-[50px]">
        <div class="relative z-10">
          <h2 class="h-section"><span class="text-brand">{{ 'home.final.title1' | translate }}</span> {{ 'home.final.title2' | translate }}</h2>
          <p class="mt-6 max-w-lg leading-relaxed text-fg/85">{{ 'home.final.text' | translate }}</p>
          <div class="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a [routerLink]="calculator()" class="btn btn-primary"><app-icon name="calculator" [size]="18" /> {{ 'home.final.cta' | translate }}</a>
            <a [routerLink]="about()" class="link-arrow text-[15px]">{{ 'home.final.about' | translate }} <app-icon name="arrow-long" [size]="26" [stroke]="1.5" /></a>
          </div>
        </div>
        <img src="/images/hero-car-900.webp" width="900" height="470" loading="lazy" decoding="async" alt=""
             class="pointer-events-none -mb-6 w-full max-w-[560px] justify-self-end lg:-mr-10" />
      </div>
    </section>
  `,
})
export class HomePage {
  /** Newest articles in the current language (route resolver). */
  readonly posts = input<BlogArticle[]>([]);
  protected readonly latest = computed(() => this.posts().slice(0, 3));
  protected readonly blog = computed(() => `/${this.lang.current()}/blog`);

  protected readonly lang = inject(LanguageService);
  protected readonly analytics = inject(AnalyticsService);
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly about = computed(() => pathFor('about', this.lang.current()));
  protected readonly partnerMail = 'cargloapp@gmail.com';
  protected readonly strip = ['instant', 'items', 'ports'];

  /** Two tall tiles next to the wide preview, then a row of four, the last one inverted. */
  protected readonly benefits: Benefit[] = [
    { key: 'instant', icon: 'timer' },
    { key: 'independent', icon: 'scale' },
    { key: 'ports', icon: 'anchor' },
    { key: 'scenarios', icon: 'pie' },
    { key: 'after', icon: 'list' },
    { key: 'report', icon: 'document', highlight: true },
  ];

  protected readonly costGroups: CostGroup[] = [
    { key: 'purchase', icon: 'banknote', items: 4 },
    { key: 'transport', icon: 'ship', items: 5 },
    { key: 'taxes', icon: 'landmark', items: 4 },
    { key: 'after', icon: 'document', items: 5 },
    { key: 'risks', icon: 'warning', items: 4 },
  ];

  protected readonly compareRows: { n: number; self: 'yes' | 'part' | 'no'; broker: 'yes' | 'part' | 'no' }[] = [
    { n: 1, self: 'part', broker: 'part' },
    { n: 2, self: 'no', broker: 'no' },
    { n: 3, self: 'part', broker: 'part' },
    { n: 4, self: 'no', broker: 'part' },
    { n: 5, self: 'no', broker: 'no' },
    { n: 6, self: 'part', broker: 'no' },
    { n: 7, self: 'yes', broker: 'no' },
  ];

  protected readonly steps: { key: string; icon: IconName }[] = [
    { key: 's1', icon: 'globe' },
    { key: 's2', icon: 'PASSENGER_CAR' },
    { key: 's3', icon: 'map-pin' },
    { key: 's4', icon: 'pie' },
  ];

  protected readonly costs: { key: string; icon: IconName }[] = [
    { key: 'cif', icon: 'ship' },
    { key: 'duty', icon: 'landmark' },
    { key: 'excise', icon: 'receipt' },
    { key: 'vat', icon: 'percent' },
  ];

  /** The usual entry ports, with the main port of the visitor's country (by language) first. */
  protected readonly ports = computed(() => {
    const base = [
      { name: 'Bremerhaven', country: 'DE', vat: 19 },
      { name: 'Rotterdam', country: 'NL', vat: 21 },
      { name: 'Gdynia', country: 'PL', vat: 23 },
      { name: 'Klaipėda', country: 'LT', vat: 21 },
      { name: 'Koper', country: 'SI', vat: 22 },
      { name: 'Constanța', country: 'RO', vat: 21 },
    ];
    const home = MAIN_PORT[this.lang.info().country];
    if (!home) {
      return base;
    }
    return [home, ...base.filter((p) => p.name !== home.name)].slice(0, 6);
  });

  protected readonly plans: { key: string; featured: boolean }[] = [
    { key: 'free', featured: false },
    { key: 'report', featured: true },
    { key: 'partner', featured: false },
  ];

  protected range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }
}

/** Main car port of each coastal member state with its import VAT; landlocked countries keep the default list. */
const MAIN_PORT: Record<string, { name: string; country: string; vat: number }> = {
  BE: { name: 'Antwerpen', country: 'BE', vat: 21 },
  BG: { name: 'Varna', country: 'BG', vat: 20 },
  CY: { name: 'Limassol', country: 'CY', vat: 19 },
  DE: { name: 'Bremerhaven', country: 'DE', vat: 19 },
  DK: { name: 'Aarhus', country: 'DK', vat: 25 },
  EE: { name: 'Tallinn (Muuga)', country: 'EE', vat: 24 },
  ES: { name: 'Valencia', country: 'ES', vat: 21 },
  FI: { name: 'Hanko', country: 'FI', vat: 25.5 },
  FR: { name: 'Le Havre', country: 'FR', vat: 20 },
  GR: { name: 'Piraeus', country: 'GR', vat: 24 },
  HR: { name: 'Rijeka', country: 'HR', vat: 25 },
  IE: { name: 'Dublin', country: 'IE', vat: 23 },
  IT: { name: 'Genova', country: 'IT', vat: 22 },
  LT: { name: 'Klaipėda', country: 'LT', vat: 21 },
  LV: { name: 'Rīga', country: 'LV', vat: 21 },
  MT: { name: 'Marsaxlokk', country: 'MT', vat: 18 },
  NL: { name: 'Rotterdam', country: 'NL', vat: 21 },
  PL: { name: 'Gdynia', country: 'PL', vat: 23 },
  PT: { name: 'Lisboa', country: 'PT', vat: 23 },
  RO: { name: 'Constanța', country: 'RO', vat: 21 },
  SE: { name: 'Göteborg', country: 'SE', vat: 25 },
  SI: { name: 'Koper', country: 'SI', vat: 22 },
};
