import { GuideOrigin } from '../guide-data.generated';

/** One chapter of the in-depth origin guide: a heading and paragraphs; an array is a bullet list. */
export interface DeepSection {
  /** Anchor, the same in every language (#auctions, #titles, ...). */
  id: string;
  title: string;
  paras: (string | string[])[];
}

export type OriginDeep = Record<GuideOrigin, DeepSection[]>;

/** Month the guides were last reviewed (shown under the heading). */
export const ORIGIN_DEEP_REVIEWED = '2026-10';
