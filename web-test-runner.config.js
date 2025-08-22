import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  // Test files
  files: 'tests/**/*.test.js',

  // Node resolve for bare module imports
  nodeResolve: true,

  // Browser launchers (configured via CLI flags)
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // Coverage configuration
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    exclude: [
      '**/node_modules/**',
      '**/tests/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/*.test.js',
      '**/astro.config.*',
      '**/eslint.config.*',
      '**/lighthouserc.*',
      '**/wrangler.*',
    ],
  },

  // Test runner options
  concurrency: 4,
  timeout: 30000,

  // Test framework configuration
  // Web Test Runner uses mocha by default
  // testFramework: '@web/test-runner-mocha',

  // Custom middleware for Astro static files
  middleware: [
    function astroMiddleware(context, next) {
      if (context.url.includes('/src/') || context.url.includes('/_astro/')) {
        return next();
      }
      return next();
    },
  ],

  // Test runner plugins for esbuild support
  plugins: [],

  // Watch mode for development
  watch: process.argv.includes('--watch'),

  // Debug options
  debug: process.argv.includes('--debug'),

  // Mobile device emulation for responsive testing
  browserStartTimeout: 30000,
  testsStartTimeout: 20000,
  testsFinishTimeout: 40000,

  // Reporter configuration
  reporters: ['default', 'junit', 'html'],

  // Performance and accessibility testing groups
  groups: [
    {
      name: 'unit',
      files: 'tests/unit/**/*.test.js',
    },
    {
      name: 'integration',
      files: 'tests/integration/**/*.test.js',
    },
    {
      name: 'e2e',
      files: 'tests/e2e/**/*.test.js',
    },
    {
      name: 'accessibility',
      files: 'tests/accessibility/**/*.test.js',
    },
    {
      name: 'performance',
      files: 'tests/performance/**/*.test.js',
    },
    {
      name: 'visual',
      files: 'tests/visual/**/*.test.js',
    },
  ],
};
