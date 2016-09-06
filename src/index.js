'use strict';

const db = require('./utils/dbUtil');
const userService = require('./services/userService');


db.connect();

userService
  .login()
  .then(userService.resolveAndSave)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    if (err) {
      console.error(err);
    }
    process.exit(1);
  });