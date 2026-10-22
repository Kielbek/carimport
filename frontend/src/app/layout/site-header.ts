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
    <!-- top bar, as in the brand template -->
    <div class="hidden border-b border-line md:block">
      <div class="site flex h-[50px] items-center justify-between text-[12px] leading-[1.25] text-fg/90">
        <p class="max-w-[520px]">{{ 'layout.topbar' | translate }}</p>
        <a [routerLink]="about()" class="transition hover:text-brand-text">{{ 'layout.about' | translate }}</a>
      </div>
    </div>

    <header class="sticky top-0 z-30 border-b border-line bg-bg">
      <div class="site flex min-h-[78px] items-center justify-between gap-6">
        <a [routerLink]="home()" class="shrink-0" [attr.aria-label]="'layout.home' | translate"><app-logo /></a>

        <nav class="hidden items-center gap-7 text-[14px] text-fg/95 lg:flex" [attr.aria-label]="'layout.nav' | translate">
          <a [routerLink]="calculator()" routerLinkActive="text-brand-text" class="transition hover:text-brand-text">{{ 'layout.calculator' | translate }}</a>
          @for (item of anchors; track item.fragment) {
            <a [routerLink]="home()" [fragment]="item.fragment" class="transition hover:text-brand-text">{{ item.label | translate }}</a>
          }
          <a [routerLink]="about()" routerLinkActive="text-brand-text" class="transition hover:text-brand-text">{{ 'layout.about' | translate }}</a>
        </nav>

        <div class="flex items-center gap-3">
          <app-language-menu class="hidden sm:block" [hrefFor]="hrefFor()" />
          <app-theme-toggle />
          <div class="hidden shrink-0 text-right md:block">
            <a [routerLink]="calculator()" class="block text-[17px] font-extrabold tracking-wide transition hover:text-brand-text">{{ 'layout.cta' | translate }}</a>
            <span class="text-[12px] text-muted">{{ 'layout.ctaHint' | translate }}</span>
          </div>
          <button type="button" class="grid size-10 place-items-center rounded-[2px] border border-line lg:hidden"
                  (click)="menu.set(!menu())" [attr.aria-expanded]="menu()" aria-controls="mobile-menu"
                  [attr.aria-label]="'layout.menu' | translate">
            <app-icon [name]="menu() ? 'x' : 'menu'" [size]="18" />
          </button>
        </div>
      </div>

      @if (menu()) {
        <nav id="mobile-menu" class="reveal-enter border-t border-line bg-bg lg:hidden" animate.leave="reveal-leave">
          <div class="site flex flex-col pb-4 pt-2">
            <a [routerLink]="calculator()" (click)="menu.set(false)" class="py-2.5 text-brand-text">{{ 'layout.calculator' | translate }}</a>
            @for (item of anchors; track item.fragment) {
              <a [routerLink]="home()" [fragment]="item.fragment" (click)="menu.set(false)" class="py-2.5">{{ item.label | translate }}</a>
            }
            <a [routerLink]="about()" (click)="menu.set(false)" class="py-2.5">{{ 'layout.about' | translate }}</a>
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
  protected readonly about = computed(() => pathFor('about', this.lang.current()));
  protected readonly anchors = [
    { fragment: 'why', label: 'layout.why' },
    { fragment: 'what', label: 'layout.what' },
    { fragment: 'how-it-works', label: 'layout.howItWorks' },
    { fragment: 'pricing', label: 'layout.pricing' },
    { fragment: 'faq', label: 'layout.faq' },
  ];
}
