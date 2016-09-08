'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse award info correctly', function (done) {
  const parser = require('./../../../src/parsers/user/awardParser');
  let userVar = global.__testVar.parsers.user;
  jsdom.env(userVar.userProfile, (err, window) => {
    if (err) {
      window.close();
      done(err);
    } else {
      const $ = require('jquery')(window);
      parser($)
        .then((item) => {
          assert.deepEqual(item, {
            award: userVar.parsedUserProfile.award
          });
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});