import { Component, DOCUMENT, ElementRef, Injectable, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LANGUAGES, LANGUAGE_BY_CODE, Lang, LanguageService, ROOT_LANG } from '../core/i18n/language.service';
import { Flag } from '../shared/flag/flag';
import { Icon } from '../shared/icon/icon';

/** Crawlers and audits never get the picker: the bare domain stays a plain, indexable page for them. */
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|embedly/i;

/**
 * Overlay queue of the shell. Only one overlay at a time, in this order: language picker (first visit to the bare
 * domain) -> cookie banner -> newsletter invitation (later, see NewsletterPopup). The later ones read `blocking`.
 */
@Injectable({ providedIn: 'root' })
export class LanguagePickerState {
  /** True while the language picker is on screen; the cookie banner and the newsletter wait for it. */
  readonly open = signal(false);
}

/**
 * First-visit language picker on https://cargloapp.com/ - shown in the browser only (the prerendered page has none),
 * only when no language was saved and the visitor is not a crawler. The browser language is offered first.
 */
@Component({
  selector: 'app-language-picker',
  imports: [TranslatePipe, Flag, Icon],
  template: `
    @if (state.open()) {
      <div class="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-3 backdrop-blur-[2px] sm:items-center"
           (click)="dismiss()" animate.leave="reveal-leave">
        <div #dialog role="dialog" aria-modal="true" aria-labelledby="lp-title" tabindex="-1" (click)="$event.stopPropagation()"
             class="reveal-enter relative flex max-h-[92dvh] w-full max-w-[640px] flex-col rounded-[6px] border border-line bg-panel text-fg shadow-2xl outline-none">
          <button type="button" (click)="dismiss()" [attr.aria-label]="'layout.close' | translate"
                  class="absolute right-2 top-2 grid size-10 place-items-center text-muted transition hover:text-fg">
            <app-icon name="x" [size]="20" />
          </button>
          <div class="px-5 pb-3 pt-5 sm:px-7 sm:pt-7">
            <h2 id="lp-title" class="pr-10 text-[22px] font-bold leading-tight sm:text-[26px]">{{ 'langPicker.title' | translate }}</h2>
            <p class="mt-1.5 text-[14px] leading-[1.55] text-muted">{{ 'langPicker.lead' | translate }}</p>
            @if (suggested(); as s) {
              <button type="button" (click)="choose(s.code)" [attr.lang]="s.code"
                      class="mt-4 flex w-full items-center justify-between gap-3 rounded-[4px] bg-brand px-4 py-3.5 text-left text-brand-ink transition hover:brightness-110">
                <span class="flex items-center gap-3">
                  <app-flag [code]="s.flag" class="w-7" />
                  <span>
                    <span class="block text-[11px] font-semibold uppercase tracking-wide opacity-80">{{ 'langPicker.suggested' | translate }}</span>
                    <span class="block text-[17px] font-bold">{{ s.native }}</span>
                  </span>
                </span>
                <app-icon name="arrow-right" [size]="20" />
              </button>
            }
          </div>
          <ul class="grid grid-cols-2 gap-1 overflow-y-auto border-t border-line p-3 sm:grid-cols-3 sm:px-5 sm:pb-5">
            @for (l of others(); track l.code) {
              <li>
                <button type="button" (click)="choose(l.code)" [attr.lang]="l.code"
                        class="flex w-full items-center gap-2.5 rounded-[3px] px-3 py-2.5 text-left text-[14px] transition hover:bg-panel-2">
                  <app-flag [code]="l.flag" class="w-5 shrink-0" />
                  <span class="truncate">{{ l.native }}</span>
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    }
  `,
  host: { '(document:keydown.escape)': 'state.open() && dismiss()' },
})
export class LanguagePicker {
  protected readonly state = inject(LanguagePickerState);
  private readonly languages = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');

  private readonly browser = signal<Lang | null>(null);
  protected readonly suggested = computed(() => {
    const code = this.browser();
    return code ? LANGUAGE_BY_CODE[code] : null;
  });
  protected readonly others = computed(() =>
    [...LANGUAGES].filter((l) => l.code !== this.browser()).sort((a, b) => a.native.localeCompare(b.native)),
  );

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (view?.location.pathname !== '/' || this.languages.stored() || BOT.test(view.navigator.userAgent)) {
        return;
      }
      this.browser.set(this.languages.browserLang());
      this.state.open.set(true);
      this.document.body.style.overflow = 'hidden';
      setTimeout(() => this.dialog()?.nativeElement.focus());
    });
  }

  protected choose(code: string): void {
    const lang = code as Lang;
    this.languages.remember(lang);
    this.close();
    if (lang !== this.languages.current()) {
      void this.router.navigateByUrl(`/${lang}`);
    }
  }

  /** Closing keeps the page in the root language and saves it, so the picker does not come back. */
  protected dismiss(): void {
    this.languages.remember(ROOT_LANG);
    this.close();
  }

  private close(): void {
    this.state.open.set(false);
    this.document.body.style.overflow = '';
  }
}
