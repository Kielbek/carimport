import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Lang, LanguageService } from '../core/i18n/language.service';
import { pathFor } from '../core/routing/paths';
import { Icon } from '../shared/icon/icon';
import { LanguageMenu } from './language-menu';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, Icon, Logo, LanguageMenu, ThemeToggle],
  template: `
    <!-- top bar -->
    <div class="hidden border-b border-line md:block">
      <div class="site flex h-[46px] items-center justify-between text-[12px] text-muted">
        <p class="flex items-center gap-2"><app-icon name="clock" [size]="14" /> {{ 'layout.topbar' | translate }}</p>
        <a [routerLink]="home()" fragment="partners" class="transition hover:text-brand-text">{{ 'layout.forBusiness' | translate }}</a>
      </div>
    </div>

    <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div class="site flex min-h-[74px] items-center justify-between gap-6">
        <a [routerLink]="home()" [attr.aria-label]="'layout.home' | translate"><app-logo /></a>

        <nav class="hidden items-center gap-7 text-[14px] lg:flex" [attr.aria-label]="'layout.nav' | translate">
          <a [routerLink]="calculator()" routerLinkActive="text-brand-text" class="font-semibold transition hover:text-brand-text">{{ 'layout.calculator' | translate }}</a>
          @for (item of anchors; track item.fragment) {
            <a [routerLink]="home()" [fragment]="item.fragment" class="text-fg/85 transition hover:text-brand-text">{{ item.label | translate }}</a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <app-language-menu class="hidden sm:block" [hrefFor]="hrefFor()" />
          <app-theme-toggle />
          <a [routerLink]="calculator()" class="btn btn-primary btn-sm hidden md:inline-flex">
            <app-icon name="calculator" [size]="16" /> {{ 'layout.cta' | translate }}
          </a>
          <button type="button" class="grid size-10 place-items-center rounded-[4px] border border-line lg:hidden"
                  (click)="menu.set(!menu())" [attr.aria-expanded]="menu()" aria-controls="mobile-menu"
                  [attr.aria-label]="'layout.menu' | translate">
            <app-icon [name]="menu() ? 'x' : 'menu'" [size]="18" />
          </button>
        </div>
      </div>

      @if (menu()) {
        <nav id="mobile-menu" class="reveal-enter border-t border-line bg-bg lg:hidden" animate.leave="reveal-leave">
          <div class="site flex flex-col py-3">
            <a [routerLink]="calculator()" (click)="menu.set(false)" class="py-3 font-semibold text-brand-text">{{ 'layout.calculator' | translate }}</a>
            @for (item of anchors; track item.fragment) {
              <a [routerLink]="home()" [fragment]="item.fragment" (click)="menu.set(false)" class="border-t border-line py-3">{{ item.label | translate }}</a>
            }
            <app-language-menu class="mt-3 self-start sm:hidden" [hrefFor]="hrefFor()" />
          </div>
        </nav>
      }
    </header>
  `,
  host: { '(document:keydown.escape)': 'menu.set(false)' },
})
export class SiteHeader {
  readonly hrefFor = input.required<(lang: Lang) => string>();
  private readonly lang = inject(LanguageService);

  protected readonly menu = signal(false);
  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly anchors = [
    { fragment: 'how-it-works', label: 'layout.howItWorks' },
    { fragment: 'countries', label: 'layout.countries' },
    { fragment: 'pricing', label: 'layout.pricing' },
    { fragment: 'faq', label: 'layout.faq' },
  ];
}
