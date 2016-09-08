'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let profileCard = $('.ProfileCard');
    user.award = {
      agree: profileCard.find('.zm-profile-header-user-agree strong').text(),
      thanks: profileCard.find('.zm-profile-header-user-thanks strong').text()
    };
    resolve(user);
  });
};