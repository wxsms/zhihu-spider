'use strict';

const loggerUtil = require('./utils/loggerUtil');
loggerUtil.init();

const logger = require('log4js').getLogger('main');
const db = require('./utils/dbUtil');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const userService = require('./services/userService');
const userQueueService = require('./services/userQueueService');

db.connect();

function next() {
  return userQueueService
    .shift()
    .then(userService.resolveAndSave)
    .then((user) => {
      return userQueueService.unshiftAll([].concat(user.followers, user.followees));
    })
    .then(() => {
      Promise.resolve();
    })
    .catch((err) => {
      logger.error(err);
      Promise.reject(err);
    })
}

const main = async(function () {
  let index = 1;
  await(userService.login());
  /*while (1) {
    logger.info(`---------- Process working on user ${index} ----------`);
    await(next());
    index++;
  }*/
  await(next());
  process.exit();
});

main();
