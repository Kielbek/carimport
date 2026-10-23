import { Component, computed, effect, inject, input, untracked } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { Lang } from '../../core/i18n/languages';
import { guidePath } from '../../core/routing/guide-paths';
import { PageContext } from '../../core/routing/page-context';
import { pathFor } from '../../core/routing/paths';
import { SeoService } from '../../core/seo/seo.service';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { BLOG_INDEX, BLOG_LANGS } from './blog-index.generated';
import { BlogArticle, BlogBlock, BlogCategory } from './blog.models';

export function blogPath(lang: string, slug?: string): string {
  return slug ? `/${lang}/blog/${slug}` : `/${lang}/blog`;
}

/**
 * Blog list (/:lang/blog) and article (/:lang/blog/:slug). Articles come from the route resolver, so they are in the
 * prerendered HTML. Each article links to the calculator (with its country of purchase) and to the guides.
 */
@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, TranslatePipe, Flag, Icon],
  template: `
    @if (article(); as a) {
      <article class="site max-w-3xl py-10 lg:py-14">
        <nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" [attr.aria-label]="'layout.breadcrumb' | translate">
          <a [routerLink]="home()" class="hover:text-brand-text">{{ 'layout.home' | translate }}</a>
          <app-icon name="chevron-down" [size]="12" class="-rotate-90" />
          <a [routerLink]="list()" class="hover:text-brand-text">{{ 'blog.title' | translate }}</a>
        </nav>
        <p class="eyebrow mt-6">{{ 'blog.category.' + a.category | translate }}</p>
        <h1 class="h-section mt-4">{{ a.title }}</h1>
        <p class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <time [attr.datetime]="a.date">{{ date(a.date) }}</time>
          <span>{{ 'blog.minutes' | translate: { n: a.minutes } }}</span>
        </p>
        <p class="lead mt-6 !text-[19px]">{{ a.lead }}</p>

        <div class="mt-8 space-y-5 text-[16.5px] leading-[1.75] text-fg/90">
          @for (b of a.blocks; track $index) {
            @switch (kind(b)) {
              @case ('h2') { <h2 class="!mt-10 text-2xl font-extrabold leading-tight text-fg">{{ text(b, 'h2') }}</h2> }
              @case ('h3') { <h3 class="!mt-7 text-lg font-extrabold text-fg">{{ text(b, 'h3') }}</h3> }
              @case ('p') { <p>{{ text(b, 'p') }}</p> }
              @case ('ul') {
                <ul class="space-y-2">
                  @for (li of items(b, 'ul'); track $index) {
                    <li class="flex gap-3"><app-icon name="check" [size]="18" class="mt-1 shrink-0 text-brand-text" /><span>{{ li }}</span></li>
                  }
                </ul>
              }
              @case ('ol') {
                <ol class="space-y-2.5">
                  @for (li of items(b, 'ol'); track $index) {
                    <li class="flex gap-3">
                      <span class="grid size-7 shrink-0 place-items-center rounded-full border border-brand text-xs font-bold text-brand-text">{{ $index + 1 }}</span>
                      <span>{{ li }}</span>
                    </li>
                  }
                </ol>
              }
              @case ('tip') {
                <aside class="border-l-2 border-brand bg-brand/5 py-3 pl-4 pr-3">
                  <p class="text-xs font-bold uppercase tracking-[0.08em] text-brand-text">{{ 'guide.origin.common.tipTitle' | translate }}</p>
                  <p class="mt-1 text-[15px]">{{ text(b, 'tip') }}</p>
                </aside>
              }
              @case ('table') {
                @if (table(b); as t) {
                  <div class="overflow-x-auto">
                    <table class="w-full text-[15px]">
                      <thead><tr class="border-b border-line text-left text-xs uppercase tracking-[0.06em] text-muted">
                        @for (h of t.head; track $index) { <th class="py-2 pr-4 font-semibold" [class.text-right]="$index > 0">{{ h }}</th> }
                      </tr></thead>
                      <tbody>
                        @for (row of t.rows; track $index; let last = $last) {
                          <tr class="border-b border-line" [class.font-bold]="last">
                            @for (c of row; track $index) { <td class="py-2.5 pr-4" [class.text-right]="$index > 0">{{ c }}</td> }
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                }
              }
            }
          }
        </div>

        @if (a.faq.length) {
          <section class="mt-12">
            <h2 class="text-2xl font-extrabold">{{ 'faq.eyebrow' | translate }}</h2>
            <div class="mt-4 divide-y divide-line border-y border-line">
              @for (f of a.faq; track f.q) {
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

        <section class="theme-dark mt-12 flex flex-col items-start gap-5 rounded-[4px] bg-panel p-7 text-fg sm:p-9">
          <h2 class="text-[24px] font-extrabold leading-tight">{{ 'guide.cta.title' | translate }}</h2>
          <p class="text-fg/85">{{ 'guide.cta.text' | translate }}</p>
          <div class="flex flex-wrap gap-3">
            <a [routerLink]="calculator()" [queryParams]="a.origin ? { from: a.origin } : {}" class="btn btn-primary">
              <app-icon name="calculator" [size]="18" /> {{ 'guide.cta.button' | translate }}
            </a>
            @if (a.origin) {
              <a [routerLink]="guide('origins', a.origin)" class="btn btn-outline"><app-flag [code]="a.origin" class="w-5" /> {{ 'guide.origin.' + a.origin + '.h1' | translate }}</a>
            }
          </div>
        </section>

        @if (related().length) {
          <section class="mt-12">
            <h2 class="label">{{ 'blog.related' | translate }}</h2>
            <ul class="mt-3 divide-y divide-line border-y border-line">
              @for (r of related(); track r.id) {
                <li><a [routerLink]="list() + '/' + r.slug" class="flex items-center justify-between gap-4 py-3 font-semibold hover:text-brand-text">
                  {{ r.title }} <app-icon name="arrow-right" [size]="16" class="shrink-0" /></a></li>
              }
            </ul>
          </section>
        }
      </article>
    } @else {
      <section class="site py-10 lg:py-14">
        <nav class="flex flex-wrap items-center gap-1.5 text-xs text-muted" [attr.aria-label]="'layout.breadcrumb' | translate">
          <a [routerLink]="home()" class="hover:text-brand-text">{{ 'layout.home' | translate }}</a>
          <app-icon name="chevron-down" [size]="12" class="-rotate-90" />
          <span class="text-fg/80">{{ 'blog.title' | translate }}</span>
        </nav>
        <header class="mt-6 max-w-3xl">
          <h1 class="h-section">{{ 'blog.title' | translate }}</h1>
          <p class="lead mt-4">{{ 'blog.lead' | translate }}</p>
        </header>

        <div class="mt-8 flex flex-wrap gap-2">
          <button type="button" class="chip" [class.chip--active]="!filter()" (click)="setFilter(null)">{{ 'blog.all' | translate }}</button>
          @for (c of categories(); track c) {
            <button type="button" class="chip" [class.chip--active]="filter() === c" (click)="setFilter(c)">{{ 'blog.category.' + c | translate }}</button>
          }
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (a of shown(); track a.id; let first = $first) {
            <a [routerLink]="list() + '/' + a.slug" class="card group flex flex-col p-6 transition hover:-translate-y-1"
               [class.lg:col-span-2]="first && !filter()">
              <span class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-text">
                @if (a.origin) { <app-flag [code]="a.origin" class="w-5" /> }
                {{ 'blog.category.' + a.category | translate }}
              </span>
              <h2 class="mt-4 font-extrabold leading-tight" [class]="first && !filter() ? 'text-[26px]' : 'text-xl'">{{ a.title }}</h2>
              <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{{ a.description }}</p>
              <span class="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
                <time [attr.datetime]="a.date">{{ date(a.date) }}</time>
                <span>{{ 'blog.minutes' | translate: { n: a.minutes } }}</span>
              </span>
            </a>
          } @empty {
            <p class="text-muted">{{ 'blog.empty' | translate }}</p>
          }
        </div>
      </section>
    }
  `,
})
export class BlogPage {
  /** From the route: resolver result and the optional slug. */
  readonly posts = input<BlogArticle[]>([]);
  readonly slug = input<string>();
  /** ?category= filter on the list. */
  readonly category = input<string>();

  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly pageContext = inject(PageContext);
  private readonly router = inject(Router);

  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly list = computed(() => blogPath(this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));

