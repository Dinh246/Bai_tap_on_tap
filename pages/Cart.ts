import { expect, Locator, Page } from '@playwright/test'

export class Cart {

    readonly page: Page;
    readonly goToCartBtn: Locator;
    readonly checkOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkOutBtn = page.locator('//*[@name="checkout"]');
        this.goToCartBtn = page.locator('.btn-subtle');
    }

    async goToCart(){
        await this.goToCartBtn.click();
    }

    async checkOutProduct(){
        await this.checkOutBtn.click();
        await expect(this.page).toHaveURL(/.*checkouts/)
    }
}