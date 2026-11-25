# Website browser tests

[site.spec.ts](site.spec.ts) checks the built public routes in Chromium.
It exercises internal links, narrow layouts, keyboard and no-JavaScript
navigation, theme settings, and generated metadata. Homepage navigation
checks use the discovery-call link in the hero.

```mermaid
flowchart LR
    Build[Generated site in dist] --> Chromium[Playwright Chromium]
    Chromium --> Routes[Page rendering and internal links]
    Chromium --> Interaction[Menus, homepage discovery call, and theme controls]
    Chromium --> Metadata[Sitemap and social metadata]
```
