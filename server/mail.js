// Builds and sends the two emails for every enquiry or booking:
//   1. a notification to Lemoria (MAIL_TO in .env), with Reply-To set to the visitor
//   2. a confirmation to the visitor who filled in the form
import nodemailer from 'nodemailer';
import { buildCustomerEmail, buildOwnerEmail, oneLine, receivedAt } from './templates.js';

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
