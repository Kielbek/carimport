import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LanguageService, ROOT_LANG, isSupportedLang } from './language.service';

/** Activates the language from the :lang segment and waits for its translations; unknown prefixes are redirected. */
export const languageGuard: CanActivateFn = (route) => {
  const languages = inject(LanguageService);
  const lang = route.paramMap.get('lang');
  if (isSupportedLang(lang)) {
    return languages.use(lang).pipe(map(() => true));
  }
  return inject(Router).createUrlTree([languages.detect()]);
};

/**
 * The bare domain: the home page in ROOT_LANG with 200 and no server redirect (indexable x-default). A visitor who
 * chose a language before is taken to it in the browser; crawlers and first-time visitors stay and get the picker.
 */
export const rootGuard: CanActivateFn = () => {
  const languages = inject(LanguageService);
  const stored = languages.stored();
  if (stored) {
    return inject(Router).createUrlTree(['/', stored]);
  }
  return languages.use(ROOT_LANG, false).pipe(map(() => true));
};
