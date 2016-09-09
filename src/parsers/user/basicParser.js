'use strict';

module.exports = function ($) {
  return new Promise((resolve, reject) => {
    let user = {};
    let profileCard = $('.ProfileCard');
    user.name = profileCard.find('.name').text();
    user.bio = profileCard.find('.bio').text();
    user.gender = '';
    let genderDiv = profileCard.find('.gender');
    if (genderDiv.html() && genderDiv.html().indexOf) {
      user.gender = genderDiv.html().indexOf('female') >= 0 ? 'female' : 'male';
    }
    user.description = $('#profile-header-description-input').html();
    //console.log('basic done');
    resolve(user);
  });
};