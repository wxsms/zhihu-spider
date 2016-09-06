'use strict';

module.exports = function ($) {
  let user = {};
  let profileCard = $('.ProfileCard');
  user.name = profileCard.find('.name').text();
  user.bio = profileCard.find('.bio').text();
  user.gender = profileCard.find('.gender').html().indexOf('female') >= 0 ? 'female' : 'male';
  user.description = $('#profile-header-description-input').html();
  return user;
};