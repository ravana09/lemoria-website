// Build-time renderer: turns each page into HTML (used by scripts/prerender.mjs, never shipped to browsers).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';

export function render(url) {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>);
}

export { ROUTES, NAMES, canonical, breadcrumbLd, faqLd } from './seo.js';
export { SITE, FAQ } from './data.js';
