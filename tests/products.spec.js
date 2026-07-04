import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from "../pages/InventoryPage";

test.describe('Inventory', () => {
    let inventoryPage;

    test.beforeEach(async ({ loggedInPage }) => {
                inventoryPage = new InventoryPage(loggedInPage);      
        });

    // Verify the correct number of products is shown — catches missing/duplicate items
    test('Should display exactly 6 products on the inventory page', async({loggedInPage}) => {
        await expect(inventoryPage.productItems).toHaveCount(6);
    })

    // Verify the default order of displayed products 
    test('Should display products in default order on page load', async({loggedInPage}) => {
        const productNames = await inventoryPage.getProductNames();
        expect(productNames[0]).toBe('Sauce Labs Backpack');
    })
    
    // Sort tests verify the dropdown correctly reorders the product list
    test('Should sort products by name from A to Z', async({loggedInPage}) => {
        await inventoryPage.sortBy('az');
        const productNames = await inventoryPage.getProductNames();
        expect(productNames[0]).toBe('Sauce Labs Backpack');
    })

    test('Should sort products by name from Z to A', async({loggedInPage}) => {
        await inventoryPage.sortBy('za');
        const productNames = await inventoryPage.getProductNames();
        expect(productNames[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    })

    test('Should sort products by price from high to low', async({loggedInPage}) => {
        await inventoryPage.sortBy('hilo');
        const productPrices = await inventoryPage.getProductPrices();
        expect(productPrices[0]).toBe('$49.99');
    })

    test('Should sort products by price from low to high', async({loggedInPage}) => {
        await inventoryPage.sortBy('lohi');
        const productPrices = await inventoryPage.getProductPrices();
        expect(productPrices[0]).toBe('$7.99');
    })

})
