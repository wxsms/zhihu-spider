'use strict';

const session = require('./http/session');
const spider = require('./spiders/userSpider');
const config = require('./config/zhihu');

let user = config.user;

session
  .login(user)
  .then(() => {
    spider.setSession(session);
    spider
      .resolveUser(config.userSpider.seed)
      .then((user) => {
        console.log(user);
        process.exit(1);
      })
      .catch(() => {
        process.exit(0);
      });
    //process.exit(1);
  })
  .catch(() => {
    process.exit(0);
  });