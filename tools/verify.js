#!/usr/bin/env node
/* tools/verify.js — merge & quality checker. Usage: node tools/verify.js [--part N]  (run from the project root) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = process.cwd();
const PARTS = {
  1: ['index.html', '404.html', 'signin.html', 'js/pages/home.js', 'js/pages/signin.js'],
  2: ['about.html', 'contact.html', 'faqs.html', 'js/pages/about.js', 'js/pages/contact.js', 'js/pages/faqs.js', 'js/data/faqs.js'],
  3: ['services.html', 'service-details.html', 'js/pages/services.js', 'js/pages/service-details.js', 'js/data/services.js'],
  4: ['chambers.html', 'appointment.html', 'js/pages/chambers.js', 'js/pages/appointment.js', 'js/data/chambers.js'],
  5: ['blog.html', 'blog-details.html', 'testimonials.html', 'js/pages/blog.js', 'js/pages/blog-details.js', 'js/pages/testimonials.js', 'js/data/blogs.js', 'js/data/testimonials.js']
};
const SHARED = ['js/tailwind-config.js', 'js/site.js', 'js/ui.js', 'js/fx.js', 'js/layout.js'];
const arg = process.argv.indexOf('--part'); const only = arg > -1 ? Number(process.argv[arg + 1]) : null;
const expected = only ? PARTS[only] : [].concat(...Object.values(PARTS));
const pages = expected.filter(f => f.endsWith('.html')), results = []; let fails = 0;
const ok = (m) => results.push('  PASS  ' + m), bad = (m) => { fails++; results.push('  FAIL  ' + m); };
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const ex = f => fs.existsSync(path.join(root, f));
SHARED.concat(['assets/img/doctor-portrait.png']).forEach(f => ex(f) ? ok('shared file present: ' + f) : bad('MISSING shared file: ' + f));
let SITE = null;
try { const ctx = { window: {}, sessionStorage: { setItem() { } }, URLSearchParams, Promise, setTimeout }; ctx.window = ctx; vm.createContext(ctx); vm.runInContext(read('js/site.js'), ctx); SITE = ctx.SITE; } catch (e) { bad('cannot load js/site.js: ' + e.message); }
expected.forEach(f => ex(f) ? ok('present: ' + f) : bad('MISSING: ' + f));
const BAN = [[/<style[\s>]/i, '<style> block'], [/\sstyle\s*=\s*"/i, 'inline style="" attribute'], [/@apply/, '@apply'], [/\bfetch\s*\(/, 'fetch()'], [/XMLHttpRequest/, 'XMLHttpRequest'], [/lorem ipsum/i, 'lorem ipsum'], [/href="#"/, 'dead href="#"'], [/\son(click|change|submit|input|load)\s*=/i, 'inline on* handler'], [/unsplash\.com|images\.pexels|picsum\.photos|placeholder\.com/i, 'remote image URL (use kit images only)'], [/\b(coming soon|dummy|mock-?up|placeholder text)\b/i, 'placeholder wording']];
expected.filter(f => ex(f) && /\.(html|js)$/.test(f)).forEach(f => {
  const src = read(f), body = f.endsWith('.js') ? src : src;
  BAN.forEach(([re, name]) => { if (re.test(body)) bad(f + ' contains ' + name); });
  if (f.endsWith('.js')) { try { new vm.Script(src, { filename: f }); } catch (e) { bad(f + ' syntax error: ' + e.message); } }
});
pages.filter(ex).forEach(f => {
  const h = read(f), order = SHARED.map(s => h.indexOf('src="' + s + '"'));
  if (order.some(i => i < 0) || order.some((v, i) => i && v < order[i - 1])) bad(f + ': shared script tags missing or out of order (see tools/page-template.html)');
  else ok(f + ': script order');
  if (!/<body[^>]*data-page="[a-z0-9-]+"/.test(h)) bad(f + ': body[data-page] missing');
  if (!h.includes('id="site-header"') || !h.includes('id="site-footer"') || !h.includes('id="main"')) bad(f + ': mount points missing');
  if ((h.match(/<h1[\s>]/g) || []).length > 1) bad(f + ': more than one <h1>');
  if (!/<meta name="description"/.test(h)) bad(f + ': meta description missing');
  const refs = [...h.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:|tel:|data:|\/\/)/.test(u));
  refs.forEach(u => { if (only && /\.html$/.test(u)) return; if (!ex(u)) bad(f + ' references missing file: ' + u); });
});
expected.filter(ex).filter(f => /\.(html|js)$/.test(f)).forEach(f => {
  const s = read(f);
  [...s.matchAll(/service-details\.html\?slug=([a-z0-9-]+)/g)].forEach(m => { if (SITE && !SITE.getService(m[1])) bad(f + ': unknown service slug ' + m[1]); });
  [...s.matchAll(/blog-details\.html\?slug=([a-z0-9-]+)/g)].forEach(m => { if (SITE && !SITE.getPost(m[1])) bad(f + ': unknown post slug ' + m[1]); });
  [...s.matchAll(/(?:src|href)="(?:\.\/)?(assets\/img\/[^"]+)"/g)].forEach(m => { if (!ex(m[1])) bad(f + ': missing image ' + m[1]); });
  [...s.matchAll(/['"`](assets\/img\/[a-z0-9-]+\.svg)['"`]/g)].forEach(m => { if (!ex(m[1])) bad(f + ': missing image ' + m[1]); });
});
console.log('Project check' + (only ? ' (part ' + only + ')' : ' (all parts)') + '\n' + results.filter(r => /FAIL/.test(r) || process.argv.includes('-v')).join('\n'));
console.log('\n' + (fails ? '✗ ' + fails + ' problem(s) found' : '✓ all checks passed') + '  [' + results.length + ' checks]');
process.exit(fails ? 1 : 0);
