// Checks a submitted form. Shared by the Node server (server/api.js) and the Cloudflare function (functions/api/enquiry.js).

export const MAX_BODY = 20 * 1024; // 20 KB is plenty for a form
const KINDS = ['enquiry', 'seats', 'conference'];
const FIELDS = { // allowed fields and their max length
  kind: 20, type: 60, name: 100, company: 120, email: 160, phone: 20, message: 2000,
  seats: 4, seatType: 40, duration: 20, startDate: 10, cabin: 60, date: 10, start: 5, end: 5, hours: 2, people: 3, page: 200,
};

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
