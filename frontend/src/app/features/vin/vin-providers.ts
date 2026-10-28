/**
 * Vehicle history report providers compared on the comparison page. Facts as checked in October 2026 (prices are
 * indicative and change) - review them when updating the page. Put your own referral link in affiliateUrl; links with
 * one are marked rel="sponsored".
 */
export interface VinProvider {
  id: string;
  name: string;
  url: string;
  affiliateUrl: string | null;
  /** Where its data comes from. */
  regions: readonly ('US' | 'CA' | 'EU')[];
  /** US title brands and total-loss records (salvage, rebuilt, flood...). */
  usTitles: 'yes' | 'partial' | 'unknown';
  /** Photos from earlier listings or auctions. */
  photos: 'yes' | 'sometimes' | 'no' | 'unknown';
  /** Indicative price of one report. */
  price: string;
}

export const VIN_PROVIDERS_CHECKED = '2026-10';

export const VIN_PROVIDERS: readonly VinProvider[] = [
  { id: 'carvertical', name: 'carVertical', url: 'https://www.carvertical.com', affiliateUrl: null, regions: ['EU', 'US'], usTitles: 'yes', photos: 'sometimes', price: '≈ 28–30 EUR' },
  { id: 'autodna', name: 'autoDNA', url: 'https://www.autodna.com', affiliateUrl: null, regions: ['EU', 'US'], usTitles: 'yes', photos: 'sometimes', price: '≈ 20–25 EUR' },
  { id: 'carfax', name: 'Carfax', url: 'https://www.carfax.com', affiliateUrl: null, regions: ['US', 'CA'], usTitles: 'yes', photos: 'no', price: '≈ 45 USD' },
  { id: 'autocheck', name: 'AutoCheck', url: 'https://www.autocheck.com', affiliateUrl: null, regions: ['US'], usTitles: 'yes', photos: 'no', price: '≈ 30 USD' },
  { id: 'vinaudit', name: 'VinAudit', url: 'https://www.vinaudit.com', affiliateUrl: null, regions: ['US'], usTitles: 'yes', photos: 'no', price: '≈ 10 USD' },
  { id: 'automano', name: 'Automano', url: 'https://automano.com', affiliateUrl: 'https://automano.com/?aff=cargloapp', regions: ['US'], usTitles: 'unknown', photos: 'unknown', price: '≈ 7 USD' },
];
