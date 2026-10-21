import { Pipe, PipeTransform } from '@angular/core';

/**
 * Locale-aware currency formatting. The locale is an explicit argument (from LanguageService.locale()) so the pipe
 * stays pure and still re-renders when the language signal changes.
 */
@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: number | null | undefined, currency: string, locale: string, fractionDigits = 0): string {
    if (value == null) {
      return '—';
    }
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  }
}
