import { Component, ElementRef, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LANGUAGES, Lang, LanguageService } from '../core/i18n/language.service';
import { Icon } from '../shared/icon/icon';

/** Language dropdown. Links (not buttons) so crawlers discover every language version of the current page. */
@Component({
  selector: 'app-language-menu',
  imports: [RouterLink, TranslatePipe, Icon],
  template: `
    <button type="button" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-haspopup="true"
            [attr.aria-label]="('layout.language' | translate) + ': ' + lang.info().native"
            class="flex h-10 items-center gap-1.5 px-1 text-[14px] font-medium transition hover:text-brand-text">
      <app-icon name="globe" [size]="16" />
      {{ lang.info().label }}
      <app-icon name="chevron-down" [size]="14" class="transition" [class.rotate-180]="open()" />
    </button>
    @if (open()) {
      <div class="reveal-enter fixed inset-x-4 top-[4.5rem] z-40 rounded-[4px] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[26rem] border border-line bg-panel shadow-2xl"
           animate.leave="reveal-leave">
        <p class="border-b border-line px-4 py-3 text-sm font-bold">{{ 'layout.language' | translate }}</p>
        <ul class="grid max-h-[60vh] grid-cols-2 gap-px overflow-y-auto p-1">
          @for (l of sorted(); track l.code) {
            <li>
              <a [routerLink]="hrefFor()(l.code)" (click)="open.set(false)" [attr.hreflang]="l.code" [attr.lang]="l.code"
                 class="flex items-center justify-between gap-2 rounded-[2px] px-3 py-2 text-sm transition hover:bg-panel-2"
                 [class.bg-brand/10]="l.code === lang.current()" [class.font-bold]="l.code === lang.current()">
                <span class="truncate">{{ l.native }}</span>
                <span class="text-[11px] text-muted">{{ l.label }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    }
  `,
  host: { class: 'relative', '(document:click)': 'onDocumentClick($event)', '(document:keydown.escape)': 'open.set(false)' },
})
export class LanguageMenu {
  /** Maps a language to the URL of the current page in that language (provided by the shell). */
  readonly hrefFor = input.required<(lang: Lang) => string>();
  protected readonly lang = inject(LanguageService);
  protected readonly open = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);

  /** Alphabetical by native name, in the current language's collation. */
  protected readonly sorted = computed(() =>
    [...LANGUAGES].sort((a, b) => a.native.localeCompare(b.native, this.lang.locale())),
  );

  protected onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
