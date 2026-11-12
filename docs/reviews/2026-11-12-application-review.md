# Application review — November 12, 2026

Implementation: [changes and verification](2026-11-12-implementation.md).

Reviewed root revision: `05f816b`, branch `main`. Scope: the complete public
website, including all generated routes, shared components, theme/settings,
framework demos, content, and build/CI configuration. Private records and the
internal applications in `storage` and `copilot` are excluded. This review changes
only documentation and evidence, not application behavior.

The strongest direction is already present in `/services/design/`. Preserve it
and bring the rest of the experience up to its standard. The most urgent work
is navigation access, mobile pricing, and reliable first rendering; the largest
presentation opportunity is making the homepage, portfolio, and remaining
services feel as intentional and concrete as Design.

## Verification and limits

- `pnpm build` passed and generated 40 static pages.
- Installed Playwright drove real headless Chromium against the fresh local
  production build at `http://127.0.0.1:4321`. No browser MCP tool is exposed in
  this session; this uses the browser API available in the workspace.
- Visited all 40 routes at 1440 × 900, 390 × 900, and 320 × 900: 120 visits,
  all HTTP 200, no uncaught page errors with clean storage. Collected titles,
  descriptions, headings, canonical presence, and document overflow.
- Traversed open shadow roots when collecting headings and internal links;
  requested discovered internal destinations and found one 404.
- Reproduced desktop dropdown focus failure, mobile Escape failure, the first
  theme click doing nothing visually, and malformed-storage JSON exceptions.
- Verified the Angular increment button updates its count to one. Checked Design
  in light theme at desktop and mobile; light mobile had no document overflow.
- Inspected full-page screenshots of Design, Hosting, the homepage, professional
  portfolio, social pricing, and the blog. Blank below-fold lazy image regions
  in an immediate full-page capture are not evidence of broken images.
- `pnpm lint` failed with one error and ten warnings. The error remains
  `no-useless-escape` in `storage/.agents/skills/anoblet-google-voice/markdown.ts:7`.
  This is a tooling-scope problem, not an application runtime failure.

[Browser measurements](2026-11-12/browser-results.json) retain per-route results.
The [previous review](2026-11-11-application-review.md) contains detailed theme,
settings, and keyboard reproductions; those older observations are identified
below where this pass relied on source inspection rather than repeating them.
No production deployment, external scheduler transaction, email delivery,
real-device or screen-reader audit, measured contrast audit, Lighthouse score,
field performance, dependency vulnerability audit, or hosting security audit was
performed. Document overflow checks do not establish full accessibility.

## Preserve the Design direction

[Design desktop capture](2026-11-12/services-design-1440.png)

Design succeeds through a combination of decisions, not simply more content:

- An audience-facing headline and a specific explanation of what the service does.
- A split hero with a useful image, a primary project inquiry, and a secondary
  in-page link before the long-form content.
- Consistent content width, restrained accent color, quieter body text, numbered
  sections, and deliberate spacing between ideas.
- Different structures for different jobs: service cards, a process sequence,
  editorial text, deliverables, and a closing contact panel.
- Practical statements about feedback, handoff, proposal scope, and what a
  customer should bring. These help a buyer understand the engagement.
- Responsive stacking without measured horizontal overflow at the three widths.

Extract shared container, eyebrow, section-heading, button, divider, and contact
panel patterns after another page needs them. Keep page-specific narrative and
layout choices. Copying every section onto every service would add repetition.
Design itself would benefit from a verified work example linked from its offer,
and from carrying the same level of detail onto its pricing page. Its shared
navigation and theme controls still inherit the application-wide failures below.

## Prioritized functional findings

