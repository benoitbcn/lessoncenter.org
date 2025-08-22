// Build script: copies /site to /dist
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fsp.copyFile(s, d);
  }
}

(async () => {
  const src = path.join(__dirname, 'site');
  const dest = path.join(__dirname, 'dist');
  await fsp.rm(dest, { recursive: true, force: true });
  await copyDir(src, dest);
  console.log('Site vitrine copié dans dist/');
})().catch(err => { console.error(err); process.exit(1); });
