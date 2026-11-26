// // Builds and sends the two emails for every enquiry or booking:
// //   1. a notification to Lemoria (MAIL_TO in .env), with Reply-To set to the visitor
// //   2. a confirmation to the visitor who filled in the form
// import nodemailer from 'nodemailer';
// import { buildCustomerEmail, buildOwnerEmail, oneLine, receivedAt } from './templates.js';

// // SMTP settings come from .env. When they are missing (or MAIL_DRY_RUN=true) emails are printed to the terminal instead.
// export function createMailer(env) {
//   const configured = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.MAIL_TO);
//   const dryRun = env.MAIL_DRY_RUN === 'true' || !configured;
//   const transport = dryRun
//     ? nodemailer.createTransport({ jsonTransport: true })
//     : nodemailer.createTransport({
//       host: env.SMTP_HOST,
//       port: Number(env.SMTP_PORT || 465),
//       secure: (env.SMTP_SECURE ?? 'true') === 'true',
//       auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
//       // Give up quickly when the mail server cannot be reached (e.g. the host blocks the port), instead of waiting minutes.
//       connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 25000,
//     });
//   const from = env.MAIL_FROM || `Lemoria <${env.SMTP_USER || 'no-reply@localhost'}>`;
//   const to = env.MAIL_TO || '(MAIL_TO not set)';

//   async function send(form) {
//     const data = { ...form, received: receivedAt() }; // stamped on the server, so visitors cannot fake it
//     const owner = buildOwnerEmail(data);
//     const customer = buildCustomerEmail(data);
//     // 1) notify Lemoria — if this fails the visitor sees an error and can call instead
//     await transport.sendMail({ from, to, replyTo: `${oneLine(data.name)} <${data.email}>`, ...owner });
//     // 2) confirmation to the visitor — a failure here is logged but does not fail the request
//     let confirmed = true;
//     try { await transport.sendMail({ from, to: data.email, replyTo: to, ...customer }); } catch (err) { confirmed = false; console.error('[mail] confirmation to visitor failed:', err.message); }
//     if (dryRun) {
//       console.log(`\n[mail] TEST MODE — nothing was sent. Add your SMTP settings to .env to send real emails.\n  → To Lemoria (${to}): ${owner.subject}\n  → To visitor (${data.email}): ${customer.subject}\n`);
//     }
//     return { dryRun, confirmed };
//   }
//   // Logs in to the SMTP server without sending anything. Used once at start-up to show problems in the host's logs.
//   const verify = () => transport.verify();
//   return { send, verify, configured, dryRun };
// }



import {
  buildCustomerEmail,
  buildOwnerEmail,
  oneLine,
  receivedAt
} from './templates.js';

// GoDaddy Node.js Hosting email gateway
const GATEWAY_URL =
  'http://127.0.0.1:2525/api/email/send';

// Lemoria verified sender email
const FROM_EMAIL = 'info@lemoria.space';

export function createMailer(env) {
  const configured = Boolean(env.MAIL_TO);

  const dryRun =
    env.MAIL_DRY_RUN === 'true' || !configured;

  const to = env.MAIL_TO || '(MAIL_TO not set)';

  async function sendGatewayEmail({
    to,
    subject,
    text,
    html,
    replyTo
  }) {
    const payload = {
      from: FROM_EMAIL,
      to: [to],
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {})
    };

    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `GoDaddy email gateway error (${response.status}): ${
          JSON.stringify(result)
        }`
      );
    }

    console.log(
      '[mail] Email accepted:',
      result.messageId || 'Gateway accepted request'
    );

    return result;
  }

  async function send(form) {
    // Server-side timestamp
    const data = {
      ...form,
      received: receivedAt()
    };

    const owner = buildOwnerEmail(data);
    const customer = buildCustomerEmail(data);

    if (dryRun) {
      console.log(
        '[mail] TEST MODE - No emails sent',
        {
          admin: to,
          visitor: data.email
        }
      );

      return {
        dryRun: true,
        confirmed: false
      };
    }

    // 1. Send enquiry notification to Lemoria
    await sendGatewayEmail({
      to,
      subject: owner.subject,
      text: owner.text,
      html: owner.html,
      replyTo: `${oneLine(data.name)} <${data.email}>`
    });

    // 2. Send confirmation to visitor
    let confirmed = true;

    try {
      await sendGatewayEmail({
        to: data.email,
        subject: customer.subject,
        text: customer.text,
        html: customer.html,
        replyTo: to
      });
    } catch (err) {
      confirmed = false;

      console.error(
        '[mail] Confirmation to visitor failed:',
        err.message
      );
    }

    return {
      dryRun: false,
      confirmed
    };
  }

  return {
    send,
    configured,
    dryRun
  };
}
