'use strict';

const assert = require('assert');

it('should parse entire topics correctly', function () {
  const parser = require('./../../../src/parsers/topic/index');
  let userVar = global.__testVar.parsers.user;
  let parsed = parser.fromJson(JSON.stringify(userVar.userTopics));
  assert.deepEqual(parsed, userVar.parsedUserTopics);
});