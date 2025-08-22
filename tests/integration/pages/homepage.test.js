/**
 * Integration tests for Homepage
 * Tests page structure, navigation, and interactive elements
 */

import { expect } from '@esm-bundle/chai';

describe('Homepage Integration', () => {
  const DEV_SERVER_URL = 'http://localhost:4321';
  let page;

  before(async () => {
    // Navigate to homepage
    page = await browser.newPage();
    await page.goto(`${DEV_SERVER_URL}/`);
  });

  after(async () => {
    await page.close();
  });

  describe('Page Structure', () => {
    it('should have proper HTML structure', async () => {
      // Check basic page elements
      const header = await page.$(SELECTORS.HEADER);
      const main = await page.$(SELECTORS.MAIN);
      const footer = await page.$(SELECTORS.FOOTER);

      expect(header).to.exist;
      expect(main).to.exist;
      expect(footer).to.exist;
    });

    it('should have proper page title', async () => {
      const title = await page.title();
      expect(title).to.include('Andrew Noblet');
    });

    it('should have meta description', async () => {
      const description = await page.$eval(
        'meta[name="description"]',
        el => el.content
      );
      expect(description).to.exist;
      expect(description.length).to.be.greaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('should have working navigation menu', async () => {
      const navLinks = await page.$$('nav a');
      expect(navLinks.length).to.be.greaterThan(0);

      // Test navigation to About page
      await page.click('nav a[href="/about"]');
      await page.waitForLoadState('networkidle');

      const url = page.url();
      expect(url).to.include('/about');

      // Navigate back
      await page.goBack();
      await page.waitForLoadState('networkidle');
    });

    it('should have responsive navigation', async () => {
      // Test mobile navigation
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileNav = await page.$('navigation-mobile');
      expect(mobileNav).to.exist;

      // Test desktop navigation
      await page.setViewportSize({ width: 1280, height: 720 });

      const desktopNav = await page.$('navigation-desktop');
      expect(desktopNav).to.exist;
    });
  });

  describe('Content', () => {
    it('should display main heading', async () => {
      const h1 = await page.$(SELECTORS.HEADING_1);
      expect(h1).to.exist;

      const headingText = await h1.textContent();
      expect(headingText).to.include('Andrew Noblet');
    });

    it('should display tagline', async () => {
      const tagline = await page.$('.font-weight-800');
      expect(tagline).to.exist;

      const taglineText = await tagline.textContent();
      expect(taglineText.length).to.be.greaterThan(0);
    });

    it('should have portfolio buttons', async () => {
      const personalButton = await page.$(
        'button-component[href="/portfolio/personal"]'
      );
      const professionalButton = await page.$(
        'button-component[href="/portfolio/professional"]'
      );

      expect(personalButton).to.exist;
      expect(professionalButton).to.exist;
    });
  });

  describe('Interactive Elements', () => {
    it('should have working portfolio buttons', async () => {
      // Test personal portfolio button
      await page.click('button-component[href="/portfolio/personal"]');
      await page.waitForLoadState('networkidle');

      expect(page.url()).to.include('/portfolio/personal');

      // Navigate back
      await page.goBack();
      await page.waitForLoadState('networkidle');

      // Test professional portfolio button
      await page.click('button-component[href="/portfolio/professional"]');
      await page.waitForLoadState('networkidle');

      expect(page.url()).to.include('/portfolio/professional');

      await page.goBack();
      await page.waitForLoadState('networkidle');
    });

    it('should have working contact component', async () => {
      const contactComponent = await page.$('contact-component');
      expect(contactComponent).to.exist;

      // Check if contact component is visible
      const isVisible = await contactComponent.isVisible();
      expect(isVisible).to.be.true;
    });

    it('should have working theme toggle', async () => {
      const themeToggle = await page.$('theme-toggle');
      expect(themeToggle).to.exist;

      // Get current theme
      const initialTheme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

      // Click theme toggle
      await page.click('theme-toggle');
      await page.waitForTimeout(500);

      // Check if theme changed
      const newTheme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

      expect(newTheme).to.not.equal(initialTheme);
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Check mobile layout
      const mobileButtons = await page.$('.mobile #buttons');
      expect(mobileButtons).to.exist;

      // Buttons should be stacked vertically
      const buttonsContainer = await page.$('.mobile .column.gap.grid');
      expect(buttonsContainer).to.exist;
    });

    it('should work on tablet viewport', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });

      // Page should be responsive
      const main = await page.$(SELECTORS.MAIN);
      const boundingBox = await main.boundingBox();

      expect(boundingBox.width).to.be.lessThanOrEqual(768);
    });

    it('should work on desktop viewport', async () => {
      await page.setViewportSize({ width: 1280, height: 720 });

      // Check desktop layout
      const desktopButtons = await page.$('.desktop #buttons');
      expect(desktopButtons).to.exist;

      // Buttons should be side by side
      const buttonsContainer = await page.$('.desktop .flex.gap');
      expect(buttonsContainer).to.exist;
    });
  });

  describe('Performance', () => {
    it('should load within performance thresholds', async () => {
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        };
      });

      expect(metrics.domContentLoaded).to.be.lessThan(2000);
      expect(metrics.loadComplete).to.be.lessThan(5000);
    });

    it('should have no console errors', async () => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      expect(errors).to.have.length(0);
    });
  });
});
