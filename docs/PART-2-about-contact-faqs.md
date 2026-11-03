# PART 2 — About, Contact & FAQs

## 1 Files
- `about.html`, `contact.html`, `faqs.html` — page shells (template, mount points)
- `js/pages/about.js` — About page renderer · `js/pages/contact.js` — Contact renderer + form · `js/pages/faqs.js` — FAQ renderer, search, tabs, JSON-LD
- `js/data/faqs.js` — `window.FAQS` (6 categories, 18 items)

## 2 Pages → sections → components
- About (`#about-root` `AboutPage`): story · numbers · timeline (`Timeline`) · expertise · philosophy · credentials · theatre · CTA
- Contact (`#contact-root`): tiles · form (`ContactForm`) · chambers (`ChamberMap`) · reach · emergency · mini-faq · CTA
- FAQs (`#faq-root`): faq-list (`FaqTabs`, `FaqHelpCard`) · CTA

## 3 Globals & schema
`window.FAQS = { categories:[…], items:[…] }`
```js
{ id:'faq-005', categoryId:'faqc-002', question:'…', answer:'…' }   // category: { id:'faqc-002', slug:'appointments-fees', name, icon }
```

## 4 Kit API used
- UI: pageHero, sectionHead, eyebrow, statTile, chamberCard, faqItem, ctaBand, marquee, field, validateForm, img, deco, icon, esc, qsa, debounce, toast, mount, ready, cls.*
- SITE read: doctor.*, contact.{phone,emergency,email,whatsappUrl}, img.{portrait,theatre,objects}, chambersIndex, routes.*, url.appointment
- Links out: `appointment.html`, `contact.html`, `about.html`, `faqs.html`. Expected in: `faqs.html#<category slug>`.

## 5 Forms
- `contact` → `{ fullName, phone, email, subject, chamberSlug, message, consent }`

## 6 Techniques
- About: data-tilt + glare, data-parallax objects, float3d, data-split, data-scroll-3d (timeline, theatre), 3D flip cards, SVG progress rings, counters, marquee, reveal
- Contact: tilt tiles, aurora blobs + parallax, scroll-3d form, magnetic/shine button, tabs map, reveal, animated success panel
- FAQs: parallax aurora, tilt help card, reveal, tabs, accordion, live search

## 7 Next.js migration map
- `/about` → `AboutPage`; `/contact` → `ContactPage`; `/faqs` → `FaqsPage`
- `FAQS.categories/items` → tables `faq_categories`, `faqs` (FK `categoryId`); GET `/api/faqs`
- Milestones/credentials (about.js `data`) → CMS tables `milestones`, `credentials`
- Contact form → POST `/api/contact`; FAQ helpful vote → POST `/api/faqs/:id/feedback`

## 8 Merge notes
Script order: site, ui, fx, layout, then `data/faqs.js` before `pages/faqs.js`. Nothing else needed.

## 9 Self-test
1. Open each page from `file://`, check hero, sections, no console errors.
2. FAQs: type "fee" → All tab with matches; type nonsense → empty state; open `faqs.html#knee-hip`.
3. Contact: submit empty (errors), invalid phone, then valid → reference id panel; switch map tabs.
4. Tab through pages; test flip cards by keyboard focus; enable reduced motion.

## 10 Known limits
- Kit option shapes assumed: `field` select `options` as `{value,label}`; `SITE.contact.phone` string or `{display,e164}`.
- Publications, awards and memberships are fictional. FAQ search filters client-side only.
