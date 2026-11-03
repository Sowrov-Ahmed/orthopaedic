/*!
 * js/site.js — SHARED CORE (identical for every member; never edit)
 * window.SITE: doctor facts, contact, routes, URL builders, canonical indexes (services, chambers, blog, testimonials),
 * image paths, submit adapter, nextOpening(). Loaded (defer) before ui.js, fx.js, layout.js and page scripts.
 */
(function (window) {
  'use strict';
  var IMG = 'assets/img/';
  var SITE = {
    version: '2.0.0',
    brand: { name: 'Dr. Nabila Sultana Rahman', tagline: 'Precision. Motion. Recovery.', domain: 'www.drnabilarahman.com', monogram: 'NR' },
    doctor: {
      id: 'doc-001', slug: 'dr-nabila-sultana-rahman', name: 'Dr. Nabila Sultana Rahman', shortName: 'Dr. Nabila Rahman',
      title: 'Associate Professor & Consultant', department: 'Department of Orthopaedic Surgery',
      specialty: 'Orthopaedic, Arthroscopy & Sports Injury Surgeon',
      degrees: ['MBBS (Chittagong Medical College)', 'MS (Orthopaedic Surgery, BSMMU)', 'FCPS (Orthopaedics)', 'Fellowship in Arthroscopy & Sports Surgery (Kuala Lumpur)'],
      bmdcNo: 'A-61374', experienceYears: 13, surgeriesPerformed: 5200, patientsTreated: 21000, satisfactionPercent: 97,
      languages: ['Bangla', 'English'], image: IMG + 'doctor-portrait.png'
    },
    contact: {
      phone: { display: '+880 1815-264079', e164: '+8801815264079', local: '01815-264079' },
      emergency: { display: '+880 1711-934806', e164: '+8801711934806', local: '01711-934806' },
      whatsappUrl: 'https://wa.me/8801815264079',
      email: 'care@drnabilarahman.com',
      deskHours: 'Appointment desk: Saturday – Thursday, 9:00 AM – 8:00 PM'
    },
    social: {
      facebook: 'https://www.facebook.com/drnabilarahmanortho', linkedin: 'https://www.linkedin.com/in/drnabilarahman',
      youtube: 'https://www.youtube.com/@drnabilarahmanortho', instagram: 'https://www.instagram.com/drnabilarahmanortho'
    },
    img: {
      portrait: IMG + 'doctor-portrait.png', theatre: IMG + 'theatre.svg', logo: IMG + 'logo-mark.svg',
      objects: { bone: IMG + 'obj-bone.svg', vertebra: IMG + 'obj-vertebra.svg', ball: IMG + 'obj-ball.svg', ring: IMG + 'obj-ring.svg', capsule: IMG + 'obj-capsule.svg', cross: IMG + 'obj-cross.svg' }
    },
    nav: [
      { label: 'Home', href: 'index.html', page: 'home' }, { label: 'About', href: 'about.html', page: 'about' },
      { label: 'Services', href: 'services.html', page: 'services' }, { label: 'Chambers', href: 'chambers.html', page: 'chambers' },
      { label: 'Contact', href: 'contact.html', page: 'contact' }
    ],
    routes: {
      home: 'index.html', about: 'about.html', services: 'services.html', serviceDetails: 'service-details.html', chambers: 'chambers.html',
      appointment: 'appointment.html', blog: 'blog.html', blogDetails: 'blog-details.html', testimonials: 'testimonials.html',
      contact: 'contact.html', faqs: 'faqs.html', signin: 'signin.html', notFound: '404.html'
    },
    url: {
      service: function (slug) { return 'service-details.html?slug=' + encodeURIComponent(slug); },
      blog: function (slug) { return 'blog-details.html?slug=' + encodeURIComponent(slug); },
      blogCategory: function (c) { return 'blog.html?category=' + encodeURIComponent(c); },
      chamber: function (slug) { return 'chambers.html#' + slug; },
      appointment: function (o) {
        var p = new URLSearchParams();
        Object.keys(o || {}).forEach(function (k) { if (o[k]) p.set(k, o[k]); });
        var q = p.toString(); return 'appointment.html' + (q ? '?' + q : '');
      }
    },

    servicesIndex: [
      { id: 'svc-001', slug: 'acl-ligament-reconstruction', name: 'ACL & Ligament Reconstruction', category: 'sports', accent: 'coral', icon: 'activity', image: IMG + 'acl-ligament-reconstruction.svg', priceFrom: 220000, priceTo: 380000, priceUnit: 'per procedure', short: 'Arthroscopic ligament and meniscus repair that returns athletes to the field with a stable, confident knee.' },
      { id: 'svc-002', slug: 'knee-replacement', name: 'Total Knee Replacement', category: 'surgical', accent: 'aqua', icon: 'bone', image: IMG + 'knee-replacement.svg', priceFrom: 380000, priceTo: 700000, priceUnit: 'per knee', short: 'Precisely aligned implants that end arthritic knee pain and restore natural walking.' },
      { id: 'svc-003', slug: 'hip-replacement', name: 'Hip Replacement & Preservation', category: 'surgical', accent: 'iris', icon: 'shield', image: IMG + 'hip-replacement.svg', priceFrom: 450000, priceTo: 850000, priceUnit: 'per hip', short: 'Minimally invasive hip replacement and joint-preserving surgery for arthritis, necrosis and fractures.' },
      { id: 'svc-004', slug: 'shoulder-arthroscopy', name: 'Shoulder Arthroscopy & Rotator Cuff', category: 'sports', accent: 'gold', icon: 'target', image: IMG + 'shoulder-arthroscopy.svg', priceFrom: 180000, priceTo: 350000, priceUnit: 'per procedure', short: 'Keyhole repair of rotator cuff tears, frozen shoulder and recurrent dislocations.' },
      { id: 'svc-005', slug: 'spine-disc-care', name: 'Spine & Slipped Disc Care', category: 'surgical', accent: 'iris', icon: 'trending-up', image: IMG + 'spine-disc-care.svg', priceFrom: 200000, priceTo: 650000, priceUnit: 'per surgical procedure', short: 'Stepwise treatment of slipped disc, sciatica and stenosis, from precise injections to microdiscectomy.' },
      { id: 'svc-006', slug: 'fracture-trauma', name: 'Fracture & Trauma Care', category: 'surgical', accent: 'coral', icon: 'stethoscope', image: IMG + 'fracture-trauma.svg', priceFrom: 45000, priceTo: 250000, priceUnit: 'per procedure', short: 'Round-the-clock fracture fixation with plates, nails and external fixators after accidents and falls.' },
      { id: 'svc-007', slug: 'sports-medicine-rehab', name: 'Sports Medicine & Rehabilitation', category: 'non-surgical', accent: 'mint', icon: 'heart', image: IMG + 'sports-medicine-rehab.svg', priceFrom: 5000, priceTo: 60000, priceUnit: 'per programme', short: 'Non-surgical injury care, performance rehab and structured return-to-sport programmes for athletes.' },
      { id: 'svc-008', slug: 'paediatric-orthopaedics', name: 'Paediatric Orthopaedics', category: 'children', accent: 'mint', icon: 'users', image: IMG + 'paediatric-orthopaedics.svg', priceFrom: 25000, priceTo: 200000, priceUnit: 'per treatment course', short: 'Gentle correction of clubfoot, hip dysplasia, flat feet and growth-related bone problems in children.' }
    ],

    chambersIndex: [
      { id: 'ch-001', slug: 'gec-circle', name: 'Port City Specialized Hospital', chamberName: 'GEC Circle Chamber', area: 'GEC Circle', city: 'Chattogram',
        address: 'Plot 9, O.R. Nizam Road, GEC Circle, Chattogram 4202', phone: { display: '+880 1819-472308', e164: '+8801819472308' },
        schedule: [{ days: [6, 0, 1], label: 'Sat, Sun, Mon', start: '16:00', end: '21:00', hours: '4:00 PM – 9:00 PM' }],
        fee: { firstVisit: 1500, followUp: 800 }, slotMinutes: 15, lat: 22.3592, lng: 91.8212, image: IMG + 'ch-gec-circle.svg' },
      { id: 'ch-002', slug: 'khulshi', name: 'Khulshi Medical & Diagnostic Centre', chamberName: 'Khulshi Chamber', area: 'Khulshi', city: 'Chattogram',
        address: 'House 7, Zakir Hossain Road, Khulshi, Chattogram 4225', phone: { display: '+880 1632-705918', e164: '+8801632705918' },
        schedule: [{ days: [2, 3], label: 'Tue, Wed', start: '10:00', end: '14:00', hours: '10:00 AM – 2:00 PM' }],
        fee: { firstVisit: 1200, followUp: 600 }, slotMinutes: 15, lat: 22.3569, lng: 91.8003, image: IMG + 'ch-khulshi.svg' },
      { id: 'ch-003', slug: 'banani', name: 'Banani Orthocare Hospital', chamberName: 'Dhaka Banani Chamber', area: 'Banani', city: 'Dhaka',
        address: 'House 38, Road 11, Block D, Banani, Dhaka 1213', phone: { display: '+880 1914-386052', e164: '+8801914386052' },
        schedule: [{ days: [4], label: 'Thu', start: '17:00', end: '21:00', hours: '5:00 PM – 9:00 PM' }, { days: [5], label: 'Fri', start: '10:00', end: '13:00', hours: '10:00 AM – 1:00 PM' }],
        fee: { firstVisit: 2000, followUp: 1000 }, slotMinutes: 15, lat: 23.7937, lng: 90.4066, image: IMG + 'ch-banani.svg' }
    ],

    blogCategories: [
      { slug: 'knee', name: 'Knee' }, { slug: 'shoulder', name: 'Shoulder' }, { slug: 'spine', name: 'Spine' }, { slug: 'sports-injury', name: 'Sports Injury' },
      { slug: 'recovery', name: 'Recovery' }, { slug: 'paediatric', name: 'Paediatric' }, { slug: 'trauma-first-aid', name: 'Trauma & First Aid' }
    ],
    blogIndex: [
      { id: 'blg-001', slug: 'knee-pain-warning-signs', title: '7 Warning Signs Your Knee Pain Needs a Specialist', category: 'Knee', categorySlug: 'knee', date: '2026-09-22', readMinutes: 6, image: IMG + 'blog-knee-pain-warning-signs.svg', excerpt: 'Everyday soreness fades. Joint damage does not. Learn the seven signals that mean it is time to stop waiting and get your knee examined.' },
      { id: 'blg-002', slug: 'acl-tear-surgery-or-rehab', title: 'ACL Tear: Surgery or Rehab? How to Decide', category: 'Sports Injury', categorySlug: 'sports-injury', date: '2026-08-30', readMinutes: 7, image: IMG + 'blog-acl-tear-surgery-or-rehab.svg', excerpt: 'Not every torn ACL needs an operation. Age, activity and knee stability decide the right path, and here is how we weigh them together.' },
      { id: 'blg-003', slug: 'arthroscopy-recovery-week-by-week', title: 'Recovery After Arthroscopy: What to Expect Week by Week', category: 'Recovery', categorySlug: 'recovery', date: '2026-08-06', readMinutes: 7, image: IMG + 'blog-arthroscopy-recovery-week-by-week.svg', excerpt: 'Keyhole surgery means small cuts, not instant recovery. A realistic timeline from the first walk to the first jog.' },
      { id: 'blg-004', slug: 'shoulder-pain-at-night', title: 'Shoulder Pain at Night: Causes and What Actually Helps', category: 'Shoulder', categorySlug: 'shoulder', date: '2026-07-14', readMinutes: 6, image: IMG + 'blog-shoulder-pain-at-night.svg', excerpt: 'If lying on your side wakes you at 3 a.m., your rotator cuff may be speaking. Causes, sleeping positions and when to seek care.' },
      { id: 'blg-005', slug: 'slipped-disc-vs-muscle-strain', title: 'Slipped Disc or Muscle Strain? How to Tell the Difference', category: 'Spine', categorySlug: 'spine', date: '2026-06-25', readMinutes: 6, image: IMG + 'blog-slipped-disc-vs-muscle-strain.svg', excerpt: 'Both cause back pain, but only one sends shooting pain down the leg. Spot the signs and know which red flags need urgent attention.' },
      { id: 'blg-006', slug: 'weekend-footballers-injury-prevention', title: 'Weekend Footballers: Preventing Ankle and Knee Injuries', category: 'Sports Injury', categorySlug: 'sports-injury', date: '2026-05-28', readMinutes: 6, image: IMG + 'blog-weekend-footballers-injury-prevention.svg', excerpt: 'Friday-evening matches on hard grounds are a recipe for sprains. A ten-minute warm-up routine that genuinely cuts injury risk.' },
      { id: 'blg-007', slug: 'growing-pains-or-something-more', title: 'Growing Pains or Something More? A Parent\u2019s Guide', category: 'Paediatric', categorySlug: 'paediatric', date: '2026-04-23', readMinutes: 5, image: IMG + 'blog-growing-pains-or-something-more.svg', excerpt: 'Night-time leg aches are common in children, but a limp or persistent pain is not. Here is how parents can tell the difference.' },
      { id: 'blg-008', slug: 'fracture-first-aid-first-hour', title: 'Fracture First Aid: The First Hour After an Accident', category: 'Trauma & First Aid', categorySlug: 'trauma-first-aid', date: '2026-03-12', readMinutes: 5, image: IMG + 'blog-fracture-first-aid-first-hour.svg', excerpt: 'What you do in the first sixty minutes after a bone injury can change the outcome. A calm, step-by-step guide for families.' }
    ],

    testimonialsIndex: [
      { id: 'tst-001', name: 'Mohammad Jahangir Alam', age: 61, area: 'Nasirabad', serviceSlug: 'knee-replacement', rating: 5, date: '2026-08-18', quote: 'For three years I avoided stairs. Six weeks after my knee replacement I was walking to the mosque again. Dr. Nabila explained every step in clear Bangla and never rushed me.' },
      { id: 'tst-002', name: 'Tasnim Ferdous', age: 24, area: 'Khulshi', serviceSlug: 'acl-ligament-reconstruction', rating: 5, date: '2026-07-09', quote: 'I tore my ACL playing for my university team and feared my football days were over. The rehab plan was so structured that I was back on the pitch in eight months.' },
      { id: 'tst-003', name: 'Imran Hossain', age: 42, area: 'Agrabad', serviceSlug: 'spine-disc-care', rating: 5, date: '2026-05-21', quote: 'Months of sciatica vanished after a short, carefully planned procedure. She tried medicines and physiotherapy first and only advised surgery when it was truly necessary.' },
      { id: 'tst-004', name: 'Rokeya Begum', age: 56, area: 'Halishahar', serviceSlug: 'hip-replacement', rating: 5, date: '2026-06-11', quote: 'I was told to live with the pain. Dr. Nabila gave me hope and then results. I stood with support the day after my hip replacement and walk unaided today.' },
      { id: 'tst-005', name: 'Sabbir Ahmed', age: 33, area: 'Panchlaish', serviceSlug: 'fracture-trauma', rating: 5, date: '2026-03-30', quote: 'After a motorbike accident my leg was badly broken. She operated that same night and checked on me every single day. I am walking and back at work.' },
      { id: 'tst-006', name: 'Mehnaz Chowdhury', age: 34, area: 'Banani, Dhaka', serviceSlug: 'paediatric-orthopaedics', rating: 5, date: '2026-09-05', quote: 'Our son was born with clubfoot and we were terrified. The gentle casting treatment worked beautifully, and the doctor made time for every worry we had.' }
    ],

    getService: function (slug) { return SITE.servicesIndex.filter(function (s) { return s.slug === slug; })[0] || null; },
    getChamber: function (slug) { return SITE.chambersIndex.filter(function (c) { return c.slug === slug; })[0] || null; },
    getPost: function (slug) { return SITE.blogIndex.filter(function (b) { return b.slug === slug; })[0] || null; },

    /* Form adapter. Today: short delay then success. Later: replace the body with a real API call. */
    submit: function (formName, payload) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var id = formName.slice(0, 3).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
          try { sessionStorage.setItem('ortho:last:' + formName, JSON.stringify({ id: id, payload: payload, at: new Date().toISOString() })); } catch (e) { /* storage unavailable */ }
          resolve({ ok: true, id: id, formName: formName });
        }, 900);
      });
    },

    /* Next chamber opening from now. slug optional. -> {chamber, at, startAt, endAt, schedule, isToday} | null */
    nextOpening: function (slug) {
      var list = slug ? SITE.chambersIndex.filter(function (c) { return c.slug === slug; }) : SITE.chambersIndex;
      var now = new Date(), best = null;
      list.forEach(function (c) {
        c.schedule.forEach(function (s) {
          for (var i = 0; i < 8; i++) {
            var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
            if (s.days.indexOf(d.getDay()) === -1) continue;
            var st = s.start.split(':').map(Number), en = s.end.split(':').map(Number);
            var startAt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), st[0], st[1]);
            var endAt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), en[0], en[1]);
            if (endAt <= now) continue;
            var at = startAt > now ? startAt : now;
            if (!best || at < best.at) best = { chamber: c, at: at, startAt: startAt, endAt: endAt, schedule: s, isToday: i === 0 };
            break;
          }
        });
      });
      return best;
    }
  };
  window.SITE = SITE;
})(window);