| Priority | Finding and evidence                                                                                                                                                                                                                      | Recommended improvement and acceptance                                                                                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High     | Mobile menu icons are click-only custom elements. Escape leaves `opened` true. Source still keeps closed links offscreen; the earlier keyboard sweep found them in Tab order.                                                             | Named native disclosure buttons, accurate expanded state, inert closed content, Escape and focus restoration. Verify the complete keyboard path at 390px, including submenu links and closing after navigation.                                     |
| High     | Social pricing has 650px horizontal overflow at 390px and 720px at 320px. Four other pricing pages overflow 16px at 320px.                                                                                                                | Repair grid intrinsic minimums and responsive tracks in `src/styles/global.ts` and `src/pages/services/social/pricing.astro`. All plans and CTAs must remain accessible without horizontal document scrolling at 320, 390, 768, and desktop widths. |
| High     | Disabling JavaScript leaves the homepage body with only “Skip to main content.” Navigation and essential styling depend on client scripts.                                                                                                | Render the homepage, essential navigation, anchors, and base CSS through Astro. Verify meaningful content and a contact route before hydration and with JavaScript disabled. Keep interactive enhancements in Lit.                                  |
| Medium   | Services overview links to `/services/services/consultation`, returning 404.                                                                                                                                                              | Change the relative URL in `src/pages/services.astro` to `/services/consultation`; add a generated-site internal-link check.                                                                                                                        |
| Medium   | Focusing desktop Portfolio leaves its submenu `visibility: hidden`, `opacity: 0`. Expanded state stays false in source.                                                                                                                   | Implement real keyboard disclosures or focus-accessible links; keep access to overview pages and expose actual state.                                                                                                                               |
| Medium   | Theme starts dark; successive clicks resolve to dark, then light. The toggle has no native button or accessible control name.                                                                                                             | Initialize from one resolved state, use a named native button, and support keyboard activation. First activation must visibly switch theme.                                                                                                         |
| Medium   | Setting saved theme data to `invalid` produces repeated JSON parse errors on reload. Both theme implementations parse without recovery.                                                                                                   | Centralize storage parsing, schema validation, unavailable-storage handling, and fallback. Verify malformed JSON, null, invalid value types, and restricted storage.                                                                                |
| Medium   | Source still restores only the preset name, discarding saved overrides. Reset applies light properties without updating the theme attribute or subscribers. The previous browser pass also found ineffective heading/background settings. | One theme schema, one update path, consistent CSS tokens, and cleanup of obsolete overrides. Verify changes visually, after reload, and after reset; keep toggle and form synchronized.                                                             |
| Medium   | `/settings/` still stores input only in component state and promises accessibility preferences that are absent.                                                                                                                           | Connect and persist a useful setting, consolidate with theme settings, or remove the unfinished control and narrow the promise.                                                                                                                     |
| Medium   | Business card overflows 330px at 390px and 365px at 320px.                                                                                                                                                                                | Separate fixed export dimensions from a responsive public preview; preserve readable contact details.                                                                                                                                               |
| Medium   | Base retains theme subscriptions; navigation retains anonymous window listeners. Astro client navigation can detach these elements. This is source evidence, not a measured heap leak.                                                    | Unsubscribe and remove stable handlers on disconnect. Measure retained listeners/components during repeated navigation.                                                                                                                             |
| Medium   | CI only audits `/`, once, with warning thresholds; Astro files are ignored by ESLint. Root lint enters internal submodules and fails.                                                                                                     | Scope website lint separately, enable Astro checks, and gate build, links, keyboard navigation, theme recovery/persistence, and representative mobile routes.                                                                                       |
| Low      | No canonical appeared on any route. Shared head lacks social metadata; source lacks a sitemap integration and custom 404.                                                                                                                 | Set the actual public site URL and canonical/social metadata; generate a sitemap and useful 404. Verify unknown-path behavior on the hosting platform separately.                                                                                   |

[Social pricing at 390px](2026-11-12/services-social-pricing-390.png) shows the
actual scrollable document width; the capture is wider than the viewport.

Primary source locations: `src/components/navigation/{mobile,desktop}/`,
`src/components/theme/`, `src/components/settings/index.ts`,
`src/utility/theme.ts`, `src/components/base/index.ts`,
`src/components/business-card.ts`, `src/layouts/default.astro`, and
`.github/workflows/lighthouse-ci.yml`.

