import { test, expect } from '@playwright/test';

const baseUrl = process.env.NEXT_APP_BASE_URL || 'http://localhost:3000';

test.describe('Stock Inventory Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display the inventory list and add item form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Webshop Inventory Management' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current Inventory' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Add New Item' })).toBeVisible();
  });

  test('should add a new item to the inventory', async ({ page }) => {
    await page.fill('input[placeholder="Item Name"]', 'Test Item');
    await page.fill('textarea[placeholder="Description"]', 'This is a test item.');
    await page.fill('input[placeholder="Price"]', '10.99');
    await page.fill('input[placeholder="Quantity"]', '5');
    await page.click('button:has-text("Add Item")');

    await expect(page.getByText('Item added', { exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Test Item', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'This is a test item.', exact: true })).toBeVisible();
    await expect(page.getByText('$10.99')).toBeVisible();
    await expect(page.getByRole('cell', { name: '5', exact: true })).toBeVisible();
  });

  test('should edit an existing item in the inventory', async ({ page }) => {
    await page.click('button:has-text("Edit")');
    await page.fill('input[placeholder="Item Name"]', 'Updated Item');
    await page.fill('textarea[placeholder="Description"]', 'This is an updated test item.');
    await page.fill('input[placeholder="Price"]', '15.99');
    await page.fill('input[placeholder="Quantity"]', '10');
    await page.click('button:has-text("Update Item")');

    await expect(page.getByText('Item updated', { exact: true })).toBeVisible();
    await expect(page.getByText('Updated Item')).toBeVisible();
    await expect(page.getByText('This is an updated test item.')).toBeVisible();
    await expect(page.getByText('$15.99')).toBeVisible();
    await expect(page.getByText('10')).toBeVisible();
  });

  test('should delete an item from the inventory', async ({ page }) => {
    await page.click('button:has-text("Delete")');
    await expect(page.getByText('Item deleted', { exact: true })).toBeVisible();
    await expect(page.getByText('Test Item')).not.toBeVisible();
  });
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
});
