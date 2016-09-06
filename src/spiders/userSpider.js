'use strict';

const constants = require('./../constants/zhihu');
const superagent = require('superagent');
const parser = require('./../parsers/user/index');

let session = {};

function setSession(_session) {
  session = _session;
}

function resolveUser(userName) {
  return new Promise((resolve, reject) => {
    superagent
      .get(constants.url.userProfile(userName))
      .set(session.getHttpHeader())
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          parser
            .fromHtml(res.text)
            .then((user) => {
              resolve(user);
            });
        }
      });
  });
}

module.exports = { setSession, resolveUser };