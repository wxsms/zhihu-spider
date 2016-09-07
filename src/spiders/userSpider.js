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
    console.log(`----------`);
    console.log(`Resolving user ${userName}...`);
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
              user.id = userName;
              resolve(user);
            });
        }
      });
  });
}

module.exports = { setSession, resolveUser };