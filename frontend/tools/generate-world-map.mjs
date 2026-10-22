// Generates the import-routes map used on the home page:
//   public/map/world.svg                         - land shapes as an SVG sprite (#rest, #eu), cached by the CDN
//   src/app/features/home/world-map.data.ts      - viewBox, port coordinates and shipping-route paths
// Source: Natural Earth via world-atlas (public domain). Re-run after changing ports or routes:
//   node tools/generate-world-map.mjs
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const RESOLUTION = process.argv[2] ?? '50m';
const W = 1000;
const world = JSON.parse(readFileSync(`node_modules/world-atlas/countries-${RESOLUTION}.json`, 'utf8'));
const countries = feature(world, world.objects.countries).features
  .filter((f) => f.id !== '010') // no Antarctica
  .map(dropOverseas);

/** Keep only the European part of France (French Guiana etc. would otherwise light up as "EU" in South America). */
function dropOverseas(f) {
  if (f.id !== '250' || f.geometry.type !== 'MultiPolygon') {
    return f;
  }
  const european = f.geometry.coordinates.filter((poly) => poly[0][0][0] > -20 && poly[0][0][1] > 35);
  return { ...f, geometry: { ...f.geometry, coordinates: european } };
}

// numeric ISO 3166 -> role on the map
const EU = ['040', '056', '100', '191', '196', '203', '208', '233', '246', '250', '276', '300', '348', '372', '380',
  '428', '440', '442', '470', '528', '616', '620', '642', '703', '705', '724', '752'];

// frame: the whole inhabited world (Antarctica dropped)
const frame = { type: 'MultiPoint', coordinates: [[-180, 0], [180, 0], [0, 83.5], [0, -56], [-170, 70], [170, -50]] };
const projection = geoNaturalEarth1().fitWidth(W, frame);
const [[, y0], [, y1]] = geoPath(projection).bounds(frame);
const H = Math.round(y1 - y0 + 20);
projection.translate([projection.translate()[0], projection.translate()[1] - y0 + 10]).clipExtent([[0, 0], [W, H]]);
const path = geoPath(projection).digits(1);

const group = (list) => list.map((f) => path(f)).filter(Boolean).join('');
const rest = countries.filter((f) => !EU.includes(f.id));
const eu = countries.filter((f) => EU.includes(f.id));

mkdirSync('public/map', { recursive: true });
writeFileSync('public/map/world.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">` +
  `<path id="rest" d="${group(rest)}"/><path id="eu" d="${group(eu)}"/></svg>\n`);

const pt = ([lon, lat]) => projection([lon, lat]).map((v) => Math.round(v * 10) / 10);

// every EU port of clearance, read from the Flyway migration that seeds them (code, name, ..., lat, lon, region)
const EU_PORTS = {
  DEBRV: { name: 'Bremerhaven', at: [8.58, 53.54] },
  NLRTM: { name: 'Rotterdam', at: [4.05, 51.95] },
  BEANR: { name: 'Antwerpen', at: [4.4, 51.23] },
  PLGDY: { name: 'Gdynia', at: [18.55, 54.53] },
  DEHAM: { name: 'Hamburg', at: [9.97, 53.54] },
};
const portsSql = readFileSync(new URL('../../backend/src/main/resources/db/migration/V4__all_eu_ports.sql', import.meta.url), 'utf8');
for (const m of portsSql.matchAll(/\('([A-Z]{5})', '([^']+)', '[A-Z]{2}', [^)]*?, (-?\d+\.\d+), (-?\d+\.\d+), '[A-Z_]+'\)/g)) {
  EU_PORTS[m[1]] ??= { name: m[2], at: [Number(m[4]), Number(m[3])] };
}

