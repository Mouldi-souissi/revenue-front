import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "bdd/features/*.feature",
  steps: "bdd/steps/*.ts",
  // ...other playwright-bdd options
});

export default defineConfig({
  testDir,
  reporter: "html",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
