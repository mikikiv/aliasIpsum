import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    testIdAttribute: "data-test",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  //Use the tests folder
  testMatch: "/tests/**/*.spec.ts",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        contextOptions: { permissions: ["clipboard-read", "clipboard-write"] },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "http://localhost:3000",
        launchOptions: {
          firefoxUserPrefs: {
            "dom.events.asyncClipboard.readText": true,
            "dom.events.testing.asyncClipboard": true,
          },
        },
      },
    },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     baseURL: "http://localhost:3000",
    //     launchOptions: {
    //       args: ["--enable-features=AsyncClipboard"],
    //     },
    //     contextOptions: { permissions: ["clipboard-read"] },
    //   },
    // },

    {
      name: "extension chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000/extension",
        contextOptions: { permissions: ["clipboard-read", "clipboard-write"] },
      },
    },

    // {
    //   name: "extension firefox",
    //   use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:3000/extension" },
    // },

    // {
    //   name: "extension webkit",
    //   use: { ...devices["Desktop Safari"], baseURL: "http://localhost:3000/extension"},
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})
