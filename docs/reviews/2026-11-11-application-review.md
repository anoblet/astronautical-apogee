# Application review — November 11, 2026

Reviewed revision: `5414d4b`, branch `docs/require-completion-commit`.
This is a review of the public Astro website, including its Lit components,
Angular demo, content routes, build configuration, and CI. Internal tools and
private records in the `copilot` and `storage` submodules are outside the product
review. Application code was not changed.

## Coverage and results

- Built the current checkout with `pnpm build`: passed, 40 static pages.
- Opened all 40 pages in headless Chromium using installed Playwright at
  1440 × 900 and 390 × 900: 80 page visits. All returned HTTP 200; no uncaught
  page errors occurred with clean browser storage.
- Collected rendered headings, page titles, canonical metadata, horizontal
  overflow, and internal links, including links inside open shadow roots.
- Checked unique internal link destinations: one returned 404.
- Tested mobile menu opening, Escape, navigation, and sequential keyboard focus;
  desktop dropdown focus; theme toggling, edits, reset, reload, and corrupt
  storage; settings input; and the Angular increment button.
- Inspected screenshots of the home, design, professional portfolio, and pricing
  pages at both widths, plus social pricing, light theme, and JavaScript disabled.
- Checked four pricing pages at 320px: each overflowed horizontally by 16px.
- `pnpm lint` failed: one error and ten warnings across the root and submodules.
  The error is `no-useless-escape` in
  `storage/.agents/skills/anoblet-google-voice/markdown.ts:7`.

No browser MCP tool was exposed in this session; Playwright drove a real local
Chromium browser against the freshly built site at `http://127.0.0.1:4321`.
These are local production-build results, not a production hosting audit. External
booking, email delivery, external portfolio availability, real-device behavior,
formal screen-reader testing, Lighthouse scores, dependency vulnerability scans,
and field performance were not verified. Lazy images that had not yet loaded
below the fold were not counted as broken assets. Angular Material tags were not
counted as undefined Lit components.

## Findings, ordered by priority

### 1. High: mobile navigation excludes keyboard users

**Evidence:** With the menu closed at 390px, Tab visits Home, Portfolio, Services,
Mentorship, Blog, About, and social links positioned offscreen at negative x
coordinates. The menu and close icons expose images, not named buttons, and
cannot be reached as keyboard controls. Escape leaves the opened menu open.

**Source:** `src/components/navigation/mobile/index.ts` and `index.css.ts`.
The panel is moved offscreen rather than made inert or hidden; icon clicks are
its only toggle mechanism.

**Improve:** Use named native buttons with `aria-expanded` and `aria-controls`;
make the closed panel inert; implement Escape, focus placement and restoration,
and intentional focus containment while the panel is open. Verify keyboard-only
access at mobile width. Navigation to About did clear the scroll lock in this
run; a stuck navigation scroll lock was not reproduced.

### 2. High: social pricing is substantially wider than a mobile screen

**Evidence:** `/services/social/pricing/` has a 1040px document at a 390px viewport:
650px horizontal overflow. Its content sections measure 1024px and the three
pricing cards stay side by side. Much of the heading, packages, and booking
content requires horizontal scrolling.

**Source:** `src/pages/services/social/pricing.astro`, nested `.grid.page` and
`.auto-fit-20`, plus `src/styles/global.ts` grid sizing.

**Improve:** Allow outer grid items to shrink (`min-width: 0` and constrained
tracks), and use responsive card minimum widths. Check this fix at 320, 390,
768, and desktop widths without hiding overflow to conceal inaccessible content.

[Browser screenshot](2026-11-11/social-pricing-mobile.png)

### 3. High: the homepage and navigation depend entirely on JavaScript

**Evidence:** With JavaScript disabled, the homepage body text contains only
“Skip to main content.” The name, value proposition, portfolio links, navigation,
and contact controls are absent. Global styling is also installed by script.

**Source:** `src/pages/index.astro`, `src/components/Navigation.astro`,
`src/layouts/default.astro`, and `src/styles/global.ts`.

**Improve:** Render primary content, navigation, links, and essential CSS in
Astro; reserve client components for behavior that requires them. This also
reduces the impact of script failures and improves initial rendering and crawler
compatibility. This finding does not establish how any specific search engine
currently indexes the site.

[Browser screenshot](2026-11-11/home-without-javascript.png)