## Page-by-page presentation and content improvements

These are editorial and product recommendations unless an observed defect is
explicitly identified. No conversion uplift was measured.

### Homepage and shared navigation

[Homepage at 390px](2026-11-12/home-390.png)

The homepage is a name, a randomly selected general tagline, and two portfolio
buttons. It offers much less context than Design and gives service buyers no
labeled service or booking action in the main content. Replace the random line
with a stable, concrete offer, one primary inquiry action, and a secondary work
link. Add a short services introduction and a small selection of verified work.
Use the Design hero's hierarchy and spacing while retaining an appropriate
homepage identity.

Navigation has a home icon but no visible name/wordmark. Pricing and Contact are
not explicit top-level choices; mobile Portfolio and Services summaries do not
link to their overview pages. Give users clear overview links, a visible way to
contact Andrew, and current-page context. The floating phone icon actually opens
scheduling: use an appropriate booking icon or visible label. Retain its existing
accessible link name. Check fixed corner controls against content and focus at
small widths and zoom before deciding their placement.

### Services overview, Hosting, and Consultation

[Hosting desktop capture](2026-11-12/services-hosting-1440.png)

These pages rely on repeated bordered cards and generic benefit statements.
Hosting's four introductory benefits fall into a three-plus-one layout at the
reviewed desktop width. Use an intentional layout and group features by customer
need. Carry Design's offer → fit → process → deliverables → next-step structure
into Hosting and Consultation, with their own content and section lengths.
Bring an inquiry or pricing action into the opening section instead of requiring
the reader to reach the end.

Hosting promises “24/7 Support,” guaranteed 99.9% uptime, zero-downtime migration,
daily backups, and advanced security across its service/pricing copy. These may
be valid offerings, but the public pages do not explain response windows,
measurement, backup retention/restoration, exclusions, or plan differences.
Confirm the operational commitments and describe them precisely. Define
migration assessment and recovery responsibilities before promising outcomes.
This review did not independently validate the service's operations.

Consultation lists many capabilities but gives little indication of the tangible
result of a session. Explain what the client brings, the session format, and
agreed outputs using confirmed scope. Distinguish the free discovery call from
paid technical work. Link consultation pricing directly from the service page.

### Social service

The social page already has useful specifics: owner approval, group rules,
reply follow-up, and what customers should prepare. Preserve those. Its long
sequence of sections can be easier to scan with a concise opening summary,
earlier package navigation, and a small illustrative workflow. Condense repeated
explanations of voice, approval, and follow-up while keeping responsibilities
clear. Fix pricing reflow before changing its presentation.

### Pricing and contact

The design pricing route falls back to two generic cards after the richer Design
experience. Explain design-only versus implemented website scope, the difference
between the $499/$999 design packages and $999/$2,499 website packages, and what
happens after clicking an inquiry action. Confirm timing, revision rounds,
handoff, support duration, and recurring expenses through the proposal rather
than inventing included services.

`src/components/PackageExpectations.astro` already contains useful next-step and
scope language, but no page imports it. Reuse it where appropriate after checking
that it accurately describes the offer. Standardize one-time/monthly labels,
package comparison structure, and action wording across the five pricing routes.

Contact says “All appointments are free” even though paid consultation packages
exist. Narrow this to the introductory call. Add a visible direct email option,
what to prepare, and what happens after booking. If a visitor selects a package,
carry its name into the contact context rather than sending every plan to the
same generic page with no visible selection. External booking completion was
not tested.

### Portfolio

Professional portfolio has useful client screenshots and contributions, but
“Learn more” leaves for the client website. Add concise case studies explaining
Andrew's role, the problem, constraints, decisions, and verifiable results. Keep
external visits as secondary “Visit website” links so the destination is clear.
Do not publish new metrics or claims without evidence and permission.

