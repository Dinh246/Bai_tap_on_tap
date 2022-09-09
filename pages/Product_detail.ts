import { expect, Page } from '@playwright/test';
import { ProdOverview } from './Product_overview';

export class ProdDetail extends ProdOverview {

prodName = this.page.locator('.collection-detail__product-image > .w-100 >> nth=0');
prodPrice = this.page.locator('.product__price-span');
quantityFieldPDP = this.page.locator('//*[@type="number"]');
quantityFieldCart = this.page.locator('text=QuantityRemove item >> input[type="number"]');
increaseQuantityBtn = this.page.locator('.chevron-top');
decreaseQuantityBtn = this.page.locator('.chevron-bottom');
addToCartBtn = this.page.locator('.btn-buy-now');
removeItemBtn = this.page.locator('.product-cart__remove');
subTotalPrice = this.page.locator('.cart__subtotal-price');

constructor(page: Page) {
    super(page);
}

    async checkSamePriceAsPOP(){
    await expect(await this.prodPrice.innerText).toEqual(await this.firstProdPrice.innerText);
}
    async setTheQuantity(number) {
    await this.quantityFieldPDP.fill(`${number}`)
}

    async increaseTheQuantityBy(number) {
    for (let i = 0; i < number; i++) {
        await this.increaseQuantityBtn.click();
    }
}

    async decreaseTheQuantityBy(number) {
    for (let i = 0; i < number; i++) {
        await this.decreaseQuantityBtn.click();
    }
}

    async addProductToCart() {
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
}

    async verifySubTotalIsCorrect() {
    await expect(this.subTotalPrice).toEqual(parseInt(this.prodPrice.toString().slice(1).replace(/,/g, '')) * parseInt(this.quantityFieldCart.inputValue.toString()));
}

    async removeItemFromCart(){
    await this.removeItemBtn.click()
}
}