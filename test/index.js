'use strict';

const log4js = require('log4js');
log4js.configure({
  appenders: [{ type: 'console' }],
  levels: { '[all]': 'ERROR' }
});

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const jsdom = require('jsdom');
const userProfile = require('./data/user');


global.__testVar = {
  parsers: {
    user: {
      userProfile: userProfile.getUserProfile(),
      parsedUserProfile: userProfile.getParsedUserProfile(),
      userFollows: userProfile.getUserFollows(),
      parsedUserFollows: userProfile.getParsedUserFollows()
    }
  }
};

describe('Parsers', function () {
  describe('user parser', function () {
    fs.readdirSync(path.join(__dirname, '/parsers/user/')).forEach(function (file) {
      require("./parsers/user/" + file);
    });
  });

  describe('follows parser', function () {
    fs.readdirSync(path.join(__dirname, '/parsers/follow/')).forEach(function (file) {
      require("./parsers/follow/" + file);
    });
  });
});
