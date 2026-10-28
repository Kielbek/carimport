import { Lang } from '../../../core/i18n/languages';
import { OriginDeep } from './types';

/** The in-depth origin guides per language, each in its own chunk - loaded only on the origin pages. */
export const ORIGIN_DEEP_LOADERS: Partial<Record<Lang, () => Promise<OriginDeep>>> = {
  de: () => import('./de').then((m) => m.ORIGIN_DEEP),
  en: () => import('./en').then((m) => m.ORIGIN_DEEP),
  es: () => import('./es').then((m) => m.ORIGIN_DEEP),
  fr: () => import('./fr').then((m) => m.ORIGIN_DEEP),
  it: () => import('./it').then((m) => m.ORIGIN_DEEP),
  nl: () => import('./nl').then((m) => m.ORIGIN_DEEP),
  pl: () => import('./pl').then((m) => m.ORIGIN_DEEP),
};
