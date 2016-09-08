'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse follow number correctly', function (done) {
  const parser = require('./../../../src/parsers/user/followParser');
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
            follower: userVar.parsedUserProfile.follower,
            followee: userVar.parsedUserProfile.followee
          });
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});