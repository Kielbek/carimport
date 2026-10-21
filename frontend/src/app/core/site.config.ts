/** Public site identity used for canonical URLs, hreflang, Open Graph and structured data. Change per deployment. */
export const SITE = {
  url: 'https://carimport.eu',
  name: 'CarImport.eu',
  email: 'kontakt@carimport.eu',
  ogImage: '/og-image.png',
  /**
   * Hero photo (e.g. '/images/hero-car.webp', ~1800px wide, dark background works best). null = built-in SVG
   * illustration. Use only photos you own or license.
   */
  heroImage: null as string | null,
  /** Shown in the header like on the brand template (e.g. '+48 22 123 45 67'); null hides it. */
  phone: null as string | null,
} as const;
