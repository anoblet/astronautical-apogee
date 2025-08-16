# Project TODO List

This document outlines the next steps for the astronautical-apogee project, based on a comprehensive analysis of the codebase, existing documentation, and user preferences. The tasks are prioritized to deliver the most impact in terms of simplification, performance, and content quality.

## Priority 1: Code Simplification & Refactoring

The highest priority is to reduce the complexity of the codebase. While the engineering practices are excellent, the project has become overly complex, presenting opportunities for significant simplification.

- [ ] **Icon System Consolidation:**
    -   **Problem:** The current icon system is fragmented across 16 separate files.
    -   **Solution:** Consolidate all SVG icons into a single, optimized sprite or a smaller set of icon components. This will reduce network requests and simplify icon management.

- [ ] **Theme System Refactoring:**
    -   **Problem:** The theme system uses runtime JavaScript for switching, which is over-engineered.
    -   **Solution:** Refactor the theme system to use CSS-native features like variables and `prefers-color-scheme` media queries. This will eliminate unnecessary JavaScript and improve performance.

- [ ] **Component Audit & Consolidation:**
    -   **Problem:** There is a high degree of over-componentization, with many components containing minimal code.
    -   **Solution:** Audit all components and consolidate smaller, related components into larger, more cohesive units. The goal is to reduce the total number of components by 40-50% without sacrificing functionality.

- [ ] **Global Stylesheet Modularization:**
    -   **Problem:** The global stylesheet is over 500 lines long, making it difficult to manage.
    -   **Solution:** Break down the global stylesheet into smaller, more focused modules (e.g., `_variables.css`, `_base.css`, `_utilities.css`).

- [ ] **GenAIScript Package Review:**
    -   **Problem:** The `genaisrc` packages need to be evaluated for their usage patterns.
    -   **Solution:** Review the GenAI automation scripts and consolidate where possible. Ensure they are aligned with the latest project goals.

## Priority 2: Content Development

With a simplified codebase, the focus can shift to expanding and improving the project's content.

- [ ] **Expand Blog Content:**
    -   **Task:** Write and publish more technical articles on topics relevant to the project's focus (Astro, AI, web development).

- [ ] **Enhance Portfolio:**
    -   **Task:** Add detailed case studies to the portfolio, showcasing the technical challenges and solutions for each project.

- [ ] **Refine Service Pages:**
    -   **Task:** Improve the descriptions of the services offered and ensure the pricing pages are clear and easy to understand.

## Priority 3: Workflow & Automation

Further improvements to the development workflow will increase efficiency and code quality.

- [ ] **Deepen MCP Server Integration:**
    -   **Task:** Explore more ways to leverage the MCP servers for memory, sequential thinking, and validation to further automate the development process.

- [ ] **Streamline Validation Pipeline:**
    -   **Task:** Expand the Playwright test suite to cover more user flows and edge cases.

## Priority 4: Business & Strategy

Aligning the project with business goals is crucial for its long-term success.

- [ ] **Implement Lead Generation:**
    -   **Task:** Add contact forms and calls-to-action to capture potential leads.

- [ ] **Develop Content Marketing Strategy:**
    -   **Task:** Create a plan for promoting the project's content and engaging with the community.

- [ ] **Set Up Analytics:**
    -   **Task:** Integrate an analytics tool to track website traffic and user behavior.

## Priority 5: Technical Debt & Maintenance

Addressing technical debt and performing regular maintenance will ensure the project remains healthy.

- [ ] **Improve Code Quality & Documentation:**
    -   **Task:** Refactor any remaining complex code and add documentation where it is lacking.

- [ ] **Regular Maintenance:**
    -   **Task:** Regularly update dependencies, audit for performance issues, and ensure the project adheres to best practices.
