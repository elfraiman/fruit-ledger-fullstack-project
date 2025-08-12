import { test, expect } from '@playwright/test';

test.describe('Stock Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Switch to Stock Management tab by clicking on the second tab
    await page.click('button:has-text("Stock Management")');
  });

  test('should display stock management interface', async ({ page }) => {
    // Check if stock management components are visible
    await expect(page.locator('text=Purchase fruit')).toBeVisible();
  });

  test('should allow selecting an office', async ({ page }) => {
    // Select an office from dropdown
    await page.selectOption('select', { label: 'Amsterdam' });

    // Verify office is selected by checking the select value
    const selectedValue = await page.locator('select').inputValue();
    expect(selectedValue).toBe('1'); // Amsterdam has ID 1
  });

  test('should display fruit inventory cards', async ({ page }) => {
    // Select office first
    await page.selectOption('select', { label: 'Amsterdam' });

    // Check if fruit cards are visible
    await expect(page.locator('text=Apple')).toBeVisible();
    await expect(page.locator('text=Pear')).toBeVisible();

    // Check if quantity inputs are present
    const quantityInputs = page.locator('input[type="number"]');
    await expect(quantityInputs.first()).toBeVisible();
  });

  test('should update fruit quantities', async ({ page }) => {
    // Select office first
    await page.selectOption('select', { label: 'Amsterdam' });

    // Find first quantity input and update it
    const firstQuantityInput = page.locator('input[type="number"]').first();
    await firstQuantityInput.fill('5');

    // Verify quantity is updated
    await expect(firstQuantityInput).toHaveValue('5');
  });

  test('should show calorie information', async ({ page }) => {
    // Select office first
    await page.selectOption('select', { label: 'Amsterdam' });

    // Add some quantities
    const quantityInputs = page.locator('input[type="number"]');
    const count = await quantityInputs.count();

    if (count > 0) {
      await quantityInputs.first().fill('3');

      // Check if calorie information is displayed
      await expect(page.locator('text=calories, text=kcal').first()).toBeVisible();
    }
  });
});
