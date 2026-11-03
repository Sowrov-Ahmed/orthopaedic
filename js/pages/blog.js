/* js/pages/blog.js · Owner Part 5 · Blog listing: hero search, featured post, category/sort/search/pagination with URL sync, topics, most-read, newsletter · Depends on: SITE, UI, window.BLOGS */
(function () {
  'use strict';
  UI.ready(function () {
    var esc = UI.esc, PER = 6, C = UI.cls;
    var R = function (k, d) { return (SITE.routes && SITE.routes[k]) || d; };
    var detail = window.BLOGS || [];
    var POSTS = SITE.blogIndex.map(function (p) {
      var d = detail.filter(function (b) { return b.slug === p.slug; })[0] || {};
      return Object.assign({}, p, d);
    });
    var CATS = (function () {
      var c = SITE.blogCategories || [];
      if (Array.isArray(c)) return c.map(function (x) { return typeof x === 'string' ? { slug: UI.slugify(x), name: x } : { slug: x.slug || x.id, name: x.name || x.label || x.slug }; });
      return Object.keys(c).map(function (k) { var v = c[k]; return { slug: k, name: typeof v === 'string' ? v : (v.name || v.label || k) }; });
    })();
    var catName = function (slug) { var f = CATS.filter(function (c) { return c.slug === slug; })[0]; return f ? f.name : slug; };
    var SORTS = { newest: 'Newest', oldest: 'Oldest', popular: 'Most read', shortest: 'Shortest read' };
    var cmp = {
      newest: function (a, b) { return b.date.localeCompare(a.date); },
      oldest: function (a, b) { return a.date.localeCompare(b.date); },
      popular: function (a, b) { return (b.views || 0) - (a.views || 0); },
      shortest: function (a, b) { return a.readMinutes - b.readMinutes; }
    };
    var cat0 = UI.getParam('category') || '';
    var sort0 = UI.getParam('sort') || 'newest';
    if (!cmp[sort0]) sort0 = 'newest';
    var st = { category: CATS.some(function (c) { return c.slug === cat0; }) ? cat0 : '', q: UI.getParam('q') || '', page: Math.max(1, parseInt(UI.getParam('page'), 10) || 1), sort: sort0 };

    function filtered() {
      var q = st.q.trim().toLowerCase();
      return POSTS.filter(function (p) {
        if (st.category && p.categorySlug !== st.category) return false;
        if (!q) return true;
        return [p.title, p.excerpt, catName(p.categorySlug), (p.tags || []).join(' ')].join(' ').toLowerCase().indexOf(q) > -1;
      }).sort(cmp[st.sort]);
    }
    function sync() {
      UI.setParams({ category: st.category, q: st.q.trim(), page: st.page > 1 ? st.page : '', sort: st.sort === 'newest' ? '' : st.sort });
    }
    var chipCls = 'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 text-sm font-medium text-ink/80 motion-safe:transition-[transform,opacity] hover:border-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris aria-pressed:border-iris aria-pressed:bg-iris aria-pressed:text-white';

    /* ---------- hero with glass search ---------- */
    UI.qs('#page-hero').innerHTML = UI.pageHero({
      eyebrow: 'The journal',
      title: 'Orthopaedic *insights* you can trust',
      lead: 'Clear, practical guidance on knees, shoulders, spines, sport and recovery, written by Dr. Nabila Rahman for patients and families across Bangladesh.',
      actionsHTML: '<form role="search" data-component="BlogSearch" class="relative w-full max-w-xl" data-action="search-form">' +
        '<label for="blog-search" class="sr-only">Search articles</label>' + UI.icon('search', 'pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70') +
        '<input id="blog-search" name="q" type="search" autocomplete="off" value="' + esc(st.q) + '" placeholder="Search knee, ACL, sciatica, recovery…" class="' + C.glassDark + ' min-h-[52px] w-full rounded-full py-3 pl-14 pr-5 text-white placeholder:text-white/70 motion-safe:transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"></form>'
    });

    /* ---------- featured (newest) ---------- */
    var feat = POSTS.slice().sort(cmp.newest)[0];
    UI.qs('#blog-featured').innerHTML = '<section id="featured" data-section="featured" class="' + C.sectionLight + '"><div class="' + C.container + '">' +
      '<div data-reveal="up" class="mb-8 flex items-end justify-between gap-4"><p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">01 — Featured this month</p><span class="hidden h-px flex-1 bg-ink/10 sm:block"></span></div>' +
      '<div data-reveal="zoom" class="' + C.stage + '"><article data-tilt data-tilt-max="5" data-component="FeaturedPost" class="' + C.glassLight + ' ' + C.preserve3d + ' relative grid overflow-hidden rounded-[2rem] lg:grid-cols-2">' +
      '<div data-tilt-glare class="pointer-events-none absolute inset-0 z-10 opacity-0 motion-safe:transition-opacity bg-[radial-gradient(500px_circle_at_50%_0%,rgba(255,255,255,.35),transparent_60%)]"></div>' +
      '<a href="' + SITE.url.blog(feat.slug) + '" class="relative block overflow-hidden" aria-label="Read: ' + esc(feat.title) + '">' + UI.img(feat.image, feat.title, 'h-72 w-full object-cover lg:h-full', { w: 1200, h: 800, eager: true }) + '</a>' +
      '<div class="flex flex-col justify-center gap-5 p-8 sm:p-12"><div class="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-ink/70">' + UI.badge(catName(feat.categorySlug), 'light') +
      '<span>' + UI.formatDate(feat.date, 'long') + '</span><span>' + feat.readMinutes + ' min read</span></div>' +
      '<h2 class="font-display text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">' + esc(feat.title) + '</h2><p class="max-w-prose text-ink/70">' + esc(feat.excerpt) + '</p>' +
      '<div><a href="' + SITE.url.blog(feat.slug) + '" data-magnetic class="' + C.btnInk + '">' + C.shine + 'Read the article ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div></div></article></div></div></section>';

    /* ---------- listing shell ---------- */
    UI.qs('#blog-list').innerHTML = '<section id="articles" data-section="articles" class="' + C.sectionLight + ' !pt-0"><div class="' + C.container + '">' +
      UI.sectionHead({ eyebrow: '02 — All articles', title: 'Browse by *topic*', lead: 'Filter by body area or search above. Every article ends with clear advice on when to see a doctor.', align: 'left', theme: 'light' }) +
      '<div class="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div id="blog-chips" role="group" aria-label="Filter articles by category" class="flex flex-wrap gap-2"></div>' +
      '<div class="flex items-center gap-3"><label for="blog-sort" class="font-mono text-xs uppercase tracking-[0.15em] text-ink/70">Sort</label><select id="blog-sort" name="sort" autocomplete="off" class="min-h-[44px] rounded-full border border-ink/10 bg-white/70 px-4 pr-10 text-sm text-ink scheme-light motion-safe:transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris">' +
      Object.keys(SORTS).map(function (k) { return '<option class="bg-white text-ink" value="' + k + '">' + SORTS[k] + '</option>'; }).join('') + '</select></div></div>' +
      '<p id="blog-count" role="status" aria-live="polite" class="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink/70"></p>' +
      '<div id="blog-grid" data-component="PostGrid" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div><nav id="blog-pager" aria-label="Pagination" class="mt-12 flex flex-wrap items-center justify-center gap-2"></nav></div></section>';
    var grid = UI.qs('#blog-grid'), chips = UI.qs('#blog-chips'), pager = UI.qs('#blog-pager'), search = UI.qs('#blog-search'), sortEl = UI.qs('#blog-sort');

    function renderChips() {
      chips.innerHTML = [{ slug: '', name: 'All' }].concat(CATS).map(function (c) {
        var n = c.slug ? POSTS.filter(function (p) { return p.categorySlug === c.slug; }).length : POSTS.length;
        return '<button type="button" data-cat="' + esc(c.slug) + '" aria-pressed="' + (st.category === c.slug) + '" class="' + chipCls + '">' + esc(c.name) + ' <span class="font-mono text-xs opacity-70">' + n + '</span></button>';
      }).join('');
    }
    function renderPager(pages) {
      if (pages < 2) { pager.innerHTML = ''; return; }
      var b = 'inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border border-ink/15 px-4 text-sm font-medium motion-safe:transition-[transform,opacity] hover:border-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris disabled:opacity-40 aria-[current=page]:border-iris aria-[current=page]:bg-iris aria-[current=page]:text-white';
      var h = '<button type="button" class="' + b + '" data-page="' + (st.page - 1) + '" ' + (st.page === 1 ? 'disabled' : '') + ' aria-label="Previous page">' + UI.icon('arrow-left', 'h-4 w-4') + '</button>';
      for (var i = 1; i <= pages; i++) h += '<button type="button" class="' + b + '" data-page="' + i + '" aria-label="Page ' + i + '"' + (i === st.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
      pager.innerHTML = h + '<button type="button" class="' + b + '" data-page="' + (st.page + 1) + '" ' + (st.page === pages ? 'disabled' : '') + ' aria-label="Next page">' + UI.icon('arrow-right', 'h-4 w-4') + '</button>';
    }
    function render() {
      var list = filtered(), pages = Math.max(1, Math.ceil(list.length / PER));
      st.page = Math.min(st.page, pages);
      var items = list.slice((st.page - 1) * PER, st.page * PER);
      renderChips();
      sortEl.value = st.sort;
      UI.qs('#blog-count').textContent = list.length ? 'Showing ' + ((st.page - 1) * PER + 1) + '–' + ((st.page - 1) * PER + items.length) + ' of ' + list.length + (list.length === 1 ? ' article' : ' articles') : 'No articles found';
      grid.innerHTML = items.length ? items.map(function (p, i) { return '<div data-reveal="up" data-delay="' + ((i % 3) * 80) + '">' + UI.postCard(p, { theme: 'light' }) + '</div>'; }).join('') :
        '<div class="' + C.glassLight + ' col-span-full rounded-3xl p-10 text-center" data-component="NoResults">' + UI.icon('search', 'mx-auto mb-4 h-8 w-8 text-iris') +
        '<h3 class="font-display text-2xl font-light">No articles match your search</h3><p class="mx-auto mt-2 max-w-md text-ink/70">Try a shorter keyword such as “knee” or “recovery”, or clear the filters to see every article.</p>' +
        '<button type="button" data-action="reset" class="' + C.btnInk + ' mt-6">Clear filters</button></div>';
      renderPager(list.length ? pages : 0);
      sync();
      UI.mount(grid);
    }
    function setQ(v) { st.q = v; st.page = 1; search.value = v; render(); }

    /* ---------- dark band: topics, most read, newsletter ---------- */
    var tagCount = {};
    POSTS.forEach(function (p) { (p.tags || []).forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; }); });
    var tags = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a] || a.localeCompare(b); }).slice(0, 12);
    var top3 = POSTS.slice().sort(cmp.popular).slice(0, 3);
    UI.qs('#blog-aside').innerHTML = '<section id="insights" data-section="insights" class="' + C.sectionDark + ' relative overflow-hidden"><div data-parallax="0.12" aria-hidden="true" class="pointer-events-none absolute -left-24 top-10"><div class="h-72 w-72 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora"></div></div>' +
      '<div class="' + C.container + ' relative grid gap-10 lg:grid-cols-12"><div data-reveal="up" class="lg:col-span-4" data-component="PopularTopics"><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">03 — Popular topics</p><h2 data-split class="mt-3 font-display text-3xl font-light leading-tight text-white">What readers search <em class="text-iris-300">most</em></h2>' +
      '<div class="mt-6 flex flex-wrap gap-2">' + tags.map(function (t) { return '<button type="button" data-topic="' + esc(t) + '" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 motion-safe:transition-[transform,opacity] hover:border-aqua hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua">' + UI.icon('tag', 'h-3.5 w-3.5') + esc(t) + '</button>'; }).join('') + '</div></div>' +
      '<div data-reveal="up" data-delay="120" class="lg:col-span-4" data-component="MostRead"><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Most read</p><ol class="mt-6 divide-y divide-white/10 border-y border-white/10">' +
      top3.map(function (p, i) { return '<li><a href="' + SITE.url.blog(p.slug) + '" class="group flex gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"><span class="font-mono text-2xl text-iris-300">0' + (i + 1) + '</span><span><span class="block font-display text-lg font-light leading-snug text-white group-hover:text-aqua">' + esc(p.title) + '</span><span class="mt-1 block font-mono text-xs uppercase tracking-[0.12em] text-white/70">' + (p.views || 0).toLocaleString('en-US') + ' reads · ' + p.readMinutes + ' min</span></span></a></li>'; }).join('') + '</ol></div>' +
      '<div data-reveal="up" data-delay="240" class="lg:col-span-4"><div data-tilt data-component="NewsletterForm" class="' + C.glassDark + ' relative rounded-3xl p-7"><div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity"></div>' +
      '<div data-stage class="absolute -right-4 -top-10 w-24"><div data-depth="40">' + UI.deco(SITE.img.objects.capsule, 'w-24 motion-safe:animate-float3d') + '</div></div>' +
      '<p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Newsletter</p><h3 class="mt-2 font-display text-2xl font-light text-white">One useful article, <em class="text-iris-300">monthly</em></h3><p class="mt-2 text-sm text-white/70">Practical bone and joint advice by email. No spam, unsubscribe at any time.</p>' +
      '<form id="newsletter-form" novalidate class="mt-5 space-y-4">' + UI.field({ label: 'Email address', name: 'email', type: 'email', required: true, placeholder: 'you@example.com…', autocomplete: 'email', theme: 'dark' }) +
      '<button type="submit" data-magnetic class="' + C.btnPrimary + ' w-full justify-center">' + C.shine + 'Subscribe ' + UI.icon('send', 'h-4 w-4') + '</button></form></div></div></div></section>';
    UI.qs('#blog-cta').innerHTML = UI.ctaBand({ title: 'Pain that will not *settle*?', lead: 'An article can guide you, but only an examination can diagnose. Book a consultation at the chamber nearest you.', primaryLabel: 'Book an appointment', primaryHref: SITE.url.appointment({}), secondaryLabel: 'Call the desk', secondaryHref: 'tel:' + SITE.contact.phone.e164 });

    /* ---------- events ---------- */
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cat],[data-page],[data-topic],[data-action="reset"]');
      if (!t) return;
      if (t.hasAttribute('data-cat')) { st.category = t.getAttribute('data-cat'); st.page = 1; render(); }
      else if (t.hasAttribute('data-page')) { st.page = parseInt(t.getAttribute('data-page'), 10); render(); UI.qs('#articles').scrollIntoView({ behavior: FX.reduced() ? 'auto' : 'smooth', block: 'start' }); }
      else if (t.hasAttribute('data-topic')) { st.category = ''; setQ(t.getAttribute('data-topic')); UI.qs('#articles').scrollIntoView({ behavior: FX.reduced() ? 'auto' : 'smooth', block: 'start' }); }
      else { st.category = ''; setQ(''); }
    });
    sortEl.addEventListener('change', function () { st.sort = cmp[sortEl.value] ? sortEl.value : 'newest'; st.page = 1; render(); });
    search.addEventListener('input', UI.debounce(function () { setQ(search.value); }, 250));
    UI.qs('[data-action="search-form"]').addEventListener('submit', function (e) { e.preventDefault(); setQ(search.value); UI.qs('#articles').scrollIntoView({ behavior: FX.reduced() ? 'auto' : 'smooth' }); });
    UI.qs('#newsletter-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.currentTarget;
      if (!UI.validateForm(f)) return;
      SITE.submit('newsletter', { email: f.elements.email.value.trim() }).then(function () { UI.toast('Thank you. Please check your inbox to confirm your subscription.', 'success'); f.reset(); }, function () { UI.toast('Something went wrong. Please try again.', 'error'); });
    });
    render();
    UI.mount(UI.qs('#main'));
  });
})();
