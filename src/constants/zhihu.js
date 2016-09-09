'use strict';

let zhihu = {};

zhihu.url = {
  home: () => 'https://www.zhihu.com',
  loginWithPhoneNum: () => 'https://www.zhihu.com/login/phone_num',
  captcha: () => `https://www.zhihu.com/captcha.gif?type=login&r=${new Date().getTime()}`,
  userProfile: (userName) => `https://www.zhihu.com/people/${userName}`,
  userFollowers: (userName) => `https://www.zhihu.com/people/${userName}/followers`,
  userFollowees: (userName) => `https://www.zhihu.com/people/${userName}/followees`,
  userTopics: (userName) => `https://www.zhihu.com/people/${userName}/topics`
};

zhihu.api = {
  userFollowers: {
    url: () => 'https://www.zhihu.com/node/ProfileFollowersListV2',
    pageSize: () => 20,
    form: (hashId, offset) => {
      offset = typeof offset === 'undefined' ? 0 : offset;
      return {
        method: 'next',
        params: `{"offset":${offset},"order_by":"created","hash_id":"${hashId}"}`
      }
    },
    header: (userName, token) => {
      return {
        'X-Xsrftoken': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: zhihu.url.userFollowers(userName)
      }
    }
  },
  userFollowees: {
    url: () => 'https://www.zhihu.com/node/ProfileFolloweesListV2',
    pageSize: () => 20,
    form: (hashId, offset) => {
      offset = typeof offset === 'undefined' ? 0 : offset;
      return {
        method: 'next',
        params: `{"offset":${offset},"order_by":"created","hash_id":"${hashId}"}`
      }
    },
    header: (userName, token) => {
      return {
        'X-Xsrftoken': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: zhihu.url.userFollowees(userName)
      }
    }
  },
  userTopics: {
    url: (userName) => `https://www.zhihu.com/people/${userName}/topics`,
    pageSize: () => 20,
    form: (offset) => {
      offset = typeof offset === 'undefined' ? 0 : offset;
      return {
        start: 0,
        offset: offset
      }
    },
    header: (userName, token) => {
      return {
        'X-Xsrftoken': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: zhihu.url.userTopics(userName)
      }
    }
  }
};

module.exports = zhihu;

