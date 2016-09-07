'use strict';

const constants = require('./../constants/zhihu');
const superagent = require('superagent-promise')(require('superagent'), Promise);
const parser = require('./../parsers/follow/index');
const _ = require('lodash');

let session = {};

function setSession(_session) {
  session = _session;
}

function resolveByPage(user, offset, apiObj) {
  let header = Object.assign(session.getHttpHeader(), apiObj.header(user.id, session.getXsrfToken()));
  let form = apiObj.form(user.hashId, offset);
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
  console.log('Resolving user followers...');
  if (typeof offset === 'undefined' || offset < 0) {
    offset = 0;
  }
  return new Promise((resolve, reject) => {
    resolveByPage(user, offset, constants.api.userFollowers)
      .then((followersList) => {
        let _user = {
          followers: _.uniq(followersList)
        };
        resolve(Object.assign(user, _user));
      })
      .catch((err) => {
        reject(err);
      })
  });
}

function resolveFollowees(user, offset) {
  console.log('Resolving user followees...');
  if (typeof offset === 'undefined' || offset < 0) {
    offset = 0;
  }
  return new Promise((resolve, reject) => {
    resolveByPage(user, offset, constants.api.userFollowees)
      .then((followersList) => {
        let _user = {
          followees: _.uniq(followersList)
        };
        resolve(Object.assign(user, _user));
      })
      .catch((err) => {
        reject(err);
      })
  });
}

module.exports = { setSession, resolveFollowers, resolveFollowees };