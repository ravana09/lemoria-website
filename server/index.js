// Production server: serves the built website (dist/) and the /api/enquiry endpoint.
// Run with:  npm run build  then  npm start   (reads settings from .env)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiHandler } from './api.js';

const ROOT = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const PORT = Number(process.env.PORT || 3000);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2',
};

// In production, refuse to "succeed" without real SMTP settings.
const api = createApiHandler(process.env, { allowDryRun: process.env.MAIL_DRY_RUN === 'true' });

async function serveFile(req, res) {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let file = normalize(join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end('Forbidden'); }
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch {
    // Pre-rendered page (/about -> about.html), otherwise the app's fallback page.
    try { await stat(`${file}.html`); file = `${file}.html`; } catch { file = join(ROOT, 'index.html'); }
  }
  try {
    const body = await readFile(file);
    const type = TYPES[extname(file)] || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', file.includes(`${join(ROOT, 'assets')}`) ? 'public, max-age=31536000, immutable' : 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(body);
  } catch { res.statusCode = 404; res.end('Not found'); }
}

createServer((req, res) => api(req, res, () => serveFile(req, res))).listen(PORT, () => {
  console.log(`Lemoria website running on http://localhost:${PORT}`);
});
