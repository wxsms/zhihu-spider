'use strict';

module.exports = function ($) {
  let user = {};
  let rawText = $('script[data-name=current_user]').text();
  user.hashId = JSON.parse(rawText)[3];
  return user;
};