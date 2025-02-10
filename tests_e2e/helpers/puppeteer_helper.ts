import { AppWorld } from "./app_world";
import puppeteer, { Browser, connect, Page } from "puppeteer";
import * as fs from "node:fs";

export const host = () => {
  let host = process.env.PAM_URL || "http://localhost:3000";
  console.log("Host is", host);
  return host;
};

export const uploads_dir = () => {
  let uploads_dir = process.env.PAM_UPLOADS_DIR || "../test_data";
  console.log("Uploads dir is:", uploads_dir);

  return uploads_dir;
};

export const openBrowser = async (world: AppWorld): Promise<Browser> => {
  let headless = false;
  let isCi = world.parameters.ci && JSON.parse(world.parameters.ci);

  let browser;

  if (isCi) {
    browser = await connect({
      acceptInsecureCerts: true,
      browserWSEndpoint:
        process.env.BROWSERLESS_ENDPOINT || "ws://browserless-chrome:3000/",
    });
  } else {
    browser = await puppeteer.launch({
      defaultViewport: null,
      headless: headless,
    });
  }

  world.browser = browser;
  return browser;
};

export const takeRawScreenshot = async (page: Page) => {
  const screenshot = await page.screenshot({
    type: "png",
    encoding: "binary",
  });

  fs.writeFileSync("output.png", screenshot);
};

export const getText = async (page: Page, selector: string) => {
  await page.waitForSelector(selector);
  const element = await page.$(selector);
  return await page.evaluate((el) => el!.textContent, element);
};
