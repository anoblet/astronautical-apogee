import { expect, test } from '@playwright/test';
import { readdir } from 'node:fs/promises';

async function routes(directory = 'dist', prefix = ''): Promise<string[]> {
  const result: string[] = [];
  for (const file of await readdir(directory, { withFileTypes: true })) {
    if (file.isDirectory())
      result.push(
        ...(await routes(`${directory}/${file.name}`, `${prefix}/${file.name}`))
      );
    else if (file.name === 'index.html') result.push(`${prefix}/`);
  }
  return result;
}

test('all generated pages render, fit narrow screens, and have working internal links', async ({
  page,
  request,
}) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const links = new Set<string>();
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of await routes()) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator('h1').first(), route).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        /^https:\/\/andrewnoblet\.com\//
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth
        ),
        `${route} at ${width}px`
      ).toBeLessThanOrEqual(1);
      for (const href of await page
        .locator('a[href]')
        .evaluateAll(elements =>
          elements.map(element => (element as HTMLAnchorElement).href)
        )) {
        const url = new URL(href);
        if (url.origin === 'http://127.0.0.1:4330') {
          url.hash = '';
          links.add(url.href);
        }
      }
    }
  }
  for (const link of links)
    expect((await request.get(link)).status(), link).toBe(200);
  expect(errors).toEqual([]);
});

test('essential content and navigation work without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4330/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Web design & development for small businesses.'
  );
  await expect(
    page
      .locator('.editorial-hero')
      .getByRole('link', { name: /book a free 30-minute discovery call/i })
  ).toBeVisible();
  await expect(page.locator('.nav-links > a[href="/contact"]')).toBeVisible();
  await page.locator('.mobile-menu').click();
  await expect(
    page.locator('.nav-links > a[href="/contact"]')
  ).not.toBeVisible();
  await page.locator('.mobile-menu').click();
  await expect(page.locator('.nav-links > a[href="/contact"]')).toBeVisible();
  await page.locator('.nav-group > a[href="/services"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Design, websites, and ongoing support'
  );
  await context.close();
});

test('mobile menu hides closed links and restores focus on Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  const summary = page.locator('.mobile-menu');
  await expect(
    page.locator('.nav-links > a[href="/contact"]')
  ).not.toBeVisible();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.nav-links > a[href="/contact"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await expect(
    page.locator('.nav-links > a[href="/contact"]')
  ).not.toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page
      .locator('.editorial-hero')
      .getByRole('link', { name: /book a free 30-minute discovery call/i })
  ).toBeFocused();
});

test('desktop disclosures work with keyboard and native state', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const disclosure = page.getByLabel('Show services links');
  await disclosure.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.locator('.submenu a[href="/services/design"]')
  ).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.locator('.submenu a[href="/services/design"]')
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(disclosure).toBeFocused();
  await expect(
    page.locator('.submenu a[href="/services/design"]')
  ).not.toBeVisible();
});

test('theme activates on first click, persists overrides, and resets completely', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/settings/');
  const toggle = page.getByRole('button', { name: 'Dark theme', exact: true });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.getByLabel('Heading size').fill('61px');
  await page.getByLabel('Heading size').press('Tab');
  await expect(page.locator('h1')).toHaveCSS('font-size', '61px');
  await page.getByLabel('Background', { exact: true }).fill('#ddeeff');
  await page.getByLabel('Background', { exact: true }).dispatchEvent('change');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(221, 238, 255)'
  );
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('h1')).toHaveCSS('font-size', '61px');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(221, 238, 255)'
  );
  await page.getByRole('button', { name: 'Reset appearance' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(
    await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--h1-font-size')
    )
  ).toBe('');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('malformed or inaccessible storage recovers without page errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/settings/');
  for (const value of [
    'invalid',
    'null',
    '[]',
    '{"name":"light","text-color":42}',
    '{"name":"unknown"}',
  ]) {
    await page.evaluate(value => localStorage.setItem('theme', value), value);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(
      page.getByRole('button', { name: 'Reset appearance' })
    ).toBeVisible();
  }
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Disabled', 'SecurityError');
      },
    });
  });
  await page.reload();
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('package inquiries retain context and Angular still hydrates', async ({
  page,
}) => {
  await page.goto('/services/design/pricing/');
  await page
    .getByRole('link', { name: 'Discuss on a free call', exact: true })
    .first()
    .click();
  await expect(page.locator('#selected-package')).toContainText(
    'Starter Design'
  );
  await expect(page.locator('#inquiry-email')).toHaveAttribute(
    'href',
    /subject=Inquiry%20about%20Starter%20Design/
  );
  await page.goto('/angular/');
  await page.getByRole('button', { name: 'Increment', exact: true }).click();
  await expect(page.locator('main')).toContainText('clicked 1 times');
});

