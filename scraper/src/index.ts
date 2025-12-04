import puppeteer from "puppeteer";

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.yesstyle.com");
  const title = await page.title();

  console.log("Page title:", title);

  await browser.close();
}

run();
