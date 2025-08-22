import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import litPlugin from 'eslint-plugin-lit';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        NodeListOf: 'readonly',
        Event: 'readonly',
        KeyboardEvent: 'readonly',
        URL: 'readonly',
        Response: 'readonly',
        RequestInit: 'readonly',
        Buffer: 'readonly',
        Blob: 'readonly',
        ReadableStream: 'readonly',
        process: 'readonly',
        git: 'readonly',
        env: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      lit: litPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...litPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off', // TypeScript handles this better
      'no-redeclare': 'off', // TypeScript handles this better
    },
  },
  {
    files: ['**/*.test.{js,ts}', 'tests/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        // Test framework globals
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        browser: 'readonly',
        page: 'readonly',
        expect: 'readonly',
        should: 'readonly',
        assert: 'readonly',
        chai: 'readonly',
        // Playwright globals
        test: 'readonly',
        context: 'readonly',
        request: 'readonly',
        // Additional test utilities
        fixture: 'readonly',
        DEV_SERVER_URL: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off', // Allow expect() assertions
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off', // Allow console in tests
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-var': 'off',
      'no-redeclare': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.astro/**',
      'reports/**',
      'chats/**',
      'bin/**',
      '.genaiscript/**',
      'genaisrc/**',
      '**/*.astro', // Skip Astro files for now
    ],
  },
  prettierConfig,
];
