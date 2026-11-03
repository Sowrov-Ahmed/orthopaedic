/* js/pages/service-details.js · Owner Part 3 · Single service guide driven by ?slug= · Depends on: SITE, UI, window.SERVICES (js/data/services.js) */
(function () {
  'use strict';
  UI.ready(function () {
    var E = UI.esc, C = UI.cls, O = SITE.img.objects, G = C.glassLight;
    var slug = UI.getParam('slug');
    var base = slug ? SITE.getService(slug) : null;
    var det = (window.SERVICES || []).filter(function (d) { return d.slug === slug; })[0] || {};
    var CAT = { surgical: 'Surgical', sports: 'Sports medicine', 'non-surgical': 'Non-surgical', children: 'Children' };
    var OBJ = { surgical: ['vertebra', 'bone'], sports: ['ball', 'ring'], 'non-surgical': ['capsule', 'ball'], children: ['ring', 'capsule'] };
    var phone = SITE.contact.phone;
    var telHref = 'tel:' + String((phone && phone.e164) || phone).replace(/[^\d+]/g, '');
    var phoneText = (phone && phone.display) || phone;
    var put = function (id, html) { var el = UI.qs('#' + id); if (el) { el.innerHTML = html; UI.mount(el); } return el; };
    var list = function (arr, ic, cl) { return '<ul class="mt-4 space-y-3">' + (arr || []).map(function (x) { return '<li class="flex gap-3 text-ink/70">' + UI.icon(ic, 'mt-0.5 h-5 w-5 shrink-0 ' + cl) + '<span>' + E(x) + '</span></li>'; }).join('') + '</ul>'; };
    var h3 = function (t) { return '<h3 class="font-display text-xl">' + E(t) + '</h3>'; };

    function setMeta(title, desc) {
      document.title = title + ' | Dr. Nabila Sultana Rahman – Orthopaedic Surgeon';
      [['meta[name="description"]', desc], ['meta[property="og:title"]', title], ['meta[property="og:description"]', desc]].forEach(function (m) {
        var el = document.querySelector(m[0]); if (el) el.setAttribute('content', m[1]);
      });
    }

    function renderNotFound() {
      setMeta('Service not found', 'That treatment could not be found. Browse every orthopaedic service offered by Dr. Nabila Rahman in Chattogram and Dhaka.');
      var links = SITE.servicesIndex.map(function (s) { return '<li><a href="' + SITE.url.service(s.slug) + '" class="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-white/80 motion-safe:transition-[transform,opacity] hover:border-aqua hover:text-white">' + E(s.name) + '</a></li>'; }).join('');
      put('detail-root', '<section id="not-found" data-section="not-found" class="' + C.sectionDark + ' pt-36"><div class="' + C.container + '" data-component="ServiceNotFound"><div data-reveal="zoom" class="mx-auto max-w-2xl rounded-[2rem] p-10 text-center ' + C.glassDark + '"><p class="font-mono text-xs uppercase tracking-[0.25em] text-aqua">Treatment not found</p><h1 class="mt-4 font-display text-4xl font-light leading-tight [&_em]:text-iris-300">' + UI.emph('We could not find *that* treatment') + '</h1><p class="mt-4 text-white/70">The link may be incomplete or the treatment may have moved. Choose one of the services below or return to the full list.</p><div class="mt-8 flex flex-wrap justify-center gap-3"><a href="services.html" class="' + C.btnPrimary + '">' + C.shine + 'View all services ' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="' + SITE.url.appointment({}) + '" class="' + C.btnGlass + '">Book a consultation</a></div><ul class="mt-8 flex flex-wrap justify-center gap-2">' + links + '</ul></div></div></section>');
    }

    if (!base) { renderNotFound(); return; }
    var svc = Object.assign({}, base, det);
    var book = SITE.url.appointment({ service: svc.slug });
    var price = UI.formatBDTRange(svc.priceFrom, svc.priceTo);
    var catLabel = CAT[svc.category] || svc.category;
    setMeta(svc.name, (svc.name + ': ' + svc.short + ' Guide price, recovery timeline and FAQs.').slice(0, 160));

    /* ---------- hero + 3D visual ---------- */
    var words = svc.name.split(' ');
    words[words.length - 1] = '*' + words[words.length - 1] + '*';
    var pair = OBJ[svc.category] || OBJ.surgical;
    put('page-hero', UI.pageHero({
      eyebrow: 'Treatment guide', title: words.join(' '), lead: svc.tagline || svc.short,
      actionsHTML: '<div class="flex w-full flex-wrap items-center gap-3">' + UI.badge(catLabel, 'dark') + '<span class="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 font-mono text-xs uppercase tracking-widest text-white/80">' + price + ' · ' + E(svc.priceUnit) + '</span></div>' +
        '<a href="' + book + '" data-magnetic class="' + C.btnPrimary + '">' + C.shine + 'Book this treatment ' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="' + telHref + '" class="' + C.btnGlass + '">' + UI.icon('phone', 'h-4 w-4') + ' Call ' + E(phoneText) + '</a>'
    }));
    put('visual-root', '<section id="service-visual" data-section="service-visual" class="relative overflow-hidden bg-ink pb-24" data-component="ServiceVisual"><div class="' + C.container + '"><div data-stage class="relative mx-auto max-w-4xl pt-4">' +
      '<div data-depth="30" class="pointer-events-none absolute -left-2 top-2 z-10 w-20 sm:-left-10 sm:w-28">' + UI.deco(O[pair[0]], 'w-full motion-safe:animate-float3d') + '</div>' +
      '<div data-tilt data-tilt-max="6" class="relative rounded-[2.5rem] p-3 ' + C.glassDark + '"><div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 motion-safe:transition-opacity"></div>' + UI.img(svc.image, svc.name + ' – treatment by Dr. Nabila Rahman', 'aspect-[16/9] w-full rounded-[2rem] object-cover', { w: 1200, h: 675, eager: true }) + '</div>' +
      '<div data-depth="55" class="pointer-events-none absolute -bottom-8 -right-2 z-10 w-24 sm:-right-8 sm:w-32">' + UI.deco(O[pair[1]], 'w-full motion-safe:animate-float3d') + '</div></div></div></section>');

    /* ---------- content sections ---------- */
    var p = det.procedure;
    function overview() {
      var facts = p ? [['clock', 'Procedure time', p.duration], ['activity', 'Anaesthesia', p.anaesthesia], ['building', 'Hospital stay', p.hospitalStay]] : [];
      return '<p class="mt-6 text-lg leading-relaxed text-ink/70">' + E((det.overview || [svc.short])[0]) + '</p>' + (det.overview && det.overview[1] ? '<p class="mt-4 leading-relaxed text-ink/70">' + E(det.overview[1]) + '</p>' : '') +
        (facts.length ? '<ul class="mt-8 grid gap-4 sm:grid-cols-3">' + facts.map(function (f, i) { return '<li data-reveal="up" data-delay="' + i * 80 + '"><div class="h-full rounded-2xl p-4 ' + G + '"><div class="flex items-center gap-2 text-ink/70">' + UI.icon(f[0], 'h-4 w-4') + '<span class="font-mono text-[11px] uppercase tracking-widest">' + f[1] + '</span></div><p class="mt-2 font-semibold">' + E(f[2]) + '</p></div></li>'; }).join('') + '</ul>' : '');
    }
    function symptoms() {
      return '<ul class="mt-8 grid gap-4 sm:grid-cols-2">' + det.symptoms.map(function (s, i) { return '<li data-reveal="up" data-delay="' + i * 60 + '"><div class="flex h-full items-start gap-3 rounded-2xl p-5 ' + G + '">' + UI.icon('activity', 'mt-0.5 h-5 w-5 shrink-0 text-iris') + '<span class="font-medium">' + E(s) + '</span></div></li>'; }).join('') + '</ul><p class="mt-6 text-sm text-ink/70">If symptoms are severe or sudden, do not wait for a chamber day. Call the emergency line on ' + E(SITE.contact.emergency.display) + '.</p>';
    }
    function who() {
      var col = function (t, arr, ic, cl) { return '<div class="h-full rounded-3xl p-6 ' + G + '">' + h3(t) + list(arr, ic, cl) + '</div>'; };
      return '<div class="mt-8 grid gap-6 md:grid-cols-2"><div data-reveal="left">' + col('Often a good fit', det.whoNeedsIt.ideal, 'check-circle', 'text-mint') + '</div><div data-reveal="right">' + col('May not be needed', det.whoNeedsIt.notIdeal, 'info', 'text-coral') + '</div></div>';
    }
    function procedure() {
      return '<ol class="relative mt-10 space-y-8 before:absolute before:left-5 before:top-2 before:h-full before:w-px before:bg-ink/15 md:before:left-1/2">' + p.steps.map(function (s, i) {
        var odd = i % 2 === 0;
        return '<li class="relative pl-14 md:w-1/2 ' + (odd ? 'md:pl-0 md:pr-12' : 'md:ml-auto md:pl-12') + '"><span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-xs text-white ' + (odd ? 'md:left-auto md:-right-5' : 'md:-left-5') + '">' + String(i + 1).padStart(2, '0') + '</span><div data-reveal="' + (odd ? 'left' : 'right') + '"><div class="rounded-3xl p-6 ' + G + '">' + h3(s.title) + '<p class="mt-2 text-ink/70">' + E(s.description) + '</p></div></div></li>';
      }).join('') + '</ol>';
    }
    function benefits() {
      return '<ul class="mt-8 grid gap-5 sm:grid-cols-2">' + det.benefits.map(function (b) { return '<li data-reveal="zoom"><div data-tilt data-tilt-max="8" class="relative h-full rounded-3xl p-6 ' + G + '"><div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 motion-safe:transition-opacity"></div>' + UI.icon('sparkles', 'h-6 w-6 text-iris') + '<div class="mt-4">' + h3(b.title) + '</div><p class="mt-2 text-ink/70">' + E(b.description) + '</p></div></li>'; }).join('') + '</ul>';
    }
    function risks() {
      return '<p class="mt-5 max-w-2xl text-ink/70">Every operation carries risk. These are the ones to know about, and how we keep them low.</p><div class="mt-6 space-y-4">' + det.risks.map(function (r) { return '<div data-reveal="up"><div class="flex gap-4 rounded-3xl p-6 ' + G + '">' + UI.icon('shield', 'h-6 w-6 shrink-0 text-iris') + '<div><h3 class="font-semibold">' + E(r.title) + '</h3><p class="mt-1 text-ink/70">' + E(r.description) + '</p></div></div></div>'; }).join('') + '</div><p class="mt-5 text-sm text-ink/70">Dr. Nabila goes through your own risks before you decide. Individual results vary.</p>';
    }
    function recovery() {
      var sc = ['[transform:rotateX(10deg)_scale(.9)]', '[transform:rotateX(7deg)_scale(.94)]', '[transform:rotateX(4deg)_scale(.98)]', '[transform:rotateX(0deg)_scale(1.02)]'];
      var wd = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full'];
      return '<ol class="mt-10 grid gap-6 [perspective:1400px] sm:grid-cols-2">' + det.recovery.map(function (r, i) {
        var last = i === det.recovery.length - 1;
        return '<li data-reveal="up" data-delay="' + i * 100 + '" class="' + (i % 2 ? 'sm:mt-10' : '') + '"><div class="h-full rounded-3xl p-6 motion-safe:transition-transform duration-500 hover:[transform:rotateX(0deg)_scale(1.04)] ' + sc[i % 4] + ' ' + (last ? 'bg-ink text-white' : G) + '"><p class="font-mono text-xs uppercase tracking-[0.2em] ' + (last ? 'text-aqua' : 'text-ink/70') + '">' + E(r.phase) + '</p><h3 class="mt-3 font-display text-xl">' + E(r.title) + '</h3><p class="mt-2 ' + (last ? 'text-white/70' : 'text-ink/70') + '">' + E(r.description) + '</p><div class="mt-5 h-1 rounded-full ' + (last ? 'bg-white/15' : 'bg-ink/10') + '"><div class="h-1 rounded-full bg-gradient-to-r from-iris to-aqua ' + wd[i % 4] + '"></div></div></div></li>';
      }).join('') + '</ol>';
    }
    function pricing() {
      var pr = det.pricing;
      var box = function (t, arr, ic, cl) { return '<div class="h-full rounded-3xl p-6 ' + G + '">' + h3(t) + list(arr, ic, cl) + '</div>'; };
      return '<div class="mt-8 rounded-3xl p-6 ' + G + '"><p class="font-display text-4xl font-light">' + price + '</p><p class="mt-1 font-mono text-xs uppercase tracking-widest text-ink/70">' + E(svc.priceUnit) + '</p><p class="mt-4 text-ink/70">' + E(pr.note) + '</p></div>' +
        '<div class="mt-6 grid gap-6 md:grid-cols-2"><div data-reveal="left">' + box('Usually included', pr.inclusions, 'check-circle', 'text-mint') + '</div><div data-reveal="right">' + box('Not included', pr.exclusions, 'info', 'text-ink/60') + '</div></div>' +
        '<ul class="mt-6 flex flex-wrap gap-2" aria-label="Payment options">' + pr.paymentOptions.map(function (x) { return '<li class="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm text-ink/70">' + UI.icon('credit-card', 'h-4 w-4') + E(x) + '</li>'; }).join('') + '</ul>';
    }
    function faqs() {
      return '<div class="mt-8 space-y-3" data-accordion data-accordion-single>' + det.faqs.map(function (f, i) { return UI.faqItem({ id: f.id, question: f.question, answerHTML: '<p>' + E(f.answer) + '</p>', open: i === 0, theme: 'light' }); }).join('') + '</div>';
    }
    function related() {
      var rel = (det.relatedSlugs || []).map(function (s) { return SITE.getService(s); }).filter(Boolean);
      var posts = (det.relatedBlogSlugs || []).map(function (s) { return SITE.getPost(s); }).filter(Boolean);
      var all = SITE.servicesIndex, i = all.findIndex(function (s) { return s.slug === svc.slug; });
      var nb = function (s, dir) { return '<a href="' + SITE.url.service(s.slug) + '" class="group flex min-h-11 items-center gap-4 rounded-3xl p-5 motion-safe:transition-[transform,opacity] hover:-translate-y-0.5 ' + G + (dir === 'next' ? ' sm:flex-row-reverse sm:text-right' : '') + '">' + UI.icon(dir === 'next' ? 'arrow-right' : 'arrow-left', 'h-5 w-5 shrink-0 text-iris') + '<span><span class="block font-mono text-[11px] uppercase tracking-widest text-ink/70">' + (dir === 'next' ? 'Next treatment' : 'Previous treatment') + '</span><span class="block font-semibold">' + E(s.name) + '</span></span></a>'; };
      return (rel.length ? '<div class="mt-8 grid gap-6 sm:grid-cols-2">' + rel.map(function (r) { return '<div data-reveal="up">' + UI.serviceCard(r, { theme: 'light' }) + '</div>'; }).join('') + '</div>' : '') +
        (posts.length ? '<h3 class="mt-12 font-display text-2xl font-light">Read more</h3><div class="mt-6 grid gap-6 sm:grid-cols-2">' + posts.map(function (b) { return '<div data-reveal="up">' + UI.postCard(b, { theme: 'light' }) + '</div>'; }).join('') + '</div>' : '') +
        '<nav aria-label="Other treatments" class="mt-12 grid gap-4 sm:grid-cols-2">' + nb(all[(i - 1 + all.length) % all.length], 'prev') + nb(all[(i + 1) % all.length], 'next') + '</nav>';
    }
    var defs = [
      ['overview', 'Overview', 'Understanding *your* condition', det.overview ? overview : null, 'ServiceOverview'],
      ['symptoms', 'Symptoms', 'Signs you may *need* this', det.symptoms ? symptoms : null, 'ServiceSymptoms'],
      ['who-needs-it', 'Who needs it', 'Is it *right* for you?', det.whoNeedsIt ? who : null, 'ServiceCandidacy'],
      ['procedure', 'Procedure', 'The procedure, *step* by step', p ? procedure : null, 'ServiceProcedure'],
      ['benefits', 'Benefits', 'What you can *expect* to gain', det.benefits ? benefits : null, 'ServiceBenefits'],
      ['risks', 'Risks', 'Risks, *honestly* explained', det.risks ? risks : null, 'ServiceRisks'],
      ['recovery', 'Recovery', 'The road to *recovery*', det.recovery ? recovery : null, 'ServiceRecovery'],
      ['pricing', 'Pricing', 'Cost, and what it *covers*', det.pricing ? pricing : null, 'ServicePricing'],
      ['faqs', 'FAQs', 'Questions patients *ask*', det.faqs ? faqs : null, 'ServiceFaqs'],
      ['related', 'Related', 'Keep *exploring*', related, 'ServiceRelated']
    ].filter(function (d) { return d[3]; });
    var nav = defs.map(function (d) { return '<li><a href="#' + d[0] + '" data-spy-link class="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold text-ink/70 motion-safe:transition-[transform,opacity] hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-iris aria-[current=true]:bg-iris aria-[current=true]:text-white">' + d[1] + '</a></li>'; }).join('');
    var body = defs.map(function (d, i) {
      return '<section id="' + d[0] + '" data-section="' + d[0] + '" data-spy aria-labelledby="' + d[0] + '-title" data-component="' + d[4] + '" class="scroll-mt-32 border-t border-ink/10 py-12 first:border-0 first:pt-0"><p class="font-mono text-xs uppercase tracking-[0.25em] text-ink/70">' + String(i + 1).padStart(2, '0') + ' —</p><h2 id="' + d[0] + '-title" class="mt-3 font-display text-3xl font-light leading-tight sm:text-4xl [&_em]:text-iris">' + UI.emph(d[2]) + '</h2>' + d[3]() + '</section>';
    }).join('');

    /* ---------- booking card + mobile bar ---------- */
    var fees = SITE.chambersIndex.map(function (c) { return '<li class="flex items-start justify-between gap-3 border-t border-ink/10 py-3 first:border-0"><span><span class="block text-sm font-semibold">' + E(c.chamberName) + '</span><span class="block text-xs text-ink/70">' + E(c.city) + '</span></span><span class="text-right font-mono text-xs leading-5 text-ink/70">' + UI.formatBDT(c.fee.firstVisit) + ' first<br>' + UI.formatBDT(c.fee.followUp) + ' follow-up</span></li>'; }).join('');
    var desk = typeof SITE.contact.deskHours === 'string' ? '<p class="mt-4 text-xs text-ink/70">Appointment desk: ' + E(SITE.contact.deskHours) + '</p>' : '';
    var aside = '<aside aria-label="Book this treatment" class="hidden lg:sticky lg:top-28 lg:block lg:self-start" data-component="BookingCard"><div class="rounded-[2rem] p-6 shadow-xl ' + G + '"><p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Guide price</p><p class="mt-2 font-display text-3xl font-light leading-tight">' + price + '</p><p class="font-mono text-xs uppercase tracking-widest text-ink/70">' + E(svc.priceUnit) + '</p><h2 class="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">Consultation fees</h2><ul class="mt-2">' + fees + '</ul>' +
      '<a href="' + book + '" data-magnetic class="mt-5 w-full justify-center ' + C.btnPrimary + '">' + C.shine + 'Book this treatment</a><a href="' + telHref + '" class="mt-3 w-full justify-center ' + C.btnOutline + '">' + UI.icon('phone', 'h-4 w-4') + ' ' + E(phoneText) + '</a><a href="' + SITE.contact.whatsappUrl + '" target="_blank" rel="noopener" class="mt-3 w-full justify-center ' + C.btnOutline + '">' + UI.icon('message-circle', 'h-4 w-4') + ' WhatsApp us</a>' + desk + '</div></aside>';
    var bar = '<div data-component="MobileBookingBar" class="fixed bottom-4 left-4 right-24 z-40 flex gap-2 rounded-full p-2 lg:hidden ' + C.glassDark + '"><a href="' + book + '" class="flex-1 justify-center ' + C.btnPrimary + '">Book now</a><a href="' + telHref + '" aria-label="Call the appointment desk" class="' + C.btnGlass + '">' + UI.icon('phone', 'h-4 w-4') + '</a></div>';

    put('detail-root', '<section id="service-body" data-section="service-body" class="' + C.sectionLight + '"><div class="' + C.container + ' relative pb-20 lg:pb-0"><div data-parallax="0.1" aria-hidden="true" class="pointer-events-none absolute right-0 top-40 hidden h-80 w-80 rounded-full bg-iris/15 blur-3xl motion-safe:animate-aurora lg:block"></div>' +
      '<div class="relative lg:grid lg:grid-cols-[190px_minmax(0,1fr)_320px] lg:gap-10"><nav id="detail-nav" aria-label="On this page" class="sticky top-20 z-30 mb-8 overflow-x-auto bg-pearl/80 py-2 backdrop-blur-xl [scrollbar-width:none] lg:top-28 lg:mb-0 lg:self-start lg:overflow-visible lg:bg-transparent lg:backdrop-blur-none"><ul class="flex gap-2 lg:flex-col lg:gap-1">' + nav + '</ul></nav>' +
      '<article class="min-w-0">' + body + '</article>' + aside + '</div></div></section>' + bar);

    put('cta-root', UI.ctaBand({ title: 'Ready to discuss ' + svc.name + '?', lead: 'Book a consultation and Dr. Nabila will examine you, review your scans and explain every option, including those that avoid surgery.', primaryLabel: 'Book this treatment', primaryHref: book, secondaryLabel: 'Call the appointment desk', secondaryHref: telHref }));

    /* ---------- scroll-spy ---------- */
    var navEl = UI.qs('#detail-nav'), links = UI.qsa('[data-spy-link]', navEl);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + e.target.id;
            if (on) { a.setAttribute('aria-current', 'true'); if (navEl.scrollWidth > navEl.clientWidth) navEl.scrollLeft = a.offsetLeft - navEl.clientWidth / 2 + a.offsetWidth / 2; }
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      UI.qsa('[data-spy]').forEach(function (s) { io.observe(s); });
    }
  });
})();
