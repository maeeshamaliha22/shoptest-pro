import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from "../pages/LoginPage";

test.describe('Authentication', () => {

    // Happy path — valid credentials should land the user on the inventory page
    test('Valid user can log in', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);  
    });

    // Negative path — wrong password should show a credential mismatch error
    test('Wrong password shows an error', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'wrong_password');
        await expect(login.errorMessage).toBeVisible();  
    });

    // Account-level restriction — locked accounts should show a specific error message
    test('Locked users can not log in', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('locked_out_user', 'secret_sauce');
        await expect(login.errorMessage).toContainText('Sorry, this user has been locked out.');  
    });

    // Field validation — submitting without a username should prompt the user
    test('Username field is empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.enterPassword('secret_sauce');
        await login.clickLogin();
        await expect(login.errorMessage).toContainText('Username is required');  
    });

    // Field validation — submitting without a password should prompt the user
    test('Password field is empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.enterUsername('standard_user');
        await login.clickLogin();
        await expect(login.errorMessage).toContainText('Password is required');  
    });

    // Edge case — submitting with both fields empty should show a validation error
    test('Both fields are empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.clickLogin();
        await expect(login.errorMessage).toContainText('Username is required');
    });
})