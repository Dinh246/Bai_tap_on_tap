import { expect, Locator, Page } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly shopNow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shopNow = page.locator('a.btn >> nth=0');
    }

    async goToCollections() {
        await this.shopNow.click();
        await expect(await this.page).toHaveURL(/.*collections/)
    }
}