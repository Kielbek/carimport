import { Lang } from '../../../core/i18n/languages';
import { OriginDeep } from './types';

/** The in-depth origin guides per language, each in its own chunk - loaded only on the origin pages. */
export const ORIGIN_DEEP_LOADERS: Partial<Record<Lang, () => Promise<OriginDeep>>> = {
  en: () => import('./en').then((m) => m.ORIGIN_DEEP),
  pl: () => import('./pl').then((m) => m.ORIGIN_DEEP),
};
