import { test, expect } from '@playwright/test'
require('dotenv').config()


test('verify API images property: id inside nested array', async ({ request }) => {
    const baseURL: string = "https://monitor.onshopbase.com";
    const apiResponse = await request.get(`${baseURL}/api/catalog/next/product/ombre-jumbo-braids-hair-24inch-100g-synthetic-braiding-hair-crochet-braid-hair-extension-for-women-blond-brown-pink-purple.json`)
    const jsonFile = await apiResponse.json();

    // Cách 1 dùng toMatchObject
    const expected: any = [];
    const obj = {};
    let idIndex = 0;
    for (const i = 106; expected.length < i;) {
        if (expected.length === idIndex) {
            // idIndex++;
            expected.push({ "id": 561327770 + idIndex + 1 })
        } else {
            expected.push(obj);
        }
    }
    await expect.soft(jsonFile).toMatchObject({
        "result": {
            "images": expected
        }
    })

    const imagesProp = jsonFile.result.images;
    // Cách 2 dùng array/objectContaining
    await expect.soft(imagesProp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                "id": 561327772
            })
        ])
    )
});

test('Create product by API', async ({ request }) => {
    const productName:string = "Mojo68 Monster";
    const price = 199.99;
    const baseURL = "https://qa-team.onshopbase.com"

    // Request POST method tạo product trên webadmin
    const createProduct = await request.post(`${baseURL}/admin/products.json`, {
        data: {
            product: {
                title: productName,
                variants: [{
                    price: price
                }]
            }
        }
    })

    // Check status
    expect(createProduct.ok()).toBeTruthy();

    // Request GET method lấy danh sách tất cả các product trên store   
    const response = await request.get(`${baseURL}/admin/products.json`);
    // console.log(await response.json());

    // Check status
    await expect(response.ok()).toBeTruthy();
    const jsonFile = await response.json();
    const products = jsonFile.products;

    // Kiểm tra xem có product với title và price đã tạo ở trên tồn tại ko
    await expect(products).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                title: productName,
                variants: expect.arrayContaining([
                    expect.objectContaining({
                        price: price
                    })
                ])
            })
        ])
    )

    // Kiểm tra thẳng từ jsonFile
    await expect(jsonFile).toEqual({
        products: expect.arrayContaining([
            expect.objectContaining({
                title: productName,
                variants: expect.arrayContaining([
                    expect.objectContaining({
                        price: price
                    })
                ])
            })
        ]),
        x_is_custom_request: {}
    })
})

test('Delete a product by API', async ({ request }) => {
    const baseURL = "https://qa-team.onshopbase.com"
    const delMojo68 = await request.delete(`${baseURL}/admin/products/1000000407518946.json`)
    await expect(delMojo68.ok()).toBeTruthy();

    // Check product còn trên list không
    const response = await request.get(`${baseURL}/admin/products.json`);
    const jsonFile = await response.json();
    const productsList = jsonFile.products;

    await expect(productsList).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                title: "Mojo68 Monster",
                variants: expect.arrayContaining([
                    expect.objectContaining({
                        price: 199.99
                    })
                ])
            })
        ])
    )
})

