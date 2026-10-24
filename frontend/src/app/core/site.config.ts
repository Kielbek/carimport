/** Public site identity used for canonical URLs, hreflang, Open Graph and structured data. Change per deployment. */
export const SITE = {
  url: 'https://carimport.eu',
  name: 'CarImport.eu',
  email: 'kontakt@carimport.eu',
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
  /** Date and version of the terms; bump when the text changes (stored with every order). */
  termsVersion: '2026-10-24',
} as const;
