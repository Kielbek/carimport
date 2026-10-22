import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';
import { LANGUAGE_BY_CODE, Lang, SUPPORTED_LANGS } from './languages';

export { LANGUAGES, LANGUAGE_BY_CODE, SUPPORTED_LANGS } from './languages';
export type { Lang } from './languages';

const STORAGE_KEY = 'carimport.lang';

export function isSupportedLang(value: string | null | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Single source of truth for the active language. The URL prefix (/pl, /de, ...) drives it - good for SEO (hreflang)
 * and shareable links - and every other consumer (ngx-translate, Intl formatting, Accept-Language) derives from it.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly current = signal<Lang>('en');
  readonly info = computed(() => LANGUAGE_BY_CODE[this.current()]);
  readonly locale = computed(() => this.info().locale);

  /** Completes once the translations are loaded, so prerendered HTML never contains raw keys. */
  use(lang: Lang): Observable<Lang> {
    this.current.set(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode, server) - the URL still carries the language
    }
    return this.translate.getCurrentLang() === lang ? of(lang) : this.translate.use(lang).pipe(map(() => lang));
  }

  /** Stored choice, then browser preferences, then English. */
  detect(): Lang {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (isSupportedLang(stored)) {
      return stored;
    }
    const browser = (this.document.defaultView?.navigator?.languages ?? [])
      .map((l) => l.slice(0, 2).toLowerCase())
      .find(isSupportedLang);
    return browser ?? 'en';
  }
}
