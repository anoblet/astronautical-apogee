# Application review implementation — November 12, 2026

This implements the functional repairs and presentation work from the
[November 12 review](2026-11-12-application-review.md). The existing Design page
remains the reference; its content and layout are retained, with its heading
connected to the shared appearance settings.

## Implemented

- Replaced client-only navigation with server-rendered overview links and native
  disclosures. Closed mobile content leaves the focus order; menus support
  keyboard activation, Escape, focus restoration, dismissal on outside click or
  focus leaving the panel, and
  cleanup after client navigation. Native details work without JavaScript.
- Rendered homepage content, primary actions, footer, and pricing cards in Astro.
  Essential CSS loads without scripts. Lit shadow roots share the same CSS source.
- Repaired consultation linking and responsive grid minimums. Social pricing and
  the public business card now reflow; export tooling explicitly requests the
  original 1050 × 600 card dimensions.
- Consolidated validated theme state, safe storage access, first-click switching,
  saved overrides, reset, and subscription cleanup. Theme CSS is built from the
  same presets used by the client. Appearance controls live together on Settings;
  Theme links to that maintained interface. Custom heading size and colors have
  actual CSS consumers. Native controls expose names and state.
- Removed unused navigation implementations and Base's post-render anchor
  replacement. Remaining Lit button components render native links or buttons.
- Introduced shared editorial patterns and applied them to the homepage, service
  overview, Hosting, Consultation, Social, Mentorship, About, and portfolio.
  Preserved Design's narrative and layout. Removed duplicated floating booking
  UI and placed a native theme control in the footer to avoid covering mobile
  content. Main pages no longer need the Lit runtime for this control.
- Clarified free discovery versus paid consultation, design-only versus website
  packages, proposal scope, support expectations, and recurring costs. Package
  inquiry links retain a validated selection on Contact. Prices stay unchanged.
- Added professional project detail pages using contributions already described
  in the portfolio, with external client visits labeled separately. Personal work
  now links to this repository, working demos, and implementation sources.
- Removed unverified mentorship testimonials and quantified portfolio claims.
  Reworked the generic data-platform case study as an explicitly hypothetical
  architecture exercise, with no claimed client outcome.
- Added consistent article headers, dates, author context, AI-assisted labels,
  heading hierarchy, related links, and a compact blog index. The empty Lauren
  listing has a useful next step. Demo routes link back to personal projects.
- Added canonical/social metadata, a generated sitemap, robots guidance, a social
  preview image, and a branded 404. Heading fonts now match loaded assets.
- Enabled Astro lint and excluded internal submodules from website lint/types.
  Added browser regressions and a 150 KB script budget for primary pages.
  CI runs lint, website types, build, and browser checks, then audits six
  representative routes three times with accessibility/SEO gates.

## Verification

- Production build passes: 44 HTML pages, including the branded 404 and three
  project detail pages, plus sitemap, robots, and theme CSS endpoints.
- Website lint passes with four pre-existing warnings in the scroll component and
  BeforeRender mixin; the former private-submodule error no longer affects the
  website command. Website-scoped TypeScript checks pass.
- All eleven Chromium regression tests pass. Coverage includes 43 index routes at 1440, 768, 390, and
  320px (172 visits), internal links, no-JavaScript access, mobile and desktop
  keyboard menus, theme switching/persistence/reset, malformed and blocked
  storage, package context, Angular hydration, repeated client navigation,
  light-theme reflow, initial layout stability, script budgets, and generated metadata/404 destinations.
- Inspected desktop and mobile screenshots of the main layouts, including Design,
  Hosting, Contact, and light-theme mobile pricing. The Design content and layout
  remain intact; global navigation, typography, and appearance behavior improve.

- Final local homepage Lighthouse run: 83 performance,
  100 accessibility, 100 best practices, and 100 SEO. LCP was
  1.7 s, CLS 0.044, and total blocking time
  670 ms. This is one local lab run, not a field result or a
  controlled before/after comparison.

Browser regressions serve the actual static output. These are local checks; the
live development server is a separate process.

## Limits and follow-up

No production deployment, external booking transaction, email delivery, provider
uptime validation, formal screen-reader audit, real-device audit, or field
performance measurement is implied by these changes. The generated 404 is
checked locally; actual unknown-path behavior must also be checked after an
authorized hosting deployment.

Project details describe existing documented contributions, not newly verified
client metrics. Any further case-study outcomes require substantiation. Hosting
support windows, backup retention, restoration, and provider service levels are
confirmed in proposals rather than invented here. Blog pagination remains an
option as the collection grows; the current index is compact and complete.
