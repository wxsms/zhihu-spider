'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse avatar url correctly', function (done) {
  const parser = require('./../../../src/parsers/user/avatarParser');
  let userVar = global.__testVar.parsers.user;
  jsdom.env(userVar.userProfile, (err, window) => {
    if (err) {
      window.close();
      done(err);
    } else {
      const $ = require('jquery')(window);
      parser($)
        .then((item) => {
          assert.equal(item.avatar, userVar.parsedUserProfile.avatar);
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});