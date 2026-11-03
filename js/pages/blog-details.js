/* js/pages/blog-details.js · Owner Part 5 · Article page: dynamic meta + JSON-LD, 3D cover, editorial body, scroll-spy TOC, share, related content · Depends on: SITE, UI, window.BLOGS */
(function () {
  'use strict';
  UI.ready(function () {
    var esc = UI.esc, C = UI.cls;
    var R = function (k, d) { return (SITE.routes && SITE.routes[k]) || d; };
    var detail = window.BLOGS || [];
    var merge = function (p) { return Object.assign({}, p, detail.filter(function (b) { return b.slug === p.slug; })[0] || {}); };
    var ALL = SITE.blogIndex.map(merge).sort(function (a, b) { return a.date.localeCompare(b.date); });
    var CATS = (function () {
      var c = SITE.blogCategories || [];
      if (Array.isArray(c)) return c.map(function (x) { return typeof x === 'string' ? { slug: UI.slugify(x), name: x } : { slug: x.slug || x.id, name: x.name || x.label || x.slug }; });
      return Object.keys(c).map(function (k) { var v = c[k]; return { slug: k, name: typeof v === 'string' ? v : (v.name || v.label || k) }; });
    })();
    var catName = function (s) { var f = CATS.filter(function (c) { return c.slug === s; })[0]; return f ? f.name : s; };
    var fmt = function (t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>'); };
    var setMeta = function (sel, attr, val) {
      var el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr[0], attr[1]); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    var heroEl = UI.qs('#page-hero'), root = UI.qs('#post-root'), ctaEl = UI.qs('#post-cta');
    var slug = UI.getParam('slug');
    var base = ALL.filter(function (p) { return p.slug === slug; })[0];

    /* ---------- not found ---------- */
    if (!base) {
      document.title = 'Article not found | Dr. Nabila Sultana Rahman – Orthopaedic Surgeon';
      heroEl.innerHTML = UI.pageHero({ eyebrow: 'Article not found', title: 'We could not find that *article*', lead: 'The link may be incomplete or the article may have moved. Browse the journal to find guidance on knees, shoulders, spines, sport and recovery.',
        actionsHTML: '<a href="' + R('blog', 'blog.html') + '" data-magnetic class="' + C.btnPrimary + '">' + C.shine + UI.icon('arrow-left', 'h-4 w-4') + ' Back to all articles</a>' });
      root.innerHTML = '<section id="latest" data-section="latest" class="' + C.sectionLight + '"><div class="' + C.container + '" data-component="NotFoundSuggestions">' +
        UI.sectionHead({ eyebrow: 'Meanwhile', title: 'Our latest *articles*', lead: 'Three recent reads from Dr. Nabila Rahman.', align: 'left', theme: 'light' }) +
        '<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' + ALL.slice(-3).reverse().map(function (p, i) { return '<div data-reveal="up" data-delay="' + (i * 80) + '">' + UI.postCard(p, { theme: 'light' }) + '</div>'; }).join('') + '</div></div></section>';
      UI.mount(UI.qs('#main'));
      return;
    }
    var post = base, idx = ALL.indexOf(post), catSlug = post.categorySlug, cName = catName(catSlug);
    var url = location.href.split('#')[0];

    /* ---------- meta + JSON-LD ---------- */
    document.title = post.title + ' | Dr. Nabila Sultana Rahman – Orthopaedic Surgeon';
    setMeta('meta[name="description"]', ['name', 'description'], post.summary || post.excerpt);
    setMeta('meta[property="og:title"]', ['property', 'og:title'], post.title);
    setMeta('meta[property="og:description"]', ['property', 'og:description'], post.summary || post.excerpt);
    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.summary || post.excerpt, image: post.image, datePublished: post.date, dateModified: post.date, articleSection: cName, keywords: (post.tags || []).join(', '), author: { '@type': 'Person', name: SITE.doctor.name }, publisher: { '@type': 'Organization', name: (typeof SITE.brand === 'string' ? SITE.brand : (SITE.brand && SITE.brand.name)) || SITE.doctor.name }, mainEntityOfPage: url });
    document.head.appendChild(ld);

    /* ---------- hero ---------- */
    heroEl.innerHTML = UI.pageHero({ eyebrow: cName + ' · ' + post.readMinutes + ' min read', title: post.title, lead: post.excerpt,
      actionsHTML: '<p class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-white/70">' + UI.icon('user', 'h-4 w-4') + '<span>' + esc(SITE.doctor.shortName) + '</span><span aria-hidden="true">·</span><time datetime="' + esc(post.date) + '">' + UI.formatDate(post.date, 'long') + '</time><span aria-hidden="true">·</span><span>' + (post.views || 0).toLocaleString('en-US') + ' reads</span></p>' });

    /* ---------- body blocks ---------- */
    var toc = [], n = 0, firstP = true;
    var body = (post.content || []).map(function (b) {
      if (b.type === 'h2') { n++; toc.push({ id: 'sec-' + n, text: b.text });
        return '<h2 id="sec-' + n + '" data-heading class="mt-14 scroll-mt-28 font-display text-3xl font-light leading-tight sm:text-4xl"><span class="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-iris">0' + n + ' —</span>' + esc(b.text) + '</h2>'; }
      if (b.type === 'p') { var drop = firstP ? ' first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:leading-[0.8] first-letter:text-iris' : ''; firstP = false;
        return '<p class="mt-5 text-lg leading-8 text-ink/80' + drop + '">' + fmt(b.text) + '</p>'; }
      if (b.type === 'ul' || b.type === 'ol') return '<' + b.type + ' class="mt-5 space-y-2 pl-6 text-lg leading-8 text-ink/80 marker:text-iris ' + (b.type === 'ul' ? 'list-disc' : 'list-decimal') + '">' + b.items.map(function (i) { return '<li class="pl-1">' + fmt(i) + '</li>'; }).join('') + '</' + b.type + '>';
      if (b.type === 'quote') return '<blockquote class="my-10 border-l-2 border-iris pl-6"><p class="font-display text-2xl font-light italic leading-snug sm:text-3xl">“' + esc(b.text) + '”</p><footer class="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-ink/70">— ' + esc(b.cite) + '</footer></blockquote>';
      if (b.type === 'callout') { var warn = b.tone === 'warning';
        return '<aside role="note" class="' + C.glassLight + ' my-8 rounded-2xl border-l-4 p-6 ' + (warn ? 'border-l-coral' : 'border-l-mint') + '"><p class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] ' + (warn ? 'text-coral' : 'text-emerald-700') + '">' + UI.icon(warn ? 'alert-circle' : 'check-circle', 'h-4 w-4') + esc(b.title) + '</p><p class="mt-2 text-base leading-7 text-ink/80">' + fmt(b.text) + '</p></aside>'; }
      return '';
    }).join('');

    /* ---------- aside ---------- */
    var shareText = encodeURIComponent(post.title + ' – Dr. Nabila Rahman'), shareUrl = encodeURIComponent(url);
    var sb = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink motion-safe:transition-[transform,opacity] hover:border-iris hover:text-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris';
    var aside = '<aside class="space-y-6 lg:sticky lg:top-28" aria-label="Article tools" data-component="ArticleAside">' +
      '<details open id="toc-box" class="' + C.glassLight + ' rounded-2xl p-5"><summary class="flex min-h-[44px] cursor-pointer items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-ink/70">In this article ' + UI.icon('chevron-down', 'h-4 w-4') + '</summary><nav aria-label="Table of contents" class="mt-3"><ol class="space-y-1">' +
      toc.map(function (t, i) { return '<li><a href="#' + t.id + '" data-toc="' + t.id + '" class="block min-h-[44px] border-l-2 border-ink/10 py-2.5 pl-4 text-sm text-ink/70 motion-safe:transition-[transform,opacity] hover:text-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris aria-[current=true]:border-iris aria-[current=true]:font-semibold aria-[current=true]:text-iris"><span class="mr-2 font-mono text-xs">0' + (i + 1) + '</span>' + esc(t.text) + '</a></li>'; }).join('') + '</ol></nav></details>' +
      '<div class="' + C.glassLight + ' rounded-2xl p-5"><p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Key takeaways</p><ul class="mt-3 space-y-3">' + (post.keyTakeaways || []).map(function (k) { return '<li class="flex gap-3 text-sm leading-6 text-ink/80">' + UI.icon('check-circle', 'mt-0.5 h-5 w-5 shrink-0 text-mint') + '<span>' + esc(k) + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="' + C.glassLight + ' rounded-2xl p-5"><p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Share</p><div class="mt-3 flex flex-wrap gap-2">' +
      '<button type="button" data-action="copy-link" class="' + sb + '" aria-label="Copy link to this article">' + UI.icon('copy', 'h-4 w-4') + '</button>' +
      '<a class="' + sb + '" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" href="https://wa.me/?text=' + shareText + '%20' + shareUrl + '">' + UI.icon('message-circle', 'h-4 w-4') + '</a>' +
      '<a class="' + sb + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '">' + UI.icon('facebook', 'h-4 w-4') + '</a>' +
      '<a class="' + sb + '" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl + '">' + UI.icon('linkedin', 'h-4 w-4') + '</a></div></div>' +
      '<div data-tilt class="relative overflow-hidden rounded-2xl bg-ink p-6 text-white"><div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity"></div><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Need advice?</p><p class="mt-2 font-display text-2xl font-light leading-snug">Book a <em class="text-iris-300">consultation</em></p><p class="mt-2 text-sm text-white/70">Get a personal assessment instead of general guidance.</p>' +
      '<a href="' + SITE.url.appointment({ service: (post.serviceSlugs || [])[0] }) + '" data-magnetic class="' + C.btnPrimary + ' mt-5 w-full justify-center">' + C.shine + 'Book appointment ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div></aside>';

    /* ---------- sections ---------- */
    var navCard = function (p, dir) {
      if (!p) return '<div></div>';
      return '<a href="' + SITE.url.blog(p.slug) + '" class="' + C.glassDark + ' group flex min-h-[44px] flex-col gap-2 rounded-2xl p-5 motion-safe:transition-[transform,opacity] hover:border-aqua/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua ' + (dir === 'next' ? 'sm:items-end sm:text-right' : '') + '"><span class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-white/70">' + (dir === 'prev' ? UI.icon('arrow-left', 'h-4 w-4') + 'Previous article' : 'Next article' + UI.icon('arrow-right', 'h-4 w-4')) + '</span><span class="font-display text-xl font-light leading-snug text-white group-hover:text-aqua">' + esc(p.title) + '</span></a>';
    };
    var services = (post.serviceSlugs || []).map(function (s) { return SITE.getService(s); }).filter(Boolean);
    var related = (post.relatedSlugs || []).map(function (s) { return ALL.filter(function (p) { return p.slug === s; })[0]; }).filter(Boolean);
    var doc = SITE.doctor;
    root.innerHTML =
      '<section id="article" data-section="article" class="' + C.sectionLight + '"><div class="' + C.container + '">' +
      '<div class="' + C.stage + ' mb-14"><div data-scroll-3d data-component="ArticleCover" class="overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">' + UI.img(post.image, post.title, 'h-[260px] w-full object-cover sm:h-[460px]', { w: 1600, h: 900, eager: true }) + '</div></div>' +
      '<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]"><article data-component="ArticleBody" class="max-w-[68ch]">' + body +
      '<div class="mt-12 flex flex-wrap gap-2" data-component="TagList">' + (post.tags || []).map(function (t) { return '<a href="blog.html?q=' + encodeURIComponent(t) + '" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/15 px-4 text-sm text-ink/80 motion-safe:transition-[transform,opacity] hover:border-iris hover:text-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris">' + UI.icon('tag', 'h-3.5 w-3.5') + esc(t) + '</a>'; }).join('') + '</div>' +
      '<p class="mt-8 rounded-2xl border border-ink/10 bg-white/60 p-5 text-sm leading-6 text-ink/70" role="note"><strong class="font-semibold text-ink">Medical disclaimer.</strong> This article offers general information and does not replace an examination. Every patient is different and results vary. If you have severe pain, a deformity, numbness or fever, seek medical care promptly or call the emergency line ' + esc(SITE.contact.emergency.display) + '.</p></article>' + aside + '</div></div></section>' +
      '<section id="author" data-section="author" class="' + C.sectionDark + ' relative overflow-hidden"><div data-parallax="0.12" aria-hidden="true" class="pointer-events-none absolute -right-20 top-0"><div class="h-72 w-72 rounded-full bg-aqua/30 blur-3xl motion-safe:animate-aurora"></div></div><div class="' + C.container + ' relative space-y-12">' +
      '<div data-reveal="up" data-component="AuthorCard" class="' + C.glassDark + ' grid items-center gap-6 rounded-3xl p-6 sm:grid-cols-[140px_1fr] sm:p-8"><div class="h-36 w-36 overflow-hidden rounded-full border border-white/20">' + UI.img(doc.image || SITE.img.portrait, doc.name, 'h-full w-full bg-aurora-dark object-cover', { w: 288, h: 288 }) + '</div><div><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Written and reviewed by</p><p class="mt-1 font-display text-3xl font-light text-white">' + esc(doc.name) + '</p><p class="mt-1 text-white/70">' + esc(doc.title) + ' · BMDC ' + esc(doc.bmdcNo) + '</p><a href="' + R('about', 'about.html') + '" class="mt-3 inline-flex min-h-[44px] items-center gap-2 text-aqua hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua">About Dr. Nabila ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div></div>' +
      '<div data-reveal="up" class="flex flex-wrap items-center gap-4" data-component="HelpfulVote"><p id="helpful-label" class="font-display text-xl font-light text-white">Was this article helpful?</p><div role="group" aria-labelledby="helpful-label" class="flex gap-3"><button type="button" data-vote="yes" aria-pressed="false" class="' + C.btnGlass + ' aria-pressed:bg-iris">' + UI.icon('check', 'h-4 w-4') + ' Yes</button><button type="button" data-vote="no" aria-pressed="false" class="' + C.btnGlass + ' aria-pressed:bg-iris">' + UI.icon('x', 'h-4 w-4') + ' Not really</button></div></div>' +
      (services.length ? '<div data-component="RelatedServices"><p class="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/70">Related care</p><div class="grid gap-6 sm:grid-cols-2">' + services.map(function (s, i) { return '<div data-reveal="up" data-delay="' + (i * 100) + '">' + UI.serviceCard(s, { theme: 'dark' }) + '</div>'; }).join('') + '</div></div>' : '') +
      '<nav aria-label="More articles" data-component="PrevNext" class="grid gap-4 sm:grid-cols-2">' + navCard(ALL[idx - 1], 'prev') + navCard(ALL[idx + 1], 'next') + '</nav></div></section>' +
      (related.length ? '<section id="related" data-section="related" class="' + C.sectionLight + '"><div class="' + C.container + '" data-component="RelatedPosts">' + UI.sectionHead({ eyebrow: 'Keep reading', title: 'Related *articles*', lead: 'More guidance chosen to follow on from this topic.', align: 'left', theme: 'light' }) + '<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">' + related.map(function (p, i) { return '<div data-reveal="up" data-delay="' + (i * 100) + '">' + UI.postCard(p, { theme: 'light' }) + '</div>'; }).join('') + '</div></div></section>' : '');
    ctaEl.innerHTML = UI.ctaBand({ title: 'Ready for a clear *diagnosis*?', lead: 'Book a consultation and leave with a plan that fits your body, your work and your life.', primaryLabel: 'Book an appointment', primaryHref: SITE.url.appointment({ service: (post.serviceSlugs || [])[0] }), secondaryLabel: 'Read more articles', secondaryHref: R('blog', 'blog.html') });
    UI.mount(UI.qs('#main'));

    /* ---------- behaviours ---------- */
    var box = UI.qs('#toc-box');
    if (box && window.matchMedia && window.matchMedia('(max-width: 1023px)').matches) box.removeAttribute('open');
    var links = UI.qsa('[data-toc]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          var a = UI.qs('[data-toc="' + e.target.id + '"]');
          if (a) a.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-20% 0px -65% 0px' });
      UI.qsa('[data-heading]').forEach(function (h) { io.observe(h); });
    }
    UI.qs('[data-action="copy-link"]').addEventListener('click', function () {
      Promise.resolve(UI.copy(url)).then(function () { UI.toast('Link copied to clipboard', 'success'); });
    });
    UI.qsa('[data-vote]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-vote');
        UI.qsa('[data-vote]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); b.disabled = true; });
        SITE.submit('article-feedback', { slug: post.slug, helpful: v === 'yes' }).then(function () { UI.toast('Thank you for your feedback.', 'success'); });
      });
    });
  });
})();
