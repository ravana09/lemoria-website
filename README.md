# Lemoria — Website

Premium co-working space website for Lemoria, Nehru Nagar East, Coimbatore.
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
| Cloudflare Pages | `functions/api/enquiry.js` (worker-mailer) | Cloudflare dashboard variables |

Email templates (`server/templates.js`) and form checks (`server/validate.js`) are shared, so every host sends identical emails.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub (never commit `.env` or `.dev.vars`; both are in `.gitignore`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose `lemoria-website`.
3. Build settings: Framework preset **None** (or Vite) · Build command **`npm run build`** · Build output directory **`dist`**.
4. **Settings → Variables and Secrets** (Production), add the same values as `.env`:
   `MAIL_TO`, `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` (type **Secret**).
5. **Deploy**, then retry the deployment after adding variables so the function picks them up.

Test the Cloudflare version locally (uses `.dev.vars`, test mode, sends nothing):

    npx wrangler pages dev dist

## Before launch

- Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`.
- Real phone number in `src/data.js` and `server/templates.js`.
- Check the lines marked `TODO` in `src/data.js`.
