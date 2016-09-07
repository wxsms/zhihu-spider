'use strict';

const constants = require('./../constants/zhihu');
const superagent = require('superagent');
const parser = require('./../parsers/follow/index');

let session = {};

function setSession(_session) {
  session = _session;
}

function resolveFollowers(user) {
  return new Promise((resolve, reject) => {
    let header = Object.assign(session.getHttpHeader(), {
      'X-Xsrftoken': session.getXsrfToken(),
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: constants.url.userFollowers(user.name)
    });

    let form = {
      method: 'next',
      params: `{"offset":0,"order_by":"created","hash_id":"${user.hashId}"}`
    };

    superagent
      .post('https://www.zhihu.com/node/ProfileFollowersListV2')
      .set(header)
      .send(form)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log('success!!!');
          console.log(res.body);
          resolve(user);
        }
      });
  });
}

module.exports = { setSession, resolveFollowers };