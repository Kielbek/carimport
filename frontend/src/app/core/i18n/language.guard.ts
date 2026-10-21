import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LanguageService, isSupportedLang } from './language.service';

/** Activates the language from the :lang segment and waits for its translations; unknown prefixes are redirected. */
export const languageGuard: CanActivateFn = (route) => {
  const languages = inject(LanguageService);
  const lang = route.paramMap.get('lang');
  if (isSupportedLang(lang)) {
    return languages.use(lang).pipe(map(() => true));
  }
  return inject(Router).createUrlTree([languages.detect()]);
};
