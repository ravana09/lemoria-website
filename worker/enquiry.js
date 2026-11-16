// Cloudflare Worker handler for POST /api/enquiry
// Same behaviour as the Node server (server/api.js): validates the form, emails Lemoria, and sends the visitor
// a confirmation. Sends through SMTP (e.g. Gmail) using worker-mailer, which works on Cloudflare.
// Settings come from the Worker: Settings > Variables and Secrets (same names as .env).
import { WorkerMailer } from 'worker-mailer';
import { MAX_BODY, validate } from '../server/validate.js';
import { buildCustomerEmail, buildOwnerEmail, oneLine, receivedAt } from '../server/templates.js';

const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // per visitor IP, per running instance
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE.max;
}

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

// "Lemoria <a@b.com>" -> { name: 'Lemoria', email: 'a@b.com' }
function parseAddress(value, fallbackEmail) {
  const m = String(value || '').match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1].trim() || 'Lemoria', email: m[2].trim() };
  return { name: 'Lemoria', email: (value || fallbackEmail || '').trim() };
}

export async function handleEnquiry(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });
  const configured = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.MAIL_TO);
  const dryRun = env.MAIL_DRY_RUN === 'true';
  if (!configured && !dryRun) return json(503, { ok: false, error: 'Email is not configured on the server yet. Please call us instead.' });

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (rateLimited(ip)) return json(429, { ok: false, error: 'Too many requests. Please try again in a few minutes or call us.' });

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'Request too large' });
  let body;
  try { body = JSON.parse(raw || '{}'); } catch { return json(400, { ok: false, error: 'Invalid JSON' }); }

  const { data: form, error, spam } = validate(body);
  if (spam) return json(200, { ok: true }); // pretend success so bots learn nothing
  if (error) return json(400, { ok: false, error });

  const data = { ...form, received: receivedAt() };
  const owner = buildOwnerEmail(data);
  const customer = buildCustomerEmail(data);
  if (dryRun) {
    console.log('[mail] TEST MODE — not sent:', owner.subject, '|', customer.subject);
    return json(200, { ok: true, dryRun: true, confirmationSent: true });
  }

  const port = Number(env.SMTP_PORT || 465);
  const secure = (env.SMTP_SECURE ?? (port === 465 ? 'true' : 'false')) === 'true';
  const from = parseAddress(env.MAIL_FROM, env.SMTP_USER);
  let mailer;
  try {
    mailer = await WorkerMailer.connect({
      host: env.SMTP_HOST,
      port,
      secure,
      startTls: !secure,
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
      authType: ['plain', 'login'],
      socketTimeoutMs: 15000,
      responseTimeoutMs: 15000,
    });
    // 1) notify Lemoria — Reply-To is the visitor, so pressing Reply answers them directly
    await mailer.send({ from, to: env.MAIL_TO, reply: { name: oneLine(data.name), email: data.email }, ...owner });
    // 2) confirmation to the visitor — a failure here does not fail the request
    let confirmed = true;
    try { await mailer.send({ from, to: { name: oneLine(data.name), email: data.email }, reply: env.MAIL_TO, ...customer }); } catch (err) {
      confirmed = false; console.error('[mail] confirmation to visitor failed:', err.message);
    }
    return json(200, { ok: true, confirmationSent: confirmed });
  } catch (err) {
    console.error('[mail] failed to send enquiry:', err.message);
    return json(502, { ok: false, error: 'We could not send your message right now. Please call us instead.' });
  } finally {
    try { await mailer?.close(); } catch { /* already closed */ }
  }
}
