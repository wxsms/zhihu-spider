'use strict';

const fs = require('fs');
const path = require('path');

const parsedProfile = {
  "name": "wxsm",
  "bio": "Web程序员，接私活",
  "gender": "male",
  "description": "http://wxsm.space",
  "avatar": "https://pic3.zhimg.com/f8ad8309c9669be59b59bb4818a9d92a_l.jpg",
  "location": "珠海",
  "profession": "计算机软件",
  "hashId": "6a246a16b892bf7cbbb62ae586190c4a",
  "award": { "agree": "240", "thanks": "40" },
  "activities": { "asks": "2", "answers": "19", "posts": "0", "collections": "1", "logs": "9" },
  "education": { "education": "暨南大学", "major": "软件工程" },
  "employment": { "company": "OOCL", "position": "ATE" }
};

const parseFollows = {
  "list": ["jin-yang-ming", "bevis-4", "fu-xiang-64", "walkerinchaos", "deepout", "tao-tao-990", "bian-jia-lun", "yusenforthedream", "luaer", "he-jia-22-35", "dong-chong-xia-cao-35", "tan-lin-kai-56", "amberwei-2", "piao-xiang-2", "song-chun-liang-67", "movinghorse", "alice-wei-joo", "liyunzhi1993", "supernovayo", "hhost"]
};

function getUserProfile() {
  return fs.readFileSync(path.join(__dirname, '/raw/userProfile.txt')).toString('utf8');
}

function getUserFollows() {
  return require('./raw/userFollowers.json');
}

function getParsedUserProfile() {
  return parsedProfile;
}

function getParsedUserFollows() {
  return parseFollows;
}

module.exports = { getUserProfile, getParsedUserProfile, getUserFollows, getParsedUserFollows };