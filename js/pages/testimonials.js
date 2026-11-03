/* js/pages/testimonials.js · Owner Part 5 · Reviews page: rating summary, filters, load-more masonry, patient story stepper, moderated review form · Depends on: SITE, UI, window.TESTIMONIALS */
(function () {
  'use strict';
  UI.ready(function () {
    var esc = UI.esc, C = UI.cls, PER = 9;
    var R = function (k, d) { return (SITE.routes && SITE.routes[k]) || d; };
    var svcName = function (s) { var f = SITE.getService(s); return f ? f.name : s; };
    var ALL = SITE.testimonialsIndex.concat(window.TESTIMONIALS || []).map(function (t) { return Object.assign({}, t, { serviceName: svcName(t.serviceSlug) }); });
    var total = ALL.length;
    var avg = ALL.reduce(function (s, t) { return s + t.rating; }, 0) / total;
    var dist = [5, 4, 3, 2, 1].map(function (n) { return { n: n, c: ALL.filter(function (t) { return t.rating === n; }).length }; });
    var service0 = UI.getParam('service') || '', rating0 = UI.getParam('rating') || 'all', sort0 = UI.getParam('sort') || 'newest';
    var shown0 = parseInt(UI.getParam('shown'), 10) || PER;
    if (!SITE.servicesIndex.some(function (s) { return s.slug === service0; })) service0 = '';
    if (['all', '5', '4plus'].indexOf(rating0) < 0) rating0 = 'all';
    if (['newest', 'oldest', 'highest'].indexOf(sort0) < 0) sort0 = 'newest';
    var st = { service: service0, rating: rating0, sort: sort0, shown: Math.min(total, Math.max(PER, shown0)) };
    var cmp = {
      newest: function (a, b) { return b.date.localeCompare(a.date); },
      oldest: function (a, b) { return a.date.localeCompare(b.date); },
      highest: function (a, b) { return b.rating - a.rating || b.date.localeCompare(a.date); }
    };

    /* ---------- hero ---------- */
    UI.qs('#page-hero').innerHTML = UI.pageHero({
      eyebrow: 'Patient stories', title: 'Recovery, in their *own words*',
      lead: 'Real experiences from patients across Chattogram, Dhaka and the districts, shared with consent and moderated for accuracy. Individual results vary.',
      actionsHTML: '<div class="flex flex-wrap gap-3"><a href="#share" data-magnetic class="' + C.btnPrimary + '">' + C.shine + 'Share your experience ' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="' + SITE.url.appointment({}) + '" class="' + C.btnGlass + '">Book a consultation</a></div>'
    });

    /* ---------- rating summary (dark) ---------- */
    UI.qs('#t-summary').innerHTML = '<section id="rating-summary" data-section="rating-summary" class="' + C.sectionInk + ' relative overflow-hidden"><div data-parallax="0.12" aria-hidden="true" class="pointer-events-none absolute -right-24 -top-10"><div class="h-80 w-80 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora"></div></div>' +
      '<div class="' + C.container + ' relative grid items-center gap-12 lg:grid-cols-12" data-component="RatingSummary">' +
      '<div data-reveal="up" class="lg:col-span-5"><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">01 — Patient satisfaction</p><h2 data-split class="mt-3 font-display text-4xl font-light leading-tight text-white sm:text-5xl">Trusted by thousands, <em class="text-iris-300">rated</em> by patients</h2>' +
      '<div class="mt-8 flex items-center gap-5"><span class="font-display text-7xl font-light text-white" aria-label="Average rating ' + avg.toFixed(1) + ' out of 5">' + avg.toFixed(1) + '</span><div><div class="text-gold" aria-hidden="true">' + UI.stars(Math.round(avg)) + '</div><p class="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-white/70">' + total + ' verified reviews</p></div></div>' +
      '<div class="mt-8 grid grid-cols-2 gap-4"><div data-tilt class="' + C.glassDark + ' rounded-2xl p-5"><div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity"></div>' + UI.statTile({ value: SITE.doctor.satisfactionPercent, suffix: '%', label: 'Would recommend', theme: 'dark' }) + '</div><div data-tilt class="' + C.glassDark + ' rounded-2xl p-5"><div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity"></div>' + UI.statTile({ value: SITE.doctor.patientsTreated || 21000, suffix: '+', label: 'Patients treated', theme: 'dark', delay: 100 }) + '</div></div></div>' +
      '<div data-reveal="up" data-delay="150" class="relative lg:col-span-7"><div data-stage class="absolute -top-16 right-0 hidden w-28 sm:block"><div data-depth="40">' + UI.deco(SITE.img.objects.ring, 'w-28 motion-safe:animate-float3d') + '</div></div>' +
      '<div class="' + C.glassDark + ' rounded-3xl p-6 sm:p-8"><h3 class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Rating distribution</h3><ul id="t-dist" class="mt-6 space-y-4">' +
      dist.map(function (d) { var pct = Math.round(d.c / total * 100); return '<li class="flex items-center gap-4" aria-label="' + d.n + ' stars: ' + d.c + ' reviews, ' + pct + ' percent"><span class="flex w-10 items-center gap-1 font-mono text-sm text-white">' + d.n + UI.icon('star-fill', 'h-3.5 w-3.5 text-gold') + '</span><span class="h-3 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><span data-pct="' + pct + '" class="block h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-iris to-aqua motion-safe:transition-transform duration-1000 ease-out"></span></span><span class="w-16 text-right font-mono text-xs text-white/70">' + d.c + ' · ' + pct + '%</span></li>'; }).join('') + '</ul></div></div></div></section>';
    var fills = UI.qsa('#t-dist [data-pct]');
    var fillAll = function () { fills.forEach(function (f) { f.style.transform = 'scaleX(' + (Number(f.getAttribute('data-pct')) / 100) + ')'; }); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { fillAll(); io.disconnect(); } }, { threshold: 0.3 });
      io.observe(UI.qs('#t-dist'));
    } else { fillAll(); }

    /* ---------- reviews: filters + grid (light) ---------- */
    var chip = 'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 text-sm font-medium text-ink/80 motion-safe:transition-[transform,opacity] hover:border-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris aria-pressed:border-iris aria-pressed:bg-iris aria-pressed:text-white';
    var sel = 'min-h-[44px] rounded-full border border-ink/10 bg-white/70 px-4 pr-10 text-sm text-ink scheme-light motion-safe:transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris';
    UI.qs('#t-reviews').innerHTML = '<section id="reviews" data-section="reviews" class="' + C.sectionLight + '"><div class="' + C.container + '">' +
      UI.sectionHead({ eyebrow: '02 — Every review', title: 'Read by *treatment*', lead: 'Filter by the care received, the star rating or how recent the story is.', align: 'left', theme: 'light' }) +
      '<div class="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div id="t-chips" role="group" aria-label="Filter reviews by treatment" class="flex flex-wrap gap-2"></div>' +
      '<div class="flex flex-wrap items-center gap-3"><label for="t-rating" class="font-mono text-xs uppercase tracking-[0.15em] text-ink/70">Rating</label><select id="t-rating" name="rating" autocomplete="off" class="' + sel + '"><option class="bg-white text-ink" value="all">All ratings</option><option class="bg-white text-ink" value="5">5 stars</option><option class="bg-white text-ink" value="4plus">4 stars and above</option></select>' +
      '<label for="t-sort" class="font-mono text-xs uppercase tracking-[0.15em] text-ink/70">Sort</label><select id="t-sort" name="sort" autocomplete="off" class="' + sel + '"><option class="bg-white text-ink" value="newest">Newest</option><option class="bg-white text-ink" value="oldest">Oldest</option><option class="bg-white text-ink" value="highest">Highest rated</option></select></div></div>' +
      '<p id="t-count" role="status" aria-live="polite" class="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink/70"></p>' +
      '<div id="t-grid" data-component="TestimonialGrid" class="mt-6 columns-1 gap-6 md:columns-2 lg:columns-3"></div><div class="mt-10 text-center"><button type="button" id="t-more" class="' + C.btnOutline + '">Load more reviews</button></div></div></section>';
    var grid = UI.qs('#t-grid'), chips = UI.qs('#t-chips'), more = UI.qs('#t-more');
    UI.qs('#t-rating').value = st.rating; UI.qs('#t-sort').value = st.sort;
    function filtered() {
      return ALL.filter(function (t) {
        if (st.service && t.serviceSlug !== st.service) return false;
        return st.rating === 'all' || (st.rating === '5' ? t.rating === 5 : t.rating >= 4);
      }).sort(cmp[st.sort]);
    }
    function renderChips() {
      chips.innerHTML = [{ slug: '', name: 'All treatments' }].concat(SITE.servicesIndex.map(function (s) { return { slug: s.slug, name: s.name }; })).map(function (s) {
        var n = s.slug ? ALL.filter(function (t) { return t.serviceSlug === s.slug; }).length : total;
        return '<button type="button" data-service="' + esc(s.slug) + '" aria-pressed="' + (st.service === s.slug) + '" class="' + chip + '">' + esc(s.name) + ' <span class="font-mono text-xs opacity-70">' + n + '</span></button>';
      }).join('');
    }
    function render() {
      var list = filtered(), items = list.slice(0, st.shown);
      renderChips();
      grid.innerHTML = items.length ? items.map(function (t, i) {
        return '<div data-component="TestimonialItem" class="mb-6 break-inside-avoid"><div data-reveal="up" data-delay="' + ((i % 3) * 80) + '"><p class="mb-2 flex flex-wrap items-center gap-2 px-1"><span class="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-800">' + UI.icon('trending-up', 'h-3.5 w-3.5') + esc(t.outcome || t.serviceName) + '</span>' +
          (t.verified ? '<span class="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70">' + UI.icon('check-circle', 'h-3.5 w-3.5 text-iris') + 'Verified patient</span>' : '') + '</p>' +
          (t.title ? '<h3 class="mb-2 px-1 font-display text-xl font-light leading-snug">' + esc(t.title) + '</h3>' : '') + UI.testimonialCard(t, { theme: 'light' }) + '</div></div>';
      }).join('') : '<div class="' + C.glassLight + ' rounded-3xl p-10 text-center" data-component="NoResults"><h3 class="font-display text-2xl font-light">No reviews match these filters</h3><p class="mt-2 text-ink/70">Choose another treatment or rating to see more patient stories.</p><button type="button" data-action="reset" class="' + C.btnInk + ' mt-6">Clear filters</button></div>';
      UI.qs('#t-count').textContent = list.length ? 'Showing ' + items.length + ' of ' + list.length + (list.length === 1 ? ' review' : ' reviews') : 'No reviews found';
      more.hidden = items.length >= list.length;
      UI.setParams({ service: st.service, rating: st.rating === 'all' ? '' : st.rating, sort: st.sort === 'newest' ? '' : st.sort, shown: st.shown > PER ? st.shown : '' });
      UI.mount(grid);
    }
    chips.addEventListener('click', function (e) { var b = e.target.closest('[data-service]'); if (!b) return; st.service = b.getAttribute('data-service'); st.shown = PER; render(); });
    grid.addEventListener('click', function (e) { if (e.target.closest('[data-action="reset"]')) { st.service = ''; st.rating = 'all'; st.sort = 'newest'; UI.qs('#t-rating').value = 'all'; UI.qs('#t-sort').value = 'newest'; st.shown = PER; render(); } });
    UI.qs('#t-rating').addEventListener('change', function (e) { st.rating = e.target.value; st.shown = PER; render(); });
    UI.qs('#t-sort').addEventListener('change', function (e) { st.sort = cmp[e.target.value] ? e.target.value : 'newest'; render(); });
    more.addEventListener('click', function () { st.shown += PER; render(); });

    /* ---------- featured story (dark, tabs stepper) ---------- */
    var storyT = ALL.filter(function (t) { return t.story; })[0];
    if (storyT) {
      var steps = [['before', 'Before', 'The injury'], ['treatment', 'Treatment', 'The operation'], ['recovery', 'Recovery', 'The return']];
      UI.qs('#t-story').innerHTML = '<section id="story" data-section="story" class="' + C.sectionDark + ' relative overflow-hidden"><div class="' + C.container + ' grid items-center gap-12 lg:grid-cols-2" data-component="PatientStory">' +
        '<div data-reveal="left"><p class="font-mono text-xs uppercase tracking-[0.2em] text-white/70">03 — Featured story</p><h2 data-split class="mt-3 font-display text-4xl font-light leading-tight text-white sm:text-5xl">' + esc(storyT.name.split(' ')[0]) + '’s way back to the <em class="text-iris-300">crease</em></h2>' +
        '<p class="mt-4 text-white/70">' + esc(storyT.name) + ', ' + storyT.age + ' · ' + esc(storyT.area) + ' · ' + esc(storyT.serviceName) + '</p>' +
        '<div class="mt-8 overflow-hidden rounded-3xl border border-white/10"><div data-parallax="0.08">' + UI.img(SITE.img.theatre, 'Operating theatre at Port City Specialized Hospital, Chattogram', 'h-64 w-full object-cover', { w: 1200, h: 700 }) + '</div></div></div>' +
        '<div data-reveal="right" data-tabs data-url-param="story" class="' + C.glassDark + ' rounded-3xl p-6 sm:p-8"><div role="tablist" aria-label="Patient story steps" class="flex flex-wrap gap-2">' +
        steps.map(function (s, i) { return '<button type="button" role="tab" id="story-tab-' + s[0] + '" data-tab="' + s[0] + '" aria-controls="story-panel-' + s[0] + '" aria-selected="' + (i === 0) + '" class="min-h-[44px] rounded-full border border-white/15 px-5 font-mono text-xs uppercase tracking-[0.15em] text-white/80 motion-safe:transition-[transform,opacity] hover:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua aria-selected:border-iris aria-selected:bg-iris aria-selected:text-white">0' + (i + 1) + ' ' + s[1] + '</button>'; }).join('') + '</div>' +
        steps.map(function (s, i) { return '<div role="tabpanel" id="story-panel-' + s[0] + '" data-tab-panel="' + s[0] + '" aria-labelledby="story-tab-' + s[0] + '" tabindex="0"' + (i ? ' hidden' : '') + ' class="mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"><p class="font-mono text-xs uppercase tracking-[0.2em] text-aqua">0' + (i + 1) + ' — ' + s[2] + '</p><p class="mt-3 text-lg leading-8 text-white/80">' + esc(storyT.story[s[0]]) + '</p></div>'; }).join('') +
        '<a href="' + SITE.url.service(storyT.serviceSlug) + '" class="mt-6 inline-flex min-h-[44px] items-center gap-2 text-aqua hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua">Learn about ' + esc(storyT.serviceName) + ' ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div></div></section>';
    }

    /* ---------- share your experience (light, glass form) ---------- */
    var starBtns = [5, 4, 3, 2, 1].map(function (n) { return '<div class="relative"><input type="radio" name="rating" id="rate-' + n + '" value="' + n + '" class="peer sr-only"><label for="rate-' + n + '" data-star="' + n + '" class="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink/30 motion-safe:transition-[transform,opacity] peer-focus-visible:ring-2 peer-focus-visible:ring-iris data-[on=true]:text-gold" title="' + n + (n === 1 ? ' star' : ' stars') + '"><span class="sr-only">' + n + (n === 1 ? ' star' : ' stars') + '</span>' + UI.icon('star-fill', 'h-7 w-7') + '</label></div>'; }).join('');
    UI.qs('#t-share').innerHTML = '<section id="share" data-section="share" class="' + C.sectionLight + ' scroll-mt-24"><div class="' + C.container + ' grid gap-12 lg:grid-cols-12" data-component="ReviewForm"><div data-reveal="up" class="lg:col-span-5"><p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">04 — Your turn</p><h2 data-split class="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">Share your <em class="text-iris">experience</em></h2><p class="mt-4 max-w-md text-ink/70">Your words help other families decide with confidence. Every review is read by our team and moderated before publication. We never publish phone numbers.</p></div>' +
      '<div data-reveal="up" data-delay="120" class="lg:col-span-7"><div data-tilt data-tilt-max="3" class="' + C.glassLight + ' relative rounded-3xl p-6 sm:p-10"><div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity"></div>' +
      '<form id="review-form" novalidate class="space-y-5"><div class="grid gap-5 sm:grid-cols-2">' + UI.field({ label: 'Full name', name: 'name', type: 'text', required: true, autocomplete: 'name', theme: 'light' }) + UI.field({ label: 'Mobile number', name: 'phone', type: 'tel', validate: 'bd-phone', autocomplete: 'tel', hint: 'Optional. Used only to verify your visit.', theme: 'light' }) + '</div>' +
      UI.field({ label: 'Treatment received', name: 'serviceSlug', type: 'select', required: true, options: [{ value: '', label: 'Select a treatment' }].concat(SITE.servicesIndex.map(function (s) { return { value: s.slug, label: s.name }; })), theme: 'light' }) +
      '<fieldset class="space-y-2"><legend class="text-sm font-semibold text-ink">Your rating <span class="text-coral" aria-hidden="true">*</span></legend><div id="star-group" role="radiogroup" aria-label="Rating out of 5" class="flex flex-row-reverse justify-end">' + starBtns + '</div><p data-error-for="rating" role="alert" class="min-h-[1.25rem] text-sm text-coral"></p></fieldset>' +
      UI.field({ label: 'Review headline', name: 'title', type: 'text', required: true, minlength: 4, placeholder: 'For example: Walking pain-free again…', theme: 'light' }) +
      UI.field({ label: 'Your experience', name: 'message', type: 'textarea', required: true, rows: 5, minlength: 30, hint: 'At least 30 characters. Please do not include other people’s details.', theme: 'light' }) +
      UI.field({ label: 'Consent', name: 'consent', type: 'checkbox', required: true, labelHTML: 'I agree that my review may be published after moderation, showing my name and area.', theme: 'light' }) +
      '<button type="submit" data-magnetic class="' + C.btnPrimary + '">' + C.shine + 'Submit for review ' + UI.icon('send', 'h-4 w-4') + '</button></form>' +
      '<div id="review-thanks" hidden role="status" class="py-8 text-center">' + UI.icon('check-circle', 'mx-auto h-12 w-12 text-mint') + '<h3 class="mt-4 font-display text-3xl font-light">Thank you for sharing</h3><p class="mx-auto mt-2 max-w-md text-ink/70">Your review has been received. Our team moderates every submission, so it will appear after it has been checked.</p><button type="button" id="review-again" class="' + C.btnOutline + ' mt-6">Write another review</button></div></div></div></div></section>';
    var form = UI.qs('#review-form'), thanks = UI.qs('#review-thanks'), stars = UI.qsa('#star-group [data-star]');
    form.addEventListener('change', function (e) {
      if (e.target.name !== 'rating') return;
      var v = parseInt(e.target.value, 10);
      stars.forEach(function (l) { l.setAttribute('data-on', String(parseInt(l.getAttribute('data-star'), 10) <= v)); });
      UI.qs('[data-error-for="rating"]', form).textContent = '';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = UI.validateForm(form), r = form.querySelector('input[name="rating"]:checked');
      if (!r) { UI.qs('[data-error-for="rating"]', form).textContent = 'Please choose a star rating.'; ok = false; }
      if (!ok) return;
      var btn = form.querySelector('[type="submit"]'), f = form.elements;
      btn.disabled = true;
      SITE.submit('testimonial', { name: f.name.value.trim(), phone: f.phone.value.trim(), serviceSlug: f.serviceSlug.value, rating: parseInt(r.value, 10), title: f.title.value.trim(), message: f.message.value.trim(), consent: true }).then(function () {
        form.hidden = true; thanks.hidden = false; thanks.focus && thanks.setAttribute('tabindex', '-1'); thanks.focus();
        UI.toast('Thank you. Your review is awaiting moderation.', 'success');
      }, function () { UI.toast('We could not send your review. Please try again.', 'error'); }).then(function () { btn.disabled = false; });
    });
    UI.qs('#review-again').addEventListener('click', function () {
      form.reset(); stars.forEach(function (l) { l.setAttribute('data-on', 'false'); });
      thanks.hidden = true; form.hidden = false;
    });

    UI.qs('#t-cta').innerHTML = UI.ctaBand({ title: 'Your recovery story starts with a *conversation*', lead: 'Book a consultation at Chattogram or Dhaka and get a clear, honest plan for your joint, spine or sports injury.', primaryLabel: 'Book an appointment', primaryHref: SITE.url.appointment({}), secondaryLabel: 'Read health articles', secondaryHref: R('blog', 'blog.html') });
    render();
    UI.mount(UI.qs('#main'));
  });
})();
