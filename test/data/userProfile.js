'use strict';

const fs = require('fs');
const path = require('path');

function getUserProfile() {
  return fs.readFileSync(path.join(__dirname, '/raw/userProfile.txt')).toString('utf8');
}

function getParsedUserProfile() {
  return {
    "name": "wxsm",
    "bio": "Web程序员，接私活",
    "gender": "male",
    "description": "http://wxsm.space",
    "avatar": "https://pic3.zhimg.com/f8ad8309c9669be59b59bb4818a9d92a_l.jpg",
    "location": "珠海",
    "profession": "计算机软件",
    "hashId": "6a246a16b892bf7cbbb62ae586190c4a",
    "award": {
      "agree": "240",
      "thanks": "40"
    },
    "activities": {
      "asks": "2",
      "answers": "19",
      "posts": "0",
      "collections": "1",
      "logs": "9"
    },
    "education": {
      "education": "暨南大学",
      "major": "软件工程"
    },
    "employment": {
      "company": "OOCL",
      "position": "ATE"
    }
  }
}

module.exports = { getUserProfile, getParsedUserProfile };