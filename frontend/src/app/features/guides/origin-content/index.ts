import { Lang } from '../../../core/i18n/languages';
import { OriginDeep } from './types';

/** The in-depth origin guides per language, each in its own chunk - loaded only on the origin pages. */
export const ORIGIN_DEEP_LOADERS: Partial<Record<Lang, () => Promise<OriginDeep>>> = {
  bg: () => import('./bg').then((m) => m.ORIGIN_DEEP),
  cs: () => import('./cs').then((m) => m.ORIGIN_DEEP),
  da: () => import('./da').then((m) => m.ORIGIN_DEEP),
  de: () => import('./de').then((m) => m.ORIGIN_DEEP),
  el: () => import('./el').then((m) => m.ORIGIN_DEEP),
  en: () => import('./en').then((m) => m.ORIGIN_DEEP),
  es: () => import('./es').then((m) => m.ORIGIN_DEEP),
  et: () => import('./et').then((m) => m.ORIGIN_DEEP),
  fi: () => import('./fi').then((m) => m.ORIGIN_DEEP),
  fr: () => import('./fr').then((m) => m.ORIGIN_DEEP),
  hr: () => import('./hr').then((m) => m.ORIGIN_DEEP),
  hu: () => import('./hu').then((m) => m.ORIGIN_DEEP),
  it: () => import('./it').then((m) => m.ORIGIN_DEEP),
  lt: () => import('./lt').then((m) => m.ORIGIN_DEEP),
  lv: () => import('./lv').then((m) => m.ORIGIN_DEEP),
  nl: () => import('./nl').then((m) => m.ORIGIN_DEEP),
  pl: () => import('./pl').then((m) => m.ORIGIN_DEEP),
  pt: () => import('./pt').then((m) => m.ORIGIN_DEEP),
  ro: () => import('./ro').then((m) => m.ORIGIN_DEEP),
  sk: () => import('./sk').then((m) => m.ORIGIN_DEEP),
  sl: () => import('./sl').then((m) => m.ORIGIN_DEEP),
  sv: () => import('./sv').then((m) => m.ORIGIN_DEEP),
  uk: () => import('./uk').then((m) => m.ORIGIN_DEEP),
};
