import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createApiHandler } from './server/api.js';

// Runs the /api/enquiry email endpoint inside `npm run dev` and `npm run preview`,
// using the SMTP settings from .env (never exposed to the browser).
function enquiryApi(env) {
  let handler;
  const mount = (server) => {
    handler ||= createApiHandler(env, { allowDryRun: true });
    server.middlewares.use((req, res, next) => handler(req, res, next));
  };
  return { name: 'lemoria-enquiry-api', configureServer: mount, configurePreviewServer: mount };
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), enquiryApi(env)],
    // The server bundle only needs JS, not a second copy of /public.
    build: { copyPublicDir: !isSsrBuild },
    // Build output and Cloudflare's local cache are not source: don't watch them
    // (on Windows, watching files that a build is rewriting crashes the dev server with EBUSY).
    server: { watch: { ignored: ['**/dist/**', '**/dist-server/**', '**/.wrangler/**'] } },
  };
});
