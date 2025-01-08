import { test } from '@playwright/test';
import { ai } from 'tests-ai';

const baseUrl = process.env.NEXT_APP_BASE_URL || 'http://localhost:3000';

test.describe('Stock Inventory Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display the inventory list and add item form', async ({ page }) => {
    await ai('check that the inventory list and add item form are visible', {
      page,
      test,
    });
  });

  test('should add a new item to the inventory', async ({ page }) => {
    await ai('fill in the form with "Test Item", "This is a test item.", "10.99", "5" and submit', {
      page,
      test,
    });
    await ai('check that the new item "Test Item" is visible in the inventory list', {
      page,
      test,
    });
  });
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
});
