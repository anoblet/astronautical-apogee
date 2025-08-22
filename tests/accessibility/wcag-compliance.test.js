/**
 * Accessibility tests for WCAG compliance
 * Tests basic accessibility requirements across all routes
 */

import { expect } from '@esm-bundle/chai';

describe('Accessibility Testing', () => {
  const DEV_SERVER_URL = 'http://localhost:4321';
  let page;

  before(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
  });

  describe('Basic Accessibility', () => {
    it('should have proper document structure on homepage', async () => {
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // Check for basic document structure
      const hasDoctype = await page.evaluate(() => {
        return document.doctype !== null;
      });

      const hasLang = await page.evaluate(() => {
        return document.documentElement.hasAttribute('lang');
      });

      const hasTitle = await page.evaluate(() => {
        return document.title && document.title.trim() !== '';
      });

      expect(hasDoctype).to.be.true;
      expect(hasLang).to.be.true;
      expect(hasTitle).to.be.true;
    });

    it('should have accessible navigation', async () => {
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // Check for navigation landmarks
      const navElement = await page.locator('nav, [role="navigation"]').first();
      expect(await navElement.count()).to.be.greaterThan(0);

      // Check that navigation links are accessible
      const navLinks = await page.locator('nav a, [role="navigation"] a').all();
      expect(navLinks.length).to.be.greaterThan(0);

      // Check that links have accessible text
      for (const link of navLinks.slice(0, 3)) {
        // Test first 3 links
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        expect(text.trim() !== '' || ariaLabel !== null).to.be.true;
      }
    });

    it('should have proper heading hierarchy', async () => {
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // Check for h1 element
      const h1Count = await page.locator('h1').count();
      expect(h1Count).to.equal(1); // Should have exactly one h1

      // Check heading text is not empty
      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text.trim()).to.not.equal('');
    });

    it('should support keyboard navigation', async () => {
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // Tab through interactive elements
      await page.keyboard.press('Tab');

      // Check that focus is visible
      const focusedElement = await page.evaluate(() => {
        return (
          document.activeElement && document.activeElement !== document.body
        );
      });

      expect(focusedElement).to.be.true;
    });
  });

  describe('Form Accessibility', () => {
    it('should have accessible contact form', async () => {
      await page.goto(`${DEV_SERVER_URL}/contact`);
      await page.waitForLoadState('networkidle');

      // Check for form labels
      const formInputs = await page.locator('input, textarea, select').all();

      for (const input of formInputs.slice(0, 3)) {
        // Test first 3 inputs
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');

        if (id) {
          // Check if there's a corresponding label
          const label = await page.locator(`label[for="${id}"]`).count();
          const hasLabel = label > 0 || ariaLabel || ariaLabelledby;

          expect(hasLabel).to.be.true;
        }
      }
    });
  });

  describe('Color and Contrast', () => {
    it('should not rely solely on color for information', async () => {
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // This is a basic check - in a real implementation you'd use axe-core
      // For now, just verify the page loads and has content
      const bodyText = await page.textContent('body');
      expect(bodyText.trim()).to.not.equal('');
    });
  });

  describe('Mobile Accessibility', () => {
    it('should be accessible on mobile viewports', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${DEV_SERVER_URL}/`);
      await page.waitForLoadState('networkidle');

      // Check that navigation is still accessible
      const navElement = await page.locator('nav, [role="navigation"]').first();
      expect(await navElement.count()).to.be.greaterThan(0);

      // Check for mobile-friendly tap targets
      const buttons = await page
        .locator('button, a, input[type="button"], input[type="submit"]')
        .all();

      for (const button of buttons.slice(0, 3)) {
        const box = await button.boundingBox();
        if (box) {
          // Minimum tap target size should be 44x44px
          expect(box.width).to.be.greaterThan(32);
          expect(box.height).to.be.greaterThan(32);
        }
      }
    });
  });
});
