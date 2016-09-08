'use strict';

const constants = require('./../constants/zhihu');
const superagent = require('superagent');
const parser = require('./../parsers/user/index');
const logger = require('log4js').getLogger('userSpider');

let session = {};

function setSession(_session) {
  session = _session;
}

function resolveUser(userName) {
  return new Promise((resolve, reject) => {
    let url = constants.url.userProfile(userName);
    logger.debug(`Getting user from ${url}...`);
    superagent
      .get(url)
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