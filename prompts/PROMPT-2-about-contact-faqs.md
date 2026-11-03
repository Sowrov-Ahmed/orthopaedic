# PROMPT 2 of 5 — About, Contact & FAQs

> **How to use (2 minutes):** open a NEW Claude chat (Sonnet) with *Settings → Capabilities → "Code execution and file creation"* switched ON. Paste this ENTIRE file as your first message and send it. Claude builds every file in one reply and gives you ONE download: `part-2.zip`. Do nothing else. If it stops early, send the single word `RESUME`.

---

You are about to build **Part 2** of a five-part website. Read the Project Contract, then your part specification, then build immediately — no questions, no plan, no waiting.

---

# PROJECT CONTRACT (identical in all five prompts — read fully, then build immediately)

## 0. Situation and ONE-TURN protocol
You are a senior front-end engineer (Claude). Five people build ONE website in parallel, each in a separate chat. You cannot see the other parts. All files are later unzipped into one folder, so follow this contract literally; where it conflicts with your taste, it wins.
A **shared kit already exists** (never output, rewrite or modify it): `js/tailwind-config.js`, `js/site.js`, `js/ui.js`, `js/fx.js`, `js/layout.js` (fixed glass header, footer, progress bar, back-to-top, WhatsApp, cursor glow) and the complete image pack in `assets/img/`. You build only YOUR files (§4), using the kit API in §5.

**Finish in ONE reply, no stops:** do not ask questions, do not present a plan, do not wait for "next". Decide quickly and write.
1. **Preferred (file creation available):** create every file with the file-creation tool at `/mnt/user-data/outputs/site/<path>`, in the order given in your part. Then run `cd /mnt/user-data/outputs/site && zip -r ../part-N.zip <every file you created>` (N = your part number) and present ONLY `part-N.zip`. Final message ≤ 6 lines: file list + 3 notes.
2. **Fallback (no file tool):** output each file as its own artifact titled with its exact path, all in this one reply, no commentary, then a 5-line summary.
3. Every file is COMPLETE — no ellipses, no "rest unchanged", no TODO. Respect the size budgets in your part (they exist so the whole job fits in one reply). If you are about to run out of room, shorten copy, never skip a file or a section.
4. If the chat is interrupted, the user will send `RESUME`; then list `/mnt/user-data/outputs/site`, create ONLY the missing files, re-zip, present the zip.

## 1. Project and design language
Personal portfolio website of the fictional **Dr. Nabila Sultana Rahman, Orthopaedic, Arthroscopy & Sports Injury Surgeon (Chattogram & Dhaka, Bangladesh)**. 13 static pages: Home, About, Services, Service Details, Chambers, Appointment, Blog, Blog Details, Testimonials, Contact, FAQs, Sign-in, 404. Navbar (already built): Home, About, Services, Chambers, Contact + Sign in + Book Appointment.
**Style: "Aurora Glass" = Glassmorphism + Editorial + Premium, with 3D depth as the primary technique, plus parallax, gradients and motion.**
- **Type:** headlines `font-display` (Fraunces, light weight, big, tight leading) with *italic emphasis words* (write titles with `*emphasis*` markers → `<em>`); body `font-sans` (Manrope); labels/numbers/eyebrows `font-mono` (IBM Plex Mono, uppercase, wide tracking). Editorial rhythm: very large headlines, small mono captions, generous whitespace, asymmetric grids, thin rules (`border-white/10`), numbered sections (`01 —`).
- **Colour:** ink `#0A0E1F` (dark sections), pearl `#F4F1EB` (light sections), iris `#7C5CFF` (primary), aqua `#22D3EE`, coral `#FF7A59`, gold `#F4C46A`, mint `#34D399`. Dark sections: `UI.cls.sectionDark` (aurora gradient) or `sectionInk`. Light sections: `UI.cls.sectionLight`. **Alternate dark ↔ light down the page.** Glass: `UI.cls.glassDark` / `glassLight` (translucent fill + `backdrop-blur-xl` + hairline border + inner highlight).
- **3D toolkit (use generously, never break usability):** `data-tilt` (+ child `<div data-tilt-glare class="pointer-events-none absolute inset-0 opacity-0 transition-opacity">`) on cards; `data-stage` container with `[data-depth]` layers for pointer-driven depth (wrap animated art in an inner element: `<div data-depth="40"><img class="motion-safe:animate-float3d"></div>`); `data-scroll-3d` for panels that unfold in 3D on scroll; CSS 3D flip cards using `UI.cls.stage` (`[perspective:1400px]`) + `UI.cls.preserve3d` + `UI.cls.noBackface` + `group-hover:[transform:rotateY(180deg)]` (also on `group-focus-within`); layered floating 3D objects from `SITE.img.objects` (`bone, vertebra, ball, ring, capsule, cross`) via `UI.deco`; `data-parallax="0.12"` on images/blobs; `data-split` headlines; `data-magnetic` buttons; `UI.cls.shine` on primary buttons; marquees; aurora blobs (`bg-iris/40 blur-3xl motion-safe:animate-aurora`).
- **Combination rules (engine limits):** never put `data-reveal` on the same element as `data-tilt`, `data-parallax`, `data-scroll-3d` or `data-depth` (they all use `transform`) — wrap one inside the other. Infinite animations carry `motion-safe:`. Every section has ≥ 1 moving element. Each page uses ≥ 5 different techniques from the toolkit.
- **Layout rules:** the header is a FIXED floating pill → the first section of every page starts dark with ≥ `pt-36` (inner pages: `UI.pageHero`). Section wrapper pattern: `<section id="x" data-section="x" class="UI.cls.sectionLight"><div class="UI.cls.container">…`.

