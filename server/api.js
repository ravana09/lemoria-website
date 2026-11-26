// POST /api/enquiry — receives the contact form and both booking forms, validates them and sends the emails.
// Used by the Vite dev/preview server (vite.config.js) and by the production server (server/index.js).
import { createMailer } from './mail.js';
import { MAX_BODY, validate } from './validate.js';

const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // max 5 submissions per IP every 10 minutes

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  if (list.length >= RATE.max) { hits.set(ip, list); return true; } // blocked tries are not counted, so retrying does not extend the block
  list.push(now);
  hits.set(ip, list);
  return false;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { reject(Object.assign(new Error('Request too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); } });
    req.on('error', reject);
  });
}


const send = (res, status, body) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };

export function createApiHandler(env, { allowDryRun = true } = {}) {
  const mailer = createMailer(env);
  if (mailer.dryRun) console.log('[mail] SMTP is not configured — enquiries will be printed in this terminal, not emailed. See .env.example.');
  else {
    console.log(`[mail] Enquiries will be emailed to ${env.MAIL_TO}`);
    // One login check at start-up, so a wrong password or a blocked connection shows in the host's logs straight away.
    // mailer.verify().then(() => console.log('[mail] SMTP login check: OK'), (err) => console.error(`[mail] SMTP login check FAILED: ${err.message}`));
  }

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
