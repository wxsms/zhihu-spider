'use strict';

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true }
  },
  hashId: {
    type: String,
    index: { unique: true }
  },
  bio: String,
  gender: String,
  description: String,
  location: {
    location: String,
    profession: String
  },
  employment: {
    company: String,
    position: String
  },
  education: {
    education: String,
    major: String
  },
  follow: {
    followees: Number,
    follower: Number
  },
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