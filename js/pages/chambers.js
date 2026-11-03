/* js/pages/chambers.js · Owner Part 4 · Chambers page renderer · Depends on SITE, UI, window.CHAMBERS */
(function () {
  'use strict';
  UI.ready(function () {
    const root = UI.qs('#chambers-root');
    if (!root) return;
    const E = UI.esc, I = UI.icon, cls = UI.cls, OBJ = SITE.img.objects, PH = SITE.contact.phone;
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ORDER = [6, 0, 1, 2, 3, 4, 5];
    const list = SITE.chambersIndex.map(c => Object.assign({}, c, (window.CHAMBERS || []).find(d => d.slug === c.slug) || {}));
    const bySlug = {}; list.forEach(c => { bySlug[c.slug] = c; });

    const toMin = s => { const m = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(s || ''); if (!m) return 0; let h = +m[1]; const p = (m[3] || '').toUpperCase(); if (p === 'PM' && h < 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h * 60 + +m[2]; };
    const fmt = min => { let h = Math.floor(min / 60); const m = min % 60, s = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + (m < 10 ? '0' : '') + m + ' ' + s; };
    const nowBD = () => {
      const p = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
      return { day: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday], min: (+p.hour % 24) * 60 + +p.minute };
    };
    const status = ch => {
      const n = nowBD(), cur = ch.schedule.find(s => s.days.includes(n.day) && n.min >= toMin(s.start) && n.min < toMin(s.end));
      if (cur) return { open: true, text: 'Open now · until ' + fmt(toMin(cur.end)) };
      for (let d = 0; d < 8; d++) {
        const wd = (n.day + d) % 7;
        const hit = ch.schedule.filter(s => s.days.includes(wd) && (d > 0 || toMin(s.start) > n.min)).sort((a, b) => toMin(a.start) - toMin(b.start))[0];
        if (hit) return { open: false, text: 'Closed · next ' + (d === 0 ? 'today' : d === 1 ? 'tomorrow' : DAYS[wd]) + ' ' + fmt(toMin(hit.start)) };
      }
      return { open: false, text: 'Closed' };
    };
    const pill = (ch, theme) => {
      const s = status(ch), dk = theme === 'dark';
      const c = s.open ? (dk ? 'bg-mint/15 text-mint' : 'bg-emerald-100 text-emerald-800') : (dk ? 'bg-white/10 text-white/70' : 'bg-ink/5 text-ink/70');
      return `<span class="inline-flex min-h-[28px] items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${c}"><span class="h-2 w-2 rounded-full ${s.open ? 'bg-mint motion-safe:animate-pulse' : 'bg-current opacity-50'}"></span>${E(s.text)}</span>`;
    };
    const pillWrap = (c, theme) => `<span data-open-pill="${c.slug}" data-theme="${theme}" aria-live="polite">${pill(c, theme)}</span>`;
    const hoursLines = c => c.schedule.map(s => `<span class="block">${E(s.label)} · ${E(s.hours)}</span>`).join('');

    function renderOverview() {
      return `<section id="overview" data-section="overview" class="${cls.sectionLight}"><div class="${cls.container}">
        ${UI.sectionHead({ eyebrow: '01 — Three chambers', title: 'Find the *chamber* closest to you', lead: 'Two clinics in Chattogram and one in Dhaka, each with its own schedule. Pick the one that fits your week, then jump straight to its details.', align: 'left', theme: 'light' })}
        <div data-component="ChamberOverview" class="mt-12 grid gap-6 md:grid-cols-3">${list.map((c, i) => `<div data-reveal="up" data-delay="${i * 100}" class="flex flex-col gap-3">${UI.chamberCard(c, { theme: 'light' })}
          <div class="flex flex-wrap items-center justify-between gap-2 px-1">${pillWrap(c, 'light')}<a href="#${c.slug}" class="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-ink underline underline-offset-4 hover:text-iris">Jump to details ${I('arrow-right', 'h-4 w-4')}</a></div></div>`).join('')}</div></div></section>`;
    }
    function matrixTable() {
      const today = nowBD().day;
      const head = ORDER.map(d => `<th scope="col" class="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-widest ${d === today ? 'bg-iris/30 text-white' : 'text-white/70'}">${DAYS[d]}${d === today ? '<span class="block text-aqua">Today</span>' : ''}</th>`).join('');
      const rows = list.map(c => `<tr class="border-t border-white/10"><th scope="row" class="px-4 py-4 text-left align-top font-display text-lg font-light text-white">${E(c.chamberName)}<span class="mt-1 block font-mono text-[11px] uppercase tracking-widest text-white/70">${E(c.area)}</span></th>${ORDER.map(d => {
        const e = c.schedule.filter(s => s.days.includes(d));
        return `<td class="px-4 py-4 align-top text-sm ${d === today ? 'bg-iris/20' : ''} ${e.length ? 'font-semibold text-white' : 'text-white/70'}">${e.length ? e.map(s => `<span class="block">${E(s.hours)}</span>`).join('') : 'Closed'}</td>`;
      }).join('')}</tr>`).join('');
      return `<table class="w-full min-w-[960px] border-collapse"><caption class="sr-only">Weekly chamber schedule, Saturday to Friday</caption><thead><tr><th scope="col" class="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-widest text-white/70">Chamber</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    }
    function renderMatrix() {
      return `<section id="schedule" data-section="schedule" class="${cls.sectionDark} relative"><div class="${cls.container} relative">
        <div class="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora" data-parallax="0.12"></div>
        ${UI.sectionHead({ eyebrow: '02 — The week at a glance', title: 'Saturday to Friday, *one* view', lead: 'Hours shown are consultation times. Days without a chamber are closed. Today is highlighted.', align: 'left', theme: 'dark' })}
        <div data-component="ChamberWeekMatrix" data-reveal="up" class="relative mt-10"><div data-matrix class="${cls.glassDark} overflow-x-auto rounded-3xl">${matrixTable()}</div></div></div></section>`;
    }
    const TABS = [['road', 'Road', 'byRoad'], ['rideshare', 'Rideshare', 'byRideshare'], ['bus', 'Bus', 'byBus'], ['parking', 'Parking', 'parking']];
    function renderDetail(c, i) {
      const dk = i % 2 === 1, th = dk ? 'dark' : 'light', tx = dk ? 'text-white/70' : 'text-ink/70', hd = dk ? 'text-white' : 'text-ink';
      const g = dk ? cls.glassDark : cls.glassLight, rule = dk ? 'border-white/10' : 'border-ink/10';
      const ob = [['bone', 'ring'], ['ball', 'capsule'], ['cross', 'vertebra']][i % 3];
      const words = c.chamberName.split(' '), last = words.pop(), title = `${E(words.join(' '))} <em>${E(last)}</em>`;
      const fact = (ic, k, v) => `<div class="flex gap-3 border-t ${rule} py-3"><span class="mt-0.5 text-iris">${I(ic, 'h-5 w-5')}</span><div><dt class="font-mono text-[11px] uppercase tracking-widest ${tx}">${k}</dt><dd class="mt-1 ${hd}">${v}</dd></div></div>`;
      const dir = `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`, bk = SITE.url.appointment({ chamber: c.slug });
      const b2 = dk ? cls.btnGlass : cls.btnOutline;
      return `<section id="${c.slug}" data-section="${c.slug}" class="${dk ? cls.sectionDark : cls.sectionLight} scroll-mt-24 motion-safe:transition-[transform,opacity]"><div class="${cls.container}" data-component="ChamberDetail">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal="${i % 2 ? 'right' : 'left'}"><div data-stage class="relative mx-auto w-full max-w-xl">
            <div data-depth="20" class="absolute -left-6 -top-8 z-0"><div class="h-40 w-40 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora"></div></div>
            <div data-depth="30" class="relative z-10"><div data-tilt data-tilt-max="8" class="relative overflow-hidden rounded-[2rem] border ${rule} shadow-2xl">${UI.img(c.image, c.chamberName + ' at ' + c.name, 'aspect-[4/3] w-full object-cover', { w: 1200, h: 900 })}<div data-tilt-glare class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_55%)] opacity-0 motion-safe:transition-opacity"></div></div></div>
            <div data-depth="60" class="pointer-events-none absolute -right-6 -top-10 z-20 w-24">${UI.deco(OBJ[ob[0]], 'w-full motion-safe:animate-float3d')}</div>
            <div data-depth="45" class="pointer-events-none absolute -bottom-8 -left-4 z-20 w-20">${UI.deco(OBJ[ob[1]], 'w-full motion-safe:animate-float3d')}</div></div></div>
          <div data-reveal="up">
            ${UI.eyebrow(`0${i + 3} — ${E(c.area)}, ${E(c.city)}`, th)}
            <h2 class="${cls.h2} mt-4 ${hd}">${title}</h2>
            <p class="mt-2 font-mono text-xs uppercase tracking-widest ${tx}">${E(c.name)}</p>
            <div class="mt-4">${pillWrap(c, th)}</div>
            ${c.about.map(p => `<p class="mt-5 leading-relaxed ${tx}">${E(p)}</p>`).join('')}
            <dl class="mt-6">${fact('map-pin', 'Address', `${E(c.address)}<span class="mt-1 block text-sm ${tx}">${E(c.landmark)}</span>`)}
              ${fact('phone', 'Appointments', `<a class="underline underline-offset-4 hover:text-iris" href="tel:${E(c.phone.e164)}">${E(c.phone.display)}</a>`)}
              ${fact('clock', 'Consultation hours', hoursLines(c))}
              ${fact('credit-card', 'Fees', `${UI.formatBDT(c.fee.firstVisit)} first visit · ${UI.formatBDT(c.fee.followUp)} follow-up`)}
              ${fact('bone', 'Surgery', E(c.surgeryDays))}</dl>
            <div class="mt-6 flex flex-wrap gap-3"><a href="${E(bk)}" data-magnetic class="${cls.btnPrimary}">${cls.shine}Book here ${I('arrow-right', 'h-4 w-4')}</a>
              <a href="${dir}" target="_blank" rel="noopener" class="${b2}">${I('navigation', 'h-4 w-4')} Get directions</a>
              <a href="tel:${E(c.phone.e164)}" class="${b2}">${I('phone', 'h-4 w-4')} Call</a>
              <a href="${E(SITE.contact.whatsappUrl)}" target="_blank" rel="noopener" class="${b2}">${I('message-circle', 'h-4 w-4')} WhatsApp</a></div></div></div>
        <div class="mt-16"><h3 class="font-mono text-xs uppercase tracking-widest ${tx}">Facilities</h3>
          <ul class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${c.facilities.map((f, k) => `<li data-reveal="up" data-delay="${k * 80}" class="${g} flex gap-4 rounded-2xl p-5"><span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-iris/20 text-iris">${I(f.icon, 'h-5 w-5')}</span><div><p class="font-semibold ${hd}">${E(f.title)}</p><p class="mt-1 text-sm ${tx}">${E(f.description)}</p></div></li>`).join('')}</ul></div>
        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <div data-tabs data-url-param="directions" class="${g} rounded-3xl p-5"><h3 class="mb-4 font-display text-2xl font-light ${hd}">How to reach</h3>
            <div role="tablist" aria-label="How to reach ${E(c.chamberName)}" class="flex flex-wrap gap-2">${TABS.map((t, k) => `<button type="button" role="tab" data-tab="${t[0]}" aria-selected="${k === 0}" class="min-h-[44px] rounded-full border ${rule} px-4 text-sm font-semibold ${hd} aria-selected:border-iris aria-selected:bg-iris aria-selected:text-white">${t[1]}</button>`).join('')}</div>
            ${TABS.map((t, k) => `<div role="tabpanel" data-tab-panel="${t[0]}" ${k ? 'hidden' : ''} class="mt-4 leading-relaxed ${tx}">${E(c.howToReach[t[2]])}</div>`).join('')}
            <h4 class="mt-6 font-mono text-[11px] uppercase tracking-widest ${tx}">Before you visit</h4>
            <ul class="mt-2 space-y-2">${c.patientTips.map(t => `<li class="flex gap-2 text-sm ${tx}"><span class="mt-0.5 text-mint">${I('check', 'h-4 w-4')}</span>${E(t)}</li>`).join('')}</ul></div>
          <div class="overflow-hidden rounded-3xl border ${rule}"><iframe title="Map of ${E(c.chamberName)}, ${E(c.area)}" src="${E('https://www.google.com/maps?q=' + encodeURIComponent(c.mapQuery) + '&output=embed')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="h-80 w-full lg:h-full lg:min-h-[28rem]"></iframe></div></div>
      </div></section>`;
    }
    function renderCompare() {
      const rows = [['Area', c => `${c.area}, ${c.city}`], ['Schedule', c => hoursLines(c)], ['First visit', c => E(UI.formatBDT(c.fee.firstVisit))], ['Follow-up', c => E(UI.formatBDT(c.fee.followUp))], ['Slot length', c => c.slotMinutes + ' minutes'], ['Facilities', c => E(c.facilities.slice(0, 3).map(f => f.title).join(', '))], ['Appointment line', c => `<a class="underline underline-offset-4" href="tel:${E(c.phone.e164)}">${E(c.phone.display)}</a>`]];
      return `<section id="compare" data-section="compare" class="${cls.sectionDark}"><div class="${cls.container}">
        ${UI.sectionHead({ eyebrow: '06 — Compare', title: 'Which chamber *suits* you?', lead: 'Fees, days and facilities side by side.', align: 'left', theme: 'dark' })}
        <div data-component="ChamberComparison" data-reveal="up" class="${cls.glassDark} mt-10 overflow-x-auto rounded-3xl"><table class="w-full min-w-[760px] border-collapse text-left"><caption class="sr-only">Comparison of the three chambers</caption>
          <thead><tr><th scope="col" class="px-5 py-4 font-mono text-[11px] uppercase tracking-widest text-white/70">&nbsp;</th>${list.map(c => `<th scope="col" class="px-5 py-4 font-display text-xl font-light text-white">${E(c.chamberName)}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(r => `<tr class="border-t border-white/10"><th scope="row" class="px-5 py-4 align-top font-mono text-[11px] uppercase tracking-widest text-white/70">${r[0]}</th>${list.map(c => `<td class="px-5 py-4 align-top text-sm text-white/90">${r[1](c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>`;
    }
    const BRING = ['Photo ID such as NID, passport or birth certificate', 'All previous X-rays, MRI and CT films, plus the written reports', 'Discharge summary or operation notes from any earlier surgery', 'A list of your current medicines and known allergies', 'Recent blood tests, if you have them', 'Insurance or corporate card, if you plan to use one', 'Loose, comfortable clothing for the examination', 'Your booking reference from the confirmation message'];
    function renderBring() {
      return `<section id="bring" data-section="bring" class="${cls.sectionLight} relative"><div class="${cls.container}"><div class="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div data-reveal="left">${UI.sectionHead({ eyebrow: '07 — Be prepared', title: 'What to *bring* with you', lead: 'A few documents help Dr. Nabila make a faster, safer decision at your first visit. Tick them off as you pack.', align: 'left', theme: 'light' })}
          <div class="mt-8 w-28">${UI.deco(OBJ.cross, 'w-full motion-safe:animate-float3d')}</div></div>
        <div data-component="BringChecklist" class="${cls.glassLight} rounded-3xl p-6 sm:p-8" data-stage><div data-depth="15"><ul class="space-y-3">${BRING.map((t, k) => `<li><button type="button" role="checkbox" aria-checked="false" data-action="toggle-item" class="group flex min-h-[44px] w-full items-center gap-4 rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-left motion-safe:transition-[transform,opacity] hover:border-iris focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris aria-checked:border-iris aria-checked:bg-iris/10"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/30 text-transparent motion-safe:transition-[transform,opacity] group-aria-checked:border-iris group-aria-checked:bg-iris group-aria-checked:text-white">${I('check', 'h-4 w-4')}</span><span class="text-ink/80">${E(t)}</span></button></li>`).join('')}</ul>
          <p data-bring-count role="status" aria-live="polite" class="mt-5 font-mono text-xs uppercase tracking-widest text-ink/70">0 of ${BRING.length} ready</p></div></div></div></div></section>`;
    }
    function tick() {
      UI.qsa('[data-open-pill]', root).forEach(el => { const c = bySlug[el.dataset.openPill]; if (c) el.innerHTML = pill(c, el.dataset.theme); });
      const m = UI.qs('[data-matrix]', root); if (m) m.innerHTML = matrixTable();
    }
    function jump() {
      const id = decodeURIComponent(location.hash.slice(1)), el = bySlug[id] && document.getElementById(id);
      if (!el) return;
      const r = ['ring-4', 'ring-iris/40', 'ring-inset'];
      el.scrollIntoView({ behavior: FX.reduced() ? 'auto' : 'smooth', block: 'start' });
      el.classList.add(...r); setTimeout(() => el.classList.remove(...r), 2000);
    }

    UI.qs('#page-hero').innerHTML = UI.pageHero({ eyebrow: 'Chambers', title: 'Three chambers. *One* standard of care.', lead: 'Consult Dr. Nabila Rahman at GEC Circle and Khulshi in Chattogram, or at Banani in Dhaka. See live opening status, fees, facilities and directions for each.', actionsHTML: `<a href="appointment.html" data-magnetic class="${cls.btnPrimary}">${cls.shine}Book an appointment ${I('arrow-right', 'h-4 w-4')}</a><a href="tel:${E(PH.e164)}" class="${cls.btnGlass}">${I('phone', 'h-4 w-4')} ${E(PH.display)}</a>` });
    root.innerHTML = renderOverview() + renderMatrix() + list.map(renderDetail).join('') + renderCompare() + renderBring() + UI.ctaBand({ title: 'Ready to see Dr. Nabila?', lead: 'Choose a chamber, pick a time and get your confirmation in minutes. Our desk is open Saturday to Thursday, 9:00 AM – 8:00 PM.', primaryLabel: 'Book an appointment', primaryHref: 'appointment.html', secondaryLabel: 'Call the appointment desk', secondaryHref: 'tel:' + PH.e164 });
    UI.mount(document.getElementById('main'));
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-action="toggle-item"]'); if (!b) return;
      b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true'));
      UI.qs('[data-bring-count]', root).textContent = UI.qsa('[data-action="toggle-item"][aria-checked="true"]', root).length + ' of ' + BRING.length + ' ready';
    });
    tick(); setInterval(tick, 60000);
    window.addEventListener('hashchange', jump); setTimeout(jump, 400);
  });
})();
