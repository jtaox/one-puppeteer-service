const crypto = require('crypto')
const http = require('http')
const querystring = require('querystring')

const md5 = crypto.createHash('md5')

module.exports = function send_sms(smsapi, user, password, content, phone) {

  return new Promise((resolve, reject) => {

    const pass = md5.update(password).digest('hex')
    const data = {
      'u': user,
      'p': pass,
      'm': phone,
      'c': content
    }
    const smsContent = querystring.stringify(data);
    const options = {
      hostname: smsapi,
      path: '/sms?' + smsContent,
      method: 'GET'
    }

    const req = http.request(options, function (res) {
      res.setEncoding('utf-8');
      res.on('data', function (result) {
        statusStr(result, resolve)
      });
      res.on('end', function () {
      });
    });
    req.on('error', function (err) {
      console.error(err);
    });
    req.end();


  })


}

function statusStr(result, resolve) {
  switch (result) {
    case '0':
      console.log('短信发送成功')
      break
    case '-1':
      console.log('参数不全')
      break
    case '-2':
      console.log('服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！')
      break
    case '30':
      console.log('密码错误')
      break
    case '40':
      console.log('账户不存在')
      break
    case '41':
      console.log('余额不足')
      break
    case '42':
      console.log('账户已过期')
      break
    case '43':
      console.log('IP地址限制')
      break
    case '50':
      console.log('内容含有敏感字')
      break
  }

  resolve()
}