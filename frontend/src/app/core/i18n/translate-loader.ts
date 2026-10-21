import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

/**
 * Loads translations as lazy JS chunks (dynamic import of the JSON files). Works identically in the browser and during
 * build-time prerendering - an HTTP loader would need an absolute URL on the server - and each language is fetched
 * only when used.
 */
export class LazyJsonTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return from(import(`../../../../public/i18n/${lang}.json`).then((m) => m.default as TranslationObject));
  }
}
