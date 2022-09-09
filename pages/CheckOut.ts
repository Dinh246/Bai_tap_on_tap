import { expect, Page } from '@playwright/test';

export type CardCredentials = {
    cardHolder: string;
    cardNumber: string;
    CVV: string;
    expiredDate: string;
}

export type ShippingInfo = {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    phone: string;
}

export class CheckOut {

    CVVField = this.page.locator('[placeholder="CVV"]');
    cardNumberField = this.page.locator('[placeholder="Card number"]');
    cardHolderField = this.page.locator('[placeholder="Cardholder name"]');
    expiredDateField = this.page.locator('#stripe-card-expiry');
    emailField = this.page.locator('[placeholder="Email"]');
    firstNameField = this.page.locator('[placeholder="First name (optional)"]');
    lastNameField = this.page.locator('[placeholder="Last name"]');
    addressField = this.page.locator('[placeholder="Address"]');
    cityField = this.page.locator('[placeholder="City"]');
    countryField = this.page.locator('[placeholder="Country"]');
    zipCodeField = this.page.locator('[placeholder="Zip Code (optional)"]');
    phoneField = this.page.locator('[placeholder="Phone number"]');
    continueBtn = this.page.locator('.step__continue-button');
    receiveNewsBtn = this.page.locator('#accept-marketing');
    saveInfoBtn = this.page.locator('#checkout_shipping_address_remember_me');
    internationalShipping = this.page.locator('.s-control-label');
    completeOrderBtn = this.page.locator('.step__continue-button');
    sameBillingAddressBtn = this.page.locator('.s-check >> nth=1');
    contactInfo = this.page.locator('.os-step__info >> nth=0');
    paymentMethod = this.page.locator('.payment-method-list__item > span');
    shippingMethod = this.page.locator('.os-step__info >> nth=1');
    shippingAddress = this.page.locator('.address >> nth=0');
    billingAddress = this.page.locator('.address >> nth=1');

    constructor(public readonly page: Page) {
        this.page = page;
    }

    async verifyCheckOutPage() {
        await expect(this.page).toHaveURL('/.*step=contact_information/')
    }

    async enterShippingInfo(info: ShippingInfo) {
        await this.emailField.fill(info.email);
        await this.firstNameField.fill(info.firstName);
        await this.lastNameField.fill(info.lastName);
        await this.addressField.fill(info.address);
        await this.cityField.fill(info.city);
        await this.countryField.fill(info.country);
        await this.zipCodeField.fill(info.zipCode);
        await this.phoneField.fill(info.phone);
    }

    async continueToShippingMethod() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/.*step=shipping_method/);
    }

    async chooseShippingMethodAndContinue(type) {
        if(type == "standard") {
            await this.internationalShipping.click();
        }
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/.*step=payment_method/);
    }

    async enterPaymentMethodAndCompleteOrder(info: CardCredentials) {
        await this.cardNumberField.type(info.cardNumber);
        await this.cardHolderField.type(info.cardHolder);
        await this.CVVField.type(info.CVV);
        await this.expiredDateField.type(info.expiredDate);
        await expect(this.sameBillingAddressBtn).toBeChecked();
        await this.completeOrderBtn.click();
    }

    async verifySuccessfullyCompletedOrder(){
        await expect(this.page).toHaveURL(/.*step=thank_you/)
    }
}