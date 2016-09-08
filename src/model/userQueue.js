'use strict';

let mongoose = require('mongoose');

let UserQueueSchema = new mongoose.Schema({
  id: {
    type: String,
    index: { unique: true }
  }
});

mongoose.model('UserQueue', UserQueueSchema);