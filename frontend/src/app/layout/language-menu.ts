import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANG_LABELS, Lang, LanguageService, SUPPORTED_LANGS } from '../core/i18n/language.service';
import { Icon } from '../shared/icon/icon';

const NATIVE_NAMES: Record<Lang, string> = { pl: 'Polski', en: 'English', de: 'Deutsch', uk: 'Українська' };

/** Language dropdown. Links (not buttons) so crawlers discover every language version of the current page. */
@Component({
  selector: 'app-language-menu',
  imports: [RouterLink, Icon],
  template: `
    <button type="button" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-haspopup="true"
            class="flex h-10 items-center gap-1.5 rounded-[4px] border border-line px-3 text-sm font-semibold transition hover:border-line-strong">
      <app-icon name="globe" [size]="16" /> {{ labels[lang.current()] }}
      <app-icon name="chevron-down" [size]="14" />
    </button>
    @if (open()) {
      <ul class="reveal-enter absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-[6px] border border-line bg-panel py-1 shadow-2xl"
          animate.leave="reveal-leave">
        @for (l of langs; track l) {
          <li>
            <a [routerLink]="hrefFor()(l)" (click)="open.set(false)" [attr.hreflang]="l" [attr.lang]="l"
               class="flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-bg-soft"
               [class.text-accent-text]="l === lang.current()">
              {{ names[l] }} <span class="text-xs text-muted">{{ labels[l] }}</span>
            </a>
          </li>
        }
      </ul>
    }
  `,
  host: { class: 'relative', '(document:click)': 'onDocumentClick($event)', '(document:keydown.escape)': 'open.set(false)' },
})
export class LanguageMenu {
  /** Maps a language to the URL of the current page in that language (provided by the shell). */
  readonly hrefFor = input.required<(lang: Lang) => string>();
  protected readonly lang = inject(LanguageService);
  protected readonly langs = SUPPORTED_LANGS;
  protected readonly labels = LANG_LABELS;
  protected readonly names = NATIVE_NAMES;
  protected readonly open = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
