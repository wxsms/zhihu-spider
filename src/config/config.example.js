'use strict';

//rename this file to zhihu.js and fill with your own value
module.exports = {
  user: {
    phone_num: 'xxx',//the login id
    password: 'xxx',//the login password
    name: 'wxsm', //the use url pattern to fetch (can be not the login user)
    remember_me: true //use true to avoid session timeout
  },
  userSpider: {
    seed: 'wxsm'
  },
  db: {
    path: 'mongodb://localhost/zhihu-spider'
  }
};