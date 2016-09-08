'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse hashId correctly', function (done) {
  const parser = require('./../../../src/parsers/user/hashIdParser');
  let userVar = global.__testVar.parsers.user;
  jsdom.env(userVar.userProfile, (err, window) => {
    if (err) {
      window.close();
      done(err);
    } else {
      const $ = require('jquery')(window);
      parser($)
        .then((item) => {
          assert.equal(item.hashId, userVar.parsedUserProfile.hashId);
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});