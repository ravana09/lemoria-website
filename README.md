# Lemoria — Website

Premium coworking space website for Lemoria, New Siddhapudur (Avinashi Road), Coimbatore.
React + Vite front end; enquiry and booking forms email Lemoria and send the visitor a confirmation.

## Run locally

    npm install --include=dev
    copy .env.example .env      # then fill in the SMTP settings (see .env.example)
    npm run dev                 # http://localhost:5173  (forms send real email using .env)

- All text, images and contact details: `src/data.js`
- Photos are Unsplash placeholders; swap for real photos (put files in `public/images`, use `/images/x.jpg`).

## How the email works

| Where it runs | Code | Settings from |
|---|---|---|
| `npm run dev` / `npm run preview` | `server/api.js` + `server/mail.js` (Nodemailer) | `.env` |
| Any Node host (`npm run build` then `npm start`) | `server/index.js` | `.env` |
| Cloudflare Workers | `worker/index.js` + `worker/enquiry.js` (worker-mailer) | Cloudflare dashboard variables |

Email templates (`server/templates.js`) and form checks (`server/validate.js`) are shared, so every host sends identical emails.

## Deploy to Cloudflare (Workers)

The site deploys as a Cloudflare Worker with static assets: Cloudflare serves `dist/` directly and runs
`worker/index.js` only for `/api/*` (the email). Settings are in `wrangler.toml`.

1. Push this repository to GitHub (never commit `.env` or `.dev.vars`; both are in `.gitignore`).
2. Cloudflare dashboard → **Workers & Pages** → your Worker → **Settings → Build**:
   Build command **`npm run build`** · Deploy command **`npx wrangler deploy`** · Branch **`main`**.
3. **Settings → Variables and Secrets**, add the same values as `.env`:
   `MAIL_TO`, `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` (type **Secret**).
   `keep_vars = true` in `wrangler.toml` keeps them across deploys.
4. Every push to `main` rebuilds and deploys automatically.

Test the Cloudflare version locally (uses `.dev.vars`, test mode, sends nothing):

    npm run build
    npx wrangler dev

## Before launch

- Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`.
- Real phone number in `src/data.js` and `server/templates.js`.
- Check the lines marked `TODO` in `src/data.js`.
