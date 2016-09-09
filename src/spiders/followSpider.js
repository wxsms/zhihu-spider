'use strict';

const constants = require('./../constants/zhihu');
const superagent = require('superagent-promise')(require('superagent'), Promise);
const parser = require('./../parsers/follow/index');
const _ = require('lodash');
const logger = require('log4js').getLogger('followSpider');

let session = {};

function setSession(_session) {
  session = _session;
}

function resolveByPage(user, offset, apiObj) {
  let header = Object.assign(session.getHttpHeader(), apiObj.header(user.id, session.getXsrfToken()));
  let form = apiObj.form(user.hashId, offset);
  //No more than 100 (too slow)
  if (offset + apiObj.pageSize() > 100) {
    return Promise.resolve([]);
  }
  return superagent
    .post(apiObj.url())
    .set(header)
    .send(form)
    .end()
    .then((res) => {
      let data = parser.fromJson(res.text);
      if (!data.list.length) {
        return [];
      }
      return resolveByPage(user, offset + apiObj.pageSize(), apiObj)
        .then(function (nextList) {
          return [].concat(data.list, nextList);
        });
    })
}

function resolveFollowers(user, offset) {
  logger.debug('Resolving user followers...');
  if (typeof offset === 'undefined' || offset < 0) {
    offset = 0;
  }
  return new Promise((resolve, reject) => {
    resolveByPage(user, offset, constants.api.userFollowers)
      .then((followersList) => {
        let _user = {
          followers_sample: _.uniq(followersList)
        };
        Object.assign(user, _user);
        logger.debug(`Total followers resolved: ${user.followers_sample.length}`);
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

function resolveFollowees(user, offset) {
  logger.debug('Resolving user followees...');
  if (typeof offset === 'undefined' || offset < 0) {
    offset = 0;
  }
  return new Promise((resolve, reject) => {
    resolveByPage(user, offset, constants.api.userFollowees)
      .then((followersList) => {
        let _user = {
          followees_sample: _.uniq(followersList)
        };
        Object.assign(user, _user);
        logger.debug(`Total followees resolved: ${user.followees_sample.length}`);
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

function resolveAllFollows(user) {
  let promises = [];
  promises.push((function () {
    return resolveFollowers(user);
  })(user));
  promises.push((function () {
    return resolveFollowees(user);
  })(user));
  return Promise
    .all(promises)
    .then((values) => {
      for (let i = 0; i < values.length; i++) {
        Object.assign(user, values[i]);
      }
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { setSession, resolveFollowers, resolveFollowees, resolveAllFollows };