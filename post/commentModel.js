'use strict'

var mongoose = require('mongoose');
var userSchema = require('./userSchema');

var CommentSchema = new mongoose.Schema({
  user: userSchema,
  content: {
    text: String
  },
  likes: [userSchema],
}, {
    timestamps: true
  });

module.exports = mongoose.model('Comment', CommentSchema);