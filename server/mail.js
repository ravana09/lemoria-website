// Builds and sends the two emails for every enquiry or booking:
//   1. a notification to Lemoria (MAIL_TO in .env), with Reply-To set to the visitor
//   2. a confirmation to the visitor who filled in the form
import nodemailer from 'nodemailer';

const BRAND = {
  name: 'Lemoria',
  phone: '+91 98765 43210', // TODO: keep in sync with SITE.phone in src/data.js
  address: 'No. 1 to 2, Rajagopal Street, Nehru Nagar East, Coimbatore South, Coimbatore, Tamil Nadu 641014',
  hours: 'Mon – Sat, 8:00 AM – 9:00 PM',
  gold: '#946B2C',
  ink: '#1A1814',
};

const LABELS = {
  received: 'Received on', kind: 'Request', type: 'Enquiry type', name: 'Name', company: 'Company', email: 'Email', phone: 'Phone',
  seats: 'Seats', seatType: 'Seat type', duration: 'Duration', startDate: 'Start date',
  cabin: 'Conference cabin', date: 'Date', start: 'Start time', end: 'End time', hours: 'Hours', people: 'Attendees',
  message: 'Message', page: 'Sent from page',
};
const KIND_TITLES = { enquiry: 'Enquiry', seats: 'Seat booking request', conference: 'Conference cabin booking request' };

// Date and time the enquiry was received, in Indian time, e.g. "Mon, 16 Nov 2026, 4:35 PM IST".
export function receivedAt(date = new Date()) {
  const s = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(date);
  return `${s.replace(/([A-Za-z]{3}), (\d{4})/, '$1 $2').replace(/\b(am|pm)\b/i, (m) => m.toUpperCase())} IST`;
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();

function rows(data) {
  return Object.entries(LABELS)
    .filter(([k]) => data[k] !== undefined && data[k] !== '' && k !== 'kind')
    .map(([k, label]) => [label, String(data[k])]);
}

function htmlTable(list) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">${list
    .map(([l, v]) => `<tr><td style="padding:9px 12px;border-bottom:1px solid #EEE7DA;color:#6B6458;width:38%;vertical-align:top">${esc(l)}</td><td style="padding:9px 12px;border-bottom:1px solid #EEE7DA;color:${BRAND.ink};font-weight:600;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
}

function layout(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#F4F1EA;font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EA;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #E4DDCD">
<tr><td style="background:${BRAND.ink};padding:22px 28px"><span style="color:#fff;font-size:20px;font-weight:700;letter-spacing:4px">LEMORIA</span><br><span style="color:#E9CB86;font-size:10px;letter-spacing:4px">BEYOND NUMBERS</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 14px;font-size:22px;line-height:1.3">${esc(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td style="background:#F4F1EA;padding:18px 28px;font-size:12px;color:#6B6458;line-height:1.6">${esc(BRAND.name)} · ${esc(BRAND.address)}<br>${esc(BRAND.phone)} · ${esc(BRAND.hours)}</td></tr>
</table></td></tr></table></body></html>`;
}

export function buildOwnerEmail(data) {
  const kind = KIND_TITLES[data.kind] || 'Enquiry';
  const what = data.type || data.cabin || (data.seats ? `${data.seats} seat(s)` : '');
  const list = rows(data);
  return {
    subject: oneLine(`New ${kind.toLowerCase()}${what ? `: ${what}` : ''} — ${data.name}`),
    text: `${kind} from the Lemoria website\n\n${list.map(([l, v]) => `${l}: ${v}`).join('\n')}\n\nReply to this email to answer ${data.name} directly.`,
    html: layout(`New ${kind.toLowerCase()} from the website`,
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#4A453D">Reply to this email to answer <b>${esc(data.name)}</b> directly.</p>${htmlTable(list)}`),
  };
}

export function buildCustomerEmail(data) {
  const first = oneLine(data.name).split(' ')[0];
  const kind = KIND_TITLES[data.kind] || 'Enquiry';
  const list = rows(data).filter(([l]) => !['Sent from page'].includes(l));
  const intro = data.kind === 'enquiry'
    ? 'Thank you for contacting Lemoria. We have received your enquiry and a member of our team will get back to you within one business day.'
    : 'Thank you for your booking request. We are checking availability now and will confirm your booking and pricing by phone or email within 2 business hours.';
  return {
    subject: data.kind === 'enquiry' ? 'We have received your enquiry — Lemoria' : 'We have received your booking request — Lemoria',
    text: `Hi ${first},\n\n${intro}\n\nYour ${kind.toLowerCase()}:\n${list.map(([l, v]) => `${l}: ${v}`).join('\n')}\n\nNeed anything sooner? Call us on ${BRAND.phone} or reply to this email.\n\nLemoria\n${BRAND.address}`,
    html: layout(`Thank you, ${first}!`,
      `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#4A453D">${esc(intro)}</p>
<p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:1px;color:${BRAND.gold};text-transform:uppercase">Your ${esc(kind.toLowerCase())}</p>
${htmlTable(list)}
<p style="margin:22px 0 0;font-size:15px;line-height:1.6;color:#4A453D">Need anything sooner? Call us on <b>${esc(BRAND.phone)}</b> or simply reply to this email.</p>
<p style="margin:22px 0 0;font-size:15px;color:#4A453D">Warm regards,<br><b>Team Lemoria</b></p>`),
  };
}

// SMTP settings come from .env. When they are missing (or MAIL_DRY_RUN=true) emails are printed to the terminal instead.
export function createMailer(env) {
  const configured = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.MAIL_TO);
  const dryRun = env.MAIL_DRY_RUN === 'true' || !configured;
  const transport = dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 465),
      secure: (env.SMTP_SECURE ?? 'true') === 'true',
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  const from = env.MAIL_FROM || `Lemoria <${env.SMTP_USER || 'no-reply@localhost'}>`;
  const to = env.MAIL_TO || '(MAIL_TO not set)';

  async function send(form) {
    const data = { ...form, received: receivedAt() }; // stamped on the server, so visitors cannot fake it
    const owner = buildOwnerEmail(data);
    const customer = buildCustomerEmail(data);
    // 1) notify Lemoria — if this fails the visitor sees an error and can call instead
    await transport.sendMail({ from, to, replyTo: `${oneLine(data.name)} <${data.email}>`, ...owner });
    // 2) confirmation to the visitor — a failure here is logged but does not fail the request
    let confirmed = true;
    try { await transport.sendMail({ from, to: data.email, replyTo: to, ...customer }); } catch (err) { confirmed = false; console.error('[mail] confirmation to visitor failed:', err.message); }
    if (dryRun) {
      console.log(`\n[mail] TEST MODE — nothing was sent. Add your SMTP settings to .env to send real emails.\n  → To Lemoria (${to}): ${owner.subject}\n  → To visitor (${data.email}): ${customer.subject}\n`);
    }
    return { dryRun, confirmed };
  }
  return { send, configured, dryRun };
}