### 4. Medium: a service link leads to a 404

**Evidence:** Technical Consultation’s “Learn more” on `/services/` resolves to
`/services/services/consultation`, which returns 404. It uses the relative URL
`services/consultation`; `/services/consultation` is the working destination.

**Source:** `src/pages/services.astro`.

**Improve:** Use a root-relative URL and add generated-site internal-link checks,
including trailing-slash routes and shadow-root links.

### 5. Medium: desktop dropdowns cannot be opened through keyboard focus

**Evidence:** Focusing Portfolio leaves its submenu at `visibility: hidden` and
`opacity: 0`. The only opening selector is `:hover`. The triggers declare button
roles and `aria-expanded="false"`, but have no matching toggle behavior or state
updates.

**Source:** `src/components/navigation/desktop/index.ts` and `index.css.ts`.

**Improve:** Use navigation disclosure buttons with actual expanded state and
keyboard behavior, or plain links with a focus-accessible submenu. Preserve a
clear way to visit the Portfolio and Services overview pages.

### 6. Medium: theme toggle is unnamed, unfocusable, and initially out of sync

**Evidence:** The accessibility snapshot exposes an image with no control name.
The custom host listens only for clicks. A fresh visit starts visually dark,
but the toggle initializes its internal state to light: first click selects
dark again; the second selects light.

**Source:** `src/components/theme/toggle.ts` and `src/utility/theme.ts`.

**Improve:** Render a named native button, support keyboard activation, initialize
from the same resolved theme as the document, and expose current state.

### 7. Medium: custom theme settings do not survive reload correctly

**Evidence:** Entering `61px` in the theme heading-size field saves the value
and sets `--h1-font-size`. Reload removes that inline variable because
`getTheme()` restores the named preset rather than saved overrides. The heading
CSS uses a fixed `2.5rem`, so this setting also lacks a consumer. The Background
field writes `--background-color`, while the body uses `--body-background-color`.

**Source:** `src/components/theme/settings.ts`, `src/utility/theme.ts`, and
`src/styles/global.ts`.

**Improve:** Define one validated theme schema, use consistent token names,
merge supported overrides with presets, and connect every exposed setting to
actual styles. Verify visual changes immediately and after reload.

### 8. Medium: theme reset leaves conflicting state

**Evidence:** Clicking Reset Theme sets the body background to `#fff` while
`data-theme` remains `dark`. Reset uses `setProperties(light)` rather than
`applyTheme(light)` and therefore skips attribute/subscriber updates. It also
leaves custom inline properties that are absent from the light preset.

**Source:** `src/utility/theme.ts`.

**Improve:** Route reset through the same theme state update as normal selection,
clear obsolete overrides, and synchronize the toggle and settings form.

### 9. Medium: malformed saved theme data causes repeated runtime errors

**Evidence:** Setting `localStorage.theme` to `invalid` and reloading `/theme/`
produces repeated JSON parse exceptions. Both theme implementations parse storage
without recovery; Base components also resolve theme state during initialization.
Clean-storage visits did not exhibit these errors.

**Source:** `src/utility/theme.ts`, `src/components/theme/toggle.ts`, and
`src/components/base/index.ts`.

**Improve:** Centralize storage access, validate parsed data and value types,
recover to a known preset, and handle unavailable browser storage. Add focused
regressions for malformed JSON, null, unsupported schemas, and storage failures.

### 10. Medium: the settings page accepts input without applying it

**Evidence:** Changing Heading Font Size on `/settings/` updates only the
component’s `values` object. The rendered heading remains 40px and no persistent
setting is written. The page description promises accessibility preferences
that are not present.

**Source:** `src/components/settings/index.ts` and `src/pages/settings.astro`.

**Improve:** Consolidate with working theme settings, validate/apply/persist the
field, or remove the unfinished public control and narrow the description.

### 11. Medium: narrow-screen pricing cards and business card overflow

**Evidence:** At 320px, `/pricing/` and design, hosting, and consultation pricing
each overflow by 16px. At 390px, `/business-card/` overflows by 330px. The common
pricing grid has a 20rem track minimum; the business card declares 1050px width.

**Source:** `src/styles/global.ts`, pricing routes, and
`src/components/business-card.ts`.

**Improve:** Let pricing tracks shrink to available width. Keep fixed business
card dimensions for export in a dedicated presentation and provide a responsive
public preview.

