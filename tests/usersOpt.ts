import { test, expect, Page, BrowserContext } from "@playwright/test";
import { setLoggedState } from "./utils";
import { User } from "../src/models/User";

let context: BrowserContext;
let sharedPage: Page;
let users: User[];

test.describe("Users Page", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    sharedPage = await context.newPage();

    await setLoggedState(sharedPage);
    await sharedPage.goto("/");

    // Navigate to users page and capture users data
    const [response] = await Promise.all([
      sharedPage.waitForResponse(
        (res) =>
          res.url().includes("api/users") && res.request().method() === "GET",
      ),
      sharedPage.click("text=Utilisateurs"),
    ]);

    if (!response.ok()) {
      throw new Error(
        `Users API request failed with status ${response.status()}`,
      );
    }

    users = await response.json();

    if (!users || users.length === 0) {
      throw new Error("No users data received from API");
    }
  });

  test.afterAll(async () => {
    await context.close();
  });

  // Helper function to get current username (cached)
  let currentUsername: string;
  const getCurrentUsername = async () => {
    if (!currentUsername) {
      currentUsername = await sharedPage
        .locator(".topBar .user-icon + div")
        .innerText();
    }
    return currentUsername;
  };

  test("should navigate to users page and display correct data", async () => {
    // Test URL navigation
    await expect(sharedPage).toHaveURL(/\/users/);
    await expect(sharedPage.locator("table")).toBeVisible();

    // Test correct number of users
    await expect(sharedPage.locator("table tbody tr")).toHaveCount(
      users.length,
    );

    // Test user information display
    for (const user of users) {
      const row = sharedPage.locator("table tbody tr", { hasText: user.email });
      await expect(row).toBeVisible();
      await expect(row).toContainText(user.name);
      await expect(row).toContainText(user.type);
    }
  });

  test("should have correct button states for all users", async () => {
    const username = await getCurrentUsername();

    for (const user of users) {
      const row = sharedPage.locator("table tbody tr", { hasText: user.email });

      // Check delete button state
      const deleteBtn = row.locator("button", {
        has: sharedPage.locator("i.fa-trash"),
      });

      if (username === user.name) {
        await expect(deleteBtn).toBeDisabled();
      } else {
        await expect(deleteBtn).toBeEnabled();
      }

      // Check edit button (should always be enabled)
      const editBtn = row.locator("button", {
        has: sharedPage.locator("i.fa-gear"),
      });
      await expect(editBtn).toBeEnabled();
    }
  });

  test("should open delete modal with correct content and handle deletion", async () => {
    const username = await getCurrentUsername();

    // Find deletable users (not current user)
    const deletableUsers = users.filter((user) => user.name !== username);

    if (deletableUsers.length === 0) {
      test.skip("No deletable users available for testing");
      return;
    }

    let calledUserId: string | null = null;

    // Set up route interception once for all delete operations
    await sharedPage.route("**/users/*", async (route, request) => {
      if (request.method() === "DELETE") {
        const urlParts = request.url().split("/");
        calledUserId = urlParts[urlParts.length - 1];

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.continue();
      }
    });

    // Test modal for first deletable user (to avoid testing same thing multiple times)
    const testUser = deletableUsers[0];
    const row = sharedPage.locator("table tbody tr", {
      hasText: testUser.email,
    });
    const deleteBtn = row.locator("button", {
      has: sharedPage.locator("i.fa-trash"),
    });

    await deleteBtn.click();

    const modal = sharedPage.locator("#deleteUser");
    await expect(modal).toHaveClass(/show/);

    // Test modal content
    const nameLocator = modal.locator(".modal-body .text-center");
    await expect(nameLocator).toHaveText(testUser.name);

    const closeBtn = modal.locator("button", { hasText: "Fermer" });
    const confirmBtn = modal.locator("button", { hasText: "Supprimer" });

    await expect(closeBtn).toBeVisible();
    await expect(confirmBtn).toBeVisible();

    // Test deletion API call
    await confirmBtn.click();

    // Wait for API call and verify correct user ID was used
    await sharedPage.waitForTimeout(300);
    expect(calledUserId).toBe(testUser._id);

    // Clean up route interception
    await sharedPage.unroute("**/users/*");
  });

  // Optional: Test modal close functionality separately if needed
  test("should close delete modal when close button is clicked", async () => {
    const username = await getCurrentUsername();
    const deletableUser = users.find((user) => user.name !== username);

    if (!deletableUser) {
      test.skip("No deletable users available for testing modal close");
      return;
    }

    const row = sharedPage.locator("table tbody tr", {
      hasText: deletableUser.email,
    });
    const deleteBtn = row.locator("button", {
      has: sharedPage.locator("i.fa-trash"),
    });

    await deleteBtn.click();

    const modal = sharedPage.locator("#deleteUser");
    await expect(modal).toHaveClass(/show/);

    const closeBtn = modal.locator("button", { hasText: "Fermer" });
    await closeBtn.click();

    // Wait for modal to close
    await expect(modal).not.toHaveClass(/show/);
  });
});

// Separate test suite for edge cases that need fresh context
test.describe("Users Page - Edge Cases", () => {
  test("should handle API error gracefully", async ({ page }) => {
    await setLoggedState(page);

    // Mock API error
    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/");

    // This will trigger the API call and error
    await page.click("text=Utilisateurs");

    // Add assertions based on how your app handles errors
    // Example: await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator("table tbody tr")).toContainText("pas de donnée");
  });

  test("should handle empty users list", async ({ page }) => {
    await setLoggedState(page);

    // Mock empty response
    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.goto("/");
    await page.click("text=Utilisateurs");

    await expect(page.locator("table tbody tr")).toContainText("pas de donnée");
    // Add assertion for empty state message if your app has one
    // Example: await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  });
});
