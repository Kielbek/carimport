import { GuideOrigin } from '../guides/guide-data.generated';

export type BlogCategory = 'costs' | 'buying' | 'customs' | 'registration' | 'logistics';

/** A block of article body: one key per block, rendered in order. */
export type BlogBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { tip: string }
  | { table: { head: string[]; rows: string[][] } };

/**
 * A blog article in one language (src/content/blog/{lang}.json). The same topic has the same `id` in every language -
 * that links the language versions (hreflang) - but each language writes it for its own country and searches.
 */
export interface BlogArticle {
  id: string;
  slug: string;
  category: BlogCategory;
  /** Country of purchase the article is about - preselected in the calculator link. */
  origin: GuideOrigin | null;
  date: string;
  minutes: number;
  title: string;
  metaTitle: string;
  description: string;
  lead: string;
  blocks: BlogBlock[];
  faq: { q: string; a: string }[];
}
