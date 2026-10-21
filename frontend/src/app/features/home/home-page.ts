import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryNamePipe } from '../../core/format/country-name.pipe';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { SITE } from '../../core/site.config';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { ContactSection } from './contact-section';
import { FaqSection } from './faq-section';
import { WorldMap } from './world-map';

interface Tile { key: string; icon: IconName; to: 'calculator' | 'contact'; highlight?: boolean }

/** Landing page, prerendered per language. Layout follows the brand template (autoimport.pro). */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslatePipe, CountryNamePipe, Flag, Icon, WorldMap, FaqSection, ContactSection],
  template: `
    <!-- HERO (always dark, like the template) -->
    <section class="theme-dark hero relative isolate min-h-[600px] overflow-hidden text-fg"
             [class.hero-photo]="heroImage" [style.background-image]="heroImage ? 'url(' + heroImage + ')' : null">
      <div class="neon-ring -z-0"></div>
      <div class="neon-bar -z-0"></div>
      <div class="site relative z-10 flex min-h-[600px] flex-col justify-center pb-28 pt-16">
        <div class="max-w-[620px]">
          <h1 class="h-display">
            <span class="block text-brand">{{ 'home.hero.title1' | translate }}</span>
            <span class="block">{{ 'home.hero.title2' | translate }}</span>
          </h1>
          <p class="mt-8 max-w-[540px] text-[16px] leading-[1.45] text-fg/95">{{ 'home.hero.lead' | translate }}</p>
          <div class="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a [routerLink]="calculator()" class="btn btn-outline">{{ 'home.hero.cta' | translate }}</a>
            <a routerLink="." fragment="contact" class="link-arrow text-[15px]">{{ 'home.hero.secondary' | translate }} <app-icon name="arrow-long" [size]="26" [stroke]="1.5" /></a>
          </div>
        </div>

        <dl class="mt-14 grid grid-cols-2 gap-5 border-t border-line pt-5 md:absolute md:inset-x-5 md:bottom-0 md:mt-0 md:grid-cols-4 md:border-0 md:pb-6 md:pt-0">
          <div class="text-sm font-bold leading-tight">{{ 'home.strip.brand.title' | translate }}<br>{{ 'home.strip.brand.text' | translate }}</div>
          @for (k of strip; track k) {
            <div class="border-l border-line pl-4 md:pl-8">
              <dt class="font-bold">{{ 'home.strip.' + k + '.title' | translate }}</dt>
              <dd class="mt-1 text-xs text-muted">{{ 'home.strip.' + k + '.text' | translate }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="site py-16">
      <p class="eyebrow">{{ 'home.services.eyebrow' | translate }}</p>
      <h2 class="h-section mt-5">{{ 'home.services.title' | translate }}</h2>
      <p class="mt-4 text-[16px] text-fg/90">{{ 'home.services.lead' | translate }}</p>

      <div class="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        <a [routerLink]="calculator()" class="group relative min-h-[312px] overflow-hidden rounded-[4px] bg-ink sm:col-span-2">
          <img src="/images/calculator-preview.webp" width="1200" height="760" loading="lazy" decoding="async"
               [alt]="'home.services.calc.alt' | translate"
               class="absolute inset-0 h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/10"></div>
          <div class="absolute bottom-5 left-6 right-6 text-white">
            <span class="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{{ 'home.services.calc.tag' | translate }}</span>
            <h3 class="mt-2 text-2xl font-bold">{{ 'home.services.calc.title' | translate }}</h3>
            <p class="mt-1 text-sm text-white/90">{{ 'home.services.calc.text' | translate }}</p>
          </div>
        </a>

        @for (t of tiles; track t.key; let i = $index) {
          <a [routerLink]="t.to === 'calculator' ? calculator() : '.'" [fragment]="t.to === 'contact' ? 'contact' : undefined"
             class="group relative flex flex-col rounded-[4px] p-5 transition duration-200 hover:-translate-y-1"
             [class]="(i < 2 ? 'min-h-[312px] ' : 'min-h-[230px] ') + (t.highlight ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'border border-card-border bg-panel hover:bg-panel-2')">
            <div class="flex items-center justify-between gap-3">
              <app-icon [name]="t.icon" [size]="44" [stroke]="1.5" [class]="t.highlight ? 'text-[#b38600]' : 'text-brand-text'" />
              <span class="text-right text-[16px] uppercase tracking-[0.08em]" [class]="t.highlight ? 'text-[#b38600]' : 'text-brand-text'">{{ 'home.services.' + t.key + '.tag' | translate }}</span>
            </div>
            <h3 class="font-extrabold leading-tight" [class]="i < 2 ? 'mt-9 text-[20px]' : 'mt-8 text-xl'">{{ 'home.services.' + t.key + '.title' | translate }}</h3>
            <p class="mt-3 text-[14px] leading-[1.35]" [class]="t.highlight ? 'text-neutral-700' : 'text-fg/85'">{{ 'home.services.' + t.key + '.text' | translate }}</p>
            <span class="arrow-round ml-auto mt-auto"><app-icon name="arrow-long" [size]="22" /></span>
          </a>
        }
      </div>
    </section>

    <!-- ROUTES MAP -->
    <section id="countries" class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'home.map.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'home.map.title' | translate }}</h2>
        <p class="mt-4 max-w-2xl text-[16px] text-fg/90">{{ 'home.map.lead' | translate }}</p>
        <div class="mt-9"><app-world-map /></div>
      </div>
    </section>

    <!-- NUMBERS (template: "в числах") -->
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
              @for (p of ports; track p.name) {
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
              <a [routerLink]="plan.key === 'partner' ? '.' : calculator()" [fragment]="plan.key === 'partner' ? 'contact' : undefined"
                 class="btn mt-8" [class]="plan.featured ? 'btn-primary' : 'btn-outline'">{{ 'pricing.' + plan.key + '.cta' | translate }}</a>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- FOR IMPORT COMPANIES -->
    <section id="partners" class="border-t border-line py-16">
      <div class="site grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p class="eyebrow">{{ 'home.partners.eyebrow' | translate }}</p>
          <h2 class="h-section mt-5">{{ 'home.partners.title' | translate }}</h2>
          <p class="mt-4 max-w-xl leading-relaxed text-muted">{{ 'home.partners.text' | translate }}</p>
        </div>
        <div>
          <ul class="divide-y divide-line border-y border-line">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex items-center gap-4 py-4 font-medium"><app-icon name="check" [size]="20" class="text-brand-text" />{{ 'home.partners.b' + n | translate }}</li>
            }
          </ul>
          <a [href]="'mailto:' + partnerMail" class="btn btn-outline mt-8">{{ 'home.partners.cta' | translate }}</a>
        </div>
      </div>
    </section>

    <app-faq-section />
    <app-contact-section />
  `,
})
export class HomePage {
  protected readonly lang = inject(LanguageService);
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly heroImage = SITE.heroImage;
  protected readonly partnerMail = 'partnerzy@carimport.eu';
  protected readonly strip = ['docs', 'routes', 'fx'];

