export class InventoryPage {

    constructor(page) {
        this.page = page;

        // Product list locators — used for count assertions and text extraction
        this.productItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

        // Sort dropdown — controls product ordering
        this.sortDropdown = page.locator('.product_sort_container');

        // Add to cart button — .first() is used when clicking to target one product
        this.addToCartButton = page.getByRole('button', {name:'Add to cart'});
    }

    // Returns all visible product names as a string array
    async getProductNames() {
        return await this.productNames.allTextContents();   
    }

    // Returns all visible product prices as a string array (e.g. ['$7.99', '$9.99'])
    async getProductPrices() {
        return await this.productPrices.allTextContents();   
    }

    // Selects a sort option by value: 'az', 'za', 'lohi', 'hilo'
    async sortBy(value) {
        await this.sortDropdown.selectOption(value);
    }

    // Adds the first product in the list to the cart
    // .first() is required because multiple "Add to cart" buttons exist on the page
    async addItemToCart() {
        await this.addToCartButton.first().click();
    }

}