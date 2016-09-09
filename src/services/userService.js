'use strict';

const session = require('./../http/session');
const userSpider = require('./../spiders/userSpider');
const followSpider = require('./../spiders/followSpider');
const topicSpider = require('./../spiders/topicSpider');
const config = require('./../config/config');
const mongoose = require('mongoose');
const logger = require('log4js').getLogger('userService');

let User = mongoose.model('User');
userSpider.setSession(session);
followSpider.setSession(session);
topicSpider.setSession(session);

function login() {
  return session.login(config.user)
}

function getSession() {
  return session;
}

function resolve(userId) {
  if (typeof userId === 'undefined') {
    userId = config.user.name;
  }
  logger.info(`User resolving task started: ${userId}`);
  return User
    .findOne({ id: userId })
    .then((doc) => {
      if (doc) {
        return Promise.reject(`User ${userId} already existed!`);
      }
      return Promise.resolve(userId);
    })
    .then(userSpider.resolveUser)
    .then(followSpider.resolveAllFollows)
    .then(topicSpider.resolveTopics);
}

function save(user) {
  logger.debug('Saving user...');
  return new User(user).save();
}

function resolveAndSave(userId) {
  return resolve(userId).then(save)
}

module.exports = { login, getSession, resolve, save, resolveAndSave };