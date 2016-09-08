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
    return userService.resolveAndSave('wxsm');
  })
  .catch((err) => {
    logger.error(err);
  })
  .then(() => {
    return userService.resolveAndSave('linshengyu');
  })
  .catch((err) => {
    logger.error(err);
  })
  .then(() => {
    process.exit(0);
  });