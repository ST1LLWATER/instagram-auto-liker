const puppeteer = require("puppeteer");
const fs = require("fs");
const C = require("./creds");
const USERNAME_SELECTOR = "#email";
const PASSWORD_SELECTOR = "#pass";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://www.facebook.com/");
  const login = await page.evaluate(() => {
    return "#" + document.querySelector("button").getAttribute("id");
  });
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username); //Username From creds.js
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password); //Password From creds.js
  await page.click(login);
  await page.waitForNavigation();
  await page.screenshot({ path: "./media/ss.png" });

  await browser.close();
})();
