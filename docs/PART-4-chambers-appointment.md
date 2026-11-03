# Part 4 — Chambers & Appointment

## 1. Files
- `js/data/chambers.js` — `window.CHAMBERS` detail records (about, landmark, facilities, howToReach, surgeryDays, patientTips, mapQuery)
- `js/pages/chambers.js` — Chambers page renderer
- `chambers.html` — page shell (`data-page="chambers"`)
- `js/pages/appointment.js` — five-step booking wizard + confirmation
- `appointment.html` — page shell (`data-page="appointment"`)
- `docs/PART-4-chambers-appointment.md` — this file

## 2. Pages → section ids → data-components
- chambers: `#page-hero`, `#chambers-root[ChambersPage]` → `#overview[ChamberOverview]` → `#schedule[ChamberWeekMatrix]` → `#gec-circle`, `#khulshi`, `#banani` `[ChamberDetail]` → `#compare[ChamberComparison]` → `#bring[BringChecklist]` → `ctaBand`
- appointment: `#page-hero`, `#booking-mount[AppointmentPage]` → `#booking` → `BookingWizard`, `BookingSummary`, `BookingConfirmation`

## 3. Globals & data schema
`window.CHAMBERS` (merged with `SITE.chambersIndex` by slug):
`{ id:'ch-001', slug:'gec-circle', about:[p1,p2], landmark, facilities:[{icon,title,description}×6], howToReach:{byRoad,byRideshare,byBus,parking}, surgeryDays, patientTips:[×4], mapQuery }`

Booking payload (`SITE.submit('appointment', payload)`):
`{ visitType, serviceSlug, chamberSlug, date:'YYYY-MM-DD', time:'HH:MM', timeLabel, slotMinutes, feeBDT:int, paymentPreference, patient:{fullName, age:int, gender, phone:E.164, email, area, bookingFor, patientRelation}, problemSummary, hasReports:bool, consent:true, source:'website', submittedAt:ISO }`
- visitType: `new|follow-up|second-opinion|post-op`; serviceSlug: a `SITE.servicesIndex` slug or `general`
- paymentPreference: `pay-at-chamber|bkash|nagad|card-at-chamber`

`sessionStorage` key `ortho:booking` → `{step,type,service,chamber,date,time,payment,d:{fullName,age,gender,phone,email,area,bookingFor,patientRelation,problemSummary,hasReports,consent}}`. Removed on confirmation and on "Book another".

Booked-slot rule: slots start at each `schedule` entry's `start` and repeat every `slotMinutes` while `slotStart + slotMinutes <= end`; today's slots at or before the current Asia/Dhaka time are removed. A slot is **Booked** when `hash(chamberSlug + date + 'HH:MM') % 4 === 0`, with `h = 5381; for each char: h = ((h << 5) + h + charCode) >>> 0` and `HH:MM` 24-hour, zero-padded (e.g. `gec-circle2026-11-07 16:15`).

Query-param contract: `appointment.html?service=<slug|general>&chamber=<slug>&date=YYYY-MM-DD&type=<new|follow-up|second-opinion|post-op>`; all optional, invalid values ignored. If any param is valid, the wizard opens at the first incomplete step.

## 4. Kit API used
- UI: `ready, qs, qsa, esc, getParam, debounce, formatBDT, formatDate, isBDPhone, icon, img, deco, toast, mount, pageHero, sectionHead, eyebrow, chamberCard, ctaBand, field, validateForm, cls.*`
- SITE read: `doctor{name,shortName,specialty,bmdcNo}`, `contact{phone,whatsappUrl}`, `img{portrait,objects}`, `chambersIndex`, `servicesIndex`, `url.appointment`, `submit`
- Linked out: `index.html`, `appointment.html`, `chambers.html`. Expected in: `chambers.html#<slug>`, `appointment.html?...` (§8).

## 5. Forms
- `appointment` — payload above (via `SITE.submit`, loading state and double-submit guard)

## 6. Techniques per page
- chambers: `data-tilt` + glare image frames, `data-stage`/`data-depth` objects, `animate-float3d`, aurora blobs, `data-parallax`, `data-reveal`, `data-magnetic`, `shine` buttons, live open pill (60 s refresh), hash highlight ring
- appointment: tilt radio cards with glowing selected state, depth objects behind the wizard, `animate-fade-up` step transitions, animated progress bar, `animate-draw`/`animate-zoom-in` confirmation, magnetic and shine buttons

## 7. Next.js migration map
- `/chambers` ← `chambers.html`; `/appointment` ← `appointment.html`
- Components: `ChamberOverview`, `ChamberWeekMatrix`, `ChamberDetail`, `ChamberComparison`, `BringChecklist`, `BookingWizard`, `BookingSummary`, `BookingConfirmation`
- Data: `CHAMBERS` → `chambers` / `chamber_facilities` tables; bookings → `appointments` table
- Form: `appointment` → `POST /api/appointments`; booked slots → `GET /api/chambers/:slug/slots?date=`

## 8. Merge notes
Script order: `site.js, ui.js, fx.js, layout.js`, then `js/data/chambers.js`, then the page script (already set in each HTML). No other files needed.

## 9. Self-test
1. Open `chambers.html#banani`: it scrolls to Banani and pulses a ring for 2 s.
2. Check the open pills and today's highlighted column in the matrix.
3. Open `appointment.html?service=knee-replacement&chamber=khulshi`: wizard opens at step 3 (date).
4. Use arrow keys in the calendar; closed days cannot be selected; "Earliest available" picks a slot.
5. Complete step 4, confirm, then download the `.ics`, print, share and "Book another".

## 10. Known limits
- Open status and slots use Asia/Dhaka time from the browser clock; booked slots are a deterministic simulation, not live availability.
- Schedule `start`/`end` are parsed as `HH:MM` or `h:mm AM/PM`.
- The `.ics` event length equals the chamber `slotMinutes`.
- If the kit's `sectionLight` sets `overflow-hidden`, the booking section overrides it so the summary stays sticky.
