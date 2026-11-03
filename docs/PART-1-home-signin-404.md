# Part 1 — Home, Sign-in & 404

## 1. Files
- `index.html` — Home shell (head, mounts); sections rendered by `home.js`
- `js/pages/home.js` — renders 12 Home sections, filter chips, quick booking, open-now pills
- `signin.html` + `js/pages/signin.js` — split-screen auth (sign in / create account / reset)
- `404.html` — not-found page (inline script renders content)
- `docs/PART-1-home-signin-404.md` — this file

## 2. Pages → sections → components
- Home: `hero` HeroCopy/HeroPortrait · `marquee-stats` StatTiles · `about` AboutIntro · `services` ServiceFilter/ServiceGrid · `journey` JourneyCards · `why` WhyBento · `chambers` ChamberList · `book` QuickBooking · `testimonials` TestimonialCarousel · `blog` LatestPosts · `faqs` FaqAside/HomeFaqs · CTA band
- Sign-in: `auth` AuthIntro, AuthCard · 404: `not-found`

## 3. Globals & data
No new globals. Home FAQ copy is local to `home.js` (6 items: `{question, answer}`); all other data comes from `SITE.*`.

## 4. Kit API used
`SITE`: doctor, contact, img, servicesIndex, chambersIndex, blogIndex, testimonialsIndex, getChamber, nextOpening, submit, url.appointment/service.
`UI`: cls, pageless sections, sectionHead, eyebrow, statTile, serviceCard, chamberCard, postCard, testimonialCard, faqItem, ctaBand, marquee, field, validateForm, icon, img, deco, stars, emph, esc, debounce, toast, mount, ready.
Links out: about, services, blog, testimonials, faqs, appointment (with query), service-details via `SITE.url.service`.

## 5. Forms
- `signin`: identifier, password, remember · `register`: fullName, phone, email, password, terms (confirm checked client-side, not sent) · `forgot-password`: identifier
- Home quick booking does not call `SITE.submit`; it navigates to `SITE.url.appointment({service,chamber,date,type})`.

## 6. Techniques
Home: split headline, stage/depth, tilt + glare, 3D flip cards, parallax, scroll-3d, marquee, counters, magnetic, spotlight, carousel. Sign-in: split, stage/depth, tilt, tabs, parallax, magnetic. 404: stage/depth, parallax, split-free outline text, float3d, magnetic.

## 7. Next.js map
`/`→Home, `/signin`→SignIn, not-found→`not-found.tsx`. Components = the `data-component` names. Forms → `POST /api/auth/{signin,register,forgot-password}`. Services/chambers/blog/testimonials → DB tables via API.

## 8. Merge notes
Script order: site, ui, fx, layout, then page script. Nothing else needed. 404 uses an inline script because no page file was assigned.

## 9. Self-test
1. Open `index.html`; scroll all 12 sections. 2. Click each category chip. 3. Submit the booking form on a closed day (expect message), then a valid day (lands on appointment). 4. Tab through flip cards. 5. Sign-in: switch tabs, toggle password, check strength meter, mismatch confirm. 6. Open `404.html`, pick a treatment.

## 10. Known limits
Page content is JS-rendered (no static SEO text). Option/field shapes assume the kit's `UI.field` accepts `{value,label}` options. Open-now pill assumes `nextOpening` returns Date-compatible `startAt/endAt`. Kit was not available to test against.
