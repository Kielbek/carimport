/** TypeScript mirror of the backend DTOs (com.carimport.*). Keep in sync with the Java records. */
import { DisplayCurrency } from '../currency/currencies';

export type { DisplayCurrency } from '../currency/currencies';

export type OriginCountry = 'USA' | 'CANADA' | 'JAPAN' | 'UAE' | 'UK';
export type AuctionHouse = 'COPART' | 'IAAI' | 'USS' | 'EMIRATES_AUCTION' | 'DEALER';
export type TitleType = 'CLEAN' | 'SALVAGE';
export type VehicleCategory = 'PASSENGER_CAR' | 'SUV' | 'PICKUP_TRUCK' | 'MOTORCYCLE' | 'VAN';
export type FuelType = 'PETROL' | 'DIESEL' | 'LPG' | 'HEV' | 'MHEV' | 'PHEV' | 'EV' | 'HYDROGEN';
export type VehicleCondition = 'RUN_AND_DRIVE' | 'ENGINE_STARTS' | 'NON_RUNNING';
export type ShippingMethod = 'CONTAINER_SHARED' | 'CONTAINER_EXCLUSIVE' | 'RORO';
export type BuyerType = 'PRIVATE' | 'COMPANY';
export type CustomsProcedure = 'STANDARD_4000' | 'VAT_DEFERRED_4200';
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
  /** Port-to-door leg; null = proposal (car carrier for a runner, tow truck otherwise). */
  deliveryMode: DeliveryMode | null;
  /** Road distance from the EU port; null = from the address, else typical for the country. */
  deliveryDistanceKm: number | null;
  /** Own per-km price in the destination currency; null = tariff. */
  pricePerKm: number | null;
  /** In the display currency; null = the calculator's proposal, 0 = none. */
  repairEstimate: number | null;
  insuranceEstimate: number | null;
  /** Selected optional after-import services; null = recommended defaults. */
  postImportServices: string[] | null;
  /** Delivery address picked from the address search. */
  destinationAddress: string | null;
  destinationLat: number | null;
  destinationLon: number | null;
  /** WLTP CO₂ g/km from the CoC; null = estimated from fuel and displacement. */
  co2Gkm: number | null;
  /** Engine power in kW; null = estimated. */
  powerKw: number | null;
  /** Registration tax the buyer computed themselves (display currency); null = our estimate. */
  registrationTaxOwn: number | null;
  /** Curb weight in kg; null = estimated. */
  massKg: number | null;
  /** VIN the data came from and the decoded make/model - shown in the report. */
  vin: string | null;
  vehicleDescription: string | null;
  /** Claims 0 % duty: the car was built in the origin country and its origin can be proven. */
  preferentialOrigin?: boolean | null;
}

export type PortRegion = 'NORTH_SEA' | 'ATLANTIC' | 'BALTIC' | 'WEST_MED' | 'EAST_MED';

/** A geocoded address (EU only). */
export interface Place {
  label: string;
  countryCode: string;
  lat: number;
  lon: number;
}

/** One EU port priced door to door for the current car and address. */
export interface PortSuggestion {
  code: string;
  name: string;
  countryCode: string;
  region: PortRegion;
  lat: number;
  lon: number;
  distanceKm: number | null;
  distanceMethod: 'ROUTED' | 'ESTIMATED';
  /** Duty, VAT of the port country, national taxes of the destination and port fees (display currency). */
  taxes: TaxSummary;
  /** How much more this port costs door to door than the cheapest one (0 for the cheapest). */
  extraVsBest: number;
  daysMin: number;
  daysMax: number;
}

/** The calculator's current proposal for every field the user does not have to fill in. */
export interface Suggestions {
  recommendedPort: string;
  ports: PortSuggestion[];
  deliveryMode: DeliveryMode;
  repairEstimate: number;
  insuranceEstimate: number;
  currency: string;
  co2Estimate: number;
  powerKwEstimate: number;
  massKgEstimate: number;
  /** EXCISE (Polish excise), NONE, ESTIMATED (our formula) or OFFICIAL_CALCULATOR (buyer types it). */
  registrationTax: 'EXCISE' | 'NONE' | 'ESTIMATED' | 'OFFICIAL_CALCULATOR';
  registrationTaxEstimate: number | null;
  registrationTaxUrl: string | null;
}

