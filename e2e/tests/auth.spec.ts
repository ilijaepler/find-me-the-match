import { test, expect } from '@playwright/test';

const FRONT_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(FRONT_URL);

  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("testtest");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign in successful")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Matches"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();
});

test('should not allow the user to sign in with password with less than 6 characters', async ({ page }) => {
  await page.goto(FRONT_URL);

  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("test");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Password must be at least 6 characters.")).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(FRONT_URL);

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Matches"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();
});



