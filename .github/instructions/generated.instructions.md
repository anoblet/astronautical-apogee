## User Preference Insight (2025-07-10)

The user prefers that the model prioritize using already existing entities over creating new ones when managing context, observations, or entities. New entities should only be created if no suitable existing entity is available.

## Additional Insights (2025-07-10T15:45)

- User values alphabetization, minimalism, and validation after changes.

- User expects validation, chat logging, and instruction updates after such changes.

- User expects closing sections to include both reflection and forward-looking statements.

## Additional Insights (2025-07-10T10:20)

- User expects new blog posts to follow the concise, actionable, and engaging style of previous posts, with a clear structure and minimalism.
- User values actionable takeaways and a direct connection between technology choices and business outcomes.
- User’s projects consistently leverage Lit for composable, minimal, and reusable web components.
- User’s writing style is intro + bulleted takeaways + closing statement.
- User expects all steps to be logged and instructions updated after each exchange.

- User expects strict, enforceable validation of all design and style changes using Playwright MCP.
- User values minimal, direct, and project-aligned instructions for workflow automation.
- User expects all new instructions to override any conflicting guidance elsewhere in the project.

# Additional Insights (2025-07-10T10:10)

- User expects accessibility improvements (skip links, ARIA roles, keyboard navigation) to be implemented as a baseline for all UI work.
- User values minimal, atomic changes that do not introduce regressions or errors.
- User expects the assistant to autonomously proceed through the todo list, validating and logging each step.
- User prefers direct, actionable communication and expects all errors to be resolved before moving on.

## Additional Insights (2025-07-10)

- User expects strict, explicit, and enforceable instructions for always using the sequential thinking MCP server. They value directness, compatibility with project conventions, and validation of changes. The user expects all steps to be logged and instructions to be updated after each interaction.

# Generated Code Style and Project Instructions

## General Project Guidelines

