# Testing Suite Documentation

## Overview

This project uses a comprehensive testing suite built with the @web ecosystem, providing modern web testing capabilities with business best practices. The suite covers unit tests, integration tests, end-to-end tests, accessibility testing, performance testing, and visual regression testing.

## Architecture

### Testing Stack

- **@web/test-runner**: Core testing framework with multi-browser support
- **@web/test-runner-playwright**: Playwright launcher for Chromium, Firefox, and Safari
- **@web/dev-server**: Development server for testing
- **@open-wc/testing**: Testing utilities for web components
- **@axe-core/playwright**: Accessibility testing with axe-core
- **@esm-bundle/chai**: Assertion library

### Test Categories

#### 1. Unit Tests (`tests/unit/`)

- **Purpose**: Test individual components in isolation
- **Location**: `tests/unit/components/`
- **Example**: `button.test.js` - Tests button component functionality, variants, accessibility
- **Focus**: Component behavior, props, events, accessibility

#### 2. Integration Tests (`tests/integration/`)

- **Purpose**: Test page-level functionality and component interactions
- **Location**: `tests/integration/pages/`
- **Example**: `homepage.test.js` - Tests homepage structure, navigation, content
- **Focus**: Page rendering, navigation, interactive elements, responsiveness

#### 3. End-to-End Tests (`tests/e2e/`)

- **Purpose**: Test complete user journeys and workflows
- **Location**: `tests/e2e/user-flows/`
- **Example**: `contact-flow.test.js` - Tests contact form submission and user journey
- **Focus**: User workflows, form submissions, multi-page interactions

#### 4. Accessibility Tests (`tests/accessibility/`)

- **Purpose**: Ensure WCAG compliance and screen reader compatibility
- **Location**: `tests/accessibility/`
- **Example**: `wcag-compliance.test.js` - Tests accessibility across all routes
- **Focus**: WCAG guidelines, keyboard navigation, screen readers, color contrast

#### 5. Performance Tests (`tests/performance/`)

- **Purpose**: Monitor Core Web Vitals and performance metrics
- **Location**: `tests/performance/`
- **Example**: `web-vitals.test.js` - Tests LCP, FCP, CLS, and other metrics
- **Focus**: Load times, Core Web Vitals, bundle sizes, memory usage

#### 6. Visual Regression Tests (`tests/visual/`)

- **Purpose**: Ensure visual consistency across browsers and viewports
- **Location**: `tests/visual/`
- **Example**: `visual-regression.test.js` - Screenshot comparison tests
- **Focus**: Visual consistency, responsive design, theme variations

## Configuration

### Main Configuration (`web-test-runner.config.js`)

```javascript
// Multi-browser testing
browsers: [
  playwrightLauncher({ product: 'chromium' }),
  playwrightLauncher({ product: 'firefox' }),
  playwrightLauncher({ product: 'webkit' }),
]

// Test groups for organized execution
groups: [
  { name: 'unit', files: 'tests/unit/**/*.test.js' },
  { name: 'integration', files: 'tests/integration/**/*.test.js' },
  { name: 'e2e', files: 'tests/e2e/**/*.test.js' },
  { name: 'accessibility', files: 'tests/accessibility/**/*.test.js' },
  { name: 'performance', files: 'tests/performance/**/*.test.js' },
  { name: 'visual', files: 'tests/visual/**/*.test.js' },
]

// Coverage reporting
coverage: true,
coverageConfig: {
  reportDir: 'coverage',
  reports: ['html', 'lcov', 'json'],
  threshold: {
    statements: 80,
    branches: 70,
    functions: 80,
    lines: 80,
  },
}
```

### Test Utilities (`tests/utils/test-utils.js`)

Provides shared utilities, constants, and helper functions:

- **Routes**: All application routes for consistent testing
- **Viewports**: Standard viewport configurations
- **Selectors**: Common element selectors
- **Thresholds**: Performance and accessibility thresholds
- **Helper Functions**: Reusable test utilities

## Running Tests

