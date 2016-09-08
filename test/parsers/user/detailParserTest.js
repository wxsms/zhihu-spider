'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse detail info correctly', function (done) {
  const parser = require('./../../../src/parsers/user/detailParser');
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
            education: userVar.parsedUserProfile.education,
            employment: userVar.parsedUserProfile.employment,
            location: userVar.parsedUserProfile.location,
            profession: userVar.parsedUserProfile.profession
          });
          done();
        })
        .catch((e) => {
          done(e);
        })
    }
  });
});