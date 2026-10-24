// Every language file must have exactly the keys of en.json, with the same {{placeholders}}. Run in CI.
import { readFileSync, readdirSync } from 'node:fs';

const dir = new URL('../public/i18n/', import.meta.url);
const flat = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, String(v)]]));
const placeholders = (s) => (s.match(/\{\{\s*\w+\s*\}\}/g) ?? []).map((x) => x.replace(/\s/g, '')).sort().join(',');

const en = new Map(flat(JSON.parse(readFileSync(new URL('en.json', dir)))));
let failed = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'en.json')) {
  const tr = new Map(flat(JSON.parse(readFileSync(new URL(file, dir)))));
  const missing = [...en.keys()].filter((k) => !tr.has(k));
  const extra = [...tr.keys()].filter((k) => !en.has(k));
  const wrong = [...en.keys()].filter((k) => tr.has(k) && placeholders(en.get(k)) !== placeholders(tr.get(k)));
  const empty = [...tr.entries()].filter(([, v]) => !v.trim()).map(([k]) => k);
  for (const [label, keys] of [['missing', missing], ['not in en.json', extra], ['placeholders differ', wrong], ['empty', empty]]) {
    if (keys.length) {
      failed++;
      console.error(`${file}: ${label} (${keys.length}): ${keys.slice(0, 10).join(', ')}`);
    }
  }
}
console.log(failed ? `i18n: ${failed} problem(s)` : `i18n: ${en.size} keys complete in every language`);
process.exit(failed ? 1 : 0);
