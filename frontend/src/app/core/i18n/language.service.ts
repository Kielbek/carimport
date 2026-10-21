import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGS = ['pl', 'en', 'de', 'uk'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

/** BCP 47 locales used for Intl number/date formatting. "uk" is the ISO 639-1 code for Ukrainian (country: UA). */
const LOCALES: Record<Lang, string> = { pl: 'pl-PL', en: 'en-GB', de: 'de-DE', uk: 'uk-UA' };
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
  readonly locale = computed(() => LOCALES[this.current()]);

  use(lang: Lang): void {
    if (this.translate.getCurrentLang() !== lang) {
      this.translate.use(lang);
    }
    this.current.set(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode) - the URL still carries the language
    }
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
    const browser = (this.document.defaultView?.navigator.languages ?? [])
      .map((l) => l.slice(0, 2).toLowerCase())
      .find(isSupportedLang);
    return browser ?? 'en';
  }
}
