# Part 5 — Blog, Blog Details & Testimonials

## 1. Files
- `blog.html` · article listing page (`data-page="blog"`)
- `blog-details.html` · single article page (`data-page="blog-details"`)
- `testimonials.html` · patient reviews page (`data-page="testimonials"`)
- `js/data/blogs.js` · `window.BLOGS`, 8 article detail records
- `js/data/testimonials.js` · `window.TESTIMONIALS`, 8 extra reviews (tst-007…tst-014)
- `js/pages/blog.js`, `js/pages/blog-details.js`, `js/pages/testimonials.js` · page scripts

## 2. Pages → section ids → components
- **blog**: `page-hero` (BlogSearch) · `featured` (FeaturedPost) · `articles` (ArticleList, PostGrid, NoResults) · `insights` (PopularTopics, MostRead, NewsletterForm) · CtaBand
- **blog-details**: hero · `article` (ArticleCover, ArticleBody, TagList, ArticleAside) · `author` (AuthorCard, HelpfulVote, RelatedServices, PrevNext) · `related` (RelatedPosts) · CtaBand. Unknown slug: hero + `latest` (NotFoundSuggestions)
- **testimonials**: hero · `rating-summary` (RatingSummary) · `reviews` (TestimonialGrid, TestimonialItem) · `story` (PatientStory) · `share` (ReviewForm) · CtaBand

## 3. Globals & data schema
```js
window.BLOGS = [{ id:'blg-001', slug:'knee-pain-warning-signs', tags:[3], views:1840, summary:'…',
  keyTakeaways:[3], content:[blocks], relatedSlugs:[2], serviceSlugs:[1-2] }];
window.TESTIMONIALS = [{ id:'tst-009', name, age, area, serviceSlug, rating:5, date:'2026-09-14',
  quote, title, outcome, verified:true, story?:{before,treatment,recovery} }];
```
Runtime merge: `Object.assign({}, SITE.blogIndex[i], BLOGS[slug])`; `ALL = SITE.testimonialsIndex.concat(TESTIMONIALS)` (14 reviews). `story` exists on tst-009 only.

**Block types** (`content[]`): `p{text}` · `h2{text}` (feeds the table of contents) · `ul{items}` · `ol{items}` · `quote{text,cite}` · `callout{tone:'tip'|'warning',title,text}`. Inline `**bold**` is converted after `UI.esc`.

## 4. Kit API used
- `SITE`: blogIndex, blogCategories, testimonialsIndex, servicesIndex, getService, doctor, contact, img, routes, url.blog / blogCategory / service / appointment, submit
- `UI`: cls.*, ready, qs, qsa, esc, getParam, debounce, slugify, formatDate, icon, img, deco, stars, toast, copy, mount, pageHero, sectionHead, badge, statTile, postCard, serviceCard, testimonialCard, ctaBand, field, validateForm
- Links out: `index.html`, `about.html`, `blog.html`, `service-details.html?slug=`, `appointment.html?service=`, `testimonials.html`, `tel:`. Share links: WhatsApp, Facebook, LinkedIn (plain anchors, opened in a new tab).

## 5. Forms
- `newsletter` · `{email}`
- `testimonial` · `{name, phone, serviceSlug, rating, title, message, consent}`
- `article-feedback` · `{slug, helpful}` (was-this-helpful buttons)

## 6. Techniques per page
- **blog**: `data-tilt` featured card with glare, `data-split` headings, `data-parallax` aurora blob, floating 3D capsule in `data-stage`, `data-magnetic` + shine buttons, `data-reveal` card grid
- **blog-details**: `data-scroll-3d` cover, scroll-spy table of contents (IntersectionObserver), `data-tilt` booking card, parallax blob, drop cap, glass callouts, reveal
- **testimonials**: animated distribution bars, `data-tilt` stat tiles, floating 3D ring in `data-stage`, parallax theatre image, `data-tabs` story stepper, `data-split`, masonry columns with reveal

## 7. Next.js migration map
- `/blog` → `app/blog/page.tsx` (`?category&q&page` become search params); `/blog-details?slug=` → `app/blog/[slug]/page.tsx`; `/testimonials` → `app/testimonials/page.tsx`
- Components: PostGrid, FeaturedPost, ArticleBody, ArticleAside, RelatedPosts, RatingSummary, TestimonialGrid, PatientStory, ReviewForm map one-to-one to React components
- Data: `BLOGS` → `posts` table plus `post_tags`; `TESTIMONIALS` → `testimonials` table (`status` = pending | approved)
- Forms: newsletter → `POST /api/newsletter`; testimonial → `POST /api/testimonials` (moderation queue); article-feedback → `POST /api/posts/:slug/feedback`

## 8. Merge notes
Script order per page: kit (`site, ui, fx, layout`) → this part's data file → page script. Nothing else is needed. Each page owns its container ids (`post-root`, `blog-list`, `t-reviews` …); none of the reserved ids are reused.

## 9. Self-test steps
1. Open `blog.html`: 8 articles, 6 on page 1 and 2 on page 2. Filter by a chip, search "knee", sort by Most read; the URL updates and survives a reload.
2. Open `blog-details.html?slug=acl-tear-surgery-or-rehab`: TOC highlights as you scroll; copy link toasts; the booking card opens the appointment page with the service prefilled.
3. Open `blog-details.html?slug=nope`: friendly not-found panel with a link back.
4. Open `testimonials.html`: 14 reviews, 9 shown, "Load more" reveals 5; bars animate once; story tabs switch; submitting the form without a rating shows an error, with valid data shows the thank-you state.

## 10. Known limits
- Newsletter, feedback and review submissions go through `SITE.submit` only; nothing is stored until a backend exists.
- `history.replaceState` may be restricted by some browsers on `file://`; the page still works without URL sync.
- Category names are read from `SITE.blogCategories` (array or slug-keyed map both handled).

## Reference: the 8 articles
| slug | tags | relatedSlugs |
| --- | --- | --- |
| knee-pain-warning-signs | knee pain, arthritis, early diagnosis | acl-tear-surgery-or-rehab, arthroscopy-recovery-week-by-week |
| acl-tear-surgery-or-rehab | ACL, ligament, return to sport | knee-pain-warning-signs, weekend-footballers-injury-prevention |
| arthroscopy-recovery-week-by-week | arthroscopy, physiotherapy, recovery | acl-tear-surgery-or-rehab, shoulder-pain-at-night |
| shoulder-pain-at-night | rotator cuff, sleep, frozen shoulder | slipped-disc-vs-muscle-strain, arthroscopy-recovery-week-by-week |
| slipped-disc-vs-muscle-strain | sciatica, back pain, disc | shoulder-pain-at-night, fracture-first-aid-first-hour |
| weekend-footballers-injury-prevention | football, warm-up, prevention | acl-tear-surgery-or-rehab, knee-pain-warning-signs |
| growing-pains-or-something-more | children, limp, growth | fracture-first-aid-first-hour, weekend-footballers-injury-prevention |
| fracture-first-aid-first-hour | first aid, fracture, accident | slipped-disc-vs-muscle-strain, growing-pains-or-something-more |

**URL-state contract (blog.html):** `?category=<cat slug>` (ignored if unknown) · `?q=<text>` · `?page=<n>` (clamped). Defaults are omitted from the URL; sort is not stored in the URL.
