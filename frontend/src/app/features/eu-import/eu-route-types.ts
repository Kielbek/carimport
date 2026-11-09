import { Lang } from '../../core/i18n/languages';

/** One cost line of an example, amounts in the route's currency. */
export interface EuRouteLine {
  code: string;
  amount: number;
  rate: number | null;
  params: Record<string, string>;
}

/** An example car priced on the route (car carrier, used car bought without VAT on top). */
export interface EuRouteExample {
  car: 'petrol' | 'diesel' | 'ev';
  priceEur: number;
  year: number;
  fuel: string;
  cc: number;
  kw: number;
  co2: number;
  lines: EuRouteLine[];
  total: number;
  warnings: string[];
}

/** A popular import route between two member states, published in the destination's language. */
export interface EuRoute {
  lang: Lang;
  from: string;
  to: string;
  /** URL segment after the EU import slug: {origin}-{destination}, e.g. niemcy-polska. */
  slug: string;
  km: number;
  currency: string;
  fxDate: string;
  examples: EuRouteExample[];
  /** Transport of the first example car by car carrier, tow truck and on its own wheels (export plates). */
  transport: Record<'CAR_CARRIER' | 'TOW_TRUCK' | 'SELF_DRIVE', number>;
}
