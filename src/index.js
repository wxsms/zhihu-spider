'use strict';

const session = require('./session');
const config = require('./config/local');
let user = config.user;

session
  .login(user)
  .then(function () {
    process.exit(1);
  })
  .catch(function () {
    process.exit(0)
  });