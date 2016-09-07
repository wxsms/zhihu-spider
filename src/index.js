'use strict';

const db = require('./utils/dbUtil');
const userService = require('./services/userService');
const spider = require('./spiders/followSpider');

db.connect();

userService
  .login()
  .then(userService.resolve)
  .then((user) => {
    spider.setSession(userService.getSession());
    return spider.resolveFollowers(user);
  })
  .then(userService.save)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    if (err) {
      console.error(err);
    }
    process.exit(1);
  });