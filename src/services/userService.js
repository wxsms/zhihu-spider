'use strict';

const session = require('./../http/session');
const userSpider = require('./../spiders/userSpider');
const followSpider = require('./../spiders/followSpider');
const config = require('./../config/config');
const mongoose = require('mongoose');
const logger = require('log4js').getLogger('userService');

let User = mongoose.model('User');
userSpider.setSession(session);
followSpider.setSession(session);

function login() {
  return session.login(config.user)
}

function getSession() {
  return session;
}

function resolve(userName) {
  if (typeof userName === 'undefined') {
    userName = config.user.name;
  }
  logger.info(`User resolving task started: ${userName}`);
  return userSpider
    .resolveUser(userName)
    .then(followSpider.resolveAllFollows)
}

function save(user) {
  logger.debug('Saving user...');
  return new User(user).save();
}

function resolveAndSave(userName) {
  return new Promise((_resolve, reject) => {
    resolve(userName)
      .then(save)
      .then(() => {
        _resolve();
      })
      .catch((err) => {
        reject(`Failed on resolving and saving user: ${userName}, error: ${err}`);
      })
  })
}

module.exports = { login, getSession, resolve, save, resolveAndSave };