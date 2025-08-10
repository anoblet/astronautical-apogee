# Copilot Instructions

# Tools

#file:../.copilot/instructions/git-flow.md
#file:../.copilot/instructions/memory.instructions.md
#file:../.copilot/instructions/playwright.instructions.md
#file:../.copilot/instructions/prompt.md
#file:../.copilot/instructions/sequential-thinking.instructions.md

## 🎯 PRIORITY: USER CLARIFICATIONS & MANUAL MODIFICATIONS 🎯

**USER CLARIFICATIONS AND MANUAL MODIFICATIONS ALWAYS TAKE ABSOLUTE PRIORITY OVER GENERAL INSTRUCTIONS.**

### Critical Requirements for User Adherence:

1. **EMPHASIZE USER CLARIFICATIONS**: When a user provides clarifications to their prompt, those clarifications must be given the highest priority and emphasized throughout the implementation.

2. **DETECT MANUAL MODIFICATIONS**: In conversations with multiple prompts, actively check if the user has made any manual modifications to files, code, or content between prompts. If manual modifications are detected, they must be respected and emphasized.

3. **PRIORITIZE SPECIFIC OVER GENERAL**: User-specific clarifications, corrections, and manual edits always override general coding instructions, best practices, or default behaviors.

4. **TRACK CONVERSATION CONTEXT**: In multi-prompt conversations, maintain awareness of:

   - Previous user clarifications (e.g., "Yes, continue", "Don't change the home page", "Always use X tool")
   - Manual file modifications made by the user
   - Specific requirements or constraints mentioned in earlier prompts
   - User preferences that deviate from standard practices

5. **EXAMPLES OF CRITICAL CLARIFICATIONS TO EMPHASIZE**:
   - Explicit confirmations: "Yes" when asked to continue
   - Specific exclusions: "Don't modify X" or "Leave Y unchanged"
   - Tool requirements: "Always use sequential thinking MCP", "Always use Playwright MCP"
   - Personal information: "My name is Andrew Noblet"
   - Scope limitations: "Only change this specific part"

### Implementation Protocol:

- Before making any changes, review conversation history for user clarifications
- When user clarifications conflict with general instructions, follow the clarifications
- Document and emphasize user clarifications in your response
- Respect the spirit and intent behind user clarifications, not just the literal text
- Ask for clarification if user intent is ambiguous rather than making assumptions

**The goal is to bring the model as close to adherence to the developer (Andrew Noblet) as possible.**

---

- Create as many new components as neccessary
- Components should be simple and composible
- Move as much reusable structure to the layout as apossible.
- The goal of the structure should be to be reusable.
- Use CSS variables whenever possible
- Keep your changes as minimal as possible
- Always ask if you are unsure of anything
- Always adhere to the global color scheme
- Remove unnecesary comments
- Do not add comments
- Always include an empty line at the end of the file
- Decorators need the accessor keyword(https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#auto-accessors-in-classes)
- Always make the CSS rules as efficient as possible
- Styles are always scoped to the component
- It's possible to target elements directly, without needing to specify a parent class for example: `h1`
- Styles should be as atomic as possible in order to provide brand continuity
- Use the color scheme from `styles/global.ts`
- Do your best to not modify existing logic and or definitions, though update it when neccessary
- Emphasize decoupling
- Avoid page specific CSS classes
- Use utility CSS classes available in the global stylesheet when possible
- After every interaction with the user through the chat interface, update your memory as to why the user asked for the change, what the user prefers, and how the user interacts with the codebase.
- Always use aliases when importing. Never use relative paths.
- Always assume the development server is already running.
- The development server is running on `http://localhost:4321/`

**_ Keep it simple! _**

- Remember to never use inline styles. If you ever feel the need to, create a utility class in `src/styles/utility.ts`.

- Whenever asked to implement a solution, and you are on the main or default branch, always start by creating a new branch.

- Always use every tool available before beginning and finishing your implementation.
