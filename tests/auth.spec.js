import {test, expect} from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";

test.describe('Authentication', () => {

    test('valid user can log in', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);  
    });

    test('Wrong password shows an error', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'wrong_password');
        await expect(login.errorMessage).toBeVisible();  
    });

    test('Locked users can not log in', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('locked_out_user', 'secret_sauce');
        await expect(login.errorMessage).toContainText('Sorry, this user has been locked out.');  
    });

    test('Username field is empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.enterPassword('secret_sauce');
        await login.clickLogin();
        await expect(login.errorMessage).toContainText('Username is required');  
    });

    test('Password field is empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.enterUsername('standard_user');
        await login.clickLogin();
        await expect(login.errorMessage).toContainText('Password is required');  
    });

    test('Both fields are empty', async({page}) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.clickLogin();
        await expect(login.errorMessage).toBeVisible();  
    });
})