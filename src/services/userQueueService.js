'use strict';

const config = require('./../config/config');
const mongoose = require('mongoose');
const logger = require('log4js').getLogger('userQueueService');
const _ = require('lodash');

let UserQueue = mongoose.model('UserQueue');

function unshiftAll(ids) {
  ids = _.uniq(ids);
  logger.debug(`Unshift user queue with ${ids.length} ids...`);
  let promises = [];
  for (let i = 0; i < ids.length; i++) {
    promises.push((function (id) {
      return new UserQueue({ id: id })
        .save()
        .catch((err) => {
          if (err.message.indexOf('duplicate key') < 0) {
            logger.warn(err.message);
          }
          Promise.resolve();
        });
    })(ids[i]));
  }
  return Promise.all(promises)
}

function shift() {
  return UserQueue
    .findOneAndRemove()
    .then((doc) => {
      if (doc) {
        return Promise.resolve(doc.id);
      } else {
        return config.user.name
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function unshift(id) {
  return new UserQueue({ id: id }).save();
}

module.exports = { unshiftAll, shift, unshift };