  /** Same rhythm as the template: two tall tiles next to the wide visual, then a row of four, last one inverted. */
  protected readonly tiles: Tile[] = [
    { key: 'report', icon: 'document', to: 'calculator' },
    { key: 'fx', icon: 'exchange', to: 'calculator' },
    { key: 'vin', icon: 'search', to: 'calculator' },
    { key: 'finance', icon: 'wallet', to: 'calculator' },
    { key: 'docs', icon: 'list', to: 'calculator' },
    { key: 'partner', icon: 'PASSENGER_CAR', to: 'contact', highlight: true },
  ];

  protected readonly steps: { key: string; icon: IconName }[] = [
    { key: 's1', icon: 'globe' },
    { key: 's2', icon: 'PASSENGER_CAR' },
    { key: 's3', icon: 'pie' },
    { key: 's4', icon: 'document' },
  ];

  protected readonly costs: { key: string; icon: IconName }[] = [
    { key: 'cif', icon: 'ship' },
    { key: 'duty', icon: 'landmark' },
    { key: 'excise', icon: 'receipt' },
    { key: 'vat', icon: 'percent' },
  ];

  protected readonly ports = [
    { name: 'Bremerhaven', country: 'DE', vat: 19 },
    { name: 'Hamburg', country: 'DE', vat: 19 },
    { name: 'Rotterdam', country: 'NL', vat: 21 },
    { name: 'Antwerpen', country: 'BE', vat: 21 },
    { name: 'Gdynia', country: 'PL', vat: 23 },
  ];

  protected readonly plans: { key: string; featured: boolean }[] = [
    { key: 'free', featured: false },
    { key: 'report', featured: true },
    { key: 'partner', featured: false },
  ];
}
