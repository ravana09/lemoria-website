// After `vite build`, writes a fully rendered HTML file for every page so search engines see the content
// without running JavaScript. Also writes sitemap.xml and robots.txt using SITE.url from src/data.js.
//   dist/index.html        -> /
//   dist/about.html        -> /about   (Cloudflare serves /about from about.html)
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const ssr = await import(pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href);
const { render, ROUTES, canonical, breadcrumbLd, faqLd, SITE, FAQ } = ssr;

// Pages worth pre-rendering (the booking form and the duplicate /memberships URL are left to the app).
const PAGES = Object.keys(ROUTES).filter((p) => !['/book', '/memberships'].includes(p));
const template = readFileSync(join(dist, 'index.html'), 'utf8').replaceAll('%SITE_URL%', SITE.url);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setMeta = (html, attr, key, value) => html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);
const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

for (const page of PAGES) {
  const [title, desc] = ROUTES[page];
  const url = canonical(page);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  const extra = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
  ];
  const crumbs = breadcrumbLd(page);
  if (crumbs) extra.push(ld(crumbs));
  if (page === '/faq') extra.push(ld(faqLd(FAQ)));
  html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root" data-route="${page}">${render(page)}</div>`);
  const file = page === '/' ? 'index.html' : `${page.slice(1)}.html`;
  writeFileSync(join(dist, file), html);
  console.log(`prerendered ${page.padEnd(20)} -> dist/${file}`);
}

// sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === '/' ? '1.0' : ['/workspace', '/private-cabins', '/conference-cabins'].includes(p) ? '0.9' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...PAGES, '/book'].map((p) => `  <url><loc>${canonical(p)}</loc><lastmod>${today}</lastmod><priority>${prio(p)}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`sitemap.xml (${PAGES.length + 1} URLs) and robots.txt written for ${SITE.url}`);

rmSync(join(root, 'dist-server'), { recursive: true, force: true });
