// Génère du HTML variable dans dist/ à chaque build
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, 'dist');
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const now=new Date().toISOString(); const para=rnd(6,22), pad=rnd(500,12000);
function paras(n){let s=''; for(let i=0;i<n;i++) s+=`<p>Build ${now} — bloc ${i+1}</p>\n`; return s;}
const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>lessoncenter.org — dynamique</title><link rel="stylesheet" href="/assets/style.css"></head><body><h1>Auto-build</h1><p>Dernière génération: ${now}</p><p>Paragraphes: ${para} — Padding: ~${pad} octets</p>${paras(para)}<!-- ${'x'.repeat(pad)} --></body></html>`;
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, 'assets', 'style.css'), "body{font:16px/1.6 system-ui,Arial;margin:40px}h1{margin:0 0 12px}");
fs.writeFileSync(path.join(out, 'robots.txt'), "User-agent: *\nAllow: /\n");
fs.writeFileSync(path.join(out, '404.html'), "<!doctype html><meta charset='utf-8'><h1>404</h1><a href='/'>Retour</a>");
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://lessoncenter-org.pages.dev/</loc><lastmod>${now}</lastmod></url></urlset>`);
fs.writeFileSync(path.join(out, 'heartbeat.txt'), now + "\\n");
console.log("Build complete", now, "paras=", para, "pad=", pad);
