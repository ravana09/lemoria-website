// Builds hosting-bundle.zip: everything a Node.js host (GoDaddy Airo or any other) needs to run the website, and nothing else.
//   npm run bundle      -> builds the site, then writes hosting-bundle.zip
//
// The zip holds the built pages (dist/), the small Node server (server/) and a minimal package.json that installs only
// nodemailer. It never contains .env, node_modules or source code. Email settings are added on the host (as secrets /
// environment variables), never inside the zip.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = join(root, 'hosting-bundle.zip');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

// ---------- what goes in ----------
const files = []; // [path inside the zip, contents]
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push([relative(root, p).split(sep).join('/'), readFileSync(p)]);
  }
};
walk(join(root, 'dist'));
for (const f of ['index', 'api', 'mail', 'templates', 'validate']) files.push([`server/${f}.js`, readFileSync(join(root, 'server', `${f}.js`))]);
files.push(['package.json', Buffer.from(`${JSON.stringify({
  name: pkg.name, private: true, version: pkg.version, type: 'module', main: 'server/index.js',
  // GoDaddy runs "npm install", then "npm run build", then "npm start". The pages are already built, so build does nothing.
  scripts: { build: 'echo "nothing to build: the pages are already built"', start: 'node server/index.js' },
  dependencies: { nodemailer: pkg.dependencies.nodemailer },
  engines: { node: '>=20' },
}, null, 2)}\n`)]);

// ---------- a small zip writer (no dependencies; forward slashes so Linux hosts unpack it correctly) ----------
const table = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xFFFFFFFF; for (const b of buf) c = table[(c ^ b) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };

const parts = []; const central = []; let offset = 0;
for (const [name, data] of files) {
  const nameBuf = Buffer.from(name, 'utf8');
  const raw = /\.(mp4|jpe?g|png|webp|woff2?)$/i.test(name); // already compressed: store as is
  const body = raw ? data : deflateRawSync(data);
  const method = raw ? 0 : 8;
  const crc = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); local.writeUInt16LE(method, 8);
  local.writeUInt16LE(0, 10); local.writeUInt16LE(0x21, 12); // time 00:00, date 1980-01-01
  local.writeUInt32LE(crc, 14); local.writeUInt32LE(body.length, 18); local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26); local.writeUInt16LE(0, 28);
  parts.push(local, nameBuf, body);

  const c = Buffer.alloc(46);
  c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(0x0314, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(method, 10);
  c.writeUInt16LE(0, 12); c.writeUInt16LE(0x21, 14);
  c.writeUInt32LE(crc, 16); c.writeUInt32LE(body.length, 20); c.writeUInt32LE(data.length, 24);
  c.writeUInt16LE(nameBuf.length, 28); c.writeUInt32LE((0o100644 << 16) >>> 0, 38); c.writeUInt32LE(offset, 42);
  central.push(c, nameBuf);
  offset += 30 + nameBuf.length + body.length;
}
const centralSize = central.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12); end.writeUInt32LE(offset, 16);
writeFileSync(out, Buffer.concat([...parts, ...central, end]));

const mb = (statSync(out).size / 1048576).toFixed(1);
console.log(`hosting-bundle.zip written: ${files.length} files, ${mb} MB (pages, server and package.json only; no .env, no node_modules)`);
