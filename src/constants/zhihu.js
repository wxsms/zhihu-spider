'use strict';

module.exports = {
  url: {
    loginWithPhoneNum: () => 'https://www.zhihu.com/login/phone_num',
    captcha: () => `https://www.zhihu.com/captcha.gif?type=login&r=${new Date().getTime()}`,
    userProfile: (userName) => `https://www.zhihu.com/people/${userName}`
  }
};