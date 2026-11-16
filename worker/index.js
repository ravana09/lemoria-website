// Cloudflare Worker entry point.
// The website itself (dist/) is served directly by Cloudflare as static assets (see wrangler.toml).
// Only requests to /api/* reach this code.
import { handleEnquiry } from './enquiry.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/enquiry') return handleEnquiry(request, env);
    return new Response(JSON.stringify({ ok: false, error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
