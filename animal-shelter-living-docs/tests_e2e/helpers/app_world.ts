import {type IWorldOptions, World} from '@cucumber/cucumber';
import {Browser, Page} from 'puppeteer';

export class AppWorld extends World {
  public browser!: Browser;
  public page!: Page;

  constructor(props: IWorldOptions) {
    super(props);
  }
}
