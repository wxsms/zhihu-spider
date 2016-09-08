'use strict';

const assert = require('assert');

it('should parse entire follows correctly', function () {
  const parser = require('./../../../src/parsers/follow/index');
  let userVar = global.__testVar.parsers.user;
  let parsed = parser.fromJson(JSON.stringify(userVar.userFollows));
  assert.deepEqual(parsed, userVar.parsedUserFollows);
});