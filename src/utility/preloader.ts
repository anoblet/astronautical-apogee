/**
 * URL preloader utility that uses requestIdleCallback to preload URLs during browser idle time
 */

// URLs to preload - these should match the main navigation structure
const URLS_TO_PRELOAD = [
  '/',
  '/portfolio',
  '/portfolio/personal',
  '/portfolio/professional',
  '/services',
  '/services/design',
  '/services/hosting',
  '/services/consultation',
  '/mentorship',
  '/blog',
  '/about',
];

interface PreloadOptions {
  urls?: string[];
  delayMs?: number;
  maxConcurrent?: number;
}

/**
 * Preloads a single URL using link prefetch
 */
function preloadUrl(url: string): void {
  // Check if the URL is already preloaded
  const existingLink = document.querySelector(
    `link[href="${url}"][rel="prefetch"]`
  );
  if (existingLink) {
    return;
  }

  // Create and append prefetch link
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.setAttribute('data-preloaded', 'true');

  // Add to document head
  document.head.appendChild(link);
}

/**
 * Schedules URL preloading during browser idle time
 */
function schedulePreloading(urls: string[], maxConcurrent = 2): void {
  let currentIndex = 0;
  let activeRequests = 0;

  function processNext(): void {
    // Process up to maxConcurrent URLs at a time
    while (activeRequests < maxConcurrent && currentIndex < urls.length) {
      const url = urls[currentIndex++];
      activeRequests++;

      // Use requestIdleCallback if available, otherwise use setTimeout
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          preloadUrl(url);
          activeRequests--;
          processNext();
        });
      } else {
        setTimeout(() => {
          preloadUrl(url);
          activeRequests--;
          processNext();
        }, 50);
      }
    }
  }

  processNext();
}

/**
 * Initializes URL preloading with configurable options
 */
export function initializePreloader(options: PreloadOptions = {}): void {
  const { urls = URLS_TO_PRELOAD, delayMs = 1000, maxConcurrent = 2 } = options;

  // Skip if we're in a server environment
  if (typeof window === 'undefined') {
    return;
  }

  // Filter out current page from preloading list
  const currentPath = window.location.pathname;
  const urlsToPreload = urls.filter(url => {
    const urlPath = new URL(url, window.location.origin).pathname;
    return urlPath !== currentPath;
  });

  if (urlsToPreload.length === 0) {
    return;
  }

  // Start preloading after a short delay to avoid interfering with page load
  setTimeout(() => {
    schedulePreloading(urlsToPreload, maxConcurrent);
  }, delayMs);
}

/**
 * Gets the list of preloaded URLs
 */
export function getPreloadedUrls(): string[] {
  if (typeof document === 'undefined') {
    return [];
  }

  const preloadedLinks = document.querySelectorAll(
    'link[data-preloaded="true"]'
  );
  return Array.from(preloadedLinks).map(link => (link as HTMLLinkElement).href);
}
