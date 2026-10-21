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
} as const;
