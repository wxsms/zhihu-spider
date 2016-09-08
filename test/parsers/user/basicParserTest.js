'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse basic info correctly', function (done) {
  const parser = require('./../../../src/parsers/user/basicParser');
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
            bio: userVar.parsedUserProfile.bio,
            description: userVar.parsedUserProfile.description,
            gender: userVar.parsedUserProfile.gender,
            name: userVar.parsedUserProfile.name
          });
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});