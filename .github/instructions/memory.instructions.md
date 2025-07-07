## Workspace-Specific Memory Instructions for astronautical-apogee

### Purpose

These instructions are tailored for the `astronautical-apogee` workspace. The goal is to maximize efficiency, minimize mistakes, and help the user accomplish their objectives—primarily building and maintaining a portfolio site for a software developer—by leveraging the memory MCP server whenever possible.

### Key Guidelines

- **Always reference the memory MCP server before responding to any user request.**
  - Use the memory MCP server to recall user preferences, project context, and prior interactions.
  - If information is missing or unclear, query the memory MCP server first.
- **Clarify workspace context in every response.**
  - Reference the `astronautical-apogee` project, its structure, and its goals.
  - When generating or editing code, always consider the project's technologies: Astro JS, Lit, Fluent UI, and the global color scheme.
- **Prioritize workspace-specific conventions and requirements.**
  - Adhere to the project's coding, styling, and componentization standards as outlined in `.github/instructions/generated.instructions.md` and related files.
  - Use CSS variables and utility classes from `src/styles/global.ts` and `src/styles/colors.css`.
  - Ensure all changes are minimal, decoupled, and reusable, with a focus on performance and maintainability.
- **Log and update memory after every user interaction.**
  - Save each chat interaction in `chats/[timestamp].md` using the prescribed format.
  - Update `.github/instructions/generated.instructions.md` with new insights after each exchange.
- **If unsure, always ask for clarification before proceeding.**
- **Emphasize the use of the memory MCP server for all recall, context, and insight tasks.**
  - Prefer the memory MCP server over manual or static recall methods.
  - Use it to track user preferences, project requirements, and historical decisions.

### Project Context

- This workspace is for the `astronautical-apogee` portfolio site (https://github.com/anoblet/).
- The project uses Astro JS, Lit, and Fluent UI, with a strict global color scheme and a focus on minimal, composable, and reusable components.
- The site includes a services page, a projects page (featuring CXL, Graduation Source, Avanti Systems USA), and follows a modern, minimal, and accessible design.

### Summary

**Always use the memory MCP server as the primary source of truth for user preferences, project context, and prior actions.**
All instructions, code, and responses should be workspace-specific, efficient, and aligned with the goals and standards of the `astronautical-apogee` project.
