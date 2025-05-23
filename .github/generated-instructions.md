# Code Style and Technique Instructions for `src`

- Uses Astro for layouts and pages, emphasizing componentization and reusability.
- Components are simple, composable, and split into focused files.
- Layouts centralize shared structure (headers, footers, global elements) and use slots for content.
- CSS variables are used for colors, spacing, and typography, supporting a global color scheme and theming.
- Styles are modular: global styles in `global.css`/`colors.css`, scoped styles in components.
- Responsive design is implemented with flexbox, grid, and media queries.
- Interactive elements have clear hover/focus states; semantic HTML is prioritized for accessibility.
- Web Components (LitElement) are used for interactive UI; Astro components for static/layout elements.
- Components are minimal, with logic and structure separated for reusability.
- Shared base classes and utilities provide common functionality and styles.
- Code avoids unnecessary comments and prefers self-explanatory naming.
- All code adheres to the global color scheme and design tokens.
- Minimal duplication: reusable logic and structure are abstracted into components/utilities.
- Accessibility is considered via semantic HTML and ARIA roles where appropriate.
- Project structure is organized for clarity, with clear separation between assets, components, layouts, and pages.
- The codebase is designed for maintainability and extensibility, focusing on composability and DRY principles.
