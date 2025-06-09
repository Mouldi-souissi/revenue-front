import { Page } from "@playwright/test";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQzZmE4MzMyYWJkMTA0ZTc2OWMxNiIsIm5hbWUiOiJBZG1pbiBBb3VpbmEiLCJ0eXBlIjoiYWRtaW4iLCJzaG9wIjoiYW91aW5hIiwic2hvcElkIjoiNjU0ZmYxN2IyOTEwZmI1NzBiZmFjZTJjIiwidG9rZW5WZXJzaW9uIjozLCJpYXQiOjE3NDk0MzEwNjUsImV4cCI6MTc0OTQzODI2NX0.FhgUYEuowVuEJsN32-LMNUgUbyAQ7EI729T9zj3lxOM";

export async function setLocalStorageItem(
  page: Page,
  key: string,
  value: string,
) {
  await page.addInitScript(
    ([k, v]) => {
      localStorage.setItem(k, v);
    },
    [key, value],
  );
}

export async function setLoggedState(page: Page) {
  return setLocalStorageItem(page, "token", JSON.stringify(mockToken));
}