### 12. Medium: CI does not protect the behaviors that failed this review

**Evidence:** The visible workflow audits only `/`, runs once, and sets all
Lighthouse thresholds to warnings. It does not run lint, type checks, keyboard
flows, internal-link checks, or pricing-page reflow checks. ESLint explicitly
ignores `.astro` files despite having the Astro plugin installed. Root lint
traverses private tooling and currently fails on an unrelated submodule file.

**Source:** `.github/workflows/lighthouse-ci.yml`, `lighthouserc.cjs`,
`eslint.config.js`, and `package.json`.

**Improve:** Separate website and internal-tool checks; lint Astro source;
introduce meaningful gates for build, types, links, keyboard navigation, theme
persistence, and mobile pricing layout. Expand audits to representative service,
portfolio, blog, and pricing routes. These targeted tests protect demonstrated
failures rather than duplicating implementation details.

### 13. Medium: component lifecycle retains detached components

**Evidence from source:** `subscribe()` adds callbacks to a module-level array
without an unsubscribe API. Every Base component registers a closure referencing
itself. Both navigation implementations attach anonymous window scroll listeners
without removing them. The shared layout uses Astro client navigation, so repeated
page swaps can retain detached components and accumulate work.

**Source:** `src/utility/theme.ts`, `src/components/base/index.ts`, and both
navigation components.

**Improve:** Return unsubscribe functions, clean up in `disconnectedCallback`,
and use stable event handlers. Verify with repeated navigation and heap/listener
measurements. A quantified memory leak or field latency impact was not measured.

### 14. Low: metadata and error recovery need completion

**Evidence:** No canonical link appeared on any of the 40 routes. The shared
layout has no Open Graph or Twitter metadata. The public directory has only a
favicon; there is no sitemap integration or custom 404 route in source.

**Source:** `src/layouts/default.astro`, `astro.config.mjs`, `public/`, and
`src/pages/`.

**Improve:** Configure the production site URL, add canonical and social metadata,
generate a sitemap, and provide a branded 404 with useful navigation. Check actual
Cloudflare unknown-path behavior separately before defining redirect/fallback
policy; the local preview’s 404 does not establish deployed behavior.

### 15. Low: homepage, portfolio, and contact could make the offer clearer

**Evidence:** The homepage offers a randomly chosen generic tagline and two
portfolio links, without a concrete service explanation or labeled booking CTA.
Personal portfolio cards mainly describe Astro, Lit, and GenAIScript and link to
those products. Professional entries link to client websites rather than detailed
case studies. Contact offers scheduling only; direct email is in navigation social
links. Service pricing is spread across several routes.

**Improve:** Give the homepage one stable, concrete value proposition and a visible
next step. Show actual work, role, constraints, and verified outcomes in case
studies; link specific contributions where available. Label direct email on the
contact page and make free introductory consultation versus paid sessions clear.
Clarify how the $999/$2,499 web packages relate to the $499/$999 design packages
without changing prices or inventing deliverables.

### 16. Low: consolidate duplicated theme and presentation infrastructure

**Evidence from source:** Theme lookup exists in both `toggle.ts` and
`utility/theme.ts`; homepage desktop/mobile content is duplicated; Base implements
link behavior by replacing itself with a newly created anchor after rendering;
fonts declare Poppins headings while only Noto Sans is imported. Vite contains
custom Angular compatibility patches.

**Improve:** Keep one theme implementation, use CSS to adapt one semantic content
tree, prefer server-rendered native anchors, align font declarations with loaded
assets, and retain documented compatibility checks around framework upgrades.
Keep Angular isolated to its demo route unless broader use has a demonstrated
benefit; no unnecessary Angular payload on other routes was established here.

## Suggested delivery order

1. Fix navigation keyboard access, the consultation URL, and pricing reflow.
2. Consolidate theme state and storage, then repair or remove ineffective settings.
3. Move essential content and CSS to server-rendered output.
4. Add regressions for the demonstrated failures and tighten CI scope and gates.
5. Improve metadata, error recovery, portfolio proof, and conversion copy.

The existing build, clean-storage runtime behavior, use of image optimization,
shared service components, and working Angular increment interaction provide a
useful foundation. Prioritize the reproducible access and layout failures before
expanding the feature set.
