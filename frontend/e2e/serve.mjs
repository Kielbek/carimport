// Serves the production build like nginx does (prerendered page, else the client shell) and proxies /api to the API.
// Used by the end-to-end test:  node e2e/serve.mjs [port] [api]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { request as httpRequest, createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const PORT = Number(process.argv[2] ?? 4300);
const API = new URL(process.argv[3] ?? 'http://localhost:8080');
const ROOT = new URL('../dist/frontend/browser/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp', '.pdf': 'application/pdf',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2' };

createServer((req, res) => {
  const url = new URL(req.url, 'http://local');
  if (url.pathname.startsWith('/api/')) {
    const upstream = httpRequest({ host: API.hostname, port: API.port, path: req.url, method: req.method, headers: req.headers },
      (r) => { res.writeHead(r.statusCode, r.headers); r.pipe(res); });
    upstream.on('error', () => { res.writeHead(502); res.end(); });
    req.pipe(upstream);
    return;
  }
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidates = [join(ROOT, path), join(ROOT, path, 'index.html'), join(ROOT, 'index.csr.html')];
  const file = candidates.find((f) => f.startsWith(ROOT) && existsSync(f) && statSync(f).isFile());
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`e2e server on http://localhost:${PORT} -> ${API.origin}`));
