import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { contactEmail } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';

/**
 * About us: who stands behind the calculator, what it is and - just as important for trust - what it is not
 * (no importer, no dealer, no commission), where the numbers come from and how the service earns money.
 */
@Component({
  selector: 'app-about-page',
  imports: [RouterLink, TranslatePipe, Icon],
  template: `
    <!-- intro -->
    <section class="theme-dark hero relative isolate overflow-hidden text-fg">
      <div class="site grid items-center gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:py-20">
        <div class="relative z-10">
          <p class="eyebrow">{{ 'about.eyebrow' | translate }}</p>
          <h1 class="h-display mt-5 !text-[clamp(2.2rem,5vw,3.6rem)]">
            <span class="block text-brand">{{ 'about.title1' | translate }}</span>
            <span class="block">{{ 'about.title2' | translate }}</span>
          </h1>
          <p class="mt-7 max-w-[560px] text-[16px] leading-[1.55] text-fg/90">{{ 'about.lead' | translate }}</p>
        </div>
        <img src="/images/hero-car-900.webp" width="900" height="470" decoding="async" fetchpriority="high"
             [alt]="'home.hero.visual' | translate" class="hero-car w-full lg:-mr-16" />
      </div>
    </section>

    <!-- story -->
    <section class="site grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p class="eyebrow">{{ 'about.story.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5">{{ 'about.story.title' | translate }}</h2>
        <span class="mt-6 block h-px w-36 bg-brand"></span>
      </div>
      <div class="space-y-5 text-[16px] leading-relaxed text-fg/90">
        @for (n of [1, 2, 3]; track n) { <p>{{ 'about.story.p' + n | translate }}</p> }
      </div>
    </section>

    <!-- is / is not -->
    <section class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'about.role.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'about.role.title' | translate }}</h2>
        <div class="mt-9 grid gap-7 md:grid-cols-2">
          <div class="card p-7" style="box-shadow: inset 0 0 0 1px var(--brand)">
            <h3 class="flex items-center gap-3 text-xl font-extrabold"><app-icon name="check-circle" [size]="26" class="text-brand-text" /> {{ 'about.role.is' | translate }}</h3>
            <ul class="mt-6 space-y-3.5 text-[15px]">
              @for (n of [1, 2, 3, 4]; track n) {
                <li class="flex gap-3"><app-icon name="check" [size]="18" class="mt-0.5 shrink-0 text-brand-text" />{{ 'about.role.is' + n | translate }}</li>
              }
            </ul>
          </div>
          <div class="card p-7">
            <h3 class="flex items-center gap-3 text-xl font-extrabold"><app-icon name="x" [size]="26" class="text-muted" /> {{ 'about.role.isNot' | translate }}</h3>
            <ul class="mt-6 space-y-3.5 text-[15px] text-fg/85">
              @for (n of [1, 2, 3, 4]; track n) {
                <li class="flex gap-3"><app-icon name="x" [size]="18" class="mt-0.5 shrink-0 text-muted" />{{ 'about.role.isNot' + n | translate }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- data sources -->
    <section class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'about.data.eyebrow' | translate }}</p>
        <h2 class="h-section mt-5 max-w-3xl">{{ 'about.data.title' | translate }}</h2>
        <p class="mt-4 max-w-3xl text-[16px] text-fg/90">{{ 'about.data.lead' | translate }}</p>
        <div class="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          @for (s of sources; track s.key) {
            <article class="card flex flex-col p-5">
              <app-icon [name]="s.icon" [size]="38" [stroke]="1.5" class="text-brand-text" />
              <h3 class="mt-6 text-lg font-extrabold">{{ 'about.data.' + s.key + '.title' | translate }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ 'about.data.' + s.key + '.text' | translate }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- money -->
    <section class="border-t border-line py-16">
      <div class="site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <p class="eyebrow">{{ 'about.money.eyebrow' | translate }}</p>
          <h2 class="h-section mt-5">{{ 'about.money.title' | translate }}</h2>
          <p class="mt-4 leading-relaxed text-muted">{{ 'about.money.lead' | translate }}</p>
        </div>
        <ol class="divide-y divide-line border-y border-line">
          @for (n of [1, 2, 3]; track n) {
            <li class="flex gap-5 py-5">
              <span class="text-[28px] font-extrabold leading-none text-brand-text">{{ n }}</span>
              <span>
                <span class="block font-bold">{{ 'about.money.m' + n + '.title' | translate }}</span>
                <span class="mt-1 block text-sm leading-relaxed text-muted">{{ 'about.money.m' + n + '.text' | translate }}</span>
              </span>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- values -->
    <section class="border-t border-line py-16">
      <div class="site">
        <p class="eyebrow">{{ 'about.values.eyebrow' | translate }}</p>
        <div class="mt-8 grid gap-10 md:grid-cols-3">
          @for (v of values; track v.key) {
            <div>
              <app-icon [name]="v.icon" [size]="34" [stroke]="1.5" class="text-brand-text" />
              <h3 class="mt-5 text-xl font-extrabold">{{ 'about.values.' + v.key + '.title' | translate }}</h3>
              <p class="mt-3 text-[15px] leading-relaxed text-fg/85">{{ 'about.values.' + v.key + '.text' | translate }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="site pb-4 pt-6">
      <div class="theme-dark flex flex-col items-start gap-6 rounded-[4px] bg-panel p-8 text-fg sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-[50px]">
        <div>
          <h2 class="text-[28px] font-extrabold leading-tight">{{ 'about.cta.title' | translate }}</h2>
          <p class="mt-3 max-w-xl text-fg/85">{{ 'about.cta.text' | translate: { email: email() } }}</p>
        </div>
        <a [routerLink]="calculator()" class="btn btn-primary shrink-0"><app-icon name="calculator" [size]="18" /> {{ 'home.hero.cta' | translate }}</a>
      </div>
    </section>
  `,
})
export class AboutPage {
  private readonly lang = inject(LanguageService);
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly email = computed(() => contactEmail(this.lang.current()));

  protected readonly sources: { key: string; icon: IconName }[] = [
    { key: 'customs', icon: 'landmark' },
    { key: 'fx', icon: 'exchange' },
    { key: 'fees', icon: 'receipt' },
    { key: 'law', icon: 'scale' },
  ];

  protected readonly values: { key: string; icon: IconName }[] = [
    { key: 'transparency', icon: 'search' },
    { key: 'independence', icon: 'shield' },
    { key: 'precision', icon: 'calculator' },
  ];
}
