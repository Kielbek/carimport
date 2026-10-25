/** Public site identity used for canonical URLs, hreflang, Open Graph and structured data. Change per deployment. */
export const SITE = {
  url: 'https://cargloapp.com',
  name: 'Carglo',
  email: 'cargloapp@gmail.com',
  ogImage: '/og-image.png',
  /**
   * The seller, as required in the terms and for consumer contracts. FILL IN BEFORE LAUNCH - same values as
   * app.company in the backend application.yml (printed in the report e-mail).
   */
  company: {
    name: '[nazwa firmy / imię i nazwisko przedsiębiorcy]',
    address: '[adres siedziby]',
    taxId: '[NIP]',
    registry: '[KRS / CEIDG]',
  },
  /**
   * Conversion analytics, loaded only after consent to analytics cookies. provider null = off.
   * plausible: id = the site's domain in Plausible; ga4: id = the measurement ID (G-XXXXXXX).
   * Add the provider's host to the CSP in frontend/nginx.conf (plausible.io / www.googletagmanager.com +
   * *.google-analytics.com) when switching it on.
   */
  analytics: { provider: null as 'plausible' | 'ga4' | null, id: '' },
  /** Date and version of the terms; bump when the text changes (stored with every order). */
  termsVersion: '2026-10-24',
} as const;
