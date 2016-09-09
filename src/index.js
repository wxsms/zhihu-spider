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

const thread = async(function (id) {
  while (1) {
    await(userQueueService
      .shift()
      .then((userId) => {
        logger.info(`Thread ${id} working on user ${userId}`);
        return Promise.resolve(userId)
      })
      .then(userService.resolveAndSave)
      .then((user) => {
        let ids = [];
        if (user.followers_sample) {
          ids = ids.concat(user.followers_sample);
        }
        if (user.followees_sample) {
          ids = ids.concat(user.followees_sample);
        }
        return userQueueService.unshiftAll(ids);
      })
      .then(() => {
        Promise.resolve();
      })
      .catch((err) => {
        logger.error(err);
        Promise.reject(err);
      }));
  }
});

const main = async(function () {
  await(userService.login());
  for (let i = 0; i < 5; i++) {
    (function (i) {
      setTimeout(() => {
        thread(i)
      }, 1);
    })(i)
  }
});

main();