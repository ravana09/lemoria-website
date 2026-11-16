// POST /api/enquiry — receives the contact form and both booking forms, validates them and sends the emails.
// Used by the Vite dev/preview server (vite.config.js) and by the production server (server/index.js).
import { createMailer } from './mail.js';

const MAX_BODY = 20 * 1024; // 20 KB is plenty for a form
const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // max 5 submissions per IP every 10 minutes
const KINDS = ['enquiry', 'seats', 'conference'];
const FIELDS = { // allowed fields and their max length
  kind: 20, type: 60, name: 100, company: 120, email: 160, phone: 20, message: 2000,
  seats: 4, seatType: 40, duration: 20, startDate: 10, cabin: 60, date: 10, start: 5, end: 5, hours: 2, people: 3, page: 200,
};

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE.max;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { reject(Object.assign(new Error('Request too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); } });
    req.on('error', reject);
  });
}

// Returns { data } with only known, trimmed fields, or { error } with a message for the visitor.
export function validate(body) {
  if (body.website) return { spam: true }; // hidden honeypot field: real visitors leave it empty
  const data = {};
  for (const [k, max] of Object.entries(FIELDS)) {
    if (body[k] === undefined || body[k] === null) continue;
    const v = String(body[k]).trim();
    if (v.length > max) return { error: `${k} is too long` };
    if (v) data[k] = v;
  }
  data.kind = KINDS.includes(data.kind) ? data.kind : 'enquiry';
  if (!data.name || data.name.length < 2) return { error: 'Please enter your name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) return { error: 'Please enter a valid email address' };
  const digits = (data.phone || '').replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return { error: 'Please enter a valid phone number' };
  return { data };
}

const send = (res, status, body) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };

export function createApiHandler(env, { allowDryRun = true } = {}) {
  const mailer = createMailer(env);
  if (mailer.dryRun) console.log('[mail] SMTP is not configured — enquiries will be printed in this terminal, not emailed. See .env.example.');
  else console.log(`[mail] Enquiries will be emailed to ${env.MAIL_TO}`);

  return async function handler(req, res, next) {
    const path = req.url.split('?')[0];
    if (path !== '/api/enquiry') return next ? next() : send(res, 404, { ok: false, error: 'Not found' });
    if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
    if (mailer.dryRun && !allowDryRun) return send(res, 503, { ok: false, error: 'Email is not configured on the server yet. Please call us instead.' });

    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
    if (rateLimited(ip)) return send(res, 429, { ok: false, error: 'Too many requests. Please try again in a few minutes or call us.' });

    try {
      const body = await readJson(req);
      const { data, error, spam } = validate(body);
      if (spam) return send(res, 200, { ok: true }); // pretend success so bots learn nothing
      if (error) return send(res, 400, { ok: false, error });
      const result = await mailer.send(data);
      return send(res, 200, { ok: true, dryRun: result.dryRun, confirmationSent: result.confirmed });
    } catch (err) {
      console.error('[mail] failed to send enquiry:', err.message);
      return send(res, err.status || 502, { ok: false, error: err.status ? err.message : 'We could not send your message right now. Please call us instead.' });
    }
  };
}
