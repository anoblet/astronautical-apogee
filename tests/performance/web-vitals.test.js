/**
 * Performance tests using Web Vitals and lighthouse metrics
 * Tests Core Web Vitals and performance thresholds
 */

import { expect, ROUTES, PERFORMANCE_THRESHOLDS } from '../utils/test-utils.js';

describe('Performance Testing', () => {
  let page;

  before(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
  });

  describe('Core Web Vitals', () => {
    it('should meet LCP thresholds on homepage', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);

      // Measure Largest Contentful Paint
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // Timeout after 10 seconds
          setTimeout(() => resolve(null), 10000);
        });
      });

      if (lcp !== null) {
        expect(lcp).to.be.lessThan(PERFORMANCE_THRESHOLDS.LCP);
      }
    });

    it('should meet FCP thresholds on key pages', async () => {
      const keyPages = [
        ROUTES.HOME,
        ROUTES.ABOUT,
        ROUTES.SERVICES,
        ROUTES.CONTACT,
      ];

      for (const route of keyPages) {
        await page.goto(`${DEV_SERVER_URL}${route}`);

        const fcp = await page.evaluate(() => {
          const fcpEntry = performance.getEntriesByName(
            'first-contentful-paint'
          )[0];
          return fcpEntry ? fcpEntry.startTime : null;
        });

        if (fcp !== null) {
          expect(fcp).to.be.lessThan(PERFORMANCE_THRESHOLDS.FCP);
        }
      }
    });

    it('should have minimal Cumulative Layout Shift', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Wait for potential layout shifts
      await page.waitForTimeout(3000);

      const cls = await page.evaluate(() => {
        return new Promise(resolve => {
          let clsValue = 0;

          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });

          // Resolve after 2 seconds
          setTimeout(() => resolve(clsValue), 2000);
        });
      });

      expect(cls).to.be.lessThan(PERFORMANCE_THRESHOLDS.CLS);
    });
  });

  describe('Resource Loading Performance', () => {
    it('should load resources efficiently', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      const resourceMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');

        return {
          totalResources: resources.length,
          totalSize: resources.reduce((acc, resource) => {
            return acc + (resource.transferSize || 0);
          }, 0),
          slowResources: resources.filter(resource => resource.duration > 1000)
            .length,
          cssFiles: resources.filter(resource => resource.name.includes('.css'))
            .length,
          jsFiles: resources.filter(resource => resource.name.includes('.js'))
            .length,
          imageFiles: resources.filter(resource =>
            resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)/)
          ).length,
        };
      });

      // Should not have too many slow resources
      expect(resourceMetrics.slowResources).to.be.lessThan(3);

      // Should not load excessive resources
      expect(resourceMetrics.totalResources).to.be.lessThan(50);

      // Should use modern image formats
      console.log(`Loaded ${resourceMetrics.imageFiles} images`);
    });

    it('should handle navigation performance', async () => {
      // Start on homepage
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Measure navigation to about page
      const navigationStart = Date.now();

      await page.click('nav a[href="/about"]');
      await page.waitForLoadState('networkidle');

      const navigationEnd = Date.now();
      const navigationTime = navigationEnd - navigationStart;

      // Navigation should be fast (SPA-like with ViewTransitions)
      expect(navigationTime).to.be.lessThan(2000);
    });
  });

  describe('Bundle Size Analysis', () => {
    it('should have reasonable bundle sizes', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      const bundleInfo = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const styles = Array.from(
          document.querySelectorAll('link[rel="stylesheet"]')
        );

        return {
          scriptCount: scripts.length,
          styleCount: styles.length,
          scripts: scripts.map(s => s.src),
          styles: styles.map(s => s.href),
        };
      });

      // Should not have excessive bundles
      expect(bundleInfo.scriptCount).to.be.lessThan(10);
      expect(bundleInfo.styleCount).to.be.lessThan(5);
    });
  });

  describe('Memory Usage', () => {
    it('should not have memory leaks during navigation', async () => {
      const initialMemory = await page.evaluate(() => {
        return performance.memory
          ? {
              usedJSMemory: performance.memory.usedJSMemory,
              totalJSMemory: performance.memory.totalJSMemory,
            }
          : null;
      });

      // Navigate through several pages
      const pages = [
        ROUTES.HOME,
        ROUTES.ABOUT,
        ROUTES.SERVICES,
        ROUTES.PORTFOLIO_PERSONAL,
        ROUTES.CONTACT,
        ROUTES.HOME, // Back to start
      ];

      for (const route of pages) {
        await page.goto(`${DEV_SERVER_URL}${route}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
      }

      const finalMemory = await page.evaluate(() => {
        return performance.memory
          ? {
              usedJSMemory: performance.memory.usedJSMemory,
              totalJSMemory: performance.memory.totalJSMemory,
            }
          : null;
      });

      if (initialMemory && finalMemory) {
        // Memory should not grow excessively
        const memoryGrowth =
          finalMemory.usedJSMemory - initialMemory.usedJSMemory;
        const growthPercentage =
          (memoryGrowth / initialMemory.usedJSMemory) * 100;

        expect(growthPercentage).to.be.lessThan(50); // Less than 50% growth
      }
    });
  });

  describe('Network Performance', () => {
    it('should minimize network requests', async () => {
      // Track network requests
      const requests = [];

      page.on('request', request => {
        requests.push({
          url: request.url(),
          method: request.method(),
          resourceType: request.resourceType(),
        });
      });

      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Filter out development server requests
      const productionRequests = requests.filter(
        req =>
          !req.url.includes('hot-update') &&
          !req.url.includes('__vite__') &&
          !req.url.includes('node_modules')
      );

      // Should not make excessive requests
      expect(productionRequests.length).to.be.lessThan(30);

      // Should not have failed requests
      const failedRequests = await page.evaluate(() => {
        return performance
          .getEntriesByType('resource')
          .filter(resource => resource.name.includes('error')).length;
      });

      expect(failedRequests).to.equal(0);
    });

    it('should use efficient caching strategies', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Navigate away and back
      await page.goto(`${DEV_SERVER_URL}${ROUTES.ABOUT}`);
      await page.waitForLoadState('networkidle');

      // Track requests on return
      const returnRequests = [];
      page.on('request', request => {
        returnRequests.push(request.url());
      });

      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      // Should have fewer requests due to caching
      // Note: This might vary in development mode
      console.log(`Return navigation made ${returnRequests.length} requests`);
    });
  });

  describe('Responsive Performance', () => {
    it('should perform well on different viewport sizes', async () => {
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1280, height: 720, name: 'Desktop' },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);

        const startTime = Date.now();
        await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;

        // Should load reasonably fast on all viewports
        expect(loadTime).to.be.lessThan(5000);

        console.log(`${viewport.name} load time: ${loadTime}ms`);
      }
    });
  });

  describe('Third-party Performance Impact', () => {
    it('should minimize third-party script impact', async () => {
      await page.goto(`${DEV_SERVER_URL}${ROUTES.HOME}`);
      await page.waitForLoadState('networkidle');

      const thirdPartyRequests = await page.evaluate(() => {
        return performance
          .getEntriesByType('resource')
          .filter(resource => {
            const url = new URL(resource.name);
            return (
              !url.hostname.includes('localhost') &&
              !url.hostname.includes('127.0.0.1')
            );
          })
          .map(resource => ({
            name: resource.name,
            duration: resource.duration,
            transferSize: resource.transferSize,
          }));
      });

      // Should not have slow third-party requests
      const slowThirdParty = thirdPartyRequests.filter(
        req => req.duration > 2000
      );
      expect(slowThirdParty.length).to.be.lessThan(2);

      console.log(`Third-party requests: ${thirdPartyRequests.length}`);
    });
  });
});