  protected readonly article = computed(() => {
    const slug = this.slug();
    return slug ? (this.posts().find((a) => a.slug === slug) ?? null) : null;
  });
  protected readonly filter = computed(() => (this.category() as BlogCategory | undefined) ?? null);
  protected readonly categories = computed(() => [...new Set(this.posts().map((a) => a.category))]);
  protected readonly shown = computed(() => {
    const f = this.filter();
    return f ? this.posts().filter((a) => a.category === f) : this.posts();
  });
  /** Same category first, then the newest. */
  protected readonly related = computed(() => {
    const a = this.article();
    if (!a) {
      return [];
    }
    const others = this.posts().filter((p) => p.id !== a.id);
    return [...others.filter((p) => p.category === a.category), ...others.filter((p) => p.category !== a.category)].slice(0, 4);
  });

  constructor() {
    effect(() => {
      const slug = this.slug();
      const a = this.article();
      const lang = this.lang.current();
      untracked(() => {
        if (slug && !a) {
          void this.router.navigateByUrl(blogPath(lang));
        } else {
          this.applySeo(a, lang);
        }
      });
    });
  }

  private applySeo(a: BlogArticle | null, lang: Lang): void {
    const t = (k: string) => this.translate.instant(k) as string;
    const crumbs = [
      { name: t('layout.home'), path: pathFor('home', lang) },
      { name: t('blog.title'), path: blogPath(lang) },
    ];
    if (a) {
      const versions = BLOG_INDEX[a.id] ?? { [lang]: a.slug };
      const languages = Object.keys(versions) as Lang[];
      this.seo.applyCustom({
        lang,
        title: a.metaTitle,
        headline: a.title,
        description: a.description,
        path: blogPath(lang, a.slug),
        pathFor: (l) => blogPath(l, versions[l]),
        languages,
        breadcrumbs: [...crumbs, { name: a.title, path: blogPath(lang, a.slug) }],
        faq: a.faq,
        type: 'BlogPosting',
        published: a.date,
      });
      this.pageContext.hrefFor.set((l) => blogPath(l, versions[l]));
    } else {
      const languages = BLOG_LANGS as Lang[];
      this.seo.applyCustom({
        lang,
        title: t('blog.metaTitle'),
        description: t('blog.metaDescription'),
        path: blogPath(lang),
        pathFor: (l) => blogPath(l),
        languages: languages.includes(lang) ? languages : [lang],
        breadcrumbs: crumbs,
        faq: [],
        type: 'CollectionPage',
      });
      this.pageContext.hrefFor.set((l) => blogPath(l));
    }
  }

  protected setFilter(category: BlogCategory | null): void {
    void this.router.navigate([], { queryParams: { category }, queryParamsHandling: 'merge' });
  }

  protected guide(section: 'origins', item: string): string {
    return guidePath({ section, item }, this.lang.current());
  }

  protected date(iso: string): string {
    return new Intl.DateTimeFormat(this.lang.locale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
  }

  protected kind(b: BlogBlock): string {
    return Object.keys(b)[0];
  }

  protected text(b: BlogBlock, key: 'h2' | 'h3' | 'p' | 'tip'): string {
    return (b as Record<string, string>)[key];
  }

  protected items(b: BlogBlock, key: 'ul' | 'ol'): string[] {
    return (b as Record<string, string[]>)[key];
  }

  protected table(b: BlogBlock): { head: string[]; rows: string[][] } {
    return (b as { table: { head: string[]; rows: string[][] } }).table;
  }
}
