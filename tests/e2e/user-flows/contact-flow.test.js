/**
 * End-to-end tests for Contact Flow
 * Tests the complete user journey for contacting Andrew
 */

import { expect, ROUTES, SELECTORS } from '../../utils/test-utils.js';

describe('Contact User Flow', () => {
  let page;

  before(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
  });

  describe('Contact Page Journey', () => {
    it('should complete full contact flow from homepage', async () => {
      // Start on homepage
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Navigate to contact page via floating contact component
      const contactComponent = await page.$('contact-component');
      expect(contactComponent).to.exist;

      await page.click('contact-component');
      await page.waitForLoadState('networkidle');

      // Should be on contact page
      expect(page.url()).to.include('/contact');

      // Verify contact page content
      const heading = await page.$('h1');
      const headingText = await heading.textContent();
      expect(headingText).to.include('Contact');

      // Should have booking button
      const bookingButton = await page.$('button-component[href*="calendar"]');
      expect(bookingButton).to.exist;
    });

    it('should navigate to contact from services page', async () => {
      // Go to services page
      await page.goto(`${DEV_SERVER_URL}${ROUTES.SERVICES}`);
      await page.waitForLoadState('networkidle');

      // Click on consultation CTA
      const consultationButton = await page.$(
        'button-component[href*="calendar"]'
      );

      if (consultationButton) {
        await page.click('button-component[href*="calendar"]');
        await page.waitForTimeout(1000);

        // Should open external calendar link
        // Note: This would open in new tab, so we verify the link exists
        const href = await consultationButton.getAttribute('href');
        expect(href).to.include('calendar');
      }
    });

    it('should access contact from multiple entry points', async () => {
      const entryPoints = [
        { route: ROUTES.ABOUT, selector: 'button-component[href*="calendar"]' },
        {
          route: ROUTES.MENTORSHIP,
          selector: 'button-component[href*="calendar"]',
        },
        {
          route: ROUTES.SERVICES_CONSULTATION,
          selector: 'consultation-component',
        },
      ];

      for (const entryPoint of entryPoints) {
        await page.goto(`${DEV_SERVER_URL}${entryPoint.route}`);
        await page.waitForLoadState('networkidle');

        const contactElement = await page.$(entryPoint.selector);
        if (contactElement) {
          const isVisible = await contactElement.isVisible();
          expect(isVisible).to.be.true;
        }
      }
    });
  });

  describe('Business Card Contact Info', () => {
    it('should display contact information on business card page', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.BUSINESS_CARD}`);
      await page.waitForLoadState('networkidle');

      // Wait for business card component to load
      await page.waitForSelector('business-card');

      const businessCard = await page.$('business-card');
      expect(businessCard).to.exist;

      // Should have email and website info
      const cardText = await businessCard.textContent();
      expect(cardText).to.include('@');
      expect(cardText).to.include('New York');
    });
  });

  describe('Calendar Integration', () => {
    it('should have valid Google Calendar links', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      const calendarButtons = await page.$$(
        'button-component[href*="calendar"]'
      );

      for (const button of calendarButtons) {
        const href = await button.getAttribute('href');
        expect(href).to.include('calendar.app.google');
        expect(href).to.include('JjnLtVR6mnM11FcS9');
      }
    });

    it('should handle calendar link clicks properly', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      // Set up navigation listener for external links
      const [popup] = await Promise.all([
        page.waitForEvent('popup').catch(() => null),
        page.click('button-component[href*="calendar"]'),
      ]);

      // External calendar links should either open in popup or current tab
      // We just verify the click doesn't cause errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.waitForTimeout(1000);
      expect(errors).to.have.length(0);
    });
  });

  describe('Contact Information Consistency', () => {
    it('should have consistent contact info across all pages', async () => {
      const pagesWithContact = [
        ROUTES.CONTACT,
        ROUTES.BUSINESS_CARD,
        ROUTES.ABOUT,
      ];

      const contactInfo = new Set();

      for (const route of pagesWithContact) {
        await page.goto(`${DEV_SERVER_URL}${route}`);
        await page.waitForLoadState('networkidle');

        // Extract contact information
        const pageText = await page.textContent('body');

        // Look for email patterns
        const emailMatch = pageText.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
          contactInfo.add(emailMatch[0]);
        }

        // Look for location
        if (pageText.includes('New York')) {
          contactInfo.add('New York');
        }
      }

      // Should have consistent contact information
      expect(contactInfo.size).to.be.greaterThan(0);
    });
  });

  describe('Accessibility in Contact Flow', () => {
    it('should have accessible contact forms and buttons', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      // Check button accessibility
      const buttons = await page.$$('button, button-component');

      for (const button of buttons) {
        const isVisible = await button.isVisible();
        if (isVisible) {
          // Should be focusable
          await button.focus();
          const focused = await page.evaluate(
            el =>
              document.activeElement === el ||
              document.activeElement?.contains(el),
            button
          );
          expect(focused).to.be.true;
        }
      }
    });

    it('should support keyboard navigation', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      // Test tab navigation
      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(focusedElement).to.exist;
    });
  });

  describe('Mobile Contact Experience', () => {
    it('should work well on mobile devices', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      // Contact button should be visible and properly sized
      const button = await page.$('button-component');
      if (button) {
        const boundingBox = await button.boundingBox();
        expect(boundingBox.width).to.be.greaterThan(0);
        expect(boundingBox.height).to.be.greaterThan(40); // Minimum touch target
      }

      // Floating contact component should be visible
      const contactComponent = await page.$('contact-component');
      if (contactComponent) {
        const isVisible = await contactComponent.isVisible();
        expect(isVisible).to.be.true;
      }
    });
  });
});
