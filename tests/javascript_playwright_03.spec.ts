import { expect, test } from '@playwright/test'
require('dotenv').config()
import { Homepage } from '../pages/Homepage'
import { Collections } from '../pages/Collections'
import { ProdOverview } from '../pages/Product_overview'
import { ProdDetail } from '../pages/Product_detail'
import { Cart } from '../pages/Cart'
import { CheckOut } from '../pages/CheckOut'

test.describe.serial('Assignment of Lecture 03', () => {
    let homepage: Homepage;
    let collections: Collections;
    let productOverview: ProdOverview;
    let productDetail: ProdDetail;
    let cart: Cart;
    let checkOut: CheckOut;

    test.beforeAll(async ({ page }) => {
        page.goto('https://dinhtruong-test.onshopbase.com');
        homepage = new Homepage(page);
        collections = new Collections(page);
        productOverview = new ProdOverview(page);
        collections = new Collections(page);
        productOverview = new ProdOverview(page);
        productDetail = new ProdDetail(page);
        cart = new Cart(page);
        checkOut = new CheckOut(page);
    })

    test.afterAll(async ({ page }) => {
        await page.close();
    })

    test('View products on store', async ({ }) => {
        await homepage.goToCollections();
        await collections.openTopSell();
        await productOverview.openFirstProdDetailPage();
        await productDetail.checkSamePriceAsPOP();
    })

    test('Check out cart', async ({ }) => {

        await productDetail.addProductToCart();
        await cart.checkOutProduct();
        await checkOut.enterShippingInfo({
            email: 'dinh.truong@qa.team',
            firstName: 'Dinh',
            lastName: 'Truong',
            address: '130 Trung Phung',
            city: 'Hanoi',
            country: 'Viet Nam',
            zipCode: '100000',
            phone: process.env.PHONE_NUMBER!
        })

        await checkOut.chooseShippingMethodAndContinue('standard');
        await checkOut.enterPaymentMethodAndCompleteOrder({
            cardNumber: process.env.CARD_NUMBER!,
            cardHolder: 'Truong Cong Dinh',
            CVV: process.env.CVV!,
            expiredDate: process.env.EXPIRED_DATE!
        })
        await checkOut.verifySuccessfullyCompletedOrder();
    })

    test('View order', async ({  }) => {
        await expect(checkOut.contactInfo).toHaveText('dinh.truong@qa.team');
        await expect(checkOut.shippingAddress && checkOut.billingAddress).toContainText(`Dinh Truong 130 Trung Phung ${process.env.PHONE_NUMBER}`)
    })
})
