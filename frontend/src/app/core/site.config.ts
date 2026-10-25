/** Public site identity used for canonical URLs, hreflang, Open Graph and structured data. Change per deployment. */
export const SITE = {
  url: 'https://cargloapp.com',
  name: 'Carglo',
  email: 'cargloapp@gmail.com',
  ogImage: '/og-image.png',
  /**
   * The seller, as required in the terms and for consumer contracts. FILL IN BEFORE LAUNCH - same values as
   * COMPANY_* in .env (printed in the report e-mail). Empty taxId / registry are left out of the text, so a private
   * person selling without a registered business (PL: działalność nierejestrowana) fills in only name and address:
   *   name: 'Jan Kowalski (działalność nierejestrowana)', address: 'ul. Przykładowa 1, 00-001 Warszawa'
   */
  company: {
    name: '[imię i nazwisko]',
    address: '[adres do korespondencji]',
    taxId: '',
    registry: '',
  },
  /** Enquiries to import companies; off until a partner has signed (the result page then hides the button). */
  partners: false as boolean,
  /**
   * Conversion analytics, loaded only after consent to analytics cookies. provider null = off.
   * plausible: id = the site's domain in Plausible; ga4: id = the measurement ID (G-XXXXXXX).
   * Add the provider's host to the CSP in frontend/nginx.conf (plausible.io / www.googletagmanager.com +
   * *.google-analytics.com) when switching it on.
   */
  analytics: { provider: null as 'plausible' | 'ga4' | null, id: '' },
  /** Last review of tax rules, tariffs and freight rates - shown on the methodology page. */
  ratesReviewed: '2026-10-25',
  /** Date and version of the terms; bump when the text changes (stored with every order). */
  termsVersion: '2026-10-24',
} as const;