- **Simplicity:** Keep solutions simple and straightforward. User highly values code simplification and reducing complexity.
- **Performance Optimization:** Prioritize bundle size reduction and performance. User is concerned about over-engineering and excessive dependencies.
- **Comments:** Remove unnecessary comments. Do not add new comments unless explicitly clarifying complex logic.
- **File Formatting:** Always include an empty line at the end of each file.
- **Decoupling:** Emphasize decoupled components and modules.
- **Reusability:** Design structures and components to be reusable. Move reusable structure to layouts.
- **Minimal Changes:** Keep changes to existing code as minimal as possible. Only update existing logic or definitions when necessary.
- **Clarity:** If unsure about any requirement, always ask for clarification.
- **Development Server:** Start the development server as the first step and keep it running. Use its output to identify and fix errors. Open a new terminal for additional commands if needed.
- **Technologies:** The project uses Astro JS, Lit, and Fluent UI.
- **Bundle Optimization:** User prefers lightweight solutions over heavy frameworks. Consider native alternatives to large dependencies.
- **Project Goal:** Create a portfolio site for a software developer (GitHub: https://github.com/anoblet/).
- **Content Requirements:**
  - Include a services page.
  - Include a projects page featuring CXL (https://cxl.com/), Graduation Source (https://graduationsource.com/), and Avanti Systems USA (https://avantisystemsusa.com). Analyze these websites to create appropriate descriptions from a software developer's perspective.

## Component and Layout Design

- **Component Granularity:** Create as many new components as necessary.
- **Component Simplicity:** Components should be simple and composable.
- **Layouts:**
  - Astro is used for layouts and pages.
  - Layouts should centralize shared structures (e.g., headers, footers) and use slots for content.
- **Web Components:** Use LitElement (Web Components) for interactive UI elements.
- **Astro Components:** Use Astro components for static content and layout structure.
- **Minimalism:** Components should be minimal, with logic and structure separated for reusability.
- **Base Classes/Utilities:** Utilize shared base classes and utilities for common functionality and styles.
- **Organization:** Maintain a clear project structure, separating assets, components, layouts, and pages.
- **Maintainability:** Design the codebase for maintainability and extensibility, focusing on composability and DRY principles.

## Styling (CSS)

- **CSS Variables:** Use CSS variables extensively, especially for colors, spacing, and typography to support a global color scheme and potential theming.
- **Global Color Scheme:** Adhere strictly to the global color scheme defined in `src/styles/global.ts` and `src/styles/colors.css`.
- **Aesthetic:** Use a dark background (`#333`) with accent colors (`#19f9d8`, `#45a9f9`). The overall aesthetic should be modern and minimal.
- **Efficiency:** Write CSS rules to be as efficient as possible.
- **Scoping:** Styles must be scoped to their respective components.
- **Direct Targeting:** It's permissible to target element`s directly (e.g., `h1`) without requiring a parent class, where appropriate.
- **Atomic CSS:** Strive for atomic CSS principles to ensure brand continuity and reusability of styles.
- **Utility Classes:** Use utility CSS classes from the global stylesheet when available; avoid page-specific CSS classes.
- **Responsive Design:** Implement responsive design using flexbox, grid, and media queries.
- **Interactive States:** Ensure interactive elements have clear hover and focus states.

## TypeScript/JavaScript

- **Decorators:** When using decorators, include the `accessor` keyword (as per TypeScript 4.9+ auto-accessors).

## HTML

- **Semantic HTML:** Prioritize the use of semantic HTML for clarity and accessibility.
- **Accessibility (A11y):** Consider accessibility by using semantic HTML and ARIA roles where appropriate.

## Specific Component Instructions

- **Navigation Component:**
  - Create a new navigation component to be placed inside the header.
  - Implement a hamburger menu icon for mobile views.
  - Use tabs for desktop views.
  - Include GitHub, LinkedIn, and Email icons on the right-hand side.

## Chat and Instruction Management

- **Chat Logging:** Save every chat interaction in `chats/` directory using the prescribed format.
- **Chat Log Format:**

  ```markdown
  # Chat Interaction - [timestamp]

  ## User Message

  [User's message here]

  ## Assistant Response

  [Assistant's response here]

  ## Insights

  [Any insights or observations about user preferences and behavior]
  ```

- **Instruction Updates:** After each user interaction, update this file (`.github/instructions/generated-instructions.md`) with any new insights on user preferences and behavior.
- **User Preferences:**
  - The user expects strict adherence to all provided instructions.
  - The user is direct in pointing out deviations from instructions.
  - The timestamp mechanism for chat logs (current date and time) is acceptable.
  - Prefers clean, organized configuration files without unnecessary comments.
  - Values alphabetical organization for better maintainability and readability.
  - Appreciates minimal, streamlined approaches to file management.
  - Likes to keep configuration files tidy and well-structured.
  - Values efficiency in task completion and clear explanations of changes.
  - Strongly prefers component consolidation and consistency over multiple specialized components.
  - Wants to eliminate redundant components in favor of single, reusable components (e.g., replacing `service-card` and `project-card` with unified `card-component`).
  - Values following established patterns and wants components to be interchangeable and composable.
  - Prefers cleaner architecture and maintainable codebases through component unification.
  - Appreciates detailed technical analysis with quantified benefits and actionable recommendations.
  - Values comprehensive documentation that includes both static code analysis and live browser testing.
  - Prefers structured reports with clear prioritization, implementation phases, and risk assessments.
  - Wants functionality preservation as a key requirement when simplifying complex systems.
  - Values analysis backed by concrete evidence from both code review and runtime behavior.
  - Appreciates time estimates and phased implementation approaches for technical improvements.
  - Prefers reducing complexity while maintaining sophisticated engineering practices already in place.
  - Values consistency across pages and wants to maintain the same design patterns throughout the application.
  - Expects clear navigation paths and linking to detailed content for user experience enhancement.
  - Prefers referencing existing pages and patterns when implementing new features to maintain design coherence.
  - Favors clean, minimal component syntax without unnecessary attributes, preferring content-driven over prop-driven component design.
  - The user prefers automated, agent-driven QA for UI/UX and values clear, actionable reporting.
  - They are interested in iterative improvement and want to keep a record of each chat interaction for traceability.
  - The user is detail-oriented and open to further checks (e.g., mobile view, dark mode, accessibility).

## Additional Insights (2025-07-09)

- User expects new blog posts to match the concise, actionable, and engaging style of previous posts, with clear structure and minimalism. They value consistency and actionable takeaways.

## Additional Insights (2025-07-10)

- User expects precise, minimal, and convention-driven refactoring. They value alphabetization for maintainability and clarity, and expect no functional changes or errors after such refactors. The workflow should always include validation and memory logging.

## User Identity

- The user's name is Andrew Noblet. This should be remembered for future context and personalization.

## User Preferences and Behavior Patterns

- **Consistent Page Structure:** User values consistent layouts and structures across different pages (e.g., services and portfolio pages having similar formats)
- **Content Categorization:** Prefers clear categorization of content with overview pages that lead to detailed sub-pages rather than showing all content on a single page
- **Hierarchical Navigation:** Favors organized, hierarchical navigation patterns that allow users to drill down into specific areas of interest
- **Clean Interfaces:** Values scannable, clean interfaces that provide clear pathways for users to find relevant information
- **Overview + Detail Pattern:** Prefers summary/overview pages with "Learn more" or "View projects" links leading to detailed content pages
- The user values clear, engaging, and informative copy for their blog homepage.
- They prefer concise improvements and expect direct action on content updates.
- User prefers concise, engaging, and action-oriented copy for all pages except the home page.
- User expects automatic, minimal, and efficient improvements without disrupting existing logic or structure.
- User values reusability and clear communication in both code and content.
- The user requested a business plan based on the project's content and structure and expected it to be created as a new file in the workspace.

- User expects strict adherence to all coding and project instructions, especially regarding chat logging and instruction updates.
- Prefers minimal, composable, and reusable components, with minimal changes to existing logic.
- Expects every chat interaction to be logged in the `chats/` directory using the prescribed format.
- Wants `.github/instructions/generated.instructions.md` updated with new insights after each exchange.
- Favors clean, organized, and efficient solutions with clear, actionable, and concise communication.

Added insight: User values introductions that are not only concise but also clearly connect the article’s theme to actionable business outcomes. They expect the assistant to set the stage for the content that follows, making the value proposition explicit.

- User requested navigation on pricing pages. Navigation is already present via the default layout and Header component, which uses the Navigation component. Navigation is consistent, reusable, and uses the global color scheme. User values composability, minimal changes, and adherence to design system.

- User wants each service's pricing page to be easily accessible from the main pricing page. Added navigation links to hosting, design, and consultation pricing pages at the top of the main pricing page using utility classes and a simple, composable structure.

- Each service page now includes a clear, utility-styled link to its corresponding pricing page at the end of the main content. This ensures users can easily navigate from any service page to its pricing details.

- Consolidated overlapping entities in the memory bank by merging the 'user' entity into 'Andrew Noblet'.
- All personal observations are now under 'Andrew Noblet'.
- No other overlapping entities found; 'User Coding Style' and 'user-preferences' remain distinct.
- User prefers a single, unified profile for all personal and preference data.
- Continue to maintain a clean, non-redundant memory structure for optimal recall and context management.

- User prefers all pages to use consistent max width and layout structure.
- Utility classes (e.g., max-width-56, width-100, margin-auto) are the standard for constraining content width.
- Visual and accessibility validation using Playwright MCP is required and expected.
- Minimal, composable changes are preferred, with reusable structure emphasized.
- User expects all changes and observations to be logged to memory MCP and instructions updated after each interaction.

- User prefers minimal, composable, and decoupled code structure.
- Efficient, atomic, and scoped CSS using variables and global utility classes is required.
- All missing imports should be fixed without unnecessary changes or comments.
- Rigorous validation and testing is expected, including Playwright MCP for style/design changes.
- User expects all steps to be completed autonomously and thoroughly.
- Always check for correct exports when importing functions.
- Always update this file after each interaction.

- No explicit corrections from the developer to the model were found in the chat logs from 2025-06-15 to 2025-07-10.
- The developer consistently provided direct instructions and requests, but did not manually override, correct, or amend the model’s output in a way that constitutes a correction.
- The developer’s feedback was always in the form of new requests or clarifications, not explicit corrections of errors.
- This behavior aligns with the developer’s preference for minimal, actionable communication and autonomous agent-driven workflows.
