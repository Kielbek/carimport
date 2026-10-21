import {
  AuctionHouse,
  FuelType,
  OriginCountry,
  VehicleCategory,
  VehicleCondition,
} from '../../core/api/api.models';

/** Static wizard options. Server-side validation is authoritative; these only drive the UI. */
export const ORIGINS: { code: OriginCountry; flag: string; currency: string; auctions: AuctionHouse[] }[] = [
  { code: 'USA', flag: '🇺🇸', currency: 'USD', auctions: ['COPART', 'IAAI', 'DEALER'] },
  { code: 'CANADA', flag: '🇨🇦', currency: 'CAD', auctions: ['COPART', 'IAAI', 'DEALER'] },
  { code: 'JAPAN', flag: '🇯🇵', currency: 'JPY', auctions: ['USS', 'DEALER'] },
  { code: 'UAE', flag: '🇦🇪', currency: 'AED', auctions: ['COPART', 'EMIRATES_AUCTION', 'DEALER'] },
  { code: 'UK', flag: '🇬🇧', currency: 'GBP', auctions: ['COPART', 'IAAI', 'DEALER'] },
];

/** Pickup zones with dedicated inland rates; everything else uses the country-wide fallback. */
export const PICKUP_ZONES: Partial<Record<OriginCountry, string[]>> = {
  USA: ['NJ', 'NY', 'PA', 'GA', 'FL', 'TX', 'IL', 'AZ', 'CA'],
  CANADA: ['ON', 'QC'],
};

export const FALLBACK_PORTS = [
  { code: 'DEBRV', name: 'Bremerhaven', countryCode: 'DE', vatRate: 0.19, supportsProcedure4200: true },
  { code: 'NLRTM', name: 'Rotterdam', countryCode: 'NL', vatRate: 0.21, supportsProcedure4200: true },
  { code: 'PLGDY', name: 'Gdynia', countryCode: 'PL', vatRate: 0.23, supportsProcedure4200: true },
];

export const EU_COUNTRIES = [
  'PL', 'DE', 'NL', 'BE', 'CZ', 'SK', 'LT', 'AT', 'FR', 'IT', 'ES', 'LV', 'EE', 'FI', 'SE', 'DK', 'IE', 'PT', 'HU',
  'RO', 'BG', 'HR', 'SI', 'GR', 'CY', 'MT', 'LU',
] as const;

export const CATEGORIES: { code: VehicleCategory; icon: string }[] = [
  { code: 'PASSENGER_CAR', icon: '🚗' },
  { code: 'SUV', icon: '🚙' },
  { code: 'PICKUP_TRUCK', icon: '🛻' },
  { code: 'VAN', icon: '🚐' },
  { code: 'MOTORCYCLE', icon: '🏍️' },
];

export const FUELS: { code: FuelType; icon: string }[] = [
  { code: 'PETROL', icon: '⛽' },
  { code: 'DIESEL', icon: '🛢️' },
  { code: 'LPG', icon: '🔥' },
  { code: 'MHEV', icon: '🔋' },
  { code: 'HEV', icon: '♻️' },
  { code: 'PHEV', icon: '🔌' },
  { code: 'EV', icon: '⚡' },
  { code: 'HYDROGEN', icon: '💧' },
];

export const CONDITIONS: { code: VehicleCondition; icon: string; surcharge: boolean }[] = [
  { code: 'RUN_AND_DRIVE', icon: '🏁', surcharge: false },
  { code: 'ENGINE_STARTS', icon: '🔑', surcharge: true },
  { code: 'NON_RUNNING', icon: '🏗️', surcharge: true },
];

/** Engine displacement at which Polish excise jumps (art. 105 ustawy o podatku akcyzowym). */
export const EXCISE_THRESHOLD_CC = 2000;
