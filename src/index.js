const puppeteer = require("puppeteer");
const sendSms = require("./send")

const smsapi = "api.smsbao.com"

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://wufazhuce.com/", {
    waitUtil: "networkidle2"
  });

  const content = await page.$eval(".fp-one-cita a", heading => {
    return heading.innerText;
  });

  await page.close();
  await browser.disconnect();

  const env = process.env

  // 短信平台账号
  const user = env.USERNAME
  // 短信平台密码
  const password = env.PASSWORD

  // 要发送短信的手机号码
  const phone = env.PHONE

  await sendSms(smsapi, user, password, content, phone)

  process.exit(0)
};

run();
