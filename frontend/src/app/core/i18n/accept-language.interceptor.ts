import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from './language.service';

/** Lets the backend localize validation errors, PDF reports and the Stripe checkout page. */
export const acceptLanguageInterceptor: HttpInterceptorFn = (req, next) => {
  const lang = inject(LanguageService).current();
  return next(req.clone({ setHeaders: { 'Accept-Language': lang } }));
};
