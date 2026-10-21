import { Pipe, PipeTransform } from '@angular/core';

/** Intl number formatting for the active locale ("2 500" in PL, "2.500" in DE) without registering Angular locale data. */
@Pipe({ name: 'localNumber' })
export class LocalNumberPipe implements PipeTransform {
  transform(value: number | null | undefined, locale: string, maxFractionDigits = 2): string {
    return value == null ? '' : new Intl.NumberFormat(locale, { maximumFractionDigits: maxFractionDigits }).format(value);
  }
}
