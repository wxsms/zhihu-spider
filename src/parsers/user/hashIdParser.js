'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let rawText = $('script[data-name=current_people]').text();
    user.hashId = JSON.parse(rawText)[3];
    resolve(user);
  });
};