import { test, expect } from '@playwright/test';
require('dotenv').config();

    test('verify API has ID = 1000000072213752', async ({ request }) => {
        const baseURL: string = process.env.BASEURL!;
        const apiRequest = await request.get(`${baseURL}/api/catalog/next/product/ombre-jumbo-braids-hair-24inch-100g-synthetic-braiding-hair-crochet-braid-hair-extension-for-women-blond-brown-pink-purple.json`)
        await expect(apiRequest.ok()).toBeTruthy()

        // Cách 1 chuyển api response từ json sang dạng String và so sánh
        const bodyText = JSON.stringify(await apiRequest.json())
        await expect(bodyText).toContain('"id":1000000072213752')

        //Cách 2 dùng toMatchObject để so sánh 2 object với nhau (recommend)        
        await expect(await apiRequest.json()).toMatchObject({
            "result": {
                "id": 1000000072213752,
                "available": true,
                "collection_ids": [],
                "image": "https://img.thesitebase.net/10038/10038790/products/159394385920c21d6c6e.jpeg",
                "custom_options": null
            }
        })

        //Cách 3 lấy id từ object ra so sánh
        const obj = await apiRequest.json();
        await expect(obj.result.id).toBe(1000000072213752)

        //Cách 4 get body của api và chuyển sang dạng string để so sánh
        await expect((await apiRequest.body()).toString()).toContain('"id":1000000072213752')
  })