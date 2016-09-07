'use strict';

const db = require('./utils/dbUtil');
const userService = require('./services/userService');

db.connect();

userService
  .login()
  .then(() => {
    return userService.resolve('kenspirit');
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