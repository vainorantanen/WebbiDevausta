const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  });

  test("Main page has expected links.", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a")).toHaveText("Lists");
  });

  test("Can create a shopping list.", async ({ page }) => {
    await page.goto("/lists");
    await page.locator("input[type=text]").type("New shopping list");
  });

  test("List page has expected headings.", async ({ page }) => {
    await page.goto("/lists");
    await expect(page.locator("h1")).toHaveText("Shopping lists page");
  });

  test("Lists page has list of existing shopping lists.", async ({ page }) => {
    await page.goto("/lists");
    await expect(page.locator("h3")).toHaveText("List of existing shopping lists");
  });

  