export interface Timeline {
  stages: { code: string; minDays: number; maxDays: number }[];
  totalMin: number;
  totalMax: number;
}

/** Free tier: rounded scenario totals, shares, what is included (names only) and which risks were considered. */
/** One tax line of the free result: rate as a fraction, the country that levies it, whole-unit amount. */
export interface TaxItem {
  code: string;
  rate: number | null;
  country: string;
  amount: number;
}

/** The free "on paper" part: duty, import VAT of the port country, national taxes of the destination, port fees. */
export interface TaxSummary {
  duty: TaxItem;
  vat: TaxItem;
  national: TaxItem[];
  portFees: number;
  total: number;
  /** Day whose rates customs applies this month (penultimate Wednesday of the last one); null = today's rates. */
  customsFxDate: string | null;
  /** Purchase price with the auction's fees - the same through every port. */
  carPrice: number;
  /** Pickup, inland haul, ocean freight and insurance to this port. */
  transportToPort: number;
  /** From the port to the delivery address. */
  delivery: number;
  /** Everything that changes with the port: transport + duty, VAT, national taxes, port fees + delivery. */
  routeTotal: number;
  /** Car + route: at the door, before registration, repairs and risks. */
  totalWithCar: number;
  /** Optimistic and pessimistic door price (result only; null in the port ranking). Transport, delivery and the
   *  totals are estimates rounded to 100 - the exact amounts are in the paid report. */
  estimateMin: number | null;
  estimateMax: number | null;
}

/**
 * Free result: only the simple taxes; the door-to-door total, scenarios, transport, delivery, registration and hidden
 * costs are computed but only listed by name (lockedItems) - the paid report shows them.
 */
export interface PublicQuoteView {
  quoteId: string | null;
  currency: DisplayCurrency;
  taxes: TaxSummary;
  clearancePort: string;
  clearanceCountry: string;
  destinationCountry: string;
  lockedItems: Partial<Record<CostCategory, string[]>>;
  risks: string[];
  lockedCount: number;
  transitDays: number;
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

/** GET /reports/orders/{id}: payment, PDF and e-mail state of a bought report. */
export interface OrderProgress {
  orderId: string;
  status: OrderStatus;
  downloadable: boolean;
  /** Masked address the report goes to, e.g. j***@gmail.com. */
  emailTo: string;
  emailSent: boolean;
  /** E-mail delivery is configured on the server. */
  mailEnabled: boolean;
}

export interface PortOption {
  code: string;
  name: string;
  countryCode: string;
  vatRate: number;
  supportsProcedure4200: boolean;
  region?: PortRegion;
  lat?: number | null;
  lon?: number | null;
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

/** GET /vehicle/vin/{vin}: only what the sources state; null fields stay as the calculator's proposals. */
export interface VinDecoding {
  vin: string;
  /** NHTSA = found in the US vehicle database; OFFLINE = only what the VIN itself encodes. */
  source: 'NHTSA' | 'OFFLINE';
  checkDigitValid: boolean;
  modelYear: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  bodyClass: string | null;
  vehicleCategory: VehicleCategory | null;
  fuelType: FuelType | null;
  engineCc: number | null;
  cylinders: number | null;
  powerKw: number | null;
  co2Gkm: number | null;
  co2Source: 'EPA' | null;
  massKg: number | null;
  massSource: 'CURB' | 'GVWR' | null;
  manufacturedIn: string | null;
  warnings: string[];
  description: string;
}

/** A car bought in another member state (POST /quotes/eu). */
export interface EuImportRequest {
  originCountry: string;
  destinationCountry: string;
  price: number;
  priceCurrency: string;
  displayCurrency: string;
  productionYear: number;
  fuelType: FuelType;
  engineCc: number;
  vehicleCategory: VehicleCategory | null;
  powerKw: number | null;
  co2Gkm: number | null;
  massKg: number | null;
  newVehicle: boolean;
  deliveryMode: DeliveryMode | null;
  distanceKm: number | null;
  destinationLat: number | null;
  destinationLon: number | null;
  registrationTaxOwn: number | null;
}

export interface EuImportResult {
  currency: string;
  fxDate: string;
  lines: CostLine[];
  byCategory: Record<CostCategory, Money>;
  total: Money;
  distanceKm: number;
  vatRate: number;
  warnings: string[];
}