## 2. Hard rules
1. **Stack:** HTML5 + Tailwind CSS (Play CDN, pinned in the template) + vanilla JS (ES2020, classic `<script defer>`, no modules). **No** libraries/frameworks (no jQuery, Swiper, GSAP, Three.js…), **no backend/DB/API**: no `fetch`/XHR. Only external resources: Tailwind CDN, Google Fonts, keyless Google Maps embed `https://www.google.com/maps?q=<encoded address>&output=embed` (iframe, `loading="lazy"`, `title`).
2. **No custom CSS:** no `<style>`, no `.css`, no `@apply`, no `style=""` in HTML. Tailwind utilities incl. arbitrary values/properties (`[perspective:1400px]`, `[animation-delay:300ms]`, `bg-[radial-gradient(...)]`, `[&_em]:text-iris-300`, `[mask-image:...]`). JS may set `el.style.*` / `style.setProperty` only for runtime values (progress, offsets, tilt).
3. **Images (accuracy rule):** use ONLY kit images: `SITE.servicesIndex[].image`, `SITE.chambersIndex[].image`, `SITE.blogIndex[].image`, `SITE.img.portrait`, `SITE.img.theatre`, `SITE.img.objects.*`, `SITE.img.logo`. **Never** use remote photos, Unsplash/Pexels URLs or invented file names. Need extra visuals? Compose them from glass shapes, gradients, inline SVG. Always `UI.img` (alt, width, height, lazy) or `UI.deco` for decoration.
4. **ZERO placeholder content:** no lorem ipsum, "Sample", "Coming soon", "TBD", dummy names, dead `href="#"`, empty sections. Never use the words demo/preview/mock/sample/dummy/placeholder in visible text. Write specific, realistic, professional copy for Bangladesh (Chattogram/Dhaka context, BDT, bKash/Nagad, Sat–Thu week). All people, hospitals, numbers are fictional but must read as real.
5. **Locale:** British English (Orthopaedic, Paediatric). Money via `UI.formatBDT/formatBDTRange`. Phones from `SITE` (`tel:` + e164). Dates `18 September 2026`; 12-hour times; Friday off except where §7 says. Medical copy: responsible, general, "results vary", no guarantees.
6. **Responsive & accessible (WCAG AA):** mobile-first (360 px up), no horizontal scroll, tap targets ≥ 44 px, one `<h1>`, ordered headings, landmarks, labels, `aria-*` on interactive widgets, visible focus rings, keyboard operable, reduced motion respected (the engine does this; add `motion-safe:` to your own infinite animations). Contrast: body text on dark ≥ `text-white/70`, on light ≥ `text-ink/70`.
7. **Performance:** `loading="lazy"`, explicit width/height, no scroll listeners of your own (use FX attributes), debounce inputs, keep DOM modest.
8. **SEO:** per-page `<title>`, meta description, OG tags (template), descriptive links.
9. **Migration-ready (will be converted to Next.js + API):** repeating content rendered from data via `render<Component>()` functions; data shaped like DB records (`id`, `slug`, ISO dates, integer BDT, E.164 phones, relations by slug); every form submits via `SITE.submit(formName, payload)`; no inline `on*=` handlers (use `addEventListener`/`data-action`); each rendered root has `data-component="PascalCase"`, each section `id` + `data-section`; file header comment (`Path · Owner Part N · Purpose · Depends on`).

