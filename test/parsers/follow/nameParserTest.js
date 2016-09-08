'use strict';

const assert = require('assert');

it('should parse follows\' names correctly', function () {
  const parser = require('./../../../src/parsers/follow/nameParser');
  let userVar = global.__testVar.parsers.user;
  let parsed = parser(userVar.userFollows);
  assert.deepEqual(parsed, userVar.parsedUserFollows);
});