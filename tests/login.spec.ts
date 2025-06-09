import { test, expect } from "@playwright/test";
import { setLoggedState } from "./utils";

const userData = {
  email: "admin@example.com",
  password: "123456",
};

test("should render login form", async ({ page }) => {
  await page.goto("/login");

  // Check that inputs are visible
  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Mot de passe")).toBeVisible();

  // Check that the login button is visible and enabled
  await expect(
    page.getByRole("button", { name: "SE CONNECTER" }),
  ).toBeVisible();
});

test("should log in with correct credentials", async ({ page }) => {
  // Intercept and mock the login API call
  await page.route("**/users/login", async (route) => {
    const request = await route.request().postDataJSON();
    if (
      request.email === userData.email &&
      request.password === userData.password
    ) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify("token"),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ success: false }),
      });
    }
  });

  await page.goto("/login");

  await page.getByPlaceholder("Email").fill(userData.email);
  await page.getByPlaceholder("Mot de passe").fill(userData.password);

  await page.waitForSelector('input[name="email"]'); // ensure form is ready

  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("/users/login") &&
        res.status() === 200 &&
        res.request().method() === "POST",
    ),
    page.getByRole("button", { name: /connecter/i }).click(), // insensitive match
  ]);
  const token = await response.json();
  expect(token).toBeTruthy();
});

test("should stay on dashboard if JWT token is valid", async ({ page }) => {
  await setLoggedState(page);
  await page.goto("/");
  await expect(page).not.toHaveURL(/\/login/);
});
