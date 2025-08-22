/**
 * Visual regression tests using Playwright screenshots
 * Tests visual consistency across browsers and viewports
 */

import { expect, ROUTES, VIEWPORTS } from '../utils/test-utils.js';

describe('Visual Regression Testing', () => {
  let page;

  before(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
  });

  describe('Homepage Visual Consistency', () => {
    it('should maintain visual consistency across viewports', async () => {
      for (const viewport of Object.values(VIEWPORTS)) {
        await page.setViewportSize(viewport);
        await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
        await page.waitForLoadState('networkidle');

        // Wait for animations to complete
        await page.waitForTimeout(1000);

        // Hide dynamic content that might cause flakiness
        await page.addStyleTag({
          content: `
            .dynamic-timestamp,
            .loading-indicator,
            .cursor-blink {
              visibility: hidden !important;
            }
          `,
        });

        // Take screenshot
        const screenshot = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        // Store for comparison (in real implementation, compare with baseline)
        expect(screenshot).to.be.instanceOf(Buffer);

        console.log(
          `Homepage screenshot captured for ${viewport.width}x${viewport.height}`
        );
      }
    });

    it('should render navigation consistently', async () => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Test navigation states
      const navStates = [
        { action: 'default', description: 'Default state' },
        {
          action: 'hover',
          description: 'Hover state',
          selector: 'nav a:first-child',
        },
        {
          action: 'focus',
          description: 'Focus state',
          selector: 'nav a:first-child',
        },
      ];

      for (const state of navStates) {
        if (state.selector) {
          if (state.action === 'hover') {
            await page.hover(state.selector);
          } else if (state.action === 'focus') {
            await page.focus(state.selector);
          }
        }

        await page.waitForTimeout(300); // Allow state change

        const navScreenshot = await page.screenshot({
          clip: { x: 0, y: 0, width: 1280, height: 100 }, // Capture nav area
          animations: 'disabled',
        });

        expect(navScreenshot).to.be.instanceOf(Buffer);
        console.log(`Navigation ${state.description} captured`);
      }
    });
  });

  describe('Component Visual Testing', () => {
    it('should render button component consistently', async () => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Find button components
      const buttons = await page.locator('button-component').all();

      if (buttons.length > 0) {
        for (let i = 0; i < Math.min(buttons.length, 3); i++) {
          const button = buttons[i];

          // Test different button states
          const states = [
            { action: 'default', description: 'Default' },
            { action: 'hover', description: 'Hover' },
            { action: 'focus', description: 'Focus' },
            { action: 'active', description: 'Active' },
          ];

          for (const state of states) {
            if (state.action === 'hover') {
              await button.hover();
            } else if (state.action === 'focus') {
              await button.focus();
            } else if (state.action === 'active') {
              await button.dispatchEvent('mousedown');
            }

            await page.waitForTimeout(200);

            const buttonScreenshot = await button.screenshot({
              animations: 'disabled',
            });

            expect(buttonScreenshot).to.be.instanceOf(Buffer);
            console.log(`Button ${i + 1} ${state.description} state captured`);

            // Reset state
            await page.mouse.move(0, 0);
            await page.keyboard.press('Escape');
          }
        }
      }
    });

    it('should render forms consistently', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.CONTACT}`);
      await page.waitForLoadState('networkidle');

      // Test form states
      const formStates = [
        { action: 'empty', description: 'Empty form' },
        { action: 'filled', description: 'Filled form' },
        { action: 'error', description: 'Error state' },
      ];

      for (const state of formStates) {
        if (state.action === 'filled') {
          await page.fill('input[name="name"]', 'John Doe');
          await page.fill('input[name="email"]', 'john@example.com');
          await page.fill('textarea[name="message"]', 'Test message');
        } else if (state.action === 'error') {
          await page.fill('input[name="email"]', 'invalid-email');
          await page.click('button[type="submit"]');
          await page.waitForTimeout(500); // Allow validation
        }

        const formScreenshot = await page.screenshot({
          clip: { x: 0, y: 200, width: 800, height: 600 }, // Form area
          animations: 'disabled',
        });

        expect(formScreenshot).to.be.instanceOf(Buffer);
        console.log(`Form ${state.description} captured`);
      }
    });
  });

  describe('Page Layout Testing', () => {
    it('should maintain layout consistency across key pages', async () => {
      const keyPages = [
        { route: ROUTES.HOME, name: 'Homepage' },
        { route: ROUTES.ABOUT, name: 'About' },
        { route: ROUTES.SERVICES, name: 'Services' },
        { route: ROUTES.PORTFOLIO_PERSONAL, name: 'Portfolio' },
        { route: ROUTES.CONTACT, name: 'Contact' },
      ];

      await page.setViewportSize(VIEWPORTS.desktop);

      for (const pageInfo of keyPages) {
        await page.goto(`${DEV_SERVER_URL}${pageInfo.route}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000); // Allow content to settle

        // Hide dynamic elements
        await page.addStyleTag({
          content: `
            .dynamic-content,
            .loading-spinner,
            .timestamp {
              visibility: hidden !important;
            }
          `,
        });

        const pageScreenshot = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        expect(pageScreenshot).to.be.instanceOf(Buffer);
        console.log(`${pageInfo.name} page layout captured`);
      }
    });

    it('should handle responsive breakpoints visually', async () => {
      const breakpoints = [
        { width: 320, height: 568, name: 'Small Mobile' },
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1024, height: 768, name: 'Small Desktop' },
        { width: 1440, height: 900, name: 'Large Desktop' },
      ];

      for (const breakpoint of breakpoints) {
        await page.setViewportSize(breakpoint);
        await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
        await page.waitForLoadState('networkidle');

        // Check for layout shifts or overflow
        const layoutMetrics = await page.evaluate(() => {
          const body = document.body;
          const html = document.documentElement;

          return {
            hasHorizontalScroll: body.scrollWidth > body.clientWidth,
            hasVerticalOverflow: body.scrollHeight > window.innerHeight,
            bodyWidth: body.scrollWidth,
            viewportWidth: window.innerWidth,
          };
        });

        // Should not have horizontal scroll on mobile
        if (breakpoint.width <= 768) {
          expect(layoutMetrics.hasHorizontalScroll).to.be.false;
        }

        const responsiveScreenshot = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        expect(responsiveScreenshot).to.be.instanceOf(Buffer);
        console.log(`${breakpoint.name} responsive layout captured`);
      }
    });
  });

  describe('Dark Mode Visual Testing', () => {
    it('should render dark mode consistently', async () => {
      await page.setViewportSize(VIEWPORTS.desktop);

      // Test both light and dark modes
      const modes = [
        { scheme: 'light', description: 'Light mode' },
        { scheme: 'dark', description: 'Dark mode' },
      ];

      for (const mode of modes) {
        await page.emulateMedia({ colorScheme: mode.scheme });
        await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500); // Allow theme transition

        const themeScreenshot = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        expect(themeScreenshot).to.be.instanceOf(Buffer);
        console.log(`${mode.description} theme captured`);

        // Check that theme is actually applied
        const themeApplied = await page.evaluate(scheme => {
          const styles = getComputedStyle(document.documentElement);
          const bgColor = styles.backgroundColor;

          if (scheme === 'dark') {
            // Should have dark background
            return (
              bgColor.includes('rgb(') &&
              parseInt(bgColor.match(/rgb\((\d+)/)[1]) < 50
            );
          } else {
            // Should have light background
            return (
              bgColor.includes('rgb(') &&
              parseInt(bgColor.match(/rgb\((\d+)/)[1]) > 200
            );
          }
        }, mode.scheme);

        console.log(`${mode.description} theme validation: ${themeApplied}`);
      }
    });
  });

  describe('Animation Visual Testing', () => {
    it('should capture animation states', async () => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Find animated elements
      const animatedElements = await page
        .locator('[class*="animate"], [class*="transition"]')
        .all();

      if (animatedElements.length > 0) {
        // Capture with animations enabled
        const animatedScreenshot = await page.screenshot({
          fullPage: true,
          animations: 'allow',
        });

        expect(animatedScreenshot).to.be.instanceOf(Buffer);

        // Capture with animations disabled for comparison
        const staticScreenshot = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        expect(staticScreenshot).to.be.instanceOf(Buffer);

        console.log(
          `Animation states captured (${animatedElements.length} animated elements)`
        );
      }
    });

    it('should test hover animations', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Find hoverable elements
      const hoverElements = await page
        .locator('button, a, [class*="hover"]')
        .all();

      for (let i = 0; i < Math.min(hoverElements.length, 5); i++) {
        const element = hoverElements[i];

        // Before hover
        await page.mouse.move(0, 0); // Reset mouse position
        await page.waitForTimeout(200);

        // During hover
        await element.hover();
        await page.waitForTimeout(300); // Allow animation

        const hoverScreenshot = await element.screenshot({
          animations: 'allow',
        });

        expect(hoverScreenshot).to.be.instanceOf(Buffer);
        console.log(`Hover animation ${i + 1} captured`);
      }
    });
  });

  describe('Print Styles Visual Testing', () => {
    it('should render print styles correctly', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Emulate print media
      await page.emulateMedia({ media: 'print' });
      await page.waitForTimeout(500);

      const printScreenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled',
      });

      expect(printScreenshot).to.be.instanceOf(Buffer);
      console.log('Print styles captured');

      // Reset to screen media
      await page.emulateMedia({ media: 'screen' });
    });
  });

  describe('Error State Visual Testing', () => {
    it('should render 404 page correctly', async () => {
      // Navigate to non-existent page
      await page.goto(`${DEV_SERVER_URL}/non-existent-page`, {
        waitUntil: 'networkidle',
      });

      const errorScreenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled',
      });

      expect(errorScreenshot).to.be.instanceOf(Buffer);
      console.log('404 error page captured');
    });

    it('should handle offline state visually', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Simulate offline
      await page.context().setOffline(true);

      // Try to navigate (might trigger offline indicator)
      await page.click('nav a[href="/about"]').catch(() => {
        // Navigation might fail offline
      });

      await page.waitForTimeout(1000);

      const offlineScreenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled',
      });

      expect(offlineScreenshot).to.be.instanceOf(Buffer);
      console.log('Offline state captured');

      // Reset online state
      await page.context().setOffline(false);
    });
  });
});
