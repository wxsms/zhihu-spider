'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let ProfileCard = $('.ProfileCard');
    user.avatar = ProfileCard.find('.Avatar').attr('src');
    //console.log('avatar done');
    resolve(user);
  });
};