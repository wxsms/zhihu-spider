'use strict';

const assert = require('assert');
const jsdom = require('jsdom');

it('should parse entire info correctly', function (done) {
  const parser = require('./../../../src/parsers/user/index');
  let userVar = global.__testVar.parsers.user;
  parser
    .fromHtml(userVar.userProfile)
    .then((user) => {
      assert.deepEqual(user, userVar.parsedUserProfile);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
