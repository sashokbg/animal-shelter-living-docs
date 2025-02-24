// @ts-nocheck
import { Then, When } from "@cucumber/cucumber";

import { AppWorld } from "../helpers/app_world";
import { host, getText } from "../helpers/puppeteer_helper";
import { fillAnimalForm } from "./shared_steps/shared";

When('the user fills out the animal details', async function (this: AppWorld) {
  await this.page.goto(`${host()}/add-animal`);

  await fillAnimalForm(this.page, 'Fluffy', 'Cat', '3');
});

When('submits the form', async function (this: AppWorld) {
  await this.page.click('button[type="submit"]');
});

Then('the system should confirm the animal has been added', async function (this: AppWorld) {
  const confirmationMessage = await getText(this.page, '.confirmation-message');
  if (!confirmationMessage.includes('Animal added')) {
    throw new Error('Confirmation message not found');
  }

  // Take a screenshot as a Buffer and attach it
  let screenshot = await this.page.screenshot({
    type: "png",
    encoding: "base64",
  });
  this.attach(screenshot, { mediaType: "base64:image/png" });
});

When('the user submits the form with incomplete details', async function (this: AppWorld) {
  await this.page.goto(`${host()}/add-animal`);
  await this.page.type('input[name="name"]', 'Buddy');
  // Leave species empty
  await this.page.type('input[name="age"]', '2');
  await this.page.click('button[type="submit"]');
});

Then('the system should display an error message indicating the missing information', async function (this: AppWorld) {
  const errorMessage = await getText(this.page, '.error-message');
  if (!errorMessage.includes('Species field is required')) {
    throw new Error('Error message not found');
  }
});
