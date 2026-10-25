import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LANGUAGES, LanguageService } from '../core/i18n/language.service';
import { GuideRef, GuideSection, guidePath } from '../core/routing/guide-paths';
import { pathFor } from '../core/routing/paths';
import { SITE } from '../core/site.config';
import { Flag } from '../shared/flag/flag';
import { Icon } from '../shared/icon/icon';
import { Logo } from './logo';
import { NewsletterSignup } from '../features/newsletter/newsletter-signup';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, TranslatePipe, Logo, Flag, Icon, NewsletterSignup],
  template: `
    <footer class="mt-20 border-t border-line">
      <div class="border-b border-line bg-panel">
        <div class="site py-10"><app-newsletter-signup source="footer" /></div>
      </div>
      <div class="site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <app-logo />
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">{{ 'footer.about' | translate }}</p>
          <a [href]="'mailto:' + email" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-text">
            <app-icon name="mail" [size]="16" /> {{ email }}
          </a>
        </div>

        <div>
          <h2 class="label">{{ 'footer.calculators' | translate }}</h2>
          <ul class="space-y-2.5 text-sm">
            @for (o of origins; track o.code) {
              <li>
                <a [routerLink]="calculator()" [queryParams]="{ from: o.code }" class="flex items-center gap-2.5 text-fg/85 hover:text-brand-text">
                  <app-flag [code]="o.code" class="w-5" /> {{ 'footer.importFrom.' + o.code | translate }}
                </a>
              </li>
            }
          </ul>
        </div>

        <div>
          <h2 class="label">{{ 'guide.nav.title' | translate }}</h2>
          <ul class="space-y-2.5 text-sm text-fg/85">
            @for (s of guideSections; track s) {
              <li><a [routerLink]="guide({ section: s, item: null })" class="hover:text-brand-text">{{ 'guide.nav.' + s | translate }}</a></li>
            }
            @if (homeCountry(); as h) {
              <li><a [routerLink]="guide({ section: 'countries', item: h })" class="hover:text-brand-text">{{ countryName(h) }}</a></li>
            }
          </ul>
        </div>

        <div>
          <h2 class="label">{{ 'footer.service' | translate }}</h2>
          <ul class="space-y-2.5 text-sm text-fg/85">
            <li><a [routerLink]="about()" class="hover:text-brand-text">{{ 'layout.about' | translate }}</a></li>
            <li><a [routerLink]="'/' + lang.current() + '/blog'" class="hover:text-brand-text">{{ 'layout.blog' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="what" class="hover:text-brand-text">{{ 'layout.what' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="how-it-works" class="hover:text-brand-text">{{ 'layout.howItWorks' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="pricing" class="hover:text-brand-text">{{ 'layout.pricing' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="faq" class="hover:text-brand-text">{{ 'layout.faq' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="pricing" class="hover:text-brand-text">{{ 'layout.forBusiness' | translate }}</a></li>
            <li><a [routerLink]="terms()" class="hover:text-brand-text">{{ 'footer.terms' | translate }}</a></li>
            <li><a [routerLink]="privacy()" class="hover:text-brand-text">{{ 'footer.privacy' | translate }}</a></li>
          </ul>
        </div>

        <div>
          <h2 class="label">{{ 'footer.language' | translate }}</h2>
          <ul class="flex flex-wrap gap-1.5 text-sm">
            @for (l of langs; track l.code) {
              <li><a [routerLink]="'/' + l.code" [attr.hreflang]="l.code" [attr.title]="l.native" class="chip !min-h-8 !px-2.5 text-xs" [class.chip--active]="l.code === lang.current()">{{ l.label }}</a></li>
            }
          </ul>
          <p class="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <app-icon name="lock" [size]="14" class="mt-0.5" /> {{ 'footer.payments' | translate }}
          </p>
        </div>
      </div>
      <div class="border-t border-line">
        <div class="site flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ year }} {{ name }}. {{ 'footer.rights' | translate }}</p>
          <p class="max-w-2xl sm:text-right">{{ 'footer.disclaimer' | translate }}</p>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly lang = inject(LanguageService);
  protected readonly langs = LANGUAGES;
  protected readonly email = SITE.email;
  protected readonly name = SITE.name;
  protected readonly year = new Date().getFullYear();
  protected readonly origins = ['USA', 'CANADA', 'JAPAN', 'UAE', 'UK'].map((code) => ({ code }));
  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly about = computed(() => pathFor('about', this.lang.current()));
  protected readonly guideSections: GuideSection[] = ['origins', 'countries', 'ports'];
  protected readonly homeCountry = computed(() => this.lang.info().home);

  protected guide(ref: GuideRef): string {
    return guidePath(ref, this.lang.current());
  }

  protected countryName(code: string): string {
    return new Intl.DisplayNames([this.lang.locale()], { type: 'region' }).of(code) ?? code;
  }
  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));
  protected readonly terms = computed(() => pathFor('terms', this.lang.current()));
}
