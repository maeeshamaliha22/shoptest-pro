export class LoginPage {

    constructor(page) {
        this.page = page;

        // Form field locators — identified by placeholder text for resilience
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');

         // Login button — matched by visible text to reflect what the user sees
        this.loginButton = page.getByRole('button', {name:'Login'});

        // Error message container — appears on failed login attempts
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to the login page (baseURL is set in playwright.config.js)
    async goto() {
        await this.page.goto('/');
    }

// Individual field actions — used for empty-field validation tests
    async enterUsername(username) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    // Full login flow — composes the three individual actions above
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}