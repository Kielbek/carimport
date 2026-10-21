import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { CountryNamePipe } from '../../core/format/country-name.pipe';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { FaqSection } from './faq-section';

interface OriginCard { code: string; auctions: string; days: string; currency: string }

/** Landing page - prerendered per language; content-rich for search, with the calculator one click away. */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslatePipe, CountryNamePipe, Flag, Icon, FaqSection],
  template: `
    <!-- HERO -->
    <section class="hero relative isolate overflow-hidden border-b border-line">
      <div class="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60"></div>
      <div class="neon-ring -z-10"></div><div class="neon-bar -z-10"></div>
      <div class="site grid items-center gap-12 pb-16 pt-14 lg:min-h-[620px] lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p class="eyebrow">{{ 'home.hero.eyebrow' | translate }}</p>
          <h1 class="h-display mt-5">
            <span class="block text-brand-text">{{ 'home.hero.title1' | translate }}</span>
            <span class="block">{{ 'home.hero.title2' | translate }}</span>
          </h1>
          <p class="lead mt-7 max-w-[540px]">{{ 'home.hero.lead' | translate }}</p>
          <div class="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a [routerLink]="calculator()" class="btn btn-primary">
              <app-icon name="calculator" [size]="18" /> {{ 'home.hero.cta' | translate }}
            </a>
            <a routerLink="." fragment="how-it-works" class="link-arrow">{{ 'home.hero.secondary' | translate }} <app-icon name="arrow-right" [size]="18" /></a>
          </div>
          <dl class="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            @for (f of facts; track f.key) {
              <div class="sm:border-l sm:border-line sm:pl-5 sm:first:border-0 sm:first:pl-0">
                <dt class="text-[22px] font-extrabold">{{ 'home.facts.' + f.key + '.value' | translate }}</dt>
                <dd class="mt-1 text-xs text-muted">{{ 'home.facts.' + f.key + '.label' | translate }}</dd>
              </div>
            }
          </dl>
        </div>

        <!-- example quote card: illustrates the free result, clearly labelled as an example -->
        <figure class="result-card mx-auto w-full max-w-[440px]" [attr.aria-label]="'home.example.title' | translate">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{{ 'home.example.title' | translate }}</span>
            <span class="badge badge--brand">{{ 'home.example.badge' | translate }}</span>
          </div>
          <p class="mt-4 text-[34px] font-extrabold tracking-tight text-brand">86 200 – 93 500 zł</p>
          <p class="mt-1 text-sm text-white/60">{{ 'home.example.caption' | translate }}</p>
          <div class="mt-6 flex h-2.5 overflow-hidden rounded-full bg-white/10">
            @for (s of exampleShares; track s.key) {
              <span [style.width.%]="s.pct" [style.background]="s.color"></span>
            }
          </div>
          <ul class="mt-5 space-y-2.5 text-sm">
            @for (s of exampleShares; track s.key) {
              <li class="flex items-center justify-between">
                <span class="flex items-center gap-2.5 text-white/80"><span class="size-2.5 rounded-[2px]" [style.background]="s.color"></span>{{ 'category.' + s.key | translate }}</span>
                <span class="font-semibold tabular-nums">{{ s.pct }}%</span>
              </li>
            }
          </ul>
          <div class="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/60">
            <app-flag code="USA" class="w-6" /> <app-icon name="arrow-right" [size]="14" />
            <app-flag code="DE" class="w-6" /> <app-icon name="arrow-right" [size]="14" />
            <app-flag code="PL" class="w-6" />
            <span class="ml-auto">{{ 'home.example.route' | translate }}</span>
          </div>
        </figure>
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

    <!-- COUNTRIES -->
    <section id="countries" class="border-y border-line bg-bg-soft py-20">
      <div class="site">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow">{{ 'home.countries.eyebrow' | translate }}</p>
            <h2 class="h-section mt-4">{{ 'home.countries.title' | translate }}</h2>
          </div>
          <p class="lead max-w-md">{{ 'home.countries.lead' | translate }}</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          @for (o of origins; track o.code) {
            <a [routerLink]="calculator()" [queryParams]="{ from: o.code }" class="card card-hover group flex flex-col p-5">
              <app-flag [code]="o.code" class="w-14" />
              <h3 class="mt-5 text-lg font-extrabold">{{ 'origin.' + o.code | translate }}</h3>
              <dl class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between gap-2"><dt class="text-muted">{{ 'home.countries.auctions' | translate }}</dt><dd class="text-right font-medium">{{ o.auctions }}</dd></div>
                <div class="flex justify-between gap-2"><dt class="text-muted">{{ 'home.countries.sea' | translate }}</dt><dd class="font-medium">{{ o.days }} {{ 'home.countries.days' | translate }}</dd></div>
                <div class="flex justify-between gap-2"><dt class="text-muted">{{ 'home.countries.currency' | translate }}</dt><dd class="font-medium">{{ o.currency }}</dd></div>
              </dl>
              <span class="link-arrow mt-6 text-sm">{{ 'home.countries.cta' | translate }} <app-icon name="arrow-right" [size]="16" /></span>
            </a>
          }
        </div>
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
              <a [routerLink]="calculator()" class="btn mt-8" [class]="plan.featured ? 'btn-primary' : 'btn-outline'">{{ 'pricing.' + plan.key + '.cta' | translate }}</a>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- B2B -->
    <section id="partners" class="site pt-20">
      <div class="relative overflow-hidden rounded-[6px] bg-ink px-7 py-12 text-white sm:px-12">
        <div class="neon-ring !-right-20 !-top-24 !size-[300px] opacity-40"></div>
        <div class="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p class="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">{{ 'home.partners.eyebrow' | translate }}</p>
            <h2 class="mt-4 text-3xl font-extrabold sm:text-[36px]">{{ 'home.partners.title' | translate }}</h2>
            <p class="mt-4 max-w-xl leading-relaxed text-white/70">{{ 'home.partners.text' | translate }}</p>
          </div>
          <ul class="space-y-3 text-sm text-white/85">
            @for (n of [1, 2, 3]; track n) {
              <li class="flex gap-3"><app-icon name="check-circle" [size]="20" class="text-brand" />{{ 'home.partners.b' + n | translate }}</li>
            }
            <li class="pt-3"><a [href]="'mailto:' + partnerMail" class="btn btn-primary">{{ 'home.partners.cta' | translate }}</a></li>
          </ul>
        </div>
      </div>
    </section>

    <app-faq-section />

    <!-- FINAL CTA -->
    <section class="site">
      <div class="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 class="text-2xl font-extrabold sm:text-3xl">{{ 'home.final.title' | translate }}</h2>
          <p class="mt-2 text-muted">{{ 'home.final.text' | translate }}</p>
        </div>
        <a [routerLink]="calculator()" class="btn btn-primary shrink-0">{{ 'home.hero.cta' | translate }} <app-icon name="arrow-right" [size]="18" /></a>
      </div>
    </section>
  `,
})
export class HomePage {
  protected readonly lang = inject(LanguageService);
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly partnerMail = 'partnerzy@carimport.eu';

