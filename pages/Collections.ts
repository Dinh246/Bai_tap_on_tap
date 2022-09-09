import { expect, Locator, Page } from '@playwright/test';

export class Collections{

    topSell = this.page.locator('.collection--image >> nth=0');
    highEnd = this.page.locator('.collection--image >> nth=1');
    forBusiness = this.page.locator('.collection--image >> nth=2');
    bestDou = this.page.locator('.collection--image >> nth=3');

    constructor(public readonly page: Page) {
        this.page = page;
    }

    async openTopSell() {
        await this.topSell.click();
        await expect(await this.page).toHaveURL(/.*top-selling-products/);
    }

    async openHighEnd() {
        await this.highEnd.click();
        await expect(this.page).toHaveURL(/.*high-end/);
    }

    async openForBusiness() {
        await this.forBusiness.click();
        await expect(this.page).toHaveURL(/.*for-business/);
    }

    async openBestDou() {
        await this.bestDou.click();
        await expect(this.page).toHaveURL(/.*best-dou/);
    }
}