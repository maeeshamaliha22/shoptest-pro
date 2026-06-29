export class CartPage {
    constructor(page) {
        this.page = page;

        // Navigation — cart icon and badge appear in the header across all pages
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItemCount = page.locator('.shopping_cart_badge');

        // Cart page action buttons
        this.removeButton = page.getByRole('button', {name:'Remove'});
        this.continueShoppingButton = page.getByRole('button', {name:'Continue Shopping'});
        this.checkoutButton = page.getByRole('button', {name:'Checkout'});
    }

    // Clicks the cart icon to navigate to the cart page
    async goToCartItems() {
        await this.cartIcon.click();
    }

    // Proceeds from cart to the checkout information form
    async clickCheckout() {
        await this.checkoutButton.click();
    }
}