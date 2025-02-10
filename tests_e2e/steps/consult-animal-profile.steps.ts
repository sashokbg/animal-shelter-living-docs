// @ts-nocheck
import { Given, Then, When } from "@cucumber/cucumber";
import { AppWorld } from "../helpers/app_world";
import { host, getText } from "../helpers/puppeteer_helper";
import { expect } from 'expect'

Given('the user is on the "Animal List" page', async function (this: AppWorld) {
    const navigation = this.page.waitForNavigation({waitUntil: 'networkidle0'})
    await this.page.goto(`${host()}/animal-list`);
    await navigation;
});

When('the user selects an animal from the list', async function (this: AppWorld) {
    const element = await this.page.waitForSelector('.animal-item:first-child a');
    const navigation = this.page.waitForNavigation({waitUntil: 'networkidle0'})
    await element.click();
    await navigation;
});

Then('the system should display the animal\'s profile', async function (this: AppWorld) {
    const profile = await this.page.waitForSelector('.animal-profile', {timeout: 1000})
    expect(await profile.isVisible()).toBe(true);
});

Then('the profile should include the animal\'s name, species, age, and any additional notes', async function (this: AppWorld) {
    const name = await getText(this.page, '.animal-profile .name');
    const species = await getText(this.page, '.animal-profile .species');
    const age = await getText(this.page, '.animal-profile .age');
    const notes = await getText(this.page, '.animal-profile .notes');
    
    if (!name || !species || !age || !notes) {
        throw new Error('Profile details are incomplete');
    }
});

When('the user tries to access a profile that does not exist', async function (this: AppWorld) {
    await this.page.goto(`${host()}/animal-profile/non-existent`);
});

Then('the system should display an error message indicating the profile is unavailable', async function (this: AppWorld) {
    const errorCode = await getText(this.page, 'h1.next-error-h1');
    const errorMessage = await getText(this.page, 'h2');
    
    if (errorCode !== '404' || !errorMessage.includes('This page could not be found.')) {
        throw new Error('Expected 404 error message not found');
    }
}); 