/* js/pages/home.js · Owner Part 1 · Renders every Home section, bindings for filter/booking/open-now · Depends on: SITE, UI, FX (kit) */
(function () {
  'use strict';
  var E = UI.esc;
  var SPOT = 'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 motion-safe:before:transition-opacity before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.2),transparent_45%)]';
  var R = { about: 'about.html', services: 'services.html', blog: 'blog.html', testimonials: 'testimonials.html', faqs: 'faqs.html' };
  var CATS = [['all', 'All'], ['surgical', 'Surgical'], ['sports', 'Sports'], ['children', 'Children'], ['non-surgical', 'Non-surgical']];

  function phone() { var p = SITE.contact.phone; var d = (p && p.display) || p; return { d: d, t: (p && p.e164) || String(d).replace(/[^+\d]/g, '') }; }
  function num(n) { return Number(n).toLocaleString('en-US'); }
  function isoToday() { var n = new Date(); return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0'); }
  function sec(id, tone, inner, extra) {
    var c = tone === 'dark' ? UI.cls.sectionDark : tone === 'ink' ? UI.cls.sectionInk : UI.cls.sectionLight;
    return '<section id="' + id + '" data-section="' + id + '" class="' + c + ' relative overflow-hidden ' + (extra || '') + '"><div class="' + UI.cls.container + ' relative">' + inner + '</div></section>';
  }
  function blob(pos, col, speed) { return '<div aria-hidden="true" data-parallax="' + speed + '" class="pointer-events-none absolute ' + pos + ' h-96 w-96 rounded-full ' + col + ' blur-3xl motion-safe:animate-aurora"></div>'; }

  function renderHero() {
    var d = SITE.doctor, p = phone(), o = SITE.img.objects;
    var bm = /BMDC/.test(d.bmdcNo) ? d.bmdcNo : 'BMDC ' + d.bmdcNo;
    var trust = [bm, 'FCPS Orthopaedics', d.experienceYears + '+ years', d.satisfactionPercent + '% patient satisfaction'];
    var card = function (cls, depth, big, small) { return '<div data-depth="' + depth + '" class="absolute ' + cls + '"><div class="' + UI.cls.glassDark + ' rounded-2xl px-4 py-3 motion-safe:animate-float3d"><p class="font-display text-3xl text-white">' + big + '</p><p class="font-mono text-[11px] uppercase tracking-widest text-white/70">' + small + '</p></div></div>'; };
    var obj = function (cls, depth, src) { return '<div data-depth="' + depth + '" class="absolute ' + cls + '"><div class="motion-safe:animate-float3d">' + UI.deco(src, 'w-full') + '</div></div>'; };
    return sec('hero', 'dark',
      blob('-left-40 top-10', 'bg-iris/40', '0.12') + blob('right-0 bottom-0', 'bg-aqua/25', '0.08') +
      '<div data-stage class="relative grid items-center gap-16 lg:grid-cols-12">' +
      '<div class="lg:col-span-7" data-component="HeroCopy">' + UI.eyebrow(E(d.title), 'dark') +
      '<h1 data-split class="mt-6 font-display text-6xl font-light leading-[0.95] tracking-tight text-white sm:text-7xl xl:text-8xl [&_em]:text-iris-300">' + UI.emph('Move freely. *Live fully.*') + '</h1>' +
      '<p class="mt-8 max-w-xl text-lg leading-relaxed text-white/70">Arthroscopy-first orthopaedic care for knees, shoulders, hips and spines in Chattogram and Dhaka. Planned with you, priced openly, and rehabilitated until you are back to the life you love.</p>' +
      '<div class="mt-10 flex flex-wrap gap-4"><a href="' + SITE.url.appointment({}) + '" data-magnetic class="' + UI.cls.btnPrimary + '">' + UI.cls.shine + 'Book appointment ' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="tel:' + E(p.t) + '" class="' + UI.cls.btnGlass + '">' + UI.icon('phone', 'h-4 w-4') + ' Call ' + E(p.d) + '</a></div>' +
      '<ul class="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest text-white/70">' + trust.map(function (t) { return '<li>' + E(t) + '</li>'; }).join('') + '</ul>' +
      '<a href="#marquee-stats" class="mt-14 inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/70"><span class="relative h-10 w-6 rounded-full border border-white/30"><span class="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-white motion-safe:animate-bounce"></span></span>Scroll</a></div>' +
      '<div class="relative mx-auto w-full max-w-sm lg:col-span-5" data-component="HeroPortrait">' +
      '<div data-depth="25"><div data-tilt data-tilt-max="10" class="' + UI.cls.glassDark + ' relative rounded-t-[999px] rounded-b-[2rem] p-2"><div class="overflow-hidden rounded-t-[999px] rounded-b-[1.6rem]">' + UI.img(SITE.img.portrait, d.name + ', ' + d.specialty, 'aspect-[4/5] w-full bg-aurora-dark object-cover', { w: 800, h: 1000, eager: true }) + '</div><div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-t-[999px] opacity-0 motion-safe:transition-opacity"></div></div></div>' +
      obj('-left-12 top-16 w-24', 70, o.bone) + obj('-right-8 -top-4 w-20', 60, o.ring) + obj('-bottom-6 right-4 w-24', 80, o.ball) +
      card('-right-6 top-1/3', 45, d.experienceYears + '+', 'Years') + card('-left-8 bottom-28', 55, num(d.surgeriesPerformed) + '+', 'Surgeries') + card('left-1/3 -bottom-8', 35, d.satisfactionPercent + '%', 'Satisfied') +
      '</div></div>', 'pt-40 pb-24');
  }

  function renderStats() {
    var d = SITE.doctor, T = function (v, s, l, i) { return UI.statTile({ value: v, suffix: s, label: l, theme: 'dark', delay: i * 100 }); };
    var items = ['Arthroscopy', 'ACL reconstruction', 'Knee replacement', 'Hip preservation', 'Rotator cuff repair', 'Spine & disc care', 'Fracture fixation', 'Sports rehabilitation', 'Paediatric orthopaedics'];
    return sec('marquee-stats', 'ink', UI.marqueeHTML(items, { theme: 'dark' }) +
      '<div data-component="StatTiles" class="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">' + T(d.experienceYears, '+', 'Years of practice', 0) + T(d.surgeriesPerformed, '+', 'Surgeries performed', 1) + T(d.patientsTreated, '+', 'Patients treated', 2) + T(d.satisfactionPercent, '%', 'Patient satisfaction', 3) + '</div>', 'py-16');
  }

  function renderAbout() {
    var d = SITE.doctor;
    return sec('about', 'light',
      '<div class="grid items-center gap-16 lg:grid-cols-2" data-component="AboutIntro">' +
      '<div class="relative mx-auto w-full max-w-lg pb-24 pr-12"><div data-parallax="0.05">' + UI.img(SITE.img.portrait, 'Portrait of ' + d.name, 'aspect-[4/5] w-full rounded-3xl bg-aurora-dark object-cover shadow-2xl', { w: 800, h: 1000 }) + '</div>' +
      '<div data-parallax="0.16" class="absolute bottom-0 right-0 w-3/5"><div class="overflow-hidden rounded-3xl border-4 border-pearl shadow-2xl">' + UI.img(SITE.img.theatre, 'Operating theatre where Dr. Nabila Rahman performs arthroscopic surgery', 'aspect-[4/3] w-full object-cover', { w: 900, h: 675 }) + '</div></div></div>' +
      '<div data-reveal="up"><p class="font-mono text-xs uppercase tracking-[0.3em] text-iris">01 — About the surgeon</p>' +
      '<h2 class="mt-5 font-display text-5xl font-light leading-[1.02] tracking-tight [&_em]:text-iris">' + UI.emph('A surgeon who explains, then *operates only when it helps*') + '</h2>' +
      '<p class="mt-6 max-w-xl leading-relaxed text-ink/70">' + E(d.name) + ' is an Associate Professor and Consultant in the Department of Orthopaedic Surgery, trained in Chattogram, Dhaka and Kuala Lumpur. Her practice centres on keyhole surgery and structured rehabilitation for joints and sports injuries.</p>' +
      '<p class="mt-4 max-w-xl leading-relaxed text-ink/70">Every plan begins with a clear diagnosis and an honest conversation about non-surgical options, costs and recovery time, so decisions stay yours.</p>' +
      '<ul class="mt-8 grid gap-3 text-sm text-ink/80">' + d.degrees.map(function (g) { return '<li class="flex gap-3">' + UI.icon('award', 'mt-0.5 h-4 w-4 shrink-0 text-iris') + '<span>' + E(g) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="mt-10 flex flex-wrap gap-4"><a href="' + R.about + '" class="' + UI.cls.btnInk + '">Read full profile</a><a href="' + SITE.url.appointment({}) + '" class="' + UI.cls.btnOutline + '">Book appointment</a></div></div></div>');
  }

  function serviceCards(cat) {
    return SITE.servicesIndex.filter(function (s) { return cat === 'all' || s.category === cat; }).map(function (s) { return UI.serviceCard(s, { theme: 'dark' }); }).join('');
  }
  function renderServices() {
    return sec('services', 'dark',
      blob('-right-40 top-0', 'bg-iris/30', '0.1') +
      UI.sectionHead({ eyebrow: '02 — Treatments', title: 'Care for every *joint, age and goal*', lead: 'Eight focused programmes, each with transparent price ranges before you commit.', align: 'left', theme: 'dark' }) +
      '<div role="group" aria-label="Filter treatments by category" class="mt-10 flex flex-wrap gap-2" data-component="ServiceFilter">' + CATS.map(function (c, i) {
        return '<button type="button" data-action="filter" data-cat="' + c[0] + '" aria-pressed="' + (i === 0) + '" class="min-h-11 rounded-full border border-white/20 px-5 text-sm text-white/80 motion-safe:transition-[transform,opacity] aria-pressed:border-iris aria-pressed:bg-iris aria-pressed:text-white hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">' + c[1] + '</button>';
      }).join('') + '</div>' +
      '<div id="service-grid" data-component="ServiceGrid" class="mt-10 grid gap-6 motion-safe:transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-4">' + serviceCards('all') + '</div>' +
      '<div class="mt-12"><a href="' + R.services + '" class="' + UI.cls.btnGlass + '">View all treatments ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div>');
  }

  function renderJourney() {
    var steps = [['01', 'Consult', 'Tell your story in an unhurried visit. We review your history, goals and any earlier scans or reports.'], ['02', 'Diagnose', 'Examination plus X-ray, MRI or ultrasound where needed, explained on screen so you see what we see.'], ['03', 'Treat', 'Physiotherapy and injections first where they work; keyhole or open surgery only when it is the better path.'], ['04', 'Rehabilitate', 'A named physiotherapist, a written week-by-week plan and WhatsApp check-ins until you move freely.']];
    var face = 'absolute inset-0 ' + UI.cls.noBackface + ' flex flex-col justify-between rounded-3xl p-8';
    return sec('journey', 'light',
      UI.sectionHead({ eyebrow: '03 — The journey', title: 'Your road to *recovery*', lead: 'Four clear stages. Hover or focus a card to see what happens at each one.', align: 'left', theme: 'light' }) +
      '<div data-scroll-3d data-component="JourneyCards" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' + steps.map(function (s) {
        return '<div tabindex="0" role="group" aria-label="Step ' + s[0] + ': ' + s[1] + '" class="group ' + UI.cls.stage + ' h-72 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris"><div class="' + UI.cls.preserve3d + ' relative h-full w-full motion-safe:transition-transform duration-700 group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">' +
          '<div class="' + face + ' ' + UI.cls.glassLight + '"><span class="font-mono text-6xl text-iris">' + s[0] + '</span><h3 class="font-display text-3xl font-light">' + s[1] + '</h3></div>' +
          '<div class="' + face + ' bg-ink text-white [transform:rotateY(180deg)]"><span class="font-mono text-xs uppercase tracking-widest text-aqua">' + s[0] + ' · ' + s[1] + '</span><p class="leading-relaxed text-white/80">' + s[2] + '</p></div></div></div>';
      }).join('') + '</div>');
  }

  function renderWhy() {
    var t = [['lg:col-span-2 lg:row-span-2', 'bone', 'Arthroscopy first', 'Small incisions, less pain and faster walking. Open surgery is chosen only when keyhole cannot do the job well.'], ['', 'credit-card', 'Transparent ৳ pricing', 'Every treatment lists its price range up front. Pay by cash, card, bKash or Nagad.'], ['', 'calendar', 'Same-week visits', 'Most new patients are seen within the week, with urgent injuries prioritised.'], ['lg:col-span-2', 'users', 'In-house rehab team', 'Physiotherapists who work from your surgeon’s protocol, so recovery never drifts off plan.'], ['lg:col-span-2', 'map-pin', 'Two cities, one standard', 'Consult in Chattogram or Dhaka, with records and imaging shared between chambers.'], ['lg:col-span-2', 'message-circle', 'WhatsApp follow-up', 'Send wound photos and questions after surgery and get a clinical reply within working hours.']];
    return sec('why', 'dark', blob('left-1/3 -top-20', 'bg-coral/20', '0.1') +
      UI.sectionHead({ eyebrow: '04 — Why patients choose us', title: 'Specialist care that *respects your time*', align: 'center', theme: 'dark' }) +
      '<div data-component="WhyBento" class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">' + t.map(function (x, i) {
        return '<div data-spotlight class="' + SPOT + ' relative overflow-hidden ' + UI.cls.glassDark + ' rounded-3xl p-7 ' + x[0] + '"><span class="grid h-12 w-12 place-items-center rounded-2xl bg-iris/30 text-iris-300">' + UI.icon(x[1], 'h-6 w-6') + '</span><h3 class="mt-6 font-display ' + (i === 0 ? 'text-4xl' : 'text-2xl') + ' font-light text-white">' + x[2] + '</h3><p class="mt-3 leading-relaxed text-white/70">' + x[3] + '</p></div>';
      }).join('') + '</div>');
  }

  function renderChambers() {
    return sec('chambers', 'light',
      UI.sectionHead({ eyebrow: '05 — Chambers', title: 'Find a chamber *near you*', lead: 'Three consulting rooms across Chattogram and Dhaka. Availability updates live.', align: 'left', theme: 'light' }) +
      '<div data-component="ChamberList" class="mt-12 grid gap-8 lg:grid-cols-3">' + SITE.chambersIndex.map(function (c) {
        return '<div class="flex flex-col gap-4" data-chamber="' + E(c.slug) + '">' + UI.chamberCard(c, { theme: 'light' }) + '<div data-open-pill aria-live="polite" class="px-2"></div></div>';
      }).join('') + '</div>');
  }
  function updatePills() {
    UI.qsa('[data-chamber]').forEach(function (w) {
      var o = SITE.nextOpening(w.getAttribute('data-chamber')), now = new Date(), t = 'No upcoming sessions', live = false;
      if (o) {
        var s = new Date(o.startAt), e = new Date(o.endAt);
        if (now >= s && now < e) { t = 'Open now · until ' + UI.formatTime(e); live = true; }
        else t = (o.isToday ? 'Opens today ' : 'Next: ' + s.toLocaleDateString('en-GB', { weekday: 'short' }) + ' ') + UI.formatTime(s);
      }
      w.querySelector('[data-open-pill]').innerHTML = '<span class="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-white"><span class="h-2 w-2 rounded-full ' + (live ? 'bg-mint motion-safe:animate-pulse' : 'bg-gold') + '"></span>' + E(t) + '</span>';
    });
  }

  function renderBook() {
    var f = function (o) { o.theme = 'dark'; return UI.field(o); };
    var steps = [['Choose', 'Pick a chamber, treatment and a date on a consulting day.'], ['Confirm', 'Our desk confirms by phone or WhatsApp, usually within an hour.'], ['Visit', 'Bring earlier reports and scans. First visits take about 30 minutes.']];
    var p = phone();
    return sec('book', 'dark', blob('-left-32 bottom-0', 'bg-iris/30', '0.1') +
      '<div class="grid items-start gap-14 lg:grid-cols-2"><div data-reveal="up"><p class="font-mono text-xs uppercase tracking-[0.3em] text-aqua">06 — Quick booking</p>' +
      '<h2 class="mt-5 font-display text-5xl font-light leading-[1.02] text-white [&_em]:text-iris-300">' + UI.emph('Book in *three steps*') + '</h2>' +
      '<ol class="mt-10 space-y-6">' + steps.map(function (s, i) { return '<li class="flex gap-5"><span class="font-mono text-2xl text-iris-300">0' + (i + 1) + '</span><div><h3 class="font-display text-2xl text-white">' + s[0] + '</h3><p class="text-white/70">' + s[1] + '</p></div></li>'; }).join('') + '</ol>' +
      '<div class="mt-10 flex flex-wrap gap-4"><a href="tel:' + E(p.t) + '" class="' + UI.cls.btnGlass + '">' + UI.icon('phone', 'h-4 w-4') + ' ' + E(p.d) + '</a><a href="' + E(SITE.contact.whatsappUrl) + '" rel="noopener" class="' + UI.cls.btnGlass + '">' + UI.icon('message-circle', 'h-4 w-4') + ' WhatsApp</a></div>' +
      '<p class="mt-4 text-sm text-white/70">Appointment desk: ' + E(SITE.contact.deskHours) + '</p></div>' +
      '<form id="quick-book" data-component="QuickBooking" novalidate class="' + UI.cls.glassDark + ' space-y-4 rounded-3xl p-6 sm:p-8" aria-label="Quick appointment booking">' +
      f({ label: 'Chamber', name: 'chamber', type: 'select', required: true, options: SITE.chambersIndex.map(function (c) { return { value: c.slug, label: c.chamberName + ' · ' + c.area }; }) }) +
      f({ label: 'Treatment', name: 'service', type: 'select', options: [{ value: '', label: 'Not sure yet' }].concat(SITE.servicesIndex.map(function (s) { return { value: s.slug, label: s.name }; })) }) +
      f({ label: 'Preferred date', name: 'date', type: 'date', required: true, min: isoToday() }) +
      f({ label: 'Visit type', name: 'type', type: 'select', required: true, options: [{ value: 'new', label: 'New consultation' }, { value: 'follow-up', label: 'Follow-up visit' }, { value: 'second-opinion', label: 'Second opinion' }, { value: 'post-op', label: 'Post-operative review' }] }) +
      '<button type="submit" data-magnetic class="' + UI.cls.btnPrimary + ' w-full justify-center">' + UI.cls.shine + 'Continue to appointment ' + UI.icon('arrow-right', 'h-4 w-4') + '</button></form></div>');
  }

  function renderTestimonials() {
    var L = SITE.testimonialsIndex, avg = (L.reduce(function (a, t) { return a + t.rating; }, 0) / L.length).toFixed(1);
    var nb = 'grid h-12 w-12 place-items-center rounded-full bg-ink text-white motion-safe:transition-[transform,opacity] hover:bg-iris focus-visible:ring-2 focus-visible:ring-iris focus-visible:ring-offset-2';
    return sec('testimonials', 'light',
      '<div class="grid items-end gap-8 lg:grid-cols-12"><div class="lg:col-span-8">' + UI.sectionHead({ eyebrow: '07 — Patient stories', title: 'Back on their *feet*', align: 'left', theme: 'light' }) + '</div>' +
      '<div class="' + UI.cls.glassLight + ' flex items-center gap-5 rounded-3xl p-6 lg:col-span-4"><span class="font-display text-6xl">' + avg + '</span><div>' + UI.stars(5) + '<p class="mt-1 font-mono text-xs uppercase tracking-widest text-ink/70">' + L.length + ' patient reviews</p></div></div></div>' +
      '<div data-carousel data-autoplay="6500" data-component="TestimonialCarousel" class="mt-12"><div data-carousel-track class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none]">' + L.map(function (t) {
        return '<div data-carousel-slide class="shrink-0 basis-full snap-start lg:basis-[calc(33.333%-1rem)]">' + UI.testimonialCard(t, { theme: 'light' }) + '</div>';
      }).join('') + '</div><div class="mt-8 flex items-center justify-between gap-4"><div data-carousel-dots class="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4"></div><div class="flex items-center gap-3"><button type="button" data-carousel-toggle aria-pressed="false" aria-label="Pause scrolling testimonials" class="' + UI.cls.btnOutline + ' !px-4 !py-2 text-xs">Pause motion</button><div class="flex gap-3"><button type="button" data-carousel-prev aria-label="Previous testimonials" class="' + nb + '">' + UI.icon('arrow-left', 'h-5 w-5') + '</button><button type="button" data-carousel-next aria-label="Next testimonials" class="' + nb + '">' + UI.icon('arrow-right', 'h-5 w-5') + '</button></div></div></div></div>' +
      '<div class="mt-8"><a href="' + R.testimonials + '" class="' + UI.cls.btnOutline + '">Read all patient stories</a></div>');
  }

  function renderBlog() {
    var posts = SITE.blogIndex.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).slice(0, 3);
    return sec('blog', 'dark',
      UI.sectionHead({ eyebrow: '08 — Journal', title: 'Advice you can *act on*', lead: 'Plain-language guides from the clinic, written to help you decide when and how to seek care.', align: 'left', theme: 'dark' }) +
      '<div data-component="LatestPosts" class="mt-12 grid gap-8 md:grid-cols-3">' + posts.map(function (p) { return UI.postCard(p, { theme: 'dark' }); }).join('') + '</div>' +
      '<div class="mt-12"><a href="' + R.blog + '" class="' + UI.cls.btnGlass + '">Read all articles ' + UI.icon('arrow-right', 'h-4 w-4') + '</a></div>');
  }

  function renderFaqs() {
    var q = [['How do I book an appointment?', 'Use the booking form, call the appointment desk or message us on WhatsApp. The desk is open Saturday to Thursday, 9:00 AM to 8:00 PM, and confirms every booking.'], ['What does a first consultation cost?', 'Fees range from ' + UI.formatBDT(1200) + ' to ' + UI.formatBDT(2000) + ' depending on the chamber, with lower follow-up fees. You will see the exact amount before you confirm.'], ['Will I definitely need surgery?', 'No. Many knee, shoulder and back problems improve with physiotherapy, injections or activity changes. Surgery is advised only when it is likely to help more than waiting.'], ['Which payment methods do you accept?', 'Cash, major cards, bKash and Nagad are accepted at all chambers. Surgical packages are quoted in writing in advance.'], ['What should I do after a serious injury?', 'Keep the limb still, avoid food and drink if surgery may be needed, and call the emergency line right away. Fracture care is available around the clock.'], ['Can I bring reports for a second opinion?', 'Yes. Bring X-rays, MRI discs or reports and select second opinion when booking so extra time is reserved to review them properly.']];
    return sec('faqs', 'light',
      '<div class="grid gap-14 lg:grid-cols-12"><div class="lg:col-span-5"><div class="relative lg:sticky lg:top-32" data-component="FaqAside"><div data-parallax="0.06">' + UI.img(SITE.img.theatre, 'Surgical team preparing an arthroscopy', 'aspect-[4/5] w-full rounded-3xl object-cover', { w: 800, h: 1000 }) + '</div>' +
      '<div class="' + UI.cls.glassLight + ' absolute -bottom-6 left-4 right-4 rounded-2xl p-5 sm:left-auto sm:max-w-xs"><p class="font-display text-xl">Still unsure?</p><p class="mt-1 text-sm text-ink/70">Message us on WhatsApp and the desk will reply during working hours.</p></div></div></div>' +
      '<div class="lg:col-span-7">' + UI.sectionHead({ eyebrow: '09 — Questions', title: 'Answers before *you ask*', align: 'left', theme: 'light' }) +
      '<div data-accordion data-accordion-single data-component="HomeFaqs" class="mt-10">' + q.map(function (x, i) { return UI.faqItem({ id: 'home-faq-' + (i + 1), question: x[0], answerHTML: '<p>' + E(x[1]) + '</p>', open: i === 0, theme: 'light' }); }).join('') + '</div>' +
      '<div class="mt-10"><a href="' + R.faqs + '" class="' + UI.cls.btnOutline + '">See all questions</a></div></div></div>');
  }

  function bind(main) {
    var grid = UI.qs('#service-grid', main);
    main.addEventListener('click', function (e) {
      var b = e.target.closest('[data-action="filter"]'); if (!b) return;
      UI.qsa('[data-action="filter"]', main).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      grid.classList.add('opacity-0');
      setTimeout(function () { grid.innerHTML = serviceCards(b.getAttribute('data-cat')); UI.mount(grid); grid.classList.remove('opacity-0'); }, 200);
    });
    updatePills(); setInterval(updatePills, 60000);
    var form = UI.qs('#quick-book', main);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!UI.validateForm(form)) return;
      var v = {}; new FormData(form).forEach(function (val, k) { v[k] = val; });
      var ch = SITE.getChamber(v.chamber), day = new Date(v.date + 'T00:00:00').getDay();
      var err = form.querySelector('[data-error-for="date"]');
      if (ch && !ch.schedule.some(function (s) { return s.days.indexOf(day) > -1; })) {
        if (err) err.textContent = ch.chamberName + ' sees patients ' + ch.schedule.map(function (s) { return s.label || s.days; }).join(' and ') + '. Please pick one of those days.';
        return;
      }
      if (err) err.textContent = '';
      location.href = SITE.url.appointment({ service: v.service || undefined, chamber: v.chamber, date: v.date, type: v.type });
    });
  }

  UI.ready(function () {
    var main = UI.qs('#main');
    main.innerHTML = [renderHero(), renderStats(), renderAbout(), renderServices(), renderJourney(), renderWhy(), renderChambers(), renderBook(), renderTestimonials(), renderBlog(), renderFaqs(),
      UI.ctaBand({ title: 'Ready to *move freely* again?', lead: 'Book a consultation this week and leave with a clear diagnosis, a plan and a price.', primaryLabel: 'Book appointment', primaryHref: SITE.url.appointment({}), secondaryLabel: 'Call the desk', secondaryHref: 'tel:' + phone().t })].join('');
    UI.mount(main);
    bind(main);
  });
})();
