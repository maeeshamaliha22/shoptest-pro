export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Checkout step 1 — customer information form fields
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        
        // Error message — appears when required fields are missing or invalid
        this.errorMessage = page.locator('[data-test="error"]');

        // Checkout step 1 navigation
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.getByRole('button', {name:'Cancel'});

        // Checkout step 2 — order overview navigation
        this.finishButton = page.getByRole('button', {name:'Finish'});
        
        // Order confirmation — visible only after a successful purchase
        this.confirmationText = page.locator('.complete-header');
    }

    // Individual field methods — allow granular control for validation tests
    async enterFirstName(firstname) {
        await this.firstNameInput.fill(firstname);
    }

    async enterLastName(lastname) {
        await this.lastNameInput.fill(lastname);
    }

    async enterPostalCode(postalcode) {
        await this.postalCodeInput.fill(postalcode);
    }

    // Composed method — fills all fields and proceeds to the order overview
    async fillCheckoutInfo(firstname, lastname, postalcode) {
        await this.enterFirstName(firstname);
        await this.enterLastName(lastname);
        await this.enterPostalCode(postalcode);
    }

    async clickToContinue() {
        await this.continueButton.click();
    }

    // Returns to the cart without completing the order
    async clickToCancel() {
        await this.cancelButton.click();
    }

    // Completes the purchase on the order overview page 
    async clickToFinish() {
        await this.finishButton.click();
    }
}