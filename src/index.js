const puppeteer = require("puppeteer");

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://wufazhuce.com/", {
    waitUtil: "networkidle2"
  });

  const text = await page.$eval(".fp-one-cita a", heading => {
    return heading.innerText;
  });
  console.log(text);
  page.close();
};

run();
