'use strict';

const readline = require('readline');
const superagent = require('superagent');
const fs = require('fs');
const captchaPath = 'captcha.png';
const chalk = require('chalk');
const url = {
  loginWithPhoneNum: () => 'http://www.zhihu.com/login/phone_num',
  captcha: () => 'https://www.zhihu.com/captcha.gif?type=login&r=' + new Date().getTime()
};
let user = {};
let httpHeader = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

function getCaptcha() {
  return new Promise((resolve, reject) => {
    superagent
      .get(url.captcha())
      .set(httpHeader)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          fs.writeFile(captchaPath, res.body, 'binary', function (error) {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              Object.assign(httpHeader, {
                Cookie: res.headers["set-cookie"]
              });
              resolve();
            }
          });
        }
      });
  })
}

function resolveCaptcha() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`Please input the captcha at \'${captchaPath}\': `, (answer) => {
      rl.close();
      if (answer) {
        user.captcha = answer;
        resolve();
      } else {
        reject('Please input the captcha!');
      }
    });
  })
}

function getLoginCookie() {
  return new Promise((resolve, reject) => {
    superagent
      .post(url.loginWithPhoneNum())
      .set(httpHeader)
      .send(user)
      .redirects(0)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (res.body && res.body.msg === '登录成功') {
            httpHeader.Cookie = res.headers["set-cookie"];
            resolve();
          } else {
            reject(res.body.msg);
          }
        }
      });
  })
}

function login(_user) {
  user = _user;
  return new Promise((resolve, reject) => {
    getCaptcha()
      .then(resolveCaptcha)
      .then(getLoginCookie)
      .then(function () {
        console.log(chalk.green.bold('Login success!'));
        resolve();
      })
      .catch(function (err) {
        console.log(chalk.red.bold('Login failed:', err));
        reject();
      })
  })
}


exports.login = login;
