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
  await page.close();
  await browser.disconnect();
  process.exit(0)
};

const env = process.env

// 短信平台账号
const user = env.USERNAME
// 短信平台密码
const password = env.PASSWORD
// 要发送的短信内容
const content = "短信内容"
// 要发送短信的手机号码
const phone = env.PHONE

console.log(user, password, phone)

run();
