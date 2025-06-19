const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./features",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  // use: {
  //   baseURL: "http://localhost:3000",
  //   trace: "on-first-retry",
  //   screenshot: "only-on-failure",
  // },
  projects: [
    {
      name: "chromium",
      use: { ...require("@playwright/test").devices["Desktop Chrome"] },
    },
  ],
  // webServer: {
  //   command: 'npm start',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI
  // }
});
