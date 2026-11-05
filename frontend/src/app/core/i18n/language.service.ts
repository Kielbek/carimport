import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';
import { LANGUAGE_BY_CODE, Lang, SUPPORTED_LANGS } from './languages';

export { LANGUAGES, LANGUAGE_BY_CODE, SUPPORTED_LANGS } from './languages';
export type { Lang } from './languages';

const STORAGE_KEY = 'carimport.lang';
/** Cookie twin of the stored choice (preference only, never read by the server - the root never redirects). */
const COOKIE = 'user_lang';

/**
 * Language of the bare domain (https://cargloapp.com/), the hreflang x-default: served with 200 and no redirect so
 * search engines index it; returning visitors are taken to their saved language in the browser.
 */
export const ROOT_LANG: Lang = 'en';

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

  /**
   * Completes once the translations are loaded, so prerendered HTML never contains raw keys. A page under a language
   * prefix counts as the visitor's choice; the bare domain (remember = false) does not.
   */
  use(lang: Lang, remember = true): Observable<Lang> {
    this.current.set(lang);
    this.document.documentElement.lang = lang;
    if (remember) {
      this.remember(lang);
    }
    return this.translate.getCurrentLang() === lang ? of(lang) : this.translate.use(lang).pipe(map(() => lang));
  }

  /** Saves the visitor's language (localStorage + a preference cookie) so the language picker is not shown again. */
  remember(lang: Lang): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode, server) - the URL still carries the language
    }
    try {
      this.document.cookie = `${COOKIE}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // no document cookie on the server
    }
  }

  /** The language the visitor chose before, if any (none on the server and for crawlers). */
  stored(): Lang | null {
    let value: string | null = null;
    try {
      value = localStorage.getItem(STORAGE_KEY);
    } catch {
      value = null;
    }
    return isSupportedLang(value) ? value : null;
  }

  /** The visitor's browser language when we have it - the suggestion in the language picker. */
  browserLang(): Lang | null {
    return (this.document.defaultView?.navigator?.languages ?? [])
      .map((l) => l.slice(0, 2).toLowerCase())
      .find(isSupportedLang) ?? null;
  }

  /** Stored choice, then browser preferences, then English. */
  detect(): Lang {
    return this.stored() ?? this.browserLang() ?? ROOT_LANG;
  }
}
