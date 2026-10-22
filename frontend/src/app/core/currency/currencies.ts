/**
 * Currencies a result can be shown in: the euro plus every other EU member state's own currency, and USD/GBP for
 * buyers who think in the auction's currency. The report is sold in each of them (price in minor units, the same
 * table as app.report.price-minor on the server).
 */
export const DISPLAY_CURRENCIES = ['EUR', 'PLN', 'CZK', 'HUF', 'RON', 'SEK', 'DKK', 'USD', 'GBP'] as const;
export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

/** Flag shown next to the currency (flag-icons code; "eu" for the euro). */
export const CURRENCY_FLAG: Record<DisplayCurrency, string> = {
  EUR: 'eu', PLN: 'PL', CZK: 'CZ', HUF: 'HU', RON: 'RO', SEK: 'SE', DKK: 'DK', USD: 'US', GBP: 'GB',
};

/** PDF report price in minor units per currency. */
export const REPORT_PRICE_MINOR: Record<DisplayCurrency, number> = {
  EUR: 499, PLN: 1900, CZK: 12900, HUF: 199000, RON: 2500, SEK: 5900, DKK: 3900, USD: 549, GBP: 449,
};

/** Card everywhere; BLIK and Przelewy24 only settle in PLN (P24 also in EUR). */
export function paymentMethodsHint(currency: DisplayCurrency): 'blik' | 'p24' | null {
  return currency === 'PLN' ? 'blik' : currency === 'EUR' ? 'p24' : null;
}

export function isDisplayCurrency(value: unknown): value is DisplayCurrency {
  return typeof value === 'string' && (DISPLAY_CURRENCIES as readonly string[]).includes(value);
}

/** "Polish złoty", "euro", ... in the UI language. */
export function currencyName(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Local symbol: zł, €, Kč, Ft, lei, kr, $, £. */
export function currencySymbol(code: string, locale: string): string {
  try {
    const parts = new Intl.NumberFormat(locale, { style: 'currency', currency: code, currencyDisplay: 'narrowSymbol' })
      .formatToParts(0);
    return parts.find((p) => p.type === 'currency')?.value ?? code;
  } catch {
    return code;
  }
}

/** Report price formatted for the locale, e.g. "19 zł", "4,99 €", "129 Kč". */
export function reportPrice(currency: DisplayCurrency, locale: string): string {
  const minor = REPORT_PRICE_MINOR[currency];
  const amount = minor / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
