/* js/pages/about.js · Owner Part 2 · Renders the About page · Depends on: SITE, UI, FX */
(function () {
  'use strict';
  UI.ready(function () {
    var esc = UI.esc, D = SITE.doctor, C = UI.cls;
    var O = SITE.img.objects;
    var data = {
      milestones: [
        { id: 'ms-001', year: '2006', title: 'Joins Chittagong Medical College', text: 'Begins the MBBS programme and spends weekends shadowing the orthopaedic trauma ward.' },
        { id: 'ms-002', year: '2012', title: 'MBBS and internship', text: 'Completes MBBS and a rotating internship, choosing orthopaedics after a night of emergency fracture care.' },
        { id: 'ms-003', year: '2016', title: 'MS, Orthopaedic Surgery (BSMMU)', text: 'Completes postgraduate surgical training in Dhaka with a thesis on knee ligament injuries.' },
        { id: 'ms-004', year: '2018', title: 'FCPS (Orthopaedics)', text: 'Earns fellowship of the College of Physicians and Surgeons, Bangladesh.' },
        { id: 'ms-005', year: '2019', title: 'First arthroscopic ACL reconstruction', text: 'Performs her first independent keyhole ACL reconstruction for a university footballer.' },
        { id: 'ms-006', year: '2021', title: 'Fellowship in Arthroscopy & Sports Surgery', text: 'Trains in Kuala Lumpur in advanced shoulder and knee arthroscopy and return-to-sport protocols.' },
        { id: 'ms-007', year: '2023', title: 'Associate Professor and Consultant', text: 'Joins the Department of Orthopaedic Surgery and begins teaching residents.' },
        { id: 'ms-008', year: '2026', title: 'The 5,000th surgery', text: 'Marks 5,000 operations, from keyhole repairs to joint replacement, with patients across Bangladesh.' }
      ],
      skills: [
        { id: 'sk-001', label: 'Arthroscopy', value: 96, color: 'stroke-iris-300' },
        { id: 'sk-002', label: 'Joint replacement', value: 92, color: 'stroke-aqua' },
        { id: 'sk-003', label: 'Sports injury', value: 95, color: 'stroke-coral' },
        { id: 'sk-004', label: 'Spine', value: 88, color: 'stroke-gold' },
        { id: 'sk-005', label: 'Trauma', value: 90, color: 'stroke-mint' }
      ],
      values: [
        { id: 'val-001', n: '01', title: 'Listen first', front: 'Your story guides the diagnosis.', back: 'Every consultation starts with your goals: walking to the mosque, climbing stairs, returning to the pitch. Scans confirm, they never replace, the conversation.' },
        { id: 'val-002', n: '02', title: 'Least invasive', front: 'Keyhole before open, rehab before surgery.', back: 'Where a stable result is possible without an operation, we say so. When surgery helps, we choose the smallest approach that does the job properly.' },
        { id: 'val-003', n: '03', title: 'Precision', front: 'Millimetres matter.', back: 'Careful planning, accurate implant alignment and sterile theatre discipline reduce avoidable problems and support a more natural movement.' },
        { id: 'val-004', n: '04', title: 'Recovery together', front: 'Surgery is the beginning.', back: 'You leave with a written rehabilitation plan, a review date and a number to call. Families are included at every step.' }
      ],
      memberships: ['Bangladesh Orthopaedic Association', 'Bangladesh Society of Arthroscopy & Sports Medicine', 'Bangladesh Medical Association', 'Asia-Pacific Orthopaedic Association'],
      publications: [
        { title: 'Early outcomes of arthroscopic ACL reconstruction in young Bangladeshi athletes', source: 'Bangladesh Journal of Orthopaedics', year: '2019' },
        { title: 'Functional recovery after total knee replacement in a South Asian cohort', source: 'Journal of Joint Surgery Practice', year: '2021' },
        { title: 'Arthroscopic rotator cuff repair: a two-year follow-up', source: 'Asian Journal of Sports Surgery', year: '2023' },
        { title: 'Rehabilitation adherence after knee arthroscopy in urban Bangladesh', source: 'Bangladesh Medical Research Review', year: '2025' }
      ],
      awards: [
        { title: 'Young Surgeon Excellence Award', by: 'Bangladesh Orthopaedic Association', year: '2020' },
        { title: 'Best Clinical Paper, Annual Conference', by: 'Bangladesh Society of Arthroscopy & Sports Medicine', year: '2022' },
        { title: 'Teaching Excellence Recognition', by: 'Department of Orthopaedic Surgery', year: '2024' }
      ],
      expect: [
        { n: '01', t: 'A full conversation', d: 'About thirty minutes to hear your symptoms, history and goals.' },
        { n: '02', t: 'A hands-on examination', d: 'Joint movement, stability and strength checked carefully, with a chaperone if you wish.' },
        { n: '03', t: 'Review of your reports', d: 'Bring X-rays, MRI films and prescriptions. Only necessary tests are advised.' },
        { n: '04', t: 'A clear written plan', d: 'Options, costs in taka and expected recovery are explained so your family can decide calmly.' }
      ]
    };

    document.getElementById('page-hero').innerHTML = UI.pageHero({
      eyebrow: 'About the surgeon',
      title: 'Precision. *Motion.* Recovery.',
      lead: 'Meet Dr. Nabila Sultana Rahman, an orthopaedic, arthroscopy and sports injury surgeon caring for patients in Chattogram and Dhaka.'
    });

    function sec(id, cls, inner) { return '<section id="' + id + '" data-section="' + id + '" class="' + cls + '"><div class="' + C.container + '">' + inner + '</div></section>'; }
    function float(src, pos, depth, delay) {
      return '<div data-parallax="' + depth + '" class="pointer-events-none absolute ' + pos + '"><div class="motion-safe:animate-float3d ' + delay + '">' + UI.deco(src, 'w-full') + '</div></div>';
    }

    var story = sec('story', C.sectionLight,
      '<div class="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">' +
      '<div class="relative mx-auto w-full max-w-md">' +
      '<div class="absolute -inset-6 rounded-full bg-iris/30 blur-3xl motion-safe:animate-aurora"></div>' +
      '<div data-tilt data-tilt-max="8" class="relative ' + C.glassLight + ' rounded-[2rem] p-3">' +
      UI.img(D.image || SITE.img.portrait, 'Portrait of ' + D.name, 'aspect-[4/5] w-full rounded-[1.5rem] bg-aurora-dark object-cover', { w: 800, h: 1000 }) +
      '<div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 motion-safe:transition-opacity"></div></div>' +
      float(O.ball, '-right-8 top-10 w-24 sm:w-28', '0.12', '') + float(O.bone, '-left-10 bottom-16 w-24 sm:w-32', '0.18', '[animation-delay:400ms]') + '</div>' +
      '<div><p class="font-mono text-xs uppercase tracking-[0.2em] text-iris">01 — Her story</p>' +
      '<h2 data-split class="mt-4 font-display text-4xl font-light leading-[1.05] sm:text-6xl [&_em]:text-iris">A surgeon who learned to *listen* to joints</h2>' +
      '<div class="mt-8 space-y-5 text-lg leading-relaxed text-ink/70">' +
      '<p class="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-iris">Orthopaedics chose Dr. Nabila on a rainy night at Chittagong Medical College, when a young cricketer arrived with a shattered leg and left walking six months later. Watching bone heal, and a life return with it, settled the question of her career.</p>' +
      '<p>Her MS in Orthopaedic Surgery at BSMMU in Dhaka taught discipline, and her FCPS sharpened judgement. A fellowship in arthroscopy and sports surgery in Kuala Lumpur then opened a new world of keyhole repair, faster recovery and structured return to sport.</p>' +
      '<blockquote data-reveal="up" class="border-l-2 border-iris pl-6 font-display text-2xl font-light italic leading-snug text-ink">“A good operation is one the patient barely has to think about afterwards.”</blockquote>' +
      '<p>She returned to Chattogram to build an arthroscopy and sports-injury practice that people no longer needed to leave Bangladesh to find. Today she consults in Chattogram and Dhaka, and still teaches residents every week.</p></div></div></div>');

    var numbers = sec('numbers', C.sectionDark,
      '<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">' + [
        { value: D.experienceYears, suffix: '+', label: 'Years of practice' },
        { value: D.surgeriesPerformed, suffix: '+', label: 'Surgeries performed' },
        { value: D.patientsTreated, suffix: '+', label: 'Patients treated' },
        { value: D.satisfactionPercent, suffix: '%', label: 'Patient satisfaction' }
      ].map(function (s, i) { return UI.statTile({ value: s.value, suffix: s.suffix, label: s.label, theme: 'dark', delay: i * 100 }); }).join('') + '</div>');

    var tl = data.milestones.map(function (m, i) {
      var left = i % 2 === 0;
      return '<li class="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">' +
        '<span class="absolute left-[11px] top-8 h-3 w-3 rounded-full bg-iris ring-4 ring-iris/25 lg:left-1/2 lg:-translate-x-1/2"></span>' +
        '<div data-reveal="' + (left ? 'left' : 'right') + '" class="' + (left ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2') + '">' +
        '<div data-scroll-3d class="' + C.glassLight + ' rounded-3xl p-6">' +
        '<time datetime="' + m.year + '" class="font-mono text-xs uppercase tracking-[0.2em] text-iris">' + m.year + '</time>' +
        '<h3 class="mt-2 font-display text-2xl font-light">' + esc(m.title) + '</h3><p class="mt-2 text-sm text-ink/70">' + esc(m.text) + '</p></div></div></li>';
    }).join('');
    var timeline = sec('timeline', C.sectionLight,
      UI.sectionHead({ eyebrow: '03 — Timeline', title: 'Twenty years, *eight* turning points', align: 'center', theme: 'light' }) +
      '<div class="relative mt-14"><div class="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-iris via-aqua to-coral lg:left-1/2" data-scroll-3d></div>' +
      '<ol class="relative space-y-8" data-component="Timeline">' + tl + '</ol></div>');

    var C2 = 2 * Math.PI * 42;
    var rings = data.skills.map(function (s) {
      return '<div data-reveal="zoom" class="text-center"><div class="' + C.glassDark + ' rounded-3xl p-6">' +
        '<div class="relative mx-auto h-32 w-32"><svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" role="img" aria-label="' + esc(s.label) + ' ' + s.value + ' percent">' +
        '<circle cx="50" cy="50" r="42" fill="none" stroke-width="7" class="stroke-white/10"/>' +
        '<circle data-ring="' + s.value + '" cx="50" cy="50" r="42" fill="none" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + C2.toFixed(1) + '" stroke-dashoffset="' + (C2 * (1 - s.value / 100)).toFixed(1) + '" class="' + s.color + ' opacity-0 motion-safe:transition-opacity duration-[1600ms] ease-out"/></svg>' +
        '<span class="absolute inset-0 flex items-center justify-center font-mono text-xl text-white"><span data-counter="' + s.value + '" data-suffix="%">0%</span></span></div>' +
        '<p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/70">' + esc(s.label) + '</p></div></div>';
    }).join('');
    var expertise = sec('expertise', C.sectionDark,
      UI.sectionHead({ eyebrow: '04 — Expertise', title: 'Where the *hands-on hours* go', lead: 'Areas of regular surgical practice, shown as a share of clinical focus.', align: 'center', theme: 'dark' }) +
      '<div class="relative mt-12 grid grid-cols-2 gap-5 lg:grid-cols-5">' + rings + '</div>' +
      '<div class="mt-12">' + UI.marqueeHTML(['Arthroscopy', 'Joint replacement', 'Sports injury', 'Spine care', 'Trauma', 'Paediatric orthopaedics'], { theme: 'dark' }) + '</div>');

    var rot = 'group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]';
    var flips = data.values.map(function (v) {
      return '<div data-reveal="flip" data-delay="' + 0 + '"><div tabindex="0" role="group" aria-label="' + esc(v.title) + ': ' + esc(v.back) + '" class="group h-80 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-iris ' + C.stage + '">' +
        '<div class="relative h-full w-full motion-safe:transition-transform duration-700 ' + C.preserve3d + ' ' + rot + '">' +
        '<div class="absolute inset-0 flex flex-col justify-between rounded-3xl bg-ink p-7 text-white ' + C.noBackface + '"><span class="font-mono text-xs tracking-[0.2em] text-aqua">' + v.n + ' —</span><div><h3 class="font-display text-3xl font-light">' + esc(v.title) + '</h3><p class="mt-3 text-white/70">' + esc(v.front) + '</p></div><span class="font-mono text-[10px] uppercase tracking-widest text-white/70">Hover or focus to flip</span></div>' +
        '<div class="absolute inset-0 flex flex-col justify-center rounded-3xl bg-gradient-to-br from-iris to-aqua p-7 text-white [transform:rotateY(180deg)] ' + C.noBackface + '"><h3 class="font-display text-2xl font-light">' + esc(v.title) + '</h3><p class="mt-4 text-sm leading-relaxed text-white">' + esc(v.back) + '</p></div>' +
        '</div></div></div>';
    }).join('');
    var philosophy = sec('philosophy', C.sectionLight,
      UI.sectionHead({ eyebrow: '05 — Philosophy', title: 'Four *values* behind every decision', align: 'left', theme: 'light' }) +
      '<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' + flips + '</div>');

    var li = function (arr, fn) { return '<ul class="mt-4 space-y-3">' + arr.map(fn).join('') + '</ul>'; };
    var gl = C.glassDark + ' rounded-3xl p-7';
    var creds = sec('credentials', C.sectionDark,
      UI.sectionHead({ eyebrow: '06 — Credentials', title: 'Training, *societies* and recognition', align: 'center', theme: 'dark' }) +
      '<div class="mt-12 grid gap-6 md:grid-cols-2">' +
      '<div data-reveal="up" class="' + gl + '"><h3 class="font-mono text-xs uppercase tracking-[0.2em] text-aqua">Degrees</h3>' + li(D.degrees, function (d) { return '<li class="flex gap-3 text-white/70">' + UI.icon('award', 'mt-1 h-4 w-4 shrink-0 text-gold') + esc(d) + '</li>'; }) +
      '<p class="mt-5 font-mono text-xs uppercase tracking-widest text-white/70">BMDC reg. no. ' + esc(D.bmdcNo) + '</p></div>' +
      '<div data-reveal="up" data-delay="100" class="' + gl + '"><h3 class="font-mono text-xs uppercase tracking-[0.2em] text-aqua">Memberships</h3>' + li(data.memberships, function (m) { return '<li class="flex gap-3 text-white/70">' + UI.icon('users', 'mt-1 h-4 w-4 shrink-0 text-gold') + esc(m) + '</li>'; }) + '</div>' +
      '<div data-reveal="up" class="' + gl + '"><h3 class="font-mono text-xs uppercase tracking-[0.2em] text-aqua">Publications</h3>' + li(data.publications, function (p) { return '<li class="text-white/70"><span class="block text-white">' + esc(p.title) + '</span><span class="font-mono text-xs uppercase tracking-wider">' + esc(p.source) + ' · ' + p.year + '</span></li>'; }) + '</div>' +
      '<div data-reveal="up" data-delay="100" class="' + gl + '"><h3 class="font-mono text-xs uppercase tracking-[0.2em] text-aqua">Awards</h3>' + li(data.awards, function (a) { return '<li class="text-white/70"><span class="block text-white">' + esc(a.title) + '</span><span class="font-mono text-xs uppercase tracking-wider">' + esc(a.by) + ' · ' + a.year + '</span></li>'; }) + '</div>' +
      '</div>');

    var theatre = sec('theatre', C.sectionLight,
      '<div class="grid items-center gap-12 lg:grid-cols-2"><div class="[perspective:1400px]"><div data-scroll-3d class="overflow-hidden rounded-[2rem] shadow-2xl">' +
      UI.img(SITE.img.theatre, 'Modern orthopaedic operating theatre at Port City Specialized Hospital', 'aspect-[4/3] w-full object-cover', { w: 1200, h: 900 }) + '</div></div>' +
      '<div><p class="font-mono text-xs uppercase tracking-[0.2em] text-iris">07 — Your first visit</p>' +
      '<h2 data-split class="mt-4 font-display text-4xl font-light leading-[1.05] sm:text-5xl [&_em]:text-iris">What to *expect* at your first consultation</h2>' +
      '<ol class="mt-8 space-y-5">' + data.expect.map(function (e, i) {
        return '<li data-reveal="right" data-delay="' + (i * 80) + '" class="flex gap-4"><span class="font-mono text-sm text-iris">' + e.n + '</span><div><h3 class="font-semibold">' + esc(e.t) + '</h3><p class="text-sm text-ink/70">' + esc(e.d) + '</p></div></li>';
      }).join('') + '</ol></div></div>');

    var cta = UI.ctaBand({
      title: 'Take the first *step* towards moving freely',
      lead: 'Book a consultation at GEC Circle, Khulshi or Banani. Results vary, and every plan begins with an honest assessment.',
      primaryLabel: 'Book Appointment', primaryHref: SITE.url.appointment({}),
      secondaryLabel: 'Contact us', secondaryHref: SITE.routes.contact
    });

    var root = document.getElementById('about-root');
    root.setAttribute('data-component', 'AboutPage');
    root.innerHTML = story + numbers + timeline + expertise + philosophy + creds + theatre + cta;
    UI.mount(document.getElementById('main'));

    var rs = UI.qsa('[data-ring]', root);
    var fire = function (el) { el.classList.remove('opacity-0'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { fire(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      rs.forEach(function (r) { io.observe(r); });
    } else { rs.forEach(fire); }
  });
})();
