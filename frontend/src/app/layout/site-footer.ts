import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LANGUAGES, LanguageService } from '../core/i18n/language.service';
import { GuideRef, GuideSection, guidePath } from '../core/routing/guide-paths';
import { pathFor } from '../core/routing/paths';
import { SITE, contactEmail } from '../core/site.config';
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
      <div class="site grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div class="col-span-2 sm:col-span-1">
          <app-logo />
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">{{ 'footer.about' | translate }}</p>
          <a [routerLink]="contact()" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-text">
            <app-icon name="mail" [size]="16" /> {{ email() }}
          </a>
          <p class="mt-6 flex max-w-xs items-start gap-2 text-xs leading-relaxed text-muted">
            <app-icon name="lock" [size]="14" class="mt-0.5 shrink-0" /> {{ 'footer.payments' | translate }}
          </p>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <h2 class="label">{{ 'footer.calculators' | translate }}</h2>
          <ul class="space-y-2.5 text-sm">
            @for (o of origins; track o.code) {
              <li>
                <a [routerLink]="calculator()" [queryParams]="{ from: o.code }" class="flex items-center gap-2.5 text-fg/85 hover:text-brand-text">
                  <app-flag [code]="o.code" class="w-5" /> {{ 'footer.importFrom.' + o.code | translate }}
                </a>
              </li>
            }
            <li>
              <a [routerLink]="euImport()" class="flex items-center gap-2.5 text-fg/85 hover:text-brand-text">
                <app-flag code="EU" class="w-5" /> {{ 'layout.euImport' | translate }}
              </a>
            </li>
            <li class="pt-1"><a [routerLink]="taxes()" class="text-fg/85 hover:text-brand-text">{{ 'layout.taxes' | translate }}</a></li>
          </ul>
        </div>

        <div>
          <h2 class="label">{{ 'guide.nav.title' | translate }}</h2>
          <ul class="space-y-2.5 text-sm text-fg/85">
            @for (s of guideSections; track s) {
              <li><a [routerLink]="guide({ section: s, item: null })" class="hover:text-brand-text">{{ 'guide.nav.' + s | translate }}</a></li>
            }
            <li><a [routerLink]="copart()" class="hover:text-brand-text">{{ 'layout.copart' | translate }}</a></li>
            <li><a [routerLink]="vin()" class="hover:text-brand-text">{{ 'layout.vin' | translate }}</a></li>
            <li><a [routerLink]="vinCompare()" class="hover:text-brand-text">{{ 'layout.vinCompare' | translate }}</a></li>
            <li><a [routerLink]="glossary()" class="hover:text-brand-text">{{ 'layout.glossary' | translate }}</a></li>
            <li><a [routerLink]="'/' + lang.current() + '/blog'" class="hover:text-brand-text">{{ 'layout.blog' | translate }}</a></li>
          </ul>
        </div>

        <div>
          <h2 class="label">{{ name }}</h2>
          <ul class="space-y-2.5 text-sm text-fg/85">
            <li><a [routerLink]="about()" class="hover:text-brand-text">{{ 'layout.about' | translate }}</a></li>
            <li><a [routerLink]="method()" class="hover:text-brand-text">{{ 'layout.method' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="pricing" class="hover:text-brand-text">{{ 'layout.pricing' | translate }}</a></li>
            <li><a [routerLink]="home()" fragment="faq" class="hover:text-brand-text">{{ 'layout.faq' | translate }}</a></li>
            <li><a [routerLink]="contact()" class="hover:text-brand-text">{{ 'layout.contact' | translate }}</a></li>
            <li><a [routerLink]="terms()" class="hover:text-brand-text">{{ 'footer.terms' | translate }}</a></li>
            <li><a [routerLink]="privacy()" class="hover:text-brand-text">{{ 'footer.privacy' | translate }}</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-line">
        <nav class="site flex flex-wrap items-center gap-x-3 gap-y-2 py-5 text-xs" [attr.aria-label]="'footer.language' | translate">
          <span class="mr-1 font-semibold uppercase tracking-wide text-muted">{{ 'footer.language' | translate }}</span>
          @for (l of langs; track l.code) {
            <a [routerLink]="'/' + l.code" [attr.hreflang]="l.code" [attr.title]="l.native"
               class="text-fg/70 hover:text-brand-text" [class.font-bold]="l.code === lang.current()" [class.!text-brand-text]="l.code === lang.current()">{{ l.native }}</a>
          }
        </nav>
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
  protected readonly email = computed(() => contactEmail(this.lang.current()));
  protected readonly name = SITE.name;
  protected readonly year = new Date().getFullYear();
  protected readonly origins = ['USA', 'CANADA', 'JAPAN', 'UAE', 'UK'].map((code) => ({ code }));
  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly about = computed(() => pathFor('about', this.lang.current()));
  protected readonly guideSections: GuideSection[] = ['origins', 'countries', 'ports', 'models'];

  protected guide(ref: GuideRef): string {
    return guidePath(ref, this.lang.current());
  }

  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));
  protected readonly terms = computed(() => pathFor('terms', this.lang.current()));
  protected readonly taxes = computed(() => pathFor('taxes', this.lang.current()));
  protected readonly euImport = computed(() => pathFor('euImport', this.lang.current()));
  protected readonly method = computed(() => pathFor('method', this.lang.current()));
  protected readonly vin = computed(() => pathFor('vin', this.lang.current()));
  protected readonly vinCompare = computed(() => pathFor('vinCompare', this.lang.current()));
  protected readonly copart = computed(() => pathFor('copart', this.lang.current()));
  protected readonly glossary = computed(() => pathFor('glossary', this.lang.current()));
  protected readonly contact = computed(() => pathFor('contact', this.lang.current()));
}
