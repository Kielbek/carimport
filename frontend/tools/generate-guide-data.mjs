// Generates src/app/features/guides/guide-data.generated.ts - the data behind the SEO guide pages:
//   ports (name, country, region, coordinates, fees, sailing days per origin) from the Flyway migrations,
//   EU countries (VAT, currency, population centre, nearest ports) and localized URL slugs for every language
//   (country and origin names via Intl, transliterated to ASCII).
// Re-run after changing ports, rates or languages:  node tools/generate-guide-data.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const v2 = read('backend/src/main/resources/db/migration/V2__reference_data.sql');
const v4 = read('backend/src/main/resources/db/migration/V4__all_eu_ports.sql');
const centresJava = read('backend/src/main/java/com/carimport/geo/CountryCentres.java');
const langs = [...read('frontend/src/app/core/i18n/languages.ts').matchAll(/\{ code: '([a-z]{2})'.*?locale: '([^']+)'/g)]
  .map((m) => ({ code: m[1], locale: m[2] }));

// --- VAT and tax currency per EU country
const vat = {};
for (const m of v2.matchAll(/\('([A-Z]{2})', '([A-Z]{3})', ([\d.]+), [\d.]+, (?:TRUE|FALSE), '2000-01-01'\)/g)) {
  vat[m[1]] = { currency: m[2], vat: Number(m[3]) };
}

// --- population centres (same points the backend uses for typical distances)
const centres = {};
for (const m of centresJava.matchAll(/"([A-Z]{2})", new GeoPoint\(([-\d.]+), ([-\d.]+)\)/g)) {
  centres[m[1]] = [Number(m[2]), Number(m[3])];
}

// --- ports: the five original ones (V2 + coordinates in V4) and the V4 inserts
const ports = {};
for (const m of v2.matchAll(/\('([A-Z]{5})', '([^']+)', '([A-Z]{2})', (\d+), (\d+), '([A-Z]{3})', (?:TRUE|FALSE)\)/g)) {
  ports[m[1]] = { code: m[1], name: m[2], country: m[3], unloading: +m[4], agency: +m[5], feeCurrency: m[6], region: 'NORTH_SEA' };
}
for (const m of v4.matchAll(/UPDATE eu_port SET latitude = ([-\d.]+), longitude = ([-\d.]+)(?:, region = '([A-Z_]+)')? WHERE code = '([A-Z]{5})'/g)) {
  Object.assign(ports[m[4]], { lat: +m[1], lon: +m[2] }, m[3] ? { region: m[3] } : {});
}
for (const m of v4.matchAll(/\('([A-Z]{5})', '([^']+)', '([A-Z]{2})', (\d+), (\d+), '([A-Z]{3})', TRUE, ([-\d.]+), ([-\d.]+), '([A-Z_]+)'\)/g)) {
  ports[m[1]] = { code: m[1], name: m[2], country: m[3], unloading: +m[4], agency: +m[5], feeCurrency: m[6], lat: +m[7], lon: +m[8], region: m[9] };
}

// --- sailing days (shared container, sedan) per departure port and EU port, as the engine prices them
const days = {}; // days[euPort][departure] = transit days
for (const m of v2.matchAll(/\('([A-Z]{5})', '([A-Z]{5})', 'CONTAINER_SHARED', 'SEDAN', [\d.]+, [\d.]+, '[A-Z]{3}', (\d+)\)/g)) {
  (days[m[2]] ??= {})[m[1]] = +m[3];
}
const factors = {};
for (const m of v4.matchAll(/\('([A-Z]{5})', [\d.]+, (-?\d+), [\d.]+, (-?\d+)\)/g)) factors[m[1]] = { atl: +m[2], suez: +m[3] };
for (const [code, f] of Object.entries(factors)) {
  const base = days[code === 'PLGDN' ? 'PLGDY' : 'NLRTM'];
  for (const [dep, d] of Object.entries(base)) {
    (days[code] ??= {})[dep] ??= Math.max(5, d + (['JPYOK', 'AEJEA'].includes(dep) ? f.suez : f.atl));
  }
}
const ORIGIN_PORTS = { USA: ['USNWK', 'USSAV', 'USHOU', 'USLAX'], CANADA: ['CAHAL', 'CAMTR'], JAPAN: ['JPYOK'], UAE: ['AEJEA'], UK: ['GBSOU'] };
for (const p of Object.values(ports)) {
  p.days = {};
  for (const [origin, deps] of Object.entries(ORIGIN_PORTS)) {
    const d = deps.map((dep) => days[p.code]?.[dep]).filter((x) => x != null);
    if (d.length) p.days[origin] = [Math.min(...d), Math.max(...d)];
  }
}

// --- distances: great circle x 1.25, as the backend estimates without a routing engine
const km = ([lat1, lon1], [lat2, lon2]) => {
  const r = (x) => (x * Math.PI) / 180;
  const a = Math.sin(r(lat2 - lat1) / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(r(lon2 - lon1) / 2) ** 2;
  return Math.round(2 * 6371.0088 * Math.asin(Math.sqrt(a)) * 1.25);
};
const countries = Object.keys(vat).sort().map((code) => {
  const nearest = Object.values(ports)
    .map((p) => ({ code: p.code, km: km(centres[code], [p.lat, p.lon]) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  return { code, ...vat[code], centre: centres[code], nearest };
});
for (const p of Object.values(ports)) {
  p.distances = Object.fromEntries(countries.map((c) => [c.code, km(c.centre, [p.lat, p.lon])]));
}

// --- slugs
const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z', и: 'i', і: 'i', ї: 'i', й: 'i', к: 'k',
  л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'sht', ъ: 'a', ь: '', ю: 'yu', я: 'ya', ё: 'e', ы: 'y', э: 'e',
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o',
  π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o',
  ł: 'l', ø: 'o', æ: 'ae', å: 'a', ß: 'ss', đ: 'd', þ: 'th', ð: 'd', œ: 'oe',
};
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/['\u2019\u02bc]/g, '').replace(/ου/g, 'ou').replace(/αυ/g, 'av').replace(/ευ/g, 'ev')
  .split('').map((ch) => TRANSLIT[ch] ?? ch).join('')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const ORIGIN_REGION = { USA: 'US', CANADA: 'CA', JAPAN: 'JP', UAE: 'AE', UK: 'GB' };
const countrySlugs = {};
const originSlugs = {};
for (const { code, locale } of langs) {
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  countrySlugs[code] = Object.fromEntries(countries.map((c) => [c.code, slugify(names.of(c.code))]));
  originSlugs[code] = Object.fromEntries(Object.entries(ORIGIN_REGION).map(([o, r]) => [o, slugify(names.of(r))]));
}
const portList = Object.values(ports).sort((a, b) => a.name.localeCompare(b.name));
for (const p of portList) p.slug = slugify(p.name.replace(/\(.*\)/, ' ').replace('/', ' '));
const dup = portList.map((p) => p.slug).filter((s, i, a) => a.indexOf(s) !== i);
if (dup.length) throw new Error('duplicate port slugs ' + dup);

const out = `// Generated by tools/generate-guide-data.mjs - do not edit by hand.
import { PortRegion } from '../../core/api/api.models';

export type GuideOrigin = 'USA' | 'CANADA' | 'JAPAN' | 'UAE' | 'UK';

export interface GuidePort {
  code: string;
  name: string;
  slug: string;
  country: string;
  region: PortRegion;
  lat: number;
  lon: number;
  /** Terminal handling + devanning and customs agent fee per car. */
  unloading: number;
  agency: number;
  feeCurrency: string;
  /** Sailing days [min, max] from the origin's export ports (shared container). */
  days: Partial<Record<GuideOrigin, [number, number]>>;
  /** Estimated road km to each EU country's population centre. */
  distances: Record<string, number>;
}

export interface GuideCountry {
  code: string;
  currency: string;
  vat: number;
  centre: [number, number];
  /** Six nearest ports of clearance by road. */
  nearest: { code: string; km: number }[];
}

export const GUIDE_ORIGINS: GuideOrigin[] = ${JSON.stringify(Object.keys(ORIGIN_PORTS))};
export const ORIGIN_REGION_CODE: Record<GuideOrigin, string> = ${JSON.stringify(ORIGIN_REGION)};

export const GUIDE_PORTS: GuidePort[] = ${JSON.stringify(portList)};

export const GUIDE_COUNTRIES: GuideCountry[] = ${JSON.stringify(countries)};

/** Localized slugs: [lang][countryCode] and [lang][origin]. */
export const COUNTRY_SLUGS: Record<string, Record<string, string>> = ${JSON.stringify(countrySlugs)};
export const ORIGIN_SLUGS: Record<string, Record<GuideOrigin, string>> = ${JSON.stringify(originSlugs)};
`;
writeFileSync(new URL('frontend/src/app/features/guides/guide-data.generated.ts', root), out);
console.log(`guides: ${portList.length} ports, ${countries.length} countries, ${langs.length} languages`);
console.log('pl countries', Object.values(countrySlugs.pl).slice(0, 6).join(' '), '| el', Object.values(countrySlugs.el).slice(0, 4).join(' '), '| uk origins', Object.values(originSlugs.uk).join(' '));
