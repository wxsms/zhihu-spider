'use strict';

const constants = require('./../constants/zhihu');
const util = require('./../utils/commonUtil');
const superagent = require('superagent');
const parser = require('./../parsers/userParser');

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
          util.logErrorAndResolve(reject, err);
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

//resolveUser('wxsm');

exports.setSession = setSession;
exports.resolveUser = resolveUser;