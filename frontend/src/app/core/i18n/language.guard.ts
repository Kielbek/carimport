import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService, isSupportedLang } from './language.service';

/** Activates the language from the :lang segment; unknown prefixes are redirected to the detected language. */
export const languageGuard: CanActivateFn = (route) => {
  const languages = inject(LanguageService);
  const lang = route.paramMap.get('lang');
  if (isSupportedLang(lang)) {
    languages.use(lang);
    return true;
  }
  return inject(Router).createUrlTree([languages.detect()]);
};
