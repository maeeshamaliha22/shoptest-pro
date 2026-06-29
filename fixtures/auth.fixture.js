// Custom fixture that provides a pre-authenticated page to any test that needs it
// Import base test object to extend with custom fixtures
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Extend base test with a custom 'loggedInPage' fixture
// Any test using { loggedInPage } will automatically start in a logged-in state
export const test =  base.extend({
    loggedInPage : async ({ page }, use) => {
        // Perform login using the LoginPage page object
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'secret_sauce');

        // Hand the logged-in page to the test — everything before this is setup
        await use(page);
    },
});

// Re-export expect so test files only need to import from this fixture file
export { expect } from '@playwright/test';