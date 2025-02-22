import expect from "expect";
import { Page } from "puppeteer";
import { getText, host } from "../../helpers/puppeteer_helper";

export const login = async (page: Page) => {
  await page.goto(host());
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  
  const navigation = page.waitForNavigation({ waitUntil: "networkidle0" });
  
  await page.locator("#email").fill("user@example.com");
  await page.locator("#password").fill("password");
  await page.locator("#login-button").click();
  
  await navigation;
  
  console.log("Verifying welcome title");
  
  let selector_title = "h1#welcome-title";
  
  await page.waitForSelector(selector_title);
  const content = await getText(page, "h1#welcome-title");
  
  console.log("Verifying welcome title .. done");
  expect(content).toContain("Welcome to Product Assistant Management");
  console.log("Login .. done");
};

export async function fillAnimalForm(page: Page, name: string, species: string, age: string) {
  const nameSelector = 'input[name="name"]';
  const nameElement = await page.waitForSelector(nameSelector, { visible: true });
  await nameElement!.type(name);

  const speciesSelector = 'select[name="species"]';
  await page.waitForSelector(speciesSelector);
  await page.select(speciesSelector, species);

  const ageSelector = 'input[name="age"]';
  await page.waitForSelector(ageSelector);
  await page.type(ageSelector, age);
}
