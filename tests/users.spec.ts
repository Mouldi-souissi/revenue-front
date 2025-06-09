import { test, expect, Page, BrowserContext } from "@playwright/test";
import { setLoggedState } from "./utils";
import { User } from "../src/models/User";

let context: BrowserContext;
let sharedPage: Page;
let users: User[];

test.describe("testing users page", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    sharedPage = await context.newPage();

    await setLoggedState(sharedPage);

    await sharedPage.goto("/");

    // Wait for the real GET /users request to complete and capture the response
    const [response] = await Promise.all([
      sharedPage.waitForResponse(
        (res) =>
          res.url().includes("api/users") && res.request().method() === "GET",
      ),
      await sharedPage.click("text=Utilisateurs"),
    ]);

    if (!response.ok()) {
      throw new Error(`Login request failed with status ${response.status()}`);
    }
    // Get the real JSON response
    users = await response.json();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("should open users page", async () => {
    await expect(sharedPage).toHaveURL(/\/users/);
  });

  test("should fetch users and display them in the table", async () => {
    // Wait for the table to load
    await expect(sharedPage.locator("table tbody tr")).toHaveCount(
      users.length,
    );

    const username = await sharedPage
      .locator(".topBar .user-icon + div")
      .innerText();

    for (const user of users) {
      const row = sharedPage.locator("table tbody tr", { hasText: user.email });

      // Assert that this row contains the correct name and type
      await expect(row).toContainText(user.name);
      await expect(row).toContainText(user.type);

      const deleteBtn = await row.locator("button", {
        has: sharedPage.locator("i.fa-trash"),
      });

      if (username === user.name) {
        await expect(deleteBtn).toBeDisabled();
      } else {
        await expect(deleteBtn).toBeEnabled();
      }

      const editBtn = await row.locator("button", {
        has: sharedPage.locator("i.fa-gear"),
      });

      await expect(editBtn).toBeEnabled();
    }
  });
  test("should open delete modal for each user in the table", async () => {
    if (!users || users.length === 0) throw new Error("Users not loaded");

    let calledUserId: string | null = null;

    await sharedPage.route("**/users/*", async (route, request) => {
      if (request.method() === "DELETE") {
        const urlParts = request.url().split("/");
        calledUserId = urlParts[urlParts.length - 1];
        // Mock response
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
      } else {
        // Allow other requests
        await route.continue();
      }
    });

    for (const user of users) {
      const row = sharedPage.locator("table tbody tr", { hasText: user.email });

      const deleteBtn = row.locator("button", {
        has: sharedPage.locator("i.fa-trash"),
      });

      const isDisabled = await deleteBtn.isDisabled();
      if (isDisabled) continue; // skip this user

      await deleteBtn.click();

      const modal = sharedPage.locator("#deleteUser");
      await expect(modal).toHaveClass(/show/);

      const nameLocator = modal.locator(".modal-body .text-center");
      await expect(nameLocator).toHaveText(user.name);

      const closeBtn = modal.locator("button", { hasText: "Fermer" });
      const confirmBtn = modal.locator("button", { hasText: "Supprimer" });

      await expect(closeBtn).toBeVisible();
      await expect(confirmBtn).toBeVisible();

      // Click and wait for the mock route to handle the DELETE
      await confirmBtn.click();

      // Assert correct user ID was used in DELETE URL
      expect(calledUserId).toBe(user._id);

      // Reset for next loop
      calledUserId = null;

      // Close modal
      await sharedPage.waitForTimeout(300);
    }
  });
});
