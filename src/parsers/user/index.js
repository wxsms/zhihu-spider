'use strict';

const parser = require('./../index');

exports.fromHtml = function (html) {
  console.log('Parsing user...');
  return parser.fromHtml(html, [
    require('./basicParser'),
    require('./avatarParser'),
    require('./detailParser'),
    require('./activitiesParser'),
    require('./awardParser'),
    require('./hashIdParser')
  ])
};
