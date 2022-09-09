import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) =>{
        await page.goto('https://accounts.shopbase.com/sign-in');
        await page.fill('[placeholder="example\@email\.com"]', process.env.EMAIL!);
        await page.fill('[placeholder="Password"]', process.env.PASS!);
        await page.click('button:has-text("Sign in")');
        await page.click('text=dinhtruong-test >> nth=0');
        await expect(page).toHaveURL(/.*Home/);
        await use(page);
        await page.close();
    }
})


test('Using fixture to login to dashboard', async ({ page }) => {
    await page.click('span:has-text("Apps")');
    await expect(page).toHaveURL(/.*apps/);
})
