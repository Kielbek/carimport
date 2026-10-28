/** A freely licensed photo shown on an article page (fetched by tools/fetch_page_photos.py, chosen by hand). */
export interface PagePhoto {
  src: string;
  width: number;
  height: number;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

/** Chosen photo per article page; a page without an entry shows none. */
export const PAGE_PHOTOS: Record<string, PagePhoto> = {};
