// End-to-end: the paying customer's path on the production build against a real API (profile "e2e" = fake Stripe):
// calculator -> result -> paywall -> "payment" -> report page -> PDF download.
//   node e2e/purchase.mjs [baseUrl]      exit code 0 = passed; screenshots in e2e/out/ on failure
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

// require(): also finds a globally installed Playwright (NODE_PATH), which ESM import does not
const { chromium } = createRequire(import.meta.url)('playwright');

const BASE = process.argv[2] ?? 'http://localhost:4300';
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
const step = async (name, fn) => {
  process.stdout.write(`- ${name} ... `);
  try {
    await fn();
    console.log('ok');
  } catch (e) {
    console.log('FAILED');
    await page.screenshot({ path: `${OUT}${name.replace(/\W+/g, '-')}.png`, fullPage: true }).catch(() => {});
    console.error(e);
    await browser.close();
    process.exit(1);
  }
};

await step('open calculator', async () => {
  await page.goto(`${BASE}/pl/kalkulator`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Tylko niezbędne/ }).click({ timeout: 5000 }).catch(() => {});
});

await step('walk through the wizard', async () => {
  for (let i = 0; i < 4; i++) {
    await page.getByRole('button', { name: /^Dalej/ }).click();
    await page.waitForTimeout(400);
  }
  await page.getByRole('button', { name: /Policz pełny koszt/ }).click();
});

await step('see the result', async () => {
  await page.getByRole('button', { name: /Odblokuj pełny raport/ }).first().waitFor({ timeout: 30000 });
});

await step('pay for the report', async () => {
  await page.getByRole('button', { name: /Odblokuj pełny raport/ }).first().click();
  await page.fill('#fullName', 'Jan Testowy');
  await page.fill('#email', 'e2e@example.com');
  for (const box of await page.locator('form input[type=checkbox]').all()) {
    await box.check();
  }
  await page.locator('form button[type=submit]').click();
  await page.waitForURL(/\/pl\/report\/[0-9a-f-]{36}/, { timeout: 30000 });
});

await step('download the PDF', async () => {
  const button = page.getByRole('button', { name: /Pobierz PDF/ }).first();
  await button.waitFor({ timeout: 90000 });
  await page.waitForFunction(() => [...document.querySelectorAll('button')]
    .some((b) => /Pobierz PDF/.test(b.textContent ?? '') && !b.disabled), null, { timeout: 90000 });
  const [download] = await Promise.all([page.waitForEvent('download', { timeout: 30000 }), button.click()]);
  const file = `${OUT}report.pdf`;
  await download.saveAs(file);
  const { readFileSync } = await import('node:fs');
  const head = readFileSync(file).subarray(0, 5).toString();
  if (head !== '%PDF-') {
    throw new Error(`not a PDF: ${head}`);
  }
});

console.log('E2E purchase passed');
await browser.close();
