import {
  Anchor, ArrowLeft, ArrowLeftRight, ArrowRight, Atom, BadgePercent, Banknote, BatteryCharging, Building2, Calculator,
  Car, CarFront, ChartPie, Check, ChevronDown, CircleCheck, Clock, Construction, Container, Cookie, Download, Droplet,
  ExternalLink, FileText, Flag, Flame, Forklift, Fuel, Globe, LoaderCircle, MapPin, Navigation, Handshake, Info, Key, Landmark, Languages, Leaf, ListChecks, Lock, Mail,
  Menu, Monitor, Moon, Motorbike, MoveRight, Plug, Receipt, Route, Scale, Search, Ship, ShieldCheck, Sparkles, Sun, Timer,
  TriangleAlert, Truck, User, Van, Wallet, X, Zap,
} from 'lucide-angular';

/** Lucide icon data: [tag, attributes][]. */
export type IconNode = readonly (readonly [string, Record<string, string>])[];

/**
 * App-wide icon registry. Only icons listed here end up in the bundle; templates refer to them by these names.
 * Vehicle/fuel names match the backend enums so options can map straight to icons.
 */
export const ICONS = {
  anchor: Anchor, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight, 'arrow-long': MoveRight, exchange: ArrowLeftRight, atom: Atom,
  percent: BadgePercent, banknote: Banknote, building: Building2, calculator: Calculator, check: Check,
  'check-circle': CircleCheck, 'chevron-down': ChevronDown, clock: Clock, container: Container, cookie: Cookie,
  download: Download, document: FileText, 'external-link': ExternalLink, globe: Globe, handshake: Handshake, info: Info, landmark: Landmark,
  languages: Languages, list: ListChecks, lock: Lock, mail: Mail, menu: Menu, 'map-pin': MapPin, navigation: Navigation, loader: LoaderCircle, monitor: Monitor, moon: Moon,
  pie: ChartPie, receipt: Receipt, route: Route, scale: Scale, search: Search, ship: Ship, shield: ShieldCheck,
  sparkles: Sparkles, sun: Sun, timer: Timer, user: User, wallet: Wallet, warning: TriangleAlert, x: X,

  // vehicle categories
  PASSENGER_CAR: Car, SUV: CarFront, PICKUP_TRUCK: Truck, VAN: Van, MOTORCYCLE: Motorbike,
  // fuel types
  PETROL: Fuel, DIESEL: Droplet, LPG: Flame, MHEV: BatteryCharging, HEV: Leaf, PHEV: Plug, EV: Zap, HYDROGEN: Atom,
  // vehicle condition
  RUN_AND_DRIVE: Flag, ENGINE_STARTS: Key, NON_RUNNING: Construction, forklift: Forklift,
} as const satisfies Record<string, unknown>;

export type IconName = keyof typeof ICONS;
