'use strict';
const logger = require('log4js').getLogger('userParser');
const parser = require('./../index');

exports.fromHtml = function (html) {
  logger.debug('Parsing user from HTML...');
  return parser.fromHtml(html, [
    require('./basicParser'),
    require('./avatarParser'),
    require('./detailParser'),
    require('./activitiesParser'),
    require('./awardParser'),
    require('./hashIdParser')
  ])
};
