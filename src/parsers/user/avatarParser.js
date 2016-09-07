'use strict';

module.exports = function ($) {
  let user = {};
  let ProfileAvatar = $('.ProfileAvatarEditor');
  user.avatar = ProfileAvatar.find('img').attr('src');
  return user;
};