import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('UI Testing using Selenium', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password using CSS Selector and XPath', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button and load the dashboard', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        await driver.findElement(By.id('loginButton')).click();
        await driver.wait(until.titleIs('Dashboard'), 5000);
        const title = await driver.getTitle();
        expect(title).to.equal('Dashboard');
    });

    it('should show error message on login failure', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.css('#username')).sendKeys('wronguser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('wrongpassword');
        await driver.findElement(By.id('loginButton')).click();

        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        expect(alertText).to.equal('Login failed! Please check your username and password.');
        await alert.accept();
    });

    it('should show error message when username or password is empty', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.id('loginButton')).click();

        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        expect(alertText).to.equal('Login failed! Please check your username and password.');
        await alert.accept();
    });

    it('should show error message when password is too short', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('123'); // Password terlalu pendek
        await driver.findElement(By.id('loginButton')).click();

        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        expect(alertText).to.equal('Login failed! Please check your username and password.');
        await alert.accept();
    });

    it('should validate visual elements', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should load the dashboard page after login', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/login.html');
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        await driver.findElement(By.id('loginButton')).click();
        await driver.wait(until.elementLocated(By.id('usernameDisplay')), 5000);
        const displayedUsername = await driver.findElement(By.id('usernameDisplay')).getText();
        expect(displayedUsername).to.equal('testuser');
    });

    it('should log out successfully and redirect to login page', async function () {
        await driver.get('file:///C:/ppmpl/prak4/selenium-ui-test/dashboard.html');
        await driver.findElement(By.id('logoutButton')).click();
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });
});
