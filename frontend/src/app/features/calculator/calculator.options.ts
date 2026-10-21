import {
  AuctionHouse,
  DeliveryMode,
  FuelType,
  OriginCountry,
  PortOption,
  VehicleCategory,
  VehicleCondition,
} from '../../core/api/api.models';
import { IconName } from '../../shared/icon/icons';

/**
 * Static wizard options. Server-side validation is authoritative; these only drive the UI.
 * `typicalBid` (in the origin currency) replaces the price when the user switches to a country with another currency.
 */
export const ORIGINS: { code: OriginCountry; currency: string; auctions: AuctionHouse[]; typicalBid: number }[] = [
  { code: 'USA', currency: 'USD', auctions: ['COPART', 'IAAI', 'DEALER'], typicalBid: 12000 },
  { code: 'CANADA', currency: 'CAD', auctions: ['COPART', 'IAAI', 'DEALER'], typicalBid: 16000 },
  { code: 'JAPAN', currency: 'JPY', auctions: ['USS', 'DEALER'], typicalBid: 1800000 },
  { code: 'UAE', currency: 'AED', auctions: ['COPART', 'EMIRATES_AUCTION', 'DEALER'], typicalBid: 45000 },
  { code: 'UK', currency: 'GBP', auctions: ['COPART', 'IAAI', 'DEALER'], typicalBid: 9500 },
];

/** Pickup zones with dedicated inland rates; everything else uses the country-wide fallback. */
export const PICKUP_ZONES: Partial<Record<OriginCountry, string[]>> = {
  USA: ['NJ', 'NY', 'PA', 'GA', 'FL', 'TX', 'IL', 'AZ', 'CA'],
  CANADA: ['ON', 'QC'],
};

/** Export ports (UN/LOCODE -> name). */
export const DEPARTURE_PORTS: Record<string, string> = {
  USNWK: 'New York / Newark',
  USSAV: 'Savannah',
  USHOU: 'Houston',
  USLAX: 'Los Angeles',
  CAHAL: 'Halifax',
  CAMTR: 'Montréal',
  JPYOK: 'Yokohama',
  AEJEA: 'Jebel Ali (Dubai)',
  GBSOU: 'Southampton',
};

/** Mirrors the seeded EU ports; used for prerendering and as an offline fallback for GET /reference/ports. */
export const FALLBACK_PORTS: PortOption[] = [
  { code: 'BEANR', name: 'Antwerpen', countryCode: 'BE', vatRate: 0.21, supportsProcedure4200: true },
  { code: 'DEBRV', name: 'Bremerhaven', countryCode: 'DE', vatRate: 0.19, supportsProcedure4200: true },
  { code: 'PLGDY', name: 'Gdynia', countryCode: 'PL', vatRate: 0.23, supportsProcedure4200: true },
  { code: 'DEHAM', name: 'Hamburg', countryCode: 'DE', vatRate: 0.19, supportsProcedure4200: true },
  { code: 'NLRTM', name: 'Rotterdam', countryCode: 'NL', vatRate: 0.21, supportsProcedure4200: true },
];

export const EU_COUNTRIES = [
  'PL', 'DE', 'NL', 'BE', 'CZ', 'SK', 'LT', 'AT', 'FR', 'IT', 'ES', 'LV', 'EE', 'FI', 'SE', 'DK', 'IE', 'PT', 'HU',
  'RO', 'BG', 'HR', 'SI', 'GR', 'CY', 'MT', 'LU',
] as const;

export const CATEGORIES: VehicleCategory[] = ['PASSENGER_CAR', 'SUV', 'PICKUP_TRUCK', 'VAN', 'MOTORCYCLE'];
export const FUELS: FuelType[] = ['PETROL', 'DIESEL', 'LPG', 'MHEV', 'HEV', 'PHEV', 'EV', 'HYDROGEN'];
export const CONDITIONS: { code: VehicleCondition; surcharge: boolean }[] = [
  { code: 'RUN_AND_DRIVE', surcharge: false },
  { code: 'ENGINE_STARTS', surcharge: true },
  { code: 'NON_RUNNING', surcharge: true },
];

export const DELIVERY_MODES: { code: DeliveryMode; icon: IconName }[] = [
  { code: 'CAR_CARRIER', icon: 'container' },
  { code: 'TOW_TRUCK', icon: 'NON_RUNNING' },
  { code: 'SELF_DRIVE', icon: 'ENGINE_STARTS' },
  { code: 'PORT_PICKUP', icon: 'anchor' },
];

/** Engine displacement at which Polish excise jumps (art. 105 ustawy o podatku akcyzowym). */
export const EXCISE_THRESHOLD_CC = 2000;
