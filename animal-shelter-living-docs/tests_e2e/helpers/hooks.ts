import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { AppWorld } from "./app_world";
import { Browser } from "puppeteer";
import { openBrowser } from "./puppeteer_helper";

setDefaultTimeout(120000);

Before(async function (this: AppWorld) {
  try {
    const browser = await openBrowser(this);
    const page = (await browser.pages())[0];

    this.browser = browser;
    this.page = page;

    console.log("App is initialized");
  } catch (error: any) {
    console.log("Error opening browser", error);
    await this.browser.close();
  }
});

After(async function () {
  let isCi = this.parameters.ci && JSON.parse(this.parameters.ci);
  let isDemo = this.parameters.demo && JSON.parse(this.parameters.demo);

  const browser: Browser = this.browser;

  if (browser && (isCi || isDemo)) {
    await browser.close();
  } else {
    await browser.close();
  }
});
