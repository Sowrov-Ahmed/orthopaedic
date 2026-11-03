# Team Kit 2 — "Aurora Glass" 3D Portfolio for an Orthopaedic Surgeon

Style: Glassmorphism + Editorial + Premium, with 3D depth as the primary technique (tilt, depth layers, flip cards, scroll-3D), plus parallax, gradients and motion.

## Which Claude mode? → a normal chat with file creation (not artifacts)
| | Normal chat + file creation | Artifacts |
|---|---|---|
| Output | Real files in real folders, bundled into **one zip** | One page/file per artifact; no folders |
| Multi-page site with shared JS | Works (files reference each other) | Previews break; every file must be saved by hand |
| Your effort | **1 download per member** | 8–12 copy/download clicks per member |
**Use:** Claude → Settings → Capabilities → switch ON **"Code execution and file creation"**, then start a NEW chat in Sonnet. If your free account does not show that switch, the prompts contain an automatic fallback (one artifact per file in a single reply) — but the zip route is far faster. Check this once before the team starts.

## What is already built for you (this kit)
`js/` five shared files (design system, 3D/parallax engine, ready components, header + footer) · `assets/img/` 28 illustrated images (doctor portrait, 8 treatment illustrations, 3 chamber buildings, 8 article covers, 6 floating 3D objects, logo) · `tools/verify.js` (merge checker) · `tools/page-template.html`.
Images are local illustrations in one style, so they are always relevant and can never be broken links. (Real clinic photos can replace any file later by keeping the same filename.)

## Steps
1. **Everyone (once):** unzip `team-kit-2.zip` (it creates a folder named `site/`). Open any member's finished page from it later to preview.
2. **Each member:** open their prompt file in `prompts/` → copy the whole text → paste into a new chat → send. Wait for the single reply; download **`part-N.zip`**. If it stops early, send `RESUME`.
3. **Unzip `part-N.zip` into your `site/` folder** (it contains only your files, in the right sub-folders) and double-click your pages to preview. No server needed.
4. **Quick check (optional, needs Node):** `node tools/verify.js --part N`.

| Person | Prompt | Delivers |
|---|---|---|
| 1 | PROMPT-1-home-signin-404 | Home (12 sections), Sign-in, 404 |
| 2 | PROMPT-2-about-contact-faqs | About, Contact, FAQs |
| 3 | PROMPT-3-services | Services, Service Details (8 services) |
| 4 | PROMPT-4-chambers-appointment | Chambers, 5-step Appointment wizard |
| 5 | PROMPT-5-blog-testimonials | Blog, Blog Details (8 articles), Testimonials |

## Merge (2 minutes)
Unzip all five `part-N.zip` into the same `site/` folder — no file is shared between parts, so nothing is ever overwritten. Then run `node tools/verify.js` (all parts) and open `index.html`. Fix any reported problem in the owning part only (each part's `docs/PART-*.md` lists its files).

## Why it finishes in one go
Each member only writes pages and their own data: the header, footer, motion engine, cards, forms helpers, tabs, carousel, accordion and every image are pre-built. Each prompt has line budgets, a no-questions/one-reply rule, a built-in zip step and a `RESUME` command.

## Honest limits
Free-plan usage limits still apply: Part 4 (booking wizard) and Part 3/5 (long content) are the largest. If someone hits the limit, wait for the reset and send `RESUME` in the same chat. Nothing could be tested inside Claude's free tier itself; the shared kit was tested in a simulated browser (no errors), and the prompts were not run end-to-end.
