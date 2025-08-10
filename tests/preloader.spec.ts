import { test, expect } from '@playwright/test';

test.describe('URL Preloading', () => {
  test('should preload navigation URLs when browser is idle', async ({
    page,
  }) => {
    // Start dev server if not already running
    const DEV_SERVER_URL = 'http://localhost:4321';

    // Go to homepage
    await page.goto(DEV_SERVER_URL);

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Wait a bit more for preloading to potentially start
    await page.waitForTimeout(2000);

    // Check if preload links are being added to the DOM
    const preloadLinks = await page
      .locator('link[rel="prefetch"][data-preloaded="true"]')
      .count();

    // We expect some URLs to be preloaded (should be > 0)
    expect(preloadLinks).toBeGreaterThan(0);

    // Verify specific URLs are being preloaded
    const portfolioPreload = await page
      .locator('link[href="/portfolio"][rel="prefetch"]')
      .count();
    const servicesPreload = await page
      .locator('link[href="/services"][rel="prefetch"]')
      .count();
    const aboutPreload = await page
      .locator('link[href="/about"][rel="prefetch"]')
      .count();

    // At least some of these should be preloaded
    const totalPreloaded = portfolioPreload + servicesPreload + aboutPreload;
    expect(totalPreloaded).toBeGreaterThan(0);
  });

  test('should not preload current page URL', async ({ page }) => {
    const DEV_SERVER_URL = 'http://localhost:4321';

    // Go to homepage
    await page.goto(DEV_SERVER_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check that the current page (/) is not preloaded
    const currentPagePreload = await page
      .locator('link[href="/"][rel="prefetch"]')
      .count();
    expect(currentPagePreload).toBe(0);
  });

  test('should use requestIdleCallback when available', async ({ page }) => {
    const DEV_SERVER_URL = 'http://localhost:4321';

    // Inject code to track requestIdleCallback usage
    await page.addInitScript(() => {
      const originalRequestIdleCallback = (window as any).requestIdleCallback;
      let idleCallbackCalled = false;

      (window as any).requestIdleCallback = function (callback: any) {
        idleCallbackCalled = true;
        // Call the original function or setTimeout as fallback
        if (originalRequestIdleCallback) {
          return originalRequestIdleCallback.call(this, callback);
        } else {
          return setTimeout(callback, 0);
        }
      };

      // Expose the flag to check later
      (window as any).__idleCallbackUsed = () => idleCallbackCalled;
    });

    await page.goto(DEV_SERVER_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check if requestIdleCallback was used
    const idleCallbackUsed = await page.evaluate(() =>
      (window as any).__idleCallbackUsed()
    );
    expect(idleCallbackUsed).toBe(true);
  });
});
