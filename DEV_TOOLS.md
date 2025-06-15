# Development Tools Configuration

This project now includes a complete development workflow with code formatting, linting, and git hooks.

## Tools Configured

### Prettier

- **Purpose**: Code formatting
- **Config**: `.prettierrc.json`
- **Ignore file**: `.prettierignore`
- **Features**:
  - Single quotes
  - 2-space indentation
  - Trailing commas (ES5)
  - 80 character line width
  - Support for Astro files

### ESLint

- **Purpose**: Code linting and quality checks
- **Config**: `eslint.config.js`
- **Features**:
  - TypeScript support
  - Lit Element rules
  - Browser globals configured
  - Warns on unused variables and explicit `any`
  - Prettier integration (no conflicts)

### Husky

- **Purpose**: Git hooks
- **Directory**: `.husky/`
- **Hooks**:
  - `pre-commit`: Runs lint-staged
  - `commit-msg`: Validates commit message format

### lint-staged

- **Purpose**: Run tools only on staged files
- **Config**: `package.json` lint-staged section
- **Actions**:
  - Runs ESLint with auto-fix on JS/TS/Astro files
  - Runs Prettier on all supported files

## Available Scripts

```bash
# Lint all files
pnpm lint

# Lint and fix issues
pnpm lint:fix

# Format all files
pnpm format

# Check if files are formatted correctly
pnpm format:check
```

## Commit Message Format

The project enforces conventional commit format:

```
type(scope): description

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

Examples:
- feat: add new navigation component
- fix: resolve mobile menu issue
- docs: update README with setup instructions
```

## Workflow

1. Make your changes
2. Stage files with `git add`
3. Commit with `git commit -m "type: description"`
4. The pre-commit hook will automatically:
   - Run ESLint and fix issues
   - Format code with Prettier
   - Only process staged files
5. The commit-msg hook validates your commit message format

## IDE Integration

For the best experience, install these VS Code extensions:

- ESLint
- Prettier - Code formatter
- Lit Plugin

Configure VS Code to format on save by adding to your settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
