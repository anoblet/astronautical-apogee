---
id: 'lit-experience'
title: 'Building with Lit'
date: '2025.07.10'
description: 'How Lit transformed my approach to web components and UI development'
---

# Building with Lit

### How Lit transformed my approach to web components and UI development

When I set out to modernize my portfolio and client projects, I wanted a UI foundation that was fast, future-proof, and didn’t lock me into a single ecosystem. Lit stood out for its simplicity and its commitment to web standards. Over the past year, it’s become the backbone of my workflow—powering everything from this portfolio to internal tools and CMS experiments.

Here’s what I’ve learned building with Lit:

- **Simplicity first:** Lit’s API is minimal and intuitive. I spend less time fighting the framework and more time building features. For example, in my portfolio, creating a new card or tag component is as simple as extending a base class and writing a template—no extra build steps or custom syntax.
- **Performance by default:** With a tiny footprint and efficient updates, Lit keeps my sites fast—even as they grow. In [my-project](https://github.com/anoblet/my-project), switching to Lit reduced load times and made it easier to optimize for Lighthouse scores.
- **Scoped, atomic styles:** Shadow DOM and CSS variables make it easy to maintain a consistent, themeable design system. I use CSS variables from a global palette, so every component—from navigation to buttons—stays visually consistent and easy to theme.
- **True reusability:** Components I build for one project (like this portfolio) drop seamlessly into others, from CMS tools to client apps. In [lit-cms](https://github.com/anoblet/lit-cms), I reused the same card and tag components to quickly prototype new features.
- **Interoperability:** Lit components work everywhere HTML does—no lock-in, no surprises. I’ve embedded Lit elements in Astro, static sites, and even legacy apps without friction.
- **Accessible by design:** Semantic templates and ARIA support make it straightforward to build inclusive interfaces. Keyboard navigation and skip links are easy to implement, and accessibility is a baseline, not an afterthought.
- **Real-world impact:** In this portfolio and projects like [my-project](https://github.com/anoblet/my-project) and [lit-cms](https://github.com/anoblet/lit-cms), Lit has helped me:
  - Reduce bundle size and complexity, making deployments faster and maintenance easier
  - Centralize and reuse UI logic, so updates are consistent and bugs are rare
  - Move faster with fewer bugs, thanks to clear patterns and minimal boilerplate

**If you’re considering Lit:**

- Start small—wrap a single UI element as a Lit component and see how it fits your stack.
- Use CSS variables and the Shadow DOM to keep styles maintainable and themeable.
- Lean into web standards: Lit rewards you for writing clean, semantic HTML and accessible interfaces.
- Don’t be afraid to mix Lit with other frameworks or static site generators—interoperability is a superpower.

**What’s next?**

I’m excited to see Lit’s ecosystem grow, especially around design systems and accessibility tooling. For anyone building modern web apps, Lit is the most reliable, future-ready foundation I’ve found.
