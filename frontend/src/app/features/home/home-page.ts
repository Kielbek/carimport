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
import { CarVisual } from './car-visual';
import { ContactSection } from './contact-section';
import { FaqSection } from './faq-section';
import { WorldMap } from './world-map';

interface Service { key: string; icon: IconName; to: 'calculator' | 'contact' | 'pricing'; highlight?: boolean }

/** Landing page - prerendered per language; content-rich for search, with the calculator one click away. */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslatePipe, CountryNamePipe, Flag, Icon, CarVisual, WorldMap, FaqSection, ContactSection],
  template: `
    <!-- HERO: always dark, like a studio shot -->
    <section class="theme-dark relative isolate overflow-hidden bg-bg text-fg">
      <div class="hero absolute inset-0 -z-20"></div>
      <div class="neon-ring -z-10 !right-[8%] !top-[12%] !size-[420px] max-lg:!size-[260px]"></div>
      <div class="neon-bar -z-10 !right-[4%] !top-[18%]"></div>
      <div class="neon-bar -z-10 !right-[9%] !top-[26%] !h-[180px] !opacity-40 max-lg:hidden"></div>

      <div class="site relative grid min-h-[640px] items-center gap-6 pb-10 pt-14 lg:grid-cols-[1fr_1.1fr] lg:pb-24">
        <div class="relative z-10">
          <p class="eyebrow">{{ 'home.hero.eyebrow' | translate }}</p>
          <h1 class="h-display mt-5">
            <span class="block text-brand">{{ 'home.hero.title1' | translate }}</span>
            <span class="block">{{ 'home.hero.title2' | translate }}</span>
          </h1>
          <p class="lead mt-7 max-w-[520px] !text-fg/85">{{ 'home.hero.lead' | translate }}</p>
          <div class="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a [routerLink]="calculator()" class="btn btn-primary"><app-icon name="calculator" [size]="18" /> {{ 'home.hero.cta' | translate }}</a>
            <a routerLink="." fragment="contact" class="link-arrow !text-brand">{{ 'home.hero.secondary' | translate }} <app-icon name="arrow-right" [size]="18" /></a>
          </div>
        </div>

        <div class="relative lg:-mr-24">
          @if (heroImage) {
            <img [src]="heroImage" alt="" class="w-full rounded-[6px] object-cover [mask-image:linear-gradient(90deg,transparent,black_25%)]" fetchpriority="high" />
          } @else {
            <app-car-visual class="mx-auto max-w-[820px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" [label]="'home.hero.visual' | translate" />
          }
        </div>

        <dl class="relative z-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:absolute lg:inset-x-5 lg:bottom-8 lg:grid-cols-4">
          @for (k of strip; track k; let first = $first) {
            <div [class]="first ? '' : 'lg:border-l lg:border-line lg:pl-8'">
              <dt class="font-extrabold">{{ 'home.strip.' + k + '.title' | translate }}</dt>
              <dd class="mt-1 text-xs text-muted">{{ 'home.strip.' + k + '.text' | translate }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <!-- MAP -->
    <section id="countries" class="site py-20">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">{{ 'home.map.eyebrow' | translate }}</p>
          <h2 class="h-section mt-4 max-w-2xl">{{ 'home.map.title' | translate }}</h2>
        </div>
        <p class="lead max-w-md">{{ 'home.map.lead' | translate }}</p>
      </div>
      <div class="mt-10"><app-world-map /></div>
    </section>

    <!-- SERVICES (layout from the brand template: one wide visual card + icon cards) -->
    <section id="services" class="relative overflow-hidden border-y border-line bg-bg-soft py-20">
      <div class="site">
        <p class="eyebrow">{{ 'home.services.eyebrow' | translate }}</p>
        <h2 class="h-section mt-4">{{ 'home.services.title' | translate }}</h2>
        <p class="lead mt-4">{{ 'home.services.lead' | translate }}</p>

        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a [routerLink]="calculator()" class="theme-dark group relative min-h-[320px] overflow-hidden rounded-[6px] bg-ink sm:col-span-2">
            <div class="neon-ring !-right-16 !-top-20 !size-[300px] opacity-40"></div>
            <app-car-visual class="absolute -right-8 top-4 w-[100%] transition duration-500 group-hover:-translate-x-3 sm:top-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <span class="text-sm font-semibold uppercase tracking-[0.18em] text-brand">{{ 'home.services.calc.tag' | translate }}</span>
              <h3 class="mt-2 text-2xl font-extrabold">{{ 'home.services.calc.title' | translate }}</h3>
              <p class="mt-1 max-w-md text-sm text-white/80">{{ 'home.services.calc.text' | translate }}</p>
            </div>
          </a>

          @for (s of services; track s.key) {
            <a [routerLink]="s.to === 'calculator' ? calculator() : '.'" [fragment]="s.to === 'calculator' ? undefined : s.to"
               class="group relative flex min-h-[260px] flex-col rounded-[6px] border p-6 transition duration-200 hover:-translate-y-1"
               [class]="s.highlight ? 'border-brand bg-brand text-brand-ink' : 'border-line bg-panel hover:border-line-strong'">
              <div class="flex items-start justify-between gap-3">
                <app-icon [name]="s.icon" [size]="40" [stroke]="1.4" [class]="s.highlight ? 'text-brand-ink' : 'text-accent-text'" />
                <span class="text-right text-[13px] font-semibold uppercase tracking-[0.16em]" [class]="s.highlight ? '' : 'text-accent-text'">{{ 'home.services.' + s.key + '.tag' | translate }}</span>
              </div>
              <h3 class="mt-8 text-xl font-extrabold leading-tight">{{ 'home.services.' + s.key + '.title' | translate }}</h3>
              <p class="mt-2 text-sm leading-relaxed" [class]="s.highlight ? 'text-brand-ink/75' : 'text-muted'">{{ 'home.services.' + s.key + '.text' | translate }}</p>
              <span class="ml-auto mt-auto grid size-10 place-items-center rounded-full transition group-hover:translate-x-1"
                    [class]="s.highlight ? 'bg-brand-ink text-brand' : 'bg-brand text-brand-ink'">
                <app-icon name="arrow-right" [size]="20" />
              </span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="site py-20">
      <p class="eyebrow">{{ 'home.how.eyebrow' | translate }}</p>
      <h2 class="h-section mt-4 max-w-2xl">{{ 'home.how.title' | translate }}</h2>
      <ol class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        @for (s of steps; track s.key; let i = $index) {
          <li class="card card-hover flex flex-col p-6">
            <div class="flex items-center justify-between">
              <span class="grid size-12 place-items-center rounded-[6px] bg-accent-soft text-accent-text"><app-icon [name]="s.icon" [size]="24" /></span>
              <span class="text-4xl font-extrabold text-line-strong">0{{ i + 1 }}</span>
            </div>
            <h3 class="mt-8 text-lg font-extrabold">{{ 'home.how.' + s.key + '.title' | translate }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ 'home.how.' + s.key + '.text' | translate }}</p>
          </li>
        }
      </ol>
    </section>

    <!-- NUMBERS -->
    <section class="theme-dark relative overflow-hidden bg-bg py-20 text-fg">
      <div class="hero absolute inset-0 opacity-70"></div>
      <div class="site relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p class="text-[13px] font-semibold uppercase tracking-[0.18em] text-fg/70">{{ 'home.numbers.eyebrow' | translate }}</p>
          <h2 class="h-section mt-4 max-w-lg">{{ 'home.numbers.title' | translate }}</h2>
          <span class="mt-6 block h-0.5 w-32 bg-brand"></span>
        </div>
        <dl class="grid grid-cols-2">
          @for (n of [1, 2, 3, 4]; track n; let i = $index) {
            <div class="py-6" [class]="(i % 2 ? 'border-l border-line pl-8' : 'pr-8') + (i < 2 ? ' border-b border-line' : '')">
              <dt class="text-[44px] font-extrabold leading-none text-brand sm:text-[56px]">{{ 'home.numbers.n' + n + '.value' | translate }}</dt>
              <dd class="mt-3 text-sm text-muted">{{ 'home.numbers.n' + n + '.label' | translate }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <!-- COSTS EXPLAINED -->
    <section id="costs" class="site py-20">
      <p class="eyebrow">{{ 'home.costs.eyebrow' | translate }}</p>
      <h2 class="h-section mt-4 max-w-3xl">{{ 'home.costs.title' | translate }}</h2>
      <p class="lead mt-4 max-w-3xl">{{ 'home.costs.lead' | translate }}</p>
      <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        @for (c of costs; track c.key; let i = $index) {
          <article class="card relative overflow-hidden p-6">
            <span class="absolute inset-x-0 top-0 h-1" [style.background]="c.color"></span>
            <app-icon [name]="c.icon" [size]="26" class="text-accent-text" />
            <h3 class="mt-5 text-lg font-extrabold">{{ i + 1 }}. {{ 'home.costs.' + c.key + '.title' | translate }}</h3>
            <p class="mt-3 rounded-[4px] bg-bg-soft px-3 py-2 font-mono text-[12px] leading-relaxed">{{ 'home.costs.' + c.key + '.formula' | translate }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ 'home.costs.' + c.key + '.text' | translate }}</p>
          </article>
        }
      </div>
      <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <h3 class="text-2xl font-extrabold">{{ 'home.ports.title' | translate }}</h3>
          <p class="mt-3 leading-relaxed text-muted">{{ 'home.ports.text' | translate }}</p>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <caption class="sr-only">{{ 'home.ports.title' | translate }}</caption>
            <thead class="bg-bg-soft text-left text-[12px] uppercase tracking-wider text-muted">
              <tr><th class="px-5 py-3 font-semibold">{{ 'home.ports.port' | translate }}</th><th class="px-5 py-3 font-semibold">{{ 'home.ports.country' | translate }}</th><th class="px-5 py-3 text-right font-semibold">VAT</th></tr>
            </thead>
            <tbody class="divide-y divide-line">
              @for (p of ports; track p.name) {
                <tr class="transition hover:bg-bg-soft">
                  <td class="px-5 py-3.5 font-semibold"><span class="flex items-center gap-2.5"><app-icon name="anchor" [size]="16" class="text-accent-text" />{{ p.name }}</span></td>
                  <td class="px-5 py-3.5"><span class="flex items-center gap-2.5"><app-flag [code]="p.country" class="w-5" />{{ p.country | countryName: lang.locale() }}</span></td>
                  <td class="px-5 py-3.5 text-right font-bold tabular-nums">{{ p.vat }}%</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="border-y border-line bg-bg-soft py-20">
      <div class="site">
        <p class="eyebrow">{{ 'home.pricing.eyebrow' | translate }}</p>
        <h2 class="h-section mt-4">{{ 'home.pricing.title' | translate }}</h2>
        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          @for (plan of plans; track plan.key) {
            <article class="card relative flex flex-col p-7" [class.!border-brand]="plan.featured" [style.box-shadow]="plan.featured ? '0 0 0 1px var(--brand)' : null">
              @if (plan.featured) { <span class="badge badge--brand absolute -top-3 left-7">{{ 'pricing.popular' | translate }}</span> }
              <app-icon [name]="plan.icon" [size]="28" [class]="plan.featured ? 'text-brand-text' : 'text-accent-text'" />
              <h3 class="mt-5 text-xl font-extrabold">{{ 'pricing.' + plan.key + '.name' | translate }}</h3>
              <p class="mt-2 text-3xl font-extrabold">{{ 'pricing.' + plan.key + '.price' | translate }}</p>
              <ul class="mt-6 flex-1 space-y-3 text-sm">
                @for (n of [1, 2, 3, 4]; track n) {
                  <li class="flex gap-2.5"><app-icon name="check" [size]="18" class="text-success" />{{ 'pricing.' + plan.key + '.f' + n | translate }}</li>
                }
              </ul>
              <a [routerLink]="plan.key === 'partner' ? '.' : calculator()" [fragment]="plan.key === 'partner' ? 'contact' : undefined"
                 class="btn mt-8" [class]="plan.featured ? 'btn-primary' : 'btn-outline'">{{ 'pricing.' + plan.key + '.cta' | translate }}</a>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- B2B -->
    <section id="partners" class="site pt-20">
      <div class="theme-dark relative overflow-hidden rounded-[6px] bg-ink px-7 py-12 text-fg sm:px-12">
        <div class="neon-ring !-right-20 !-top-24 !size-[300px] opacity-40"></div>
        <div class="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p class="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">{{ 'home.partners.eyebrow' | translate }}</p>
            <h2 class="mt-4 text-3xl font-extrabold sm:text-[36px]">{{ 'home.partners.title' | translate }}</h2>
            <p class="mt-4 max-w-xl leading-relaxed text-muted">{{ 'home.partners.text' | translate }}</p>
          </div>
          <ul class="space-y-3 text-sm text-fg/85">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex gap-3"><app-icon name="check-circle" [size]="20" class="text-brand" />{{ 'home.partners.b' + n | translate }}</li>
            }
            <li class="pt-3"><a [href]="'mailto:' + partnerMail" class="btn btn-primary">{{ 'home.partners.cta' | translate }}</a></li>
          </ul>
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
  protected readonly strip = ['brand', 'docs', 'routes', 'fx'];

  protected readonly services: Service[] = [
    { key: 'report', icon: 'document', to: 'calculator' },
    { key: 'fx', icon: 'exchange', to: 'calculator' },
    { key: 'vin', icon: 'search', to: 'calculator' },
    { key: 'finance', icon: 'wallet', to: 'calculator' },
    { key: 'docs', icon: 'list', to: 'calculator' },
    { key: 'partner', icon: 'handshake', to: 'contact', highlight: true },
  ];

  protected readonly steps: { key: string; icon: IconName }[] = [
    { key: 's1', icon: 'globe' },
    { key: 's2', icon: 'PASSENGER_CAR' },
    { key: 's3', icon: 'pie' },
    { key: 's4', icon: 'document' },
  ];

  protected readonly costs: { key: string; icon: IconName; color: string }[] = [
    { key: 'cif', icon: 'ship', color: 'var(--accent)' },
    { key: 'duty', icon: 'landmark', color: '#38bdf8' },
    { key: 'excise', icon: 'receipt', color: 'var(--brand)' },
    { key: 'vat', icon: 'percent', color: '#94a3b8' },
  ];

  protected readonly ports = [
    { name: 'Bremerhaven', country: 'DE', vat: 19 },
    { name: 'Hamburg', country: 'DE', vat: 19 },
    { name: 'Rotterdam', country: 'NL', vat: 21 },
    { name: 'Antwerpen', country: 'BE', vat: 21 },
    { name: 'Gdynia', country: 'PL', vat: 23 },
  ];

  protected readonly plans: { key: string; icon: IconName; featured: boolean }[] = [
    { key: 'free', icon: 'pie', featured: false },
    { key: 'report', icon: 'document', featured: true },
    { key: 'partner', icon: 'handshake', featured: false },
  ];
}
