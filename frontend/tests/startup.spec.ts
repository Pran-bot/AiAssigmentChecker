import { test, expect } from '@playwright/test';



test('test', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  await expect(page.getByRole('main')).toContainText('Where teaching and learning come together');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome back');
  await page.getByRole('button', { name: 'Teacher Login?' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('santoshnimbalkar@vit.edu');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('1234');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
});