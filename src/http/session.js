'use strict';

const readline = require('readline');
const superagent = require('superagent');
const fs = require('fs');
const captchaPath = 'captcha.png';
const chalk = require('chalk');
const constants = require('./../constants/zhihu');
const jsdom = require('jsdom');
let user = {};
let httpHeader = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Host': 'www.zhihu.com',
  'Origin': 'https://www.zhihu.com'
};
let xsrfToken = '';

function getXsrfToken() {
  return xsrfToken;
}

function getCaptcha() {
  return new Promise((resolve, reject) => {
    superagent
      .get(constants.url.captcha())
      .set(httpHeader)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFile(captchaPath, res.body, 'binary', (error) => {
            if (error) {
              reject(err);
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
      .post(constants.url.loginWithPhoneNum())
      .set(httpHeader)
      .send(user)
      .redirects(0)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.body && res.body.msg === '登录成功') {
            httpHeader.Cookie = res.headers['set-cookie'];
            resolve();
          } else {
            reject(res.body.msg);
          }
        }
      });
  })
}

function _getXsrfToken() {
  return new Promise((resolve, reject) => {
    superagent
      .get(constants.url.home())
      .set(httpHeader)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          jsdom.env(res.text, (err, window) => {
            if (err) {
              window.close();
              reject(err);
            } else {
              const $ = require('jquery')(window);
              xsrfToken = $('input[name=_xsrf]').val();
              for (let i = 0; i < httpHeader.Cookie.length; i++) {
                if (httpHeader.Cookie[i].indexOf('_xsrf=') >= 0) {
                  httpHeader.Cookie[i] = `_xsrf=\"${xsrfToken}\"; Domain=zhihu.com; Path=/`;
                  break;
                }
              }
              resolve();
            }
          });
        }
      });
  });
}

function login(_user) {
  user = _user;
  return new Promise((resolve, reject) => {
    getCaptcha()
      .then(resolveCaptcha)
      .then(getLoginCookie)
      .then(_getXsrfToken)
      .then(() => {
        console.log(chalk.green.bold('Login success!'));
        resolve();
      })
      .catch((err) => {
        reject('Login failed: ' + err);
      })
  })
}

function getHttpHeader() {
  return httpHeader;
}

module.exports = { getHttpHeader, getXsrfToken, login };
