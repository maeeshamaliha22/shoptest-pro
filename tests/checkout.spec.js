import { test, expect } from '../fixtures/auth.fixture';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe( 'Checkout', () => {
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    // Navigate through add-to-cart and cart page before each test
    // so all checkout tests start on the checkout information form
    test.beforeEach(async ({ loggedInPage }) => {
            inventoryPage = new InventoryPage(loggedInPage);
            cartPage = new CartPage(loggedInPage);
            checkoutPage = new CheckoutPage(loggedInPage);

            await inventoryPage.addItemToCart();
            await cartPage.goToCartItems();

            // Verify item was added before proceeding — catches add-to-cart regressions
            await expect(cartPage.cartItemCount).toHaveText('1');

            await cartPage.clickCheckout();       
    });

    // Happy path — valid info should complete the order and show confirmation
    test('Full checkout with valid information', async({loggedInPage}) => {
        await checkoutPage.fillCheckoutInfo('standard', 'user', '123');
        await checkoutPage.clickToContinue();
        await checkoutPage.clickToFinish();
        await expect(checkoutPage.confirmationText).toContainText('Thank you for your order!');
    });

    // Field validation — each test leaves one required field empty
    // and verifies the correct error message appears on continue
    test('First name is empty shows an error', async({loggedInPage}) => {
        await checkoutPage.enterFirstName('');
        await checkoutPage.enterLastName('User');
        await checkoutPage.enterPostalCode('123');
        await checkoutPage.clickToContinue();
        await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
    });

    test('Last name is empty shows an error', async({loggedInPage}) => {
        await checkoutPage.enterFirstName('Standard');
        await checkoutPage.enterLastName('');
        await checkoutPage.enterPostalCode('123');
        await checkoutPage.clickToContinue();
        await expect(checkoutPage.errorMessage).toContainText('Error: Last Name is required');
    });

    test('Postal code is empty shows an error', async({loggedInPage}) => {
        await checkoutPage.enterFirstName('Standard');
        await checkoutPage.enterLastName('User');
        await checkoutPage.enterPostalCode('');
        await checkoutPage.clickToContinue();
        await expect(checkoutPage.errorMessage).toContainText('Error: Postal Code is required');
    });


})