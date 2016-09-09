'use strict';

const parser = require('./../index');

function fromJson(jsonText) {
  return parser.fromJson(jsonText, [
    require('./nameParser')
  ])
}

module.exports = { fromJson };