### Basic Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Category-Specific Commands

```bash
# Unit tests only
pnpm test:unit

# Integration tests only
pnpm test:integration

# End-to-end tests only
pnpm test:e2e

# Accessibility tests only
pnpm test:accessibility

# Performance tests only
pnpm test:performance

# Visual regression tests only
pnpm test:visual

# CI-friendly output with coverage
pnpm test:ci
```

### Advanced Options

```bash
# Run specific test file
pnpm test tests/unit/components/button.test.js

# Run tests with specific browser
pnpm test --playwright --browsers chromium

# Run tests with increased timeout
pnpm test --timeout 30000

# Run tests with custom pattern
pnpm test --grep "accessibility"
```

## Business Best Practices

### 1. Test Organization

- **Clear categorization** by test type and purpose
- **Consistent naming** conventions for files and test descriptions
- **Logical grouping** for efficient execution and maintenance

### 2. Coverage Standards

- **Minimum 80%** statement and line coverage
- **70%** branch coverage for critical paths
- **100%** accessibility coverage for public-facing features

### 3. Performance Monitoring

- **Core Web Vitals** tracked on every test run
- **Performance budgets** enforced for key metrics
- **Cross-browser** performance validation

### 4. Accessibility First

- **WCAG 2.1 AA** compliance testing
- **Keyboard navigation** testing
- **Screen reader** compatibility validation
- **Color contrast** automated checking

### 5. CI/CD Integration

- **Automated testing** on all pull requests
- **Coverage reporting** with trend analysis
- **Visual regression** detection and alerting
- **Performance regression** protection

## Development Workflow

### 1. Writing Tests

1. Identify the appropriate test category
2. Use the corresponding directory structure
3. Import utilities from `test-utils.js`
4. Follow the established naming conventions
5. Include accessibility and performance considerations

### 2. Test-Driven Development

1. Write failing tests first
2. Implement minimum code to pass
3. Refactor with confidence
4. Ensure coverage requirements are met

### 3. Continuous Integration

1. Tests run automatically on pull requests
2. Coverage reports generated and tracked
3. Performance regressions blocked
4. Accessibility violations prevent merging

## Extending the Test Suite

### Adding New Test Categories

1. Create new directory under `tests/`
2. Add group configuration to `web-test-runner.config.js`
3. Create corresponding npm script in `package.json`
4. Update this documentation

### Adding New Test Files

1. Use the appropriate category directory
2. Follow the naming convention: `*.test.js`
3. Import utilities from `test-utils.js`
4. Include appropriate test metadata and documentation

### Custom Test Utilities

Add reusable functions to `test-utils.js`:

```javascript
// Example: Custom assertion helper
export const expectElementToBeAccessible = async element => {
  const axeResults = await axe.run(element);
  expect(axeResults.violations).to.have.lengthOf(0);
};
```

## Troubleshooting

### Common Issues

1. **Browser not found**: Run `pnpm test:install-browsers`
2. **Timeout errors**: Increase timeout in config or specific tests
3. **Flaky visual tests**: Add wait conditions for animations/loading
4. **Coverage too low**: Add tests for uncovered code paths

### Debug Mode

```bash
# Run tests with debug output
pnpm test --debug

# Run single test with browser open
pnpm test --manual tests/e2e/contact-flow.test.js
```

### Performance Testing Notes

- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **FCP (First Contentful Paint)**: Should be < 1.8s
- **CLS (Cumulative Layout Shift)**: Should be < 0.1
- **Memory growth**: Should be < 50% during navigation

### Accessibility Testing Notes

- **WCAG 2.1 AA**: All public pages must comply
- **Keyboard navigation**: All interactive elements must be accessible
- **Screen reader**: Content must be properly announced
- **Color contrast**: Minimum 4.5:1 ratio for normal text

## Resources

- [Web Test Runner Documentation](https://modern-web.dev/docs/test-runner/overview/)
- [Open WC Testing Documentation](https://open-wc.org/docs/testing/testing-package/)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
