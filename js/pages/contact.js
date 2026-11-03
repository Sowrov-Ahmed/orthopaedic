/* js/pages/contact.js · Owner Part 2 · Renders the Contact page (tiles, form, map tabs, reach, FAQ) · Depends on: SITE, UI, FX */
(function () {
  'use strict';
  UI.ready(function () {
    var esc = UI.esc, C = UI.cls, K = SITE.contact;
    var ph = K.phone || {};
    var phDisplay = ph.display || String(ph);
    var phE164 = ph.e164 || ('+' + String(phDisplay).replace(/\D/g, ''));
    var em = K.emergency || {};
    var chambers = SITE.chambersIndex;
    var glare = '<div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 motion-safe:transition-opacity"></div>';

    document.getElementById('page-hero').innerHTML = UI.pageHero({
      eyebrow: 'Contact',
      title: 'We are *here* when you need us',
      lead: 'Call, message or visit. The appointment desk answers Saturday to Thursday, 9:00 AM to 8:00 PM.'
    });

    var tileData = [
      { icon: 'phone', label: 'Appointment line', value: phDisplay, href: 'tel:' + phE164, note: 'Sat – Thu, 9 AM – 8 PM' },
      { icon: 'message-circle', label: 'WhatsApp', value: 'Message the desk', href: K.whatsappUrl, note: 'Share reports and photos', ext: true },
      { icon: 'mail', label: 'Email', value: K.email, href: 'mailto:' + K.email, note: 'Replies within one working day' },
      { icon: 'alert-circle', label: 'Emergency', value: em.display, href: 'tel:' + em.e164, note: 'Fractures and urgent injuries' }
    ];
    var tiles = '<section id="tiles" data-section="tiles" class="' + C.sectionDark + '"><div class="' + C.container + '"><div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">' +
      tileData.map(function (t, i) {
        return '<div data-reveal="up" data-delay="' + (i * 80) + '"><a data-tilt data-tilt-max="9" href="' + esc(t.href) + '"' + (t.ext ? ' target="_blank" rel="noopener"' : '') + ' class="relative block min-h-44 ' + C.glassDark + ' rounded-3xl p-6 motion-safe:transition-[transform,opacity] focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua">' + glare +
          '<span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-iris/30 text-white">' + UI.icon(t.icon, 'h-5 w-5') + '</span>' +
          '<p class="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-aqua">' + t.label + '</p>' +
          '<p class="mt-1 break-words font-display text-xl font-light text-white">' + esc(t.value) + '</p>' +
          '<p class="mt-1 text-sm text-white/70">' + t.note + '</p></a></div>';
      }).join('') + '</div></div></section>';

    var subjects = ['Appointment query', 'Surgery cost estimate', 'Report review / second opinion', 'Insurance & billing', 'Feedback', 'Other'];
    var form = '<form id="contact-form" data-component="ContactForm" novalidate class="space-y-4">' +
      UI.field({ label: 'Full name', name: 'fullName', type: 'text', required: true, autocomplete: 'name', theme: 'light' }) +
      '<div class="grid gap-4 sm:grid-cols-2">' +
      UI.field({ label: 'Mobile number', name: 'phone', type: 'tel', required: true, validate: 'bd-phone', autocomplete: 'tel', placeholder: 'e.g. 01711-223344…', theme: 'light' }) +
      UI.field({ label: 'Email', name: 'email', type: 'email', required: false, autocomplete: 'email', theme: 'light' }) + '</div>' +
      '<div class="grid gap-4 sm:grid-cols-2">' +
      UI.field({ label: 'Subject', name: 'subject', type: 'select', required: true, options: subjects.map(function (s) { return { value: s, label: s }; }), theme: 'light' }) +
      UI.field({ label: 'Preferred chamber', name: 'chamberSlug', type: 'select', required: true, options: chambers.map(function (c) { return { value: c.slug, label: c.chamberName || c.name }; }), theme: 'light' }) + '</div>' +
      UI.field({ label: 'Message', name: 'message', type: 'textarea', required: true, rows: 5, minlength: 20, hint: 'At least 20 characters. Please do not share card or password details.', theme: 'light' }) +
      UI.field({ name: 'consent', type: 'checkbox', required: true, labelHTML: 'I agree that the care team may contact me about this enquiry.', theme: 'light' }) +
      '<button type="submit" data-magnetic class="' + C.btnPrimary + ' w-full sm:w-auto">' + C.shine + 'Send message ' + UI.icon('send', 'h-4 w-4') + '</button></form>';
    var success = '<div id="contact-success" hidden role="status" aria-live="polite" class="scale-95 text-center opacity-0 motion-safe:transition-[transform,opacity] duration-700">' +
      '<span class="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-mint/20 text-mint motion-safe:animate-float3d">' + UI.icon('check-circle', 'h-8 w-8') + '</span>' +
      '<h3 class="mt-5 font-display text-3xl font-light">Message <em>received</em></h3>' +
      '<p class="mt-3 text-ink/70">Thank you. Our team will reply within one working day. Your reference is</p>' +
      '<p id="contact-ref" class="mt-2 font-mono text-lg tracking-widest text-iris"></p>' +
      '<button type="button" data-action="again" class="' + C.btnOutline + ' mt-6">Send another message</button></div>';
    var steps = [['We read it', 'A member of the care team reviews your message the same working day.'], ['We reply', 'You hear back by phone or WhatsApp within one working day, Saturday to Thursday.'], ['We guide you', 'We confirm a serial, advise which reports to bring, or arrange a callback with a nurse.']];
    var side = '<aside class="space-y-6"><div data-reveal="right" class="' + C.glassLight + ' rounded-3xl p-7">' + UI.eyebrow('Desk hours', 'light') +
      '<p class="mt-3 font-display text-3xl font-light">Saturday – Thursday</p><p class="text-ink/70">9:00 AM – 8:00 PM · Friday: Banani consultations only</p></div>' +
      '<div data-reveal="right" data-delay="100" class="' + C.glassLight + ' rounded-3xl p-7">' + UI.eyebrow('What happens next', 'light') +
      '<ol class="mt-4 space-y-4">' + steps.map(function (s, i) { return '<li class="flex gap-4"><span class="font-mono text-sm text-iris">0' + (i + 1) + '</span><div><h3 class="font-semibold">' + s[0] + '</h3><p class="text-sm text-ink/70">' + s[1] + '</p></div></li>'; }).join('') + '</ol></div></aside>';
    var formSec = '<section id="form" data-section="form" class="' + C.sectionLight + '"><div class="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-aqua/25 blur-3xl motion-safe:animate-aurora" data-parallax="0.1"></div>' +
      '<div class="' + C.container + ' relative"><div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"><div>' +
      UI.sectionHead({ eyebrow: '01 — Write to us', title: 'Send a *message*', align: 'left', theme: 'light' }) +
      '<div data-scroll-3d class="mt-8 ' + C.glassLight + ' rounded-3xl p-6 sm:p-8">' + form + success + '</div></div>' + side + '</div></div></section>';

    var tabBtn = 'inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm font-semibold text-white/80 motion-safe:transition-[transform,opacity] aria-selected:border-iris aria-selected:bg-iris aria-selected:text-white';
    var mapSec = '<section id="chambers" data-section="chambers" class="' + C.sectionDark + '"><div class="' + C.container + '">' +
      UI.sectionHead({ eyebrow: '02 — Chambers', title: 'Visit us in *Chattogram* or Dhaka', align: 'center', theme: 'dark' }) +
      '<div class="mt-12 grid gap-5 md:grid-cols-3">' + chambers.map(function (c, i) { return '<div data-reveal="up" data-delay="' + (i * 80) + '">' + UI.chamberCard(c, { theme: 'dark' }) + '</div>'; }).join('') + '</div>' +
      '<div data-tabs data-url-param="chamber" data-component="ChamberMap" class="mt-12"><div role="tablist" aria-label="Choose chamber map" class="mb-5 flex flex-wrap justify-center gap-2">' +
      chambers.map(function (c, i) { return '<button type="button" role="tab" data-tab="' + c.slug + '" aria-selected="' + (i === 0) + '" class="' + tabBtn + '">' + esc(c.area) + '</button>'; }).join('') + '</div>' +
      chambers.map(function (c, i) {
        return '<div role="tabpanel" data-tab-panel="' + c.slug + '"' + (i ? ' hidden' : '') + ' class="' + C.glassDark + ' overflow-hidden rounded-3xl"><iframe title="Map of ' + esc(c.chamberName || c.name) + '" src="https://www.google.com/maps?q=' + encodeURIComponent(c.address) + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="h-80 w-full border-0 sm:h-96"></iframe>' +
          '<div class="flex flex-wrap items-center justify-between gap-3 p-5"><p class="text-sm text-white/70">' + esc(c.address) + '</p>' +
          '<a href="https://www.google.com/maps/dir/?api=1&destination=' + c.lat + ',' + c.lng + '" target="_blank" rel="noopener" class="' + C.btnGlass + '">' + UI.icon('navigation', 'h-4 w-4') + ' Get directions</a></div></div>';
      }).join('') + '</div></div></section>';

    var reach = [
      ['car', 'By road', 'Chattogram chambers are on main roads, close to GEC Circle and Khulshi. From Dhaka, Banani Road 11 is a short drive from Kemal Ataturk Avenue and Gulshan Avenue.'],
      ['navigation', 'Rideshare and CNG', 'Share the chamber name and house number with your driver. For night visits in Chattogram, a CNG or ride-hailing app is usually quickest from Agrabad, Nasirabad and Halishahar.'],
      ['building', 'Parking and access', 'Street and building parking is limited at peak hours. Chambers have ramps or lifts for wheelchair users. Tell the desk if you need help on arrival.']
    ];
    var reachSec = '<section id="reach" data-section="reach" class="' + C.sectionLight + '"><div class="' + C.container + '">' +
      UI.sectionHead({ eyebrow: '03 — How to reach us', title: 'Getting here, *simply*', align: 'left', theme: 'light' }) +
      '<div class="mt-10 grid gap-6 md:grid-cols-3">' + reach.map(function (r, i) {
        return '<div data-reveal="up" data-delay="' + (i * 90) + '"><div data-tilt class="relative ' + C.glassLight + ' h-full rounded-3xl p-7">' + glare + '<span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-iris/15 text-iris">' + UI.icon(r[0], 'h-5 w-5') + '</span><h3 class="mt-4 font-display text-2xl font-light">' + r[1] + '</h3><p class="mt-2 text-sm text-ink/70">' + r[2] + '</p></div></div>';
      }).join('') + '</div></div></section>';

    var emerg = '<section id="emergency" data-section="emergency" class="' + C.sectionInk + '"><div class="' + C.container + '"><div data-reveal="zoom" class="flex flex-col items-start justify-between gap-5 rounded-3xl border border-coral/40 bg-coral/10 p-7 md:flex-row md:items-center">' +
      '<div><p class="font-mono text-xs uppercase tracking-[0.2em] text-coral">Emergency</p><h2 class="mt-2 font-display text-3xl font-light text-white">Accident, open fracture or <em>severe</em> injury?</h2><p class="mt-2 text-white/70">Call now, and go to the nearest emergency department without delay.</p></div>' +
      '<a href="tel:' + esc(em.e164) + '" class="' + C.btnPrimary + ' shrink-0">' + C.shine + UI.icon('phone', 'h-4 w-4') + ' ' + esc(em.display) + '</a></div></div></section>';

    var mini = [
      ['Is an appointment compulsory?', 'We strongly advise booking a serial so you are seen at a fixed time. Walk-ins are seen after booked patients when the schedule allows.'],
      ['Can I send my MRI before the visit?', 'Yes. Share clear photos of reports on WhatsApp, but please still bring the original films and printed reports to your consultation.'],
      ['How quickly will you reply?', 'The care team replies to messages within one working day, Saturday to Thursday. For urgent injuries, call the emergency number instead.']
    ];
    var miniSec = '<section id="mini-faq" data-section="mini-faq" class="' + C.sectionLight + '"><div class="' + C.container + ' max-w-3xl">' +
      UI.sectionHead({ eyebrow: '04 — Quick answers', title: 'Before you *write*', align: 'center', theme: 'light' }) +
      '<div data-accordion data-accordion-single class="mt-8 space-y-3">' + mini.map(function (m, i) { return UI.faqItem({ id: 'cq-' + (i + 1), question: esc(m[0]), answerHTML: '<p>' + esc(m[1]) + '</p>', open: i === 0, theme: 'light' }); }).join('') + '</div>' +
      '<p class="mt-6 text-center"><a href="' + (SITE.routes.faqs || 'faqs.html') + '" class="inline-flex min-h-11 items-center gap-2 font-semibold text-iris hover:underline">Read all FAQs ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></p></div></section>';

    var cta = UI.ctaBand({
      title: 'Prefer to *book* directly?',
      lead: 'Choose your chamber and time online. Your serial is confirmed by SMS or WhatsApp.',
      primaryLabel: 'Book Appointment', primaryHref: SITE.url.appointment({}),
      secondaryLabel: 'Meet the surgeon', secondaryHref: SITE.routes.about || 'about.html'
    });

    document.getElementById('contact-root').innerHTML = tiles + formSec + mapSec + reachSec + emerg + miniSec + cta;
    UI.mount(document.getElementById('main'));

    var f = document.getElementById('contact-form'), ok = document.getElementById('contact-success');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!UI.validateForm(f)) { UI.toast('Please check the highlighted fields.', 'error'); return; }
      var btn = f.querySelector('button[type="submit"]');
      var fd = new FormData(f);
      var payload = {
        fullName: String(fd.get('fullName') || '').trim(), phone: String(fd.get('phone') || '').trim(), email: String(fd.get('email') || '').trim(),
        subject: fd.get('subject'), chamberSlug: fd.get('chamberSlug'), message: String(fd.get('message') || '').trim(), consent: !!fd.get('consent')
      };
      btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending…';
      SITE.submit('contact', payload).then(function (res) {
        document.getElementById('contact-ref').textContent = res.id;
        f.hidden = true; ok.hidden = false;
        requestAnimationFrame(function () { ok.classList.remove('opacity-0', 'scale-95'); });
        UI.toast('Message sent successfully.', 'success');
        ok.focus && ok.setAttribute('tabindex', '-1');
        ok.focus();
      }).catch(function () {
        UI.toast('Could not send your message. Please call the appointment desk.', 'error');
      }).then(function () {
        btn.disabled = false; btn.removeAttribute('aria-busy'); btn.innerHTML = 'Send message ' + UI.icon('send', 'h-4 w-4');
      });
    });
    ok.addEventListener('click', function (e) {
      if (!e.target.closest('[data-action="again"]')) return;
      f.reset(); f.hidden = false; ok.hidden = true; ok.classList.add('opacity-0', 'scale-95');
    });
  });
})();
