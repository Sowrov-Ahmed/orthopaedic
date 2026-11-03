/* js/pages/services.js · Owner Part 3 · Services catalogue, treatment pathway and pricing transparency · Depends on: SITE, UI, window.SERVICES (js/data/services.js) */
(function () {
  'use strict';
  UI.ready(function () {
    var E = UI.esc, C = UI.cls, O = SITE.img.objects;
    var CATS = [['all', 'All treatments'], ['surgical', 'Surgical'], ['sports', 'Sports'], ['non-surgical', 'Non-surgical'], ['children', 'Children']];
    var catName = function (k) { var f = CATS.filter(function (c) { return c[0] === k; })[0]; return f ? f[1] : k; };
    var detail = {};
    (window.SERVICES || []).forEach(function (d) { detail[d.slug] = d; });
    var all = SITE.servicesIndex.map(function (s) { return Object.assign({}, s, detail[s.slug] || {}); });
    var phone = SITE.contact.phone;
    var telHref = 'tel:' + String((phone && phone.e164) || phone).replace(/[^\d+]/g, '');
    var bookHref = SITE.url.appointment({});
    var state = { category: 'all', q: (UI.getParam('q') || '').trim(), sort: 'featured' };
    var pre = UI.getParam('category');
    if (CATS.some(function (c) { return c[0] === pre; })) state.category = pre;
    var sort0 = UI.getParam('sort');
    if (['featured', 'price-asc', 'price-desc', 'name'].indexOf(sort0) > -1) state.sort = sort0;
    var put = function (id, html) { var el = UI.qs('#' + id); if (el) { el.innerHTML = html; UI.mount(el); } return el; };
    var sec = function (id, cls, inner, comp) { return '<section id="' + id + '" data-section="' + id + '" class="' + cls + '"><div class="' + C.container + '" data-component="' + comp + '">' + inner + '</div></section>'; };

    function renderHero() {
      return UI.pageHero({
        eyebrow: 'Treatments & services', title: 'Eight specialities, *one* standard of care',
        lead: 'From a twisted ankle to a total knee replacement, every plan starts with careful examination and ends with a clear, honest estimate.',
        actionsHTML: '<a href="' + bookHref + '" data-magnetic class="' + C.btnPrimary + '">' + C.shine + 'Book a consultation ' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="' + telHref + '" class="' + C.btnGlass + '">' + UI.icon('phone', 'h-4 w-4') + ' Call the appointment desk</a>'
      });
    }

    function renderCatalogue() {
      var chips = CATS.map(function (c) {
        var n = c[0] === 'all' ? all.length : all.filter(function (s) { return s.category === c[0]; }).length;
        return '<button type="button" data-cat="' + c[0] + '" aria-pressed="' + (state.category === c[0]) + '" class="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink/70 motion-safe:transition-[transform,opacity] hover:border-iris focus-visible:outline focus-visible:outline-2 focus-visible:outline-iris aria-pressed:border-iris aria-pressed:bg-iris aria-pressed:text-white">' + E(c[1]) + '<span class="font-mono text-xs opacity-70">' + n + '</span></button>';
      }).join('');
      var fld = 'min-h-11 w-full rounded-full border border-ink/10 bg-white/70 px-5 text-sm text-ink placeholder:text-ink/60 scheme-light motion-safe:transition-[border-color,box-shadow] focus-visible:border-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris/40';
      var opts = [['featured', 'Sort: featured'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['name', 'Name: A to Z']].map(function (o) { return '<option class="bg-white text-ink" value="' + o[0] + '"' + (state.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('');
      return sec('catalogue', C.sectionLight,
        UI.sectionHead({ eyebrow: '01 — The catalogue', title: 'Find the care that *fits* your problem', lead: 'Filter by type of treatment, search by condition or compare costs. Every card opens a full guide to the procedure, recovery and price.', align: 'left', theme: 'light' }) +
        '<div class="z-30 mt-10 rounded-3xl p-4 md:sticky md:top-24 ' + C.glassLight + '"><div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">' + chips + '</div>' +
        '<div class="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]"><div><label class="sr-only" for="svc-search">Search treatments</label><input id="svc-search" name="search" type="search" autocomplete="off" value="' + E(state.q) + '" placeholder="Search knee, disc, clubfoot…" class="' + fld + '"></div>' +
        '<div><label class="sr-only" for="svc-sort">Sort treatments</label><select id="svc-sort" name="sort" autocomplete="off" class="' + fld + ' pr-10">' + opts + '</select></div></div>' +
        '<p id="svc-count" aria-live="polite" class="mt-3 font-mono text-xs uppercase tracking-widest text-ink/70"></p></div>' +
        '<div id="svc-grid" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>' +
        '<div id="svc-empty" hidden class="mt-10 rounded-3xl p-10 text-center ' + C.glassLight + '"><p class="font-display text-2xl">No treatment matches that search.</p><p class="mt-2 text-ink/70">Try another word, or clear the filters to see everything.</p><button type="button" data-action="reset" class="mt-6 ' + C.btnOutline + '">Clear filters</button></div>', 'ServiceCatalogue');
    }

    function renderGrid() {
      var q = state.q.toLowerCase();
      var list = all.filter(function (s) {
        return (state.category === 'all' || s.category === state.category) && (!q || [s.name, s.short, s.tagline, s.category].join(' ').toLowerCase().indexOf(q) > -1);
      });
      if (state.sort === 'price-asc') list.sort(function (a, b) { return a.priceFrom - b.priceFrom; });
      if (state.sort === 'price-desc') list.sort(function (a, b) { return b.priceTo - a.priceTo; });
      if (state.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      var grid = UI.qs('#svc-grid');
      grid.innerHTML = list.map(function (s, i) {
        var rec = s.recovery && s.recovery.length ? s.recovery[s.recovery.length - 1].phase : '';
        var snip = s.procedure ? '<p class="mt-3 px-2 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-ink/70">Stay · ' + E(s.procedure.hospitalStay) + (rec ? ' &nbsp;|&nbsp; Full recovery · ' + E(rec) : '') + '</p>' : '';
        return '<div data-reveal="up" data-delay="' + (i % 3) * 80 + '">' + UI.serviceCard(s, { theme: 'light' }) + snip + '</div>';
      }).join('');
      UI.qs('#svc-empty').hidden = list.length > 0;
      UI.qs('#svc-count').textContent = list.length + ' of ' + all.length + ' treatments shown';
      UI.setParams({ category: state.category === 'all' ? '' : state.category, q: state.q, sort: state.sort === 'featured' ? '' : state.sort });
      UI.mount(grid);
    }

    function wireCatalogue(root) {
      var sync = function () { UI.qsa('[data-cat]', root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === state.category)); }); };
      root.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat],[data-action="reset"]');
        if (!b) return;
        if (b.dataset.action === 'reset') { state.category = 'all'; state.q = ''; state.sort = 'featured'; UI.qs('#svc-search').value = ''; UI.qs('#svc-sort').value = 'featured'; }
        else state.category = b.dataset.cat;
        sync(); renderGrid();
      });
      UI.qs('#svc-search').addEventListener('input', UI.debounce(function () { state.q = UI.qs('#svc-search').value.trim(); renderGrid(); }, 150));
      UI.qs('#svc-sort').addEventListener('change', function () { state.sort = UI.qs('#svc-sort').value; renderGrid(); });
    }

    function renderPathway() {
      var steps = [
        ['01', 'Non-surgical first', 'Medicines, targeted injections, bracing and structured physiotherapy settle a large share of knee, back and shoulder problems.', O.capsule, 'sports-medicine-rehab', 'See sports medicine'],
        ['02', 'Minimally invasive', 'When surgery helps, we choose keyhole and muscle-sparing techniques: smaller wounds, less pain and earlier walking.', O.ball, 'shoulder-arthroscopy', 'See arthroscopy'],
        ['03', 'Surgery only when needed', 'Replacement, fixation and spinal decompression are advised when examination, scans and your daily life clearly point there.', O.vertebra, 'knee-replacement', 'See joint replacement']
      ];
      var cards = steps.map(function (s) {
        return '<div data-stage class="relative"><article data-scroll-3d class="relative h-full rounded-[2rem] p-8 pt-12 ' + C.glassDark + '"><p class="font-mono text-xs uppercase tracking-[0.25em] text-aqua">' + s[0] + ' —</p><h3 class="mt-4 font-display text-3xl font-light leading-tight">' + E(s[1]) + '</h3><p class="mt-4 text-white/70">' + E(s[2]) + '</p><a href="' + SITE.url.service(s[4]) + '" class="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-aqua">' + E(s[5]) + ' ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></article>' +
          '<div data-depth="40" class="pointer-events-none absolute -top-8 right-2 w-24 sm:w-28">' + UI.deco(s[3], 'w-full motion-safe:animate-float3d') + '</div></div>';
      }).join('');
      return sec('pathway', C.sectionDark,
        '<div class="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora" data-parallax="0.1" aria-hidden="true"></div>' +
        UI.sectionHead({ eyebrow: '02 — Our approach', title: 'The least invasive path that *works*', lead: 'We move up one step at a time, and only as far as your recovery requires.', align: 'left', theme: 'dark' }) +
        '<div class="relative mt-16 grid gap-14 lg:grid-cols-3 lg:gap-8">' + cards + '</div>', 'TreatmentPathway');
    }

    function renderPricing() {
      var drivers = ['The procedure and the implant or device chosen', 'Your room category and number of hospital days', 'Investigations such as MRI, CT and blood tests', 'Physiotherapy, which can be hospital or home based'];
      var pay = ((all[0].pricing || {}).paymentOptions || []).map(function (p) { return '<li class="rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm text-ink/70">' + E(p) + '</li>'; }).join('');
      var rows = all.map(function (s) {
        return '<tr class="border-t border-ink/10"><th scope="row" class="px-5 py-4 font-semibold"><a href="' + SITE.url.service(s.slug) + '" class="underline-offset-4 hover:text-iris hover:underline">' + E(s.name) + '</a></th><td class="px-5 py-4 text-ink/70">' + E(catName(s.category)) + '</td><td class="whitespace-nowrap px-5 py-4 font-mono text-[13px]">' + UI.formatBDTRange(s.priceFrom, s.priceTo) + '</td><td class="px-5 py-4 text-ink/70">' + E(s.priceUnit) + '</td></tr>';
      }).join('');
      return sec('pricing', C.sectionLight,
        '<div class="relative"><div data-parallax="0.12" class="pointer-events-none absolute -top-6 right-0 hidden w-36 md:block" aria-hidden="true">' + UI.deco(O.ring, 'w-full motion-safe:animate-float3d') + '</div>' +
        UI.sectionHead({ eyebrow: '03 — Pricing transparency', title: 'Know the cost *before* you commit', lead: 'These are guide ranges in Bangladeshi taka. After consultation you receive a written estimate for your own case.', align: 'left', theme: 'light' }) + '</div>' +
        '<div class="mt-12 grid gap-8 lg:grid-cols-[1fr_1.7fr]"><div data-reveal="left"><div class="h-full rounded-[2rem] p-8 ' + C.glassLight + '"><h3 class="font-display text-2xl font-light">What moves the price</h3><ul class="mt-5 space-y-3">' +
        drivers.map(function (d) { return '<li class="flex gap-3 text-ink/70">' + UI.icon('check-circle', 'mt-0.5 h-5 w-5 shrink-0 text-mint') + '<span>' + E(d) + '</span></li>'; }).join('') +
        '</ul><h3 class="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Ways to pay</h3><ul class="mt-3 flex flex-wrap gap-2">' + pay + '</ul><p class="mt-6 text-sm text-ink/70">Cashless cover depends on your insurer or employer and its limits. Individual results and costs vary.</p></div></div>' +
        '<div data-reveal="right"><div class="overflow-x-auto rounded-[2rem] ' + C.glassLight + '"><table class="w-full min-w-[640px] text-left text-sm"><caption class="sr-only">Guide price range for each treatment</caption><thead class="font-mono text-xs uppercase tracking-widest text-ink/70"><tr><th scope="col" class="px-5 py-4">Treatment</th><th scope="col" class="px-5 py-4">Type</th><th scope="col" class="px-5 py-4">Guide range</th><th scope="col" class="px-5 py-4">Per</th></tr></thead><tbody>' + rows + '</tbody></table></div></div></div>', 'PriceTransparency');
    }

    var names = all.map(function (s) { return s.name; }).concat(['Meniscus repair', 'Frozen shoulder release', 'Microdiscectomy', 'Clubfoot casting', 'Fracture fixation']);
    put('page-hero', renderHero());
    put('catalogue-root', renderCatalogue());
    wireCatalogue(UI.qs('#catalogue-root'));
    renderGrid();
    put('pathway-root', renderPathway());
    put('pricing-root', renderPricing());
    put('marquee-root', '<section id="treatments" data-section="treatments" aria-label="Treatments we provide" class="border-y border-ink/10 bg-pearl py-8" data-component="TreatmentMarquee">' + UI.marqueeHTML(names, { theme: 'light' }) + '</section>');
    put('cta-root', UI.ctaBand({ title: 'Not sure which treatment *fits* you?', lead: 'Book a consultation and Dr. Nabila will examine you, review your scans and explain every option, including the ones that avoid surgery.', primaryLabel: 'Book a consultation', primaryHref: bookHref, secondaryLabel: 'Call the appointment desk', secondaryHref: telHref }));
  });
})();
