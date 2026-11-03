# PART 3 — Services & Service Details

## 1. Files
| Path | Purpose |
| --- | --- |
| `services.html` | Services catalogue page (`data-page="services"`) |
| `service-details.html` | Single service guide, reads `?slug=` (`data-page="service-details"`) |
| `js/pages/services.js` | Renders hero, filterable catalogue, pathway, price table, marquee, CTA |
| `js/pages/service-details.js` | Merges index + detail, renders hero, 3D visual, 10 content sections, booking card, scroll-spy |
| `js/data/services.js` | `window.SERVICES`: detail records for all 8 services |
| `docs/PART-3-services.md` | This file |

## 2. Pages → section ids → `data-component`
**services.html:** `page-hero` (kit hero) · `catalogue` → `ServiceCatalogue` · `pathway` → `TreatmentPathway` · `pricing` → `PriceTransparency` · `treatments` → `TreatmentMarquee` · CTA band.
**service-details.html:** `page-hero` · `service-visual` → `ServiceVisual` · `service-body` containing `overview` `ServiceOverview`, `symptoms` `ServiceSymptoms`, `who-needs-it` `ServiceCandidacy`, `procedure` `ServiceProcedure`, `benefits` `ServiceBenefits`, `risks` `ServiceRisks`, `recovery` `ServiceRecovery`, `pricing` `ServicePricing`, `faqs` `ServiceFaqs`, `related` `ServiceRelated` · `BookingCard` (aside) · `MobileBookingBar` · CTA band. Unknown slug → `not-found` → `ServiceNotFound`.

## 3. Globals & data schema
`window.SERVICES` = array of detail records (no name, price, image or icon; those come from `SITE.servicesIndex`).
```js
{ id:'svc-001', slug:'acl-ligament-reconstruction', tagline:'…', overview:['p1','p2'],
  symptoms:['…' x5], whoNeedsIt:{ ideal:[3], notIdeal:[2] },
  procedure:{ duration, anaesthesia, hospitalStay, steps:[{title,description} x5] },
  benefits:[{title,description} x4], risks:[{title,description} x3],
  recovery:[{phase,title,description} x4],
  pricing:{ inclusions:[4], exclusions:[3], note, paymentOptions:[5] },
  faqs:[{id:'sfaq-001',question,answer} x3], relatedSlugs:[2], relatedBlogSlugs:[1–2] }
```
Runtime merge: `Object.assign({}, SITE.getService(slug), detail)`.

| Service | slug | relatedSlugs | relatedBlogSlugs |
| --- | --- | --- | --- |
| svc-001 | acl-ligament-reconstruction | sports-medicine-rehab, knee-replacement | acl-tear-surgery-or-rehab, arthroscopy-recovery-week-by-week |
| svc-002 | knee-replacement | hip-replacement, sports-medicine-rehab | knee-pain-warning-signs |
| svc-003 | hip-replacement | knee-replacement, fracture-trauma | fracture-first-aid-first-hour |
| svc-004 | shoulder-arthroscopy | acl-ligament-reconstruction, sports-medicine-rehab | shoulder-pain-at-night, arthroscopy-recovery-week-by-week |
| svc-005 | spine-disc-care | sports-medicine-rehab, fracture-trauma | slipped-disc-vs-muscle-strain |
| svc-006 | fracture-trauma | hip-replacement, spine-disc-care | fracture-first-aid-first-hour |
| svc-007 | sports-medicine-rehab | acl-ligament-reconstruction, shoulder-arthroscopy | weekend-footballers-injury-prevention, acl-tear-surgery-or-rehab |
| svc-008 | paediatric-orthopaedics | fracture-trauma, sports-medicine-rehab | growing-pains-or-something-more |

## 4. Kit API used, `SITE` members read, URLs
- **UI:** `ready, qs, qsa, esc, emph, getParam, debounce, formatBDT, formatBDTRange, icon, img, deco, mount, cls.*, pageHero, sectionHead, badge, serviceCard, postCard, faqItem, marquee, ctaBand`.
- **SITE read:** `servicesIndex, chambersIndex, img.objects, contact.phone/emergency/whatsappUrl/deskHours, getService, getPost, url.service, url.appointment`.
- **Links out:** `index.html`, `services.html`, `service-details.html?slug=`, `appointment.html?service=<slug>` (via `SITE.url.appointment`), `blog-details.html?slug=` (via `UI.postCard`), `tel:`, WhatsApp URL.
- **Expected in:** `services.html?category=surgical|sports|children|non-surgical`, `service-details.html?slug=<slug>`.

## 5. Forms
None on these pages (booking happens on `appointment.html`).

## 6. Techniques used
- **services.html:** `data-reveal`, `data-scroll-3d` glass steps, `data-stage`/`data-depth` floating 3D objects, `data-parallax` aurora blob and ring, `data-magnetic` + `UI.cls.shine` buttons, marquee, live filtering, sticky glass filter bar.
- **service-details.html:** `data-stage`/`data-depth` objects around a `data-tilt` hero frame with glare, `data-tilt` benefit tiles, alternating `data-reveal` procedure timeline, CSS 3D stepped recovery cards (`[perspective:1400px]` + `rotateX`/`scale`), `data-parallax` blob, `data-magnetic` + shine, accordion FAQs, scroll-spy nav (IntersectionObserver), sticky booking card, `lg:hidden` mobile bar.

## 7. Next.js migration map
| Now | Next.js |
| --- | --- |
| `services.html` | `/services` (query `category`) |
| `service-details.html?slug=` | `/services/[slug]` |
| `renderCatalogue/renderGrid/renderPathway/renderPricing` | `ServiceCatalogue`, `ServiceGrid`, `TreatmentPathway`, `PriceTransparency` |
| detail section builders | `ServiceOverview … ServiceRelated`, `BookingCard`, `MobileBookingBar` |
| `window.SERVICES` | `service_details` table (1:1 with `services`; child tables for steps, risks, faqs) via `GET /api/services/:slug` |
| Forms | none |

## 8. Merge notes
Script order on both pages: kit scripts, then `js/data/services.js`, then the page script (all `defer`). No other file needs editing.

## 9. Self-test steps
1. Open `services.html`: cards for all 8 services; chips filter; `?category=sports` preselects Sports (2 results).
2. Search "clubfoot": only Paediatric Orthopaedics; search "zzz": empty state with Clear filters.
3. Sort by price low to high: Sports Medicine & Rehabilitation first.
4. Open each card: `service-details.html?slug=…` shows all 10 sections, nav highlights while scrolling.
5. `service-details.html?slug=nope` and no slug: friendly not-found panel.
6. At 360 px: no horizontal scroll, nav becomes chips, bottom bar appears on the left.

## 10. Known limits
- Price table uses `SITE.servicesIndex` ranges; detail copy gives guide ranges only.
- Scroll-spy needs `IntersectionObserver` (progressively skipped otherwise).
- Hero and visual are two stacked dark sections because `UI.pageHero` has no image slot.
