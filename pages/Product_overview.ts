import { Page } from '@playwright/test';

export class ProdOverview {
    
firstProd = this.page.locator('.collection-detail__product-image > .w-100 >> nth=0');
firstProdPrice = this.page.locator('.money-original >> nth=0');
secondProd = this.page.locator('.collection-detail__product-image > .w-100 >> nth=1');
secondProdPrice = this.page.locator('.money-original >> nth=1');
thirdProd = this.page.locator('.collection-detail__product-image > .w-100 >> nth=2');
thirdProdPrice = this.page.locator('.money-original >> nth=2');
fourthProd = this.page.locator('.collection-detail__product-image > .w-100 >> nth=3');
fourthProdPrice = this.page.locator('.money-original >> nth=3');

constructor(public readonly page: Page) {
    this.page = page;
}

    async openFirstProdDetailPage() {
    await this.firstProd.click();
    await this.page.waitForLoadState('networkidle');
}

    async openSecondProdDetailPage() {
    await this.secondProd.click();
    await this.page.waitForLoadState('networkidle');
}

    async openThirdProdDetailPage() {
    await this.thirdProd.click();
    await this.page.waitForLoadState('networkidle');
}

    async openFourthProdDetailPage() {
    await this.fourthProd.click();
    await this.page.waitForLoadState('networkidle');
}

    async verifyProductsInfo() {
    await console.log('There are ' + await this.page.locator('.collection-detail__product-image > .w-100').count() + ' product(s) in this collection');
}
}