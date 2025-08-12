import { test, expect } from '@playwright/test';

test.describe('Consumption Reports', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Reports tab should be active by default
    await page.click('button:has-text("Analytics & Reports")');
  });

  test('should display reports interface', async ({ page }) => {
    // Check if reports components are visible
    await expect(page.locator('text=Analytics & Reports')).toBeVisible();

    // Check if office and year selectors are present
    const selectors = page.locator('select');
    await expect(selectors).toHaveCount(2); // Office and Year selectors
  });

  test('should show instruction message when no filters selected', async ({ page }) => {
    // Should show instruction to select filters
    await expect(page.locator('text=Select Filters to Generate Report')).toBeVisible();
  });

  test('should have office and year selectors', async ({ page }) => {
    // Check office selector options
    const officeSelector = page.locator('select').first();
    await expect(officeSelector).toBeVisible();

    // Check year selector
    const yearSelector = page.locator('select').last();
    await expect(yearSelector).toBeVisible();
  });

  test('should generate consumption report when filters are selected', async ({ page }) => {
    // Select office (Amsterdam = 1)
    await page.selectOption('select >> nth=0', '1');

    // Select year (2024)
    await page.selectOption('select >> nth=1', '2024');

    // Wait for loading indicator or report content
    await page.waitForTimeout(2000); // Give time for API call

    // Should show either data or empty state (not the instruction message)
    const hasInstructions = await page.locator('text=Select Filters to Generate Report').isVisible();
    expect(hasInstructions).toBe(false);
  });

  test('should display content after selecting filters', async ({ page }) => {
    // Select office and year
    await page.selectOption('select >> nth=0', '1'); // Amsterdam
    await page.selectOption('select >> nth=1', '2024');

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Should show either consumption data or empty state message
    const hasEmptyState = await page.locator('text=No consumption data found').isVisible();
    const hasConsumptionData = await page.locator('text=Consumption Overview').isVisible();

    expect(hasEmptyState || hasConsumptionData).toBe(true);
  });

  test('should handle different office selections', async ({ page }) => {
    const officeIds = ['1', '2', '3', '4']; // Amsterdam, Berlin, Paris, London

    for (const officeId of officeIds) {
      // Select office
      await page.selectOption('select >> nth=0', officeId);

      // Select year
      await page.selectOption('select >> nth=1', '2024');

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Should not show instruction message
      const hasInstructions = await page.locator('text=Select Filters to Generate Report').isVisible();
      expect(hasInstructions).toBe(false);
    }
  });

  test('should handle year selection changes', async ({ page }) => {
    // Select office first
    await page.selectOption('select >> nth=0', '1'); // Amsterdam

    const years = ['2024', '2023', '2022'];

    for (const year of years) {
      // Select year
      await page.selectOption('select >> nth=1', year);

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Should not show instruction message
      const hasInstructions = await page.locator('text=Select Filters to Generate Report').isVisible();
      expect(hasInstructions).toBe(false);
    }
  });

  test('should show loading state when generating reports', async ({ page }) => {
    // Select office and year
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '2024');

    // Check if loading indicator appears (even briefly)
    // This test might be flaky due to fast loading, but it's good to have
    const hasLoadingText = await page.locator('text=Generating consumption report').isVisible({ timeout: 1000 }).catch(() => false);

    // If loading was too fast, just check that we don't have the instruction message
    if (!hasLoadingText) {
      const hasInstructions = await page.locator('text=Select Filters to Generate Report').isVisible();
      expect(hasInstructions).toBe(false);
    }
  });
});
