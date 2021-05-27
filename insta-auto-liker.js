const puppeteer = require("puppeteer");
const C = require("./creds");
const url = "YOUR URL GOES HERE"; //Enter The Page To Be Liked Here

(async () => {
  const browser = await puppeteer.launch({
    args: ["--start-maximized"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.267"
  );

  await page.setViewport({
    width: 1536,
    height: 824,
  });

  await page.goto("https://www.instagram.com/");
  await page.waitForXPath('//*[@id="loginForm"]/div/div[1]/div/label/input');

  await page.type("[name='username']", C.username, { delay: 100 });
  await page.type("[name='password']", C.password, { delay: 100 });

  await page.click("button[type='submit']");
  await page.waitForNavigation();
  // await page.waitForNavigation({ waitUntil: "load" });
  await page.waitForSelector("#react-root");
  await page.goto(url);

  const result = await page.evaluate(async () => {
    let x;
    let liked = 0;
    const ranTime = Math.random() * (7000 - 5000) + 5000;
    const ranTime2 = Math.random() * (1500 - 1000) + 1000;
    const sleep = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));

    let totalPosts = document.querySelector(".g47SY").innerHTML;
    totalPosts = totalPosts.replace(/,/g, "");
    let counter = parseInt(totalPosts);
    document.querySelector("._9AhH0").click();
    for (let i = 0; i < counter; i++) {
      await sleep(ranTime);
      const checker = document
        .querySelector(
          "body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg"
        )
        .getAttribute("aria-label");

      if (checker == "Like") {
        document.getElementsByClassName("wpO6b")[2].click();
        liked++;
      }

      if (i == 0) {
        await document
          .querySelector("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a")
          .click();
      } else if (i == counter - 1) {
        continue;
      } else {
        await document
          .querySelectorAll(
            "body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a"
          )[1]
          .click();
      }
    }

    return `Liked ${liked} Out Of ${counter} Posts`;
  });

  await page.keyboard.press("Escape");

  console.log(result);

  await page.click(
    "#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span > img"
  );

  await page.waitForTimeout(1000);

  await page.click(
    "#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > div.poA5q > div.uo5MA._2ciX.tWgj8.XWrBI > div._01UL2 > div:nth-child(6) > div"
  );
  await browser.close();
})();
