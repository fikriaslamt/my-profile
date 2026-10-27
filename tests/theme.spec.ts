import { expect, test, type Page } from "@playwright/test";

const html = (page: Page) => page.locator("html");

test.describe("theme", () => {
  test.use({ colorScheme: "light" });

  test("fresh visit follows the OS light theme", async ({ page }) => {
    await page.goto("/");
    await expect(html(page)).toHaveAttribute("data-theme", "light");
    await expect(html(page)).toHaveAttribute("data-theme-mode", "system");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#ffffff",
    );
  });

  test("explicit choice persists across reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /change theme/i }).click();
    await page.getByRole("menuitemradio", { name: "Dark" }).click();

    await expect(html(page)).toHaveAttribute("data-theme", "dark");
    await expect(html(page)).toHaveAttribute("data-theme-mode", "dark");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#0a0a0a",
    );

    await page.reload();
    await expect(html(page)).toHaveAttribute("data-theme", "dark");
    await expect(html(page)).toHaveAttribute("data-theme-mode", "dark");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  });

  test("system mode follows live OS changes", async ({ page }) => {
    await page.goto("/");
    await expect(html(page)).toHaveAttribute("data-theme", "light");

    await page.emulateMedia({ colorScheme: "dark" });

    await expect(html(page)).toHaveAttribute("data-theme", "dark");
    await expect(html(page)).toHaveAttribute("data-theme-mode", "system");
  });

  test("keyboard: opens with Enter, navigates, closes with Escape", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /change theme/i });
    await toggle.focus();
    await page.keyboard.press("Enter");

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("menuitemradio", { name: "System" })).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("menuitemradio", { name: "Light" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test.describe("dark OS", () => {
    test.use({ colorScheme: "dark" });

    test("fresh visit follows the OS dark theme", async ({ page }) => {
      await page.goto("/");
      await expect(html(page)).toHaveAttribute("data-theme", "dark");
      await expect(html(page)).toHaveAttribute("data-theme-mode", "system");
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
        "content",
        "#0a0a0a",
      );
    });
  });
});