## 3. Page template
Copy exactly (also in the kit as `tools/page-template.html`); change only the bracketed parts and add your data/page scripts as `<script defer>` AFTER `layout.js`:
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Page title] | Dr. Nabila Sultana Rahman – Orthopaedic Surgeon</title>
  <meta name="description" content="[150–160 chars]"><meta name="theme-color" content="#0A0E1F">
  <meta property="og:type" content="website"><meta property="og:title" content="[Page title]"><meta property="og:description" content="[same]">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <script src="js/tailwind-config.js"></script>
  <script defer src="js/site.js"></script><script defer src="js/ui.js"></script><script defer src="js/fx.js"></script><script defer src="js/layout.js"></script>
  <!-- data files (defer) then: --><script defer src="js/pages/[page].js"></script>
</head>
<body data-page="[home|about|services|service-details|chambers|appointment|blog|blog-details|testimonials|contact|faqs|signin|404]" class="bg-pearl font-sans text-ink antialiased">
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-iris focus:px-5 focus:py-2 focus:text-white">Skip to main content</a>
  <div id="site-header"></div>
  <main id="main" tabindex="-1"><!-- inner pages start with <div id="page-hero"></div> --></main>
  <div id="site-footer"></div>
</body></html>
```
Reserved IDs (never reuse): `site-header, site-footer, main, mobile-menu, menu-toggle, menu-close, header-pill, scroll-progress, back-to-top, whatsapp-fab, toast-root, cursor-glow`. z-index: header 50 · your modals 60 · layout 70 · toasts 80. **Nothing of yours may be fixed at bottom-right** (reserved for back-to-top/WhatsApp); mobile sticky bars must be bottom-centre/left and `lg:hidden`.

## 4. Ownership (create ONLY your own files)
| Part | Files |
|---|---|
| Kit (read-only) | `js/tailwind-config.js, js/site.js, js/ui.js, js/fx.js, js/layout.js, assets/**, tools/**` |
| 1 Home, Sign-in, 404 | `index.html, 404.html, signin.html, js/pages/home.js, js/pages/signin.js, docs/PART-1-home-signin-404.md` |
| 2 About, Contact, FAQs | `about.html, contact.html, faqs.html, js/pages/about.js, js/pages/contact.js, js/pages/faqs.js, js/data/faqs.js, docs/PART-2-about-contact-faqs.md` |
| 3 Services | `services.html, service-details.html, js/pages/services.js, js/pages/service-details.js, js/data/services.js, docs/PART-3-services.md` |
| 4 Chambers, Appointment | `chambers.html, appointment.html, js/pages/chambers.js, js/pages/appointment.js, js/data/chambers.js, docs/PART-4-chambers-appointment.md` |
| 5 Blog, Testimonials | `blog.html, blog-details.html, testimonials.html, js/pages/blog.js, js/pages/blog-details.js, js/pages/testimonials.js, js/data/blogs.js, js/data/testimonials.js, docs/PART-5-blog-testimonials.md` |
Cross-part data comes ONLY from `SITE.*` (§7) and URLs (§8). Never read another part's globals. Owned globals: `window.FAQS` (P2), `window.SERVICES` (P3), `window.CHAMBERS` (P4), `window.BLOGS` & `window.TESTIMONIALS` (P5). Data files hold DETAIL records keyed by the same `id`/`slug` as §7 and only extra fields; merge at runtime `Object.assign({}, SITE.xIndex-record, detail)`.

## 5. Kit API (already implemented)
**SITE:** `brand, doctor{name,shortName,title,department,specialty,degrees[],bmdcNo,experienceYears,surgeriesPerformed,patientsTreated,satisfactionPercent,languages,image}`, `contact{phone,emergency{display,e164,local},whatsappUrl,email,deskHours}`, `social`, `img{portrait,theatre,logo,objects{bone,vertebra,ball,ring,capsule,cross}}`, `nav`, `routes.*`, `url.service(slug) | url.blog(slug) | url.blogCategory(catSlug) | url.chamber(slug) | url.appointment({service,chamber,date,type})`, `servicesIndex, chambersIndex, blogCategories, blogIndex, testimonialsIndex`, `getService(slug) getChamber(slug) getPost(slug)`, `submit(formName,payload)→Promise<{ok,id}>`, `nextOpening(chamberSlug?)→{chamber,at,startAt,endAt,schedule,isToday}|null`.
**UI helpers:** `cls.*` (container, sectionDark/Light/Ink, glassDark/Light, h1,h2,h3, eyebrow, btnPrimary, btnGlass (dark bg), btnInk, btnOutline (light bg), shine, stage, preserve3d, noBackface) · `ready, qs, qsa, esc` (ALWAYS escape dynamic text) `, emph('*x*'), getParam, debounce, slugify, formatBDT, formatBDTRange, formatDate(iso,'long'|'short'), formatTime(Date), isBDPhone` · `icon(name,cls)` (names: arrow-right arrow-left arrow-up arrow-up-right phone mail map-pin navigation clock calendar check check-circle alert-circle info star quote menu x chevron-down/up/left/right search user users lock eye eye-off share facebook linkedin youtube instagram message-circle activity shield award heart stethoscope bone target building car wifi wheelchair download filter tag book-open play plus minus printer external-link globe file-text credit-card copy trending-up home log-in send sparkles layers; `-fill` suffix = filled) · `img(src,alt,cls,{w,h,eager})`, `deco(src,cls)`, `stars(rating)` · `toast(msg,'success'|'error'|'info')`, `copy(text)`, `scrollLock(bool)`, `trapFocus(el)`.
**Components (return HTML strings; `theme` = 'dark'|'light' for the section they sit in):** `pageHero({eyebrow,title,lead,crumbs:[{label,href}],actionsHTML})` · `sectionHead({eyebrow,title,lead,align:'center'|'left',theme})` · `eyebrow(text,theme)` · `badge(text,theme)` · `breadcrumb(items,theme)` · `statTile({value,suffix,label,decimals,theme,delay})` · `serviceCard(svc,{theme})` · `chamberCard(ch,{theme})` · `postCard(post,{theme})` · `testimonialCard(t,{theme})` · `faqItem({id,question,answerHTML,open,theme})` (wrap items in an element with `data-accordion` [+ `data-accordion-single`]) · `ctaBand({title,lead,primaryLabel,primaryHref,secondaryLabel,secondaryHref})` (complete dark CTA section) · `marquee([strings],{theme})` · `field({label,name,type:'text|email|tel|password|date|number|select|textarea|checkbox',required,placeholder,options,rows,minlength,validate:'bd-phone',autocomplete,hint,theme,value,min,max,labelHTML})` · `validateForm(form)` (shows errors in each field's `data-error-for`; returns boolean).
**Behaviours (auto-bound by `UI.mount(container)` — call it after you inject HTML; it also runs the FX engine):** `[data-accordion]`, `[data-tabs]` (children: `[role=tablist]` > `button[role=tab][data-tab=id][aria-selected]` with classes like `aria-selected:bg-iris aria-selected:text-white`; panels `[role=tabpanel][data-tab-panel=id]`; `el.showTab(id)`; fires `tabchange`), `[data-carousel]` (`[data-carousel-track]` flex `snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]` > `[data-carousel-slide]` `snap-start shrink-0`; optional `[data-carousel-prev|next|dots]`, `data-autoplay="6000"`).
**FX attributes:** `data-reveal="up|left|right|zoom|flip|blur|fade"` + `data-delay` · `data-split` · `data-tilt` (+`data-tilt-max`, `[data-tilt-glare]`) · `data-stage` + `[data-depth][data-rotate]` · `data-parallax="0.15"` · `data-scroll-3d` · `data-magnetic` · `data-spotlight` (+ the spotlight utility string `before:pointer-events-none before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.2),transparent_45%)]`) · `data-counter="5200" data-suffix="+"`.
Script pattern: `(function () { 'use strict'; UI.ready(function () { … }); })();`

## 7. Canonical data (single source of truth — mirrors `SITE`; use these exact names, slugs, ids, numbers)

**Doctor:** Dr. Nabila Sultana Rahman (short Dr. Nabila Rahman) · Associate Professor & Consultant, Department of Orthopaedic Surgery · Orthopaedic, Arthroscopy & Sports Injury Surgeon · MBBS (Chittagong Medical College); MS (Orthopaedic Surgery, BSMMU); FCPS (Orthopaedics); Fellowship in Arthroscopy & Sports Surgery (Kuala Lumpur) · BMDC reg. no. A-61374 · 13+ years · 5,200+ surgeries · 21,000+ patients · 97% satisfaction · Tagline "Precision. Motion. Recovery.". Practises in Chattogram (two chambers) and Dhaka (Banani).

**Contact:** +880 1815-264079 · emergency +880 1711-934806 · WhatsApp https://wa.me/8801815264079 · care@drnabilarahman.com · Appointment desk: Saturday – Thursday, 9:00 AM – 8:00 PM · www.drnabilarahman.com

### Services (`SITE.servicesIndex`: id, slug, name, category, accent, icon, image, priceFrom, priceTo, priceUnit, short)
| id | slug | name | category | price | unit |
| --- | --- | --- | --- | --- | --- |
| svc-001 | `acl-ligament-reconstruction` | ACL & Ligament Reconstruction | sports | ৳2.2 – 3.8 lakh | per procedure |
| svc-002 | `knee-replacement` | Total Knee Replacement | surgical | ৳3.8 – 7 lakh | per knee |
| svc-003 | `hip-replacement` | Hip Replacement & Preservation | surgical | ৳4.5 – 8.5 lakh | per hip |
| svc-004 | `shoulder-arthroscopy` | Shoulder Arthroscopy & Rotator Cuff | sports | ৳1.8 – 3.5 lakh | per procedure |
| svc-005 | `spine-disc-care` | Spine & Slipped Disc Care | surgical | ৳2 – 6.5 lakh | per surgical procedure |
| svc-006 | `fracture-trauma` | Fracture & Trauma Care | surgical | ৳45,000 – ৳2,50,000 | per procedure |
| svc-007 | `sports-medicine-rehab` | Sports Medicine & Rehabilitation | non-surgical | ৳5,000 – ৳60,000 | per programme |
| svc-008 | `paediatric-orthopaedics` | Paediatric Orthopaedics | children | ৳25,000 – ৳2,00,000 | per treatment course |

Short lines: **acl-ligament-reconstruction** — Arthroscopic ligament and meniscus repair that returns athletes to the field with a stable, confident knee. · **knee-replacement** — Precisely aligned implants that end arthritic knee pain and restore natural walking. · **hip-replacement** — Minimally invasive hip replacement and joint-preserving surgery for arthritis, necrosis and fractures. · **shoulder-arthroscopy** — Keyhole repair of rotator cuff tears, frozen shoulder and recurrent dislocations. · **spine-disc-care** — Stepwise treatment of slipped disc, sciatica and stenosis, from precise injections to microdiscectomy. · **fracture-trauma** — Round-the-clock fracture fixation with plates, nails and external fixators after accidents and falls. · **sports-medicine-rehab** — Non-surgical injury care, performance rehab and structured return-to-sport programmes for athletes. · **paediatric-orthopaedics** — Gentle correction of clubfoot, hip dysplasia, flat feet and growth-related bone problems in children.

### Chambers (`SITE.chambersIndex`: id, slug, name, chamberName, area, city, address, phone{display,e164}, schedule[{days,label,start,end,hours}], fee{firstVisit,followUp}, slotMinutes, lat, lng, image). `days` = JS weekday numbers 0=Sun…6=Sat.
| id | slug | hospital / chamber | address | phone | schedule | fees | lat,lng |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch-001 | `gec-circle` | Port City Specialized Hospital / GEC Circle Chamber | Plot 9, O.R. Nizam Road, GEC Circle, Chattogram 4202 | +880 1819-472308 | Sat, Sun, Mon 4:00 PM – 9:00 PM (days [6,0,1]) | ৳1,500 first / ৳800 follow-up | 22.3592, 91.8212 |
| ch-002 | `khulshi` | Khulshi Medical & Diagnostic Centre / Khulshi Chamber | House 7, Zakir Hossain Road, Khulshi, Chattogram 4225 | +880 1632-705918 | Tue, Wed 10:00 AM – 2:00 PM (days [2,3]) | ৳1,200 first / ৳600 follow-up | 22.3569, 91.8003 |
| ch-003 | `banani` | Banani Orthocare Hospital / Dhaka Banani Chamber | House 38, Road 11, Block D, Banani, Dhaka 1213 | +880 1914-386052 | Thu 5:00 PM – 9:00 PM (days [4]); Fri 10:00 AM – 1:00 PM (days [5]) | ৳2,000 first / ৳1,000 follow-up | 23.7937, 90.4066 |

All other days are closed (Friday off except Banani Friday-morning). Surgeries: Saturday–Wednesday mornings at Port City Specialized Hospital (Chattogram) and Thursday-evening/Friday consultations in Dhaka.

### Blog (`SITE.blogCategories`: knee=Knee, shoulder=Shoulder, spine=Spine, sports-injury=Sports Injury, recovery=Recovery, paediatric=Paediatric, trauma-first-aid=Trauma & First Aid; `SITE.blogIndex`: id, slug, title, category, categorySlug, date, readMinutes, image, excerpt)
| id | slug | title | category | date | min |
| --- | --- | --- | --- | --- | --- |
| blg-001 | `knee-pain-warning-signs` | 7 Warning Signs Your Knee Pain Needs a Specialist | knee | 2026-09-22 | 6 |
| blg-002 | `acl-tear-surgery-or-rehab` | ACL Tear: Surgery or Rehab? How to Decide | sports-injury | 2026-08-30 | 7 |
| blg-003 | `arthroscopy-recovery-week-by-week` | Recovery After Arthroscopy: What to Expect Week by Week | recovery | 2026-08-06 | 7 |
| blg-004 | `shoulder-pain-at-night` | Shoulder Pain at Night: Causes and What Actually Helps | shoulder | 2026-07-14 | 6 |
| blg-005 | `slipped-disc-vs-muscle-strain` | Slipped Disc or Muscle Strain? How to Tell the Difference | spine | 2026-06-25 | 6 |
| blg-006 | `weekend-footballers-injury-prevention` | Weekend Footballers: Preventing Ankle and Knee Injuries | sports-injury | 2026-05-28 | 6 |
| blg-007 | `growing-pains-or-something-more` | Growing Pains or Something More? A Parent’s Guide | paediatric | 2026-04-23 | 5 |
| blg-008 | `fracture-first-aid-first-hour` | Fracture First Aid: The First Hour After an Accident | trauma-first-aid | 2026-03-12 | 5 |

Excerpts: **knee-pain-warning-signs** — Everyday soreness fades. Joint damage does not. Learn the seven signals that mean it is time to stop waiting and get your knee examined. · **acl-tear-surgery-or-rehab** — Not every torn ACL needs an operation. Age, activity and knee stability decide the right path, and here is how we weigh them together. · **arthroscopy-recovery-week-by-week** — Keyhole surgery means small cuts, not instant recovery. A realistic timeline from the first walk to the first jog. · **shoulder-pain-at-night** — If lying on your side wakes you at 3 a.m., your rotator cuff may be speaking. Causes, sleeping positions and when to seek care. · **slipped-disc-vs-muscle-strain** — Both cause back pain, but only one sends shooting pain down the leg. Spot the signs and know which red flags need urgent attention. · **weekend-footballers-injury-prevention** — Friday-evening matches on hard grounds are a recipe for sprains. A ten-minute warm-up routine that genuinely cuts injury risk. · **growing-pains-or-something-more** — Night-time leg aches are common in children, but a limp or persistent pain is not. Here is how parents can tell the difference. · **fracture-first-aid-first-hour** — What you do in the first sixty minutes after a bone injury can change the outcome. A calm, step-by-step guide for families.

### Testimonials (`SITE.testimonialsIndex`: id, name, age, area, serviceSlug, rating, date, quote)
| id | name | age | area | serviceSlug | rating | date |
| --- | --- | --- | --- | --- | --- | --- |
| tst-001 | Mohammad Jahangir Alam | 61 | Nasirabad | `knee-replacement` | 5 | 2026-08-18 |
| tst-002 | Tasnim Ferdous | 24 | Khulshi | `acl-ligament-reconstruction` | 5 | 2026-07-09 |
| tst-003 | Imran Hossain | 42 | Agrabad | `spine-disc-care` | 5 | 2026-05-21 |
| tst-004 | Rokeya Begum | 56 | Halishahar | `hip-replacement` | 5 | 2026-06-11 |
| tst-005 | Sabbir Ahmed | 33 | Panchlaish | `fracture-trauma` | 5 | 2026-03-30 |
| tst-006 | Mehnaz Chowdhury | 34 | Banani, Dhaka | `paediatric-orthopaedics` | 5 | 2026-09-05 |

Content dates: the site is live in late 2026; keep any new dates between 2025-10 and 2026-10.


## 8. URL contract (relative, no leading slash; works from `file://`)
`index.html` · `about.html` · `services.html[?category=surgical|sports|children|non-surgical]` · `service-details.html?slug=<service slug>` · `chambers.html` + anchors `chambers.html#<chamber slug>` (Part 4 gives each chamber section `id="<slug>"`) · `appointment.html?service=<slug>&chamber=<slug>&date=YYYY-MM-DD&type=<new|follow-up|second-opinion|post-op>` (all optional; Part 4 prefills) · `blog.html?category=<cat slug>&q=<text>&page=<n>` · `blog-details.html?slug=<post slug>` · `testimonials.html` · `contact.html` · `faqs.html[#<faq category slug>]` · `signin.html` · `404.html`. Build links with `SITE.url.*`/`SITE.routes.*`. Unknown slug on a detail page → friendly not-found panel with link back (never blank). Never link to anything not listed.

## 9. Documentation (one file, ≤ 90 lines, in `docs/`)
Sections: 1 Files (path · purpose) · 2 Pages → section ids → `data-component`s · 3 Globals & data schema (one example record) · 4 Kit API used + `SITE` members read + URLs linked out / expected in · 5 Forms (name · payload fields) · 6 Techniques used per page (3D/parallax/motion list) · 7 Next.js migration map (page→route, component→component, data→table/API, form→endpoint) · 8 Merge notes (script order, nothing else needed) · 9 Self-test steps · 10 Known limits.

## 10. Final self-audit (print as one line of PASS/FAIL at the very end, fix FAILs first)
only my files · kit untouched · template/script order · no `<style>`/`style=""`/`@apply` · no inline handlers · no fetch · only kit images · no placeholder words/dead links · all dynamic text escaped · forms use `SITE.submit` · links match §8 · slugs match §7 · ≥ 5 techniques per page · no `data-reveal` combined with transform-based attributes · docs written · zip created.


---

# PART 2 — ABOUT, CONTACT, FAQs (you are Person 2)
Files, in order: `js/data/faqs.js` → `js/pages/faqs.js` → `faqs.html` → `js/pages/about.js` → `about.html` → `js/pages/contact.js` → `contact.html` → `docs/PART-2-about-contact-faqs.md` → zip `part-2.zip`.
Budget: each HTML ≤ 70 lines (mounts + short static copy), about.js ≤ 260 lines, contact.js ≤ 200, faqs.js ≤ 110, faqs data = 18 items.

## `about.html` (`data-page="about"`) — `UI.pageHero` then:
1. **story** (light): large portrait in `data-tilt` glass frame with `data-parallax` objects; editorial 3-paragraph story (why orthopaedics, Chattogram Medical College years, BSMMU training, fellowship in Kuala Lumpur, returning home to build an arthroscopy & sports-injury practice) with a drop-cap first letter and pull-quote.
2. **numbers** (dark): 4 `UI.statTile` from `SITE.doctor`.
3. **timeline** (light): vertical glowing line (gradient bar scaled by scroll via `data-scroll-3d` panels), 8 milestones with ISO years 2006–2026 (MBBS, internship, MS, FCPS, first arthroscopic ACL, fellowship, associate professor, 5,000th surgery) alternating left/right on `lg`, each panel `data-reveal` left/right.
4. **expertise** (dark): 5 animated SVG progress rings (`stroke-dasharray`, `animate-draw`-style via JS on intersect or `data-counter` %) — arthroscopy, joint replacement, sports injury, spine, trauma.
5. **philosophy** (light): 4 **3D flip cards** (values) with `UI.cls.stage/preserve3d/noBackface`.
6. **credentials** (dark): glass grid — degrees (`SITE.doctor.degrees` + BMDC no.), 4 society memberships, 4 publications (title · journal-style source · year), 3 awards. Fictional but plausible.
7. **theatre** (light): `theatre` image with `data-scroll-3d`, text on "what to expect at your first consultation" (4 numbered points).
8. `UI.ctaBand`.

## `contact.html` (`data-page="contact"`)
Hero (`UI.pageHero`) → **tiles** (dark): 4 glass tiles (appointment line, WhatsApp, email, emergency) with `data-tilt` → **form + info** (light): glass form (`UI.field`: fullName, phone `bd-phone`, email, subject select [Appointment query, Surgery cost estimate, Report review / second opinion, Insurance & billing, Feedback, Other], chamberSlug select from `SITE.chambersIndex`, message minlength 20, consent checkbox) → `SITE.submit('contact', payload)` with loading state and animated success panel showing the reference id; beside it desk hours + "what happens next" 3-step list → **chambers** (dark): 3 `UI.chamberCard` + keyless Google Maps iframe for the GEC Circle chamber with tabs to switch the map between the 3 chambers (`[data-tabs]`) and a "Get directions" link (`https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>`) → **how to reach** (light): 3 glass cards (by road, by rideshare/CNG, parking) → emergency strip → mini FAQ (3 items) → `UI.ctaBand`.

## `faqs.html` (`data-page="faqs"`)
`window.FAQS = { categories:[{id:'faqc-001',slug,name,icon}], items:[{id:'faq-001',categoryId,question,answer}] }` — **6 categories × 3 questions = 18**, answers 35–70 words, Bangladesh-specific: `general`, `appointments-fees` (serial, fees from §7, bKash/Nagad, rescheduling), `surgery-preparation` (tests, fasting, hospital stay, insurance/corporate cards, blood arrangement), `recovery-rehab`, `knee-hip`, `sports-spine-children`.
Page: `UI.pageHero` (dark) → light section: glass search input (live filter, no-results state), category `[data-tabs]` pill row (URL hash `#<slug>` selects a tab on load; "All" tab first), accordion list (`UI.faqItem`, `data-accordion data-accordion-single`), side glass card "Still have a question?" (call, WhatsApp, contact link), "Was this helpful?" thumbs per answer → toast → `UI.ctaBand`. Inject `FAQPage` JSON-LD via JS.

## Doc file
`docs/PART-2-about-contact-faqs.md` per §9.

