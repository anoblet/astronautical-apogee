# Website pages

Astro routes provide the public website’s server-rendered content. The
[homepage](index.astro) introduces Andrew through his portrait, work, and early
maker projects; [About](about.astro) connects that work to his background and
interests. Other routes cover services, portfolios, writing, contact, and demos.
Shared layouts and components provide navigation, themes, imagery, and actions.
Keep public biographical copy grounded in approved facts and existing site content.

```mermaid
flowchart LR
    Biography[Public biography and professional work] --> Routes[Astro page routes]
    Routes --> Home[Homepage portrait and maker introduction]
    Routes --> About[About: background and hands-on interests]
    Layout[Shared layout and components] --> Routes
    Home --> Contact[Work exploration and contact]
    About --> Contact
```
