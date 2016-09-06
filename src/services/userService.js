'use strict';

const chalk = require('chalk');
const session = require('./../http/session');
const spider = require('./../spiders/userSpider');
const config = require('./../config/config');
const mongoose = require('mongoose');


let User = mongoose.model('User');
spider.setSession(session);

function login() {
  return session.login(config.user)
}

function resolve(userName) {
  return spider.resolveUser(userName);
}

function save(user) {
  return new User(user).save();
}

function resolveAndSave(userName) {
  if (typeof userName === 'undefined') {
    userName = config.userSpider.seed;
  }
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

module.exports = { login, resolve, save, resolveAndSave };