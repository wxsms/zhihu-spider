'use strict';

const chalk = require('chalk');
const session = require('./../http/session');
const userSpider = require('./../spiders/userSpider');
const followSpider = require('./../spiders/followSpider');
const config = require('./../config/config');
const mongoose = require('mongoose');


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
  return userSpider
    .resolveUser(userName)
    .then(followSpider.resolveFollowers)
    .then(followSpider.resolveFollowees);
}

function save(user) {
  console.log('Saving user...');
  return new User(user).save();
}

function resolveAndSave(userName) {
  return new Promise((_resolve, reject) => {
    resolve(userName)
      .then(save)
      .then(() => {
        console.log(chalk.green('Successfully resolved and saved user:', userName));
        _resolve();
      })
      .catch((err) => {
        reject(`Failed on resolving and saving user: ${userName}, error: ${err}`);
      })
  })
}

module.exports = { login, getSession, resolve, save, resolveAndSave };