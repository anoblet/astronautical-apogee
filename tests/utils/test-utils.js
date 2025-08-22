/**
 * Test utilities and shared constants for the testing suite
 * Provides common functionality, routes, and configuration for all tests
 */

import { expect } from '@esm-bundle/chai';

export { expect };

// Global test configuration
export const DEV_SERVER_URL = 'http://localhost:4321';

// Application routes for comprehensive testing

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

/**
 * Development server URL for testing
 */
export const DEV_SERVER_URL = 'http://localhost:4321';

/**
 * All application routes for comprehensive testing
 */
export const ROUTES = {
  // Main pages
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SERVICES: '/services',
  PRICING: '/pricing',
  MENTORSHIP: '/mentorship',
  BLOG: '/blog',

  // Portfolio pages
  PORTFOLIO_PERSONAL: '/portfolio/personal',
  PORTFOLIO_PROFESSIONAL: '/portfolio/professional',

  // Service pages
  SERVICES_CONSULTATION: '/services/consultation',
  SERVICES_DESIGN: '/services/design',
  SERVICES_HOSTING: '/services/hosting',

  // Pricing pages
  PRICING_CONSULTATION: '/services/consultation/pricing',
  PRICING_DESIGN: '/services/design/pricing',
  PRICING_HOSTING: '/services/hosting/pricing',

  // Other pages
  BUSINESS_CARD: '/business-card',
  SETTINGS: '/settings',
  THEME: '/theme',
  LIT: '/lit',

  // Dynamic routes
  BLOG_POST: '/blog/{id}',
};

/**
 * Common CSS selectors for testing
 */
export const SELECTORS = {
  // Navigation
  HEADER: 'header',
  NAV: 'nav',
  FOOTER: 'footer',

  // Content areas
  MAIN: 'main',
  ARTICLE: 'article',
  SECTION: 'section',

  // Interactive elements
  BUTTON: 'button, .button, button-component',
  LINK: 'a',
  FORM: 'form',
  INPUT: 'input',

  // Custom components
  CONTACT_COMPONENT: 'contact-component',
  THEME_TOGGLE: 'theme-toggle',
  BUSINESS_CARD: 'business-card',
  CARD_COMPONENT: 'card-component',
  BUTTON_COMPONENT: 'button-component',

  // Content elements
  HEADING_1: 'h1',
  HEADING_2: 'h2',
  HEADING_3: 'h3',
  PARAGRAPH: 'p',
  LIST: 'ul, ol',
  IMAGE: 'img',
};

/**
 * Test viewport configurations for responsive testing
 */
export const VIEWPORTS = {
  MOBILE: { width: 375, height: 667 },
  TABLET: { width: 768, height: 1024 },
  DESKTOP: { width: 1280, height: 720 },
  LARGE_DESKTOP: { width: 1920, height: 1080 },
};

/**
 * Accessibility testing configuration
 */
export const A11Y_CONFIG = {
  rules: {
    // Disable some rules that may not apply to all pages
    'color-contrast': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    region: { enabled: false }, // May not apply to all pages
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
};

/**
 * Performance testing thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  FCP: 2000, // First Contentful Paint < 2s
  LCP: 2500, // Largest Contentful Paint < 2.5s
  FID: 100, // First Input Delay < 100ms
  CLS: 0.1, // Cumulative Layout Shift < 0.1
  TTI: 3500, // Time to Interactive < 3.5s
};

/**
 * Wait for element to appear in DOM
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Element>}
 */
export async function waitForElement(selector, timeout = 5000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  throw new Error(
    `Element with selector "${selector}" not found within ${timeout}ms`
  );
}

/**
 * Wait for custom element to be defined
 * @param {string} tagName - Custom element tag name
 * @param {number} timeout - Timeout in milliseconds
 */
export async function waitForCustomElement(tagName, timeout = 5000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    if (customElements.get(tagName)) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  throw new Error(
    `Custom element "${tagName}" not defined within ${timeout}ms`
  );
}

/**
 * Create a test fixture for Lit components
 * @param {TemplateResult} template - Lit template
 * @returns {Promise<Element>}
 */
export async function createFixture(template) {
  return await fixture(template);
}

/**
 * Simulate user interaction events
 */
export const userEvent = {
  /**
   * Click an element
   * @param {Element} element
   */
  async click(element) {
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
  },

  /**
   * Type text into an input
   * @param {HTMLInputElement} input
   * @param {string} text
   */
  async type(input, text) {
    input.focus();
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 100));
  },

  /**
   * Hover over an element
   * @param {Element} element
   */
  async hover(element) {
    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 100));
  },
};

/**
 * Theme testing utilities
 */
export const themeUtils = {
  /**
   * Set theme to light mode
   */
  setLightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
  },

  /**
   * Set theme to dark mode
   */
  setDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
  },

  /**
   * Get current theme
   * @returns {string}
   */
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },
};

/**
 * Assert element is visible and accessible
 * @param {Element} element
 */
export function assertElementAccessible(element) {
  expect(element).to.exist;
  expect(element).to.be.visible;

  // Check if element is focusable if it should be
  if (element.matches('button, a, input, select, textarea, [tabindex]')) {
    expect(element.tabIndex).to.not.equal(-1);
  }
}

/**
 * Assert element has proper ARIA attributes
 * @param {Element} element
 * @param {Object} expectedAttrs
 */
export function assertAriaAttributes(element, expectedAttrs) {
  Object.entries(expectedAttrs).forEach(([attr, value]) => {
    const actualValue = element.getAttribute(`aria-${attr}`);
    expect(actualValue).to.equal(value, `aria-${attr} should be "${value}"`);
  });
}

/**
 * Mock API responses for testing
 */
export const mockApi = {
  /**
   * Mock successful API response
   * @param {Object} data
   */
  mockSuccess(data) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(data),
    });
  },

  /**
   * Mock API error response
   * @param {number} status
   * @param {string} message
   */
  mockError(status, message) {
    return Promise.reject({
      ok: false,
      status,
      statusText: message,
    });
  },
};

export { expect, html };
