'use strict';

const assert = require('assert');

it('should parse topics\' names correctly', function () {
  const parser = require('./../../../src/parsers/topic/nameParser');
  let userVar = global.__testVar.parsers.user;
  let parsed = parser(userVar.userTopics);
  assert.deepEqual(parsed, userVar.parsedUserTopics);
});