test('client navigation preserves theme and disclosure behavior', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  for (let i = 0; i < 3; i++) {
    await page.locator('.nav-group > a[href="/services"]').click();
    await expect(page.locator('h1')).toContainText(
      'Design, websites, and ongoing support'
    );
    await page.locator('.brand').click();
    await expect(page.locator('h1')).toContainText(
      'Web design & development for small businesses.'
    );
  }
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Show services links').click();
  await expect(
    page.locator('.submenu a[href="/services/design"]')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('primary pages stay usable in light theme with a modest script budget', async ({
  page,
}) => {
  await page.goto('/');
  for (const route of [
    '/',
    '/services/design/',
    '/services/hosting/',
    '/services/consultation/',
    '/portfolio/professional/',
    '/services/social/pricing/',
  ]) {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth
      ),
      route
    ).toBeLessThanOrEqual(1);
    const scripts = await page.evaluate(() =>
      performance
        .getEntriesByType('resource')
        .filter(entry => entry.name.endsWith('.js'))
        .map(entry => ({
          name: entry.name,
          bytes: (entry as PerformanceResourceTiming).encodedBodySize,
        }))
    );
    expect(
      scripts.reduce((sum, entry) => sum + entry.bytes, 0),
      route
    ).toBeLessThan(150_000);
    expect(
      scripts.some(entry => /material-demo|client\./.test(entry.name)),
      route
    ).toBe(false);
  }
});

test('sitemap, social metadata, and the generated 404 provide useful destinations', async ({
  page,
  request,
}) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(
    'https://andrewnoblet.com/portfolio/work/cxl/'
  );
  expect(await sitemap.text()).not.toContain('/settings/');
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'isn’t here'
  );
  await expect(
    page.getByRole('link', { name: 'Return home', exact: true })
  ).toHaveAttribute('href', '/');
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://andrewnoblet.com/social-card.png'
  );
  expect((await request.get('/social-card.png')).status()).toBe(200);
});

test('mobile menu settles before the first paint without shifting content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addInitScript(() => {
    const shifts: number[] = [];
    Object.assign(window, { layoutShifts: shifts });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (
          !(entry as PerformanceEntry & { hadRecentInput: boolean })
            .hadRecentInput
        )
          shifts.push((entry as PerformanceEntry & { value: number }).value);
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
  expect(
    await page.evaluate(
      () =>
        (window as Window & { layoutShifts?: number[] }).layoutShifts?.reduce(
          (a, b) => a + b,
          0
        ) || 0
    )
  ).toBeLessThan(0.1);
});

test('Lit content renders and mobile pricing jumps clear the sticky header', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/lit/');
  await expect(
    page.getByRole('link', { name: 'Lit', exact: true })
  ).toBeVisible();
  await page.goto('/services/tutoring/');
  await page.getByRole('link', { name: 'View tutoring pricing' }).click();
  const heading = page.getByRole('heading', { name: 'Tutoring pricing' });
  const header = await page.locator('body > header').boundingBox();
  await expect
    .poll(async () => (await heading.boundingBox())?.y ?? 0)
    .toBeGreaterThanOrEqual(header!.height);
});

test('large custom headings wrap at mobile widths including on pricing pages', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/settings/');
  const input = page.getByLabel('Heading size');
  await input.fill('5rem');
  await input.press('Tab');
  for (const route of [
    '/',
    '/pricing/',
    '/services/social/pricing/',
    '/blog/digital-minimalism-confucian-philosophy-web-development/',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCSS('font-size', '80px');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      route
    ).toBe(320);
  }
});
