import * as puppeteer from 'puppeteer';

describe('Plugin sample title', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:4444');
  });

  it('should display "Plugin Sample" text on page', async () => {
    await expect(page).toMatch('Plugin Sample');
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});
