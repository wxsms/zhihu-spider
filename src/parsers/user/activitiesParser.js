'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let profileCard = $('.ProfileCard');
    let profileNavbar = profileCard.find('.profile-navbar');
    user.activities = {
      asks: profileNavbar.find('a[href*=asks]').find('.num').text(),
      answers: profileNavbar.find('a[href*=answers]').find('.num').text(),
      posts: profileNavbar.find('a[href*=posts]').find('.num').text(),
      collections: profileNavbar.find('a[href*=collections]').find('.num').text(),
      logs: profileNavbar.find('a[href*=logs]').find('.num').text()
    };
    //console.log('activities done');
    resolve(user);
  });
};