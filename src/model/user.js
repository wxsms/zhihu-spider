'use strict';

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  id: {
    type: String,
    index: { unique: true }
  },
  hashId: {
    type: String,
    index: { unique: true }
  },
  name: String,
  bio: String,
  gender: String,
  avatar: String,
  description: String,
  location: String,
  profession: String,
  employment: {
    company: String,
    position: String
  },
  education: {
    education: String,
    major: String
  },
  followee: Number,
  follower: Number,
  followees: [String],
  followers: [String],
  activities: {
    asks: Number,
    answers: Number,
    posts: Number,
    collections: Number,
    logs: Number
  },
  award: {
    agree: Number,
    thanks: Number
  }
});

mongoose.model('User', UserSchema);