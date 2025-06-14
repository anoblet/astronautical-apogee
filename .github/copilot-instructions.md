#file:./instructions/lit.instructions.md
#file:./instructions/style.instructions.md

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
- Save every chat interaction in `chats/[timestamp].md`. Update the file with the chat interaction after every message until the conversation ends.
- Use the following format for the chat interaction file:
  ```
  # Chat Interaction - [timestamp]
  
  ## User Message
  [User's message here]
  
  ## Assistant Response
  [Assistant's response here]
  
  ## Insights
  [Any insights or observations about user preferences and behavior]
  ```
- After every interaction with the user through the chat interface, update `.github/instructions/generated-instructions.md` with insights on user preferences and behavior.

*** Keep it simple! ***
