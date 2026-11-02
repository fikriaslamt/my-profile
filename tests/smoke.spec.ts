import { expect, test, type Page } from "@playwright/test";

const sectionTop = (page: Page, id: string) =>
  page.evaluate(
    (sectionId) => Math.round(document.querySelector(`#${sectionId}`)?.getBoundingClientRect().top ?? 9999),
    id,
  );

test.describe("navigation", () => {
  test("anchor links scroll to sections and set aria-current", async ({ page }) => {
    await page.goto("/");

    for (const [label, id] of [
      ["Projects", "projects"],
      ["About", "about"],
      ["Work", "work"],
      ["Contact", "contact"],
    ] as const) {
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect.poll(() => sectionTop(page, id)).toBeLessThan(120);
      await expect(page.locator(`a[href="#${id}"][aria-current="page"]`).first()).toBeAttached();
    }
  });

  test("header gains a scrolled state", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("[data-site-header]");
    await expect(header).toHaveAttribute("data-scrolled", "false");
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveAttribute("data-scrolled", "true");
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens the sheet and links close it", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator("#mobile-nav");
    const toggle = page.locator("[data-nav-toggle]");

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await menu.getByRole("link", { name: "About", exact: true }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#about$/);
  });

  test("Escape closes the sheet", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator("#mobile-nav");
    await page.locator("[data-nav-toggle]").click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("no horizontal overflow at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 1);

    await page.locator("[data-nav-toggle]").click();
    const openOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    );
    expect(openOverflow).toBe(true);
  });
});

test.describe("theme", () => {
  test("choice persists across reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /change theme/i }).click();
    await page.getByRole("menuitemradio", { name: "Dark" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  });
});

test.describe("contact form", () => {
  test("validates empty and malformed input, then clears errors", async ({ page }) => {
    await page.goto("/#contact");
    const submit = page.locator("[data-form-submit]");

    await submit.click();
    await expect(page.locator('[data-error-for="name"]')).toHaveText(/enter your name/i);
    await expect(page.locator('[data-error-for="email"]')).toHaveText(/valid email/i);
    await expect(page.locator('[data-error-for="message"]')).toHaveText(/at least 10 characters/i);
    await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");

    await page.fill("#contact-name", "Ada Lovelace");
    await page.fill("#contact-email", "not-an-email");
    await page.fill("#contact-message", "Hello, I would like to talk about a backend project.");
    await submit.click();
    await expect(page.locator('[data-error-for="email"]')).toHaveText(/valid email/i);

    await page.fill("#contact-email", "ada@example.com");
    await expect(page.locator('[data-error-for="email"]')).toHaveText("");
  });
});
