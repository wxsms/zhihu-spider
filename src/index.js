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

let next = async(function (threadId) {
  try {
    let userId = await(userQueueService.shift());
    logger.info(`Thread ${threadId} working on user ${userId}`);
    let user = await(userService.resolveAndSave(userId));
    await(userQueueService.unshiftAll([].concat(user.followers_sample, user.followees_sample)));
  } catch (err) {
    if (err.name === 'MongoError') {
      err = err.message;
    }
    logger.error(err);
  }
});

let thread = async(function (id) {
  while (1) {
    await(next(id));
  }
});

let main = async(function () {
  await(userService.login());
  for (let i = 0; i < 5; i++) {
    thread(i)
  }
});

main();