/** TypeScript mirror of the backend DTOs (com.carimport.*). Keep in sync with the Java records. */

export type OriginCountry = 'USA' | 'CANADA' | 'JAPAN' | 'UAE' | 'UK';
export type AuctionHouse = 'COPART' | 'IAAI' | 'USS' | 'EMIRATES_AUCTION' | 'DEALER';
export type TitleType = 'CLEAN' | 'SALVAGE';
export type VehicleCategory = 'PASSENGER_CAR' | 'SUV' | 'PICKUP_TRUCK' | 'MOTORCYCLE' | 'VAN';
export type FuelType = 'PETROL' | 'DIESEL' | 'LPG' | 'HEV' | 'MHEV' | 'PHEV' | 'EV' | 'HYDROGEN';
export type VehicleCondition = 'RUN_AND_DRIVE' | 'ENGINE_STARTS' | 'NON_RUNNING';
export type ShippingMethod = 'CONTAINER_SHARED' | 'CONTAINER_EXCLUSIVE' | 'RORO';
export type BuyerType = 'PRIVATE' | 'COMPANY';
export type CustomsProcedure = 'STANDARD_4000' | 'VAT_DEFERRED_4200';
export type DisplayCurrency = 'PLN' | 'EUR' | 'USD';
export type CostCategory = 'VEHICLE' | 'TRANSPORT' | 'TAXES' | 'REGISTRATION' | 'RISK';
export type DeliveryMode = 'PORT_PICKUP' | 'CAR_CARRIER' | 'TOW_TRUCK' | 'SELF_DRIVE';

export interface CalculationRequest {
  originCountry: OriginCountry;
  auctionHouse: AuctionHouse;
  titleType: TitleType;
  pickupZone: string | null;
  departurePort: string | null;
  bidPrice: number;
  vehicleCategory: VehicleCategory;
  fuelType: FuelType;
  engineCc: number;
  productionYear: number;
  historicOriginalCondition: boolean;
  condition: VehicleCondition;
  shippingMethod: ShippingMethod;
  euPortCode: string;
  destinationCountry: string;
  buyerType: BuyerType;
  customsProcedure: CustomsProcedure;
  displayCurrency: DisplayCurrency;
  /** Port-to-door leg; null = car carrier. */
  deliveryMode: DeliveryMode | null;
  /** Own distance from the EU port; null = typical for the country. */
  deliveryDistanceKm: number | null;
  /** Own per-km price in the destination currency; null = tariff. */
  pricePerKm: number | null;
  /** In the display currency. */
  repairEstimate: number | null;
  insuranceEstimate: number | null;
  /** Selected optional after-import services; null = recommended defaults. */
  postImportServices: string[] | null;
}

export interface Timeline {
  stages: { code: string; minDays: number; maxDays: number }[];
  totalMin: number;
  totalMax: number;
}

/** Free tier: rounded scenario totals, shares, what is included (names only) and which risks were considered. */
export interface PublicQuoteView {
  quoteId: string | null;
  rangeMin: number;
  rangeMax: number;
  currency: DisplayCurrency;
  scenarios: { optimistic: number; average: number; pessimistic: number };
  sharePercent: Record<CostCategory, number>;
  includedItems: Partial<Record<CostCategory, string[]>>;
  risks: { code: string; probabilityPercent: number }[];
  exciseApplies: boolean;
  transitDays: number;
  timeline: Timeline;
  deliveryKm: number;
  fxDate: string;
  warnings: string[];
  expiresAt: string | null;
}

export interface RouteOptions {
  departurePorts: string[];
  services: { code: string; statutory: boolean; defaultSelected: boolean }[];
  delivery: { mode: DeliveryMode; perKmMin: number; perKmMax: number; fixedFee: number; minimumCharge: number; currency: string }[];
  typicalDistanceKm: number | null;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface CostLine {
  code: string;
  category: CostCategory;
  original: Money;
  amount: Money;
  taxBase: Money | null;
  rate: number | null;
  includedInTotal: boolean;
  params: Record<string, string>;
}

export interface CalculationResult {
  calculationDate: string;
  taxCurrency: string;
  displayCurrency: DisplayCurrency;
  fxDate: string;
  lines: { line: CostLine; display: Money }[];
  customsValue: Money;
  hsCode: string;
  dutyRate: number;
  historic: boolean;
  route: { departurePort: string; euPortCode: string; euPortName: string; transitDays: number };
  totalsByCategory: Record<CostCategory, Money>;
  total: Money;
  warnings: string[];
  timeline: Timeline;
  deliveryKm: number;
}

export interface FullReport {
  result: CalculationResult;
  scenarios: { low: CalculationResult; expected: CalculationResult; high: CalculationResult } | null;
  documents: { key: string; stage: 'PURCHASE' | 'SHIPPING' | 'CUSTOMS' | 'REGISTRATION' }[];
  plan: { key: string; deadline: string }[];
}

export type OrderStatus = 'PENDING' | 'PAID' | 'GENERATING' | 'READY' | 'FAILED' | 'EXPIRED' | 'REFUNDED';

export interface PortOption {
  code: string;
  name: string;
  countryCode: string;
  vatRate: number;
  supportsProcedure4200: boolean;
}

export interface AffiliateOffer {
  id: string;
  kind: 'CURRENCY_EXCHANGE' | 'VIN_CHECK' | 'FINANCING';
  partner: string;
  href: string;
}

/** RFC 9457 problem detail returned by the API. */
export interface ApiProblem {
  status: number;
  detail?: string;
  messageKey?: string;
  errors?: Record<string, string>;
}
