import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  Before,
  After,
} from "@cucumber/cucumber";
import { chromium } from "playwright";
import { expect } from "@playwright/test";

setDefaultTimeout(30 * 1000);

let browser, context, page;

Before(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await context?.close();
  await browser?.close();
});

Given("I am on the Playwright homepage", async () => {
  await page.goto("https://playwright.dev/");
});

Then("the title should contain {string}", async (text) => {
  await expect(page).toHaveTitle(new RegExp(text));
});

When("I click the {string} link", async (linkText) => {
  await page.getByRole("link", { name: linkText }).click();
});

Then("I should see the {string} heading", async (headingText) => {
  await expect(page.getByRole("heading", { name: headingText })).toBeVisible();
});
