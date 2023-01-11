const { test, expect } = require("@playwright/test");

test("Main page has expected title.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Topics");
  await expect(page.locator("h2")).toHaveText("Multiple choice questions applicaiton");
});

test("Login page has expected title and headings.", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveTitle("Topics");
    await expect(page.locator("h1")).toHaveText("Login form");
  });

test("Register page has expected title.", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page).toHaveTitle("Topics");
});

test("Can create a user.", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email]").type("Sahkoposti");
    await page.locator("input[type=password]").type("Salasana");
    await page.locator("input[type=submit]").click();
  });

  test("Can login.", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("Sahkoposti");
    await page.locator("input[type=password]").type("Salasana");
    await page.locator("input[type=submit]").click();
  });

  test('Navigates to login when trying to entry path quiz as unauthorized user', async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.locator("h1")).toHaveText("Login form");
  });

  test('Navigates to login when trying to entry path topics as unauthorized user', async ({ page }) => {
    await page.goto("/topics");
    await expect(page.locator("h1")).toHaveText("Login form");
  });
  

  test('Nav bar is not visible in the main page when noboy is logged in', async ({ page }) => {
    const locator = page.locator('.nav-brand');
    await expect(locator).toBeHidden();
  });
  
  test('No errros on statistics', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h3")).not.toContainText('error');
  });

  test('Page shows statistics', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h3")).toHaveText("Statistics:");
  });
  
  