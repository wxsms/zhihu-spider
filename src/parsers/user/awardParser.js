'use strict';

module.exports = function ($) {
  let user = {};
  let profileCard = $('.ProfileCard');
  user.award = {
    agree: profileCard.find('.zm-profile-header-user-agree strong').text(),
    thanks: profileCard.find('.zm-profile-header-user-thanks strong').text()
  };
  return user;
};