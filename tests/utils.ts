import { Page } from "@playwright/test";

const mockToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTQ4OThmMzU1NzA4MTQ1YTYzOGM3MiIsIm5hbWUiOiJkZXYtYWRtaW4iLCJ0eXBlIjoiYWRtaW4iLCJzaG9wIjoidGVzdCBzaG9wIiwic2hvcElkIjoiNjc3YmNlNDAwMmZkM2QwN2JkMGYwYzI1IiwidG9rZW5WZXJzaW9uIjozLCJpYXQiOjE3NjAzMjIwNTIsImV4cCI6MTc2MDMyOTI1Mn0.unCL7viND03g6GIIT6a4vRfE-lrHjD7MwqVANSt0HUY"
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