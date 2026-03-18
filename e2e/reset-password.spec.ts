import { test, expect } from "@playwright/test";

test.describe("Reset password page", () => {
  test("without token shows invalid link message", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByText(/invalid or expired reset link/i)).toBeVisible({ timeout: 5000 });
  });

  test("with invalid token type shows error", async ({ page }) => {
    await page.goto("/reset-password?token_hash=abc&type=signup");
    await expect(page.getByText(/invalid|expired|request a new/i)).toBeVisible({ timeout: 5000 });
  });
});