// export port, destination, waypoints along real sea lanes (Panama, Suez, Gibraltar, Skagerrak)
const ROUTES = [
  { origin: 'USA', port: 'New York / Newark', at: [-74.1, 40.68], to: 'DEBRV', days: '13–16', via: [[-45, 46], [-6, 49.6], [3, 52]] },
  { origin: 'USA', port: 'Savannah', at: [-81.1, 32.08], to: 'NLRTM', days: '15–17', via: [[-50, 38], [-7, 48.6]] },
  { origin: 'USA', port: 'Houston', at: [-95, 29.6], to: 'BEANR', days: '19–21', via: [[-85, 25], [-79.8, 25.2], [-55, 36], [-7, 48.4], [1.5, 51]] },
  { origin: 'USA', port: 'Los Angeles', at: [-118.3, 33.7], to: 'NLRTM', days: '34–36', via: [[-108, 18], [-80, 7.5], [-75, 15], [-60, 26], [-25, 40], [-6, 48.4]] },
  { origin: 'CANADA', port: 'Halifax', at: [-63.6, 44.6], to: 'DEBRV', days: '11–13', via: [[-35, 50], [-5, 50], [3, 52.2]] },
  { origin: 'JAPAN', port: 'Yokohama', at: [139.6, 35.4], to: 'NLRTM', days: '40–48', via: [[124, 24], [104, 1.6], [80, 5.5], [50, 12.5], [43, 13], [33.5, 28], [32.4, 31.5], [15, 35.5], [-5.6, 36], [-10, 43], [-5.5, 48.5]] },
  { origin: 'UAE', port: 'Jebel Ali', at: [55.0, 25.0], to: 'PLGDY', days: '24–30', via: [[56.6, 26.2], [59, 21], [50, 12.6], [43, 13], [33.5, 28], [32.4, 31.5], [15, 35.5], [-5.6, 36], [-10, 43], [-5.2, 48.6], [3.5, 52.3], [8, 56.5], [11, 57.8], [12.8, 55.4], [16, 55]] },
  { origin: 'UAE', port: 'Jebel Ali', at: [55.0, 25.0], to: 'SIKOP', days: '18–22', via: [[56.6, 26.2], [59, 21], [50, 12.6], [43, 13], [33.5, 28], [32.4, 31.5], [22, 35.2], [18.6, 39.8], [15, 43], [13.9, 45]] },
  { origin: 'UK', port: 'Southampton', at: [-1.4, 50.9], to: 'NLRTM', days: '2–4', via: [[1.6, 50.9]] },
];

/** Catmull-Rom spline through the projected waypoints, as cubic Bézier segments. */
function smooth(points) {
  let d = `M${points[0].join(',')}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6].map((v) => Math.round(v * 10) / 10);
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6].map((v) => Math.round(v * 10) / 10);
    d += `C${c1.join(',')} ${c2.join(',')} ${p2.join(',')}`;
  }
  return d;
}

const routes = ROUTES.map((r) => ({
  origin: r.origin,
  port: r.port,
  to: r.to,
  days: r.days,
  from: pt(r.at),
  d: smooth([pt(r.at), ...r.via.map(pt), pt(EU_PORTS[r.to].at)]),
}));
const hubs = new Set(ROUTES.map((r) => r.to));
const euPorts = Object.entries(EU_PORTS).map(([code, p]) => ({ code, name: p.name, at: pt(p.at), hub: hubs.has(code) }));

writeFileSync('src/app/features/home/world-map.data.ts', `// Generated by tools/generate-world-map.mjs - do not edit by hand.
export const MAP_VIEWBOX = { width: ${W}, height: ${H} } as const;

export interface MapRoute { origin: string; port: string; to: string; days: string; from: readonly [number, number]; d: string }
export interface MapPort { code: string; name: string; at: readonly [number, number]; hub: boolean }

export const MAP_ROUTES: readonly MapRoute[] = ${JSON.stringify(routes, null, 2)};

export const MAP_EU_PORTS: readonly MapPort[] = ${JSON.stringify(euPorts, null, 2)};
`);
console.log(`viewBox ${W}x${H}, world.svg ${(readFileSync('public/map/world.svg').length / 1024).toFixed(0)} kB`);
