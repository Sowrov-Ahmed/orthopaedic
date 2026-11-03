/* js/pages/faqs.js · Owner Part 2 · Renders the FAQs page (search, category tabs, accordion, JSON-LD) · Depends on: SITE, UI, FX, window.FAQS */
(function () {
  'use strict';
  UI.ready(function () {
    var D = window.FAQS, esc = UI.esc;
    var cats = D.categories, items = D.items;
    var ph = SITE.contact.phone || {};
    var phoneDisplay = ph.display || String(ph);
    var phoneE164 = ph.e164 || ('+' + String(phoneDisplay).replace(/\D/g, ''));
    var catById = {};
    cats.forEach(function (c) { catById[c.id] = c; });

    document.getElementById('page-hero').innerHTML = UI.pageHero({
      eyebrow: 'FAQs',
      title: 'Straight answers, *before* you ask',
      lead: 'Fees, serials, surgery preparation and recovery explained plainly, for patients and families across Chattogram and Dhaka.'
    });

    function helpful(id) {
      return '<div class="mt-4 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-3 text-xs text-ink/70">' +
        '<span class="font-mono uppercase tracking-widest">Was this helpful?</span>' +
        ['yes', 'no'].map(function (v) {
          return '<button type="button" data-action="helpful" data-id="' + id + '" data-value="' + v + '" aria-label="' + (v === 'yes' ? 'Yes, this was helpful' : 'No, this was not helpful') + '" class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10 bg-white/60 px-3 text-base motion-safe:transition-[transform,opacity] hover:bg-iris/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-iris">' + (v === 'yes' ? '👍' : '👎') + '</button>';
        }).join('') + '</div>';
    }
    function row(it, prefix) {
      return '<div data-faq-row data-text="' + esc((it.question + ' ' + it.answer).toLowerCase()) + '" class="mb-3">' +
        UI.faqItem({ id: prefix + it.id, question: esc(it.question), answerHTML: '<p>' + esc(it.answer) + '</p>' + helpful(it.id), open: false, theme: 'light' }) + '</div>';
    }
    function panel(id, list, prefix, hidden) {
      return '<div role="tabpanel" data-tab-panel="' + id + '"' + (hidden ? ' hidden' : '') + ' class="focus:outline-none"><div data-accordion data-accordion-single>' +
        list.map(function (it) { return row(it, prefix); }).join('') + '</div></div>';
    }
    function renderTabs() {
      var pill = 'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 text-sm font-semibold text-ink/80 motion-safe:transition-[transform,opacity] hover:border-iris/40 aria-selected:border-iris aria-selected:bg-iris aria-selected:text-white';
      var btns = [{ slug: 'all', name: 'All', icon: 'layers' }].concat(cats).map(function (c, i) {
        return '<button type="button" role="tab" data-tab="' + c.slug + '" aria-selected="' + (i === 0) + '" class="' + pill + '">' + UI.icon(c.icon, 'h-4 w-4') + esc(c.name) + '</button>';
      }).join('');
      var panels = panel('all', items, 'all-', false) + cats.map(function (c) {
        return panel(c.slug, items.filter(function (i) { return i.categoryId === c.id; }), '', true);
      }).join('');
      return '<div data-component="FaqTabs" data-tabs data-url-param="faq"><div role="tablist" aria-label="FAQ categories" class="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">' + btns + '</div>' + panels + '</div>';
    }
    function renderAside() {
      return '<aside data-component="FaqHelpCard" class="lg:sticky lg:top-28"><div data-tilt data-tilt-max="6" class="relative ' + UI.cls.glassLight + ' rounded-3xl p-7">' +
        '<div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 motion-safe:transition-opacity"></div>' +
        UI.eyebrow('Still have a question?', 'light') +
        '<h2 class="mt-3 font-display text-3xl font-light leading-tight">Talk to the <em>care team</em></h2>' +
        '<p class="mt-3 text-sm text-ink/70">Our appointment desk replies Saturday to Thursday, 9:00 AM to 8:00 PM.</p>' +
        '<div class="mt-6 flex flex-col gap-3">' +
        '<a href="tel:' + esc(phoneE164) + '" class="' + UI.cls.btnInk + '">' + UI.icon('phone', 'h-4 w-4') + ' ' + esc(phoneDisplay) + '</a>' +
        '<a href="' + esc(SITE.contact.whatsappUrl) + '" target="_blank" rel="noopener" class="' + UI.cls.btnOutline + '">' + UI.icon('message-circle', 'h-4 w-4') + ' WhatsApp us</a>' +
        '<a href="' + SITE.routes.contact + '" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-iris hover:underline">Send a message ' + UI.icon('arrow-right', 'h-4 w-4') + '</a>' +
        '</div></div></aside>';
    }

    var root = document.getElementById('faq-root');
    root.innerHTML = '<section id="faq-list" data-section="faq-list" class="' + UI.cls.sectionLight + '">' +
      '<div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-iris/20 blur-3xl motion-safe:animate-aurora" data-parallax="0.1"></div>' +
      '<div class="' + UI.cls.container + ' relative"><div class="grid gap-10 lg:grid-cols-[1fr_340px]"><div>' +
      '<div data-reveal="up" class="relative mb-6"><label for="faq-search" class="sr-only">Search questions</label>' +
      '<span class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink/70">' + UI.icon('search', 'h-5 w-5') + '</span>' +
      '<input id="faq-search" name="search" type="search" autocomplete="off" placeholder="Search fees, recovery, knee, spine…" class="' + UI.cls.glassLight + ' min-h-12 w-full rounded-full py-3 pl-12 pr-5 text-base text-ink placeholder:text-ink/60 motion-safe:transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"></div>' +
      renderTabs() +
      '<div id="faq-empty" hidden class="' + UI.cls.glassLight + ' rounded-3xl p-8 text-center" role="status"><p class="font-display text-2xl font-light">No questions match <em>your search</em></p><p class="mt-2 text-sm text-ink/70">Try a simpler word, or ask our care team directly.</p></div>' +
      '</div>' + renderAside() + '</div></div></section>';
    document.getElementById('faq-cta').innerHTML = UI.ctaBand({
      title: 'Ready to *plan* your visit?',
      lead: 'Choose a chamber and a time that suits you. Your serial is confirmed on WhatsApp or SMS.',
      primaryLabel: 'Book Appointment', primaryHref: SITE.url.appointment({}),
      secondaryLabel: 'Contact us', secondaryHref: SITE.routes.contact
    });
    UI.mount(document.getElementById('main'));

    var tabs = root.querySelector('[data-tabs]'), input = document.getElementById('faq-search'), empty = document.getElementById('faq-empty');
    input.value = UI.getParam('q') || '';
    var rows = UI.qsa('[data-faq-row]', root);
    function refresh() {
      var q = input.value.trim().toLowerCase();
      rows.forEach(function (r) { r.hidden = !!q && r.getAttribute('data-text').indexOf(q) === -1; });
      var active = UI.qsa('[data-tab-panel]', root).filter(function (p) { return !p.hidden; })[0];
      var n = active ? UI.qsa('[data-faq-row]', active).filter(function (r) { return !r.hidden; }).length : 0;
      empty.hidden = n > 0;
    }
    function syncSearch() { UI.setParams({ q: input.value.trim() }); }
    input.addEventListener('input', UI.debounce(function () {
      if (input.value.trim() && tabs.showTab) tabs.showTab('all');
      refresh();
      syncSearch();
    }, 150));
    tabs.addEventListener('tabchange', function () { setTimeout(refresh, 0); });
    function fromHash() {
      var h = decodeURIComponent(location.hash.replace('#', ''));
      if (h && tabs.showTab && cats.some(function (c) { return c.slug === h; })) tabs.showTab(h);
    }
    fromHash();
    if (input.value.trim() && tabs.showTab) tabs.showTab('all');
    refresh();
    syncSearch();
    window.addEventListener('hashchange', fromHash);
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-action="helpful"]');
      if (!b) return;
      var group = b.parentElement;
      UI.qsa('button', group).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      UI.toast(b.getAttribute('data-value') === 'yes' ? 'Thank you, glad it helped.' : 'Thanks for telling us. Please contact the care team for more help.', b.getAttribute('data-value') === 'yes' ? 'success' : 'info');
    });

    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: items.map(function (i) { return { '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } }; })
    });
    document.head.appendChild(ld);
  });
})();