Personal portfolio primarily presents technologies rather than distinct personal
artifacts. Lead with actual projects, demos, or specific contributions and their
source links. Framework descriptions can support those projects. The Angular
demo works; keep it as supporting evidence rather than making framework choice
the primary customer story.

### About and Mentorship

About has a strong personal identity but repeats background and philosophy over
many long sections before the professional next step. Lead with a concise
professional introduction, explain how Andrew works with clients, and keep
personal history as a deeper optional read. Preserve factual voice and distinctive
interests while removing repeated statements.

Mentorship should make the audience, session structure, boundaries, and next
step as concrete as Design does for project work. Clarify its relationship to
consultation and whether the initial call or ongoing engagement is being offered;
confirm terms before adding prices or guarantees.

### Blog and secondary routes

Observed: `/blog/sustainable-business-models-tech-platforms/` has no heading;
`/blog/genaiscript-usage/` begins with H2. Other posts jump from H1 to H3. The
article template renders only the Markdown content and optional image, so titles,
dates, and heading structure depend on each post. Render a consistent article
header from frontmatter and adjust Markdown headings to avoid duplicate H1s.
Add a useful return path, author/date context, and relevant related links.

The blog index is long and image-heavy. Consider a featured article followed by
compact summaries, topic groupings, and pagination as the collection grows.
Do not mistake untriggered lazy images in full-page screenshots for image failures.

Source marks multiple articles `ai: true`, but the content schema does not expose
that field and the computed generated/original arrays are unused. If editorial
provenance is intended, explicitly model and render it. More concerning,
`technical-case-study-portfolio-deep-dive.md` describes an enterprise real-time
data platform and claimed outcomes without naming a verifiable project. Validate
it as actual work or clearly present it as an illustrative example. This review
has not established that those claims are false; it found insufficient public
context to substantiate them.

`/lauren/` currently renders an empty listing. Give it a meaningful empty state
or remove it from the public build until it serves a purpose. Decide which of
`/theme/`, `/settings/`, `/angular/`, `/lit/`, and `/business-card/` are maintained
public experiences and give each a clear route back to the main site. Public
demos should support the portfolio rather than resemble unfinished product pages.

## Architecture and performance follow-through

Keep static content in Astro and hydrate interaction only where needed. Consolidate
one theme implementation, use native anchors rather than Base replacing itself
with an anchor after render, and clean up lifecycle subscriptions. Align heading
font declarations with loaded fonts: Poppins is named in global styles, while
`fonts.css` imports Noto Sans only. Test both themes after shared token changes.

The build uses custom Angular/Oxc and source-map compatibility plugins. Keep them
isolated, document their reason, and verify the Angular route during framework
upgrades. No unnecessary Angular transfer on other routes was demonstrated.
Measure route transfer sizes, LCP, CLS, and interaction behavior on a throttled
mobile profile before claiming performance improvements. Image optimization and
the successful static build are useful foundations; a fast local visit is not a
field-performance measurement.

## Recommended delivery sequence

1. **Restore access and reflow:** navigation keyboard behavior, broken service
   link, mobile pricing, and theme control accessibility. Done when all relevant
   routes work with keyboard and fit 320px without concealed overflow.
2. **Make rendering and state dependable:** server-render primary content/CSS,
   unify theme persistence/reset/recovery, and repair or remove unfinished settings.
   Done when no-JavaScript content remains useful and corrupt storage recovers.
3. **Apply the Design standard:** homepage, service overview, Hosting and
   Consultation, then matching pricing and contact. Preserve the existing Design
   page; use it as a pattern source. Done when buyers can identify the offer,
   scope, evidence, price basis, and next step without guessing.
4. **Strengthen proof and publishing:** verified portfolio case studies, article
   structure/provenance, metadata, empty states, and 404 recovery.
5. **Keep improvements protected:** scoped lint and meaningful CI regression
   checks, lifecycle verification, and measured performance budgets.

Ship the small functional repairs before undertaking the larger presentation
work. Each delivery should include desktop/mobile, both themes, and the relevant
keyboard or persistence verification rather than relying solely on screenshots.
