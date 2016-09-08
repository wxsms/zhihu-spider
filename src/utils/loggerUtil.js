'use strict';

const log4js = require('log4js');
const fs = require('fs');
const path = require('path');

function init() {
  try {
    fs.mkdirSync(path.join(__dirname, '/../../log'));
  } catch (e) {
    if (e.code !== 'EEXIST') {
      console.error('Could not set up log directory, error was: ', e);
      process.exit(1);
    }
  }
  log4js.configure('./../src/config/log4js.json');

  let logger = log4js.getLogger();
  logger.setLevel('DEBUG');
}


module.exports = { init };