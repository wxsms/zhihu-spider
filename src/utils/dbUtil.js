'use strict';

const mongoose = require('mongoose');
const config = require('./../config/config');
const path = require('path');
const fs = require('fs');

function initModels() {
  fs.readdirSync(path.join(__dirname, '../model')).forEach(function (file) {
    require("./../model/" + file);
  });
}

function init() {
  initModels();
  mongoose.Promise = global.Promise;
}

init();

function connect() {
  mongoose.connect(config.db.path);
}

function close() {
  mongoose.connection.close();
}

module.exports = { connect, close };