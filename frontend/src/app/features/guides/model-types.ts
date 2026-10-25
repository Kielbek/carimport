import { GuideOrigin } from './guide-data.generated';

/** A model of frontend/tools/models.json (source of the generated model pages). */
export interface GuideModel {
  id: string;
  make: string;
  model: string;
  engine: string;
  year: number;
  origin: GuideOrigin;
  auction: string;
  zone: string;
  /** Typical purchase price in the origin currency. */
  price: number;
  cc: number;
  fuel: string;
  kw: number;
  co2: number;
  kg: number;
  category: string;
}

/** Example cost of a model registered in one country, in that country's currency (see ModelExampleGenerator). */
export interface ModelExample {
  currency: string;
  port: string;
  /** UN/LOCODE of the EU port - its first two letters are the country where duty and VAT are paid. */
  portCode: string;
  departure: string;
  days: [number, number];
  price: number;
  transport: number;
  duty: number;
  vat: number;
  vatRate: number;
  national: { code: string; amount: number }[];
  registration: number;
  other: number;
  total: number;
  low: number;
  high: number;
}
