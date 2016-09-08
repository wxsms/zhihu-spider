'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let ProfileAvatar = $('.ProfileAvatarEditor');
    user.avatar = ProfileAvatar.find('img').attr('src');
    resolve(user);
  });
};