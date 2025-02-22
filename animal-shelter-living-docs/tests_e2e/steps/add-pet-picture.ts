// @ts-nocheck
import { Given, Then, When } from "@cucumber/cucumber";
import { AppWorld } from "../helpers/app_world";
import { host, getText } from "../helpers/puppeteer_helper";
import path from "path";
import { fillAnimalForm } from "./shared_steps/shared";

Given('the user is on the "Add New Animal" page', async function (this: AppWorld) {
    await this.page.goto(`${host()}/add-animal`);
});

When('the user uploads a picture of the pet', async function (this: AppWorld) {
    await fillAnimalForm(this.page, 'Buddy', 'dog', '2');
    
    const filePath = path.resolve(__dirname, '../assets/dog_profile_pic.jpg');
    const input = await this.page.$('input[name="picture"]');
    await input.uploadFile(filePath);
});

Then('the system should confirm the picture has been uploaded', async function (this: AppWorld) {
    const confirmationMessage = await getText(this.page, '.confirmation-message');
    if (!confirmationMessage.includes('Animal added successfully')) {
        throw new Error('Confirmation message not found');
    }
});

Then('the picture should be displayed on the animal\'s profile page', async function (this: AppWorld) {
    const navigation = this.page.waitForNavigation({waitUntil: 'networkidle0'});
    await this.page.goto(`${host()}/animal-profile?id=1`);
    await navigation;
    
    await this.page.waitForSelector('#image-preview', {timeout: 100});
    const image = await this.page.$('#image-preview');
    if (!image) {
        throw new Error('Image not found on profile page');
    }
    
    let screenshot = await this.page.screenshot({
        type: "png",
        encoding: "base64",
    });
    this.attach(screenshot, { mediaType: "base64:image/png" });
});

When('the user tries to upload an image that exceeds the size limit', async function (this: AppWorld) {
    await fillAnimalForm(this.page, 'Buddy', 'dog', '2');
    
    const filePath = path.resolve(__dirname, '../assets/large-image.jpg');
    const input = await this.page.$('input[name="picture"]');
    await input.uploadFile(filePath);
});

When('the user tries to upload a file that is not an image', async function (this: AppWorld) {
    await fillAnimalForm(this.page, 'Buddy', 'dog', '2');
    
    const filePath = 'path/to/unsupported-file.txt'; // Path to a non-image file
    const input = await this.page.$('input[name="picture"]');
    await input.uploadFile(filePath);
});

Then('the system should display an error message indicating the file is too large', async function (this: AppWorld) {
    const errorMessage = await getText(this.page, '.error-message');
    if (!errorMessage.includes('file is too large')) {
        throw new Error('Error message for large file not found');
    }
});

Then('the system should display an error message indicating the file format is not supported', async function (this: AppWorld) {
    const errorMessage = await getText(this.page, '.error-message');
    if (!errorMessage.includes('file format is not supported')) {
        throw new Error('Error message for unsupported file format not found');
    }
});
