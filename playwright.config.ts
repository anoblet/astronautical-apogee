import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:4330',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 4330 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4330',
    stdout: 'ignore',
    stderr: 'ignore',
    reuseExistingServer: !process.env.CI,
  },
});
