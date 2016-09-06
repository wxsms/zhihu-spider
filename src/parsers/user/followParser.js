'use strict';

module.exports = function ($) {
  let user = {};
  let followDiv = $('.zm-profile-side-following');
  user.follow = {
    followees: followDiv.find('a[href*=followees]').find('strong').text(),
    follower: followDiv.find('a[href*=followers]').find('strong').text()
  };
  return user;
};