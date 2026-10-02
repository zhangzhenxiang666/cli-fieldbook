import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 30000,
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4321/cli-fieldbook/', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }
  ],
  webServer: { command: 'pnpm exec astro preview --root site --host 127.0.0.1 --port 4321 --ignore-lock', url: 'http://127.0.0.1:4321/cli-fieldbook/', reuseExistingServer: !process.env.CI }
});