  protected readonly facts = [{ key: 'origins' }, { key: 'eu' }, { key: 'fx' }, { key: 'time' }];

  protected readonly exampleShares = [
    { key: 'VEHICLE', pct: 54, color: 'var(--accent)' },
    { key: 'TRANSPORT', pct: 12, color: '#38bdf8' },
    { key: 'TAXES', pct: 31, color: 'var(--brand)' },
    { key: 'REGISTRATION', pct: 3, color: '#94a3b8' },
  ];

  protected readonly steps: { key: string; icon: IconName }[] = [
    { key: 's1', icon: 'globe' },
    { key: 's2', icon: 'PASSENGER_CAR' },
    { key: 's3', icon: 'pie' },
    { key: 's4', icon: 'document' },
  ];

  protected readonly origins: OriginCard[] = [
    { code: 'USA', auctions: 'Copart · IAAI', days: '13–40', currency: 'USD' },
    { code: 'CANADA', auctions: 'Copart · IAAI', days: '11–20', currency: 'CAD' },
    { code: 'JAPAN', auctions: 'USS', days: '40–48', currency: 'JPY' },
    { code: 'UAE', auctions: 'Copart · Emirates', days: '24–30', currency: 'AED' },
    { code: 'UK', auctions: 'Copart · IAAI', days: '2–6', currency: 'GBP' },
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
