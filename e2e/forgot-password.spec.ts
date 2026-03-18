import { test, expect } from "@playwright/test";

test.describe("Forgot password flow", () => {
  test("forgot password page shows form and link back to login", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { name: /forgot password/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /send reset link/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
  });

  test("submitting email shows success message", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByRole("button", { name: /send reset link/i }).click();
    await expect(page.getByText(/check your email/i)).toBeVisible({ timeout: 5000 });
  });
});
