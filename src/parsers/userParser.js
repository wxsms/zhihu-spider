'use strict';

const jsdom = require('jsdom');
const util = require('./../utils/commonUtil');

function parseUserBasicInfo($) {
  let user = {};
  let profileCard = $('.ProfileCard');
  user.name = profileCard.find('.name').text();
  user.bio = profileCard.find('.bio').text();
  user.gender = profileCard.find('.gender').html().indexOf('female') >= 0 ? 'female' : 'male';
  user.description = $('#profile-header-description-input').html();
  return user;
}

function parseUserDetailInfo($) {
  let user = {};
  let profileCard = $('.ProfileCard');
  let locationDiv = profileCard.find('[data-name=location]');
  let employmentDiv = profileCard.find('[data-name=employment]');
  let educationDiv = profileCard.find('[data-name=education]');
  user.location = {
    location: locationDiv.find('.location').text(),
    profession: locationDiv.find('.business').text(),
  };
  user.employment = {
    company: employmentDiv.find('.employment').text(),
    position: employmentDiv.find('.position').text(),
  };
  user.education = {
    education: educationDiv.find('.education').text(),
    major: educationDiv.find('.education-extra').text(),
  };
  return user;
}

function parseUserFollowInfo($) {
  let user = {};
  let followDiv = $('.zm-profile-side-following');
  user.follow = {
    followees: followDiv.find('a[href*=followees]').find('strong').text(),
    follower: followDiv.find('a[href*=followers]').find('strong').text()
  };
  return user;
}

function parseUserActivitiesInfo($) {
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
  return user;
}

function parseUserAwardInfo($) {
  let user = {};
  let profileCard = $('.ProfileCard');
  user.award = {
    agree: profileCard.find('.zm-profile-header-user-agree strong').text(),
    thanks: profileCard.find('.zm-profile-header-user-thanks strong').text()
  };
  return user;
}

function fromHtml(html) {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (err, window) => {
      if (err) {
        window.close();
        util.logErrorAndResolve(reject, err)
      } else {
        const $ = require('jquery')(window);
        let user = {};
        Object.assign(user,
          parseUserBasicInfo($),
          parseUserDetailInfo($),
          parseUserAwardInfo($),
          parseUserActivitiesInfo($),
          parseUserFollowInfo($)
        );
        window.close();
        resolve(user);
      }
    });
  })
}

exports.fromHtml = fromHtml;