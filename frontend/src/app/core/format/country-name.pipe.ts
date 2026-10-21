import { Pipe, PipeTransform } from '@angular/core';

/** ISO 3166 code -> localized country name via Intl.DisplayNames (no translation files needed for 27 EU states). */
@Pipe({ name: 'countryName' })
export class CountryNamePipe implements PipeTransform {
  transform(code: string, locale: string): string {
    try {
      return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code;
    } catch {
      return code;
    }
  }
}
