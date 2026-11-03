/* js/pages/appointment.js · Owner Part 4 · Five-step booking wizard + confirmation · Depends on SITE, UI */
(function () {
  'use strict';
  UI.ready(function () {
    const mount = UI.qs('#booking-mount');
    if (!mount) return;
    const E = UI.esc, I = UI.icon, cls = UI.cls, OBJ = SITE.img.objects, KEY = 'ortho:booking', RANGE = 59, PH = SITE.contact.phone;
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const STEPS = ['Visit', 'Chamber', 'Date & time', 'Your details', 'Review'];
    const TYPES = [
      { id: 'new', label: 'New consultation', desc: 'A first visit for a new problem, with a full examination.', icon: 'stethoscope' },
      { id: 'follow-up', label: 'Follow-up', desc: 'A review within 14 days of your last visit.', icon: 'activity' },
      { id: 'second-opinion', label: 'Second opinion', desc: 'Bring your scans and reports for a fresh expert view.', icon: 'file-text' },
      { id: 'post-op', label: 'Post-operative check', desc: 'Wound, movement and rehabilitation review after surgery.', icon: 'shield' }];
    const PAY = [['pay-at-chamber', 'Pay at chamber'], ['bkash', 'bKash'], ['nagad', 'Nagad'], ['card-at-chamber', 'Card at chamber']];
    const SERVICES = SITE.servicesIndex.concat([{ slug: 'general', name: 'Not sure yet — general consultation', icon: 'stethoscope', short: 'Describe your concern and Dr. Nabila will advise the right next step.' }]);

    /* ---------- helpers ---------- */
    const pad = n => String(n).padStart(2, '0');
    const chamberOf = s => SITE.chambersIndex.find(c => c.slug === s);
    const serviceOf = s => SERVICES.find(x => x.slug === s);
    const feeFor = (c, t) => (['follow-up', 'post-op'].includes(t || state.type) ? c.fee.followUp : c.fee.firstVisit);
    const bd = () => { const p = {}; new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).forEach(x => { p[x.type] = x.value; }); return { date: `${p.year}-${p.month}-${p.day}`, min: (+p.hour % 24) * 60 + +p.minute }; };
    const addDays = (iso, n) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
    const wd = iso => new Date(iso + 'T00:00:00Z').getUTCDay();
    const toMin = s => { const m = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(s || ''); if (!m) return 0; let h = +m[1]; const p = (m[3] || '').toUpperCase(); if (p === 'PM' && h < 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h * 60 + +m[2]; };
    const fmt = min => { let h = Math.floor(min / 60); const m = min % 60; const s = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${pad(m)} ${s}`; };
    const dateLabel = iso => `${DAYS[wd(iso)]}, ${UI.formatDate(iso, 'long')}`;
    const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h; };
    const slotsFor = (ch, iso) => {
      const now = bd(), out = [];
      if (iso < now.date) return out;
      ch.schedule.filter(s => s.days.includes(wd(iso))).forEach(s => {
        for (let m = toMin(s.start); m + ch.slotMinutes <= toMin(s.end); m += ch.slotMinutes) {
          if (iso === now.date && m <= now.min) continue;
          const hm = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
          out.push({ min: m, hm, label: fmt(m), booked: hash(ch.slug + iso + hm) % 4 === 0 });
        }
      });
      return out.sort((a, b) => a.min - b.min);
    };
    const avail = (ch, iso) => slotsFor(ch, iso).filter(s => !s.booked).length;
    const e164 = p => { const s = String(p).replace(/[^\d+]/g, ''); return s.startsWith('+') ? s : s.startsWith('880') ? '+' + s : '+88' + s; };

    /* ---------- state ---------- */
    const base = { step: 1, type: 'new', service: '', chamber: '', date: '', time: '', view: '', focus: '', payment: 'pay-at-chamber', d: { fullName: '', age: '', gender: '', phone: '', email: '', area: '', bookingFor: 'Myself', patientRelation: '', problemSummary: '', hasReports: false, consent: false } };
    const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
    const saved = load();
    const state = Object.assign({}, base, saved, { d: Object.assign({}, base.d, saved.d), busy: false, done: null });
    const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify({ step: state.step, type: state.type, service: state.service, chamber: state.chamber, date: state.date, time: state.time, payment: state.payment, d: state.d })); } catch (e) { /* storage unavailable */ } };
    const detailsOk = () => { const d = state.d, a = +d.age; return d.fullName.trim().length > 1 && Number.isInteger(a) && a >= 1 && a <= 110 && !!d.gender && UI.isBDPhone(d.phone) && (!d.email || /^\S+@\S+\.\S+$/.test(d.email)) && d.area.trim().length > 1 && (d.bookingFor === 'Myself' || d.patientRelation.trim().length > 1) && d.problemSummary.trim().length >= 15 && d.consent; };
    const firstIncomplete = () => (!state.type || !state.service ? 1 : !state.chamber ? 2 : !state.date || !state.time ? 3 : !detailsOk() ? 4 : 5);
    function sanitize() {
      const t = bd().date;
      if (state.date && (state.date < t || state.date > addDays(t, RANGE))) { state.date = ''; state.time = ''; }
      const ch = chamberOf(state.chamber);
      if (ch && state.date && !ch.schedule.some(s => s.days.includes(wd(state.date)))) { state.date = ''; state.time = ''; }
      if (ch && state.date && state.time && !slotsFor(ch, state.date).some(s => s.hm === state.time && !s.booked)) state.time = '';
      if (!state.date) state.time = '';
    }
    const P = n => UI.getParam(n);
    let fromUrl = false;
    if (TYPES.some(t => t.id === P('type'))) { state.type = P('type'); fromUrl = true; }
    if (serviceOf(P('service'))) { state.service = P('service'); fromUrl = true; }
    if (chamberOf(P('chamber'))) { state.chamber = P('chamber'); fromUrl = true; }
    if (/^\d{4}-\d{2}-\d{2}$/.test(P('date') || '')) { state.date = P('date'); state.time = ''; fromUrl = true; }
    sanitize();
    state.step = fromUrl ? firstIncomplete() : Math.max(1, Math.min(+state.step || 1, firstIncomplete()));

    /* ---------- skeleton ---------- */
    UI.qs('#page-hero').innerHTML = UI.pageHero({ eyebrow: 'Appointments', title: 'Book your *visit* in five steps', lead: 'Choose a treatment, a chamber and a time that suits you. No payment is taken online.' });
    const deco = (o, pos, depth) => `<div data-depth="${depth}" class="pointer-events-none absolute z-0 ${pos}" aria-hidden="true">${UI.deco(OBJ[o], 'w-full motion-safe:animate-float3d')}</div>`;
    mount.innerHTML = `<section id="booking" data-section="booking" class="${cls.sectionLight} !overflow-x-clip !overflow-y-visible"><div class="${cls.container}"><div data-stage class="relative">
      ${deco('ring', '-right-4 -top-16 hidden w-28 sm:block', 30)}${deco('capsule', '-left-8 top-1/3 hidden w-20 lg:block', 50)}${deco('bone', 'left-1/2 -bottom-12 hidden w-24 md:block', 20)}
      <div id="bk-main" class="relative z-10">
        <details class="${cls.glassLight} mb-5 rounded-2xl lg:hidden"><summary class="flex min-h-[44px] cursor-pointer items-center justify-between px-5 font-semibold">Booking summary ${I('chevron-down', 'h-4 w-4')}</summary><div data-summary class="px-5 pb-5"></div></details>
        <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div id="bk-wizard" data-component="BookingWizard" class="${cls.glassLight} rounded-[2rem] p-5 sm:p-8">
            <div id="bk-ind"></div>
            <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-label="Booking progress" aria-valuemin="1" aria-valuemax="5" id="bk-pb"><div id="bk-pbf" class="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-iris to-aqua motion-safe:transition-transform duration-700"></div></div>
            <p id="bk-live" class="sr-only" role="status" aria-live="polite"></p>
            <div id="bk-step" class="mt-8"></div></div>
          <aside class="hidden lg:sticky lg:top-28 lg:block" aria-label="Booking summary"><div data-summary data-component="BookingSummary" class="${cls.glassLight} rounded-[2rem] p-6"></div></aside></div></div>
      <div id="bk-done" hidden></div></div></div></section>`;
    const $ = s => UI.qs(s, mount);
    UI.mount(mount);

    /* ---------- summary / indicator ---------- */
    function upd() {
      const c = chamberOf(state.chamber), sv = serviceOf(state.service), ty = TYPES.find(t => t.id === state.type);
      const r = (k, v) => `<div class="flex items-start justify-between gap-4 border-b border-ink/10 py-3"><dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">${k}</dt><dd class="text-right text-sm ${v ? 'font-semibold text-ink' : 'text-ink/60'}">${v ? E(v) : 'Not chosen yet'}</dd></div>`;
      const chip = t => `<span class="rounded-full border border-ink/10 bg-white/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink/70">${t}</span>`;
      const h = `<h2 class="font-display text-2xl font-light text-ink">Your booking</h2><dl class="mt-3">${r('Visit', ty && ty.label)}${r('Treatment', sv && sv.name)}${r('Chamber', c && `${c.chamberName}, ${c.area}`)}${r('Date', state.date && dateLabel(state.date))}${r('Time', state.time && fmt(toMin(state.time)))}${r('Fee', c && UI.formatBDT(feeFor(c)))}</dl>
        <div class="mt-5 flex items-center gap-3">${UI.img(SITE.img.portrait, SITE.doctor.name, 'h-14 w-14 rounded-full bg-aurora-dark object-cover object-top', { w: 112, h: 112 })}<div><p class="font-semibold text-ink">${E(SITE.doctor.shortName)}</p><p class="text-xs text-ink/70">${E(SITE.doctor.specialty)}</p></div></div>
        <div class="mt-5 flex flex-wrap gap-2">${chip('No online payment')}${chip('BMDC ' + E(SITE.doctor.bmdcNo))}${chip('Free rescheduling')}</div>
        <div class="mt-5 rounded-2xl bg-iris/10 p-4 text-sm text-ink/80"><p class="font-semibold">Need help booking?</p><div class="mt-2 flex flex-wrap gap-x-5 gap-y-1"><a class="inline-flex min-h-[44px] items-center gap-2 underline underline-offset-4" href="tel:${E(PH.e164)}">${I('phone', 'h-4 w-4')} ${E(PH.display)}</a><a class="inline-flex min-h-[44px] items-center gap-2 underline underline-offset-4" href="${E(SITE.contact.whatsappUrl)}" target="_blank" rel="noopener">${I('message-circle', 'h-4 w-4')} WhatsApp</a></div></div>`;
      UI.qsa('[data-summary]', mount).forEach(el => { el.innerHTML = h; });
    }
    function indicator() {
      $('#bk-ind').innerHTML = `<ol class="flex items-center gap-2">${STEPS.map((l, i) => {
        const n = i + 1, cur = n === state.step, dn = n < state.step;
        const dot = dn ? `<button type="button" data-action="goto" data-step="${n}" aria-label="Step ${n}, ${l}, completed. Edit" class="flex h-11 w-11 items-center justify-center rounded-full bg-mint/20 text-emerald-800 motion-safe:transition-[transform,opacity] hover:bg-mint/40">${I('check', 'h-5 w-5')}</button>` : `<span class="flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm ${cur ? 'bg-iris text-white shadow-[0_10px_30px_-8px_rgba(124,92,255,.8)]' : 'bg-ink/5 text-ink/60'}">${n}</span>`;
        return `<li class="flex items-center gap-2 ${i < 4 ? 'flex-1' : ''}" ${cur ? 'aria-current="step"' : ''}>${dot}<span class="hidden font-mono text-[11px] uppercase tracking-widest sm:inline ${cur ? 'text-ink' : 'text-ink/60'}">${l}</span>${i < 4 ? '<span class="h-px flex-1 bg-ink/15"></span>' : ''}</li>`;
      }).join('')}</ol><p class="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/70 sm:hidden">Step ${state.step} of 5 — ${STEPS[state.step - 1]}</p>`;
      $('#bk-pb').setAttribute('aria-valuenow', state.step);
      $('#bk-pbf').style.transform = 'scaleX(' + (state.step / 5) + ')';
    }

    /* ---------- step markup ---------- */
    const hd = t => `<p class="font-mono text-[11px] uppercase tracking-widest text-ink/70">Step ${state.step} of 5</p><h2 id="bk-h" tabindex="-1" class="${cls.h3} mt-1 text-ink focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-iris">${t}</h2>`;
    const lg = t => `<legend class="font-mono text-xs uppercase tracking-widest text-ink/70">${t}</legend>`;
    const card = (name, val, checked, inner) => `<label class="group relative block cursor-pointer"><input type="radio" class="peer sr-only" name="${name}" value="${E(val)}" data-field="${name}" ${checked ? 'checked' : ''}><span data-tilt data-tilt-max="6" class="relative block h-full rounded-2xl border border-ink/10 bg-white/70 p-4 motion-safe:transition-[transform,opacity] peer-checked:border-iris peer-checked:bg-iris/10 peer-checked:ring-2 peer-checked:ring-iris peer-checked:shadow-[0_20px_50px_-18px_rgba(124,92,255,.7)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-iris">${inner}<span class="absolute right-3 top-3 hidden h-6 w-6 items-center justify-center rounded-full bg-iris text-white group-has-[:checked]:flex">${I('check', 'h-4 w-4')}</span><span data-tilt-glare class="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.5),transparent_60%)] opacity-0 motion-safe:transition-opacity"></span></span></label>`;
    const s1 = () => `${hd('What brings you in?')}
      <fieldset class="mt-6">${lg('Type of visit')}<div class="mt-3 grid gap-3 sm:grid-cols-2">${TYPES.map(t => card('type', t.id, state.type === t.id, `${I(t.icon, 'h-6 w-6 text-iris')}<span class="mt-3 block font-semibold text-ink">${t.label}</span><span class="mt-1 block text-sm text-ink/70">${t.desc}</span>`)).join('')}</div></fieldset>
      <fieldset class="mt-8">${lg('Treatment area')}<div class="mt-3 grid gap-3 sm:grid-cols-2">${SERVICES.map(s => card('service', s.slug, state.service === s.slug, `${I(s.icon || 'bone', 'h-6 w-6 text-iris')}<span class="mt-3 block pr-6 font-semibold text-ink">${E(s.name)}</span><span class="mt-1 block text-sm text-ink/70">${E(s.short)}</span>`)).join('')}</div></fieldset>`;
    const s2 = () => `${hd('Choose your chamber')}<p class="mt-2 text-ink/70">Fees shown are for your selected visit type.</p>
      <fieldset class="mt-6"><legend class="sr-only">Chamber</legend><div class="grid gap-4">${SITE.chambersIndex.map(c => card('chamber', c.slug, state.chamber === c.slug, `<span class="grid gap-4 sm:grid-cols-[170px_1fr]">${UI.img(c.image, c.chamberName, 'h-32 w-full rounded-xl object-cover', { w: 340, h: 256 })}<span class="block pr-6"><span class="block font-display text-xl text-ink">${E(c.chamberName)}</span><span class="mt-1 block font-mono text-[11px] uppercase tracking-widest text-ink/70">${E(c.area)}, ${E(c.city)}</span>${c.schedule.map(s => `<span class="mt-2 block text-sm text-ink/80">${E(s.label)} · ${E(s.hours)}</span>`).join('')}<span class="mt-3 inline-block rounded-full bg-ink px-3 py-1 text-sm font-semibold text-white">${E(UI.formatBDT(feeFor(c)))}</span></span></span>`)).join('')}</div></fieldset>`;
    const s3 = () => `${hd('Pick a date and time')}
      <div class="mt-4 flex flex-wrap items-center gap-3"><button type="button" data-action="earliest" class="${cls.btnOutline}">${I('sparkles', 'h-4 w-4')} Earliest available</button><span class="text-sm text-ink/70">Open days in the next 60 days are selectable.</span></div>
      <div class="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><div id="bk-cal"></div><div id="bk-slots"></div></div>`;
    function renderCal() {
      const ch = chamberOf(state.chamber), t = bd().date, last = addDays(t, RANGE);
      const y = +state.view.slice(0, 4), m = +state.view.slice(5, 7) - 1, dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), off = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 1) % 7;
      const iso = d => `${y}-${pad(m + 1)}-${pad(d)}`;
      const st = d => { const s = iso(d); if (s < t || s > last) return 'out'; if (!ch.schedule.some(x => x.days.includes(wd(s)))) return 'closed'; return avail(ch, s) ? 'open' : 'full'; };
      const sts = Array.from({ length: dim }, (_, k) => st(k + 1));
      const fo = sts.indexOf('open');
      const tab = state.focus && state.focus.startsWith(state.view) ? state.focus : state.date && state.date.startsWith(state.view) ? state.date : iso(fo + 1 || 1);
      const month = new Date(Date.UTC(y, m, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
      const label = { out: 'unavailable', closed: 'closed', full: 'fully booked', open: 'available' };
      const cells = Array(off).fill('<span role="presentation"></span>').concat(sts.map((s, k) => {
        const d = k + 1, v = iso(d), sel = v === state.date, dis = s !== 'open';
        const c = sel ? 'bg-iris text-white shadow-[0_10px_30px_-8px_rgba(124,92,255,.8)]' : s === 'open' ? 'text-ink hover:bg-iris/15' : s === 'full' ? 'text-ink/60 line-through' : 'text-ink/30';
        return `<button type="button" role="gridcell" data-action="pick-date" data-date="${v}" tabindex="${v === tab ? 0 : -1}" aria-selected="${sel}" ${dis ? 'aria-disabled="true"' : ''} aria-label="${DAYS[wd(v)]} ${d} ${month}, ${label[s]}" class="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold motion-safe:transition-[transform,opacity] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris ${v === t ? 'ring-1 ring-iris' : ''} ${c}">${d}</button>`;
      }));
      const rows = []; for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
      const arrow = (a, ic, dis) => `<button type="button" data-action="${a}" ${dis ? 'disabled' : ''} aria-label="${a === 'cal-prev' ? 'Previous' : 'Next'} month" class="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 motion-safe:transition-[transform,opacity] hover:border-iris disabled:opacity-30">${I(ic, 'h-4 w-4')}</button>`;
      $('#bk-cal').innerHTML = `<div class="rounded-2xl border border-ink/10 bg-white/60 p-4"><div class="flex items-center justify-between">${arrow('cal-prev', 'chevron-left', state.view <= t.slice(0, 7))}<h3 id="bk-month" aria-live="polite" class="font-display text-xl text-ink">${month}</h3>${arrow('cal-next', 'chevron-right', state.view >= last.slice(0, 7))}</div>
        <div role="grid" aria-labelledby="bk-month" class="mt-3"><div role="row" class="grid grid-cols-7">${['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(n => `<div role="columnheader" aria-label="${n}" class="py-2 text-center font-mono text-[11px] uppercase tracking-widest text-ink/70">${n.slice(0, 3)}</div>`).join('')}</div>${rows.map(r => `<div role="row" class="grid grid-cols-7 gap-y-1">${r.join('')}</div>`).join('')}</div>
        <p class="mt-3 text-xs text-ink/70">Arrow keys move between days. Closed and fully booked days are disabled.</p></div>`;
    }
    function renderSlots() {
      const ch = chamberOf(state.chamber), box = $('#bk-slots');
      if (!state.date) { box.innerHTML = '<p class="rounded-2xl border border-dashed border-ink/20 p-6 text-sm text-ink/70">Pick a date to see the available times.</p>'; return; }
      const sl = slotsFor(ch, state.date), n = sl.filter(s => !s.booked).length;
      box.innerHTML = `<h3 class="font-display text-xl text-ink">${E(dateLabel(state.date))}</h3><p aria-live="polite" class="mt-1 text-sm font-semibold text-ink/70">${n} of ${sl.length} slots available</p>
        <div role="radiogroup" aria-label="Available times" class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">${sl.map(s => `<button type="button" role="radio" data-action="pick-time" data-time="${s.hm}" aria-checked="${state.time === s.hm}" ${s.booked ? 'disabled' : ''} class="min-h-[44px] rounded-xl border px-3 py-1 text-sm font-semibold motion-safe:transition-[transform,opacity] ${s.booked ? 'cursor-not-allowed border-ink/10 text-ink/50 line-through' : 'border-ink/15 text-ink hover:border-iris aria-checked:border-iris aria-checked:bg-iris aria-checked:text-white'}">${s.label}${s.booked ? '<span class="block font-mono text-[10px] uppercase no-underline">Booked</span>' : ''}</button>`).join('')}</div>`;
    }
    function earliest() {
      const ch = chamberOf(state.chamber), t = bd().date;
      for (let i = 0; i <= RANGE; i++) {
        const s = addDays(t, i), f = slotsFor(ch, s).find(x => !x.booked);
        if (f) { state.date = s; state.time = f.hm; state.view = s.slice(0, 7); state.focus = s; renderCal(); renderSlots(); upd(); save(); UI.toast('Earliest slot selected: ' + dateLabel(s) + ', ' + f.label, 'success'); return; }
      }
      UI.toast('No open slots in the next 60 days. Please call our desk.', 'info');
    }
    const field = o => UI.field(Object.assign({ theme: 'light' }, o));
    const pill = (name, val) => `<label class="relative cursor-pointer"><input type="radio" class="peer sr-only" name="${name}" value="${val}" ${state.d[name] === val ? 'checked' : ''}><span class="flex min-h-[44px] items-center rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink motion-safe:transition-[transform,opacity] peer-checked:border-iris peer-checked:bg-iris peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-iris">${val}</span></label>`;
    const s4 = () => { const d = state.d; return `${hd('Tell us about the patient')}<form data-form="details" novalidate class="mt-6 grid gap-5 sm:grid-cols-2">
      ${field({ label: 'Full name', name: 'fullName', required: true, autocomplete: 'name', value: d.fullName })}
      ${field({ label: 'Age', name: 'age', type: 'number', required: true, min: 1, max: 110, value: d.age })}
      <fieldset class="sm:col-span-2">${lg('Gender')}<div class="mt-2 flex flex-wrap gap-3">${['Female', 'Male', 'Other'].map(g => pill('gender', g)).join('')}</div><p data-error-for="gender" role="alert" class="mt-1 text-sm text-red-700"></p></fieldset>
      ${field({ label: 'Mobile number', name: 'phone', type: 'tel', required: true, validate: 'bd-phone', autocomplete: 'tel', placeholder: 'e.g. 01711 223344…', value: d.phone, hint: 'Your confirmation is sent here.' })}
      ${field({ label: 'Email (optional)', name: 'email', type: 'email', autocomplete: 'email', value: d.email })}
      ${field({ label: 'Area', name: 'area', required: true, placeholder: 'e.g. Nasirabad, Khulshi, Banani…', value: d.area })}
      <fieldset>${lg('Booking for')}<div class="mt-2 flex flex-wrap gap-3">${['Myself', 'Family member'].map(g => pill('bookingFor', g)).join('')}</div></fieldset>
      ${d.bookingFor === 'Family member' ? `<div class="sm:col-span-2">${field({ label: 'Relationship to the patient', name: 'patientRelation', required: true, placeholder: 'e.g. Mother, son, spouse…', value: d.patientRelation })}</div>` : ''}
      <div class="sm:col-span-2">${field({ label: 'What is the problem?', name: 'problemSummary', type: 'textarea', required: true, rows: 4, minlength: 15, value: d.problemSummary, hint: 'Where it hurts, since when, and any injury or earlier treatment.' })}</div>
      <div class="sm:col-span-2">${field({ label: 'I have X-rays, MRI or other reports to bring', name: 'hasReports', type: 'checkbox' })}</div>
      <div class="sm:col-span-2">${field({ label: 'Consent', name: 'consent', type: 'checkbox', required: true, labelHTML: 'I agree that the clinic may contact me about this booking and keep these details for my care.' })}</div></form>`; };
    const s5 = () => {
      const c = chamberOf(state.chamber), sv = serviceOf(state.service), d = state.d, ty = TYPES.find(t => t.id === state.type);
      const rw = (k, v, st) => `<div class="flex items-start justify-between gap-4 border-b border-ink/10 py-3"><div><dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">${k}</dt><dd class="mt-1 font-semibold text-ink">${v}</dd></div><button type="button" data-action="goto" data-step="${st}" class="min-h-[44px] px-2 text-sm font-semibold text-iris underline underline-offset-4">Edit<span class="sr-only"> ${k}</span></button></div>`;
      return `${hd('Review and confirm')}<dl class="mt-4">${rw('Visit', `${E(ty.label)} · ${E(sv.name)}`, 1)}${rw('Chamber', `${E(c.chamberName)}, ${E(c.area)}<span class="block text-sm font-normal text-ink/70">${E(c.address)}</span>`, 2)}${rw('Date & time', `${E(dateLabel(state.date))} · ${fmt(toMin(state.time))}`, 3)}${rw('Patient', `${E(d.fullName)}, ${E(d.age)} · ${E(d.gender)}<span class="block text-sm font-normal text-ink/70">${E(d.phone)} · ${E(d.area)}${d.bookingFor === 'Family member' ? ' · booked by ' + E(d.patientRelation) : ''}</span>`, 4)}${rw('Concern', E(d.problemSummary), 4)}</dl>
        <div class="mt-5 flex items-center justify-between rounded-2xl bg-ink p-5 text-white"><span class="font-mono text-xs uppercase tracking-widest text-white/70">Consultation fee</span><span class="font-display text-3xl font-light">${E(UI.formatBDT(feeFor(c)))}</span></div>
        <fieldset class="mt-6">${lg('How will you pay?')}<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">${PAY.map(p => `<label class="relative cursor-pointer"><input type="radio" class="peer sr-only" name="payment" value="${p[0]}" data-field="payment" ${state.payment === p[0] ? 'checked' : ''}><span class="flex min-h-[44px] items-center justify-center rounded-xl border border-ink/15 px-3 text-center text-sm font-semibold text-ink motion-safe:transition-[transform,opacity] peer-checked:border-iris peer-checked:bg-iris/10 peer-checked:ring-2 peer-checked:ring-iris peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-iris">${p[1]}</span></label>`).join('')}</div>
          <p class="mt-3 flex gap-2 text-sm text-ink/70">${I('info', 'h-4 w-4 shrink-0 mt-0.5')} This is a preference only. No payment is taken online; you pay at the chamber desk.</p></fieldset>
        <p class="mt-4 text-sm text-ink/70">Need to change plans? Call or WhatsApp us at least 12 hours before your slot and we will move your appointment at no charge.</p>`;
    };
    const nav = () => `<p id="bk-err" role="alert" class="mt-6 min-h-[1.5rem] text-sm font-semibold text-red-700"></p><div class="mt-2 flex items-center justify-between gap-3">${state.step > 1 ? `<button type="button" data-action="back" class="${cls.btnOutline}">${I('arrow-left', 'h-4 w-4')} Back</button>` : '<span></span>'}<button type="button" data-action="next" data-magnetic class="${cls.btnPrimary}">${cls.shine}${state.step === 5 ? 'Confirm appointment' : 'Continue'} ${I(state.step === 5 ? 'check' : 'arrow-right', 'h-4 w-4')}</button></div>`;

    /* ---------- render / validate ---------- */
    function render(focus) {
      $('#bk-step').innerHTML = `<div class="motion-safe:animate-fade-up">${[s1, s2, s3, s4, s5][state.step - 1]()}${nav()}</div>`;
      if (state.step === 3) { state.view = (state.date || bd().date).slice(0, 7); renderCal(); renderSlots(); }
      if (state.step === 4) { const f = UI.qs('form', mount); ['hasReports', 'consent'].forEach(n => { if (f.elements[n]) f.elements[n].checked = !!state.d[n]; }); }
      indicator(); upd(); UI.mount($('#bk-step'));
      $('#bk-live').textContent = `Step ${state.step} of 5: ${STEPS[state.step - 1]}`;
      if (focus) $('#bk-h').focus();
      save();
    }
    const showErr = m => { const el = $('#bk-err'); if (el) el.textContent = m; };
    function validate(n) {
      if (n === 1) return state.type && state.service ? '' : 'Choose a visit type and a treatment area to continue.';
      if (n === 2) return state.chamber ? '' : 'Choose a chamber to continue.';
      if (n === 3) return !state.date ? 'Pick an available date.' : !state.time ? 'Pick a time slot.' : '';
      if (n === 4) {
        const f = UI.qs('form', mount); syncAll(f);
        let ok = UI.validateForm(f);
        const ge = UI.qs('[data-error-for="gender"]', f); if (ge) ge.textContent = state.d.gender ? '' : 'Please select a gender.';
        ok = ok && detailsOk();
        return ok ? '' : 'Please complete the highlighted details.';
      }
      return '';
    }
    function syncField(el) {
      if (!el.name) return;
      if (el.type === 'checkbox') state.d[el.name] = el.checked;
      else if (el.type !== 'radio' || el.checked) state.d[el.name] = el.value;
      if (el.name === 'bookingFor' && el.value === 'Myself') state.d.patientRelation = '';
    }
    const syncAll = f => Array.from(f.elements).forEach(syncField);
    const persist = UI.debounce(save, 300);

    /* ---------- submit / confirmation ---------- */
    function buildPayload() {
      const d = state.d, c = chamberOf(state.chamber);
      return { visitType: state.type, serviceSlug: state.service, chamberSlug: c.slug, date: state.date, time: state.time, timeLabel: fmt(toMin(state.time)), slotMinutes: c.slotMinutes, feeBDT: feeFor(c), paymentPreference: state.payment,
        patient: { fullName: d.fullName.trim(), age: parseInt(d.age, 10), gender: d.gender, phone: e164(d.phone), email: d.email.trim(), area: d.area.trim(), bookingFor: d.bookingFor, patientRelation: d.patientRelation.trim() },
        problemSummary: d.problemSummary.trim(), hasReports: !!d.hasReports, consent: true, source: 'website', submittedAt: new Date().toISOString() };
    }
    function submit() {
      if (state.busy) return;
      const btn = $('[data-action="next"]'), label = btn.innerHTML;
      state.busy = true; btn.disabled = true; btn.textContent = 'Confirming…';
      const payload = buildPayload();
      SITE.submit('appointment', payload).then(r => { if (!r || !r.ok) throw new Error('rejected'); finish(r.id, payload); }).catch(() => {
        state.busy = false; btn.disabled = false; btn.innerHTML = label;
        UI.toast('We could not confirm your booking. Please try again or call ' + PH.display + '.', 'error');
      });
    }
    function finish(id, p) {
      const tail = (String(id).replace(/[^A-Za-z0-9]/g, '').toUpperCase() + '0000').slice(0, 4);
      state.done = { ref: `ORT-${bd().date.slice(2).replace(/-/g, '')}-${tail}`, payload: p };
      try { sessionStorage.removeItem(KEY); } catch (e) { /* storage unavailable */ }
      const c = chamberOf(p.chamberSlug), sv = serviceOf(p.serviceSlug), row = (k, v) => `<div class="flex justify-between gap-4 border-b border-ink/10 py-3 text-left"><dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">${k}</dt><dd class="text-right text-sm font-semibold text-ink">${v}</dd></div>`;
      const b = `${cls.btnOutline} print:hidden`;
      $('#bk-main').hidden = true;
      const done = $('#bk-done'); done.hidden = false;
      done.innerHTML = `<div data-component="BookingConfirmation" class="${cls.glassLight} mx-auto max-w-3xl rounded-[2rem] p-8 text-center motion-safe:animate-fade-up sm:p-12">
        <svg viewBox="0 0 52 52" class="mx-auto h-24 w-24 motion-safe:animate-zoom-in" aria-hidden="true"><circle cx="26" cy="26" r="24" pathLength="100" fill="none" stroke="#34D399" stroke-width="3" class="motion-safe:animate-draw"/><path d="M14 27l8 8 16-17" pathLength="100" fill="none" stroke="#34D399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="motion-safe:animate-draw"/></svg>
        <h2 id="bk-done-h" tabindex="-1" class="${cls.h2} mt-6 text-ink focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-iris">Your appointment is <em>booked</em></h2>
        <p class="mt-3 text-ink/70">Reference number</p><p class="mt-1 font-mono text-2xl tracking-widest text-ink">${E(state.done.ref)}</p>
        <p class="mt-4 text-ink/80">Please arrive 15 minutes early and bring your reports and photo ID. A confirmation will be sent to ${E(p.patient.phone)}.</p>
        <dl class="mt-8">${row('Patient', E(p.patient.fullName))}${row('Treatment', E(sv.name))}${row('Chamber', `${E(c.chamberName)}<span class="block font-normal text-ink/70">${E(c.address)}</span>`)}${row('Date', E(dateLabel(p.date)))}${row('Time', E(p.timeLabel))}${row('Fee', `${E(UI.formatBDT(p.feeBDT))} · ${E(PAY.find(x => x[0] === p.paymentPreference)[1])}`)}${row('Chamber phone', `<a class="underline underline-offset-4" href="tel:${E(c.phone.e164)}">${E(c.phone.display)}</a>`)}</dl>
        <div class="mt-8 flex flex-wrap justify-center gap-3"><button type="button" data-action="ics" class="${cls.btnPrimary} print:hidden">${cls.shine}${I('calendar', 'h-4 w-4')} Add to calendar</button><button type="button" data-action="print" class="${b}">${I('printer', 'h-4 w-4')} Print</button><button type="button" data-action="wa" class="${b}">${I('share', 'h-4 w-4')} Share on WhatsApp</button><button type="button" data-action="again" class="${b}">${I('plus', 'h-4 w-4')} Book another</button></div></div>`;
      UI.mount(done); $('#bk-done-h').focus();
    }
    function ics() {
      const { ref, payload: p } = state.done, c = chamberOf(p.chamberSlug), day = p.date.replace(/-/g, ''), end = toMin(p.time) + c.slotMinutes;
      const x = t => String(t).replace(/[\\;,]/g, '\\$&').replace(/\n/g, '\\n');
      const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dr Nabila Rahman//Appointments//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VTIMEZONE', 'TZID:Asia/Dhaka', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0600', 'TZOFFSETTO:+0600', 'TZNAME:BST', 'END:STANDARD', 'END:VTIMEZONE', 'BEGIN:VEVENT',
        `UID:${ref}@drnabilarahman.com`, 'DTSTAMP:' + new Date().toISOString().replace(/[-:]|\.\d{3}/g, ''), `DTSTART;TZID=Asia/Dhaka:${day}T${p.time.replace(':', '')}00`, `DTEND;TZID=Asia/Dhaka:${day}T${pad(Math.floor(end / 60))}${pad(end % 60)}00`,
        'SUMMARY:' + x('Appointment with ' + SITE.doctor.shortName), 'LOCATION:' + x(c.chamberName + ', ' + c.address), 'DESCRIPTION:' + x(`Reference ${ref}. Arrive 15 minutes early. Phone ${c.phone.display}.`), 'BEGIN:VALARM', 'TRIGGER:-PT1H', 'ACTION:DISPLAY', 'DESCRIPTION:Appointment in one hour', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'];
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([L.join('\r\n')], { type: 'text/calendar;charset=utf-8' })); a.download = `appointment-${ref}.ics`;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
    function moveMonth(n) { const y = +state.view.slice(0, 4), m = +state.view.slice(5, 7) - 1 + n, d = new Date(Date.UTC(y, m, 1)); state.view = d.toISOString().slice(0, 7); state.focus = ''; renderCal(); }

    /* ---------- events ---------- */
    mount.addEventListener('click', e => {
      const b = e.target.closest('[data-action]');
      if (!b) return;
      const a = b.dataset.action;
      if (a === 'next') { if (state.step === 5) return submit(); const m = validate(state.step); if (m) return showErr(m); state.step++; render(true); }
      else if (a === 'back') { state.step = Math.max(1, state.step - 1); render(true); }
      else if (a === 'goto') { state.step = +b.dataset.step; render(true); }
      else if (a === 'cal-prev') moveMonth(-1);
      else if (a === 'cal-next') moveMonth(1);
      else if (a === 'pick-date') { if (b.getAttribute('aria-disabled') === 'true') return; state.date = b.dataset.date; state.time = ''; state.focus = state.date; renderCal(); renderSlots(); upd(); save(); UI.qs(`[data-date="${state.date}"]`, mount).focus(); }
      else if (a === 'pick-time') { state.time = b.dataset.time; renderSlots(); upd(); save(); }
      else if (a === 'earliest') earliest();
      else if (a === 'ics') ics();
      else if (a === 'print') window.print();
      else if (a === 'wa') { const p = state.done.payload, c = chamberOf(p.chamberSlug); window.open('https://wa.me/?text=' + encodeURIComponent(`My appointment with ${SITE.doctor.shortName} is booked: ${dateLabel(p.date)}, ${p.timeLabel} at ${c.chamberName}, ${c.address}. Reference ${state.done.ref}.`), '_blank', 'noopener'); }
      else if (a === 'again') {
        try { sessionStorage.removeItem(KEY); } catch (er) { /* storage unavailable */ }
        Object.assign(state, JSON.parse(JSON.stringify(base)), { busy: false, done: null });
        $('#bk-done').hidden = true; $('#bk-main').hidden = false; render(true);
      }
    });
    mount.addEventListener('change', e => {
      const el = e.target, k = el.dataset.field;
      if (!k) return;
      state[k] = el.value;
      if (k === 'chamber') sanitize();
      upd(); save();
    });
    mount.addEventListener('input', e => {
      const f = e.target.form;
      if (!f || f.dataset.form !== 'details') return;
      syncField(e.target);
      if (e.target.name === 'bookingFor') { render(false); const r = UI.qs(`input[name="bookingFor"][value="${state.d.bookingFor}"]`, mount); if (r) r.focus(); return; }
      persist();
    });
    mount.addEventListener('keydown', e => {
      const b = e.target.closest('[role="gridcell"][data-date]');
      if (!b) return;
      const cur = b.dataset.date, idx = (wd(cur) + 1) % 7, t = bd().date, last = addDays(t, RANGE);
      const mv = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, PageUp: -30, PageDown: 30, Home: -idx, End: 6 - idx }[e.key];
      if (mv === undefined) return;
      e.preventDefault();
      let n = addDays(cur, mv); n = n < t ? t : n > last ? last : n;
      state.focus = n; state.view = n.slice(0, 7); renderCal(); UI.qs(`[data-date="${n}"]`, mount).focus();
    });

    render(false);
  });
})();
