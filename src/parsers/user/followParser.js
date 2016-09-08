'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let followDiv = $('.zm-profile-side-following');
    let user = {
      followee: followDiv.find('a[href*=followees]').find('strong').text(),
      follower: followDiv.find('a[href*=followers]').find('strong').text()
    };
    resolve(user);
  });
};