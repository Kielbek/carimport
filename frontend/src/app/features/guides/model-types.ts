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
  /** Freely licensed photo (Wikimedia Commons), fetched by tools/fetch_model_photos.py; absent until fetched. */
  photo?: ModelPhoto | { commons: string };
}

export interface ModelPhoto {
  /** Base path without size and extension: /images/models/ford-mustang -> -640.webp, -1280.webp. */
  src: string;
  width: number;
  height: number;
  author: string;
  license: string;
  licenseUrl: string;
  /** File page on Wikimedia Commons. */
  source: string;
  /** Commons file title; set alone (without src) it pins the file for the fetch script. */
  commons?: string;
}

/** One EU country in the model's cost comparison, in EUR. */
export interface ModelEuCost {
  total: number;
  /** Duty + import VAT + national registration taxes. */
  taxes: number;
  national: number;
  port: string;
  /** The country has a registration tax that is not estimated (official calculator only): the total leaves it out. */
  unpriced: boolean;
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
  /** [purchase price in the origin currency, total in the example currency]: 70 %, typical, 130 % of the price. */
  steps: [number, number][];
}
