'use strict';

const loggerUtil = require('./utils/loggerUtil');
loggerUtil.init();

const logger = require('log4js').getLogger('main');
const db = require('./utils/dbUtil');
const userService = require('./services/userService');


db.connect();

userService
  .login()
  .then(() => {
    return userService.resolveAndSave('linshengyu');
  })
  .then(() => {
    return userService.resolveAndSave('undefined');
  })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    if (err) {
      logger.error(err);
    }
    process.exit(1);
  });